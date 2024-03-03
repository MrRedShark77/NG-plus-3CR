//infinity dimensions


function DimensionDescription(tier) {
  var name = TIER_NAMES[tier];

  let description = shortenDimensions(player['infinityDimension'+tier].amount) + ' (' + getFullExpansion(Math.round(player['infinityDimension'+tier].baseAmount/10)) + ')';

  if (ECTimesCompleted("eterc7")) {
    if (tier < 9) {
        description += '  (+' + formatValue(player.options.notation, DimensionRateOfChange(tier), 2, 2) + '%/s)';
    }
  } else {
    if (tier < 8) {
        description += '  (+' + formatValue(player.options.notation, DimensionRateOfChange(tier), 2, 2) + '%/s)';
    }
  }

  return description;
}


function DimensionRateOfChange(tier) {
  if (inEC(13)) return E(0)
  if (tier === 8) var toGain = getTimeDimensionProduction(1).pow(ECTimesCompleted("eterc7")*0.2).minus(1).max(0)
  else var toGain = DimensionProduction(tier+1)
  var current = Decimal.max(player["infinityDimension"+tier].amount, 1);
  var change  = toGain.times(10).dividedBy(current);
  return change;
}


function updateInfinityDimensions() {
  if (document.getElementById("infinitydimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {
    for (let tier = 1; tier <= 8; ++tier) {
        document.getElementById("infD"+tier).textContent = DISPLAY_NAMES[tier] + " Infinity Dimension x" + shortenMoney(DimensionPower(tier));
        document.getElementById("infAmount"+tier).innerHTML = DimensionDescription(tier);
        var name = TIER_NAMES[tier];
        if (!player.infDimensionsUnlocked[tier-1]) {
            break;
        }

        document.getElementById("infRow"+tier).style.display = "table-row";
        document.getElementById("infRow"+tier).style.visibility = "visible";
    }
  }

  el('infDimCap').textContent = getFullExpansion(tmp.inf_bought_cap)
}

function DimensionProduction(tier) {
  if (inEC(10)) return E(0)
  var dim = player["infinityDimension"+tier]
  var ret = dim.amount
  if (inEC(11)) return ret
  if (inEC(7)) ret = ret.dividedBy(player.tickspeed.dividedBy(1000))
  if (player.challenges.includes("postc6") && !inQC(3)) {
    return ret.times(DimensionPower(tier)).times(dilates(Decimal.div(1000,player.tickspeed),"tick").pow(0.0005))
  }
  else return ret.times(DimensionPower(tier))
}

function DimensionPower(tier) {
  var dim = player["infinityDimension"+tier]
  if (inEC(11)) return E(1)
  if (inEC(2) || inEC(14) || inQC(8)) return E(0)
  if (inQC(3)) return tmp.meta.effect
  var mult = dim.power

  mult = mult.times(infDimPow)

  mult = mult.times(kongAllDimMult)
  if (player.achievements.includes("r94") && tier == 1) mult = mult.times(2);
  if (player.achievements.includes("r75")) mult = mult.times(player.achPow);
  if (player.replicanti.unl) mult = mult.times(tmp.repEff)

  if (player.timestudy.studies.includes(72) && tier == 4) {
      mult = mult.times(tmp.sacPow.pow(0.04).max(1).min("1e30000"))
  }

  if (player.timestudy.studies.includes(82)) {
      mult = mult.times(Decimal.pow(1.0000109,Math.pow(player.resets,2)))
  }

  if (player.eternityUpgrades.includes(1)) {
      mult = mult.times(player.eternityPoints.plus(1))
  }

  if (player.eternityUpgrades.includes(2)) mult = mult.times(Decimal.pow(Math.min(player.eternities, 100000)/200 + 1, Math.log(Math.min(player.eternities, 100000)*2+1)/Math.log(4)).times(E((player.eternities-100000)/200 + 1).times(Math.log((player.eternities- 100000)*2+1)/Math.log(4)).max(1)))

  if (player.eternityUpgrades.includes(3)) mult = mult.times(Decimal.pow(2,300/Math.max(infchallengeTimes, player.achievements.includes("r112") ? 6.1 : 7.5)))

  if (player.timestudy.studies.includes(92)) mult = mult.times(Decimal.pow(2, 600/Math.max(player.bestEternity, 20)))
  if (player.timestudy.studies.includes(162)) mult = mult.times(1e11)
  if (ECTimesCompleted("eterc2") !== 0 && tier == 1) mult = mult.times(player.infinityPower.pow(1.5/(700-ECTimesCompleted("eterc2")*100)).min(E("1e100")).plus(1))

  if (ECTimesCompleted("eterc4") !== 0) mult = mult.times(player.infinityPoints.pow(0.003 + ECTimesCompleted("eterc4")*0.002).min(E("1e200")))

  if (ECTimesCompleted("eterc9") !== 0) mult = mult.times(player.timeShards.pow(ECTimesCompleted("eterc9")*0.1).plus(1).min(E("1e400")))

  

  if (mult.lt(1)) mult = E(1)

  if (hasTSTier(2,22)) mult = mult.pow(1.025)

  mult = dilates(mult)

  return mult
}




function resetInfDimensions() {

  if (player.infDimensionsUnlocked[0]) {
      player.infinityPower = E(0)
  }
  if (player.infDimensionsUnlocked[7] && player.infinityDimension6.amount != 0 && ECTimesCompleted("eterc7") > 0){
      player.infinityDimension8.amount = E(player.infinityDimension8.baseAmount)
      player.infinityDimension7.amount = E(player.infinityDimension7.baseAmount)
      player.infinityDimension6.amount = E(player.infinityDimension6.baseAmount)
      player.infinityDimension5.amount = E(player.infinityDimension5.baseAmount)
      player.infinityDimension4.amount = E(player.infinityDimension4.baseAmount)
      player.infinityDimension3.amount = E(player.infinityDimension3.baseAmount)
      player.infinityDimension2.amount = E(player.infinityDimension2.baseAmount)
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }
  if (player.infDimensionsUnlocked[7] && player.infinityDimension6.amount != 0){
      player.infinityDimension7.amount = E(player.infinityDimension7.baseAmount)
      player.infinityDimension6.amount = E(player.infinityDimension6.baseAmount)
      player.infinityDimension5.amount = E(player.infinityDimension5.baseAmount)
      player.infinityDimension4.amount = E(player.infinityDimension4.baseAmount)
      player.infinityDimension3.amount = E(player.infinityDimension3.baseAmount)
      player.infinityDimension2.amount = E(player.infinityDimension2.baseAmount)
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }
  if (player.infDimensionsUnlocked[6] && player.infinityDimension6.amount != 0){
      player.infinityDimension6.amount = E(player.infinityDimension6.baseAmount)
      player.infinityDimension5.amount = E(player.infinityDimension5.baseAmount)
      player.infinityDimension4.amount = E(player.infinityDimension4.baseAmount)
      player.infinityDimension3.amount = E(player.infinityDimension3.baseAmount)
      player.infinityDimension2.amount = E(player.infinityDimension2.baseAmount)
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }
  if (player.infDimensionsUnlocked[5] && player.infinityDimension6.amount != 0){
      player.infinityDimension5.amount = E(player.infinityDimension5.baseAmount)
      player.infinityDimension4.amount = E(player.infinityDimension4.baseAmount)
      player.infinityDimension3.amount = E(player.infinityDimension3.baseAmount)
      player.infinityDimension2.amount = E(player.infinityDimension2.baseAmount)
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }
  if (player.infDimensionsUnlocked[4] && player.infinityDimension5.amount != 0){
      player.infinityDimension4.amount = E(player.infinityDimension4.baseAmount)
      player.infinityDimension3.amount = E(player.infinityDimension3.baseAmount)
      player.infinityDimension2.amount = E(player.infinityDimension2.baseAmount)
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }
  if (player.infDimensionsUnlocked[3] && player.infinityDimension4.amount != 0){
      player.infinityDimension3.amount = E(player.infinityDimension3.baseAmount)
      player.infinityDimension2.amount = E(player.infinityDimension2.baseAmount)
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }
  else if (player.infDimensionsUnlocked[2] && player.infinityDimension3.amount != 0){
      player.infinityDimension2.amount = E(player.infinityDimension2.baseAmount)
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }
  else if (player.infDimensionsUnlocked[1] && player.infinityDimension2.amount != 0){
      player.infinityDimension1.amount = E(player.infinityDimension1.baseAmount)
  }

}

var infCostMults = [null, 1e3, 1e6, 1e8, 1e10, 1e15, 1e20, 1e25, 1e30]
var infPowerMults = [null, 50, 30, 10, 5, 5, 5, 5, 5]

function getIDPowerMult(i) {
  let x = infPowerMults[i]

  return x
}

function buyManyInfinityDimension(tier) {
  if (player.eterc8ids <= 0 && inEC(8)) return false
  var dim = player["infinityDimension"+tier]
  if (dim.baseAmount >= tmp.inf_bought_cap*10 && tier < 8) return false
  if (player.infinityPoints.lt(dim.cost)) return false
  if (!player.infDimensionsUnlocked[tier-1]) return false
  if (player.eterc8ids == 0) return false
  player.infinityPoints = player.infinityPoints.minus(dim.cost)
  dim.amount = dim.amount.plus(10);
  if (ECTimesCompleted("eterc12")) {
      dim.cost = Decimal.round(dim.cost.times(Math.pow(infCostMults[tier], 1-ECTimesCompleted("eterc12")*0.008)))
  } else {
      dim.cost = Decimal.round(dim.cost.times(infCostMults[tier]))
  }
  dim.power = dim.power.times(getIDPowerMult(tier))
  dim.baseAmount = tier < 8 ? Math.min(dim.baseAmount+10,tmp.inf_bought_cap*10) : dim.baseAmount+10

  if (inEC(8)) player.eterc8ids-=1
  document.getElementById("eterc8ids").textContent = "You have "+player.eterc8ids+" purchases left."
  return true
}

function buyMaxInfDims(tier) {
  var dim = player["infinityDimension"+tier]

  if (dim.baseAmount >= tmp.inf_bought_cap*10 && tier < 8) return false
  if (player.infinityPoints.lt(dim.cost)) return false
  if (!player.infDimensionsUnlocked[tier-1]) return false

  let costMult;
  if (ECTimesCompleted("eterc12")) {
      costMult = Math.pow(infCostMults[tier], 1-ECTimesCompleted("eterc12")*0.008)
  } else {
      costMult = infCostMults[tier]
  }

  var toBuy = Math.floor((player.infinityPoints.e - dim.cost.e) / Math.log10(costMult))
  toBuy = tier < 8 ? Math.min(toBuy+dim.baseAmount/10,tmp.inf_bought_cap)-dim.baseAmount/10 : toBuy
  dim.cost = dim.cost.times(Decimal.pow(costMult, toBuy-1))
  player.infinityPoints = player.infinityPoints.minus(dim.cost)
  dim.cost = dim.cost.times(costMult)
  dim.amount = dim.amount.plus(10*toBuy);
  dim.power = dim.power.times(Decimal.pow(getIDPowerMult(tier), toBuy))
  dim.baseAmount = tier < 8 ? Math.min(dim.baseAmount+10*toBuy,tmp.inf_bought_cap*10) : dim.baseAmount+10*toBuy
  buyManyInfinityDimension(tier)
}

function switchAutoInf(tier) {
  if (player.infDimBuyers[tier-1]) {
      player.infDimBuyers[tier-1] = false
      document.getElementById("infauto"+tier).textContent = "Auto: OFF"
  } else {
      player.infDimBuyers[tier-1] = true
      document.getElementById("infauto"+tier).textContent = "Auto: ON"
  }
}

function toggleAllInfDims() {
  if (player.infDimBuyers[0]) {
      for (var i=1; i<9; i++) {
          player.infDimBuyers[i-1] = false
          document.getElementById("infauto"+i).textContent = "Auto: OFF"
      }
  } else {
      for (var i=1; i<9; i++) {
          if (player.eternities - 10>=i) {
              player.infDimBuyers[i-1] = true
              document.getElementById("infauto"+i).textContent = "Auto: ON"
          }
      }
  }
}

function loadInfAutoBuyers() {
  for (var i=1; i<9; i++) {
      if (player.infDimBuyers[i-1]) document.getElementById("infauto"+i).textContent = "Auto: ON"
      else document.getElementById("infauto"+i).textContent = "Auto: OFF"
  }
}

var infDimPow = 1