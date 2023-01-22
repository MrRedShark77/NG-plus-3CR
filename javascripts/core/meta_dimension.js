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

function getMetaDimensionProduction(tier) {
    var ret = player.meta[tier].amount
    ret = ret.times(tmp.meta.mult[tier])
    return ret
}

function getMetaDimensionRateOfChange(tier) {
    let toGain = getMetaDimensionProduction(tier+1)
    var current = Decimal.max(player.meta[tier].amount, 1);
    var change  = toGain.times(10).dividedBy(current);
    return change;
}

function getMetaDimensionDescription(tier) {
    let description = shortenDimensions(player.meta[tier].amount);
  
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

            cost = Decimal.pow(costMults[i],bulk-1).mul(STARTING_COST[i])
            buying = Math.max(bulk - player.meta[i].bought,0)
        }

        player.meta[i].amount = player.meta[i].amount.add(buying)
        player.meta[i].bought += buying

        player.meta.antimatter = player.meta.antimatter.sub(cost).max(0)

        if (i==8) giveAchievement('r142',true)

        updateMDTemp()
    }
}

function metaSoftReset() {
    if (player.meta[Math.min(8,player.meta.reset+4)].bought >= tmp.meta.reset_req) {
        player.meta.reset++

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

        el('metaAntimatter').textContent = shortenMoney(pm.antimatter)
        el('bestMA1').textContent = shortenMoney(pm.best1)

        el('MDEffect').textContent = shortenMoney(tmp.meta.effect)
        el('MAGain').textContent = `You are getting ${shortenMoney(getMetaDimensionProduction(1))} meta-antimatter per second.`

        for (let x = 1; x <= 8; x++) {
            let unl = x <= mtier && (x == 1 || pm[x-1].bought>0)

            el("MD_div"+x).style.display = unl ? "" : "none"

            if (!unl) continue;

            el('MD'+x).textContent = DISPLAY_NAMES[x]+" Meta-Dimension x"+shortenMoney(tmp.meta.mult[x])
            el('MDAmount'+x).textContent = getMetaDimensionDescription(x)
            el('MDCost'+x).textContent = "Cost: "+shortenCosts(tmp.meta.cost[x])+" MA"

            el('MDCost'+x).className = pm.antimatter.gte(tmp.meta.cost[x]) ? "storebtn" : "unavailablebtn"
        }

        el('metaResetLabel').textContent = 
        `Meta-Dimension ${pm.reset >= 4 ? "Boost" : "Shift"} (${pm.reset}): requires ${tmp.meta.reset_req} ${DISPLAY_NAMES[mtier]} Meta-Dimension`;
        el('metaSoftReset').textContent = 
        `Reset meta-dimensions for a `+(pm.reset<4?"new meta-dimension":"boost");
        el('metaSoftReset').className = pm[mtier].bought >= tmp.meta.reset_req ? "storebtn" : "unavailablebtn"
    }
}

function getMDCost(i) {
    let p = player.meta[i].bought

    if (p>=100) p = (p/100)**2*100

    return Decimal.pow(costMults[i],p).mul(STARTING_COST[i])
}

function getMDBulk(i) {
    let x = player.meta.antimatter.div(STARTING_COST[i]).log(costMults[i])

    if (x >= 100) x = Math.pow(x/100,1/2)*100

    return Math.floor(x)+1
}

function getMDMult(i) {
    let p = player.meta[i].bought

    let x = Decimal.pow(2,p).mul(Decimal.pow(2,Math.max(0,player.meta.reset-i+1)))

    if (player.dilation.upgrades.includes(13)) x = x.mul(Math.log10(Math.abs(player.tickspeed.l)+10))

    for (let t = 41; t <= 43; t++) if (hasTSTier(2,t)) x = x.mul(TSTierEffect(2,t))

    return x
}

function getMDEffect() {
    let p = tmp.meta.pow

    return player.meta.best1.div(10).max(1).pow(p)
}

function updateMDTemp() {
    let mtmp = tmp.meta

    mtmp.effect = getMDEffect()

    mtmp.reset_req = Math.ceil(2+Math.max(0,player.meta.reset-4)*1.5)

    for (let x = 1; x <= 8; x++) {
        mtmp.mult[x] = getMDMult(x)
        mtmp.cost[x] = getMDCost(x)
    }
}