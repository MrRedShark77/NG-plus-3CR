const QU_REQ_MA = Decimal.pow(10,554.858488008)
let auto_eter = false

function quarksGain() {
    let x = Decimal.pow(10,(player.meta.best1.l - 200) / 280 - 1)
    if (x.lt(1)) return E(0)

    if (player.achievements.includes('r156')) x = x.mul((player.eternityPoints.add(1).l/500000+1)**0.75)

    return x.floor()
}

function getQuantumSave() {
    let s = {
        buyer: {
            isOn: false,
            limit: E(1),
        },
        reached: false,
        times: 0,
        time: 0,
        best: 999999999,
        unlocked: false,
        speedruns: 0,
        quarks: E(0),
        color: {
            r: E(0),
            g: E(0),
            b: E(0),
        },
        charge: {
            r: E(0),
            g: E(0),
            b: E(0),
        },
        assortPercentage: 10,
        assortRatio: {
            r: 1,
            g: 1,
            b: 1,
        },
    }
    return s
}

function toggleQuantumConf() {
    player.options.quantumconfirm = !player.options.quantumconfirm
    updateConifrmationDiv()
}

function updateQuantumTemp() {
    tmp.quarksGain = quarksGain()

    let colors = ['r','g','b']

    for (let c in colors) {
        let cc = colors[c]

        tmp.chargeRate[cc] = getColorPowerProduction(cc)
        tmp.chargeEffect[cc] = chargeEffects[cc]()
    }
}

function updateQuantumHTML() {
    let unl = player.quantum.unlocked || player.quantum.reached
    let qu_unl = player.quantum.unlocked

    el('qu_buttons_div').style.display = unl ? "" : 'none'

    if (unl) {
        el('quantumbtn').style.display = player.quantum.reached ? '' : 'none';
        el('quantumbtn').innerHTML = player.quantum.unlocked
        ? `Form the Protoverse for ${shortenDimensions(tmp.quarksGain)} quarks.`
        : `We have enough energy to form the Protoverse... I need to go Quantum.`

        el('quarks').style.visibility = qu_unl ? 'visible' : 'hidden';
        el('quarks').innerHTML = `You have <b>${shortenDimensions(player.quantum.quarks)}</b> quarks.`
    }

    if (el('quantum').style.display !== 'none') {
        if (el('quarks_tab').style.display !== 'none') updateQuarksHTML()
    }
}

function quantumReset(force,auto) {
    if (!force && tmp.quarksGain.lt(1)) return;

    player.quantum.unlocked = true
    player.quantum.quarks = player.quantum.quarks.add(tmp.quarksGain)
    player.quantum.times++
    player.quantum.best = Math.min(player.quantum.best,player.quantum.time)
    player.quantum.time = 0

    for (let i = player.quantum.speedruns; i < QU_SPEEDRUN.length; i++) {
        if (player.quantum.best < QU_SPEEDRUN[i][1]*10) player.quantum.speedruns++
        else break
    }

    updateQUSpeedrunHTML()

    giveAchievement('r151',true)
    if (player.quantum.best < 300) giveAchievement('r156',true)

    doQuantumResetStuff()
    eternity(true,true,true)
    setInitialDimensionPower()

    for (var i=1; i<9; i++) {
        document.getElementById("infauto"+i).textContent = "Auto: "+(player.infDimBuyers[i-1]?"ON":"OFF")
    }

    document.getElementById("quantumstorebtn").style.display = "";
    el('autoTT').style.display = player.quantum.speedruns>1 ? '' : 'none'
    el('autoRDU').style.display = player.quantum.speedruns>6 ? '' : 'none'
    document.getElementById("quantumAnimBtn").style.display = player.quantum.unlocked ? "inline-block" : 'none'

    if (player.quantum.speedruns <= 4) {
        showDimTab("antimatterdimensions",true)
	    showChallengesTab("challenges")
	    showInfTab("preinf")
	    showEternityTab("timestudies",true)
    }

    passed = 3
    if (player.quantum.speedruns<=4) ts_tier_tab = 1

    updateTemp()
    updateAchievements()

    updateAutoMD()
    updateDilationUpgradeButtons()
    updateDilationUpgradeCosts()

    drawStudyTree(1)
    updateTimeStudyButtons()
}

function quantum() {
    if (tmp.quarksGain.gte(1)) {
        if (player.options.quantumconfirm && !confirm(`Quantum will reset everything up to and including Eternity features will be reset, in exchange of quarks. Ready?`)) return;

        if (player.options.animations.quantum) dev.quantumAnimation(quantumReset)
        else quantumReset()
    }
}

function showQuantumTab(tabName) {
    var tabs = document.getElementsByClassName('quantumtab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function quantumTick(dt) {
    dt /= 10

    let colors = ['r','g','b']

    for (let c in colors) {
        player.quantum.charge[colors[c]] = player.quantum.charge[colors[c]].add(tmp.chargeRate[colors[c]].mul(dt))
    }
}