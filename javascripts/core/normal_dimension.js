function getDimensionFinalMultiplier(tier) {
  //if (player.currentEternityChall == "eterc3" && tier > 4) return E(0)
  var name = TIER_NAMES[tier];

  let multiplier = E(player[name + 'Pow']);

  if (player.currentEternityChall == "eterc11") return tmp.inf_eff.max(1).times(tmp.dimBoostPower.pow(player.resets - tier + 1).max(1))
  if (player.currentChallenge == "challenge7") {
      if (tier == 4) multiplier = multiplier.pow(1.4)
      if (tier == 2) multiplier = multiplier.pow(1.7)
  }

  multiplier = multiplier.times(player.achPow);
  multiplier = multiplier.times(kongDimMult)
  multiplier = multiplier.times(kongAllDimMult)

  if (player.currentEternityChall == "eterc9") multiplier = multiplier;
  else multiplier = multiplier.times(tmp.inf_eff.max(1))

  if (player.infinityUpgrades.includes("totalMult")) multiplier = multiplier.times(totalMult)
  if (player.infinityUpgrades.includes("currentMult")) multiplier = multiplier.times(currentMult)
  if (player.infinityUpgrades.includes("infinitiedMult")) multiplier = multiplier.times(infinitiedMult)
  if (player.infinityUpgrades.includes("achievementMult")) multiplier = multiplier.times(achievementMult)
  if (player.infinityUpgrades.includes("challengeMult")) multiplier = multiplier.times(challengeMult)

  if (hasInfinityMult(tier)) multiplier = multiplier.times(dimMults());
  if (tier == 1) {
      if (player.infinityUpgrades.includes("unspentBonus")) multiplier = multiplier.times(unspentBonus);
      if (player.achievements.includes("r28")) multiplier = multiplier.times(1.1);
      if (player.achievements.includes("r31")) multiplier = multiplier.times(1.05);
      if (player.achievements.includes("r71")) multiplier = multiplier.times(3);
      if (player.achievements.includes("r68")) multiplier = multiplier.times(1.5);
  }

  multiplier = multiplier.times(timeMult());
  if (tier == 8 && player.achievements.includes("r23")) multiplier = multiplier.times(1.1);
  else if (player.achievements.includes("r34")) multiplier = multiplier.times(1.02);
  if (tier <= 4 && player.achievements.includes("r43")) multiplier = multiplier.times(1.25);
  if (player.achievements.includes("r48")) multiplier = multiplier.times(1.1);
  if (player.achievements.includes("r72")) multiplier = multiplier.times(1.1); // tbd
  if (player.achievements.includes("r74") && player.currentChallenge != "") multiplier = multiplier.times(1.4);
  if (player.achievements.includes("r77")) multiplier = multiplier.times(1+tier/100);
  if (player.achievements.includes("r56") && player.thisInfinityTime < 1800) multiplier = multiplier.times(3600/(player.thisInfinityTime+1800));
  if (player.achievements.includes("r78") && player.thisInfinityTime < 3) multiplier = multiplier.times(3.3/(player.thisInfinityTime+0.3));
  if (player.achievements.includes("r65") && player.currentChallenge != "" && player.thisInfinityTime < 1800) multiplier = multiplier.times(Math.max(2400/(player.thisInfinityTime+600), 1))
  if (player.achievements.includes("r91") && player.thisInfinityTime < 50) multiplier = multiplier.times(Math.max(301-player.thisInfinityTime*6, 1))
  if (player.achievements.includes("r92") && player.thisInfinityTime < 600) multiplier = multiplier.times(Math.max(101-player.thisInfinityTime/6, 1));
  if (player.achievements.includes("r84")) multiplier = multiplier.times(player.money.pow(0.00004).plus(1));
  else if (player.achievements.includes("r73")) multiplier = multiplier.times(player.money.pow(0.00002).plus(1));


  if (player.timestudy.studies.includes(71) && tier !== 8) multiplier = multiplier.times(calcTotalSacrificeBoost().pow(0.25).min("1e210000"));
  if (player.timestudy.studies.includes(91)) multiplier = multiplier.times(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60));
  if (player.timestudy.studies.includes(101)) multiplier = multiplier.times(Decimal.max(player.replicanti.amount, 1))
  if (player.timestudy.studies.includes(161)) multiplier = multiplier.times(E("1e616"))
  if (player.timestudy.studies.includes(234) && tier == 1) multiplier = multiplier.times(calcTotalSacrificeBoost())

  multiplier = multiplier.times(player.postC3Reward)
  if (player.challenges.includes("postc8") && tier < 8 && tier > 1) multiplier = multiplier.times(mult18);

  if (player.currentChallenge == "postc6") multiplier = multiplier.dividedBy(player.matter.max(1))
  if (player.currentChallenge == "postc8") multiplier = multiplier.times(postc8Mult)

  if (player.currentChallenge == "postc4" && player.postC4Tier != tier) multiplier = multiplier.pow(0.25)
  if (player.challenges.includes("postc4")) multiplier = multiplier.pow(1.05);
  if (player.currentEternityChall == "eterc10") multiplier = multiplier.times(ec10bonus)
  if (player.timestudy.studies.includes(193)) multiplier = multiplier.times(Decimal.pow(1.03, player.eternities).min("1e13000"))
  if (tier == 8 && player.timestudy.studies.includes(214)) multiplier = multiplier.times((calcTotalSacrificeBoost().pow(8)).min("1e46000").times(calcTotalSacrificeBoost().pow(1.1).min(E("1e125000"))))
  if (multiplier.lt(1)) multiplier = E(1)
  
  if (hasTSTier(2,21)) multiplier = multiplier.pow(1.025)
  
  if (player.dilation.active) {
    multiplier = Decimal.pow(10, Math.pow(multiplier.log10(), 0.75))
    if (player.dilation.upgrades.includes(11)) {
      multiplier = Decimal.pow(10, Math.pow(multiplier.log10(), 1.05))
    }
  }

  if (player.dilation.upgrades.includes(7)) multiplier = multiplier.times(player.dilation.dilatedTime.pow(308))
  return multiplier;
}


