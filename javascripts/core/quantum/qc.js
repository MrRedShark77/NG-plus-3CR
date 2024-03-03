const QUANTUM_CHALLENGES = [
    null,
    {
        get desc() { return `Meta-antimatter has no effect.` },
        get reward() { return `Add 1.00x to proton & electron gain multiplier for each Quantum Challenge completed.` },
        goal: 127e9,
        get em_reward() { return `Add 0.05x to proton & electron gain multiplier base for each modifier combined.` },
    },{
        get desc() { return `Galaxies have no effect.` },
        get reward() { return `Unlock the fourth replicanti upgrade.` },
        goal: 24e9,
        get em_reward() { return `Reduce replicate interval slowdown.` },
    },{
        get desc() { return `Only meta-antimatter can boost Infinity Dimensions, but meta-antimatter cannot boost dimension boosts.` },
        get reward() { return `Improve TS2-41, TS2-42, and TS2-43 better.` },
        goal: 125e9,
    },{
        get desc() { return `Dimension Supersonic scaling starts instantly, and grows much faster. Replicanti Galaxy cost and free galaxy threshold also grow much faster. Multiplier per ten dimensions is 1x.` },
        get reward() { return `Dimension Boosts boost the multiplier per ten Dimensions. Currently: `+shorten(this.effect())+"x" },
        goal: 10.5e9,
        effect() {
            let x = Math.log10(player.resets + 1) + 1

            return x ** Math.sqrt(1 + tmp.qc_modifiers[4])
        },
    },{
        get desc() { return `Antimatter Deflation starts at ${shortenCosts(Decimal.pow(10,1e6))} (Normally at ${shortenCosts(Decimal.pow(10,1e12))}, unaffected by this reward).` },
        get reward() { return `Antimatter Deflation starts later by best meta-antimatter at a reduced rate. Currently: ^`+shorten(this.effect()) },
        goal: 1.5e9,
        effect() {
            let x = (player.meta.best1.max(1).l+1)**(0.1 + tmp.qc_modifiers[5] / 40)

            return x
        },
    },{
        get desc() { return `You are trapped in Time Dilation (unaffected by EC15’s reward), it affects Meta Dimensions.` },
        get reward() { return `Improve 16th dilation upgrade better.` },
        goal: 7777777,

        get em_reward() { return `Reduce rebuyable dilation upgrades for TP boost scaling after e100 DT.` },
    },{
        get desc() { return `Dimension and Tickspeed cost multiplier increases are 1.80e308x. Multiplier per ten Dimensions and meta-Antimatter boost to Dimension Boosts are disabled.` },
        get reward() { return `The free tickspeed upgrade threshold increases slower.` },
        goal: 90e9,

        get em_reward() { return `Increase the starting of scaled free tickspeed upgrade.` },
    },{
        get desc() { return `Infinity and Time Dimensions are disabled, and Meta-Dimension Boosts have no effect.` },
        get reward() { return `You gain extra replicated galaxies faster after getting softcapped.` },
        goal: 20e9,

        get em_reward() { return `Strengthen meta-dimension boosts.` },
    },
]

const ALLOW_EC_MODIFIERS = [1,3,5,6,11,13,14,15]
var CHOOSE_MODE = false

function startQuantumChallenge(i) {
    if (CHOOSE_MODE) {
        CHOOSE_MODE = false
        player.quantum.chal.choosedQCM = player.quantum.chal.choosedQCM == i ? 0 : i
    } else if (player.quantum.chal.unlocked >= i) {
        player.quantum.chal.active = i

        quantumReset(true,false,true)
    }
}
function startModifiedQC() {
    var qm = player.quantum.chal.choosedQCM
    if (!CHOOSE_MODE && qm > 0 && player.quantum.chal["qc"+qm].currentModifier.length > 0) {
        player.quantum.chal.active = qm
        player.quantum.chal.modified = true

        quantumReset(true,false,true)
    }
}
function switchECModifier(ec) {
    if (player.quantum.chal.modified) return
    var qm = player.quantum.chal.choosedQCM
    if (qm > 0 && ALLOW_EC_MODIFIERS.includes(ec)) {
        var qc = player.quantum.chal["qc"+qm]

        if (qc.currentModifier.includes(ec)) qc.currentModifier.splice(qc.currentModifier.indexOf(ec),1)
        else qc.currentModifier.push(ec)
    }
}
function chooseQCMMode() {
    if (player.quantum.chal.active == 0 && !player.quantum.chal.modified) CHOOSE_MODE = !CHOOSE_MODE
}

