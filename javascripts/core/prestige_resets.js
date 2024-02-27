function doDimBoostReset(bulk) {
    if (!player.achievements.includes("r111")) player.money = E(0)
    player.tickSpeedCost = E(1000)
    player.tickspeed = E(1000)
    completelyResetNormalDimensions()
    player.sacrificed = E(0)
    player.costMultipliers = [E(1e3), E(1e4), E(1e5), E(1e6), E(1e8), E(1e10), E(1e12), E(1e15)]
    player.tickspeedMultiplier = E(10)
    player.chall3Pow = E(0.01)
    player.matter = E(0)
    player.chall11Pow = E(1)
    player.postC4Tier = 1
    player.postC3Reward = E(1)
    player.postC8Mult = new Decimal(1)
    setInitialDimensionPower()
}

function completelyResetNormalDimensions(){
	player.firstCost = E(10)
    player.secondCost = E(100)
    player.thirdCost = E(10000)
    player.fourthCost = E(1000000)
    player.fifthCost = E(1e9)
    player.sixthCost = E(1e13)
    player.seventhCost = E(1e18)
    player.eightCost = E(1e24)
    player.firstAmount = E(0)
    player.secondAmount = E(0)
    player.thirdAmount = E(0)
    player.fourthAmount = E(0)
    player.firstBought = 0
    player.secondBought = 0
    player.thirdBought = 0
    player.fourthBought = 0
    player.fifthAmount = E(0)
    player.sixthAmount = E(0)
    player.seventhAmount = E(0)
    player.eightAmount = E(0)
    player.fifthBought = 0
    player.sixthBought = 0
    player.seventhBought = 0
    player.eightBought = 0
}

function doGalaxyResetStuff(bulk){
	player.money = player.achievements.includes("r111") ? player.money : new Decimal(10)
	player.tickSpeedCost = new Decimal(1000)
    player.tickspeed = E(1000)
	completelyResetNormalDimensions()
	if (!player.achievements.includes('r145')) player.resets = 0
	player.interval = null
	player.galaxies += bulk
	player.sacrificed = E(0)
    player.costMultipliers = [E(1e3), E(1e4), E(1e5), E(1e6), E(1e8), E(1e10), E(1e12), E(1e15)]
    player.tickspeedMultiplier = E(10)
    player.chall3Pow = E(0.01)
    player.matter = E(0)
    player.chall11Pow = E(1)
    player.postC4Tier = 1
    player.postC3Reward = E(1)
    player.postC8Mult = new Decimal(1)
}

function doCrunchResetStuff(){
	let spm = player.quantum.speedruns

	player.money = new Decimal(10)
	player.tickSpeedCost = new Decimal(1000)
	player.sacrificed = new Decimal(0)
	player.bestInfinityTime = (!inEC(12)) ? Math.min(player.bestInfinityTime, player.thisInfinityTime) : player.bestInfinityTime
	player.thisInfinityTime = 0
	player.resets = 0
	player.interval = null
	player.costMultipliers = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
	player.tickspeedMultiplier = new Decimal(10)
	player.chall2Pow = 1
	player.chall3Pow = new Decimal(0.01)
	player.matter = new Decimal(0)
	player.chall11Pow = new Decimal(1)
	player.postC4Tier = 1
	player.postC8Mult = new Decimal(1)
	player.galaxies = 0
    player.postC3Reward = E(1)
	player.tickspeed = E(1000)
	completelyResetNormalDimensions()
}

function doEternityResetStuff(chal=false){
	let spm = player.quantum.speedruns

	player.money = new Decimal(10)
	player.tickSpeedCost = new Decimal(1000)
	player.tickspeed = new Decimal(1000)
	completelyResetNormalDimensions()
	player.infinitied = 0
	player.sacrificed = new Decimal(0)
	player.bestInfinityTime = 9999999999
	player.thisInfinityTime = 0
	player.resets = (getEternitied() > 3) ? 4 : 0
	player.challenges = challengesCompletedOnEternity()
	player.currentChallenge = ""
	player.galaxies = (getEternitied() > 3) ? 1 : 0
	player.interval = null
	player.autobuyers = (getEternitied() > 1) ? player.autobuyers : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	player.break = getEternitied() > 1 ? player.break : false
	player.costMultipliers = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
	player.partInfinityPoint = 0
	player.partInfinitied = 0    
	player.tickspeedMultiplier = new Decimal(10)
	player.chall2Pow = 1
	player.chall3Pow = new Decimal(0.01)
	player.matter = new Decimal(0)
	player.chall11Pow = new Decimal(1)
	player.lastTenRuns = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
	player.infMult = new Decimal(1)
	player.infMultCost = new Decimal(10)
	player.tickSpeedMultDecrease = getEternitied() > 19 ? player.tickSpeedMultDecrease : 10
	player.tickSpeedMultDecreaseCost = getEternitied() > 19 ? player.tickSpeedMultDecreaseCost : 3e6
	player.dimensionMultDecrease = getEternitied() > 19 ? player.dimensionMultDecrease : 10
	player.dimensionMultDecreaseCost = getEternitied() > 19 ? player.dimensionMultDecreaseCost : 1e8
	player.postChallUnlocked = player.achievements.includes("r133") ? player.postChallUnlocked : 0
	player.postC4Tier = 1
	player.postC8Mult = new Decimal(1)
	player.infDimensionsUnlocked = resetInfDimUnlocked()
	player.infinityPower = new Decimal(1)
	completelyResetInfinityDimensions()
	player.timeShards = new Decimal(0)
	player.tickThreshold = new Decimal(1)
	player.totalTickGained = 0
	player.thisEternity = 0
	player.totalTickGained = 0
	player.offlineProd = getEternitied() > 19 ? player.offlineProd : 0
	player.offlineProdCost = getEternitied() > 19 ? player.offlineProdCost : 1e7
	player.challengeTarget = 0
	player.autoSacrifice = getEternitied() > 6 ? player.autoSacrifice : 1
	if (spm>21) player.replicanti.amount = new Decimal(getEternitied() > 49 ? 1 : 0)
	player.replicanti.unl = getEternitied() > 49
	player.replicanti.galaxies = 0
	player.autoIP = new Decimal(0)
	player.autoTime = 1e300
	player.eterc8ids = 50
	player.eterc8repl = 40
	player.dimlife = true
	player.dead = true
	if (!chal) {
		player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
		player.currentEternityChall = ""
	}
    player.postC3Reward = E(1)
}