function getMoneyPerSecond() {
  return tmp.finalNDmult[0]*Math.floor(player.firstAmount)/player.tickspeed;
}

function getDimensionDescription(tier) {
  var name = TIER_NAMES[tier];

  let description = shortenDimensions(player[name + 'Amount']) + ' (' + dimBought(tier) + ')';
  if (tier == 8) description = Math.round(player[name + 'Amount']) + ' (' + dimBought(tier) + ')';

  if (tier < 8) {
      description += '  (+' + formatValue(player.options.notation, getDimensionRateOfChange(tier), 2, 2) + '%/s)';
  }

  return description;
}

function getDimensionRateOfChange(tier) {
  if (tier == 8 || (player.currentEternityChall == "eterc3" && tier > 3)) {
      return 0;
  }

  let toGain = getDimensionProductionPerSecond(tier + 1)
  if (tier == 7 && player.currentEternityChall == "eterc7") toGain = DimensionProduction(1).times(10)

  var name = TIER_NAMES[tier];
  if (player.currentChallenge == "challenge7") {
      if (tier == 7) return 0
      else toGain = getDimensionProductionPerSecond(tier + 2);
  }
  var current = player[name + 'Amount'].max(1);
  var change  = toGain.times(10).dividedBy(current);

  return change;
}

