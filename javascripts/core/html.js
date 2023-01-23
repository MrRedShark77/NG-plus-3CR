function openConifmations() {
    el('confirmationmenu').style.display = 'block';
    updateConifrmationDiv()
}

function updateConifrmationDiv() {
    document.getElementById("dilationconf").style.display = player.dilation.studies.includes(1) ? "" : "none";
    document.getElementById("dilationconf").textContent = "Dilation confirmation " + (player.options.dilationconfirm ? "ON" : "OFF")
}