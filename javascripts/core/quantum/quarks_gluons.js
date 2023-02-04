function getAssortPercentage() {
	return player.quantum.assortPercentage || 100
}

function getAssortAmount() {
	return player.quantum.quarks.floor().min(player.quantum.quarks).times(getAssortPercentage() / 100).round()
}

var assortDefaultPercentages = [10, 25, 50, 100]
function updateAssortPercentage() {
	let percentage = getAssortPercentage()
	document.getElementById("assort_percentage").value = percentage
	for (var i = 0; i < assortDefaultPercentages.length; i++) {
		var percentage2 = assortDefaultPercentages[i]
		document.getElementById("assort_percentage_" + percentage2).className = percentage2 == percentage ? "chosenbtn" : "storebtn"
	}
}

function changeAssortPercentage(x) {
	player.quantum.assortPercentage = Math.max(Math.min(parseFloat(x || document.getElementById("assort_percentage").value), 100), 0)
	updateAssortPercentage()
}

function changeRatio(color) {
	var value = parseFloat(document.getElementById("ratio_" + color).value)
	if (value < 0 || isNaN(value)) {
		document.getElementById("ratio_" + color).value = player.quantum.assortRatio[color]
		return
	}
	var sum = 0
	var colors = ['r','g','b']
	for (c = 0; c < 3; c++) sum += colors[c] == color ? value : player.quantum.assortRatio[colors[c]]
	if (sum == 0 || sum == 1/0) {
		document.getElementById("ratio_" + color).value = player.quantum.assortRatio[color]
		return
	}
	player.quantum.assortRatio[color] = value
}

function assignQuark(color) {
	var usedQuarks = getAssortAmount()
	if (usedQuarks.eq(0)) {
		$.notify("Make sure you are assigning at least one quark!")
		return
	}
	if (color != "r" && player.quantum.color.r.lt(1) && player.quantum.times < 2) if (!confirm("It is strongly recommended to assign your first quarks to red. Are you sure you want to do that?")) return
	var mult = 1
	player.quantum.color[color] = player.quantum.color[color].add(usedQuarks.times(mult)).round()
	player.quantum.quarks = player.quantum.quarks.sub(usedQuarks)
}

function assignAll(auto) {
	var ratios = player.quantum.assortRatio
	var sum = ratios.r+ratios.g+ratios.b
	var oldQuarks = getAssortAmount()
	var colors = ['r','g','b']
	var mult = 1
	if (oldQuarks.lt(100)) {
		if (!auto) $.notify("You can only use this feature if you will assign at least 100 quarks.")
		return
	}
	for (c = 0; c < 3; c++) {
		var toAssign = oldQuarks.times(ratios[colors[c]]/sum).round()
		if (toAssign.gt(0)) {
			player.quantum.color[colors[c]] = player.quantum.color[colors[c]].add(toAssign.times(mult)).round()
		}
	}
	player.quantum.quarks = player.quantum.quarks.sub(oldQuarks).round()
	if (mult.gt(1)) updateQuantumWorth()
	updateColorCharge()
}

function updateQuarksHTML() {
    var colors = ['r','g','b'], colors2 = ['red','green','blue']
    el('assort_amount').textContent = shortenDimensions(player.quantum.quarks.mul(getAssortPercentage()/100))

    for (let c in colors) {
        el(colors2[c]+'Quarks').textContent = shortenDimensions(player.quantum.color[colors[c]])
        el(colors2[c]+'Power').textContent = shortenMoney(player.quantum.charge[colors[c]])
        el(colors[c]+'PowerRate').textContent = tmp.chargeRate[colors[c]].gt(0)?"+"+shortenMoney(tmp.chargeRate[colors[c]])+"/s":''

        el(colors2[c]+'Translation').textContent = shortenMoney(c==2?tmp.chargeEffect.b:(tmp.chargeEffect[colors[c]]-1)*100)
        //if (c == 2) el('blueTranslationMD').textContent = shortenMoney(tmp.chargeEffect.b[1])
    }
}

function getColorPowerProduction(color) {
	let x = player.quantum.color[color]

	if (hasTSTier(2,61)) x = x.mul(TSTierEffect(2,61))

	return x
}

var chargeEffects = {
    r() {
        let x = player.quantum.charge.r.add(1).l

        if (x>=100) x = Math.sqrt(x/100)*100
    
        return Math.sqrt(x)/10+1
    },
    g() {
        let x = player.quantum.charge.g.add(1).l

        if (x>=100) x = Math.sqrt(x/100)*100

        return Math.sqrt(x/1.5+1)
    },
    b() {
        let x = player.quantum.charge.b.add(1).l

        return Decimal.pow(10,Math.pow(x,2/3))
    },
}