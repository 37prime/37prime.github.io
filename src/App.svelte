<script>

	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	import contractsData from './contracts';

	import logo from "./37.svg";


	function secondsToDhms(seconds) {
		seconds = Number(seconds);
		var d = Math.floor(seconds / (3600*24));
		var h = Math.floor(seconds % (3600*24) / 3600);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 60);

		var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
		var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
		var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
		var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
		return dDisplay + hDisplay + mDisplay + sDisplay;
	}

	function blockchainTimeToHuman(time){ //time in seconds
		return (new Date(time * 1000)).toLocaleString(undefined, {timeZoneName: 'short'}).replace(/:\d+ /, ' ')
	}


	const obscureAddress = (address) => {
	  return address.substring(0, 6) + '...'
	       + address.substring(address.length - 4, address.length);
	}


	let connectBtnText = "Connect Wallet";

	let loadingModal = false;

	import WalletClass from './Wallet'

	let isFaucetAvailable = false;

	let userTokenBalance = 0;
	
	let rewardTokenBalance = 0  //total pool rewards available

	let userAllowance = 0;
	let userUnlockTime = 0;
	let lockTimePeriod = 0; //in Seconds
	let userStakeAmount = 0;

	let userStakedAtTime = 0;
	let stakeRewardEndTime = 0;

	let stakeRewardFactor = 0;

	// let userAccumulatedRewards = 0; // values saved and stored
	// let userClaimableRewards = 0; // time * tokens  //in memory, not saved values, unprocessed
	// let userTotalRewards = 0; // claimable + accumulated
	let earnedRewardTokens = 0 //userTotalRewards / RewardFactor


	let tokenTotalStaked = 0; // sum of all staked tokens


	function tokenValToString(amount){
		return amount.toFixed(contractsData.token.decimals)
					 .replace(/0+$/, '').replace(/\.$/, '')  //adds decimals and prevent scientific notation
					 .replace(/\B(?=(\d{3})+(?!\d)\.)/g, ",")  //adds commas
					//  .replace(/(?<=\.(\d{3})+)\B/g, "'") //ands apostrophe
					//+ ' ' + contractsData.token.symbol
	}


	let amountToStake = '';

	let amountToWithdraw = '';
	

	let chainId = 137;

	let Contracts = {};

	const infiniteApproval = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

	window.Wallet = new WalletClass();

	// console.log(contractsData.faucet.interface)
	// Contracts.faucet = new Wallet.web3.eth.Contract(contractsData.faucet.interface)
	Contracts.faucet = new Wallet.web3.eth.Contract(contractsData.faucet.interface ,contractsData.faucet.address)
	Contracts.staking = new Wallet.web3.eth.Contract(contractsData.staking.interface ,contractsData.staking.address)
	Contracts.token = new Wallet.web3.eth.Contract(contractsData.token.interface ,contractsData.token.address)

	Wallet.changeButton = (data) => {
        if(data == 'disconnected'){
			connectBtnText = 'Connect Wallet'
        } else {
			connectBtnText = data
        }
    }

	Wallet.onConnectCallBack = (userAddress, _chainId) => {
		chainId = _chainId

		if (_chainId != 137) return;

		Contracts.token.methods.allowance(userAddress, contractsData.staking.address).call().then(
		(r)=> {
			userAllowance = r / contractsData.token.decimals
		})


		
		Contracts.token.methods.balanceOf(userAddress).call().then(
		(r)=> {
			userTokenBalance = r / (10 ** contractsData.token.decimals)
		})


		// Contracts.faucet.methods.allowedToWithdraw(userAddress).call().then(
		// 	(r)=> {
		// 		allowedToWithdraw = r / (10 ** contractsData.token.decimals)
		// 	})

		// Contracts.staking.methods.balanceOf(userAddress).call().then( //reduntant, not needed
		// (r)=> {
		// 	balanceOf = r / (10 ** contractsData.token.decimals)
		// })
		
		Contracts.staking.methods.getEarnedRewardTokens(userAddress).call().then(
		(r)=> {
			earnedRewardTokens = r / (10 ** contractsData.token.decimals)
		})

		Contracts.staking.methods.getRewardTokenBalance().call().then(
		(r)=> {
			rewardTokenBalance = r / (10 ** contractsData.token.decimals)
		})


		Contracts.staking.methods.getUnlockTime(userAddress).call().then(
		(r)=> {
			userUnlockTime = r
		})

		Contracts.staking.methods.lockTimePeriod().call().then(
		(r)=> {
			lockTimePeriod = r
		})

		Contracts.staking.methods.stakeAmount(userAddress).call().then(
		(r)=> {
			userStakeAmount = r / (10 ** contractsData.token.decimals)
		})

		Contracts.staking.methods.stakeRewardEndTime().call().then(
		(r)=> {
			stakeRewardEndTime = r
		})

		Contracts.staking.methods.stakeRewardFactor().call().then(
		(r)=> {
			stakeRewardFactor = r
		})

		Contracts.staking.methods.tokenTotalStaked().call().then(
		(r)=> {
			tokenTotalStaked = r / (10 ** contractsData.token.decimals)
		})

		Contracts.staking.methods.stakeTime(userAddress).call().then(
		(r)=> {
			userStakedAtTime = r
		})

		// Contracts.staking.methods.userAccumulatedRewards(userAddress).call().then(
		// (r)=> {
		// 	userAccumulatedRewards = (r / (10 ** contractsData.token.decimals)) // stakeRewardFactor // should divide by stakeRewardFactor ???
		// })

		// Contracts.staking.methods.userClaimableRewards(userAddress).call().then(
		// (r)=> {
		// 	userClaimableRewards = (r / (10 ** contractsData.token.decimals)) // stakeRewardFactor  //divided by stakeRewardFactor
		// })

		// Contracts.staking.methods.userTotalRewards(userAddress).call().then(
		// (r)=> {
		// 	userTotalRewards = r / (10 ** contractsData.token.decimals) // stakeRewardFactor //divided by stakeRewardFactor
		// })


	}

	const btn_connect_handleClick = () => {

		if (!Wallet.selectedAccount){
			Wallet.onConnect();
		} else {
			alert ("The disconnection button is located in the wallet!");
		}
	}

	const btn_requestTokens = () => {
		if (!isFaucetAvailable) return;

		loadingModal = true;

		Contracts.faucet.methods.requestTokens().send({from:Wallet.selectedAccount})
			.then(defaultTxCb).catch(defaultTxErrCb)

	}

	const defaultTxCb = (r) => {
		console.log(r)
		loadingModal = false;
		//r.transactionHash
		Wallet.onConnectCallBack(Wallet.selectedAccount, chainId) //refresh page data
	}

	const defaultTxErrCb = (e) => {
		loadingModal = false;
		console.log(e)
		if(e.code != 4001) { //4001 canceled by user
			alert(e.message);
		} 
	}

	const btn_approveErc20 = () => {

		loadingModal = true;
		Contracts.token.methods.approve(contractsData.staking.address, infiniteApproval).send({from:Wallet.selectedAccount})
			.then(defaultTxCb).catch(defaultTxErrCb)
	}

	const btn_stake = async () => {
		
		loadingModal = true;
		Contracts.staking.methods.stake(amountToStake * 10 ** contractsData.token.decimals).send({from:Wallet.selectedAccount})
			.then(defaultTxCb).catch(defaultTxErrCb)
	}

	const btn_withdraw = async () => {
		
		loadingModal = true;
		Contracts.staking.methods.withdraw(amountToWithdraw * 10 ** contractsData.token.decimals).send({from:Wallet.selectedAccount})
			.then(defaultTxCb).catch(defaultTxErrCb)
	}


	const btn_claim = async () => {
		
		loadingModal = true
		Contracts.staking.methods.claim().send({from:Wallet.selectedAccount})
			.then(defaultTxCb).catch(defaultTxErrCb)
			
	}
	
	const btn_changeToPolygon = async () => {
		try {
          await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }]
          });
        } catch (error) {
          alert(error.message);
        }
	}


	let maxValueInput = function () {
		if (this.value > Number(this.max)) {
			this.value = Number(this.max); 
		}
	}

	onMount(()=>{

	})


