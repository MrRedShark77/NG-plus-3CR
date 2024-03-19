const STARTING_COST = [null,10,100,1e4,1e6,1e9,1e13,1e18,1e24]

function metaDimensionSetupHTML() {
    let mp = el('meta_parent')

    let h = ""

    for (let x = 1; x <= 8; x++) {
        h += `
        <tr style="font-size: 15px" id="MD_div${x}">
            <td id="MD${x}" width="32%" class="rel">
                ${DISPLAY_NAMES[x]} Meta-Dimension x1
            </td>
            <td>
                <div id="MDAmount${x}">0 (0)</div>
            </td>
            <td>
                <button id="md${x}auto" style="width:70px; font-size: 10px; float: right; visibility: hidden" onclick="toggleAutoMD(${x})" class="storebtn">Auto: ON</button>
            </td>
            <td align="right" width="10%">
                <button onclick="buyMD(${x})" id="MDCost${x}" style="color:black; height: 25px; font-size: 10px; width: 210px" class="storebtn" align="right">Cost: ${shortenCosts(STARTING_COST[x])}</button>
            </td>
            <td align="right" width="10%">
                <button onclick="buyMD(${x},true)" style="color:black; width:135px; height: 25px; font-size: 10px" class="storebtn" align="right">Buy Max</button>
            </td>
        </tr>
        `
    }

    mp.innerHTML = h
}

function toggleAutoMD(i) {
    player.meta[i].auto = !player.meta[i].auto
    updateAutoMD()
}

function toggleAutoMDReset() {
    player.meta.auto_reset = !player.meta.auto_reset
    updateAutoMD()
}

function getMetaDimensionProduction(tier) {
    var ret = player.meta[tier].amount
    ret = ret.times(tmp.meta.mult[tier])
    return ret
}

function updateAutoMD() {
    let qsm = player.quantum.speedruns

    for (let x = 1; x <= 8; x++) {
        let ma = el('md'+x+'auto')

        ma.style.visibility = x <= qsm - 6 ? 'visible' : 'hidden'
        ma.textContent = player.meta[x].auto ? "Auto: ON" : "Auto: OFF"
    }

    let mr = el('metaresetauto')

    mr.style.visibility = qsm > 14 ? 'visible' : 'hidden'
    mr.textContent = player.meta.auto_reset ? "Auto: ON" : "Auto: OFF"
}

function getMetaDimensionRateOfChange(tier) {
    let toGain = getMetaDimensionProduction(tier+1)
    var current = Decimal.max(player.meta[tier].amount, 1);
    var change  = toGain.times(10).dividedBy(current);
    return change;
}

function getMetaDimensionDescription(tier) {
    let description = shortenDimensions(player.meta[tier].amount) + " (" + player.meta[tier].bought + ")";
  
    if (tier < 8) {
        description += '  (+' + formatValue(player.options.notation, getMetaDimensionRateOfChange(tier), 2, 2) + '%/s)';
    }
  
    return description;
}

function metaUnlocked() { return player.dilation.studies.includes(6) }

function maxAllMD() { for (let x = 1; x <= 8; x++) buyMD(x,true) }

function buyMD(i,max=false) {
    if (i > Math.min(8,4+player.meta.reset)) return;

    let cost = tmp.meta.cost[i]

    if (player.meta.antimatter.gte(cost)) {
        let buying = 1

        if (max) {
            let bulk = getMDBulk(i)

            cost = getMDCost(i,bulk-1)
            buying = Math.max(bulk - player.meta[i].bought,0)
        }

        player.meta[i].amount = player.meta[i].amount.add(buying)
        player.meta[i].bought += buying

        player.meta.firstDBought = true

        player.meta.antimatter = player.meta.antimatter.sub(cost).max(0)

        if (i==8) giveAchievement('r142',true)

        updateMDTemp()
    }
}

