function getDimensionBoostPower() {
  if (player.currentChallenge == "challenge11" || player.currentChallenge == "postc1") return Decimal.fromNumber(1);

  var ret = 2
  if (player.infinityUpgrades.includes("resetMult")) ret = 2.5
  if (player.challenges.includes("postc7")) ret = 4
  if (player.currentChallenge == "postc7" || player.timestudy.studies.includes(81)) ret = 10

  if (player.achievements.includes("r101")) ret = ret*1.01

  ret = E(ret)

  if (player.timestudy.studies.includes(83)) ret = Decimal.pow(1.0004, player.totalTickGained).min(1e30).times(ret);
  if (player.timestudy.studies.includes(231)) ret = Decimal.pow(player.resets, 0.3).times(ret)

  if (metaUnlocked() && !inQC(3)) ret = ret.mul(tmp.meta.effect)

  if (player.achievements.includes("r151")) ret = ret.mul(100)

  return Decimal.fromValue(ret)
}

function softReset(bulk) {
  //if (bulk < 1) bulk = 1 (fixing issue 184)
  if (!player.break && player.money.gt(Number.MAX_VALUE)) return;
  player.resets+=bulk;
  if (bulk >= 750) giveAchievement("Costco sells dimboosts now");
  doDimBoostReset(bulk)
  if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
      player.thirdCost = E(100)
      player.fourthCost = E(500)
      player.fifthCost = E(2500)
      player.sixthCost = E(2e4)
      player.seventhCost = E(2e5)
      player.eightCost = E(4e6)
  }
  if (player.currentChallenge == "postc1") player.costMultipliers = [E(1e3),E(5e3),E(1e4),E(1.2e4),E(1.8e4),E(2.6e4),E(3.2e4),E(4.2e4)];
  if (player.resets == 1 && player.currentChallenge == "") {
      if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
      if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
      if (player.infinityUpgrades.includes("skipResetGalaxy")) {
          player.resets++;
          if (player.galaxies == 0) player.galaxies = 1
      }
  }
if (player.currentChallenge == "postc2") {
      player.eightAmount = E(1);
      player.eightBought = 1;
  }


  if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));





  //updateInterval();
  if (player.eternities < 30) {
      document.getElementById("secondRow").style.display = "none";
      document.getElementById("thirdRow").style.display = "none";
      document.getElementById("tickSpeed").style.visibility = "hidden";
      document.getElementById("tickSpeedMax").style.visibility = "hidden";
      document.getElementById("tickLabel").style.visibility = "hidden";
      document.getElementById("tickSpeedAmount").style.visibility = "hidden";
      document.getElementById("fourthRow").style.display = "none";
      document.getElementById("fifthRow").style.display = "none";
      document.getElementById("sixthRow").style.display = "none";
      document.getElementById("seventhRow").style.display = "none";
      document.getElementById("eightRow").style.display = "none";
  }


  player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce, player.totalTickGained))
  updateTickSpeed()
  if (player.challenges.includes("challenge1")) player.money = E(100).max(player.money)
  if (player.achievements.includes("r37")) player.money = E(1000).max(player.money);
  if (player.achievements.includes("r54")) player.money = E(2e5).max(player.money);
  if (player.achievements.includes("r55")) player.money = E(1e10).max(player.money);
  if (player.achievements.includes("r78")) player.money = E(1e25).max(player.money);

  if (player.resets >= 10) {
      giveAchievement("Boosting to the max");
  }

  updateTemp()
}

function getSupersonicStart() {
  if (inQC(4)) return 0
	let r = 1e5
  if (hasGluonUpg('rg3')) r += gluonUpgEff('rg3',0)
  if (hasTSTier(2,173)) r+=24e4
	return r
}

function getSupersonicMultIncrease() {
  if (inQC(4)) return 20
	let r = 4
  if (hasTSTier(2,173)) r = 1
	return r
}

function getShiftRequirement(bulk) {
  let amount = 20;
  var resetNum = player.resets + bulk
	var maxTier = inNC(4) ? 6 : 8
	tier = Math.min(resetNum + 4, maxTier)

  let mult = 15
  if (player.timestudy.studies.includes(211)) mult -= 5
  if (player.timestudy.studies.includes(222)) mult -= 2

  if (tier == maxTier) amount += Math.max(resetNum + 4 - maxTier, 0) * mult

  var costStart = getSupersonicStart()
  if (inEC(5)) {
    amount += Math.pow(resetNum, 3) + resetNum
  } else if (resetNum >= costStart) {
		var multInc = getSupersonicMultIncrease()
		var increased = Math.ceil((resetNum - costStart + 1) / 4e4)
		var offset = (resetNum - costStart) % 4e4 + 1
		amount += (increased * (increased * 2e4 - 2e4 + offset)) * multInc
		mult += multInc * increased
	}

  if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
  if (player.challenges.includes("postc5")) amount -= 1

  return { tier: tier, amount: amount, mult: mult };
}

/*
function getShiftRequirement(bulk) {
	let amount = 20
	let mult = getDimboostCostIncrease()
	var resetNum = player.resets + bulk
	var maxTier = inNC(4) || player.pSac != undefined ? 6 : 8
	tier = Math.min(resetNum + 4, maxTier)
	if (player.aarexModifications.ngmX > 3 && player.pSac == undefined) amount = 10
	if (tier == maxTier) amount += Math.max(resetNum + (player.galacticSacrifice && player.tickspeedBoosts === undefined && player.galacticSacrifice.upgrades.includes(21) ? 2 : 4) - maxTier, 0) * mult
	var costStart = getSupersonicStart()
	if (inEC(5)) {
		amount += Math.pow(resetNum, 3) + resetNum
	} else if (resetNum >= costStart) {
		var multInc = getSupersonicMultIncrease()
		var increased = Math.ceil((resetNum - costStart + 1) / 4e4)
		var offset = (resetNum - costStart) % 4e4 + 1
		amount += (increased * (increased * 2e4 - 2e4 + offset)) * multInc
		mult += multInc * increased
	}

	if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
	if (player.challenges.includes("postc5")) amount -= 1
	if (player.infinityUpgradesRespecced != undefined) amount -= getInfUpgPow(4)

	return {tier: tier, amount: amount, mult: mult};
}
*/

document.getElementById("softReset").onclick = function () {
  var name = TIER_NAMES[tmp.dimBoostReq.tier]
  if ((!player.break && player.money.gt(Number.MAX_VALUE)) || player[name + "Bought"] < tmp.dimBoostReq.amount) return;
  auto = false;
  if (player.infinityUpgrades.includes("bulkBoost")) maxBuyDimBoosts(true);
  else softReset(1)
  
  for (var tier = 1; tier<9; tier++) {
    var name = TIER_NAMES[tier];
    var mult = tmp.dimBoostPower.pow(player.resets + 1 - tier)
    if (mult > 1) floatText(name + "D", "x" + shortenDimensions(mult))
  }
};