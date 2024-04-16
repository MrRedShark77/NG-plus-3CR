function updateReplicantsHTML() {
    el("replicant-replicanti").innerHTML = shortenDimensions(player.replicanti.amount)

    var c1 = getRBCost(0), c2 = getRBCost(1)

    el("replicant-buyable1").innerHTML = `Get one or more replicants.<br>Require: ${shortenCosts(c1)} replicantis`
    el("replicant-buyable1").className = player.replicanti.amount.gte(c1) ? "gluonupgrade storebtn" : "gluonupgrade locked"

    el("replicant-buyable2").innerHTML = `Get one worker replicant.<br>Cost: ${shorten(c2)} QK`
    el("replicant-buyable2").className = player.quantum.quarks.gte(c2) ? "gluonupgrade storebtn" : "gluonupgrade locked"

    el("replicant-amt").innerHTML = shortenDimensions(player.quantum.replicant.amount.add(player.quantum.replicant.buyables[0]))
    el("preons-gain").innerHTML = shortenDimensions(tmp.preonsGain)

    el("preons-amt").innerHTML = shortenDimensions(player.quantum.replicant.preons)

    el("workers-amt").innerHTML = shortenDimensions(player.quantum.replicant.worker.add(player.quantum.replicant.buyables[1]))
    el("replicant-gain").innerHTML = shorten(tmp.replicantsGain)

    for (let i = 1; i < PREONS_EFF.length; i++) {
        var p_el = el("preon-"+i+"-effect"), P = PREONS_EFF[i]

        var req = player.quantum.replicant.unlocked.includes(i)

        p_el.innerHTML = req ? P[0](tmp.preonsEff[i]) : P[3]?.() ?? "???"
        p_el.className = req ? "preon-div" : "preon-div locked"
    }
}

function getRBCost(i,l=player.quantum.replicant.buyables[i]) {
    switch (i) {
        case 0:
        return Decimal.pow(10,6e5+1e4*l)
        case 1:
        return Decimal.pow(10,51+0.25*l)
    }
}

function getRBBulk(i,r=getRBResource(i)) {
    switch (i) {
        case 0:
        return Math.floor((r.max(1).log10()-6e5)/1e4)+1
        case 1:
        return Math.floor((r.max(1).log10()-51)/0.25)+1
    }
}

function getRBResource(i,set) {
    switch (i) {
        case 0:
        return player.replicanti.amount
        case 1:
        return set ? player.quantum.quarks = set : player.quantum.quarks
    }
}

function purchaseRB(i,max) {
    var cost = getRBCost(i), res = getRBResource(i)
    if (res.gte(cost)) {
        var bulk = player.quantum.replicant.buyables[i]+1
        if (max) bulk = Math.max(bulk,getRBBulk(i,res))
        player.quantum.replicant.buyables[i] = bulk
        getRBResource(i,player.quantum.quarks.sub(getRBCost(i,bulk-1)).max(0))
    }
}

function preonsGain() {
    var x = player.quantum.replicant.amount.add(player.quantum.replicant.buyables[0])

    if (hasTSTier(2,171)) x = x.mul(TSTierEffect(2,171))

    return x
}

function replicantsGain() {
    var x = player.quantum.replicant.worker.add(player.quantum.replicant.buyables[1]).div(100)

    if (hasTSTier(2,172)) x = x.mul(player.quantum.replicant.buyables[0]+1)

    return x
}

function updateReplicantsTemp() {
    tmp.preonsGain = preonsGain()
    tmp.replicantsGain = replicantsGain()

    for (let i = 1; i < PREONS_EFF.length; i++) tmp.preonsEff[i] = PREONS_EFF[i][1](player.quantum.replicant.unlocked.includes(i) ? player.quantum.replicant.preons : E(0))
}

const PREONS_EFF = [
    null,
    [
        x=>`Increase the green power by +<span style="font-size: 16px">${getFullExpansion(Math.round(x*100))}</span>%.`,
        p=>{
            let x = Math.pow(p.add(1).log10(),0.25)*2/3

            return x
        },
    ],[
        x=>`Delay replicate interval slowdown by +<span style="font-size: 16px">${getFullExpansion(Math.round(x))}</span> OoMs.`,
        p=>{
            let x = p.add(1).log10()*10

            return x
        },
    ],[
        x=>`Increase the exponent of replicate interval base by +<span style="font-size: 16px">${shorten(x)}</span>.`,
        p=>{
            let x = Math.pow(p.add(1).log10(),0.75)

            return x
        },
        ()=>player.replicanti.amount.gte('1e800000'),
        ()=>`Reach ${shorten(Decimal.pow(10,8e5))} replicantis.`,
    ],[
        x=>`Increase the exponent of infinity power formula by x<span style="font-size: 16px">${shorten(x)}</span>.`,
        p=>{
            let x = Math.pow(p.add(1).log10()/5+1,0.5)

            return x
        },
        ()=>player.quantum.protons==0&&player.infinityPower.l>=6e9,
        ()=>`Reach ${shorten(Decimal.pow(10,6e9))} infinity powers without gaining protons.`,
    ],[
        x=>`You can get <span style="font-size: 16px">${getFullExpansion(Math.round((x-1)*100))}</span>% more free tickspeeds.`,
        p=>{
            let x = p.add(1).log10()/4+1

            return x
        },
        ()=>player.timeShards.lte(0)&&player.quantum.electrons==0&&player.money.l>=2.8e11,
        ()=>`Reach ${shorten(Decimal.pow(10,2.8e11))} antimatter without time dimensions nor gaining electrons.`,
    ],[
        x=>`Increase the exponent of meta-antimatter’s effect x<span style="font-size: 16px">${shorten(x)}</span>.`,
        p=>{
            let x = Math.pow(p.add(1).log10()/10+1,0.5)

            return x
        },
        ()=>player.quantum.neutrons==0&&player.meta.best1.l>=3333,
        ()=>`Reach ${shorten(Decimal.pow(10,3333))} meta-antimatter without gaining neutrons.`,
    ],[
        x=>`More further reduce the dimension cost multiplier to <span style="font-size: 16px">${Math.pow(player.dimensionMultDecrease,x).toFixed(2)}</span> from ${player.dimensionMultDecrease.toFixed(2)}.`,
        p=>{
            let x = 1/(p.add(1).log10()**0.5/25+1)

            return x
        },
        ()=>player.replicanti.amount.gte('1e15000000'),
        ()=>`Reach ${shorten(Decimal.pow(10,1.5e7))} replicantis.`,
    ],[
        x=>`More further reduce the tickspeed cost multiplier to <span style="font-size: 16px">${Math.pow(player.tickSpeedMultDecrease,x).toFixed(2)}</span> from ${player.tickSpeedMultDecrease.toFixed(2)}.`,
        p=>{
            let x = 1/(p.add(1).log10()**0.5/25+1)

            return x
        },
        ()=>tmp.totalGalaxies>=5e4,
        ()=>`Have at least ${getFullExpansion(5e4)} total galaxies.`,
    ],
]