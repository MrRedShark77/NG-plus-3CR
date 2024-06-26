var ts_tier_tab = 1

const TS_TIERS_MAP = [
    null,
    null,
    [
        [11],
        [21,22,23],
        [31,32,33,34,35,36],
        [41,42,43],
        [51,52,53],
        [61,62,63],
        [71],
        [82,81,83],
        [91,92,93],
        [102,101,103],
        [131,121,111,123,133],
        [141,122,142],
        [151,132,152],
        [161],
        [172,171,173],
        [183,182,181,184,185],
        [191],
    ],
]

const TS_TIERS = [
    null,
    null,
    {
        11: [
            "Good Luck!", // Description
            [], // Branches
            1e21, // Cost TT
        ],
        21: [
            "Raise Normal Dimensions to the 1.025th power.",
            [11],
            1e22,
            3,
        ],
        22: [
            "Raise Infinity Dimensions to the 1.025th power.",
            [11],
            1e22,
            3,
        ],
        23: [
            "Raise Time Dimensions to the 1.025th power.",
            [11],
            1e22,
            3,
        ],
        31: [
            "Galaxies are stronger based on best meta-antimatter.",
            [21],
            5e22,
            6,
        ],
        32: [
            "Remote galaxy scaling starts 1 later per 3,000 dimension boosts.",
            [21],
            5e22,
            6,
        ],
        33: [
            "Remote galaxy scaling starts 1 later per 6 total replicated galaxies.",
            [22],
            5e22,
            6,
        ],
        34: [
            "Meta-antimatter increases the exponent of infinity power formula.",
            [22],
            5e22,
            6,
        ],
        35: [
            "Replicanti boosts Time Dimensions.",
            [23],
            5e22,
            6,
        ],
        36: [
            "Remote galaxy scaling starts 1 later per 7 tachyon galaxies.",
            [23],
            5e22,
            6,
        ],
        41: [
            "Meta-Dimensions are boosted by normal galaxy.",
            [31,32],
            3e23,
            3,
        ],
        42: [
            "Meta-Dimensions are boosted by infinity power.",
            [33,34],
            3e23,
            3,
        ],
        43: [
            "Meta-Dimensions are boosted by time shard.",
            [35,36],
            3e23,
            3,
        ],
        51: [
            "Eternity Challenge 13",
            [41],
            1e36,
            1,
            'ec',
        ],
        52: [
            "Eternity Challenge 14",
            [42],
            1e36,
            1,
            'ec',
        ],
        53: [
            "Eternity Challenge 15",
            [43],
            1e36,
            1,
            'ec',
        ],
        61: [
            "Colored charge rate is affected by tickspeed at a reduced rate.",
            [51,52,53],
            1e45,
            2,
        ],
        62: [
            "Unlock Gluons.",
            [61],
            0,
            1,
            'dil',
        ],
        63: [
            "You can buy all Time Studies in all 3-way splits.",
            [62],
            1e48,
            2,
        ],
        71: [
            "Unlock Atoms.",
            [63],
            0,
            1,
            'dil',
        ],
        81: [
            "You can buy beyond 1ms interval upgrades, but the cost begins to increase faster.",
            [71],
            1e49,
            1,
        ],
        82: [
            "Protons increase the exponent of infinity power formula.",
            [81],
            1e50,
            2,
        ],
        83: [
            "Electrons increase the exponent of meta-antimatter's effect.",
            [81],
            1e50,
            2,
        ],
        91: [
            "Replicanti slightly boosts dilated time.",
            [81,82],
            2.5e50,
            4,
        ],
        92: [
            "Unlock Quantum Challenges.",
            [81],
            0,
            1,
            'dil',
        ],
        93: [
            "Replicanti slightly boosts meta-antimatter.",
            [81,83],
            2.5e50,
            4,
        ],
        101: [
            "You gain 1% of your EP gained on eternity each second.",
            [92],
            1e51,
            0,
        ],
        102: [
            "You can gain tachyon particles without disabling dilation.",
            [101],
            1e64,
            1,
        ],
        103: [
            "Unlock ECs Modification.",
            [101],
            0,
            1,
            'dil',
        ],
        111: [
            "You can buy all Time Studies Tier I.",
            [103],
            1e72,
            1,
        ],

        121: [
            "Remote galaxy scaling starts 1 galaxy later per 4 extra replicated galaxies.",
            [111],
            1e74,
            1e4,
            "red",
        ],
        131: [
            "Time shards give extra dimension boosts at a reduced rate.",
            [121],
            1e76,
            1,
            "red",
        ],
        122: [
            "Replicanti makes replicate interval increase slower.",
            [111],
            1e74,
            1e4,
            "green",
        ],
        132: [
            `Weaken the softcap of the "Infinite Time" multiplier.`,
            [122],
            1e76,
            1,
            "green",
        ],
        123: [
            "Meta-dimension boosts are 25% stronger.",
            [111],
            1e74,
            1e4,
            "blue",
        ],
        133: [
            "Superscaled meta-dimensions start 100 later.",
            [123],
            1e76,
            1,
            "blue",
        ],

        141: [
            "Tickspeed boosts DT production at greatly reduced rate.",
            [111],
            1e75,
            10,
        ],
        142: [
            "4th rebuyable dilation upgrade is stronger slightly.",
            [111],
            1e75,
            10,
        ],
        151: [
            "Gain more infinities based on your eternities, and they boost quarks.",
            [141],
            1e82,
            10,
        ],
        152: [
            "You permanently keep your banked Infinities, and bank 5% of your Eternities on Quantum. Quantum times boost them, and they boost quarks.",
            [142],
            1e82,
            10,
        ],
        161: [
            "Unlock Replicants.",
            [151,152],
            0,
            1,
            'dil',
        ],
        171: [
            "Replicantis affect preons gain at a reduced rate.",
            [161],
            1e88,
            1,
        ],
        172: [
            "Normal replicant multiplier is equal to non-produced replicants.",
            [171],
            1e86,
            100,
        ],
        173: [
            "Dimension Supersonic scaling starts 240,000 later, and the cost increase is reduced by 3.",
            [171],
            1e86,
            100,
        ],
        181: [
            "Unlock Emperor Dimensions.",
            [171],
            0,
            1,
            'dil',
        ],
        182: [
            "Preons will affect emperor dimensions at a reduced rate.",
            [181],
            1e92,
            1e6,
        ],
        183: [
            "Protons raise infinity dimensions at a greatly reduced rate.",
            [182],
            1e92,
            1e6,
        ],
        184: [
            "Remove the cost scaling of 8th time dimension above 1e4000 and above 1e500000.",
            [181],
            1e92,
            1e6,
        ],
        185: [
            "Electrons are more effective based on time shards at a reduced rate.",
            [184],
            1e92,
            1e6,
        ],
        191: [
            "Neutrons now delay superscaled meta-dimensions at a reduced rate.",
            [183,185],
            1e96,
            1,
        ],

        /*
        11: [
            "Placeholder.",
            [],
            1/0,
            1,
        ],
        */
    },
]