</script>

<main>

	<div class="header">
		<div></div>
		<div class="header-right">
			<button class="btn btn-primary" id="btn-connect" on:click={btn_connect_handleClick}>{connectBtnText}</button>
		</div>
	</div>

	<img src={logo} alt="37" class="img37" />

	<p>This is a joke and a testing tool. This is not an investment!</p>
	<p>You can get free 37 tokens from the faucet and stake them if you want.</p>

	<p>37 contract: {contractsData.token.address}</p>

	{#if chainId != 137}
		<h2 class="wrongChain">Please select the Polygon Network in your wallet!</h2>
		<button on:click={btn_changeToPolygon}>Change to Polygon</button>
	{:else}
	
	

	<div class="appcenter">
		<div class="divboxl1">
			
			{#if isFaucetAvailable}
				<p>You are eligible to receive 0.00037 tokens from the faucet!</p>
				<button on:click={btn_requestTokens}>Request Tokens!</button>
			{:else}
				<p>Your wallet is not eligible to receive tokens from the faucet at the moment.</p>
			{/if}
			<p>Faucet contract: {contractsData.faucet.address}</p>
		</div>

		
		<div class="divboxl1">
			<div class="poolInfo">
				<p><strong>Staking Pool</strong></p>
				<p>Total rewards available: {tokenValToString(rewardTokenBalance)}</p>
				<p>Total Staked: {tokenValToString(tokenTotalStaked)}</p>
				<p>Pool locktime: {secondsToDhms(lockTimePeriod)}</p>
				<p>Pool ends on: {blockchainTimeToHuman(stakeRewardEndTime)}</p>
				<p>{(stakeRewardFactor/31556952*100).toFixed(1)}% APY</p>
			</div>
			
			{#if userTokenBalance + earnedRewardTokens + userStakeAmount == 0}

				<p>You need to own 37prime tokens to stake. Get some in the faucet!</p>
			
			{:else}
			
				<p>Your staked amount: <span class="stakedvaluetext">{tokenValToString(userStakeAmount)}</span></p>

				{#if userStakeAmount > 0}
					<p>Datetime you staked: {blockchainTimeToHuman(userStakedAtTime)}</p>
					<p>Your stake {Date.now() > (userUnlockTime * 1000) ? "was" : "is currently"} locked until: {blockchainTimeToHuman(userUnlockTime)}</p>
				{/if}
				
				{#if userAllowance == 0}
					<button on:click={btn_approveErc20}>Approve</button>
				{:else if userAllowance < 37*10**18}
					<button on:click={btn_approveErc20}>Approve more</button>
				{:else}
					<button disabled>Approved</button>
				{/if}

				<p>Your wallet balance: <span class="stakedvaluetext">{tokenValToString(userTokenBalance)}</span></p>
				<!-- <p>Approved amount: {userAllowance}</p> -->
				<p>How much to stake?</p>
				<input type="number" placeholder="0" bind:value={amountToStake} min="0" max={userTokenBalance} on:blur={maxValueInput} style="text-align: right; width: 200px;"/>
				<button on:click={()=>{amountToStake = tokenValToString(userTokenBalance)}}>Max</button>

				{#if amountToStake < userAllowance}
					<button on:click={btn_stake}>Stake</button>
				{:else}
					<button disabled>Stake</button>
				{/if}

				{#if earnedRewardTokens > 0}

					<p>Claimable Reward: {tokenValToString(earnedRewardTokens)} <button on:click={btn_claim}>Claim</button></p>

				{/if}

				{#if userStakeAmount > 0}

					{#if Date.now() > (userUnlockTime * 1000)}
						<p>Withdraw Stake</p>

						<input type="number" placeholder="0" bind:value={amountToWithdraw} min="0" max={tokenValToString(userStakeAmount)} on:blur={maxValueInput} style="text-align: right; width: 200px;"/>
						<button on:click={()=>{amountToWithdraw = tokenValToString(userStakeAmount)}}>Max</button>
						<button on:click={btn_withdraw}>Withdraw</button>
					{:else}
						<p>Your stake is currently locked until: {blockchainTimeToHuman(userUnlockTime)}</p>
						<br />
					{/if}
				{/if}

				<p>Token claim and Token Withdraw needs to be done separately</p>

			{/if}

			<p>Staking contract: {contractsData.staking.address}</p>
		</div>

		<p>Done with ❤️ using <a href="https://svelte.dev/">Svelte</a></p>
	</div>
	{/if}
</main>


{#if loadingModal}
	<div class="modal" transition:fade>
		<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
	</div>
{/if}
