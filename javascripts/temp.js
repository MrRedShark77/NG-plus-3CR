var tmp = {}

var passed = 0

function setupTemp() {
    let s = {
        dimBoostReq: { tier: 1/0, amount: 1/0, mult: 1 },
        galaxyReq: 1/0,
        distantGalaxySpeed: 1,

        AM_gain: E(0),
        AM_deflation: 1,

        ndPower: E(2),

        extraDimBoost: 0,
        dimBoostPower: E(1),
        finalNDmult: [E(1),E(1),E(1),E(1),E(1),E(1),E(1),E(1)],

        TP_exponent: 1.5,
        TP_mult: E(1),
        tachyonGain: E(0),

        EP_DIL_upg: [1,1,1],

        dil_nextThresholdMult: 5,
        dil_nextThreshold: E(1e3),

        nextTickUpg: E(1/0),

        tsReduce: E(1),

        inf_pow: 7,
        inf_eff: E(1),

        extraRG: 0,
        totalGalaxies: 0,

        infGain: 1,
        eterGain: 1,

        meta: {
            mult: [null],
            cost: [null],
            effect: E(1),
            pow: 5,

            mult_inc: [2,2],

            reset_req: 2,
        },

        inf_bought_cap: 2e6,

        ts_tier: {
            cost: [],
            effect: [],
            mult: [],
            boughts: [],
        },

        remoteGalaxyStart: 800,

        infMultUpg: E(1),

        inf_mult_base: 2,

        quarksGain: E(0),
        chargeRate: {
            r: E(0),
            g: E(0),
            b: E(0),
        },
        chargeEffect: {
            r: 1,
            g: 1,
            b: E(1),
        },
        quarksWorth: E(0),

        repEff: E(1),
        sacPow: E(1),

        gluon_eff: {},
        qc_completions: 0,
        qc_modifiers: [null,0,0,0,0,0,0,0,0],
        qc_total_modifiers: 0,

        atom: {
            proton_eff: [1,2e6],
            electron_eff: [1,E(2)],

            mult: .25,

            total_mult: [1,1],
        },

        preonsGain: E(0),
        preonsEff: [],
    }

    for (let x = 1; x <= 8; x++) {
        s.meta.cost[x] = E(STARTING_COST[x])
        s.meta.mult[x] = E(1)
    }

    for (let t = 2; t < TS_TIERS.length; t++) {
        s.ts_tier.cost[t] = {}
        s.ts_tier.effect[t] = {}
    }

    tmp = s
}

function getReplicantEffect() {
    var replmult = Decimal.pow(Decimal.log2(player.replicanti.amount.max(2)), 2)

    if (player.timestudy.studies.includes(21)) replmult = replmult.plus(Decimal.pow(player.replicanti.amount.max(1), 0.032))
    if (player.achievements.includes('r155')) replmult = replmult.plus(Decimal.pow(player.replicanti.amount.max(1), 0.5))

    if (player.timestudy.studies.includes(102)) replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies))

    return replmult
}

function antimatterGain() {
    let x = getDimensionProductionPerSecond(1)

    if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") x = x.times(player.chall3Pow)

    if (player.currentChallenge == "challenge7") x = x.plus(getDimensionProductionPerSecond(2))

    let s_log = 1e12

    if (QCCompleted(5)) s_log *= QUANTUM_CHALLENGES[5].effect()
    if (inQC(5)) s_log = 1e6

    if (x.l > s_log) {
        let sx = x
        x = Decimal.pow(10,Math.pow(x.l/s_log,0.75)*s_log)
        tmp.AM_deflation = sx.l/x.l
    } else tmp.AM_deflation = 1

    return x
}

function getReplicantSpeed() {
    let inc = .2
    if (QCCompleted(2)) inc -= 0.02 * tmp.qc_modifiers[2]

    let exp = 308 + (tmp.preonsEff[2]??0)

    if (hasTSTier(2,122)) exp += TSTierEffect(2,122,0)

    if (hasGluonUpg('gb2')) exp *= 2

    return {inc: inc+1, exp: exp}
}

function getQuarksWorth() {
    let x = player.quantum.quarks
    var colors = ['r','g','b']
    for (let c = 0; c < 3; c++) x = x.add(player.quantum.color[colors[c]])
    for (let mix = 0; mix < 3; mix++) x = x.add(player.quantum.gluons[MIX_COLORS[mix]])
    return x
}