function inQC(i) { return player.quantum.chal.active == i }
function inEC(x) { return player.currentEternityChall == 'eterc'+x || player.quantum.chal.modified && player.quantum.chal["qc"+player.quantum.chal.active].currentModifier.includes(x) }

function QCCompleted(i) { return player.quantum.chal["qc"+i].completed }

function getQCGoalLog(i,mod) {
    let log = QUANTUM_CHALLENGES[i].goal

    if (mod && player.achievements.includes("r164")) log *= 0.95

    return log
}

function updateQuantumChallenges() {
    var qm = player.quantum.chal.choosedQCM

    for (var i = 1; i < QUANTUM_CHALLENGES.length; i++) {
        var unl = player.quantum.chal.unlocked >= i
        el(`qc${i}div`).style.display = unl ? '' : 'none'

        if (unl) {
            var QC = QUANTUM_CHALLENGES[i]
            var data = player.quantum.chal["qc"+i]

            el(`qc${i}button`).innerHTML = qm == i ? "Choosed (ECM)"  : CHOOSE_MODE ? "Choose" : player.quantum.chal.active == i ? `Running` : data.completed ? `Completed` : `Start`
            el(`qc${i}button`).className = CHOOSE_MODE && qm != i ? "challengesbtn" : player.quantum.chal.active == i ? "onchallengebtn" : data.completed ? "completedchallengesbtn" : "challengesbtn"

            el(`qc${i}desc`).innerHTML = QC.desc
            el(`qc${i}goal`).innerHTML = `Goal: ${shortenCosts(Decimal.pow(10,QC.goal))} antimatter`
            el(`qc${i}reward`).innerHTML = `Reward: ${QC.reward}`

            if (data.modified.length==0) el(`qc${i}ecbonus`).innerHTML = ""
            else el(`qc${i}ecbonus`).innerHTML = `${data.modified.sort((x,y)=>x-y).map(x => "EC"+x).join(", ")} Modified<br>Bonus: ${QC.em_reward ?? "Boost the reward."}`
        }
    }

    var unl = hasTSTier(2,103)
    el('ec_modification_div').style.display = unl ? '' : 'none'
    if (unl) {
        el("qcec_choose_button").textContent = CHOOSE_MODE ? "Cancel" : "Choose"

        var qm_and_more_ec = qm > 0 && player.quantum.chal["qc"+qm].currentModifier.length > 0
        el("qcec_button").textContent = qm_and_more_ec ? player.quantum.chal.active == qm && player.quantum.chal.modified ? `Running` : "Start" : "Locked"
        el("qcec_button").className = qm_and_more_ec ? player.quantum.chal.active == qm && player.quantum.chal.modified ? "onchallengebtn" : "challengesbtn" : "lockedchallengesbtn"

        for (var x of ALLOW_EC_MODIFIERS) {
            el('ecmodifierbutton'+x).className = qm > 0 && !QUANTUM_CHALLENGES[qm].excludeMod?.includes(x) ? player.quantum.chal["qc"+qm].currentModifier.includes(x) ? "choosedecmodifierbutton" : "ecmodifierbutton" : "lockedecmodifierbutton"
        }

        el('qcec_desc').innerHTML = `EC Modified Quantum Challenge ${qm || "?"}: Both Eternity Challenge(s) ${qm_and_more_ec ? player.quantum.chal["qc"+qm].currentModifier.sort((x,y)=>x-y).join(", ") : "?"} is(are) applied.`
        el('qcec_goal').innerHTML = `Goal: ${qm > 0 ? shortenCosts(Decimal.pow(10,getQCGoalLog(qm,true))) : "???"}`
        el('qcec_reward').innerHTML = `Reward: ${qm > 0 ? QUANTUM_CHALLENGES[qm].em_reward ?? "Boost the reward." : "???"}`
    }
}

function setupQuantumChallengesHTML() {
    var h = ``
    var hh = ``

    for (var i = 1; i < QUANTUM_CHALLENGES.length; i++) {
        hh += `
        <td>
            <div class="quantumchallengediv" id="qc${i}div">
                <span id="qc${i}desc">Placeholder.</span>
                <div class="outer">
                    <button id="qc${i}button" class="challengesbtn" onclick="startQuantumChallenge(${i})"></button>
                    <br>
                    <span id="qc${i}goal">Goal: ???</span><br>
                    <span id="qc${i}reward">Reward: ???</span><br>
                    <span id="qc${i}ecbonus" style="color: #bc99e4;"></span>
                </div>
            </div>
        </td>
        `

        if (i % 4 == 0 || i == QUANTUM_CHALLENGES.length - 1) {
            h += `<tr>${hh}</tr>`
            hh = ``
        }
    }

    el("qcs_table").innerHTML = h
}