function hasInfinityMult(tier) {
    switch (tier) {
        case 1: case 8: return player.infinityUpgrades.includes("18Mult");
        case 2: case 7: return player.infinityUpgrades.includes("27Mult");
        case 3: case 6: return player.infinityUpgrades.includes("36Mult");
        case 4: case 5: return player.infinityUpgrades.includes("45Mult");
    }
}



    function multiplySameCosts(cost) {
        var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
        var tierCosts = [ null, E(1e3), E(1e4), E(1e5), E(1e6), E(1e8), E(1e10), E(1e12), E(1e15) ];
    
        for (let i = 1; i <= 8; ++i) {
            if (player[tiers[i] + "Cost"].e == cost.e) player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(tierCosts[i])
    
        }
        if (player.tickSpeedCost.e == cost.e) player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
        }
    
    
    function multiplyPC5Costs(cost, tier) {
        var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    
        if (tier < 5) {
            for (var i = 1; i<9; i++) {
                if (player[tiers[i] + "Cost"].e <= cost.e) {
                    player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(player.costMultipliers[i-1])
                    if (player[tiers[i] + "Cost"].gte(Number.MAX_VALUE)) player.costMultipliers[i-1] = player.costMultipliers[i-1].times(10)
                }
            }
        } else {
            for (var i = 1; i<9; i++) {
                if (player[tiers[i] + "Cost"].e >= cost.e) {
                    player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(player.costMultipliers[i-1])
                   if (player[tiers[i] + "Cost"].gte(Number.MAX_VALUE)) player.costMultipliers[i-1] = player.costMultipliers[i-1].times(10)
                }
            }
        }
    }
    
    
    function canBuyDimension(tier) {
        if (tier == 9 ) {
            if (player.secondAmount.equals(0)) return false
            else return true
        }
    
        if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
        if (tier > player.resets + 4) return false;
        if (tier > 1 && player[TIER_NAMES[tier - 1] + 'Amount'] == 0 && player.eternities < 30) return false;
        if ((player.currentChallenge == "challenge4" || player.currentChallenge == "postc1") && tier >= 7) return false
    
        return true;
    }
    
    function getDimensionPowerMultiplier() {
        let dimMult = 2;
    
    
        if (player.currentChallenge == "challenge9" || player.currentChallenge == "postc1") dimMult = Math.pow(10/0.30,Math.random())*0.30
    
        if (player.infinityUpgrades.includes('dimMult')) dimMult *= 1.1;
        if (player.achievements.includes("r58")) dimMult *= 1.01;

        dimMult += ECTimesCompleted("eterc3") * 0.8

        return dimMult;
    }
    
    
    function clearDimensions(amount) {
        var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    
        for (i = 1; i <= amount; i++) {
            player[tiers[i] + "Amount"] = E(0)
        }
    }
    
    
    function getDimensionCostMultiplier(tier) {
    
        var multiplier2 = [E(1e3),E(5e3),E(1e4),E(1.2e4),E(1.8e4),E(2.6e4),E(3.2e4),E(4.2e4)];
        if (player.currentChallenge == "challenge10") return multiplier2[tier - 1];
        else return player.costMultipliers[tier - 1];
    }
    
    function onBuyDimension(tier) {
        if (!player.break) {
            switch (tier) {
                case 1: giveAchievement("You gotta start somewhere"); break;
                case 2: giveAchievement("100 antimatter is a lot"); break;
                case 3: giveAchievement("Half life 3 confirmed"); break;
                case 4: giveAchievement("L4D: Left 4 Dimensions"); break;
                case 5: giveAchievement("5 Dimension Antimatter Punch"); break;
                case 6: giveAchievement("We couldn't afford 9"); break;
                case 7: giveAchievement("Not a luck related achievement"); break;
                case 8: giveAchievement("90 degrees to infinity"); break;
            }
        }
    
        if (player.eightAmount.round().eq(99)) {
            giveAchievement("The 9th Dimension is a lie");
        }
    
        player.postC4Tier = tier;
        postc8Mult = E(1)
        if (tier != 8) player.dimlife = false
        if (tier != 1) player.dead = false
    
    
    }
    
    function dimBought(tier) {
        return player[TIER_NAMES[tier]+"Bought"] % 10;
    }
    
    function buyOneDimension(tier) {
        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'];
        auto = false;
    
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
            if (!canBuyDimension(tier)) {
                return false;
            }
        } else {
            if (tier >= 3) {
                if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
            }
            else if (!canBuyDimension(tier)) {
                return false;
            } else if (tier < 3 && !canAfford(cost)){
                return false;
            }
        }
    
    
    
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
            if (!canAfford(cost)) {
                return false;
            }
        }
    
    
        if ((player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") || tier < 3) {
            player.money = player.money.minus(cost);
        } else {
            player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
        }
    
        player[name + 'Amount'] = player[name + 'Amount'].plus(1);
        player[name + 'Bought']++;
    
        if (dimBought(tier) === 0) {
            player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
            if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + 'Cost'] = player[name + 'Cost'].times(getDimensionCostMultiplier(tier));
            else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
            else multiplySameCosts(cost);
            if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
            floatText(name+"D", "x" + shortenMoney(getDimensionPowerMultiplier(tier)))
        }
    
        if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0;
        if (player.currentChallenge == "challenge8" || player.currentChallenge == "postc1") clearDimensions(tier-1);
    
        onBuyDimension(tier);
    
    
        return true;
    }

    function getOrSubResource(tier, sub) {
        if (sub == undefined) {
            if (tier > 2 && (inNC(10) || player.currentChallenge == "postc1")) return player[TIER_NAMES[tier-2] + "Amount"]
            return player.money
        } else {
            if (tier > 2 && (inNC(10) || player.currentChallenge == "postc1")) {
                if (sub.gt(player[TIER_NAMES[tier - 2] + "Amount"])) player[TIER_NAMES[tier - 2] + "Amount"] = new Decimal(0)
                else player[TIER_NAMES[tier - 2] + "Amount"] = player[TIER_NAMES[tier - 2] + "Amount"].sub(sub)
            } else if (sub.gt(player.money)) player.money = new Decimal(0)
            else player.money = player.money.sub(sub)
        }
    }

    function buyManyDimension(tier, quick) {
        if (!canBuyDimension(tier)) return false
        let name = TIER_NAMES[tier]
        let toBuy = 10 - dimBought(tier)
        let cost = player[name + 'Cost'].times(toBuy)
        let resource = getOrSubResource(tier)
        if (!cost.lte(resource)) return false
        getOrSubResource(tier, cost)
        player[name + "Amount"] = player[name + "Amount"].add(toBuy)
        recordBought(name, toBuy)
        if (player.currentChallenge == "postc5" && player.tickspeedBoosts == undefined) multiplyPC5Costs(player[name + 'Cost'], tier)
        else if (inNC(5) && player.tickspeedBoosts == undefined) multiplySameCosts(player[name + 'Cost'])
        else player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
        if (costIncreaseActive(player[name + "Cost"])) player.costMultipliers[tier - 1] = player.costMultipliers[tier - 1].times(getDimensionCostMultiplierIncrease())
        if (!quick) {
            floatText(name+"D", "x" + shortenMoney(getDimensionPowerMultiplier()))
            onBuyDimension(tier)
        }
        return true
    }

    function recordBought (name, num) {
        player[name + 'Bought'] += num;
    }

    function costIncreaseActive(cost) {
        if (inNC(10) || player.currentChallenge == "postc1") return false
        return cost.gte(Number.MAX_VALUE)
    }

    function getDimensionCostMultiplierIncrease() {
        let ret = player.dimensionMultDecrease;
        return ret;
    }
    
    /*
    function buyManyDimension(tier) {
        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'].times(10 - dimBought(tier));
    
        auto = false;
    
        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = E(1);
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
            if (!canBuyDimension(tier)) {
                return false;
            }
        } else {
            if (tier >= 3) {
                if (!canBuyDimension(tier)) return false
                if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
            }
            else if (!canBuyDimension(tier)) {
                return false;
            } else if (tier < 3 && !canAfford(cost)){
                return false;
            }
        }
    
    
    
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
            if (!canAfford(cost)) {
                return false;
            }
        }
    
        if ((player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") || tier < 3) {
            player.money = player.money.minus(cost);
        } else {
            player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
        }
    
        player[name + 'Amount'] = player[name + 'Amount'].plus(10 - dimBought(tier));
        player[name + 'Bought'] = player[name + 'Bought'] + (10 - dimBought(tier));
        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5" ) player[name + 'Cost'] = player[name + 'Cost'].times((getDimensionCostMultiplier(tier)));
        else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
        else multiplySameCosts(player[name + 'Cost']);
        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
        if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0;
        if (player.currentChallenge == "challenge8" || player.currentChallenge == "postc1") clearDimensions(tier-1);
        floatText(name+"D", "x" + shortenMoney(getDimensionPowerMultiplier(tier)))
        onBuyDimension(tier);
    
        return true;
    }
    */
    
    
    const initCost = [null, E(10), E(1e2), E(1e4), E(1e6), E(1e9), E(1e12), E(1e18), E(1e24)]
    const costMults = [null, E(1e3), E(1e4), E(1e5), E(1e6), E(1e8), E(1e10), E(1e12), E(1e15)]
    function buyBulkDimension(tier, bulk, auto) {
        if (!canBuyDimension(tier)) return
        let bought = 0
        if (dimBought(tier) > 0) {
            if (!buyManyDimension(tier, true)) return
            bought++
        }
        let name = TIER_NAMES[tier]
        let cost = player[name + 'Cost'].times(10)
        let resource = getOrSubResource(tier)
        if (!cost.lte(resource)) return
        if (((!inNC(5) && player.currentChallenge != "postc5") || player.tickspeedBoosts != undefined) && !inNC(9) && !costIncreaseActive(player[name + "Cost"])) {
            let mult = getDimensionCostMultiplier(tier)
            let max = Number.POSITIVE_INFINITY
            if (!inNC(10) && player.currentChallenge != "postc1" && player.infinityUpgradesRespecced == undefined) max = Math.ceil(Decimal.div(Number.MAX_VALUE, cost).log(mult) + 1)
            var toBuy = Math.min(Math.min(Math.floor(resource.div(cost).times(mult-1).add(1).log(mult)), bulk-bought), max)
            getOrSubResource(tier, Decimal.pow(mult, toBuy).sub(1).div(mult-1).times(cost))
            player[name + "Amount"] = player[name + "Amount"].add(toBuy * 10)
            recordBought(name, toBuy*10)
            player[name + "Cost"] = player[name + "Cost"].times(Decimal.pow(mult, toBuy))
            if (costIncreaseActive(player[name + "Cost"])) player.costMultipliers[tier - 1] = player.costMultipliers[tier - 1].times(getDimensionCostMultiplierIncrease())
            bought += toBuy
        }
        let stopped = !costIncreaseActive(player[name + "Cost"])
        let failsafe = 0
        while (!canQuickBuyDim(tier)) {
            stopped = true
            if (!buyManyDimension(tier, true)) break
            bought++
            if (bought == bulk) break
            failsafe++
            if (failsafe > 149) break
            stopped = false
        }
        while (!stopped) {
            stopped = true
            let mi = getDimensionCostMultiplierIncrease()
            let a = Math.log10(mi)/2
            let b = player.costMultipliers[tier-1].log10() - a
            let c = player[name + "Cost"].times(10).log10() - player.money.log10()
            let d = b * b - 4 * a * c
            if (d < 0) break
            let toBuy = Math.min(Math.floor(( -b + Math.sqrt(d)) / (2 * a)) + 1, bulk - bought)
            if (toBuy < 1) break
            let newCost = player[name + "Cost"].times(Decimal.pow(player.costMultipliers[tier - 1], toBuy - 1).times(Decimal.pow(mi, (toBuy - 1) * (toBuy - 2) / 2)))
            let newMult = player.costMultipliers[tier - 1].times(Decimal.pow(mi, toBuy - 1))
            if (player.money.gte(newCost)) player.money = player.money.sub(newCost)
            else if (player.dimensionMultDecrease > 3) player.money = new Decimal(0)
            player[name + "Amount"] = player[name + "Amount"].add(toBuy * 10)
            recordBought(name, toBuy * 10)
            player[name + "Cost"] = newCost.times(newMult)
            player.costMultipliers[tier - 1] = newMult.times(mi)
            bought += toBuy
        }
        if (!auto) floatText(name+"D", "x" + shortenMoney(Decimal.pow(getDimensionPowerMultiplier(), bought)))
        onBuyDimension(tier)
    }
    
    function canQuickBuyDim(tier) {
        if (((inNC(5) || player.currentChallenge == "postc5") && player.tickspeedBoosts == undefined) || inNC(9)) return false
        return player.dimensionMultDecrease <= 3 || player.costMultipliers[tier-1].gt(Number.MAX_SAFE_INTEGER)
    }