function metaSoftReset(auto) {
    if (player.meta[Math.min(8,player.meta.reset+4)].bought >= tmp.meta.reset_req) {
        let bulk = 1

        if (auto) {
            bulk = bulkNumberFromFunction(getMDResetReq,player.meta[8].bought,-player.meta.reset)

            if (bulk <= 0) bulk = 1
        }

        player.meta.reset += bulk

        if (player.meta.reset>=10) giveAchievement('r145',true)

        resetMD()
        player.meta.antimatter = player.achievements.includes('r142')?E(110):E(10)
        updateMDTemp()
    }
}

function resetMD() {
    for (let x = 1; x <= 8; x++) {
        player.meta[x] = {
            amount: E(0),
            bought: 0,
            auto: player.meta[x].auto,
        }
    }
}

function calcMetaDimensions(dt) {
    for (let x = 7; x >= 1; x--) player.meta[x].amount = player.meta[x].amount.add(getMetaDimensionProduction(x+1).mul(dt/100))

    let ma_added = player.meta.antimatter.add(getMetaDimensionProduction(1).mul(dt/10))

    player.meta.antimatter = ma_added
    player.meta.best1 = player.meta.best1.max(ma_added)
}

function updateMetaDimensionsHTML() {
    let pm = player.meta

    el('metatabbtn').style.display = metaUnlocked() ? "" : "none"

    if (document.getElementById("metadimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {
        let mtier = Math.min(8,pm.reset+4)

        el('r154Reward').style.display = player.achievements.includes('r154') ? '' : 'none'
        el('r154Reward').innerHTML = `Your "Hadronization" multiplier is currently <b>${shorten(getR154Reward())}x</b>.`

        el('metaAntimatter').textContent = shortenMoney(pm.antimatter)
        el('bestMA1').textContent = shortenMoney(pm.best1)

        el('MDEffectPower').textContent = tmp.meta.pow.toFixed(1)
        el('MDEffect').innerHTML = `<span style="font-size:35px; color: black">${shortenMoney(tmp.meta.effect)}</span>x ` + (inQC(3) ? `multiplier on all infinity dimensions.` : `extra multiplier per Dimension Boost.`)
        el('MAGain').textContent = `You are getting ${shortenMoney(getMetaDimensionProduction(1))} meta-antimatter per second.`

        for (let x = 1; x <= 8; x++) {
            let unl = x <= mtier && (x == 1 || player.quantum.speedruns>0 || pm[x-1].bought>0)

            el("MD_div"+x).style.display = unl ? "" : "none"

            if (!unl) continue;

            el('MD'+x).textContent = (player.meta[x].bought >= 1625-125*x ? "Superscaled " : player.meta[x].bought >= 110-10*x+(tmp.atom.neutron_eff||0) ? "Scaled " : "")+DISPLAY_NAMES[x]+" Meta-Dimension x"+shortenMoney(tmp.meta.mult[x])
            el('MDAmount'+x).textContent = getMetaDimensionDescription(x)
            el('MDCost'+x).textContent = "Cost: "+shortenCosts(tmp.meta.cost[x])+" MA"

            el('MDCost'+x).className = pm.antimatter.gte(tmp.meta.cost[x]) ? "storebtn" : "unavailablebtn"
        }

        el('metaResetLabel').textContent = 
        `Meta-Dimension ${pm.reset >= 4 ? "Boost" : "Shift"} (${pm.reset}): requires ${tmp.meta.reset_req} ${DISPLAY_NAMES[mtier]} Meta-Dimension`;
        el('metaSoftReset').textContent = 
        `Reset meta-dimensions for a `+(pm.reset<4?"new meta-dimension":"boost");
        el('metaSoftReset').className = pm[mtier].bought >= tmp.meta.reset_req ? "storebtn" : "unavailablebtn"

        el('quantumReq').textContent = `Quantum: requires ${shortenMoney(QU_REQ_MA)} meta-antimatter and two EC15 completions`
        el('quButton').textContent = `Lose all your previous progress, but gain ${shortenDimensions(tmp.quarksGain)} quarks for boosts`
        el('quButton').className = player.meta.best1.gte(QU_REQ_MA) && ECTimesCompleted('eterc15') >= 2 ? "storebtn" : "unavailablebtn"
    }
}

function getR154Reward() {
    let c = player.quantum.charge, x = E(1)

    for (let i in c) x = x.mul(c[i].add(1).l+1)

    return x
}

function getMDCost(i, p = player.meta[i].bought) {
    var q1 = 110 - 10*i + (tmp.atom.neutron_eff||0)
    var q2 = 1625 - 125*i
    if (hasTSTier(2,133)) q2 += 100

    if (p>=q2) p = (p/q2)**3*q2
    if (p>=q1) p = (p/q1)**2*q1

    return Decimal.pow(costMults[i],p).mul(STARTING_COST[i])
}

function getMDBulk(i) {
    var x = player.meta.antimatter.div(STARTING_COST[i]).log(costMults[i]), q1 = 110 - 10*i + (tmp.atom.neutron_eff||0)
    var q2 = 1625 - 125*i
    if (hasTSTier(2,133)) q2 += 100

    if (x >= q1) x = Math.pow(x/q1,1/2)*q1
    if (x >= q2) x = Math.pow(x/q2,1/3)*q2

    return Math.floor(x)+1
}

function getMPMDPower() {
    let x = 2

    if (player.dilation.upgrades.includes(14)) x *= getDU14Effect()

    return x
}

function getMDBPower() {
    if (inQC(8)) return 1

    let x = 2

    if (player.dilation.upgrades.includes(14)) x *= getDU14Effect()
    if (QCCompleted(8)) x *= 1+tmp.qc_modifiers[8]/8
    if (hasTSTier(2,123)) x *= 1.25

    return x
}

function getMDMult(i) {
    let p = player.meta[i].bought

    let x = Decimal.pow(tmp.meta.mult_inc[0],p).mul(Decimal.pow(tmp.meta.mult_inc[1],Math.max(0,player.meta.reset-i+1)))

    if (player.dilation.upgrades.includes(13)) x = x.mul(Math.log10(Math.abs(player.tickspeed.l)+10))

    if (hasGluonUpg('rg2')) x = x.mul(gluonUpgEff('rg2'))

    for (let t = 41; t <= 43; t++) if (hasTSTier(2,t)) x = x.mul(TSTierEffect(2,t))

    if (player.achievements.includes('r153')) x = x.mul(player.achPow)
    if (player.achievements.includes('r154')) x = x.mul(getR154Reward())
    if (player.achievements.includes('r175')) x = x.mul(Decimal.pow(10,tmp.qc_total_modifiers))

    if (hasTSTier(2,93)) x = x.mul(TSTierEffect(2,93))

    if (hasGluonUpg('br4')) x = x.mul(gluonUpgEff('br4'))

    if (inQC(6)) x = dilates(x)

    return x
}

function getMDEffect() {
    let p = tmp.meta.pow

    return player.meta.best1.div(10).max(1).pow(p)
}

function getMDResetReq(x) {
    if (x > 249) x = (x/250)**2*250
    x = Math.ceil(2+Math.max(0,x-4)*1.5)
    return x
}

function updateMDTemp() {
    let mtmp = tmp.meta

    let p = 5

    if (inQC(1) || inQC(7)) p = 0
    else if (inQC(3)) {
        p = Math.pow(player.meta.antimatter.log10() / 8, 2)
        if (p > 1e8) p = Math.pow(p * 1e6, 4/7)
    } else {
        if (player.dilation.upgrades.includes(15)) p ++
        p += ECTimesCompleted('eterc13')/5
        if (hasTSTier(2,83)) p += TSTierEffect(2,83,0)
    }

    mtmp.pow = p * (tmp.preonsEff[6]??1)

    mtmp.mult_inc = [getMPMDPower(), getMDBPower()]
    mtmp.effect = getMDEffect()

    mtmp.reset_req = getMDResetReq(player.meta.reset)

    for (let x = 1; x <= 8; x++) {
        mtmp.mult[x] = getMDMult(x)
        mtmp.cost[x] = getMDCost(x)
    }
}