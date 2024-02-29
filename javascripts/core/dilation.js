function startDilatedEternity() {
    if (!player.dilation.studies.includes(1)) return
    if (inEC(15)) giveAchievement('r147',true)
    clearInterval(gameLoopIntervalId);
    if (player.dilation.active) {
        eternity(true)
        setTimeout(function() {
            gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
        }, 250)
        return
    }
    if (player.options.dilationconfirm && !confirm("Dilating time will start a new eternity, and all of your Dimension/Infinity Dimension/Time Dimension multiplier's exponents and tickspeed multiplier's exponent will be reduced to ^ 0.75. If you can eternity while dilated, you'll be rewarded with tachyon particles based on your antimatter and tachyon particles.")) {
        setTimeout(function() {
            gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
        }, 250)
        return
    }
    giveAchievement("I told you already, time is relative")
    eternity(true)
    player.dilation.active = true;
    var totalMult = 1
    var currentMult = 1
    var infinitiedMult = 1
    var achievementMult = 1
    var challengeMult = 1
    var unspentBonus = 1
    var postc8Mult = E(0)
    var mult18 = E(1)
    var ec10bonus = E(1)
    setTimeout(function() {
        gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
    }, 250)
}

function getDilationPenalty() {
    let x = .75

    if (inEC(15)) x **= 2
    else if (!inQC(6)) x += ECTimesCompleted('eterc15')/100

    return x
}

function DilUnlocked() { return player.dilation.studies.includes(1) }

function unlockDilation() {
    if (player.dilation.studies.includes(1)) return
    if (player.timestudy.theorem.lt(5000)) return
    if (ECTimesCompleted("eterc12") !== 5) return
    if (ECTimesCompleted("eterc11") !== 5) return
    player.timestudy.theorem = player.timestudy.theorem.sub(5000).round()
    document.getElementById("dilationunlock").className = "dilationupgbought"
    updateTimeStudyButtons()
    showEternityTab("dilation")
    document.getElementById("dilationunlock").innerHTML = "Unlock time dilation<span>Cost: 5000 Time Theorems"
}

function getReqForTPGain() {
	let tplog = player.dilation.totalTachyonParticles.log10()
	return Decimal.pow(10, Decimal.pow(10, tplog).div(tmp.TP_mult).pow(1 / tmp.TP_exponent).toNumber() * 400)
}

function getTachyonGainMultiplier() {
    let tachyonMultiplier = Decimal.pow(3, player.dilation.rebuyables[3]);
    if (player.achievements.includes("r132")) tachyonMultiplier = tachyonMultiplier.mul(Math.max(Math.pow(player.galaxies, 0.04), 1));
    if (hasGluonUpg('br1')) tachyonMultiplier = tachyonMultiplier.mul(gluonUpgEff('br1'))

    return tachyonMultiplier;
}

function getTachyonGainExponent() {
    let x = 1.5 + player.dilation.rebuyables[4] * .2

    if (x >= 5) x = (x/5)**.5*5
    if (x >= 6) x = (x/6)**.5*6

    return x
}

function getDilatedTimeGain() {
    let dtGain = player.dilation.tachyonParticles

    if (hasGluonUpg('br3')) dtGain = dtGain.pow(1.05)

    dtGain = dtGain.times(Decimal.pow(2, player.dilation.rebuyables[1]));
    if (player.achievements.includes("r132")) dtGain = dtGain.mul(Math.max(Math.pow(player.galaxies, 0.04), 1));
    if (player.achievements.includes("r137") && player.dilation.active) dtGain = dtGain.mul(2);

    for (let x = 0; x < 3; x++) if (player.eternityUpgrades.includes(7+x)) dtGain = dtGain.mul(tmp.EP_DIL_upg[x])

    if (player.quantum.unlocked) dtGain = dtGain.mul(tmp.chargeEffect.b)

    if (player.dilation.upgrades.includes(16)) dtGain = dtGain.mul(getDU16Effect())

    if (hasGluonUpg('br2')) dtGain = dtGain.mul(gluonUpgEff('br2'))

    if (hasTSTier(2,91)) dtGain = dtGain.mul(TSTierEffect(2,91))

    return dtGain;
}

function getTimeTheoremGain() {
    let ttGain = player.dilation.tachyonParticles.div(20000).max(1);
    if (player.achievements.includes("r137") && player.dilation.active) ttGain = ttGain.times(2);
    return ttGain;
}

function eterUpgDilEff() {
    return [player.money.max(1).l**.1+1,player.infinityPower.max(1).l**.15+1,player.timeShards.max(1).l**.225+1]
}


/**
 *
 * @param {Name of the ugrade} id
 * @param {Cost of the upgrade} cost
 * @param {Cost increase for the upgrade, only for rebuyables} costInc
 *
 * id 1-3 are rebuyables
 *
 * id 2 resets your dilated time and free galaxies
 *
 */

 const DIL_UPG_COSTS = [null, [1e5, 10], [1e6, 100], [1e7, 20], [1e8, 1e4],
                              5e6,        1e9,         5e7,      1e20,
                              2e12,        1e10,         1e11,    1e15,
                              1e35,        1e55,       1e80,       1e100,
                            ]

function getRDUCost(id,bought=player.dilation.rebuyables[id]) {
    let lvl = bought

    let x = Decimal.pow(DIL_UPG_COSTS[id][1],lvl).mul(DIL_UPG_COSTS[id][0])

    if (id >= 3 && x.gte(1e100)) {
        let p = 2.5
        if (QCCompleted(6)) p -= tmp.qc_modifiers[6] / 16
        x = x.pow(((x.l/100)**p-1)/10+1)
    }

    return x
}

