var tmp = {}

var passed = 0

function setupTemp() {
    let s = {
        dimBoostReq: getShiftRequirement(0),
        galaxyReq: getGalaxyRequirement(),

        ndPower: 2,

        dimBoostPower: E(1),
        finalNDmult: [E(1),E(1),E(1),E(1),E(1),E(1),E(1),E(1)],

        TP_exponent: 1.5,
        TP_mult: E(1),

        EP_DIL_upg: [1,1,1],

        dil_nextThresholdMult: 5,
        dil_nextThreshold: E(1e3),

        tsReduce: E(1),

        inf_pow: 7,
        inf_eff: E(1),

        extraRG: 0,
        totalGalaxies: 0,

        infGain: 1,

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

function getRemoteGalaxyStarting() {
    let x = 800

    if (hasTSTier(2,32)) x += TSTierEffect(2,32,0)
    if (hasTSTier(2,33)) x += TSTierEffect(2,33,0)
    if (hasTSTier(2,36)) x += TSTierEffect(2,36,0)

    return x
}

function getExtraReplicatedGalaxies() {
    let x = 0

    if (player.timestudy.studies.includes(225)) x += Math.floor(player.replicanti.amount.e / 1000)
    if (player.timestudy.studies.includes(226)) x += Math.floor(player.replicanti.gal / 15)

    if (player.quantum.unlocked) x *= tmp.chargeEffect.g

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

    return x
}

function getIPMultiplierFromUpgrade() {
    let x = player.infMult

    if (x.gte('1e250000000')) x = Decimal.pow(10,softcapNumber(x.l,2.5e8,0.5,0))

    return x
}

function updateTemp() {
    tmp.extraRG = getExtraReplicatedGalaxies()
    tmp.totalGalaxies = getTotalGalaxies()

    tmp.infMultUpg = getIPMultiplierFromUpgrade()

    tmp.inf_mult_base = 2 + ECTimesCompleted('eterc14')/5

    tmp.infGain = getInfinitedGain()

    updateQuantumTemp()
    updateTSTiersTemp()
    updateMDTemp()

    tmp.inf_pow = 7
    if (hasTSTier(2,34)) tmp.inf_pow += TSTierEffect(2,34,0)

    tmp.inf_eff = player.infinityPower.add(1).pow(tmp.inf_pow)

    tmp.remoteGalaxyStart = getRemoteGalaxyStarting()

    tmp.dimBoostReq = getShiftRequirement(0)
    tmp.galaxyReq = getGalaxyRequirement()

    tmp.dimBoostPower = getDimensionBoostPower()
    tmp.ndPower = getDimensionPowerMultiplier()

    for (let x = 1; x <= 8; x++) {
        tmp.finalNDmult[x-1] = getDimensionFinalMultiplier(x)
    }

    tmp.TP_exponent = getTachyonGainExponent()
    tmp.TP_mult = getTachyonGainMultiplier()

    tmp.EP_DIL_upg = eterUpgDilEff()

    tmp.dil_nextThresholdMult = 1.35 + 3.65 * Math.pow(0.8, player.dilation.rebuyables[2])
    tmp.dil_nextThreshold = Decimal.pow(tmp.dil_nextThresholdMult,player.dilation.freeGalaxies/(player.dilation.upgrades.includes(5)?2:1)).mul(1e3)

    tmp.tsReduce = getTickSpeedMultiplier()
}

function updateMultDecreases() {
    player.dimensionMultDecrease = parseFloat((10 - Math.round(Math.log(player.dimensionMultDecreaseCost/1e8)/Math.log(5000)) - 0.2*ECTimesCompleted("eterc6")).toFixed(1))
    player.tickSpeedMultDecrease = parseFloat((10 - Math.round(Math.log(player.tickSpeedMultDecreaseCost/3e6)/Math.log(5)) - 0.07*ECTimesCompleted("eterc11")).toFixed(2))
}