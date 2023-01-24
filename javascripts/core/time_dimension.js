//time dimensions

function getTimeDimensionPower(tier) {
  if (player.currentEternityChall == "eterc11") return E(1)
  var dim = player["timeDimension"+tier]
  var ret = dim.power.pow(2)

  if (player.timestudy.studies.includes(11) && tier == 1) ret = ret.dividedBy(player.tickspeed.dividedBy(1000).pow(0.005).times(0.95).plus(player.tickspeed.dividedBy(1000).pow(0.0003).times(0.05)).max(Decimal.fromMantissaExponent(1, -2500)))
  if (player.achievements.includes("r105")) ret = ret.div(player.tickspeed.div(1000).pow(0.000005))

  ret = ret.times(kongAllDimMult)

  if (player.eternityUpgrades.includes(4)) ret = ret.times(player.achPow)
  if (player.eternityUpgrades.includes(5)) ret = ret.times(Math.max(player.timestudy.theorem, 1))
  if (player.eternityUpgrades.includes(6)) ret = ret.times(player.totalTimePlayed / 10 / 60 / 60 / 24)
  if (player.timestudy.studies.includes(73) && tier == 3) ret = ret.times(calcTotalSacrificeBoost().pow(0.005).min(E("1e1300")))
  if (player.timestudy.studies.includes(93)) ret = ret.times(Decimal.pow(player.totalTickGained, 0.25).max(1))
  if (player.timestudy.studies.includes(103)) ret = ret.times(Math.max(player.replicanti.galaxies, 1))
  if (player.timestudy.studies.includes(151)) ret = ret.times(1e4)
  if (player.timestudy.studies.includes(221)) ret = ret.times(Decimal.pow(1.0025, player.resets))
  if (player.timestudy.studies.includes(227) && tier == 4) ret = ret.times(Math.max(Math.pow(calcTotalSacrificeBoost().log10(), 10), 1))
  if (player.currentEternityChall == "eterc9") ret = ret.times((Decimal.pow(Math.max(player.infinityPower.log2(), 1), 4)).max(1))
  if (ECTimesCompleted("eterc1") !== 0) ret = ret.times(Math.pow(Math.max(player.thisEternity*10, 0.9), 0.3+(ECTimesCompleted("eterc1")*0.05)))
  let ec10bonus = E(1)
  if (ECTimesCompleted("eterc10") !== 0) ec10bonus = E(Math.max(Math.pow(getInfinitied(), 0.9) * ECTimesCompleted("eterc10") * 0.000002+1, 1))
  if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4)
  ret = ret.times(ec10bonus)
  if (player.achievements.includes("r128")) ret = ret.times(Math.max(player.timestudy.studies.length, 1))

  if (player.replicanti.unl && player.replicanti.amount.gt(1) && player.dilation.upgrades.includes(6)) {
    var replmult = Decimal.pow(Decimal.log2(player.replicanti.amount), 2)

    if (player.timestudy.studies.includes(21)) replmult = replmult.plus(Decimal.pow(player.replicanti.amount, 0.032))
    if (player.timestudy.studies.includes(102)) replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies))

    ret = ret.times(replmult.pow(0.1))
  }

  if (hasTSTier(2,35)) ret = ret.mul(TSTierEffect(2,35))

  if (ret.lt(1)) ret = E(1)

  if (hasTSTier(2,23)) ret = ret.pow(1.025)

  if (player.dilation.active || inEC(15)) {
    ret = Decimal.pow(10, Math.pow(ret.log10(), getDilationPenalty()))
    if (player.dilation.upgrades.includes(11)) {
      ret = Decimal.pow(10, Math.pow(ret.log10(), 1.05))
    }
  }


  return ret

}

function toggleAllTimeDims() {
	var turnOn
	var id = 1
	while (id <= 8 && turnOn === undefined) {
		if (!player.autoEterOptions["td" + id]) turnOn = true
		else if (id > 7) turnOn = false
		id++
	}
	for (id = 1; id <= 8; id++) {
		player.autoEterOptions["td" + id] = turnOn
		document.getElementById("td" + id + 'auto').textContent = "Auto: " + (turnOn ? "ON" : "OFF")
	}
	document.getElementById("maxTimeDimensions").style.display = turnOn ? "none" : ""
}


function getTimeDimensionProduction(tier) {
  if (player.currentEternityChall == "eterc10" || inEC(14)) return E(0)
  var dim = player["timeDimension"+tier]
  if (player.currentEternityChall == "eterc11") return dim.amount
  var ret = dim.amount
  ret = ret.times(getTimeDimensionPower(tier))
  if (player.currentEternityChall == "eterc7") {
      ret = ret.dividedBy(player.tickspeed.dividedBy(1000))
  }
  if (player.currentEternityChall == "eterc1") return E(0)
  return ret
}


function getTimeDimensionRateOfChange(tier) {
  if (inEC(13)) return E(0)
  let toGain = getTimeDimensionProduction(tier+1)
  var current = Decimal.max(player["timeDimension"+tier].amount, 1);
  var change  = toGain.times(10).dividedBy(current);
  return change;
}