const TS_TIERS_EFF = [
    null,
    null,
    {
        31: [
            ()=>{
                let x = ((Math.log10(Math.max(1,player.meta.best1.l))+1)**2-1)/100+1

                return x
            },
            x=>shorten((x-1)*100)+"%",
        ],
        32: [
            ()=>{
                let x = Math.floor(player.resets/3000)

                return x
            },
            x=>"+"+getFullExpansion(x),
        ],
        33: [
            ()=>{
                let x = Math.floor(player.replicanti.galaxies/6)

                return x
            },
            x=>"+"+getFullExpansion(x),
        ],
        34: [
            ()=>{
                let x = Math.log10(player.meta.best1.add(1).l+1)/2

                return x
            },
            x=>"+"+shorten(x),
        ],
        35: [
            ()=>{
                let x = player.replicanti.amount.add(1).root(50)

                return x
            },
            x=>shorten(x)+"x",
        ],
        36: [
            ()=>{
                let x = Math.floor(player.dilation.freeGalaxies/7)

                return x
            },
            x=>"+"+getFullExpansion(x),
        ],
        41: [
            ()=>{
                let x = QCCompleted(3) ? Decimal.pow(2,player.galaxies**(0.42+0.01*tmp.qc_modifiers[3])) : (player.galaxies+1)**.75

                return x
            },
            x=>shorten(x)+"x",
        ],
        42: [
            ()=>{
                let x = QCCompleted(3) ? Decimal.pow(10,player.infinityPower.max(1).l**(0.1+0.003*tmp.qc_modifiers[3])) : (player.infinityPower.max(1).l+1)**.33

                return x
            },
            x=>shorten(x)+"x",
        ],
        43: [
            ()=>{
                let x = QCCompleted(3) ? Decimal.pow(10,player.timeShards.max(1).l**(0.15+0.005*tmp.qc_modifiers[3])) : (player.timeShards.max(1).l+1)**.5

                return x
            },
            x=>shorten(x)+"x",
        ],
        61: [
            ()=>{
                let x = player.tickspeed.div(1e3).pow(-1).max(1).l**0.4+1

                return x
            },
            x=>shorten(x)+"x",
        ],
        82: [
            ()=>{
                let x = Math.log10(player.quantum.protons+1)/3

                return x
            },
            x=>"+"+shorten(x),
        ],
        83: [
            ()=>{
                let x = Math.log10(player.quantum.electrons+1)/3

                return x
            },
            x=>"+"+shorten(x),
        ],
        91: [
            ()=>{
                let x = Decimal.pow(1.25,player.replicanti.amount.max(1).l**0.25)

                return x
            },
            x=>shorten(x)+"x",
        ],
        93: [
            ()=>{
                let x = Decimal.pow(1.2,player.replicanti.amount.max(1).l**0.33)

                return x
            },
            x=>shorten(x)+"x",
        ],
        121: [
            ()=>{
                let x = Math.floor(tmp.extraRG/4)

                return x
            },
            x=>"+"+getFullExpansion(x),
        ],
        122: [
            ()=>{
                let x = Math.pow(Math.log10(player.replicanti.amount.add(1).l+1),2.5)

                return x
            },
            x=>"+"+getFullExpansion(Math.floor(x))+" OoMs",
        ],
        131: [
            ()=>{
                let x = player.timeShards.add(1).l**0.8 / Math.log(1.5)

                x = softcap(x,!inQC(0) ? 1e5 : 1e6,0.5,0)

                return Math.floor(x)
            },
            x=>"+"+getFullExpansion(x),
        ],
        141: [
            ()=>{
                let log = Math.sqrt(Math.max(3-player.tickspeed.log10(),0))/2e4

                return Decimal.pow(10,log)
            },
            x=>shorten(x)+"x",
        ],
        151: [
            ()=>{
                let x = [getEternitied() + 1, Math.pow(getInfinitied() + 1, 0.15)]

                return x
            },
            x=>getFullExpansion(x[0])+"x to infinities, "+shorten(x[1])+"x to quarks",
        ],
        152: [
            ()=>{
                let x = [player.quantum.times + 1, Math.pow(getEternitied() + 1, 0.4)]

                return x
            },
            x=>getFullExpansion(x[0])+"x to eternities, "+shorten(x[1])+"x to quarks",
        ],
        171: [
            ()=>{
                let x = Math.pow(player.replicanti.amount.add(1).l+1,0.5)

                return x
            },
            x=>shorten(x)+"x",
        ],
        182: [
            ()=>{
                let x = Decimal.pow(10,Math.pow(player.quantum.replicant.preons.add(1).l,1/3))

                return x
            },
            x=>shorten(x)+"x",
        ],
        183: [
            ()=>{
                let x = Math.log10(player.quantum.protons+1)/100+1

                return x
            },
            x=>"^"+shorten(x),
        ],
        185: [
            ()=>{
                let x = Math.log10(player.timeShards.add(1).l+1)/25+1

                return x
            },
            x=>shortenPercent(x-1),
        ],
        191: [
            ()=>{
                let x = player.quantum.neutrons**0.5

                return x
            },
            x=>"+"+getFullExpansion(Math.round(x))+" later",
        ],
    },
]