function getRemoteGalaxyStarting() {
    let x = 800

    if (hasTSTier(2,32)) x += TSTierEffect(2,32,0)
    if (hasTSTier(2,33)) x += TSTierEffect(2,33,0)
    if (hasTSTier(2,36)) x += TSTierEffect(2,36,0)

    if (hasTSTier(2,121)) x += TSTierEffect(2,121,0)

    return x
}

function getExtraReplicatedGalaxies() {
    let x = 0

    let speed = QCCompleted(8) ? 6 : 2
    if (player.timestudy.studies.includes(225)) {
        let a = Math.floor(player.replicanti.amount.e / 1000)
        if (a>299) a = Math.floor(Math.sqrt(0.25 + (a - 299) * speed) + 298.5)
        x += a
    }
    if (player.timestudy.studies.includes(226)) {
        let a = Math.floor(player.replicanti.gal / 15)
        if (a>99) a = Math.floor(Math.sqrt(0.25 + (a - 99) * speed) + 98.5)
        x += a
    }

    if (player.quantum.unlocked) x *= tmp.chargeEffect.g + (tmp.preonsEff[1]??0)
    return Math.round(x)
}

function getTotalGalaxies() {
    let x = player.galaxies + player.replicanti.galaxies + tmp.extraRG + player.dilation.freeGalaxies

    return x
}

function getInfinitedGain() {
    let x = 1

    if (player.thisInfinityTime > 50 && player.achievements.includes("r87")) x = 250;
    if (player.timestudy.studies.includes(32)) x *= Math.max(player.resets,1);
    if (hasTSTier(2,151)) x *= TSTierEffect(2,151)[0] ?? 1

    return x
}

function getEternitedGain() {
    let x = player.achievements.includes('r151')?25:1

    if (hasTSTier(2,152)) x *= TSTierEffect(2,152)[0] ?? 1

    return x
}

function getIPMultiplierFromUpgrade() {
    let x = player.infMult

    if (x.gte('1e250000000')) x = Decimal.pow(10,softcapNumber(x.l,2.5e8,0.5,0))

    return x
}

function calcNextTickUpg(offset=0) {
    let t = player.totalTickGained + offset

    let s = 1.5e7

    if (QCCompleted(7)) s *= Math.pow(2, tmp.qc_modifiers[7]/2)

    if (t > s) t = (t/s)**2*s

    t /= tmp.preonsEff[5]??1

    let base = player.timestudy.studies.includes(171) ? 1.25 : 1.33

    if (QCCompleted(7)) base **= 0.75

    return Decimal.pow(base,t)
}

function updateTemp() {
    tmp.qc_completions = 0

    for (let x = 1; x <= 8; x++) if (player.quantum.chal["qc"+x].completed) tmp.qc_completions++

    updateReplicantiTemp()

    tmp.nextTickUpg = calcNextTickUpg()
    
    tmp.repEff = getReplicantEffect()
    tmp.sacPow = calcTotalSacrificeBoost()

    tmp.quarksWorth = getQuarksWorth()
    tmp.extraRG = getExtraReplicatedGalaxies()
    tmp.totalGalaxies = getTotalGalaxies()

    tmp.infMultUpg = getIPMultiplierFromUpgrade()

    tmp.inf_mult_base = 2 + ECTimesCompleted('eterc14')/5

    tmp.infGain = getInfinitedGain()
    tmp.eterGain = getEternitedGain()

    updateQuantumTemp()
    updateTSTiersTemp()
    updateMDTemp()

    tmp.inf_pow = 7
    if (hasTSTier(2,34)) tmp.inf_pow += TSTierEffect(2,34,0)
    if (hasTSTier(2,82)) tmp.inf_pow += TSTierEffect(2,82,0)
    tmp.inf_pow *= tmp.preonsEff[4]??1

    tmp.inf_eff = player.infinityPower.add(1).pow(tmp.inf_pow)

    tmp.remoteGalaxyStart = getRemoteGalaxyStarting()

    tmp.dimBoostReq = getShiftRequirement(0)

    tmp.distantGalaxySpeed = distantGalaxySpeed()
    tmp.galaxyReq = getGalaxyRequirement()

    tmp.extraDimBoost = extraDimensionBoosts()
    tmp.dimBoostPower = getDimensionBoostPower()

    tmp.inf_bought_cap = tmp.atom.proton_eff[1]
    tmp.ndPower = inQC(4) || inQC(7) ? E(1) : tmp.atom.electron_eff[1]

    for (let x = 1; x <= 8; x++) {
        tmp.finalNDmult[x-1] = getDimensionFinalMultiplier(x)
    }

    tmp.TP_exponent = getTachyonGainExponent()
    tmp.TP_mult = getTachyonGainMultiplier()
    tmp.tachyonGain = player.dilation.active ? Decimal.pow(Decimal.log10(player.money) / 400, tmp.TP_exponent).mul(tmp.TP_mult) : E(0)

    tmp.EP_DIL_upg = eterUpgDilEff()

    tmp.dil_nextThresholdMult = getDilNextThresholdMult()
    tmp.dil_nextThreshold = Decimal.pow(tmp.dil_nextThresholdMult,player.dilation.freeGalaxies/(player.dilation.upgrades.includes(5)?2:1)).mul(1e3)

    tmp.tsReduce = getTickSpeedMultiplier()
    tmp.AM_gain = antimatterGain()
}

