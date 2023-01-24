function startDilatedEternity() {
    if (!player.dilation.studies.includes(1)) return
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

    if (!inEC(15)) x += ECTimesCompleted('eterc15')/100

    if (inEC(15)) x **= 2

    return x
}

function DilUnlocked() { return player.dilation.studies.includes(1) }

function unlockDilation() {
    if (player.dilation.studies.includes(1)) return
    if (player.timestudy.theorem < 5000) return
    if (ECTimesCompleted("eterc12") !== 5) return
    if (ECTimesCompleted("eterc11") !== 5) return
    player.timestudy.theorem -= 5000
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

    return tachyonMultiplier;
}

function getTachyonGainExponent() {
    let x = 1.5 + player.dilation.rebuyables[4] * .2

    if (x >= 5) x = (x/5)**.5*5

    return x
}

function getDilatedTimeGain() {
    let dtGain = player.dilation.tachyonParticles.times(Decimal.pow(2, player.dilation.rebuyables[1]));
    if (player.achievements.includes("r132")) dtGain = dtGain.mul(Math.max(Math.pow(player.galaxies, 0.04), 1));
    if (player.achievements.includes("r137") && player.dilation.active) dtGain = dtGain.mul(2);

    for (let x = 0; x < 3; x++) if (player.eternityUpgrades.includes(7+x)) dtGain = dtGain.mul(tmp.EP_DIL_upg[x])

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
                              1e35,        1e55,       1e80,       1/0,
                            ]


function buyDilationUpgrade(id, costInc) {
    if (id > 4) { // Not rebuyable
        if (player.dilation.dilatedTime < DIL_UPG_COSTS[id]) return // Not enough dilated time
        if (player.dilation.upgrades.includes(id)) return // Has the upgrade
        player.dilation.dilatedTime = player.dilation.dilatedTime.minus(DIL_UPG_COSTS[id])
        player.dilation.upgrades.push(id)
        if (id == 5) player.dilation.freeGalaxies *= 2 // Double the current galaxies
    } else { // Is rebuyable
        let upgAmount = player.dilation.rebuyables[id];
        let realCost = E(DIL_UPG_COSTS[id][0]).times( Decimal.pow(DIL_UPG_COSTS[id][1], (upgAmount)) )
        if (player.dilation.dilatedTime.lt(realCost)) return

        player.dilation.dilatedTime = player.dilation.dilatedTime.minus(realCost)
        player.dilation.rebuyables[id] += 1
        if (id == 2) {
            player.dilation.dilatedTime = E(0)
            player.dilation.freeGalaxies = 0
        }
    }

    updateDilationUpgradeCosts()
    updateDilationUpgradeButtons()
    updateTimeStudyButtons()
}

function getDU12Effect() {
    let x = getTimeTheoremGain()

    if (x > 1e27) x = (x/1e27)**.5*1e27

    return Math.floor(x)
}

function updateDilationUpgradeButtons() {
    el('meta_du').style.display = metaUnlocked() ? '' : 'none';
    for (var i = 1; i <= 16; i++) {
        if (i <= 4) {
            document.getElementById("dil"+i).className = ( E(DIL_UPG_COSTS[i][0]).times(Decimal.pow(DIL_UPG_COSTS[i][1],(player.dilation.rebuyables[i]))).gt(player.dilation.dilatedTime) ) ? "dilationupgrebuyablelocked" : "dilationupgrebuyable";
        } else if (player.dilation.upgrades.includes(i)) {
            document.getElementById("dil"+i).className = "dilationupgbought"
        } else {
            document.getElementById("dil"+i).className = ( DIL_UPG_COSTS[i] > player.dilation.dilatedTime ) ? "dilationupglocked" : "dilationupg";
        }
    }
    document.getElementById("dil4desc").textContent = "Currently: ^1.5 -> ^"+(getTachyonGainExponent().toFixed(2))
    document.getElementById("dil8desc").textContent = "Currently: "+shortenMoney(player.dilation.dilatedTime.max(1).pow(0.05))+"x faster"
    document.getElementById("dil9desc").textContent = "Currently: "+shortenMoney(player.dilation.dilatedTime.pow(1000).max(1))+"x"
    document.getElementById("dil12desc").textContent = "Currently: "+shortenMoney(getDU12Effect())+"/s"
    el('dil13desc').textContent = "Currently: "+shortenMoney(Math.log10(Math.abs(player.tickspeed.l)+10))+"x"
    el('dil14desc').textContent = "Currently: "+shortenMoney(Math.log10(player.dilation.dilatedTime.max(1).l+10))+"x"
}

function updateDilationUpgradeCosts() {
    document.getElementById("dil1cost").textContent = "Cost: " + shortenCosts( E(DIL_UPG_COSTS[1][0]).times(Decimal.pow(DIL_UPG_COSTS[1][1],(player.dilation.rebuyables[1]))) ) + " dilated time"
    document.getElementById("dil2cost").textContent = "Cost: " + shortenCosts( E(DIL_UPG_COSTS[2][0]).times(Decimal.pow(DIL_UPG_COSTS[2][1],(player.dilation.rebuyables[2]))) ) + " dilated time"
    document.getElementById("dil3cost").textContent = "Cost: " + formatValue(player.options.notation, E(DIL_UPG_COSTS[3][0]).times(Decimal.pow(DIL_UPG_COSTS[3][1],(player.dilation.rebuyables[3]))), 1, 1) + " dilated time"
    document.getElementById("dil4cost").textContent = "Cost: " + shortenCosts( E(DIL_UPG_COSTS[4][0]).times(Decimal.pow(DIL_UPG_COSTS[4][1],(player.dilation.rebuyables[4]))) ) + " dilated time"
    
    for (let x = 5; x <= 16; x++) document.getElementById("dil"+x+"cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[x]) + " dilated time"
}