const TS_NO_MULT_INCREASE = {
    2: [51,52,53,62,171],
}

const TS_DIL = {
    2: [62,71,92,103,161],
}

const TS_REQS = {
    2: {
        51: [
            () => ECTimesCompleted('eterc13')*50+1350,
            (x) => `${x} normal galaxies without non-bonus replicated galaxies in eternity run (${player.galaxies}/${x})`,
            (x) => player.replicanti.galaxies == 0 && player.galaxies >= x,
        ],
        52: [
            () => ECTimesCompleted('eterc14')*100+1200,
            (x) => `${x} replicated galaxies (${tmp.totalGalaxies-player.galaxies-player.dilation.freeGalaxies}/${x})`,
            (x) => tmp.totalGalaxies-player.galaxies-player.dilation.freeGalaxies >= x,
        ],
        53: [
            () => ECTimesCompleted('eterc15')*50+400,
            (x) => `${x} normal galaxies while dilated (${player.galaxies}/${x})`,
            (x) => player.dilation.active && player.galaxies >= x,
        ],
        62: [
            () => 50,
            (x) => `${x} Quarks Worth (${shortenDimensions(tmp.quarksWorth)}/${x})`,
            (x) => tmp.quarksWorth.gte(x),
        ],
        71: [
            () => 500,
            (x) => `${x} Quarks Worth (${shortenDimensions(tmp.quarksWorth)}/${x})`,
            (x) => tmp.quarksWorth.gte(x),
        ],
        81: [
            () => 15,
            (x) => `${x} TS tier II (${tmp.ts_tier.boughts[2]}/${x})`,
            (x) => tmp.ts_tier.boughts[2] >= 15,
        ],
        92: [
            () => [1e4,100],
            (x) => `${shortenCosts(x[0])} Quarks Worth (${shortenDimensions(tmp.quarksWorth)}/${shortenCosts(x[0])}), and ${x[1]} Neutrons (${shortenDimensions(player.quantum.neutrons)}/${x[1]})`,
            (x) => tmp.quarksWorth.gte(x[0]) && player.quantum.neutrons >= x[1],
        ],
        101: [
            () => 20,
            (x) => `${x} TS tier II (${tmp.ts_tier.boughts[2]}/${x})`,
            (x) => tmp.ts_tier.boughts[2] >= 20,
        ],
        103: [
            () => [8,1e24],
            (x) => `Complete first ${x[0]} Quantum Challenges, and ${shortenCosts(x[1])} Quarks Worth (${shortenDimensions(tmp.quarksWorth)}/${shortenCosts(x[1])})`,
            (x) => tmp.qc_completions >= x[0] && tmp.quarksWorth.gte(x[1]),
        ],
        161: [
            () => [20,1e49],
            (x) => `${x[0]} total EC modifiers, and ${shortenCosts(x[1])} Quarks Worth (${shortenDimensions(tmp.quarksWorth)}/${shortenCosts(x[1])})`,
            (x) => tmp.qc_total_modifiers >= x[0] && tmp.quarksWorth.gte(x[1]),
        ],
        181: [
            () => [40,1e60],
            (x) => `${x[0]} total EC modifiers, and ${shortenCosts(x[1])} Quarks Worth (${shortenDimensions(tmp.quarksWorth)}/${shortenCosts(x[1])})`,
            (x) => tmp.qc_total_modifiers >= x[0] && tmp.quarksWorth.gte(x[1]),
        ],
    },
}

