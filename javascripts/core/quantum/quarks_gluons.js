const MIX_COLORS = ['rg','gb','br']

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

	if (color == "r" && hasGluonUpg("rg6") || color == "g" && hasGluonUpg("gb6") || color == "b" && hasGluonUpg("br6")) x = x.pow(1.5)

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

function generateGluons(mix) {
	let toConsume = player.quantum.gluons[mix].add(player.quantum.color[mix[0]])
	if (toConsume.eq(0)) return
	player.quantum.gluons[mix] = toConsume
	player.quantum.color[mix[0]] = player.quantum.color[mix[0]].sub(toConsume).round()
	updateQuarksHTML()
}

var gluonUpgCosts = [null,20,40,100,1500,1e33,1e40]

var gluonUpgs = {
	rg: [
		null,
		[
			`Remote Antimatter Galaxy cost scaling is approximately 2x slower.`,
		],
		[
			`Dimension Boosts boost Meta Dimensions.`,
			() => {
				let x = player.resets+1

				return x
			},
			x => shorten(x)+"x",
		],
		[
			`Dimension Supersonic starts +25 later per total galaxy.`,
			() => {
				let x = tmp.totalGalaxies*25

				return x
			},
			x => "+"+shortenDimensions(x)+" later",
		],
		[
			`14th dilation upgrade is 10% stronger.`,
		],
		[
			`Slow down the Distant Antimatter Galaxy cost scaling by 25%.`,
		],
		[
			`Improve red power's production better.`,
		],
	],
	gb: [
		null,
		[
			`You gain replicanti faster based on tickspeed upgrades from Time Shards.`,
			() => {
				let x = Math.log10(player.totalTickGained+1)**2+1

				return x
			},
			x => shorten(x)+"x",
		],
		[
			`Replicate interval scaling is 2x slower.`,
		],
		[
			`Replicate chance can go over 100%.`,
		],
		[
			`Replicate chance boosts itself.`,
			() => {
				var intensity = 5
				return Decimal.max(Math.log10(player.replicanti.chance + 1), 1).pow(intensity)
			},
			x => "^"+shorten(x),
		],
		[
			`Infinity power slows down the Distant Antimatter Galaxy cost scaling.`,
			() => {
				let x = 1/(Math.log10(player.infinityPower.l+1)/10+1)

				return x
			},
			x => shortenReduction(x),
		],
		[
			`Improve green power's production better.`,
		],
	],
	br: [
		null,
		[
			`Blue Powers boost tachyon particles.`,
			() => {
				let x = player.quantum.charge.b.add(1).l

				return Decimal.pow(10,Math.pow(x,1/3)/2)
			},
			x => shorten(x)+"x",
		],
		[
			`Sacrifice boosts dilated time.`,
			() => {
				let x = Decimal.pow(tmp.sacPow.l+1,1/3)

				return x
			},
			x => shorten(x)+"x",
		],
		[
			`Dilated time formula from tachyon particle is better.`,
		],
		[
			`Multiplier per ten dimensions boosts Meta Dimensions.`,
			() => {
				let x = tmp.atom.electron_eff[1].root(2000)

				return x
			},
			x => shorten(x)+"x",
		],
		[
			`Meta-Dimension boosts slow down the Distant Antimatter Galaxy cost scaling.`,
			() => {
				let x = 1/(player.meta.reset/500+1)

				return x
			},
			x => shortenReduction(x),
		],
		[
			`Improve blue power's production better.`,
		],
	],
}

function hasGluonUpg(name) { return player.quantum.gluon_upg.includes(name) }
function gluonUpgEff(name,def=1) { return tmp.gluon_eff[name]||def }

function buyGluonUpg(mix,i) {
	let name = mix+i, cost = gluonUpgCosts[i], g = player.quantum.gluons
	if (hasGluonUpg(name) || g[mix].lt(cost)) return
	player.quantum.gluon_upg.push(name)
	g[mix] = g[mix].sub(cost).round()
}

function updateGluonsHTML() {
	let upgs_unl = 4

	if (hasTSTier(2,103)) upgs_unl = 6

	for (let mix in player.quantum.gluons) {
		let g = player.quantum.gluons[mix]
		el('generate'+mix.toUpperCase()+'GluonsAmount').textContent = shortenDimensions(player.quantum.color[mix[0]])
        el(mix).textContent = shortenDimensions(g)

		for (let i = 1; i < gluonUpgCosts.length; i++) {
			let upg_el = el(mix+"upg"+i)

			upg_el.style.display = i <= upgs_unl ? "" : "none"
			
			let upg = gluonUpgs[mix][i]||["Placeholder."], h = upg[0]
			if (upg[2]) h += `<br>Effect: ${upg[2](tmp.gluon_eff[mix+i])}`
			if (!hasGluonUpg(mix+i)) h += `<br>Cost: ${shortenDimensions(gluonUpgCosts[i])} ${mix.toUpperCase()} gluons`
			upg_el.innerHTML = h

			upg_el.className = (hasGluonUpg(mix+i) ? "gluonupgradebought " : "gluonupgrade " + (g.gte(gluonUpgCosts[i]) ? "" : "locked ")) + mix
		}
    }
}