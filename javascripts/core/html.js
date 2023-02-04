function openConifmations() {
    el('confirmationmenu').style.display = 'block';
    updateConifrmationDiv()
}

function updateConifrmationDiv() {
    document.getElementById("dilationconf").style.display = player.dilation.studies.includes(1) ? "" : "none";
    document.getElementById("dilationconf").textContent = "Dilation confirmation " + (player.options.dilationconfirm ? "ON" : "OFF")

    document.getElementById("quantumconf").style.display = player.quantum.unlocked ? "" : "none";
    document.getElementById("quantumconf").textContent = "Quantum confirmation " + (player.options.quantumconfirm ? "ON" : "OFF")
}

function setupAllHTMLs() {
    metaDimensionSetupHTML()
    setupTSTiersHTML()
    setupQUSpeedrunHTML()
}

function updateHTMLOnLoad() {
    updateQUSpeedrunHTML()
    updateAutoMD()
    updateAssortPercentage()

    el('autoTT').style.display = player.quantum.speedruns>1 ? '' : 'none'
    el('autoTT').textContent = player.timestudy.auto?'Auto: ON':'Auto: OFF'

    el('autoRDU').style.display = player.quantum.speedruns>6 ? '' : 'none'
    el('autoRDU').textContent = "Auto-Rebuyable Dilation Upgrades: "+(player.dilation.auto_upg?"ON":"OFF")

    let colors = ['r','g','b']
    for (let i in colors) document.getElementById("ratio_" + colors[i]).value = player.quantum.assortRatio[colors[i]]
}

function updateEverySecond() {
    if (player.timestudy.auto) maxTheorems()
    if (player.dilation.auto_upg) for (let i = 0; i < 4; i++) buyDilationUpgrade([4,3,1,2][i],true)
}

function updateAllTick(dt) {
    dt /= 10

    if (player.quantum.speedruns > 23) player.infinitiedBank = Math.round(player.infinitiedBank + getInfinitedGain()*dt)
}