const TS_BUTTON_TYPE = {
    normal: ['timestudy','timestudylocked','timestudybought'],
    ec: ['eternitychallengestudy','eternitychallengestudylocked','eternitychallengestudybought'],
    dil: ['dilationupg','timestudylocked','dilationupgbought'],

    red: ['timestudy redsplit','timestudylocked','timestudybought redsplit'],
    green: ['timestudy greensplit','timestudylocked','timestudybought greensplit'],
    blue: ['timestudy bluesplit','timestudylocked','timestudybought bluesplit'],
}

function getTSTierStyle(t,id) {
    let s = ""
    if (t == 2) {
        if (id >= 31 && id <= 36) s = `width: 140px; font-size: 9px; margin: 7px 0px;`;
        else if ([].includes(id)) s = `font-size: 9px;`
        else if (id == 151 || id == 152) s = `width: 250px; font-size: 9px;`
    }
    return s
}

const TS_UNLS = {
    2() {
        let s = [11,21,22,23,31,32,33,34,35,36,41,42,43,51,52,53]

        if (player.quantum.unlocked) s.push(61,62)

        if (hasTSTier(2,62)) s.push(63,71)

        if (hasTSTier(2,71)) s.push(81,82,83,91,92,93)

        if (hasTSTier(2,92)) s.push(101,102,103,111,121,122,123,131,132,133,141,142,151,152,161)

        if (hasTSTier(2,161)) s.push(171,172,173,181,182,183,184,185,191)

        return s
    },
}

