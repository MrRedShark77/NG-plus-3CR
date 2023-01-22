function canBuyTickSpeed() {
  if (player.currentEternityChall == "eterc9") return false
  return canBuyDimension(3);
}

function getTickSpeedMultiplier() {
  if (player.currentChallenge == "postc3") return 1;
  if (player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies < 3) {
      let baseMultiplier = 0.9;
      if (player.galaxies == 0) baseMultiplier = 0.89
      if (player.currentChallenge == "challenge6" || player.currentChallenge == "postc1") baseMultiplier = 0.93;
      let perGalaxy = 0.02;
      let galaxies = player.galaxies+player.replicanti.galaxies+player.dilation.freeGalaxies
      if (player.timestudy.studies.includes(133)) galaxies += player.replicanti.galaxies/2
      if (player.timestudy.studies.includes(132)) galaxies += player.replicanti.galaxies*0.4
      if (player.timestudy.studies.includes(225)) galaxies += Math.floor(player.replicanti.amount.e / 1000)
      if (player.timestudy.studies.includes(226)) galaxies += Math.floor(player.replicanti.gal / 15)
      galaxies += Math.min(player.replicanti.galaxies, player.replicanti.gal) * Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0)
      if (player.infinityUpgrades.includes("galaxyBoost")) perGalaxy *= 2;
      if (player.infinityUpgrades.includes("postGalaxy")) perGalaxy *= 1.5;
      if (player.challenges.includes("postc5")) perGalaxy *= 1.1;
      if (player.achievements.includes("r86")) perGalaxy *= 1.01;
      if (player.timestudy.studies.includes(212)) perGalaxy *= Math.min(Math.pow(player.timeShards.max(2).log2(), 0.005), 1.1)

      return baseMultiplier-(player.galaxies*perGalaxy);
  } else {
      let baseMultiplier = 0.8
      if (player.currentChallenge == "challenge6" || player.currentChallenge == "postc1") baseMultiplier = 0.83
      let perGalaxy = 0.965
      let galaxies = player.galaxies-2+player.replicanti.galaxies+player.dilation.freeGalaxies
      if (player.timestudy.studies.includes(133)) galaxies += player.replicanti.galaxies/2
      if (player.timestudy.studies.includes(132)) galaxies += player.replicanti.galaxies*0.4
      if (player.timestudy.studies.includes(225)) galaxies += Math.floor(player.replicanti.amount.e / 1000)
      if (player.timestudy.studies.includes(226)) galaxies += Math.floor(player.replicanti.gal / 15)
      galaxies +=  Math.min(player.replicanti.galaxies, player.replicanti.gal) * Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0)
      if (player.infinityUpgrades.includes("galaxyBoost")) galaxies *= 2;
      if (player.infinityUpgrades.includes("postGalaxy")) galaxies *= 1.5;
      if (player.challenges.includes("postc5")) galaxies *= 1.1;
      if (player.achievements.includes("r86")) galaxies *= 1.01
      if (player.timestudy.studies.includes(212)) galaxies *= Math.min(Math.pow(player.timeShards.max(2).log2(), 0.005), 1.1)
      if (player.timestudy.studies.includes(232)) galaxies *= Math.pow(1+player.galaxies/1000, 0.2)

	  if (hasTSTier(2,31)) galaxies *= TSTierEffect(2,31)

      return baseMultiplier * (Math.pow(perGalaxy, (galaxies-2)))
  }
}

function buyTickSpeed() {
	if (!canBuyTickSpeed()) return false
	if (player.tickSpeedCost.gt(player.money)) return false
	player.money = player.money.minus(player.tickSpeedCost)
	if (!inNC(5) && player.currentChallenge != "postc5") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
	else multiplySameCosts(player.tickSpeedCost)
	if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
	if (inNC(2) || player.currentChallenge == "postc1") player.chall2Pow = 0
	player.tickspeed = player.tickspeed.times(tmp.tsReduce)
	if (player.challenges.includes("postc3") || player.currentChallenge == "postc3" || isIC3Trapped()) player.postC3Reward = player.postC3Reward.times(getPostC3Mult())
	player.postC8Mult = new Decimal(1)
	player.why = player.why + 1
	tmp.tickUpdate = true
	return true
}

document.getElementById("tickSpeed").onclick = function () {
  buyTickSpeed();

  updateTickSpeed();
};

function getTickSpeedCostMultiplierIncrease() {
	let ret = player.tickSpeedMultDecrease;
	let exp = .9 - .02 * ECTimesCompleted("eterc11")
	if (player.currentChallenge === 'postcngmm_2') ret = Math.pow(ret, .5)
	else if (player.challenges.includes('postcngmm_2')) {
		var galeff = (1 + Math.pow(player.galaxies, 0.7) / 10)
		if (player.aarexModifications.ngmX >= 4) galeff = Math.pow(galeff, .2)
		ret = Math.pow(ret, exp / galeff)
	}
	return ret
}

function getPostC3Mult() {
	let base = getPostC3Base()
	let exp = getPostC3Exp()
	if (exp > 1) return Decimal.pow(base,exp)
	return base
}

