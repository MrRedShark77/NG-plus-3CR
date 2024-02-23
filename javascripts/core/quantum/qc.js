const QUANTUM_CHALLENGES = [
    null,
    {
        get desc() { return `Meta-antimatter has no effect.` },
        get reward() { return `Add 1.00x to proton & electron gain multiplier for each Quantum Challenge completed.` },
        goal: 127e9,
    },{
        get desc() { return `Galaxies have no effect.` },
        get reward() { return `Unlock the fourth replicanti upgrade.` },
        goal: 24e9,
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

            return x
        },
    },{
        get desc() { return `Antimatter Deflation starts at ${shortenCosts(Decimal.pow(10,1e6))} (Normally at ${shortenCosts(Decimal.pow(10,1e12))}, unaffected by this reward).` },
        get reward() { return `Antimatter Deflation starts later by best meta-antimatter at a reduced rate. Currently: ^`+shorten(this.effect()) },
        goal: 1.5e9,
        effect() {
            let x = (player.meta.best1.max(1).l+1)**0.1

            return x
        },
    },{
        get desc() { return `You are trapped in Time Dilation (unaffected by EC15’s reward), it affects Meta Dimensions.` },
        get reward() { return `Improve 16th dilation upgrade better.` },
        goal: 7777777,
    },{
        get desc() { return `Dimension and Tickspeed cost multiplier increases are 1.80e308x. Multiplier per ten Dimensions and meta-Antimatter boost to Dimension Boosts are disabled.` },
        get reward() { return `The free tickspeed upgrade threshold increases slower.` },
        goal: 90e9,
    },{
        get desc() { return `Infinity and Time Dimensions are disabled, and Meta-Dimension Boosts have no effect.` },
        get reward() { return `You gain extra replicated galaxies faster after 100.` },
        goal: 20e9,
    },
]

function startQuantumChallenge(i) {
    if (player.quantum.chal.unlocked >= i) {
        player.quantum.chal.active = i

        quantumReset(true)
    }
}

function inQC(i) { return player.quantum.chal.active == i }
function QCCompleted(i) { return player.quantum.chal["qc"+i].completed }

function updateQuantumChallenges() {
    for (var i = 1; i < QUANTUM_CHALLENGES.length; i++) {
        var unl = player.quantum.chal.unlocked >= i
        el(`qc${i}div`).style.display = unl ? '' : 'none'

        if (unl) {
            var QC = QUANTUM_CHALLENGES[i]
            var data = player.quantum.chal["qc"+i]

            el(`qc${i}button`).innerHTML = player.quantum.chal.active == i ? `Running` : data.completed ? `Completed` : `Start`
            el(`qc${i}button`).className = player.quantum.chal.active == i ? "onchallengebtn" : data.completed ? "completedchallengesbtn" : "challengesbtn"

            el(`qc${i}desc`).innerHTML = QC.desc
            el(`qc${i}goal`).innerHTML = `Goal: ${shortenCosts(Decimal.pow(10,QC.goal))} antimatter`
            el(`qc${i}reward`).innerHTML = `Reward: ${QC.reward}`
        }
    }
}

function setupQuantumChallengesHTML() {
    var h = ``
    var hh = ``

    for (var i = 1; i < QUANTUM_CHALLENGES.length; i++) {
        hh += `
        <td>
            <div class="quantumchallengediv" id="qc${i}div" style="height: 140px;">
                <span id="qc${i}desc">Placeholder.</span>
                <div class="outer">
                    <button id="qc${i}button" class="challengesbtn" onclick="startQuantumChallenge(${i})"></button>
                    <br>
                    <span id="qc${i}goal">Goal: ???</span><br>
                    <span id="qc${i}reward">Reward: ???</span>
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