var ts_unlocked = {2: [11,21,22,23,31,32,33,34,35,36,41,42,43,51,52,53]}

function updateTSTiersButtons(tier=ts_tier_tab,force=false) {
    if ((ts_tier_tab == tier || force) && tier > 1) {
        for (id in TS_TIERS[tier]) {
            id = parseInt(id)

            let btn = el('TST'+tier+"_"+id), unl = ts_unlocked[tier].includes(id)

            btn.style.visibility = unl?'visible':'hidden'

            if (!unl) continue;

            let data = TS_TIERS[tier][id]
            let eff = TS_TIERS_EFF[tier][id]
            let cost = tmp.ts_tier.cost[tier][id]
            let style = TS_BUTTON_TYPE[data[4] || 'normal']

            let req

            if (id in TS_REQS[tier]) req = TS_REQS[tier][id]

            let h = data[0]

            if (eff) h += "<span>Currently: "+eff[1](TSTierEffect(tier,id))

            if (req) h += "<span>Requirement: "+req[1](req[0]())

            if (data[4] != 'dil') h += "<span>Cost: "+shorten(cost)+" TT"

            btn.innerHTML = h
            btn.className = (hasTSTier(tier,id) ? style[2] : canBuyTSTier(tier,id) ? style[0] : style[1]) // + (!player.quantum.unlocked && tier==2 && id>60 ? " quantumized" : "")
        }
    } 
}

function setupTSTiersHTML() {
    for (let t = 2; t < TS_TIERS_MAP.length; t++) {
        let ts_div = el('TS_tier'+t)
        let h = ''

        for (let r = 0; r < TS_TIERS_MAP[t].length; r++) {
            h += `<table class="table" class="studytable"><tr>`

            for (let c = 0; c < TS_TIERS_MAP[t][r].length; c++) {
                let id = TS_TIERS_MAP[t][r][c]
                let data = TS_TIERS[t][id]
                if (id === 0 && !data) {
                    h += `<td style="opacity: 0;"><button class="timestudylocked"></button></td>`
                } else {
                    h += `
                    <td><button class="timestudylocked" id="TST${t}_${id}" onclick="buyTSTier(${t},${id})" style="${getTSTierStyle(t,id)}">
                        ${data[0]}
                    </button></td>
                    `
                }
            }

            h += `</tr></table>`
        }

        ts_div.innerHTML = h
    }
}

function hasTSTier(t,id) { return player.ts_tier[t-2].includes(id) }

function switchTSTier(i) {
    ts_tier_tab = i;
    updateTSTiersHTML()
    resizeCanvas()
}

function getTSTierCost(t,id) { return tmp.ts_tier.cost[t][id] || TS_TIERS[t][id][2] }
function TSTierEffect(t,id,def=1) { return tmp.ts_tier.effect[t][id] || def }

function canBuyTSTier(t,id) {
    if (!ts_unlocked[t].includes(id)) return false

    if (t == 2 && id == 182 && !hasTSTier(2,171)) return false
    else if (t == 2 && id == 184 && !hasTSTier(2,171)) return false
    else if (t == 2 && id == 171 && !hasTSTier(2,151) && !hasTSTier(2,152)) return false
    else if (t == 2 && id == 111 && !hasTSTier(2,101)) return false
    else if (t == 2 && id == 101 && !hasTSTier(2,81)) return false
    else if (t == 2 && id == 81 && !hasTSTier(2,63)) return false
    else if (t == 2 && id == 63 && !hasTSTier(2,61)) return false
    else if (t == 2 && id == 61 && !(ECTimesCompleted('eterc13') || ECTimesCompleted('eterc14') || ECTimesCompleted('eterc15'))) return false
    else if (!player.quantum.unlocked && t == 2 && id > 60) return false
    else if (player.eternityChallUnlocked !== 0 && t == 2 && id >= 51 && id <= 53 && player.eternityChallUnlocked != id - 38) return false

    let req

    if (id in TS_REQS[t]) {
        req = TS_REQS[t][id]
        if (!req[2](req[0]())) return false
    }

    let data = TS_TIERS[t][id]
    let bought

    if (
        data[1].length == 0
        || (t == 2 && id == 61 && (hasTSTier(2,41)||hasTSTier(2,42)||hasTSTier(2,43)))
    ) bought = true
    else for (let i = 0; i < data[1].length; i++) if (hasTSTier(t,data[1][i])) {
        bought = true
        break
    }

    return bought && Decimal.gte(player.timestudy.theorem,tmp.ts_tier.cost[t][id])
}

