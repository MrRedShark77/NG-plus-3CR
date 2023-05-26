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
        gluons: {
            rg: E(0),
            gb: E(0),
            br: E(0),
        },
        gluon_upg: [],
        assortPercentage: 10,
        assortRatio: {
            r: 1,
            g: 1,
            b: 1,
        },
        protons: 0,
        electrons: 0,
        neutrons: 0,
        atom_upg: [
            [0,0],
            [0,0],
        ],
    }
    return s
}

function toggleQuantumConf() {
    player.options.quantumconfirm = !player.options.quantumconfirm
    updateConifrmationDiv()
}

function updateQuantumTemp() {
    tmp.quarksGain = quarksGain()
    updateAtomTemp()

    let colors = ['r','g','b']

    for (let c in colors) {
        let cc = colors[c]

        tmp.chargeRate[cc] = getColorPowerProduction(cc)
        tmp.chargeEffect[cc] = chargeEffects[cc]()
    }

    for (let mix in player.quantum.gluons) {
        for (let i = 1; i < gluonUpgCosts.length; i++) {
            let gu = gluonUpgs[mix][i]
            if (!gu) continue
            if (gu[1]) tmp.gluon_eff[mix+i] = gu[1]()
        }
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
        el('qu_worth').innerHTML = shortenDimensions(tmp.quarksWorth)

        el('gluonstabbtn').style.display = hasTSTier(2,62)?'':'none'
        el('atomstabbtn').style.display = hasTSTier(2,71)?'':'none'

        if (el('quarks_tab').style.display !== 'none') updateQuarksHTML()
        if (el('gluons_tab').style.display !== 'none') updateGluonsHTML()
        if (el('atoms_tab').style.display !== 'none') updateAtomsHTML()
    }
}

function quantumReset(force,auto) {
    if (!force && tmp.quarksGain.lt(1)) return;

    player.meta.firstDBought = false

    player.quantum.unlocked = true
    player.quantum.quarks = player.quantum.quarks.add(tmp.quarksGain)
    player.quantum.times++
    player.quantum.best = Math.min(player.quantum.best,player.quantum.time)
    player.quantum.time = 0

    player.quantum.protons = 0
    player.quantum.electrons = 0
    player.quantum.neutrons = 0

    for (let i = player.quantum.speedruns; i < QU_SPEEDRUN.length; i++) {
        if (player.quantum.best < QU_SPEEDRUN[i][1]*10) player.quantum.speedruns++
        else break
    }

    updateQUSpeedrunHTML()

    giveAchievement('r151',true)
    if (player.quantum.best < 300) giveAchievement('r156',true)

    doQuantumResetStuff()
    eternity(true,true,true)
    updateMultDecreases()
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

    document.getElementById("epmult").className = player.eternityPoints.gte(player.epmultCost) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
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

    if (hasTSTier(2,71)) {
        player.quantum.electrons = Math.max(player.quantum.electrons,Math.floor(Math.floor(tmp.totalGalaxies/10)*tmp.atom.total_mult[1]))
        player.quantum.protons = Math.max(player.quantum.protons,Math.floor(Math.floor(player.infinityDimension8.baseAmount/1e7)*tmp.atom.total_mult[0]))
        
        player.quantum.neutrons = Math.max(player.quantum.neutrons,Math.floor(player.quantum.protons*player.quantum.electrons/1e4))
    }
}