function getDilNextThresholdMult() {
    var x = inQC(4) ? Math.pow(10, 2.8) : 1.35 + 3.65 * Math.pow(0.8, player.dilation.rebuyables[2])

    if (player.achievements.includes("r167")) x -= 0.1

    return x
}

function distantGalaxySpeed() {
    let x = 1

    if (hasGluonUpg("rg5")) x *= 0.75
    if (hasGluonUpg("gb5")) x *= gluonUpgEff("gb5")
    if (hasGluonUpg("br5")) x *= gluonUpgEff("br5")

    return x
}

function updateMultDecreases() {
    player.dimensionMultDecrease = parseFloat((10 - Math.round(Math.log(player.dimensionMultDecreaseCost/1e8)/Math.log(5000)) - 0.2*ECTimesCompleted("eterc6")).toFixed(1))
    player.tickSpeedMultDecrease = parseFloat((10 - Math.round(Math.log(player.tickSpeedMultDecreaseCost/3e6)/Math.log(5)) - 0.07*ECTimesCompleted("eterc11")).toFixed(2))
}

function getReplicantiInterval() {
	let interval = Decimal.pow(player.replicanti.interval,(tmp.preonsEff[3]??0)+1)
    if (player.timestudy.studies.includes(62)) interval = interval.div(3)
    if (player.timestudy.studies.includes(133) || player.replicanti.amount.gt(Number.MAX_VALUE)) interval = interval.mul(10)
    if (player.timestudy.studies.includes(213)) interval = interval.div(20)
    if (player.replicanti.amount.lt(Number.MAX_VALUE) && player.achievements.includes("r134")) interval = interval.div(2)
    if (player.dilation.upgrades.includes(8)) interval = interval.div(player.dilation.dilatedTime.max(1).pow(0.05))
    if (hasGluonUpg('gb1')) interval = interval.div(gluonUpgEff('gb1'))
    // if (hasTSTier(2,173)) interval = interval.div(TSTierEffect(2,173))
	return interval
}

function getReplicantiFinalInterval() {
	let x = getReplicantiInterval()
	if (player.replicanti.amount.gt(Number.MAX_VALUE)) x = Decimal.pow(tmp.rep.speeds.inc, Math.max(player.replicanti.amount.log10() - tmp.rep.speeds.exp, 0)/tmp.rep.speeds.exp).times(x)
	return x
}

function extraDimensionBoosts() {
    let x = 0

    if (hasTSTier(2,131)) x += TSTierEffect(2,131,0) 

    return x
}

function updateReplicantiTemp() {
	var data = {}
	tmp.rep = data

	data.ln = player.replicanti.amount.ln()
	data.chance = player.replicanti.chance
	data.speeds = getReplicantSpeed()
	data.interval = getReplicantiFinalInterval()
    data.mult = Decimal.pow(2,player.replicanti.mult)

    /*
	if (tmp.ngp3 && player.masterystudies.includes("t273")) {
		data.chance = Decimal.pow(data.chance, tmp.mts[273])
		data.freq = 0
		if (data.chance.gte("1e9999998")) data.freq = tmp.mts[273].times(Math.log10(player.replicanti.chance + 1) / Math.log10(2))
	}
    */

    var exp = E(1)

    if (hasGluonUpg('gb4')) exp = exp.mul(gluonUpgEff('gb4'))

    data.chance = Decimal.pow(data.chance, exp)

    data.freq = 0
	if (data.chance.gte("1e9999998")) data.freq = exp.times(Math.log10(player.replicanti.chance + 1) / Math.log10(2))

	data.est = Decimal.div((data.freq ? data.freq.times(Math.log10(2) / Math.log10(Math.E) * 1e3) : Decimal.add(data.chance, 1).log(Math.E) * 1e3), data.interval).mul(data.mult)
	data.estLog = data.est.times(Math.log10(Math.E))
}