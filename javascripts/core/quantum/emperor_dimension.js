const ED_STARTING_COST = [null, E('1e60'), E('1e61'), E('1e64'), E('1e69'), E('1e100'), E('1e150'), E('1e200'), E('1e250')]
const ED_COST_MULT = [null, 1e3, 1e6, 1e8, 1e10, 1e15, 1e20, 1e25, 1e30]
const ED_POWER_MULT = [null, 50, 30, 10, 5, 5, 5, 5, 5]

function setupEmperorDimensionsHTML() {
    let h = ""

    for (let x = 1; x <= 8; x++) {
        h += `
        <tr style="font-size: 15px" id="ED_div${x}">
            <td id="ED${x}" width="32%" class="rel">
                ${DISPLAY_NAMES[x]} Emperor Dimension x1
            </td>
            <td>
                <div id="EDAmount${x}">0 (0)</div>
            </td>
            
            <td align="right" width="10%">
                <button onclick="buyED(${x})" id="EDCost${x}" style="color:black; height: 25px; font-size: 10px; width: 210px" class="storebtn" align="right">Cost: ${shortenCosts(ED_STARTING_COST[x])} QK</button>
            </td>
            <td align="right" width="10%">
                <button onclick="buyED(${x},true)" style="color:black; width:135px; height: 25px; font-size: 10px" class="storebtn" align="right">Buy Max</button>
            </td>
        </tr>
        `

        /*
        <td>
            <button id="ed${x}auto" style="width:70px; font-size: 10px; float: right; visibility: hidden" onclick="toggleAutoED(${x})" class="storebtn">Auto: ON</button>
        </td>
        */
    }

    el('emperor_parent').innerHTML = h
}

function updateEDTemp() {
    for (let x = 1; x <= 8; x++) {
        tmp.emperor_mult[x] = getEDMult(x)
    }
}

function getEDMult(tier) {
    var x = Decimal.pow(ED_POWER_MULT[tier], player.quantum.emperor[tier].bought)

    if (hasTSTier(2,182)) x = x.mul(TSTierEffect(2,182))

    return x
}

function getEmperorDimensionProduction(tier) {
    var ret = player.quantum.emperor[tier].amount
    ret = ret.times(tmp.emperor_mult[tier])
    return ret
}

function getEmperorDimensionRateOfChange(tier) {
    let toGain = getEmperorDimensionProduction(tier+1)
    var current = Decimal.max(player.quantum.emperor[tier].amount, 1);
    var change  = toGain.times(10).dividedBy(current);
    return change;
}

function getEmperorDimensionDescription(tier) {
    let description = shortenDimensions(player.quantum.emperor[tier].amount) + " (" + player.quantum.emperor[tier].bought + ")";
  
    if (tier < 8) {
        description += '  (+' + formatValue(player.options.notation, getEmperorDimensionRateOfChange(tier), 2, 2) + '%/s)';
    }
  
    return description;
}

function getEDCost(i,l=player.quantum.emperor[i].bought) {
    return Decimal.pow(ED_COST_MULT[i], l).mul(ED_STARTING_COST[i])
}

function getEDBulk(i) {
    var l = Math.floor(player.quantum.quarks.div(ED_STARTING_COST[i]).log(ED_COST_MULT[i])+1)

    return l
}

function buyED(tier,max) {
    var cost = getEDCost(tier)
    if (player.quantum.quarks.gte(cost)) {
        var pre = player.quantum.emperor[tier].bought, bulk = pre + 1
        if (max) bulk = Math.max(bulk, getEDBulk(tier))
        player.quantum.emperor[tier].bought = bulk
        player.quantum.emperor[tier].amount = player.quantum.emperor[tier].amount.add(bulk-pre)
        player.quantum.quarks = player.quantum.quarks.sub(cost)
        if (tier==4) giveAchievement('r174',true)
    }
}

function updateEmperorDimensionsHTML() {
    el('emperortabbtn').style.display = hasTSTier(2, 181) ? "" : "none"

    if (document.getElementById("emperordimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {
        el('gen-workers-gain').innerHTML = `You are generating ${shortenMoney(getEmperorDimensionProduction(1))} worker replicants per second.`
        el('gen-workers').innerHTML = shortenMoney(player.quantum.replicant.worker)

        for (let tier = 1; tier <= 8; tier++) {
            var unl = tier == 1 || player.quantum.emperor[tier-1].bought > 0

            el("ED_div"+tier).style.display = unl ? "" : "none"

            if (!unl) continue;

            el("ED"+tier).innerHTML = `${DISPLAY_NAMES[tier]} Emperor Dimension x${shorten(tmp.emperor_mult[tier])}`

            var cost = getEDCost(tier)
            el("EDCost"+tier).innerHTML = `Cost: ${shortenCosts(cost)} QK`
            el("EDCost"+tier).className = player.quantum.quarks.gte(cost) ? "storebtn" : "unavailablebtn"

            el("EDAmount"+tier).innerHTML = getEmperorDimensionDescription(tier)
        }
    }
}