function canAfford(cost) {
    return ((cost.lt(E("1.79e308")) && !player.break) || player.break) && cost.lte(player.money);
}


document.getElementById("first").onclick = function () {
    if (buyOneDimension(1)) {
        // This achievement is granted only if the buy one button is pressed.
        if (player.firstAmount >= 1e150) {
            giveAchievement("There's no point in doing that");
        }
        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") && player.matter.equals(0)) player.matter = E(1);
    }
    if (player.firstAmount.lt(1)) {
        player.money = E("0")
        player.firstAmount = player.firstAmount.plus(1);
        player.firstBought += 1;
        giveAchievement("You gotta start somewhere");
    }
};

document.getElementById("second").onclick = function () {
    buyOneDimension(2);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = E(1);
};

document.getElementById("third").onclick = function () {
    buyOneDimension(3);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0))player.matter = E(1);
};

document.getElementById("fourth").onclick = function () {
    buyOneDimension(4);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = E(1);
};

document.getElementById("fifth").onclick = function () {
    buyOneDimension(5);
};

document.getElementById("sixth").onclick = function () {
    buyOneDimension(6);
};

document.getElementById("seventh").onclick = function () {
    buyOneDimension(7);
};

document.getElementById("eight").onclick = function () {
    buyOneDimension(8);
};