function getTimeDimensionDescription(tier) {
  var name = TIER_NAMES[tier];

  let description = shortenDimensions(player['timeDimension'+tier].amount);

  if (tier < 8) {
      description += '  (+' + formatValue(player.options.notation, getTimeDimensionRateOfChange(tier), 2, 2) + '%/s)';
  }

  return description;
}

function updateTimeDimensions() {
  if (document.getElementById("timedimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {
    for (let tier = 1; tier <= 4; ++tier) {
      document.getElementById("timeD"+tier).textContent = DISPLAY_NAMES[tier] + " Time Dimension x" + shortenMoney(getTimeDimensionPower(tier));
      document.getElementById("timeAmount"+tier).textContent = getTimeDimensionDescription(tier);
    }
    if (player.dilation.studies.includes(2)) {
      for (let tier = 5; tier <= 8; ++tier) {
        if (player.dilation.studies.includes(tier-3)) {
          document.getElementById("timeD"+tier).textContent = DISPLAY_NAMES[tier] + " Time Dimension x" + shortenMoney(getTimeDimensionPower(tier));
          document.getElementById("timeAmount"+tier).textContent = getTimeDimensionDescription(tier);
        }
      }
    }
    for (let tier = 1; tier <= 8; ++tier) {
      if (player.dilation.studies.includes(tier-3) || tier < 5) {
        document.getElementById("timeRow"+tier).style.display = "table-row"
      } else {
        document.getElementById("timeRow"+tier).style.display = "none"
      }
    }
    
    for (i=1;i<9;i++) document.getElementById("td"+i+'auto').textContent="Auto: O"+(player.autoEterOptions["td"+i]?"N":"FF")
  }
}

function getOrSubResourceTD(tier, sub) {
	if (sub == undefined) {
		return player.eternityPoints
	} else {
		player.eternityPoints = player.eternityPoints.sub(player.eternityPoints.min(sub))
	}
}

function isTDUnlocked(t) {
	if (t > 8) return
	return t < 5 || player.dilation.studies.includes(t - 3)
}

function timeDimCost(tier, bought) {
	var cost = Decimal.pow(timeDimCostMults[tier], bought).times(timeDimStartCosts[tier])
	if (cost.gte(Number.MAX_VALUE)) cost = Decimal.pow(timeDimCostMults[tier]*1.5, bought).times(timeDimStartCosts[tier])
	if (cost.gte("1e1300")) cost = Decimal.pow(timeDimCostMults[tier]*2.2, bought).times(timeDimStartCosts[tier])
	if (tier > 4) cost = Decimal.pow(timeDimCostMults[tier]*100, bought).times(timeDimStartCosts[tier])

  if (cost.gte("1e4000")) {
    let ec = cost.log10()
    cost = Decimal.pow(10+(ec-4000)/100,ec**1.01)
  }

	return cost
}

var timeDimCostMults = [null, 3, 9, 27, 81, 243, 729, 2187, 6561]
var timeDimStartCosts = [null, 1, 5, 100, 1000, "1e2350", "1e2650", "1e3000", "1e3350"]
function buyMaxTimeDimension(tier, bulk) {
	var dim = player['timeDimension' + tier]
	var res = getOrSubResourceTD(tier)
	if (!isTDUnlocked(tier)) return
	if (res.lt(dim.cost)) return
		var toBuy = 0
		var increment = 1
		while (player.eternityPoints.gte(timeDimCost(tier, dim.bought + increment - 1))) increment *= 2
		while (increment>=1) {
			if (player.eternityPoints.gte(timeDimCost(tier, dim.bought + toBuy + increment - 1))) toBuy += increment
			increment /= 2
		}
		var num = toBuy
		var newEP = player.eternityPoints
		while (num > 0) {
			var temp = newEP
			var cost = timeDimCost(tier, dim.bought + num - 1)
			if (newEP.lt(cost)) {
				newEP = player.eternityPoints.sub(cost)
				toBuy--
			} else newEP = newEP.sub(cost)
			if (newEP.eq(temp) || num > 9007199254740992) break
			num--
		}
		player.eternityPoints = newEP
		if (isNaN(newEP.e)) player.eternityPoints = new Decimal(0)
	dim.amount = dim.amount.plus(toBuy);
	dim.bought += toBuy
	dim.cost = timeDimCost(tier, dim.bought)
	dim.power = dim.power.times(Decimal.pow(2, toBuy))
	updateEternityUpgrades()
}

function buyTimeDimension(tier) {
	var dim = player["timeDimension"+tier]
	if (!isTDUnlocked(tier)) return false
	if (getOrSubResourceTD(tier).lt(dim.cost)) return false

	getOrSubResourceTD(tier, dim.cost)
	dim.amount = dim.amount.plus(1);
	dim.bought += 1
		dim.power = dim.power.times(2)
		dim.cost = timeDimCost(tier, dim.bought)
		updateEternityUpgrades()
	return true
}

function buyMaxTimeDimensions() {
	for (var i = 1; i <= 8; i++) buyMaxTimeDimension(i)
}