function getPostC3Base() {
	let perGalaxy = 0.005;
	return player.galaxies * perGalaxy + 1.05
}

function getPostC3Exp() {
	let x = 1
	return x
}

function buyMaxPostInfTickSpeed(mult) {
	var mi = getTickSpeedCostMultiplierIncrease()
	var a = Math.log10(Math.sqrt(mi))
	var b = player.tickspeedMultiplier.dividedBy(Math.sqrt(mi)).log10()
	var c = player.tickSpeedCost.dividedBy(player.money).log10()
	var discriminant = Math.pow(b, 2) - (c * a * 4)
	if (discriminant < 0) return false
	var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
	if (buying <= 0) return false
	if (inNC(2) || player.currentChallenge == "postc1") player.chall2Pow = 0
	if (player.currentEternityChall == "eterc10") {
		player.tickspeed = player.tickspeed.times(Decimal.pow(mult, buying));
		if (player.challenges.includes("postc3") || player.currentChallenge == "postc3") player.postC3Reward = player.postC3Reward.times(Decimal.pow(getPostC3Mult(), buying))
	}
	player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier.pow(buying-1)).times(Decimal.pow(mi, (buying-1)*(buying-2)/2))
	player.tickspeedMultiplier = player.tickspeedMultiplier.times(Decimal.pow(mi, buying-1))
  player.tickspeed = player.tickspeed.mul(Decimal.pow(mult,buying))
	if (player.money.gte(player.tickSpeedCost)) player.money = player.money.minus(player.tickSpeedCost)
	else if (player.tickSpeedMultDecrease > 2) player.money = new Decimal(0)
	player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
	player.tickspeedMultiplier = player.tickspeedMultiplier.times(mi)
	player.postC8Mult = new Decimal(1)
}

function cannotUsePostInfTickSpeed() {
	return ((inNC(5) || player.currentChallenge == "postc5")) || !costIncreaseActive(player.tickSpeedCost) || (player.tickSpeedMultDecrease > 2 && player.tickspeedMultiplier.lt(Number.MAX_SAFE_INTEGER));
}

function buyMaxTickSpeed() {
	if (inNC(14)) return false
	if (!canBuyTickSpeed()) return false
	if (player.tickSpeedCost.gt(player.money)) return false
	let cost = player.tickSpeedCost
	if ((!inNC(5) && player.currentChallenge != "postc5") && !inNC(9) && !costIncreaseActive(player.tickSpeedCost)) {
		let max = Number.POSITIVE_INFINITY
		if (!inNC(10) && player.currentChallenge != "postc1" && player.infinityUpgradesRespecced == undefined) max = Math.ceil(Decimal.div(Number.MAX_VALUE, cost).log(10))
		var toBuy = Math.min(Math.floor(player.money.div(cost).times(9).add(1).log(10)), max)
		getOrSubResource(1, Decimal.pow(10, toBuy).sub(1).div(9).times(cost))
		if (player.currentEternityChall == "eterc10") {
			player.tickspeed = Decimal.pow(tmp.tsReduce, toBuy).times(player.tickspeed)
			if (player.challenges.includes("postc3") || player.currentChallenge == "postc3") player.postC3Reward = player.postC3Reward.times(Decimal.pow(getPostC3Mult(), toBuy))
		}
		player.tickSpeedCost = player.tickSpeedCost.times(Decimal.pow(10, toBuy))
		player.postC8Mult = new Decimal(1)
		if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
	}
	var mult = tmp.tsReduce
	if (inNC(2) || player.currentChallenge == "postc1" || player.pSac !== undefined) player.chall2Pow = 0
	if (cannotUsePostInfTickSpeed()) {
		while (player.money.gt(player.tickSpeedCost) && (player.tickSpeedCost.lt(Number.MAX_VALUE) || player.tickSpeedMultDecrease > 2 || (player.currentChallenge == "postc5"))) {
			player.money = player.money.minus(player.tickSpeedCost);
			if (!inNC(5) && player.currentChallenge != "postc5") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
			else multiplySameCosts(player.tickSpeedCost)
			if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
			if (player.currentEternityChall == "eterc10") {
				player.tickspeed = player.tickspeed.times(mult);
				if (player.challenges.includes("postc3") || player.currentChallenge == "postc3") player.postC3Reward = player.postC3Reward.times(getPostC3Mult())
			}
			player.postC8Mult = new Decimal(1)
			if (!cannotUsePostInfTickSpeed()) buyMaxPostInfTickSpeed(mult);
		}
	} else {
		buyMaxPostInfTickSpeed(mult);
	}

	tmp.tickUpdate = true
}



function updateTickSpeed() {
  var exp = player.tickspeed.e;
  if (exp > 1) document.getElementById("tickSpeedAmount").textContent = 'Tickspeed: ' + player.tickspeed.toFixed(0);
  else {
      document.getElementById("tickSpeedAmount").textContent = 'Tickspeed: ' + player.tickspeed.times(E(100).dividedBy(Decimal.pow(10, exp))).toFixed(0) + ' / ' + shorten(E(100).dividedBy(Decimal.pow(10, exp)));
  }
}