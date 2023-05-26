function updateAtomTemp() {
    let ta = tmp.atom

    let m = player.quantum.protons/10+1

    ta.proton_eff = [m, m * 2e6]

    m = player.quantum.electrons+1

    ta.electron_eff = [m, Decimal.pow(getDimensionPowerMultiplier(),m)]

    m = player.quantum.neutrons

    ta.neutron_eff = m/3

    for (let i = 0; i < 2; i++) {
        let s = 1

        for (let j = 0; j < 2; j++) {
            s += player.quantum.atom_upg[i][j] * ta.mult
        }

        ta.total_mult[i] = s
    }
}

const ATOM_UPG = [
    [
        [600,10,'meta-antimatter',()=>player.meta.antimatter],
        [8e4,2e3,'replicanti',()=>player.replicanti.amount],
    ],[
        [20,1,'meta-dimension boosts',()=>player.meta.reset],
        [100,5,'dilated time',()=>player.dilation.dilatedTime],
    ],
]

function getAtomUpgCost(i,j) {
    let lvl = player.quantum.atom_upg[i][j], u = ATOM_UPG[i][j], exp = 2
    let base = Math.round(u[1]*lvl**exp+u[0])

    return i==1&&j==0 ? base : Decimal.pow(10,base)
}

function canBuyAtomUpg(i,j,cost=getAtomUpgCost(i,j)) {
    let a = ATOM_UPG[i][j][3]()
    return i==1&&j==0 ? a >= cost : a.gte(cost)
}

function buyAtomUpg(i,j) {
    if (canBuyAtomUpg(i,j)) {
        let u = ATOM_UPG[i][j], a = u[3](), exp = 2
        if (i!=1||j!=0) a = a.e
        player.quantum.atom_upg[i][j] = Math.max(player.quantum.atom_upg[i][j],Math.floor(Math.pow((a-u[0])/u[1],1/exp)+1))
    }
}

function updateAtomsHTML() {
    el('proton_amt').textContent = getFullExpansion(player.quantum.protons)
    el('electron_amt').textContent = getFullExpansion(player.quantum.electrons)
    el('neutron_amt').textContent = getFullExpansion(player.quantum.neutrons)

    let ta = tmp.atom

    el('proton_eff1').textContent = shorten(ta.proton_eff[0])
    el('proton_eff2').textContent = getFullExpansion(ta.proton_eff[1])

    el('electron_eff1').textContent = getFullExpansion(ta.electron_eff[0])
    el('electron_eff2').textContent = shorten(ta.electron_eff[1])
    el('electron_eff3').textContent = shorten(getDimensionPowerMultiplier())

    el('neutron_eff').textContent = getFullExpansion(Math.round(ta.neutron_eff*100)/100)

    let at = ['proton','electron','neutron']

    for (let i = 0; i < 2; i++) {
        el(at[i]+'_mult').textContent = shorten(tmp.atom.total_mult[i])

        for (let j = 0; j < 2; j++) {
            let btn = el(at[i]+'upg'+(j+1)), u = ATOM_UPG[i][j]
            let cost = getAtomUpgCost(i,j)

            btn.innerHTML = `
            Increase the multiplier by ${shorten(tmp.atom.mult)}x.<br>
            Level: ${getFullExpansion(player.quantum.atom_upg[i][j])}<br>
            Require: ${(i == 1 && j == 0 ? getFullExpansion : shortenCosts)(cost)} ${u[2]}
            `

            btn.className = 'gluonupgrade '+at[i]+(canBuyAtomUpg(i,j,cost) ? "" : ' locked')
        }
    }
}