function buyTSTier(t,id,update) {
    if (hasTSTier(t,id)) return

    if (canBuyTSTier(t,id)) {
        player.timestudy.theorem = nS(player.timestudy.theorem,tmp.ts_tier.cost[t][id])
        player.ts_tier[t-2].push(id)

        if (t == 2 && id >= 51 && id <= 53) {
            unlockEChall(id - 38)
        } else if (t == 2 && id == 62) {
            showTab('quantum')
            showQuantumTab('gluons_tab')
        } else if (t == 2 && id == 71) {
            showTab('quantum')
            showQuantumTab('atoms_tab')
        } else if (t == 2 && (id == 92 || id == 103)) {
            showTab("challenges")
            showChallengesTab("quantumchallenges")
        } else if (t == 2 && id == 161) {
            showTab("quantum")
            showQuantumTab('replicants_tab')
        } else if (t == 2 && id == 181) {
            showTab("dimensions")
            showDimTab('emperordimensions')
        }

        updateTSTierCosts(t)
        if (update) updateTSTiersTemp()
        drawStudyTree()
    }
}

function updateTSTiersHTML() {
    if (el('timestudies').style.display == "block" && el('eternitystore').style.display == "block") {
        el('ts_tier_btn2').style.display = metaUnlocked() ? "block" : "none";
        el('ts_cost_multiplier').textContent = ts_tier_tab > 1 ? "TS Tier II's cost multiplier: "+shorten(tmp.ts_tier.mult[ts_tier_tab]||1)+"x" : ""
        for (let x = 1; x <= 2; x++) {
            el('TS_tier'+x).style.display = ts_tier_tab == x ? "block" : "none";

            updateTSTiersButtons(x)
        }
    }
}

function updateTSTierCosts(t) {
    let datas = TS_TIERS[t]
    let pts = player.ts_tier[t-2]
    let mult = 1
    let rgb_mult = [null,1,1,1]
    let cost_mult = {}
    for (let i = 0; i < pts.length; i++) {
        let id = pts[i]

        if (cost_mult[id]) continue

        let inc = datas[id][3]??1
        let row = Math.floor(id/10)
        let col = id%10

        if ((row == 12 || row == 13) && col <= 3) {
            cost_mult[id] = mult * rgb_mult[col]
            if (row == 12) cost_mult[id+10] = mult * rgb_mult[col]

            rgb_mult[col%3+1] *= inc
            rgb_mult[(col+1)%3+1] *= inc
        } else {
            cost_mult[id] = mult
            mult = inc == 0 ? 1 : mult * inc
        }
    }
    tmp.ts_tier.mult[t] = mult
    // console.log(cost_mult)
    for (let id in datas) {
        id = parseInt(id)
        let data = datas[id]
        let row = Math.floor(id/10)
        let col = id%10

        let cost = data[2]

        if (!TS_NO_MULT_INCREASE[t].includes(id)) {
            cost *= cost_mult[id]||mult
            if ((row == 12 || row == 13) && col <= 3 && !cost_mult[id]) cost = cost * rgb_mult[col]
        }

        tmp.ts_tier.cost[t][id] = cost
    }
}

function updateTSTiersTemp() {
    for (let x = 2; x < TS_TIERS.length; x++) {
        let datas = TS_TIERS[x]
        ts_unlocked[x] = TS_UNLS[x]()

        let effs = TS_TIERS_EFF[x]
        updateTSTierCosts(x)

        let b = 0, bb = player.ts_tier[x-2]

        for (let i = 0; i < bb.length; i++) {
            let d = datas[bb[i]]

            if (d[4] != 'ec' && d[4] != 'dil') b++
        }

        tmp.ts_tier.boughts[x] = b

        for (let id in effs) {
            let eff = effs[id]
            tmp.ts_tier.effect[x][id] = eff[0]()
        }
    }
}