function setInitialDimensionPower () {
    player.firstPow = tmp.dimBoostPower.pow(player.resets)
    player.secondPow = tmp.dimBoostPower.pow(player.resets - 1).max(1)
    player.thirdPow = tmp.dimBoostPower.pow(player.resets - 2).max(1)
    player.fourthPow = tmp.dimBoostPower.pow(player.resets - 3).max(1)
    player.fifthPow = tmp.dimBoostPower.pow(player.resets - 4).max(1)
    player.sixthPow = tmp.dimBoostPower.pow(player.resets - 5).max(1)
    player.seventhPow = tmp.dimBoostPower.pow(player.resets - 6).max(1)
    player.eightPow = tmp.dimBoostPower.pow(player.resets - 7).max(1)
}

function doNormalChallengeResetStuff(){
	player.money = new Decimal(10)
	player.tickSpeedCost = new Decimal(1000)
	completelyResetNormalDimensions()
	player.sacrificed = new Decimal(0)
	player.thisInfinityTime = 0
	player.resets = 0
	player.galaxies = 0
	player.interval = null
	player.costMultipliers = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
	player.tickspeedMultiplier= new Decimal(10)
	player.chall2Pow = 1
	player.chall3Pow = new Decimal(0.01)
	player.matter = new Decimal(0)
	player.chall11Pow = new Decimal(1)
	player.postC4Tier = 1
	player.postC8Mult = new Decimal(1)
    player.postC3Reward = E(1)
	player.tickspeed = E(1000)
}
			