document.getElementById("firstMax").onclick = function () {
    buyManyDimension(1);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") && player.matter.equals(0)) player.matter = E(1);
};

document.getElementById("secondMax").onclick = function () {
    buyManyDimension(2);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") && player.matter.equals(0)) player.matter = E(1);
};

document.getElementById("thirdMax").onclick = function () {
    buyManyDimension(3);
};

document.getElementById("fourthMax").onclick = function () {
    buyManyDimension(4);
};

document.getElementById("fifthMax").onclick = function () {
    buyManyDimension(5);
};

document.getElementById("sixthMax").onclick = function () {
    buyManyDimension(6);
};

document.getElementById("seventhMax").onclick = function () {
    buyManyDimension(7);
};

document.getElementById("eightMax").onclick = function () {
    buyManyDimension(8);
};

function getAmount(tier) {
	let ret = player[TIER_NAMES[tier] + "Amount"].toNumber()
	if (!break_infinity_js) ret = Math.round(ret)
	return ret
}

function timeMult() {
    var mult = E(1)
    if (player.infinityUpgrades.includes("timeMult")) mult = mult.times(Math.pow(player.totalTimePlayed / 1200, 0.15));
    if (player.infinityUpgrades.includes("timeMult2")) mult = mult.times(Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1));
    if (player.achievements.includes("r76")) mult = mult.times(Math.pow(player.totalTimePlayed / (600*60*48), 0.05));
    return mult;
}

