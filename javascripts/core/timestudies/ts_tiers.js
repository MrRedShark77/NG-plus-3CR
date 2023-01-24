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
                let x = (player.galaxies+1)**.75

                return x
            },
            x=>shorten(x)+"x",
        ],
        42: [
            ()=>{
                let x = (player.infinityPower.max(1).l+1)**.33

                return x
            },
            x=>shorten(x)+"x",
        ],
        43: [
            ()=>{
                let x = (player.timeShards.max(1).l+1)**.5

                return x
            },
            x=>shorten(x)+"x",
        ],
    },
]

const TS_NO_MULT_INCREASE = {
    2: [51,52,53],
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
    },
}

const TS_BUTTON_TYPE = {
    normal: ['timestudy','timestudylocked','timestudybought'],
    ec: ['eternitychallengestudy','eternitychallengestudylocked','eternitychallengestudybought'],
}

function getTSTierStyle(t,id) {
    let s = ""
    if (t == 2) {
        if (id >= 31 && id <= 36) s = `width: 140px; font-size: 0.57rem; margin: 7px 0px;`;
        else if (id >= 51 && id <= 53) s = `font-size: 0.58rem;`
    }
    return s
}

function updateTSTiersButtons(tier=ts_tier_tab,force=false) {
    if ((ts_tier_tab == tier || force) && tier > 1) {
        for (id in TS_TIERS[tier]) {
            id = parseInt(id)

            let data = TS_TIERS[tier][id]
            let eff = TS_TIERS_EFF[tier][id]
            let btn = el('TST'+tier+"_"+id)
            let cost = tmp.ts_tier.cost[tier][id]
            let style = TS_BUTTON_TYPE[data[4] || 'normal']

            let req

            if (id in TS_REQS[tier]) req = TS_REQS[tier][id]

            let h = data[0]

            if (eff) h += "<span>Currently: "+eff[1](TSTierEffect(tier,id))

            if (data[4] == 'ec') h += "<span>Requirement: "+req[1](req[0]())

            h += "<span>Cost: "+shorten(cost)+" TT"

            btn.innerHTML = h
            btn.className = hasTSTier(tier,id) ? style[2] : canBuyTSTier(tier,id) ? style[0] : style[1]
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
    if (player.eternityChallUnlocked !== 0 && t == 2 && id >= 51 && id <= 53 && player.eternityChallUnlocked != id - 38) return false

    let req

    if (id in TS_REQS[t]) {
        req = TS_REQS[t][id]
        if (!req[2](req[0]())) return false
    }

    let data = TS_TIERS[t][id]
    let bought

    if (data[1].length == 0) bought = true
    else for (let i = 0; i < data[1].length; i++) if (hasTSTier(t,data[1][i])) {
        bought = true
        break
    }

    return bought && player.timestudy.theorem >= tmp.ts_tier.cost[t][id]
}

function buyTSTier(t,id) {
    if (hasTSTier(t,id)) return

    if (canBuyTSTier(t,id)) {
        player.timestudy.theorem -= tmp.ts_tier.cost[t][id]
        player.ts_tier[t-2].push(id)

        if (t == 2 && id >= 51 && id <= 53) {
            unlockEChall(id - 38)
        }

        updateTSTierCosts(t)
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
    let cost_mult = {}
    for (let i = 0; i < pts.length; i++) {
        let id = pts[i]
        cost_mult[id] = mult
        mult *= datas[id][3]||1
    }
    tmp.ts_tier.mult[t] = mult
    //console.log(cost_mult)
    for (let id in datas) {
        id = parseInt(id)
        let data = datas[id]
        tmp.ts_tier.cost[t][id] = data[2] * (TS_NO_MULT_INCREASE[t].includes(id) ? 1 : cost_mult[id]||mult)
    }
}

function updateTSTiersTemp() {
    for (let x = 2; x < TS_TIERS.length; x++) {
        let effs = TS_TIERS_EFF[x]
        updateTSTierCosts(x)

        for (let id in effs) {
            let eff = effs[id]
            tmp.ts_tier.effect[x][id] = eff[0]()
        }
    }
}