function buyDilationUpgrade(id, auto) {
    if (id > 4) { // Not rebuyable
        if (player.dilation.dilatedTime.lt(DIL_UPG_COSTS[id])) return // Not enough dilated time
        if (player.dilation.upgrades.includes(id)) return // Has the upgrade
        if (player.quantum.speedruns <= 19) player.dilation.dilatedTime = player.dilation.dilatedTime.minus(DIL_UPG_COSTS[id])
        player.dilation.upgrades.push(id)
        if (id == 5) player.dilation.freeGalaxies *= 2 // Double the current galaxies
    } else { // Is rebuyable
        let realCost = getRDUCost(id)
        if (player.dilation.dilatedTime.lt(realCost)) return

        let bulk = 1

        if (auto) {
            bulk = bulkNumberFromDecimalFunctionWithName('rdu',player.dilation.dilatedTime,[id,player.dilation.rebuyables[id]])
            if (bulk <= 0) bulk = 1
            else realCost = getRDUCost(id,player.dilation.rebuyables[id]+bulk-1)
        }

        if (player.quantum.speedruns <= 19) player.dilation.dilatedTime = player.dilation.dilatedTime.minus(realCost)
        player.dilation.rebuyables[id] += bulk
        if (id == 2 && player.quantum.speedruns <= 6) {
            player.dilation.dilatedTime = E(0)
            player.dilation.freeGalaxies = 0
        }
    }

    updateDilationUpgradeCosts()
    updateDilationUpgradeButtons()
    updateTimeStudyButtons()
}

function toggleAutoRDU() {
    player.dilation.auto_upg = !player.dilation.auto_upg

    el('autoRDU').textContent = "Auto-Rebuyable Dilation Upgrades: "+(player.dilation.auto_upg?"ON":"OFF")
}

function getDU12Effect() {
    let x = getTimeTheoremGain()

    if (x.gte(1e27)) x = x.div(1e27).pow(player.achievements.includes("r162") ? .55 : .5).mul(1e27)

    return x.floor()
}

function getDU14Effect() {
    let x = Math.log10(player.dilation.dilatedTime.max(1).l+10)

    if (hasGluonUpg('rg4')) x *= 1.1

    return x
}

function getDU16Effect() {
    let x = QCCompleted(6) ? Decimal.pow(10,player.meta.best1.add(1).l**0.5/5) : player.meta.best1.add(1).l**0.5+1

    return x
}

function updateDilationUpgradeButtons() {
    el('meta_du').style.display = metaUnlocked() ? '' : 'none';
    for (var i = 1; i <= 16; i++) {
        if (i <= 4) {
            document.getElementById("dil"+i).className = ( getRDUCost(i).gt(player.dilation.dilatedTime) ) ? "dilationupgrebuyablelocked" : "dilationupgrebuyable";
        } else if (player.dilation.upgrades.includes(i)) {
            document.getElementById("dil"+i).className = "dilationupgbought"
        } else {
            document.getElementById("dil"+i).className = ( player.dilation.dilatedTime.lt(DIL_UPG_COSTS[i]) ) ? "dilationupglocked" : "dilationupg";
        }
    }
    document.getElementById("dil4desc").textContent = "Currently: ^1.5 -> ^"+(getTachyonGainExponent().toFixed(2))
    document.getElementById("dil8desc").textContent = "Currently: "+shortenMoney(player.dilation.dilatedTime.max(1).pow(0.05))+"x faster"
    document.getElementById("dil9desc").textContent = "Currently: "+shortenMoney(player.dilation.dilatedTime.pow(1000).max(1))+"x"
    document.getElementById("dil12desc").textContent = "Currently: "+shortenMoney(getDU12Effect())+"/s"
    el('dil13desc').textContent = "Currently: "+shortenMoney(Math.log10(Math.abs(player.tickspeed.l)+10))+"x"
    el('dil14desc').textContent = "Currently: "+shortenMoney(getDU14Effect())+"x"
    el('dil16desc').textContent = "Currently: "+shortenMoney(getDU16Effect())+"x"
}

function updateDilationUpgradeCosts() {
    document.getElementById("dil1cost").textContent = "Cost: " + shortenCosts( getRDUCost(1) ) + " dilated time"
    document.getElementById("dil2cost").textContent = "Cost: " + shortenCosts( getRDUCost(2) ) + " dilated time"
    document.getElementById("dil3cost").textContent = "Cost: " + formatValue(player.options.notation, getRDUCost(3), 1, 1) + " dilated time"
    document.getElementById("dil4cost").textContent = "Cost: " + shortenCosts( getRDUCost(4) ) + " dilated time"
    
    for (let x = 5; x <= 16; x++) document.getElementById("dil"+x+"cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[x]) + " dilated time"
}

function dilates(x,m) {
    let e = 1
	let y = x
	let a = false

    if (player.dilation.active || inEC(15) || inQC(6)) {
		e *= getDilationPenalty()
        if (player.dilation.upgrades.includes(11)) e *= 1.05
		a = true
	}

    if (a) {
		if (m != "tick") x = x.max(1)
		else x = x.times(1e3)

        if (x.gt(10)) x = Decimal.pow(10, Math.pow(x.log10(), e))

		if (m == "tick") x = x.div(1e3)
		if (m == "tick" && x.lt(1)) x = Decimal.div(1, x)
	}

    return x.max(0).min(y) //it should never be a buff
}