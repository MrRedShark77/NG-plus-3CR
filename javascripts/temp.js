var tmp = {}

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

function updateTemp() {
    updateTSTiersTemp()
    updateMDTemp()

    tmp.inf_pow = 7
    if (hasTSTier(2,34)) tmp.inf_pow += TSTierEffect(2,34,0)

    tmp.inf_eff = player.infinityPower.pow(tmp.inf_pow)

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