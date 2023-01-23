var ts_tier_tab = 1

const TS_TIERS_MAP = [
    null,
    null,
    [
        [11],
        [21,22,23],
        [31,32,33,34,35,36],
        [41,42,43]
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

        /*
        11: [
            "Placeholder.",
            [],
            1/0,
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

function getTSTierStyle(t,id) {
    let s = ""
    if (t == 2) {
        if (id >= 31 && id <= 36) s = `width: 140px; font-size: 0.57rem; margin: 7px 0px;`
    }
    return s
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

        drawStudyTree()
        updateTSTierCosts(t)
    }
}

function updateTSTiersHTML() {
    if (el('timestudies').style.display == "block" && el('eternitystore').style.display == "block") {
        el('ts_tier_btn2').style.display = metaUnlocked() ? "block" : "none";
        el('ts_cost_multiplier').textContent = ts_tier_tab > 1 ? "TS Tier II's cost multiplier: "+shorten(tmp.ts_tier.mult[ts_tier_tab]||1)+"x" : ""
        for (let x = 1; x <= 2; x++) {
            el('TS_tier'+x).style.display = ts_tier_tab == x ? "block" : "none";

            if (ts_tier_tab == x && x > 1) {
                for (id in TS_TIERS[x]) {
                    id = parseInt(id)

                    let data = TS_TIERS[x][id]
                    let eff = TS_TIERS_EFF[x][id]
                    let btn = el('TST'+x+"_"+id)
                    let cost = tmp.ts_tier.cost[x][id]

                    btn.innerHTML = data[0]+(eff?"<span>Currently: "+eff[1](TSTierEffect(x,id)):"")+"<span>Cost: "+shorten(cost)+" TT"
                    btn.className = hasTSTier(x,id) ? "timestudybought" : canBuyTSTier(x,id) ? "timestudy" : "timestudylocked"
                }
            } 
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
        let data = datas[id]
        tmp.ts_tier.cost[t][id] = data[2] * (cost_mult[id]||mult)
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