function dimMults() {
    if (player.timestudy.studies.includes(31)) return Decimal.pow(1 + (getInfinitied() * 0.2), 4)
    else return E(1 + (getInfinitied() * 0.2))
}

function getDimensionProductionPerSecond(tier) {
    let ret = Decimal.floor(player[TIER_NAMES[tier] + 'Amount']).times(getDimensionFinalMultiplier(tier)).times(1000).dividedBy(player.tickspeed)
    if (player.currentChallenge == "challenge7") {
        if (tier == 4) ret = player[TIER_NAMES[tier] + 'Amount'].floor().pow(1.3).times(getDimensionFinalMultiplier(tier)).dividedBy(player.tickspeed.dividedBy(1000))
        else if (tier == 2) ret = player[TIER_NAMES[tier] + 'Amount'].floor().pow(1.5).times(getDimensionFinalMultiplier(tier)).dividedBy(player.tickspeed.dividedBy(1000))
    }
    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") ret = ret.times(player.chall2Pow)
    if (player.dilation.active) {
        let tick = E(player.tickspeed)
        tick = Decimal.pow(10, Math.pow(Math.abs(tick.log10()), 0.75))
        if (player.dilation.upgrades.includes(11)) {
            tick = Decimal.pow(10, Math.pow(Math.abs(tick.log10()), 1.05))
          }
        tick = E(1).dividedBy(tick)
        ret = Decimal.floor(player[TIER_NAMES[tier] + 'Amount']).times(getDimensionFinalMultiplier(tier)).times(1000).dividedBy(tick)
    }
    return ret;
}