function completelyResetTimeDimensions(){
	player.timeDimension1 = {
		cost: new Decimal(1),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
	player.timeDimension2 = {
		cost: new Decimal(5),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
	player.timeDimension3 = {
		cost: new Decimal(100),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
	player.timeDimension4 = {
		cost: new Decimal(1000),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
	player.timeDimension5 = {
		cost: new Decimal("1e2350"),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
	player.timeDimension6 = {
		cost: new Decimal("1e2650"),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
	player.timeDimension7 = {
		cost: new Decimal("1e3000"),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
	player.timeDimension8 = {
		cost: timeDimCost(8,0),
		amount: new Decimal(0),
		power: new Decimal(1),
		bought: 0
	}
}

function completelyResetInfinityDimensions(){
	player.infinityDimension1 = {
		cost: new Decimal(1e8),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
	player.infinityDimension2 = {
		cost: new Decimal(1e9),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
	player.infinityDimension3 = {
		cost: new Decimal(1e10),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
	player.infinityDimension4 = {
		cost: new Decimal(1e20),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
	player.infinityDimension5 = {
		cost: new Decimal(1e140),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
	player.infinityDimension6 = {
		cost: new Decimal(1e200),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
	player.infinityDimension7 = {
		cost: new Decimal(1e250),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
	player.infinityDimension8 = {
		cost: new Decimal(1e280),
		amount: new Decimal(0),
		bought: 0,
		power: new Decimal(1),
		baseAmount: 0
	}
}

function doQuantumResetStuff() {
	let spm = player.quantum.speedruns
	let headstart = true, oheHeadstart = spm>0, keepABnICs = spm>0

	player.eternities = spm>0 ? 25000 : 10*player.quantum.times

	player.money = new Decimal(10)
	player.tickSpeedCost = new Decimal(1000)
	player.tickspeed = new Decimal(1000)
	completelyResetNormalDimensions()
	player.currentChallenge = ""
	player.infinitied = 0
	player.infinitiedBank = 0
	player.bestInfinityTime = 9999999999
	player.thisInfinityTime = 0
	player.interval = null
	player.partInfinityPoint = 0
	player.partInfinitied = 0
	player.costMultipliers = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
	player.tickspeedMultiplier = new Decimal(10)
	player.chall2Pow = 1
	player.chall3Pow = new Decimal(0.01)
	player.matter = new Decimal(0)
	player.chall11Pow = new Decimal(1)
	player.lastTenRuns = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
	player.lastTenEternities = [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]]
	player.infMult = new Decimal(1)
	player.infMultCost = new Decimal(10)
	player.postC4Tier = 1
	player.postC8Mult = new Decimal(1)
	player.postChallUnlocked = player.achievements.includes("r133") ? player.postChallUnlocked : 0
	player.postC4Tier = 0
	player.postC3Reward = new Decimal(1)
	player.eternityPoints = new Decimal(0)
	player.thisEternity = 0
	player.bestEternity = headstart ? player.bestEternity : 9999999999
	player.epmult = new Decimal(1)
	player.epmultCost = new Decimal(500)
	player.infDimensionsUnlocked = resetInfDimUnlocked()
	player.infinityPower = new Decimal(1)
	completelyResetInfinityDimensions()
	player.infDimBuyers = oheHeadstart ? player.infDimBuyers : [false, false, false, false, false, false, false, false]
	player.timeShards = new Decimal(0)
	player.tickThreshold = new Decimal(1)
	player.totalTickGained = 0
	completelyResetTimeDimensions()
	player.challengeTarget = 0
	player.replicanti = {
		amount: new Decimal(oheHeadstart ? 1 : 0),
		unl: oheHeadstart,
		chance: 0.01,
		chanceCost: new Decimal(1e150),
		interval: 1000,
		intervalCost: new Decimal(1e140),
		gal: 0,
		galaxies: 0,
		galCost: new Decimal(1e170),
		auto: oheHeadstart ? player.replicanti.auto : [false, false, false, false],
		galaxybuyer: player.replicanti.galaxybuyer,
		mult: 0,
	}
	player.timestudy = false ? player.timestudy : {
		theorem: E(0),
		amcost: new Decimal("1e20000"),
		ipcost: new Decimal(1),
		epcost: new Decimal(1),
		studies: spm>10?player.timestudy.studies:[],
		auto: player.timestudy.auto,
	}
	player.eternityChalls = {}
	if (spm>2) for (let i = 1; i <= (spm>5?15:12); i++) player.eternityChalls['eterc'+i] = 5
	player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
	player.currentEternityChall = ""
	player.eternityChallUnlocked = false ? player.eternityChallUnlocked : 0
	player.etercreq = 0
	player.autoIP = new Decimal(0)
	player.autoTime = 1e300
	player.respec = false
	player.eternityBuyer = keepABnICs ? player.eternityBuyer : {
		limit: new Decimal(0),
		isOn: false
	}
	player.eterc8ids = 50
	player.eterc8repl = 40
	player.dimlife = true
	player.dead = true
	//if (!player.dilation.bestTP) player.dilation.bestTP = player.dilation.tachyonParticles
	player.dilation = {
		studies: spm>4?[1,2,3,4,5,6]:spm>3?[1]:[],
		active: false,
		tachyonParticles: new Decimal(0),
		totalTachyonParticles: new Decimal(0),
		dilatedTime: new Decimal(spm>19?1e100:0),
		//bestTP: Decimal.max(player.dilation.bestTP || 0, player.dilation.tachyonParticles),
		nextThreshold: new Decimal(1000),
		freeGalaxies: 0,
		upgrades: spm>13?player.dilation.upgrades:spm>4?[5,6,7,8,9,10,11]:[],
		//autoUpgrades: [],
		rebuyables: {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
		},
		auto_upg: player.dilation.auto_upg,
	}

	player.eternityUpgrades = []
	if (spm>2) player.eternityUpgrades = spm>3?[1,2,3,4,5,6,7,8,9]:[1,2,3,4,5,6]

	if (spm<=15) player.ts_tier[0] = []

	let r = player.achievements.includes('r142')?E(110):E(10)
	if (spm>17) r = E(2e25)
	player.meta.antimatter = r
	player.meta.best1 = r
	player.meta.reset = spm>16 ? 4 : 0
	player.quantum.reached = false
	resetMD()

	doEternityResetStuff()
	doCrunchResetStuff()
}

function challengesCompletedOnEternity() {
	var array = []
	if (getEternitied() > 1) for (i = 1; i < 13; i++) array.push("challenge" + i)
	if (player.achievements.includes("r133")) for (i = 1; i < 9; i++) array.push('postc'+i)
	return array
}

function resetInfDimUnlocked() {
	let value = player != undefined && getEternitied() >= 25
	let data = []
	for (var d = 1; d <= 8; d++) data.push(value)
	if (player != undefined) data[0] = true
	return data
}

function resetTimeDimensions() {
    for (let x = 1; x < 8; x++) {
        player['timeDimension'+x].amount = E(player['timeDimension'+x].bought)
    }
}