const QU_REQ_MA = Decimal.pow(10,554.858488008)
let auto_eter = false

function quarksGain() {
    let x = Decimal.pow(10,(player.meta.best1.l - 200) / 280 - 1)
    if (x.lt(1)) return E(0)

    if (player.achievements.includes('r156')) x = x.mul((player.eternityPoints.add(1).l/500000+1)**0.75)
    if (player.achievements.includes('r162')) x = x.mul((player.money.add(1).l/1e9+1)**0.75)

    if (hasTSTier(2,151)) x = x.mul(TSTierEffect(2,151)[1] ?? 1)
    if (hasTSTier(2,152)) x = x.mul(TSTierEffect(2,152)[1] ?? 1)

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
        autoProton: true,
        autoElectron: true,
        autoNeutron: true,
        atom_upg: [
            [0,0],
            [0,0],
        ],
        chal: {
            unlocked: 1,
            active: 0,

            choosedQCM: 0,
            modified: false,
        },
        replicant: {
            amount: E(0),
            preons: E(0),
            worker: E(0),

            buyables: [0,0],

            unlocked: [1,2],
        },
    }
    for (let i = 1; i <= 8; i++) {
        s.chal["qc" + i] = {
            completed: false,
            best: 999999999,
            modified: [],
            currentModifier: [],
        }
    }
    return s
}

function toggleQuantumConf() {
    player.options.quantumconfirm = !player.options.quantumconfirm
    updateConifrmationDiv()
}

function updateQuantumTemp() {
    tmp.quarksGain = quarksGain()
    updateReplicantsTemp()
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

    let sum = 0
    for (let x = 1; x <= 8; x++) {
        let q = player.quantum.chal["qc" + x]

        sum += tmp.qc_modifiers[x] = q.modified.length
    }
    tmp.qc_total_modifiers = sum
}

function updateQuantumHTML() {
    let unl = player.quantum.unlocked || player.quantum.reached
    let qu_unl = player.quantum.unlocked

    el('qu_buttons_div').style.display = unl ? "" : 'none'

    if (unl) {
        el('quantumbtn').style.display = (player.quantum.chal.active > 0 ? player.money.l >= getQCGoalLog(player.quantum.chal.active,player.quantum.chal.modified) : player.quantum.reached) ? '' : 'none';

        el('quantumbtn').innerHTML = player.quantum.chal.active > 0
        ? `We have enough energy to form the Challenge... I need to go Quantum.`
        : player.quantum.unlocked
        ? `Form the Protoverse for ${shortenDimensions(tmp.quarksGain)} quarks.`
        : `We have enough energy to form the Protoverse... I need to go Quantum.`

        el('quarks').style.visibility = qu_unl ? 'visible' : 'hidden';
        el('quarks').innerHTML = `You have <b>${shortenDimensions(player.quantum.quarks)}</b> quarks.`
    }

    if (el('quantum').style.display !== 'none') {
        el('qu_worth').innerHTML = shortenDimensions(tmp.quarksWorth)

        el('gluonstabbtn').style.display = hasTSTier(2,62)?'':'none'
        el('atomstabbtn').style.display = hasTSTier(2,71)?'':'none'
        el('replicantsstabbtn').style.display = hasTSTier(2,161)?'':'none'

        if (el('quarks_tab').style.display !== 'none') updateQuarksHTML()
        if (el('gluons_tab').style.display !== 'none') updateGluonsHTML()
        if (el('atoms_tab').style.display !== 'none') updateAtomsHTML()
        if (el('replicants_tab').style.display !== 'none') updateReplicantsHTML()
    }

    if (el('challenges').style.display !== 'none') {
        el('qctabbtn').style.display = hasTSTier(2,92) ? '' : 'none'
        
        if (el('quantumchallenges').style.display !== 'none') updateQuantumChallenges()
    }
}

function quantumReset(force,auto,challenge) {
    if (!force && tmp.quarksGain.lt(1)) return;

    if (hasTSTier(2,152)) player.eternitiedBank = Math.round(player.eternitiedBank + player.eternities*getEternitiedBankMult())

    player.meta.firstDBought = false

    player.quantum.unlocked = true
    player.quantum.quarks = player.quantum.quarks.add(tmp.quarksGain)
    player.quantum.times++
    player.quantum.best = Math.min(player.quantum.best,player.quantum.time)
    player.quantum.time = 0

    player.quantum.protons = 0
    player.quantum.electrons = 0
    player.quantum.neutrons = 0

    player.quantum.replicant.amount = E(0)
    player.quantum.replicant.buyables[0] = 0

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

    if (challenge) player.dilation.dilatedTime = E(0)

    if (player.dilation.bestTP && player.achievements.includes("r177")) {
        player.dilation.totalTachyonParticles = player.dilation.bestTP.root(2)
        player.dilation.tachyonParticles = player.dilation.bestTP.root(2)
    }

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
    updateQuantumChallenges()

    document.getElementById("epmult").className = player.eternityPoints.gte(player.epmultCost) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
}

function quantum() {
    let qca = player.quantum.chal.active
    let chal = qca>0
    let qc_reached = chal && player.money.l >= getQCGoalLog(qca,player.quantum.chal.modified)

    if (qc_reached || tmp.quarksGain.gte(1)) {
        if (qca == 0 && player.options.quantumconfirm && !confirm(`Quantum will reset everything up to and including Eternity features will be reset, in exchange of quarks. Ready?`)) return;

        if (qc_reached) {
            var data = player.quantum.chal["qc"+qca]
            data.completed = true
            data.best = Math.min(data.best,player.quantum.time)

            if (qca >= player.quantum.chal.unlocked) player.quantum.chal.unlocked = qca + 1
            player.quantum.chal.active = 0

            if (player.quantum.chal.modified) {
                var l = data.currentModifier.length

                if (l >= 2) giveAchievement("r164",true)
                if (l >= 3 && qca == 6) giveAchievement("r171",true)
                if (l >= data.modified.length) {
                    data.modified = []
                    for (let x of data.currentModifier) data.modified.push(x)
                }
            }

            player.quantum.chal.modified = false
        }

        var total_md_bought = 0
        for (var i = 1; i < 9; i++) {
            total_md_bought += player.meta[i].bought
        }
        console.log("total_md_bought",total_md_bought)
        if (total_md_bought == 1 && player.meta[8].bought == 1 && player.meta.reset <= 4) giveAchievement("r163",true)

        if (player.options.animations.quantum) dev.quantumAnimation(()=>quantumReset(chal))
        else quantumReset(chal)
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
        if (inQC(0)) {
            if (player.quantum.autoElectron) player.quantum.electrons = Math.max(player.quantum.electrons,Math.floor(Math.floor(tmp.totalGalaxies/10)*tmp.atom.total_mult[1]))
            if (player.quantum.autoProton) player.quantum.protons = Math.max(player.quantum.protons,Math.floor(Math.floor(player.infinityDimension8.baseAmount/1e7)*tmp.atom.total_mult[0]))
        }
        
        var neutrons = player.quantum.protons*player.quantum.electrons/1e4

        if (neutrons > 100) neutrons = Math.sqrt(neutrons/100)*100

        if (player.quantum.autoNeutron) player.quantum.neutrons = Math.max(player.quantum.neutrons,Math.floor(neutrons))
    }

    player.quantum.replicant.amount = player.quantum.replicant.amount.add(tmp.replicantsGain.mul(dt))
    player.quantum.replicant.preons = player.quantum.replicant.preons.add(tmp.preonsGain.mul(dt))
}