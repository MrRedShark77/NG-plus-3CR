//test
var gameLoopIntervalId;
var Marathon = 0;
var Marathon2 = 0;
var auto = false;
var autoS = true;
var shiftDown = false;
var controlDown = false;
var justImported = false;
var saved = 0;
var painTimer = 0;
var keySequence = 0;
var failureCount = 0;
var implosionCheck = 0;
var TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
var DISPLAY_NAMES = [ null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth" ];
var forceHardReset = false;
var player = getPlayerData()
var break_infinity_js = false


var defaultStart = $.extend(true, {}, player);





function setTheme(name) {
    document.querySelectorAll("link").forEach( function(e) {
        if (e.href.includes("theme")) e.remove();
    });

    if(name !== undefined && name.length < 3) giveAchievement("Shhh... It's a secret")
    if(name === undefined) {
        document.getElementById("theme").textContent = "Current theme: Normal"
    } else if(name === "S1") {
        document.getElementById("theme").textContent="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S2") {
        document.getElementById("theme").textContent="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S3") {
        document.getElementById("theme").textContent="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S4") {
        document.getElementById("theme").textContent="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    }  else if(name === "S5") {
        document.getElementById("theme").textContent="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else {
        document.getElementById("theme").textContent="Current theme: " + name;
    }

    if (name === undefined) return;

    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "stylesheets/theme-" + name + ".css";

    head.appendChild(link);
}

document.getElementById("theme").onclick = function () {
    if (player.options.theme === undefined) {
        player.options.theme = "Metro";
    } else if (player.options.theme === "Metro") {
        player.options.theme = "Dark";
        Chart.defaults.global.defaultFontColor = '#888';
        normalDimChart.data.datasets[0].borderColor = '#888'
    } else if (player.options.theme === "Dark") {
        player.options.theme = "Dark Metro";
    } else if (player.options.theme === "Dark Metro") {
        player.options.theme = "Inverted";
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if (player.options.theme === "Inverted") {
        player.options.theme = "Inverted Metro";
    } else {
        player.options.theme = undefined;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    }

    setTheme(player.options.theme);

}


let kongIPMult = 1
let kongDimMult = 1
let kongAllDimMult = 1
let kongEPMult = 1








function showTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('tab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
    if (document.getElementById("timestudies").style.display != "none" && document.getElementById("eternitystore").style.display != "none") document.getElementById("TTbuttons").style.display = "block";
    else document.getElementById("TTbuttons").style.display = "none"
    if (document.getElementById("antimatterdimensions").style.display != "none" && document.getElementById("dimensions").style.display != "none") document.getElementById("progress").style.display = "block";
    else document.getElementById("progress").style.display = "none"
    resizeCanvas();
    closeToolTip();
}




function updateMoney() {
    var element = document.getElementById("coinAmount");
    element.textContent = formatValue(player.options.notation, player.money, 2, 1);
    var element2 = document.getElementById("matter");
    if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") element2.textContent = "There is " + formatValue(player.options.notation, player.matter, 2, 1) + " matter."
    if (player.currentChallenge == "postc6") element2.textContent = "There is " + formatValue(player.options.notation, Decimal.pow(player.matter,20), 2, 1) + " matter."; //TODO
}

function updateCoinPerSec() {
    document.getElementById("coinsPerSec").textContent = 'You are getting ' + shortenDimensions(tmp.AM_gain) + ' antimatter per second.'
    document.getElementById("AM_deflation").style.visibility = tmp.AM_deflation > 1 ? "visible" : "hidden"
    document.getElementById("AM_deflation").textContent = tmp.AM_deflation > 1 ? `Due to antimatter deflation, your antimatter gain is rooted by ${shorten(tmp.AM_deflation)}` : "No Deflation"
}

function getInfinitied() {return Math.max(player.infinitied + player.infinitiedBank, 0)}







function getGalaxyCostScalingStart() {
    var n = 100 + ECTimesCompleted("eterc5")*5
    if (player.timestudy.studies.includes(223)) n += 7
    if (player.timestudy.studies.includes(224)) n += Math.floor(player.resets/2000)
    return n
}

function getGalaxyRequirement(offset = 0, display) {
    let g = player.galaxies + offset
    let amount = 80 + (g * 60);
    if (player.timestudy.studies.includes(42)) amount = 80 + (g * 52)
    if (player.currentChallenge == "challenge4") amount = 99 + (g * 90)

    let galaxyCostScalingStart = getGalaxyCostScalingStart()
    if (player.currentEternityChall == "eterc5") {
        amount += Math.pow(g, 2) + g
    }
    else if (g >= galaxyCostScalingStart) {
        amount += Math.pow((g)-(galaxyCostScalingStart-1),2)+(g)-(galaxyCostScalingStart-1)
    }
    if (g >= tmp.remoteGalaxyStart) {
        amount = Math.floor(amount * Math.pow(hasGluonUpg('rg1')?1.001:1.002, (g-tmp.remoteGalaxyStart+1)))
    }

    if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
    if (player.challenges.includes("postc5")) amount -= 1;

    return amount;
}

function getETA(cost) {
    var a = 100;
    if (player.money.gte(cost)) return 0
    while (ETACalc(a).lt(cost)) {
        a *= 10;
        if (a > 1e20) return Infinity;
    }
    var b = a / 10;
    var q = ETACalc((a+b)/2);
    while (q.gt(cost.times(1.0001)) || q.lt(cost.dividedBy(1.0001))) {
        console.log("q = "+q)
        console.log("a = "+a)
        console.log("b = "+b)
        if (q.lt(cost)) a = (a+b)/2;
        else b = (a+b)/2;
        q = ETACalc((a+b)/2);
    }
    return (a+b)/2;
}

function ETACalc(t) {
    var value = player.money.plus(getDimensionProductionPerSecond(1).times(t));
    var div = 1;
    for (let tier = 2; tier <= 8; ++tier) {
        var name = TIER_NAMES[tier-1]
        div *= tier;
        value = value.plus(getDimensionProductionPerSecond(tier).times(getDimensionProductionPerSecond(tier-1)).times(Decimal.pow(t,tier)).dividedBy(Decimal.max(player[name+"Amount"].times(div).times(10), 1))) ;
    }
    return value
}



var worstChallengeTime = 1

function updateWorstChallengeTime() {
    worstChallengeTime = 1
    for (var i=0; i<10; i++) {
        if (player.challengeTimes[i] > worstChallengeTime) worstChallengeTime = player.challengeTimes[i]
    }
}


function sacrificeConf() {
    player.options.sacrificeConfirmation = !player.options.sacrificeConfirmation
}




function updateDimensions() {
    if (document.getElementById("antimatterdimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {

        for (let tier = 1; tier <= 8; ++tier) {
            var name = TIER_NAMES[tier];
            if (!canBuyDimension(tier) && document.getElementById(name + "Row").style.display !== "table-row") {
                break;
            }
            document.getElementById(name + "D").childNodes[0].nodeValue = DISPLAY_NAMES[tier] + " Dimension x" + formatValue(player.options.notation, getDimensionFinalMultiplier(tier), 1, 1);
            document.getElementById(name + "Amount").textContent = getDimensionDescription(tier);
        }



        for (let tier = 1; tier <= 8; ++tier) {
            var name = TIER_NAMES[tier];
            if (!canBuyDimension(tier)) {
                break;
            }

            document.getElementById(name + "Row").style.display = "table-row";
            document.getElementById(name + "Row").style.visibility = "visible";


        }

        var shiftRequirement = tmp.dimBoostReq
        if (player.currentChallenge == "challenge4" ? shiftRequirement.tier < 6 : shiftRequirement.tier < 8) {
            document.getElementById("resetLabel").textContent = 'Dimension Shift ('+ player.resets +'): requires ' + shiftRequirement.amount + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions"
        }
        else {
            let s = player.resets >= getSupersonicStart() ? "Supersonic" : "Boost"
            document.getElementById("resetLabel").textContent = 'Dimension '+s+' ('+ getFullExpansion(player.resets) +'): requires ' + getFullExpansion(shiftRequirement.amount) + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions"
        }

        if (player.currentChallenge == "challenge4" ? player.resets > 2 : player.resets > 3) {
            document.getElementById("softReset").textContent = "Reset the game for a Boost"
        } else {
            document.getElementById("softReset").textContent = "Reset the game for a new Dimension"
        }
        let extraGals = tmp.extraRG+player.replicanti.galaxies
        var galString = "", bonus = false
        if (player.galaxies >= tmp.remoteGalaxyStart) galString += "Remote Antimatter Galaxies (";
        else if (player.galaxies >= getGalaxyCostScalingStart() || player.currentEternityChall === "eterc5") galString += "Distant Antimatter Galaxies (";
        else galString += "Antimatter Galaxies (";
        galString += getFullExpansion(player.galaxies);
        if (extraGals > 0) {
            galString += " + "+getFullExpansion(extraGals);
            bonus = true
        }
        if (player.dilation.freeGalaxies > 0) {
            galString += " + "+getFullExpansion(player.dilation.freeGalaxies);
            bonus = true
        }
        if (bonus) galString += " = " + getFullExpansion(tmp.totalGalaxies)
        galString += "): requires " + getFullExpansion(tmp.galaxyReq)
        if (player.currentChallenge == "challenge4") galString +=  " Sixth Dimensions";
        else galString +=  " Eighth Dimensions";
        document.getElementById("secondResetLabel").textContent = galString;
    }

    if (canBuyTickSpeed() || player.currentEternityChall == "eterc9") {
        var tickmult = tmp.tsReduce
        if (tickmult < 1e-9) document.getElementById("tickLabel").textContent = "Divide the tick interval by " + shortenDimensions(tickmult.pow(-1)) + '.'
        else {
            var places = 0
            if (tickmult < 0.2) places = Math.floor(Math.log10(Math.round(1/tickmult)))
            document.getElementById("tickLabel").textContent = 'Reduce the tick interval by ' + ((1 - tickmult) * 100).toFixed(places) + '%.'
        }

        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    } else {
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
    }

    if (player.bestInfinityTime == 9999999999) {
        document.getElementById("bestInfinity").textContent = ""
        document.getElementById("infinitied").textContent = ""
        document.getElementById("thisInfinity").textContent = ""
    } else {
        document.getElementById("bestInfinity").textContent = "Your fastest Infinity is in " + timeDisplay(player.bestInfinityTime) + "."
        document.getElementById("thisInfinity").textContent = "You have spent " + timeDisplay(player.thisInfinityTime) + " in this Infinity."
        if (player.infinityPoints.equals(1)) {
            document.getElementById("infinityPoints1").textContent = "You have 1 Infinity point."
            document.getElementById("infinityPoints2").textContent = "You have 1 Infinity point."
        }
        else {
            document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
            document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        }
        if (player.infinitied == 1) document.getElementById("infinitied").textContent = "You have infinitied 1 time."
        else document.getElementById("infinitied").textContent = "You have infinitied " + getFullExpansion(player.infinitied) + " times."
        if (player.infinitiedBank > 0) document.getElementById("infinitied").textContent = "You have infinitied " + getFullExpansion(player.infinitied) + " times this eternity."

    }

    if (document.getElementById("stats").style.display == "block" && document.getElementById("statistics").style.display == "block") {
        document.getElementById("totalmoney").textContent = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.'
        document.getElementById("totalresets").textContent = 'You have done ' + player.resets + ' dimensional boosts/shifts.'
        document.getElementById("galaxies").textContent = 'You have ' + Math.round(player.galaxies) + ' Antimatter Galaxies.'
        document.getElementById("totalTime").textContent = "You have played for " + timeDisplay(player.totalTimePlayed) + "."

        if (player.eternities == 0) {
            document.getElementById("eternitied").textContent = ""
            document.getElementById("besteternity").textContent = ""
            document.getElementById("thiseternity").textContent = ""
        } else {
            document.getElementById("eternitied").textContent = "You have Eternitied " + getFullExpansion(player.eternities) + " times."
            document.getElementById("besteternity").textContent = "You have spent "+timeDisplay(player.thisEternity)+" in this Eternity."
            document.getElementById("thiseternity").textContent = "Your fastest Eternity is in "+timeDisplay(player.bestEternity)+"."
        }
    }

    if (document.getElementById("infinity").style.display == "block") {
        if (document.getElementById("preinf").style.display == "block") {
            document.getElementById("infi11").innerHTML = "Normal dimensions gain a multiplier based on time played <br>Currently: " + (Math.pow(0.5 * player.totalTimePlayed / 600, 0.15)).toFixed(2) + "x<br>Cost: 1 IP"
            document.getElementById("infi12").innerHTML = "First and Eighth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi13").innerHTML = "Third and Sixth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi22").innerHTML = "Second and seventh Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi23").innerHTML = "Fourth and Fifth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi31").innerHTML = "Normal dimensions gain a multiplier based on time spent in current infinity<br>Currently: " + Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1).toFixed(2) + "x<br>Cost: 3 IP"
            document.getElementById("infi32").innerHTML = "Multiplier for unspent Infinity Points on 1st Dimension<br>Currently: " + formatValue(player.options.notation, player.infinityPoints.dividedBy(2).pow(1.5).plus(1), 2, 2) + "x<br>Cost: 5 IP"
            document.getElementById("infi34").innerHTML = "Infinity Point generation based on fastest infinity <br>Currently: "+shortenDimensions(tmp.infMultUpg.times(kongIPMult))+" every " + timeDisplay(player.bestInfinityTime*10) + "<br>Cost: 10 IP"
        }
        else if (document.getElementById("postinf").style.display == "block") {
            document.getElementById("postinfi11").innerHTML = "Power up all dimensions based on total antimatter produced<br>Currently: "+ Math.pow(player.totalmoney.e+1, 0.5).toFixed(2)+"x<br>Cost: "+shortenCosts(1e4)+" IP"
            document.getElementById("postinfi21").innerHTML = "Power up all dimensions based on current antimatter<br>Currently: "+ Math.pow(player.money.e+1, 0.5).toFixed(2)+"x<br>Cost: "+shortenCosts(5e4)+" IP"
            document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
            if (player.tickSpeedMultDecrease <= 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x"
            document.getElementById("postinfi22").innerHTML = "Power up all dimensions based on achievements completed <br>Currently: "+achievementMult.toFixed(2)+"x<br>Cost: "+shortenCosts(1e6)+" IP"
            document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+(1+Math.log10(getInfinitied()+1)*10).toFixed(2)+"x<br>Cost: "+shortenCosts(1e5)+" IP"
            if (player.timestudy.studies.includes(31)) document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+shortenMoney(Math.pow((Math.log10(getInfinitied()+1)*10).toFixed(2), 4))+"x<br>Cost: "+shortenCosts(1e5)+" IP"
            document.getElementById("postinfi41").innerHTML = "Makes galaxies 50% stronger <br>Cost: "+shortenCosts(5e11)+" IP"
            document.getElementById("postinfi32").innerHTML = "Power up all dimensions based on slowest challenge run<br>Currently:"+Decimal.max(10*3000/worstChallengeTime, 1).toFixed(2)+"x<br>Cost: "+shortenCosts(1e7)+" IP"
            document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"

            document.getElementById("postinfi13").innerHTML = "You passively generate Infinitied stat based on your fastest infinity.<br>"+getFullExpansion(tmp.infGain)+" Infinity every "+timeDisplay(player.bestInfinityTime*5)+ " <br>Cost: "+shortenCosts(20e6)+" IP"
            document.getElementById("postinfi23").innerHTML = "Option to bulk buy Dimension Boosts <br>Cost: "+shortenCosts(5e9)+" IP"
            document.getElementById("postinfi33").innerHTML = "Autobuyers work twice as fast <br>Cost:"+shortenCosts(1e15)+" IP"
            if (player.dimensionMultDecrease <= 3) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease.toFixed(1)+"x"

            document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% > "+Math.max(Math.max(5, player.offlineProd + 5), Math.min(50, player.offlineProd + 5))+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +"IP/min<br> Cost: "+shortenCosts(player.offlineProdCost)+" IP"
            if (player.offlineProd == 50) document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +" IP/min"
        }
    }

    if (document.getElementById("eternityupgrades").style.display == "block" && document.getElementById("eternitystore").style.display == "block") {
        document.getElementById("eter1").innerHTML = "Infinity Dimensions multiplier based on unspent EP (x+1)<br>Currently: "+shortenMoney(player.eternityPoints.plus(1))+"x<br>Cost: 5 EP"
        document.getElementById("eter2").innerHTML = "Infinity Dimension multiplier based on eternities ((x/200)^log4(2x))<br>Currently: "+shortenMoney(Decimal.pow(Math.min(player.eternities, 100000)/200 + 1, Math.log(Math.min(player.eternities, 100000)*2+1)/Math.log(4)).times(E((player.eternities-100000)/200 + 1).times(Math.log((player.eternities- 100000)*2+1)/Math.log(4)).max(1)))+"x<br>Cost: 10 EP"
        document.getElementById("eter3").innerHTML = "Infinity Dimensions multiplier based on sum of Infinity Challenge times<br>Currently: "+shortenMoney(Decimal.pow(2,300/Math.max(infchallengeTimes, player.achievements.includes("r112") ? 6.1 : 7.5)))+"x<br>Cost: "+shortenCosts(50e3)+" EP"
        document.getElementById("eter4").innerHTML = "Your achievement bonus affects Time Dimensions"+"<br>Cost: "+shortenCosts(1e16)+" EP"
        document.getElementById("eter5").innerHTML = "Time Dimensions are multiplied by your unspent time theorems"+"<br>Cost: "+shortenCosts(1e40)+" EP"
        document.getElementById("eter6").innerHTML = "Time Dimensions are multiplied by days played"+"<br>Cost: "+shortenCosts(1e50)+" EP"

        el('eter_upgs_dil').style.display = DilUnlocked() ? '' : 'none'

        if (DilUnlocked()) {
            document.getElementById("eter7").innerHTML = "Dilated time is multiplied by antimatter<br>Currently: "+shortenMoney(tmp.EP_DIL_upg[0])+"x<br>Cost: "+shortenCosts('1e2000')+" EP"
            document.getElementById("eter8").innerHTML = "Dilated time is multiplied by infinity power<br>Currently: "+shortenMoney(tmp.EP_DIL_upg[1])+"x<br>Cost: "+shortenCosts('1e2500')+" EP"
            document.getElementById("eter9").innerHTML = "Dilated time is multiplied by time shard<br>Currently: "+shortenMoney(tmp.EP_DIL_upg[2])+"x<br>Cost: "+shortenCosts('1e3000')+" EP"
        }
    }

    if (document.getElementById("dilation").style.display == "block") {
        if (player.dilation.active) {
            if (tmp.tachyonGain.sub(player.dilation.totalTachyonParticles).lte(0)) {
                document.getElementById("enabledilation").innerHTML = "Disable dilation.<br>Reach " + shortenMoney(getReqForTPGain()) + " antimatter to gain more Tachyon Particles."
            } else {
                document.getElementById("enabledilation").textContent = "Disable dilation."
            }
        }
        else document.getElementById("enabledilation").textContent = "Dilate time."
    }
}

function updateCosts() {
    document.getElementById("first").textContent = 'Cost: ' + shortenCosts(player.firstCost);
    document.getElementById("second").textContent = 'Cost: ' + shortenCosts(player.secondCost);
    document.getElementById("third").textContent = 'Cost: ' + shortenCosts(player.thirdCost);
    document.getElementById("fourth").textContent = 'Cost: ' + shortenCosts(player.fourthCost);
    document.getElementById("fifth").textContent = 'Cost: ' + shortenCosts(player.fifthCost);
    document.getElementById("sixth").textContent = 'Cost: ' + shortenCosts(player.sixthCost);
    document.getElementById("seventh").textContent = 'Cost: ' + shortenCosts(player.seventhCost);
    document.getElementById("eight").textContent = 'Cost: ' + shortenCosts(player.eightCost);

    document.getElementById("firstMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.firstCost.times(10 - dimBought(1)));
    document.getElementById("secondMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.secondCost.times(10 - dimBought(2)));
    document.getElementById("thirdMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.thirdCost.times(10 - dimBought(3)));
    document.getElementById("fourthMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.fourthCost.times(10 - dimBought(4)));
    document.getElementById("fifthMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.fifthCost.times(10 - dimBought(5)));
    document.getElementById("sixthMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.sixthCost.times(10 - dimBought(6)));
    document.getElementById("seventhMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.seventhCost.times(10 - dimBought(7)));
    document.getElementById("eightMax").textContent = 'Until 10, Cost: ' + shortenCosts(player.eightCost.times(10 - dimBought(8)));

    document.getElementById("tickSpeed").textContent = 'Cost: ' + shortenCosts(player.tickSpeedCost);


    for (var i=1; i<=8; i++) {

        document.getElementById("infMax"+i).textContent = player['infinityDimension'+i].baseAmount >= (tmp?tmp.inf_bought_cap:0)*10 && i < 8 ? "Capped" : "Cost: " + shortenCosts(player["infinityDimension"+i].cost) + " IP"
    }

    for (var i=1; i<=8; i++) {

        document.getElementById("timeMax"+i).textContent = "Cost: " + shortenDimensions(player["timeDimension"+i].cost) + " EP"
    }
}

function floatText(id, text, leftOffset = 150) {
    if (!player.options.animations.floatingText) return
    var el = $("#"+id)
    el.append("<div class='floatingText' style='left: "+leftOffset+"px'>"+text+"</div>")
    setTimeout(function() {
        el.children()[0].remove()
    }, 1000)
}




function isEterChall(elem) {
    return !elem.id.includes("eter") && !elem.id.includes("qc")
}

function updateChallenges() {
    try {
        var buttons = Array.from(document.getElementsByClassName('onchallengebtn')).filter(isEterChall)
        for (var i=0; i < buttons.length; i++) {
            buttons[i].className = "challengesbtn";
            buttons[i].textContent = "Start"
        }

        var buttonss = Array.from(document.getElementsByClassName('completedchallengesbtn')).filter(isEterChall)
        for (var i=0; i < buttonss.length; i++) {
            buttonss[i].className = "challengesbtn";
            buttonss[i].textContent = "Start"
        }


        for (var i=0; i < player.challenges.length; i++) {
            document.getElementById(player.challenges[i]).className = "completedchallengesbtn";
            document.getElementById(player.challenges[i]).textContent = "Completed"
        }

        if (player.currentChallenge != "") {
            document.getElementById(player.currentChallenge).className = "onchallengebtn"
            document.getElementById(player.currentChallenge).textContent = "Running"
        }

        if (player.money.gte(E("1e2000")) || Object.keys(player.eternityChalls).length > 0 || player.eternityChallUnlocked !== 0) document.getElementById("challTabButtons").style.display = "table"
        for (var i=1; i<9; i++) {
            if (player.postChallUnlocked >= i) document.getElementById("postc"+i+"div").style.display = "inline-block"
            else document.getElementById("postc"+i+"div").style.display = "none"
        }



    } catch (err) {
        console.log(err)
        updateChallenges()

    }

}


function updateEternityChallenges() {

    for (var property in player.eternityChalls) {
        document.getElementById(property+"div").style.display = "inline-block"
        if (player.eternityChalls[property] < 5) {
            document.getElementById(property).textContent = "Locked"
            document.getElementById(property).className = "lockedchallengesbtn"
        }
        else {
            document.getElementById(property).textContent = "Completed"
            document.getElementById(property).className = "completedchallengesbtn"
        }
    }

    if (player.eternityChallUnlocked !== 0) {
        document.getElementById("eterc"+player.eternityChallUnlocked).textContent = "Start"
        document.getElementById("eterc"+player.eternityChallUnlocked).className = "challengesbtn"
        document.getElementById("eterctabbtn").style.display = "block"
    } else {
        for (i=1; i<16; i++) {
            if (player.eternityChalls["eterc"+i] !== 5) {
                document.getElementById("eterc"+i).textContent = "Locked"
                document.getElementById("eterc"+i).className = "lockedchallengesbtn"
            }
        }
    }

    for (i=1; i<16; i++) {
        document.getElementById("eterc"+i+"div").style.display = player.eternityChallUnlocked == i || player.eternityChalls['eterc'+i] ? "block" : "none"
    }

    document.getElementById("eterctabbtn").style.display = player.eternityChallUnlocked !== 0 || Object.keys(player.eternityChalls).length > 0 ? "block" : "none"

    if (player.etercreq !== 0) document.getElementById("eterc"+player.etercreq+"div").style.display = "block"

    if (player.currentEternityChall !== "") {
        document.getElementById(player.currentEternityChall).textContent = "Running"
        document.getElementById(player.currentEternityChall).className = "onchallengebtn"
    }
}









function toggleChallengeRetry() {
    if (player.options.retryChallenge) {
        player.options.retryChallenge = false
        document.getElementById("retry").textContent = "Automatically retry challenges OFF"
    } else {
        player.options.retryChallenge = true
        document.getElementById("retry").textContent = "Automatically retry challenges ON"
    }
}

document.getElementById("news").onclick = function () {
    if (document.getElementById("news").textContent === "Click this to unlock a secret achievement.") {
        giveAchievement("Real news")
    }
};

document.getElementById("secretstudy").onclick = function () {
    document.getElementById("secretstudy").style.opacity = "1";
    document.getElementById("secretstudy").style.cursor = "default";
    giveAchievement("Go study in real life instead");
    setTimeout(drawStudyTree, 2000);
};

document.getElementById("The first one's always free").onclick = function () {
    giveAchievement("The first one's always free")
};




function glowText(id) {
  var text = document.getElementById(id);
  text.style.setProperty("-webkit-animation", "glow 1s");
  text.style.setProperty("animation", "glow 1s");
}





document.getElementById("maxall").onclick = function () {
    if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
    buyMaxTickSpeed();

    for (var tier=1; tier<9;tier++) buyBulkDimension(tier, 1/0)
}




document.getElementById("challengeconfirmation").onclick = function () {
    if (!player.options.challConf) {
        player.options.challConf = true;
        document.getElementById("challengeconfirmation").textContent = "Challenge confirmation OFF"
    } else {
        player.options.challConf = false;
        document.getElementById("challengeconfirmation").textContent = "Challenge confirmation ON"
    }
}




function buyInfinityUpgrade(name, cost) {
    if (player.infinityPoints.gte(cost) && !player.infinityUpgrades.includes(name)) {
        player.infinityUpgrades.push(name);
        player.infinityPoints = player.infinityPoints.minus(cost);
        return true
    } else return false
}

document.getElementById("infiMult").onclick = function() {
    if (player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints.gte(player.infMultCost)) {
        player.infinityPoints = player.infinityPoints.minus(player.infMultCost)
        if (!inEC(14)) player.infMult = player.infMult.times(tmp.inf_mult_base);
        player.autoIP = player.autoIP.times(2);
        player.infMultCost = player.infMultCost.times(10)
        tmp.infMultUpg = getIPMultiplierFromUpgrade()
        document.getElementById("infiMult").innerHTML = "You get "+tmp.inf_mult_base.toFixed(1)+"x more IP.<br>Currently: "+shorten(tmp.infMultUpg.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = player.autobuyers[11].priority.times(2);
        if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = formatValue("Scientific", player.autobuyers[11].priority, 2, 0);
    }
}

const ETER_UPG_COST = [null,5,10,5e4,1e16,1e40,1e50,'1e2000','1e2500','1e3000']

function updateEternityUpgrades() {
    for (let i = 1; i < ETER_UPG_COST.length; i++) {
        document.getElementById("eter"+i).className = (player.eternityUpgrades.includes(i)) ? "eternityupbtnbought" : (player.eternityPoints.gte(ETER_UPG_COST[i])) ? "eternityupbtn" : "eternityupbtnlocked"
    }
}


function buyEternityUpgrade(name, cost) {
    if (player.eternityPoints.gte(cost) && !player.eternityUpgrades.includes(name)) {
        player.eternityUpgrades.push(name)
        player.eternityPoints = player.eternityPoints.minus(cost)
        updateEternityUpgrades()
    }
}

function getEPCost(bought) {
	return Decimal.pow(bought > 481 ? 1e3 : bought > 153 ? 500 : bought > 58 ? 100 : 50, bought + Math.pow(Math.max(bought - 1334, 0), 1.2)).times(500)	
}

function buyEPMult() {
    if (player.eternityPoints.gte(player.epmultCost)) {
        player.epmult = player.epmult.times(5)
        player.eternityBuyer.limit = player.eternityBuyer.limit.times(5)
        document.getElementById("priority13").value = formatValue("Scientific", player.eternityBuyer.limit, 2, 0);
        player.eternityPoints = player.eternityPoints.minus(player.epmultCost)
        player.epmultCost = getEPCost(Math.round(player.epmult.ln()/Math.log(5)))
        document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
        updateEternityUpgrades()
    }
}

/*
function buyEPMult() {
	if (player.eternityPoints.gte(player.epmultCost)) {
		player.epmult = player.epmult.times(5)
		if (player.autoEterMode === undefined || player.autoEterMode === 'amount') {
			player.eternityBuyer.limit = Decimal.times(player.eternityBuyer.limit, 5);
			document.getElementById("priority13").value = formatValue("Scientific", player.eternityBuyer.limit, 2, 0);
		}
		player.eternityPoints = player.eternityPoints.minus(player.epmultCost)
		player.epmultCost = getEPCost(Math.round(player.epmult.ln()/Math.log(5)))
		document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
		updateEternityUpgrades()
	}
}
*/

function buyMaxEPMult() {
	if (player.eternityPoints.lt(player.epmultCost)) return
	var bought=Math.round(player.epmult.ln()/Math.log(5))
	var increment=1
	while (player.eternityPoints.gte(getEPCost(bought + increment * 2 - 1))) {
		increment *= 2
	}
	var toBuy = increment
	for (p = 0; p < 53; p++) {
		increment /= 2
		if (increment < 1) break
		if (player.eternityPoints.gte(getEPCost(bought + toBuy + increment - 1))) toBuy += increment
	}
	var num = toBuy
	var newEP = player.eternityPoints
	while (num > 0) {
		var temp = newEP
		var cost = getEPCost(bought+num-1)
		if (newEP.lt(cost)) {
			newEP = player.eternityPoints.sub(cost)
			toBuy--
		} else newEP = newEP.sub(cost)
		if (newEP.eq(temp) || num > 9007199254740992) break
		num--
	}
	player.eternityPoints = newEP
	if (isNaN(newEP.e)) player.eternityPoints = new Decimal(0)
	player.epmult = player.epmult.times(Decimal.pow(5, toBuy))
	player.epmultCost = getEPCost(bought+toBuy)
	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
}





function playerInfinityUpgradesOnEternity() {
    if (player.eternities < 4) player.infinityUpgrades = []
    else if (player.eternities < 20) player.infinityUpgrades = ["timeMult", "dimMult", "timeMult2", "skipReset1", "skipReset2", "unspentBonus", "27Mult", "18Mult", "36Mult", "resetMult", "skipReset3", "passiveGen", "45Mult", "resetBoost", "galaxyBoost", "skipResetGalaxy"]
    else player.infinityUpgrades = player.infinityUpgrades
}



document.getElementById("infi11").onclick = function () {
    buyInfinityUpgrade("timeMult",1);
}

document.getElementById("infi21").onclick = function () {
    buyInfinityUpgrade("dimMult",1);
}

document.getElementById("infi12").onclick = function () {
    if (player.infinityUpgrades.includes("timeMult")) buyInfinityUpgrade("18Mult",1);
}

document.getElementById("infi22").onclick = function () {
    if (player.infinityUpgrades.includes("dimMult")) buyInfinityUpgrade("27Mult",1);
}

document.getElementById("infi13").onclick = function () {
    if (player.infinityUpgrades.includes("18Mult")) buyInfinityUpgrade("36Mult",1);
}
document.getElementById("infi23").onclick = function () {
    if (player.infinityUpgrades.includes("27Mult")) buyInfinityUpgrade("45Mult",1);
}

document.getElementById("infi14").onclick = function () {
    if (player.infinityUpgrades.includes("36Mult")) buyInfinityUpgrade("resetBoost",1);
}

document.getElementById("infi24").onclick = function () {
    if (player.infinityUpgrades.includes("45Mult")) buyInfinityUpgrade("galaxyBoost",2);
}

document.getElementById("infi31").onclick = function() {
    buyInfinityUpgrade("timeMult2",3);
}

document.getElementById("infi32").onclick = function() {
    if (player.infinityUpgrades.includes("timeMult2")) buyInfinityUpgrade("unspentBonus",5);
}

document.getElementById("infi33").onclick = function() {
    if (player.infinityUpgrades.includes("unspentBonus")) buyInfinityUpgrade("resetMult",7);
}

document.getElementById("infi34").onclick = function() {
    if (player.infinityUpgrades.includes("resetMult")) buyInfinityUpgrade("passiveGen",10);
}

document.getElementById("infi41").onclick = function() {
    buyInfinityUpgrade("skipReset1",20);
}

document.getElementById("infi42").onclick = function() {
    if (player.infinityUpgrades.includes("skipReset1")) buyInfinityUpgrade("skipReset2", 40)
}

document.getElementById("infi43").onclick = function() {
    if (player.infinityUpgrades.includes("skipReset2")) buyInfinityUpgrade("skipReset3", 80)
}

document.getElementById("infi44").onclick = function() {
    if (player.infinityUpgrades.includes("skipReset3")) buyInfinityUpgrade("skipResetGalaxy", 500)
}


document.getElementById("postinfi11").onclick = function() {
    buyInfinityUpgrade("totalMult",1e4);
}

document.getElementById("postinfi21").onclick = function() {
    buyInfinityUpgrade("currentMult",5e4);
}

document.getElementById("postinfi31").onclick = function() {
    if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost) && player.tickSpeedMultDecrease > 2) {
        player.infinityPoints = player.infinityPoints.minus(player.tickSpeedMultDecreaseCost)
        player.tickSpeedMultDecreaseCost *= 5
        player.tickSpeedMultDecrease--;
        document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.tickSpeedMultDecreaseCost) +" IP"
        if (player.tickSpeedMultDecrease <= 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x"
    }
}

document.getElementById("postinfi41").onclick = function() {
    buyInfinityUpgrade("postGalaxy",5e11);
}

document.getElementById("postinfi12").onclick = function() {
    buyInfinityUpgrade("infinitiedMult",1e5);
}

document.getElementById("postinfi22").onclick = function() {
    buyInfinityUpgrade("achievementMult",1e6);
}

document.getElementById("postinfi32").onclick = function() {
    buyInfinityUpgrade("challengeMult",1e7);
}

document.getElementById("postinfi42").onclick = function() {
    if (player.infinityPoints.gte(player.dimensionMultDecreaseCost) && player.dimensionMultDecrease > 3) {
        player.infinityPoints = player.infinityPoints.minus(player.dimensionMultDecreaseCost)
        player.dimensionMultDecreaseCost *= 5000
        player.dimensionMultDecrease--;
        document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
        if (player.dimensionMultDecrease <= 3) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease.toFixed(1)+"x"
    }
}

document.getElementById("offlineProd").onclick = function() {
    if (player.infinityPoints.gte(player.offlineProdCost) && player.offlineProd < 50) {
        player.infinityPoints = player.infinityPoints.minus(player.offlineProdCost)
        player.offlineProdCost *= 10
        player.offlineProd += 5

    }
}


function updateInfCosts() {

    document.getElementById("infiMult").innerHTML = "You get "+tmp.inf_mult_base.toFixed(1)+"x more IP.<br>Currently: "+shorten(tmp.infMultUpg.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
    if (document.getElementById("replicantis").style.display == "block" && document.getElementById("infinity").style.display == "block") {
        let chance = tmp.rep.chance
        let c = chance.gte(1e9)?shortenDimensions(chance.mul(100)):getFullExpansion(Math.round(chance.toNumber()*100))
        if (chance.lt(1)) document.getElementById("replicantichance").innerHTML = "Replicate chance: "+c+"%<br>+"+1+"% Costs: "+shortenCosts(player.replicanti.chanceCost)+" IP"
        else document.getElementById("replicantichance").textContent = "Replicate chance: "+c+"%"
        let replGalOver = 0
        if (player.timestudy.studies.includes(131)) replGalOver += Math.floor(player.replicanti.gal / 2)
        if (player.timestudy.studies.includes(233)) {
            if (replGalOver !== 0) document.getElementById("replicantimax").innerHTML = "Max Replicanti galaxies: "+player.replicanti.gal+"+"+replGalOver+"<br>+1 Costs: "+shortenCosts(player.replicanti.galCost.dividedBy(player.replicanti.amount.pow(0.3)))+" IP"
            else document.getElementById("replicantimax").innerHTML = "Max Replicanti galaxies: "+player.replicanti.gal+"<br>+1 Costs: "+shortenCosts(player.replicanti.galCost.dividedBy(player.replicanti.amount.pow(0.3)))+" IP"
        } else {
            if (replGalOver !== 0) document.getElementById("replicantimax").innerHTML = "Max Replicanti galaxies: "+player.replicanti.gal+"+"+replGalOver+"<br>+1 Costs: "+shortenCosts(player.replicanti.galCost)+" IP"
            else document.getElementById("replicantimax").innerHTML = "Max Replicanti galaxies: "+player.replicanti.gal+"<br>+1 Costs: "+shortenCosts(player.replicanti.galCost)+" IP"
        }
        document.getElementById("replicantiunlock").innerHTML = "Unlock Replicantis<br>Cost: "+shortenCosts(1e140)+" IP"
        let extraGals = tmp.extraRG
        if (extraGals !== 0) document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + "+"+extraGals+ " replicated galaxies created."
        else document.getElementById("replicantireset").innerHTML = (player.replicanti.galaxies !== 1) ? "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created." : "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxy created."

        el('replicantimultiplier').style.display = el('replauto4').style.display = QCCompleted(2) ? "" : "none"
        el('replicantimultiplier').innerHTML = "Replicate Amount: "+shorten(tmp.rep.mult)+"x<br>2x Costs: "+shortenCosts(getRU4Cost())+" IP"
        el('replicantimultiplier').className = player.infinityPoints.gte(getRU4Cost()) ? "storebtn" : "unavailablebtn"
        
        document.getElementById("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable()) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && isIntervalAffordable()) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantimax").className = (player.infinityPoints.gte(player.replicanti.galCost)) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantireset").className = ((player.replicanti.galaxies < player.replicanti.gal && player.replicanti.amount.gte(Number.MAX_VALUE)) || (player.replicanti.galaxies < Math.floor(player.replicanti.gal * 1.5) && player.replicanti.amount.gte(Number.MAX_VALUE) && player.timestudy.studies.includes(131))) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantiunlock").className = (player.infinityPoints.gte(1e140)) ? "storebtn" : "unavailablebtn"
    }

    if (document.getElementById("timestudies").style.display == "block" && document.getElementById("eternitystore").style.display == "block") {
        document.getElementById("11desc").textContent = "Currently: "+shortenMoney(Decimal.fromMantissaExponent(10 -player.tickspeed.dividedBy(1000).pow(0.005).times(0.95).plus(player.tickspeed.dividedBy(1000).pow(0.0003).times(0.05)).mantissa, Math.abs(player.tickspeed.dividedBy(1000).pow(0.005).times(0.95).plus(player.tickspeed.dividedBy(1000).pow(0.0003).times(0.05)).e)).min("1e2500").max(1))+"x"
        document.getElementById("32desc").textContent = "You gain "+Math.max(player.resets, 1)+"x more infinitied stat (based on dimension boosts)"
        document.getElementById("51desc").textContent = "You gain "+shortenCosts(1e15)+"x more IP"
        document.getElementById("71desc").textContent = "Currently: "+shortenMoney(tmp.sacPow.pow(0.25).max(1).min("1e210000"))+"x"
        document.getElementById("72desc").textContent = "Currently: "+shortenMoney(tmp.sacPow.pow(0.04).max(1).min("1e30000"))+"x"
        document.getElementById("73desc").textContent = "Currently: "+shortenMoney(tmp.sacPow.pow(0.005).max(1).min("1e1300"))+"x"
        document.getElementById("82desc").textContent = "Currently: "+shortenMoney(Decimal.pow(1.0000109, Decimal.pow(player.resets, 2)))+"x"
        document.getElementById("91desc").textContent = "Currently: "+shortenMoney(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60))+"x"
        document.getElementById("92desc").textContent = "Currently: "+shortenMoney(Decimal.pow(2, 600/Math.max(player.bestEternity, 20)))+"x"
        document.getElementById("93desc").textContent = "Currently: "+shortenMoney(Decimal.pow(player.totalTickGained, 0.25))+"x"
        document.getElementById("121desc").textContent = "Currently: "+((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5).toFixed(1)+"x"
        document.getElementById("123desc").textContent = "Currently: "+Math.sqrt(1.39*player.thisEternity/10).toFixed(1)+"x"
        document.getElementById("141desc").textContent = "Currently: "+shortenMoney(E(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125))).max(1))+"x"
        document.getElementById("142desc").textContent = "You gain "+shortenCosts(1e25)+"x more IP"
        document.getElementById("143desc").textContent = "Currently: "+shortenMoney(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125)))+"x"
        document.getElementById("151desc").textContent = shortenCosts(1e4)+"x multiplier on all Time dimensions"
        document.getElementById("161desc").textContent = shortenCosts(E("1e616"))+"x multiplier on all normal dimensions"
        document.getElementById("162desc").textContent = shortenCosts(1e11)+"x multiplier on all Infinity dimensions"
        document.getElementById("192desc").textContent = "You can get beyond "+shortenMoney(Number.MAX_VALUE)+" replicantis, but the interval is increased the more you have"
        document.getElementById("193desc").textContent = "Currently: "+shortenMoney(Decimal.pow(1.03, player.eternities).min("1e13000"))+"x"
        document.getElementById("212desc").textContent = "Currently: "+((Math.pow(player.timeShards.max(2).log2(), 0.005)-1)*100).toFixed(2)+"%"
        document.getElementById("214desc").textContent = "Currently: "+shortenMoney(((tmp.sacPow.pow(8)).min("1e46000").times(tmp.sacPow.pow(1.1)).div(tmp.sacPow)).max(1).min(E("1e125000")))+"x"

        if (player.etercreq !== 1) document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Requirement: "+(ECTimesCompleted("eterc1")+1)*20000+" Eternities<span>Cost: 30 Time Theorems"
        else document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Cost: 30 Time Theorems"
        if (player.etercreq !== 2) document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Requirement: "+(1300+(ECTimesCompleted("eterc2")*150))+" Tickspeed upgrades gained from time dimensions<span>Cost: 35 Time Theorems"
        else document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Cost: 35 Time Theorems"
        if (player.etercreq !== 3) document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Requirement: "+(17300+(ECTimesCompleted("eterc3")*1250))+" 8th dimensions<span>Cost: 40 Time Theorems"
        else document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Cost: 40 Time Theorems"
        if (player.etercreq !== 4) document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Requirement: "+(1e8 + (ECTimesCompleted("eterc4")*5e7)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" infinities<span>Cost: 70 Time Theorems"
        else document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Cost: 70 Time Theorems"
        if (player.etercreq !== 5) document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Requirement: "+(160+(ECTimesCompleted("eterc5")*14))+" galaxies<span>Cost: 130 Time Theorems"
        else document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Cost: 130 Time Theorems"
        if (player.etercreq !== 6) document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Requirement: "+(40+(ECTimesCompleted("eterc6")*5))+" replicanti galaxies<span>Cost: 85 Time Theorems"
        else document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Cost: 85 Time Theorems"
        if (player.etercreq !== 7) document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Requirement: "+shortenCosts(E("1e500000").times(E("1e300000").pow(ECTimesCompleted("eterc7"))))+" antimatter <span>Cost: 115 Time Theorems"
        else document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Cost: 115 Time Theorems"
        if (player.etercreq !== 8) document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Requirement: "+shortenCosts(E("1e4000").times(E("1e1000").pow(ECTimesCompleted("eterc8"))))+" IP <span>Cost: 115 Time Theorems"
        else document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Cost: 115 Time Theorems"
        if (player.etercreq !== 9) document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Requirement: "+shortenCosts(E("1e17500").times(E("1e2000").pow(ECTimesCompleted("eterc9"))))+" infinity power<span>Cost: 415 Time Theorems"
        else document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Cost: 415 Time Theorems"
        if (player.etercreq !== 10) document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Requirement: "+shortenCosts(E("1e100").times(E("1e20").pow(ECTimesCompleted("eterc10"))))+" EP<span>Cost: 550 Time Theorems"
        else document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Cost: 550 Time Theorems"

        document.getElementById("ec11unl").innerHTML = "Eternity Challenge 11<span>Requirement: Use only the Normal Dimension path<span>Cost: 1 Time Theorem"
        document.getElementById("ec12unl").innerHTML = "Eternity Challenge 12<span>Requirement: Use only the Time Dimension path<span>Cost: 1 Time Theorem"

        if (player.dilation.studies.includes(1)) document.getElementById("dilstudy1").innerHTML = "Unlock time dilation<span>Cost: 5000 Time Theorems"
        else document.getElementById("dilstudy1").innerHTML = "Unlock time dilation<span>Requirement: 5 EC11 and EC12 completions and 13000 total theorems<span>Cost: 5000 Time Theorems"
    }
}



// Replicanti stuff

function unlockReplicantis() {
    if (player.infinityPoints.gte(1e140)) {
        document.getElementById("replicantidiv").style.display="inline-block"
        document.getElementById("replicantiunlock").style.display="none"
        player.replicanti.unl = true
        player.replicanti.amount = E(1)
        player.infinityPoints = player.infinityPoints.minus(1e140)
    }
}

function getRGCost(offset = 0, costChange) {
	let ret = player.replicanti.galCost
	if (offset > 0) {
        if (inQC(4)) return player.replicanti.galCost.pow(Math.pow(1.2, offset))

		let increase = 0
		if (player.currentEternityChall == "eterc6") increase = offset * ((offset + player.replicanti.gal * 2) + 3)
		else increase = offset * (2.5 * (offset + player.replicanti.gal * 2) + 22.5)
        let og = player.replicanti.gal + offset
		if (og > 99) increase += (offset - Math.max(99 - player.replicanti.gal, 0)) * (25 * (offset - Math.max(99 - player.replicanti.gal, 0) + Math.max(player.replicanti.gal, 99) * 2) - 4725)
		if (og > 799) {
			increase *= (og-799)/100+1
		}
        if (og > 1399) {
			increase *= (og-1399)**1.25/100+1
		}
		ret = ret.times(Decimal.pow(10, increase))
	}
	if (player.timestudy.studies.includes(233) && !costChange) ret = ret.dividedBy(player.replicanti.amount.pow(0.3))
	return ret
}

function replicantiGalaxyBulkModeToggle() {
	player.galaxyMaxBulk = !player.galaxyMaxBulk
	document.getElementById('replicantibulkmodetoggle').textContent = "Mode: " + (player.galaxyMaxBulk ? "Max" : "Singles")
}

function autoBuyRG() {
	if (!player.infinityPoints.gte(getRGCost())) return
    let newIP = player.infinityPoints
	let toBuy = bulkNumberFromDecimalFunction(getRGCost,newIP)
	let cost = getRGCost(toBuy - 1)
	let toBuy2 = toBuy
	while (toBuy > 0 && newIP.div(cost).lt(1e16)) {
		if (newIP.gte(cost)) newIP = newIP.sub(cost)
		else {
			newIP = player.infinityPoints.sub(cost)
			toBuy2--
		}
		toBuy--
		cost = getRGCost(toBuy - 1)
	}
	player.replicanti.infinityPoints = newIP
	player.replicanti.galCost = getRGCost(toBuy2, true)
	player.replicanti.gal += toBuy2
}

function getRU4Cost(l=player.replicanti.mult) {
    return Decimal.pow(10,Decimal.pow(1.1,l).mul(1e9))
}

function buyReplicantiUpgrade4(auto=false) {
    if (player.infinityPoints.gte(getRU4Cost()) && QCCompleted(2)) {
        player.replicanti.mult = auto ? Math.max(player.replicanti.mult + 1,Math.floor(Math.log(player.infinityPoints.l/1e9) / Math.log(1.1)) + 1) : player.replicanti.mult + 1
    }
}

function upgradeReplicantiChance() {
    if (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable() && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(player.replicanti.chanceCost)
        player.replicanti.chanceCost = player.replicanti.chanceCost.times(1e15)
        player.replicanti.chance += 0.01
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
    }
}

function getMaxRG() {
	let ret = player.replicanti.gal
	if (player.timestudy.studies.includes(131)) ret += Math.floor(ret * 0.5)
	return ret
}

function isIntervalAffordable() {
	return hasTSTier(2,81) || player.replicanti.interval > (player.timestudy.studies.includes(22) || player.boughtDims ? 1 : 50)
}

function upgradeReplicantiInterval() {
    if (player.infinityPoints.gte(player.replicanti.intervalCost) && isIntervalAffordable() && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(player.replicanti.intervalCost)
        player.replicanti.interval *= 0.9
        if (player.replicanti.interval < 1) {
            let x = 1 / player.replicanti.interval
            if (x > 1e10) x = Math.pow(x / 1e5, 2)
            player.replicanti.intervalCost = Decimal.pow("1e800", x)
        }
        else player.replicanti.intervalCost = player.replicanti.intervalCost.times(1e10)
        if (!isIntervalAffordable()) player.replicanti.interval = (player.timestudy.studies.includes(22) || player.boughtDims ? 1 : 50)
        var places = Math.floor(Math.log10(player.replicanti.interval/1000)) * (-1)
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
    }
}

function upgradeReplicantiGalaxy() {
	var cost = getRGCost()
	if (player.infinityPoints.gte(cost) && player.eterc8repl !== 0) {
		player.infinityPoints = player.infinityPoints.minus(cost)
		player.replicanti.galCost = getRGCost(1)
		player.replicanti.gal += 1
		if (player.currentEternityChall == "eterc8") player.eterc8repl -= 1
		document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
		return true
	}
	return false
}


function replicantiGalaxy() {
    if (player.replicanti.amount.gte(Number.MAX_VALUE) && (player.quantum.speedruns > 18 || !player.timestudy.studies.includes(131) ? player.replicanti.galaxies < player.replicanti.gal : player.replicanti.galaxies < Math.floor(player.replicanti.gal * 1.5)) && player.galaxies > 0) {
        if (player.achievements.includes("r126")) player.replicanti.amount = player.replicanti.amount.dividedBy(Number.MAX_VALUE)
        else player.replicanti.amount = E(1)
        player.replicanti.galaxies = player.galaxyMaxBulk ? getMaxRG() : player.replicanti.galaxies + 1
        galaxyReset(0)
    }
}



function updateMilestones() {
    var milestoneRequirements = [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 25, 30, 40, 50, 60, 80, 100]
    for (i=0; i<milestoneRequirements.length; i++) {
        var name = "reward" + i;
        if (player.eternities >= milestoneRequirements[i]) {
            document.getElementById(name).className = "milestonereward"
        } else {
            document.getElementById(name).className = "milestonerewardlocked"
        }
    }
}

function replicantiGalaxyAutoToggle() {
    if (player.replicanti.galaxybuyer) {
        player.replicanti.galaxybuyer = false
        if (player.quantum.speedruns <= 18 || player.timestudy.studies.includes(131)) document.getElementById("replicantiresettoggle").textContent = "Auto galaxy OFF (disabled)"
        else document.getElementById("replicantiresettoggle").textContent = "Auto galaxy OFF"
    } else {
        player.replicanti.galaxybuyer = true
        if (player.quantum.speedruns <= 18 || player.timestudy.studies.includes(131)) document.getElementById("replicantiresettoggle").textContent = "Auto galaxy ON (disabled)"
        else document.getElementById("replicantiresettoggle").textContent = "Auto galaxy ON"
    }
}

function infMultAutoToggle() {
    if (player.infMultBuyer) {
        player.infMultBuyer = false
        document.getElementById("infmultbuyer").textContent = "Autobuy IP mult OFF"
    } else {
        player.infMultBuyer = true
        document.getElementById("infmultbuyer").textContent = "Autobuy IP mult ON"
    }
}


function toggleCrunchMode() {
    if (player.autoCrunchMode == "amount") {
        player.autoCrunchMode = "time"
        document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: time"
        document.getElementById("limittext").textContent = "Seconds between crunches:"
    } else if (player.autoCrunchMode == "time"){
        player.autoCrunchMode = "relative"
        document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: X times last crunch"
        document.getElementById("limittext").textContent = "X times last crunch:"
    } else {
        player.autoCrunchMode = "amount"
        document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: amount"
        document.getElementById("limittext").textContent = "Amount of IP to wait until reset:"
    }
}

function toggleEternityConf() {
    if (player.options.eternityconfirm) {
        player.options.eternityconfirm = false
        document.getElementById("eternityconf").textContent = "Eternity confirmation OFF"
    } else {
        player.options.eternityconfirm = true
        document.getElementById("eternityconf").textContent = "Eternity confirmation ON"
    }
}

function toggleDilationConf() {
    player.options.dilationconfirm = !player.options.dilationconfirm
    updateConifrmationDiv()
}

function toggleReplAuto(i) {
    if (i == "chance") {
        if (player.replicanti.auto[0]) {
            player.replicanti.auto[0] = false
            document.getElementById("replauto1").textContent = "Auto: OFF"
        } else {
            player.replicanti.auto[0] = true
            document.getElementById("replauto1").textContent = "Auto: ON"
        }
    } else if (i == "interval") {
        if (player.replicanti.auto[1]) {
            player.replicanti.auto[1] = false
            document.getElementById("replauto2").textContent = "Auto: OFF"
        } else {
            player.replicanti.auto[1] = true
            document.getElementById("replauto2").textContent = "Auto: ON"
        }
    } else if (i == "galaxy") {
        if (player.replicanti.auto[2]) {
            player.replicanti.auto[2] = false
            document.getElementById("replauto3").textContent = "Auto: OFF"
        } else {
            player.replicanti.auto[2] = true
            document.getElementById("replauto3").textContent = "Auto: ON"
        }
    } else if (i == "amount") {
        if (player.replicanti.auto[3]) {
            player.replicanti.auto[3] = false
            document.getElementById("replauto4").textContent = "Auto: OFF"
        } else {
            player.replicanti.auto[3] = true
            document.getElementById("replauto4").textContent = "Auto: ON"
        }
    }
}




function toggleCommas() {
    player.options.commas = player.options.commas === "Commas" ? "" : "Commas"

    if (player.options.commas === "Commas") document.getElementById("commas").textContent = "Commas on exponents"
    else document.getElementById("commas").textContent = "Notation on exponents"
}






buyAutobuyer = function(id) {
    if (player.infinityPoints.lt(player.autobuyers[id].cost)) return false;
    if (player.autobuyers[id].bulk >= 1e100) return false;
    player.infinityPoints = player.infinityPoints.minus(player.autobuyers[id].cost);
    if (player.autobuyers[id].interval <= 100) {
        player.autobuyers[id].bulk = Math.min(player.autobuyers[id].bulk * 2, 1e100);
        player.autobuyers[id].cost = Math.ceil(2.4*player.autobuyers[id].cost);
        var b1 = true;
	    for (let i=0;i<8;i++) {
            if (player.autobuyers[i].bulk < 512) b1 = false;
        }
        if (b1) giveAchievement("Bulked up");
    } else {
        player.autobuyers[id].interval = Math.max(player.autobuyers[id].interval*0.6, 100);
        if (player.autobuyers[id].interval > 120) player.autobuyers[id].cost *= 2; //if your last purchase wont be very strong, dont double the cost
    }
    updateAutobuyers();
}

document.getElementById("buyerBtn1").onclick = function () {
    buyAutobuyer(0);
}

document.getElementById("buyerBtn2").onclick = function () {

    buyAutobuyer(1);
}

document.getElementById("buyerBtn3").onclick = function () {
    buyAutobuyer(2);
}

document.getElementById("buyerBtn4").onclick = function () {
    buyAutobuyer(3);
}

document.getElementById("buyerBtn5").onclick = function () {
    buyAutobuyer(4);
}

document.getElementById("buyerBtn6").onclick = function () {
    buyAutobuyer(5);
}

document.getElementById("buyerBtn7").onclick = function () {
    buyAutobuyer(6);
}

document.getElementById("buyerBtn8").onclick = function () {
    buyAutobuyer(7);
}

document.getElementById("buyerBtnTickSpeed").onclick = function () {
    buyAutobuyer(8);
}

document.getElementById("buyerBtnDimBoost").onclick = function () {
    buyAutobuyer(9);
}

document.getElementById("buyerBtnGalaxies").onclick = function () {
    buyAutobuyer(10);
}

document.getElementById("buyerBtnInf").onclick = function () {
    buyAutobuyer(11);
}

toggleAutobuyerTarget = function(id) {
    if (player.autobuyers[id-1].target == id) {
        player.autobuyers[id-1].target = 10 + id
        document.getElementById("toggleBtn" + id).textContent = "Buys until 10"
    } else {
        player.autobuyers[id-1].target = id
        document.getElementById("toggleBtn" + id).textContent = "Buys singles"
    }
}

document.getElementById("toggleBtn1").onclick = function () {
    toggleAutobuyerTarget(1)
}

document.getElementById("toggleBtn2").onclick = function () {
    toggleAutobuyerTarget(2)
}

document.getElementById("toggleBtn3").onclick = function () {
    toggleAutobuyerTarget(3)
}

document.getElementById("toggleBtn4").onclick = function () {
    toggleAutobuyerTarget(4)
}

document.getElementById("toggleBtn5").onclick = function () {
    toggleAutobuyerTarget(5)
}

document.getElementById("toggleBtn6").onclick = function () {
    toggleAutobuyerTarget(6)
}

document.getElementById("toggleBtn7").onclick = function () {
    toggleAutobuyerTarget(7)
}

document.getElementById("toggleBtn8").onclick = function () {
    toggleAutobuyerTarget(8)
}

document.getElementById("toggleBtnTickSpeed").onclick = function () {
    if (player.autobuyers[8].target == 1) {
        player.autobuyers[8].target = 10
        document.getElementById("toggleBtnTickSpeed").textContent = "Buys max"
    } else {
        player.autobuyers[8].target = 1
        document.getElementById("toggleBtnTickSpeed").textContent = "Buys singles"
    }
}















document.getElementById("secondSoftReset").onclick = function() {
    if (player.currentEternityChall == "eterc6") return
    var bool = player.currentChallenge != "challenge11" && player.currentChallenge != "postc1" && player.currentChallenge != "postc7" && (player.break || player.money.lte(Number.MAX_VALUE))
    if (player.currentChallenge == "challenge4" ? player.sixthBought >= tmp.galaxyReq && bool : player.eightBought >= tmp.galaxyReq && bool) {
        if (player.eternities >= 7 && !shiftDown) maxBuyGalaxies(true);
        else galaxyReset(1);
    }
}

function galaxyReset(bulk) {

    if (autoS) auto = false;
	autoS = true;
	if (player.sacrificed == 0 && bulk > 0) giveAchievement("I don't believe in Gods");
	if (player.tickspeedBoosts) player.tickspeedBoosts = 0
	doGalaxyResetStuff(bulk)
    setInitialDimensionPower()
    tmp.galaxyReq = tmp.galaxyReq

    if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
        player.thirdCost = E(100)
        player.fourthCost = E(500)
        player.fifthCost = E(2500)
        player.sixthCost = E(2e4)
        player.seventhCost = E(2e5)
        player.eightCost = E(4e6)
    }

    if (player.resets == 0 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
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
        player.resets = 4;
    }


    if (player.options.notation == "Emojis") player.spreadingCancer+=bulk;
    if (player.spreadingCancer >= 10) giveAchievement("Spreading Cancer")
    if (player.spreadingCancer >= 1000000) giveAchievement("Cancer = Spread")
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));

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

    if (player.galaxies >= 50) giveAchievement("YOU CAN GET 50 GALAXIES!??")
    if (player.galaxies >= 2) giveAchievement("Double Galaxy");
    if (player.galaxies >= 1) giveAchievement("You got past The Big Wall");
    if (player.challenges.includes("challenge1")) player.money = E(100).max(player.money)
    if (player.achievements.includes("r37")) player.money = E(1000).max(player.money);
    if (player.achievements.includes("r54")) player.money = E(2e5).max(player.money);
    if (player.achievements.includes("r55")) player.money = E(1e10).max(player.money);
    if (player.achievements.includes("r78")) player.money = E(1e25).max(player.money);
    player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce, player.totalTickGained))
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.galaxies >= 540 && player.replicanti.galaxies == 0) giveAchievement("Unique snowflakes")
    updateTickSpeed();
    updateTemp()
};

document.getElementById("exportbtn").onclick = function () {
    let output = document.getElementById('exportOutput');
    let parent = output.parentElement;

    parent.style.display = "";
    output.value = btoa(JSON.stringify(player, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));

    output.onblur = function() {
        parent.style.display = "none";
    }

    output.focus();
    output.select();

    try {
        if (document.execCommand('copy')) {
            $.notify("exported to clipboard", "info");
            output.blur();
        }
    } catch(ex) {
        // well, we tried.
    }
};


document.getElementById("save").onclick = function () {
    saved++
    if (saved > 99) giveAchievement("Just in case")
    save_game();
};

document.getElementById("load").onclick = function () {
    closeToolTip();
	for (var i = 0; i < 3; i++) {
		var _break = player.break;
        player.break = true;
        if (currentSave === i) document.querySelector("#save" + (i + 1) + " .save_antimatter").textContent = "Antimatter: " + shortenMoney(player.money);
        else document.querySelector("#save" + (i + 1) + " .save_antimatter").textContent = "Antimatter: " + shortenMoney(saves[i] ? E(saves[i].money) : 10);
		player.break = _break;
	}

	document.querySelectorAll(".save_selected").forEach(function(el) {
		el.style.display = "none";
	});

	document.querySelector("#save" + (currentSave + 1) + " .save_selected").style.display = "inline";

    document.getElementById("loadmenu").style.display = "flex";
};

document.getElementById("animationoptionsbtn").onclick = function () {
    closeToolTip();
    document.getElementById("animationoptions").style.display = "flex";
};

function verify_save(obj) {
    if (typeof obj != 'object') return false;


    return true;
}

document.getElementById("importbtn").onclick = function () {
    var save_data = prompt("Input your save. (your current save file will be overwritten!)");
    if (save_data.constructor !== String) save_data = "";
    if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "80b7fdc794f5dfc944da6a445a3f21a2d0f7c974d044f2ea25713037e96af9e3") {
        document.getElementById("body").style.animation = "barrelRoll 5s 1";
        giveAchievement("Do a barrel roll!")
        setTimeout(function(){ document.getElementById("body").style.animation = ""; }, 5000)
    } else if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "857876556a230da15fe1bb6f410ca8dbc9274de47c1a847c2281a7103dd2c274") giveAchievement("So do I");
    else if (sha512_256(save_data) === "de24687ee7ba1acd8f5dc8f71d41a3d4b7f14432fff53a4d4166e7eea48a88c0") {
        player.options.theme = "S1";
        player.options.secretThemeKey = save_data;
        setTheme(player.options.theme);
    } else if (sha512_256(save_data) === "76269d18c05c9ebec8a990a096cee046dea042a0421f8ab81d17f34dd1cdbdbf") {
        player.options.theme = "S2";
        player.options.secretThemeKey = save_data;
        setTheme(player.options.theme);
    } else if (sha512_256(save_data) === "d764e9a1d1e18081be19f3483b537ae1159ab40d10e096df1d9e857d68d6ba7a") {
        player.options.theme = "S3";
        player.options.secretThemeKey = save_data;
        setTheme(player.options.theme);
    } else if (sha512_256(save_data) === "ae0199482ecfa538a03eb37c67866e67a11f1832516c26c7939e971e514d40c5") {
        player.options.theme = "S4";
        player.options.secretThemeKey = save_data;
        setTheme(player.options.theme);
    }  else if (sha512_256(save_data) === "7a668b64cdfe1bcdf7a38d3858429ee21290268de66b9784afba27dc5225ce28") {
        player.options.theme = "S5";
        player.options.secretThemeKey = save_data;
        setTheme(player.options.theme);
    } else {
        save_data = JSON.parse(atob(save_data), function(k, v) { return (v === Infinity) ? "Infinity" : v; });
        if(verify_save(save_data)) forceHardReset = true
        if(verify_save(save_data)) document.getElementById("reset").click();
        forceHardReset = false
        if (!save_data || !verify_save(save_data)) {
            alert('could not load the save..');
            load_custom_game();
            return;
		}
        saved = 0;
        totalMult = 1
        currentMult = 1
        infinitiedMult = 1
        achievementMult = 1
        challengeMult = 1
        unspentBonus = 1
        infDimPow = 1
        postc8Mult = E(0)
        mult18 = E(1)
        ec10bonus = E(1)
        player = save_data;
        save_game();
        load_game();
        updateChallenges()
        transformSaveToDecimal()
    }
};




document.getElementById("reset").onclick = function () {
    if (forceHardReset) {
        if (window.location.href.split("//")[1].length > 20) set_save('dimensionTestSave2', currentSave, defaultStart);
        else set_save('dimensionSave2', currentSave, defaultStart);
        player = defaultStart
        infDimPow = 1;
        save_game();
        load_game();
        updateCosts();

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
        showDimTab('antimatterdimensions')
        updateTickSpeed();
        updateDimensions();
        updateChallenges();
        updateAutobuyers();
    } else if (confirm("Do you really want to erase all your progress?")) {
        if (window.location.href.split("//")[1].length > 20) set_save('dimensionTestSave2', currentSave, defaultStart);
        else set_save('dimensionSave2', currentSave, defaultStart);
        player = defaultStart
        infDimPow = 1;
        save_game();
        load_game();
        updateCosts();

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
        showDimTab('antimatterdimensions')
        updateTickSpeed();
        updateDimensions();
        updateChallenges();
        updateAutobuyers();
    }
};


function breakInfinity() {
    if (player.autobuyers[11]%1 === 0 || player.autobuyers[11].interval>100) return false
    if (player.break && !player.currentChallenge.includes("post")) {
        player.break = false
        document.getElementById("break").textContent = "BREAK INFINITY"
    } else {
        player.break = true
        document.getElementById("break").textContent = "FIX INFINITY"
        giveAchievement("Limit Break")
    }
}

function gainedInfinityPoints() {
    let div = 308;
    if (player.timestudy.studies.includes(111)) div = 285;
    else if (player.achievements.includes("r103")) div = 307.8;

    var ret = Decimal.pow(10, player.money.e/div -0.75).times(tmp.infMultUpg).times(kongIPMult)
    if (player.timestudy.studies.includes(41)) ret = ret.times(Decimal.pow(1.2, player.galaxies + player.replicanti.galaxies))
    if (player.timestudy.studies.includes(51)) ret = ret.times(1e15)
    if (player.timestudy.studies.includes(141)) ret = ret.times(E(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125))).max(1))
    if (player.timestudy.studies.includes(142)) ret = ret.times(1e25)
    if (player.timestudy.studies.includes(143)) ret = ret.times(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125)))
    if (player.achievements.includes("r116")) ret = ret.times(Decimal.pow(2, Math.log10(getInfinitied()+1)))
    if (player.achievements.includes("r125")) ret = ret.times(Decimal.pow(2, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.11)))
    if (player.dilation.upgrades.includes(9)) ret = ret.times(player.dilation.dilatedTime.add(1).pow(1000))
    return ret.floor()
}

function gainedEternityPoints() {
    var ret = Decimal.pow(5, player.infinityPoints.plus(gainedInfinityPoints()).e/308 -0.7).times(player.epmult).times(kongEPMult)
    if (player.timestudy.studies.includes(61)) ret = ret.times(10)
    if (player.timestudy.studies.includes(121)) ret = ret.times(((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5)) //x300 if tryhard, ~x60 if not
    else if (player.timestudy.studies.includes(122)) ret = ret.times(35)
    else if (player.timestudy.studies.includes(123)) ret = ret.times(Math.sqrt(1.39*player.thisEternity/10))

    return ret.floor()
}


function setAchieveTooltip() {
    var apocAchieve = document.getElementById("Antimatter Apocalypse");
    var noPointAchieve = document.getElementById("There's no point in doing that");
    var sanic = document.getElementById("Supersanic")
    var forgotAchieve = document.getElementById("I forgot to nerf that")
    var potato = document.getElementById("Faster than a potato")
    let potato2 = document.getElementById("Faster than a squared potato")
    let potato3 = document.getElementById("Faster than a potato^286078")
    var dimensional = document.getElementById("Multidimensional")
    var IPBelongs = document.getElementById("All your IP are belong to us")
    var reference = document.getElementById("Yet another infinity reference")
    let blink = document.getElementById("Blink of an eye")
    let exist = document.getElementById("This achievement doesn't exist")
    let exist2 = document.getElementById("This achievement doesn't exist II")
    let spare = document.getElementById("I got a few to spare")
    let speed = document.getElementById("Ludicrous Speed")
    let speed2 = document.getElementById("I brake for nobody")
    let overdrive = document.getElementById("MAXIMUM OVERDRIVE")
    let minute = document.getElementById("Minute of infinity")
    let infiniteIP = document.getElementById("Can you get infinite IP?")
    let over9000 = document.getElementById("IT'S OVER 9000")
    let dawg = document.getElementById("Yo dawg, I heard you liked infinities...")
    let eatass = document.getElementById("Like feasting on a behind")
    let layer = document.getElementById("But I wanted another prestige layer...")
    let fkoff = document.getElementById("What do I have to do to get rid of you")
    let minaj = document.getElementById("Popular music")
    let infstuff = document.getElementById("I never liked this infinity stuff anyway")
    let when = document.getElementById("When will it be enough?")
    let thinking = document.getElementById("Now you're thinking with dilation!")
    let thisis = document.getElementById("This is what I have to do to get rid of you.")

    apocAchieve.setAttribute('ach-tooltip', "Get over " + formatValue(player.options.notation, 1e80, 0, 0) + " antimatter.");
    noPointAchieve.setAttribute('ach-tooltip', "Buy a single First Dimension when you have over " + formatValue(player.options.notation, 1e150, 0, 0) + " of them. Reward: First Dimensions are 10% stronger.");
    forgotAchieve.setAttribute('ach-tooltip', "Get any Dimension multiplier over " + formatValue(player.options.notation, 1e31, 0, 0)) + ". Reward: First Dimensions are 5% stronger.";
    sanic.setAttribute('ach-tooltip', "Have antimatter/sec exceed your current antimatter above " + formatValue(player.options.notation, 1e63, 0, 0));
    potato.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e29, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");
    potato2.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e58, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");
    potato3.setAttribute('ach-tooltip', "Get more than "+shortenCosts(E("1e8296262"))+" ticks per second.")
    dimensional.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 1e12, 0, 0) + " of all dimensions except 8th.");
    IPBelongs.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e150)+" IP. Reward: Additional 4x multiplier to IP.")
    reference.setAttribute('ach-tooltip', "Get a x"+shortenDimensions(Number.MAX_VALUE)+" multiplier in a single sacrifice. Reward: Sacrifices are stronger.")
    blink.setAttribute('ach-tooltip', "Get to Infinity in under 200 milliseconds. Reward: Start with " + formatValue(player.options.notation, 1e25, 0, 0) + " antimatter and all dimensions are stronger in first 300ms of Infinity.");
    spare.setAttribute('ach-tooltip', "Reach " +formatValue(player.options.notation, E("1e35000"), 0, 0)+" antimatter. Reward: Dimensions are more powerful the more unspent antimatter you have.");
    //exist.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 9.9999e9999, 0, 0) + " antimatter. Reward: Dimensions are more powerful the more unspent antimatter you have."); (i like the 9 9s thing and no one will see it with a formatted value)
    //exist2.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 1e35000, 0, 0) + " antimatter. Reward: Dimensions are more powerful the more unspent antimatter you have.")
    speed.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e200)+" IP in 2 seconds or less. Reward: All dimensions are significantly stronger in first 5 seconds of infinity.")
    speed2.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e250)+" IP in 20 seconds or less. Reward: All dimensions are significantly stronger in first 60 seconds of infinity.")
    overdrive.setAttribute('ach-tooltip', "Big Crunch with " + shortenCosts(1e300) + " IP/min. Reward: Additional 4x multiplier to IP.")
    minute.setAttribute('ach-tooltip', "Reach " + shortenCosts(1e260) + " infinity power. Reward: Double infinity power gain.")
    infiniteIP.setAttribute('ach-tooltip', "Reach "+shortenCosts(E("1e30008"))+" IP.")
    over9000.setAttribute('ach-tooltip', "Get a total sacrifice multiplier of "+shortenCosts(E("1e9000"))+". Reward: Sacrifice doesn't reset your dimensions.")
    dawg.setAttribute('ach-tooltip', "Have all your past 10 infinities be at least "+shortenMoney(Number.MAX_VALUE)+" times higher IP than the previous one. Reward: Your antimatter doesn't reset on dimboost/galaxy.")
    eatass.setAttribute('ach-tooltip', "Reach "+shortenCosts(1e100)+" IP without any infinities or first dimensions. Reward: IP multiplier based on time spent this infinity.")
    layer.setAttribute('ach-tooltip', "Reach "+shortenMoney(Number.MAX_VALUE)+" EP.")
    fkoff.setAttribute('ach-tooltip', "Reach "+shortenCosts(E("1e22000"))+" IP without any time studies. Reward: Time dimensions are multiplied by the number of studies you have.")
    minaj.setAttribute('ach-tooltip', "Have 180 times more non-bonus replicanti galaxies than normal galaxies. Reward: Replicanti galaxies divide your replicanti by "+shortenMoney(Number.MAX_VALUE)+" instead of resetting them to 1.")
    infstuff.setAttribute('ach-tooltip', "Reach "+shortenCosts(E("1e140000"))+" IP without buying IDs or IP multipliers. Reward: You start eternities with all Infinity Challenges unlocked and completed.")
    when.setAttribute('ach-tooltip', "Reach "+shortenCosts( E("1e20000"))+" replicanti. Reward: You gain replicanti 2 times faster under "+shortenMoney(Number.MAX_VALUE)+" replicanti.")
    thinking.setAttribute('ach-tooltip', "Eternity for "+shortenCosts( E("1e600"))+" EP in 1 minute or less while dilated. Reward: Gain 2x Dilated Time and Time Theorems while dilated.")
    thisis.setAttribute('ach-tooltip', "Reach "+shortenCosts(E('1e20000'))+" IP without any time studies while dilated.")

    updateAchievementsTooltip()
}

document.getElementById("notation").onclick = function () {
    player.options.scientific = !player.options.scientific;
    if (player.options.notation === "Blind") {
        player.options.notation = "Scientific";
        document.getElementById("notation").textContent = ("Notation: Scientific")
    } else if (player.options.notation === "Scientific") {
        player.options.notation = "Engineering";
        document.getElementById("notation").textContent = ("Notation: Engineering")
    } else if (player.options.notation === "Engineering") {
        player.options.notation = "Letters";
        document.getElementById("notation").textContent = ("Notation: Letters")
    } else if (player.options.notation === "Letters") {
        player.options.notation = "Standard";
        document.getElementById("notation").textContent = ("Notation: Standard")
    } else if (player.options.notation === "Standard") {
        player.options.notation = "Emojis";
        document.getElementById("notation").textContent = ("Notation: Cancer")
    } else if (player.options.notation === "Emojis") {
        player.options.notation = "Mixed scientific";
        document.getElementById("notation").textContent = ("Notation: Mixed scientific")
    } else if (player.options.notation === "Mixed scientific") {
        player.options.notation = "Mixed engineering";
        document.getElementById("notation").textContent = ("Notation: Mixed engineering")
    } else if (player.options.notation === "Mixed engineering") {
        player.options.notation = "Logarithm";
        document.getElementById("notation").textContent = ("Notation: Logarithm")
    } else if (player.options.notation === "Logarithm") {
        player.options.notation = "Brackets";
        document.getElementById("notation").textContent = ("Notation: Brackets")
    } else if (player.options.notation === "Brackets") {
      player.options.notation = "Infinity";
      document.getElementById("notation").textContent = ("Notation: Infinity")
    } else if (player.options.notation === "Infinity") {
        blindTime = 0
        player.options.notation = "Blind";
        document.getElementById("notation").textContent = ("Notation: Blind")
    }

    updateLastTenRuns();
    updateLastTenEternities();
    updateTickSpeed();
    setAchieveTooltip();
    updateCosts();
    updateDilationUpgradeCosts()
    document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
};


document.getElementById("newsbtn").onclick = function() {
  if (!player.options.newsHidden) {
    document.getElementById("game").style.display = "none";
    player.options.newsHidden = true
  } else {
    document.getElementById("game").style.display = "block";
    player.options.newsHidden = false
    scrollNextMessage()
  }
}


function resetDimensions() {
    var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];

    for (i = 1; i <= 8; i++) {
        player[tiers[i] + "Amount"] = E(0)
        player[tiers[i] + "Pow"] = E(1)
    }
    player.firstCost = E(10)
    player.secondCost = E(100)
    player.thirdCost = E(10000)
    player.fourthCost = E(1e6)
    player.fifthCost = E(1e9)
    player.sixthCost = E(1e13)
    player.seventhCost = E(1e18)
    player.eightCost = E(1e24)
    player.eightPow = E(player.chall11Pow)
}

function calcSacrificeBoost() {
    if (player.firstAmount == 0) return E(1);
    if (player.challenges.includes("postc2")) {
        if (player.timestudy.studies.includes(228)) return player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.013).max(1)
        if (player.achievements.includes("r88")) return player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.011).max(1)
        return player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.01).max(1)
    }
    if (player.currentChallenge != "challenge11") {
        var sacrificePow=2;
        if (player.achievements.includes("r32")) sacrificePow += 0.2;
        if (player.achievements.includes("r57")) sacrificePow += 0.2; //this upgrade was too OP lol
        return Decimal.pow((player.firstAmount.e/10.0), sacrificePow).dividedBy(((Decimal.max(player.sacrificed.e, 1)).dividedBy(10.0)).pow(sacrificePow).max(1)).max(1);
    } else {
        return player.firstAmount.pow(0.05).dividedBy(player.sacrificed.pow(0.04).max(1)).max(1);
    }
}

function calcTotalSacrificeBoost() {
    if (player.sacrificed == 0) return E(1);
    if (player.challenges.includes("postc2")) {
        if (player.timestudy.studies.includes(228)) return player.sacrificed.pow(0.013).max(1)
        if (player.achievements.includes("r88")) return player.sacrificed.pow(0.011).max(1)
        else return player.sacrificed.pow(0.01)
    }
    if (player.currentChallenge != "challenge11") {
        var sacrificePow=2;
        if (player.achievements.includes("r32")) sacrificePow += 0.2;
        if (player.achievements.includes("r57")) sacrificePow += 0.2;
        return Decimal.pow((player.sacrificed.e/10.0), sacrificePow);
    } else {
        return player.sacrificed.pow(0.05) //this is actually off but like im not sure how youd make it good. not that it matters.
    }
}


function sacrifice(auto = false) {
    if (player.eightAmount == 0) return false;
    if (player.resets < 5) return false
    if (player.currentEternityChall == "eterc3") return false
    if (player.currentChallenge == "challenge11" && (tmp.sacPow.gte(Number.MAX_VALUE) || player.chall11Pow.gte(Number.MAX_VALUE))) return false
    if (!auto) floatText("eightD", "x" + shortenMoney(calcSacrificeBoost()))
    if (calcSacrificeBoost().gte(Number.MAX_VALUE)) giveAchievement("Yet another infinity reference");
    player.eightPow = player.eightPow.times(calcSacrificeBoost())
    player.sacrificed = player.sacrificed.plus(player.firstAmount);
    if (player.currentChallenge != "challenge11") {
        if (player.currentChallenge == "challenge7" && !player.achievements.includes("r118")) clearDimensions(6);
        else if (!player.achievements.includes("r118")) clearDimensions(7);
    } else {
        player.chall11Pow = player.chall11Pow.times(calcSacrificeBoost())
        if (!player.achievements.includes("r118")) resetDimensions();
        player.money = E(100)

    }
    if (tmp.sacPow >= 600) giveAchievement("The Gods are pleased");
    if (tmp.sacPow.gte("1e9000")) giveAchievement("IT'S OVER 9000");
}




document.getElementById("sacrifice").onclick = function () {
    if (player.options.sacrificeConfirmation && !document.getElementById("confirmation").checked) {
        if (!confirm("Dimensional Sacrifice will remove all of your first to seventh dimensions (with the cost and multiplier unchanged) for a boost to Eighth Dimension. It will take time to regain production.")) {
            return false;
        }
    }

    auto = false;
    return sacrifice();
}


function updateAutobuyers() {
    var autoBuyerDim1 = new Autobuyer (1)
    var autoBuyerDim2 = new Autobuyer (2)
    var autoBuyerDim3 = new Autobuyer (3)
    var autoBuyerDim4 = new Autobuyer (4)
    var autoBuyerDim5 = new Autobuyer (5)
    var autoBuyerDim6 = new Autobuyer (6)
    var autoBuyerDim7 = new Autobuyer (7)
    var autoBuyerDim8 = new Autobuyer (8)
    var autoBuyerDimBoost = new Autobuyer (9)
    var autoBuyerGalaxy = new Autobuyer (document.getElementById("secondSoftReset"))
    var autoBuyerTickspeed = new Autobuyer (document.getElementById("tickSpeed"))
    var autoBuyerInf = new Autobuyer (document.getElementById("bigcrunch"))
    var autoSacrifice = new Autobuyer(13)


    autoBuyerDim1.interval = 1500
    autoBuyerDim2.interval = 2000
    autoBuyerDim3.interval = 2500
    autoBuyerDim4.interval = 3000
    autoBuyerDim5.interval = 4000
    autoBuyerDim6.interval = 5000
    autoBuyerDim7.interval = 6000
    autoBuyerDim8.interval = 7500
    autoBuyerDimBoost.interval = 8000
    autoBuyerGalaxy.interval = 150000
    autoBuyerTickspeed.interval = 5000
    autoBuyerInf.interval = 300000

    autoSacrifice.interval = 100
    autoSacrifice.priority = 5

    autoBuyerDim1.tier = 1
    autoBuyerDim2.tier = 2
    autoBuyerDim3.tier = 3
    autoBuyerDim4.tier = 4
    autoBuyerDim5.tier = 5
    autoBuyerDim6.tier = 6
    autoBuyerDim7.tier = 7
    autoBuyerDim8.tier = 8
    autoBuyerTickSpeed.tier = 9

    if (player.challenges.includes("challenge1") && player.autobuyers[0] == 1) {
        player.autobuyers[0] = autoBuyerDim1
        document.getElementById("autoBuyer1").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge2") && player.autobuyers[1] == 2) {
        player.autobuyers[1] = autoBuyerDim2
        document.getElementById("autoBuyer2").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge3") && player.autobuyers[2] == 3) {
        player.autobuyers[2] = autoBuyerDim3
        document.getElementById("autoBuyer3").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge4") && player.autobuyers[9] == 10) {
        player.autobuyers[9] = autoBuyerDimBoost
        document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge5") && player.autobuyers[8] == 9) {
        player.autobuyers[8] = autoBuyerTickspeed
        document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge6") && player.autobuyers[4] == 5) {
        player.autobuyers[4] = autoBuyerDim5
        document.getElementById("autoBuyer5").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge7") && player.autobuyers[11] == 12) {
        player.autobuyers[11] = autoBuyerInf
        document.getElementById("autoBuyerInf").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge8") && player.autobuyers[3] == 4) {
        player.autobuyers[3] = autoBuyerDim4
        document.getElementById("autoBuyer4").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge9") && player.autobuyers[6] == 7) {
        player.autobuyers[6] = autoBuyerDim7
        document.getElementById("autoBuyer7").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge10") && player.autobuyers[5] == 6) {
        player.autobuyers[5] = autoBuyerDim6
        document.getElementById("autoBuyer6").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge11") && player.autobuyers[7] == 8) {
        player.autobuyers[7] = autoBuyerDim8
        document.getElementById("autoBuyer8").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge12") && player.autobuyers[10] == 11) {
        player.autobuyers[10] = autoBuyerGalaxy
        document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    }

    if (player.challenges.includes("postc2") && player.autoSacrifice == 1) {
        player.autoSacrifice = autoSacrifice
        document.getElementById("autoBuyerSac").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerSac").style.display = "none"
    }

    if (player.eternities < 100) {
        document.getElementById("autoBuyerEter").style.display = "none"
    }

    document.getElementById("autoBuyerQuantum").style.display = player.quantum.speedruns > 20 ? "inline-block" : "none"

    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) {
        document.getElementById("interval1").textContent = "Current interval: " + (player.autobuyers[0].interval/2000).toFixed(2) + " seconds"
        document.getElementById("interval2").textContent = "Current interval: " + (player.autobuyers[1].interval/2000).toFixed(2) + " seconds"
        document.getElementById("interval3").textContent = "Current interval: " + (player.autobuyers[2].interval/2000).toFixed(2) + " seconds"
        document.getElementById("interval4").textContent = "Current interval: " + (player.autobuyers[3].interval/2000).toFixed(2) + " seconds"
        document.getElementById("interval5").textContent = "Current interval: " + (player.autobuyers[4].interval/2000).toFixed(2) + " seconds"
        document.getElementById("interval6").textContent = "Current interval: " + (player.autobuyers[5].interval/2000).toFixed(2) + " seconds"
        document.getElementById("interval7").textContent = "Current interval: " + (player.autobuyers[6].interval/2000).toFixed(2) + " seconds"
        document.getElementById("interval8").textContent = "Current interval: " + (player.autobuyers[7].interval/2000).toFixed(2) + " seconds"
        document.getElementById("intervalTickSpeed").textContent = "Current interval: " + (player.autobuyers[8].interval/2000).toFixed(2) + " seconds"
        document.getElementById("intervalDimBoost").textContent = "Current interval: " + (player.autobuyers[9].interval/2000).toFixed(2) + " seconds"
        document.getElementById("intervalGalaxies").textContent = "Current interval: " + (player.autobuyers[10].interval/2000).toFixed(2) + " seconds"
        document.getElementById("intervalInf").textContent = "Current interval: " + (player.autobuyers[11].interval/2000).toFixed(2) + " seconds"
        document.getElementById("intervalSac").textContent = "Current interval: 0.05 seconds"
    } else {
        document.getElementById("interval1").textContent = "Current interval: " + (player.autobuyers[0].interval/1000).toFixed(2) + " seconds"
        document.getElementById("interval2").textContent = "Current interval: " + (player.autobuyers[1].interval/1000).toFixed(2) + " seconds"
        document.getElementById("interval3").textContent = "Current interval: " + (player.autobuyers[2].interval/1000).toFixed(2) + " seconds"
        document.getElementById("interval4").textContent = "Current interval: " + (player.autobuyers[3].interval/1000).toFixed(2) + " seconds"
        document.getElementById("interval5").textContent = "Current interval: " + (player.autobuyers[4].interval/1000).toFixed(2) + " seconds"
        document.getElementById("interval6").textContent = "Current interval: " + (player.autobuyers[5].interval/1000).toFixed(2) + " seconds"
        document.getElementById("interval7").textContent = "Current interval: " + (player.autobuyers[6].interval/1000).toFixed(2) + " seconds"
        document.getElementById("interval8").textContent = "Current interval: " + (player.autobuyers[7].interval/1000).toFixed(2) + " seconds"
        document.getElementById("intervalTickSpeed").textContent = "Current interval: " + (player.autobuyers[8].interval/1000).toFixed(2) + " seconds"
        document.getElementById("intervalDimBoost").textContent = "Current interval: " + (player.autobuyers[9].interval/1000).toFixed(2) + " seconds"
        document.getElementById("intervalGalaxies").textContent = "Current interval: " + (player.autobuyers[10].interval/1000).toFixed(2) + " seconds"
        document.getElementById("intervalInf").textContent = "Current interval: " + (player.autobuyers[11].interval/1000).toFixed(2) + " seconds"
        document.getElementById("intervalSac").textContent = "Current interval: 0.10 seconds"
    }

    var maxedAutobuy = 0;
    var e100autobuy = 0;
    for (let tier = 1; tier <= 8; ++tier) {
    document.getElementById("toggleBtn" + tier).style.display = "inline-block";
        if (player.autobuyers[tier-1].bulk >= 1e100) {
        player.autobuyers[tier-1].bulk = 1e100;
        document.getElementById("buyerBtn" + tier).textContent = shortenDimensions(player.autobuyers[tier-1].bulk)+"x bulk purchase";
        e100autobuy++;
        }
        else {
        if (player.autobuyers[tier-1].interval <= 100) {
            if (player.autobuyers[tier-1].bulk * 2 >= 1e100) {
                document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(1e100)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP";
            }
            else {
                document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(player.autobuyers[tier-1].bulk*2)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP";
            }
            maxedAutobuy++;
        }
        else document.getElementById("buyerBtn" + tier).innerHTML = "40% smaller interval <br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP"
        }
    }

    if (player.autobuyers[8].interval <= 100) {
        document.getElementById("buyerBtnTickSpeed").style.display = "none"
        document.getElementById("toggleBtnTickSpeed").style.display = "inline-block"
        maxedAutobuy++;
    }
    if (player.autobuyers[9].interval <= 100) {
        document.getElementById("buyerBtnDimBoost").style.display = "none"
        maxedAutobuy++;
    }
    if (player.autobuyers[10].interval <= 100) {
        document.getElementById("buyerBtnGalaxies").style.display = "none"
        maxedAutobuy++;
    }
    if (player.autobuyers[11].interval <= 100) {
        document.getElementById("buyerBtnInf").style.display = "none"
        maxedAutobuy++;
    }

    if (maxedAutobuy >= 9) giveAchievement("Age of Automation");
    if (maxedAutobuy >= 12) giveAchievement("Definitely not worth it");
    if (e100autobuy >= 8) giveAchievement("Professional bodybuilder");

    document.getElementById("buyerBtnTickSpeed").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[8].cost + " IP"
    document.getElementById("buyerBtnDimBoost").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[9].cost + " IP"
    document.getElementById("buyerBtnGalaxies").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[10].cost + " IP"
    document.getElementById("buyerBtnInf").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[11].cost + " IP"


    for (var i=0; i<8; i++) {
        if (player.autobuyers[i]%1 !== 0) document.getElementById("autoBuyer"+(i+1)).style.display = "inline-block"
    }
    if (player.autobuyers[8]%1 !== 0) document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    if (player.autobuyers[9]%1 !== 0) document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    if (player.autobuyers[10]%1 !== 0) document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    if (player.autobuyers[11]%1 !== 0) document.getElementById("autoBuyerInf").style.display = "inline-block"
    if (player.autoSacrifice%1 !== 0) document.getElementById("autoBuyerSac").style.display = "inline-block"

    for (var i=1; i<=12; i++) {
        player.autobuyers[i-1].isOn = document.getElementById(i + "ison").checked;
    }

    player.autoSacrifice.isOn = document.getElementById("13ison").checked
    player.eternityBuyer.isOn = document.getElementById("eternityison").checked
    player.quantum.buyer.isOn = document.getElementById("quantumison").checked
    priorityOrder()
}


/*function loadAutoBuyers() {
    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            switch(i) {
                case 8: player.autobuyers[i].target = "buyTickSpeed()";
                case 9: player.autobuyers[i].target = "document.getElementById('softReset').click";
                case 10: player.autobuyers[i].target = "document.getElementById('secondSoftReset').click";
                case 11: player.autobuyers[i].target = "document.getElementById('bigcrunch').click";
                default: player.autobuyers[i].target = "buyOneDimension(" + i+1 + ")";
            }
        }
    }

}*/


function autoBuyerArray() {
    var tempArray = []
    for (var i=0; i<player.autobuyers.length && i<9; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            tempArray.push(player.autobuyers[i])
        }
    }
    return tempArray;
}


var priority = []


function priorityOrder() {
    var tempArray = []
    var i = 1;
    while(tempArray.length != autoBuyerArray().length) {

        for (var x=0 ; x< autoBuyerArray().length; x++) {
            if (autoBuyerArray()[x].priority == i) tempArray.push(autoBuyerArray()[x])
        }
        i++;
    }
    priority = tempArray;
}

function fromValue(value) {
  value = value.replace(/,/g, '')
  if (value.toUpperCase().split("E").length > 2 && value.split(" ")[0] !== value) {
      var temp = E(0)
      temp.mantissa = parseFloat(value.toUpperCase().split("E")[0])
      temp.exponent = parseFloat(value.toUpperCase().split("E")[1]+"e"+value.toUpperCase().split("E")[2])
      value = temp.toString()
  }
  if (value.includes(" ")) {
    const prefixes = [['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
    ['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn'],
    ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']]
    const prefixes2 = ['', 'MI', 'MC', 'NA', 'PC', 'FM', ' ']
    let e = 0;
    let m,k,l;
    if (value.split(" ")[1].length < 5) {
        for (l=101;l>0;l--) {
            if (value.includes(FormatList[l])) {
                e += l*3
                console.log("caught!"+l)

                break
            }
        }
        return Decimal.fromMantissaExponent(parseInt(value.split(" ")[0]), e)
    }
    for (let i=1;i<5;i++) {
        if (value.includes(prefixes2[i])) {
            m = value.split(prefixes2[i])[1]
            for (k=0;k<3;k++) {
                for (l=1;l<10;l++) {
                    if (m.includes(prefixes[k][l])) break;
                }
                if (l != 10) e += Math.pow(10,k)*l;
            }
            break;
        }
        return Decimal.fromMantissaExponent(value.split, e*3)
    }
    for (let i=1;i<=5;i++) {
        if (value.includes(prefixes2[i])) {
            for (let j=1;j+i<6;j++) {
                if (value.includes(prefixes2[i+j])) {
                    m=value.split(prefixes2[i+j])[1].split(prefixes2[i])[0]
                    if (m == "") e += Math.pow(1000,i);
                    else {
                        for (k=0;k<3;k++) {
                            for (l=1;l<10;l++) {
                                if (m.includes(prefixes[k][l])) break;
                            }
                            if (l != 10) e += Math.pow(10,k+i*3)*l;
                        }
                    }
                    break;
                }
            }
        }
    }
    return Decimal.fromMantissaExponent(parseFloat(value), i*3+3)
    //return parseFloat(value) + "e" + (e*3+3)
  }
  if (!isFinite(parseFloat(value[value.length-1]))) { //needs testing
    const l = " abcdefghijklmnopqrstuvwxyz"
    const v = value.replace(parseFloat(value),"")
    let e = 0;
    for (let i=0;i<v.length;i++) {
        for (let j=1;j<27;j++) {
            if (v[i] == l[j]) e += Math.pow(26,v.length-i-1)*j
        }
    }
    return Decimal.fromMantissaExponent(parseFloat(value), e*3)
    //return parseFloat(value) + "e" + (e*3)
  }
  value = value.replace(',','')
  if (value.split("e")[0] === "") return Decimal.fromMantissaExponent(Math.pow(10,parseFloat(value.split("e")[1])%1), parseInt(value.split("e")[1]))
  return Decimal.fromString(value)
}

function updatePriorities() {
    auto = false;
    for (var x=0 ; x < autoBuyerArray().length; x++) {
        if (x < 9) autoBuyerArray()[x].priority = parseInt(document.getElementById("priority" + (x+1)).value)
    }
    if (parseInt(document.getElementById("priority10").value) === 69
    || parseInt(document.getElementById("priority11").value) === 69
    || parseInt(fromValue(document.getElementById("priority12").value).toString()) === 69
    || parseInt(document.getElementById("bulkDimboost").value) === 69
    || parseInt(document.getElementById("overGalaxies").value) === 69
    || parseInt(fromValue(document.getElementById("prioritySac").value).toString()) === 69
    || parseInt(document.getElementById("bulkgalaxy").value) === 69
    || parseInt(fromValue(document.getElementById("priority13").value).toString()) === 69
    || parseInt(fromValue(document.getElementById("priority14").value).toString()) === 69) giveAchievement("Nice.");
    player.autobuyers[9].priority = parseInt(document.getElementById("priority10").value)
    player.autobuyers[10].priority = parseInt(document.getElementById("priority11").value)
    player.autobuyers[11].priority = fromValue(document.getElementById("priority12").value)
    if (player.eternities < 10) {
        var bulk = Math.floor(Math.max(parseFloat(document.getElementById("bulkDimboost").value), 1))
    } else {
        var bulk = Math.max(parseFloat(document.getElementById("bulkDimboost").value), 0.05)
    }
    player.autobuyers[9].bulk = (isNaN(bulk)) ? 1 : bulk
    player.overXGalaxies = parseInt(document.getElementById("overGalaxies").value)
    player.autoSacrifice.priority = fromValue(document.getElementById("prioritySac").value)
    if (isNaN(player.autoSacrifice.priority) || player.autoSacrifice.priority === null || player.autoSacrifice.priority === undefined || player.autoSacrifice.priority <= 1) player.autoSacrifice.priority = Decimal.fromNumber(1.01)
    player.autobuyers[10].bulk = parseFloat(document.getElementById("bulkgalaxy").value)
    const eterValue = fromValue(document.getElementById("priority13").value)
    if (!isNaN(eterValue)) player.eternityBuyer.limit = eterValue

    const quarkValue = fromValue(document.getElementById("priority14").value)
    if (!isNaN(quarkValue)) player.quantum.buyer.limit = quarkValue

    priorityOrder()
}

function updateCheckBoxes() {
    for (var i = 0; i < 12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            if (player.autobuyers[i].isOn) document.getElementById((i+1) + "ison").checked = "true";
            else document.getElementById((i+1) + "ison").checked = ""
        }
    }
    if (player.autoSacrifice.isOn) document.getElementById("13ison").checked = "true"
    else document.getElementById("13ison").checked = ""
    document.getElementById("eternityison").checked = player.eternityBuyer.isOn
    document.getElementById("quantumison").checked = player.quantum.buyer.isOn
}


function toggleAutoBuyers() {
    var bool = player.autobuyers[0].isOn
    for (var i = 0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            player.autobuyers[i].isOn = !bool
        }
    }
    player.autoSacrifice.isOn = !bool
    player.eternityBuyer.isOn = !bool
    player.quantum.buyer.isOn = !bool
    updateCheckBoxes()
    updateAutobuyers()
}

function toggleBulk() {

    if (player.options.bulkOn) {
        player.options.bulkOn = false
        document.getElementById("togglebulk").textContent = "Enable bulk buy"
    } else {
        player.options.bulkOn = true
        document.getElementById("togglebulk").textContent = "Disable bulk buy"
    }
}

function toggleHotkeys() {
    if (player.options.hotkeys) {
        player.options.hotkeys = false
        document.getElementById("hotkeys").textContent = "Enable hotkeys"
    } else {
        player.options.hotkeys = true
        document.getElementById("hotkeys").textContent = "Disable hotkeys"
    }
}








function updateChallengeTimes() {
document.getElementById("challengetime2").textContent = "Challenge  " + 2 + " time record: " + timeDisplayShort(player.challengeTimes[0])
    document.getElementById("challengetime3").textContent = "Challenge  " + 3 + " time record: " + timeDisplayShort(player.challengeTimes[1])
    document.getElementById("challengetime4").textContent = "Challenge  " + 4 + " time record: " + timeDisplayShort(player.challengeTimes[6])
    document.getElementById("challengetime5").textContent = "Challenge  " + 5 + " time record: " + timeDisplayShort(player.challengeTimes[4])
    document.getElementById("challengetime6").textContent = "Challenge  " + 6 + " time record: " + timeDisplayShort(player.challengeTimes[8])
    document.getElementById("challengetime7").textContent = "Challenge  " + 7 + " time record: " + timeDisplayShort(player.challengeTimes[7])
    document.getElementById("challengetime8").textContent = "Challenge  " + 8 + " time record: " + timeDisplayShort(player.challengeTimes[9])
    document.getElementById("challengetime9").textContent = "Challenge  " + 9 + " time record: " + timeDisplayShort(player.challengeTimes[3])
    document.getElementById("challengetime10").textContent = "Challenge " + 10 + " time record: " + timeDisplayShort(player.challengeTimes[2])
    document.getElementById("challengetime11").textContent = "Challenge " + 11 + " time record: " + timeDisplayShort(player.challengeTimes[10])
    document.getElementById("challengetime12").textContent = "Challenge " + 12 + " time record: " + timeDisplayShort(player.challengeTimes[5])
	var temp = 0
	for (var i=0; i<11; i++) {
		temp += player.challengeTimes[i]
	}
	document.getElementById("challengetimesum").textContent = "Sum of challenge time records is " + timeDisplayShort(temp)

	temp = 0
    for (var i=0; i<8; i++) {
        document.getElementById("infchallengetime"+(i+1)).textContent = "Infinity Challenge " + (i+1) + " time record: " + timeDisplayShort(player.infchallengeTimes[i])
		temp += player.infchallengeTimes[i]
    }
	document.getElementById("infchallengetimesum").textContent = "Sum of infinity challenge time records is " + timeDisplayShort(temp)
    updateWorstChallengeTime();
}

var bestRunIppm = E(0)
function updateLastTenRuns() {
    let tempBest = E(0)
    var tempTime = E(0)
    var tempIP = E(0)
    for (var i=0; i<10;i++) {
        tempTime = tempTime.plus(player.lastTenRuns[i][0])
        tempIP = tempIP.plus(player.lastTenRuns[i][1])
    }
    tempTime = tempTime.dividedBy(10)
    tempIP = tempIP.dividedBy(10)
    for (var i=0; i<10; i++) {
        var ippm = player.lastTenRuns[i][1].dividedBy(player.lastTenRuns[i][0]/600)
        if (ippm.gt(tempBest)) tempBest = ippm
        var tempstring = shorten(ippm) + " IP/min"
        if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
        document.getElementById("run"+(i+1)).textContent = "The infinity "+(i+1)+" infinities ago took " + timeDisplayShort(player.lastTenRuns[i][0]) + " and gave " + shortenDimensions(player.lastTenRuns[i][1]) +" IP. "+ tempstring
    }

    var ippm = tempIP.dividedBy(tempTime/600)
    var tempstring = shorten(ippm) + " IP/min"
    if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
    document.getElementById("averagerun").textContent = "Last 10 infinities average time: "+ timeDisplayShort(tempTime)+" Average IP gain: "+shortenDimensions(tempIP)+" IP. "+tempstring

    if (tempBest.gte(1e8)) giveAchievement("Oh hey, you're still here");
    if (tempBest.gte(1e300)) giveAchievement("MAXIMUM OVERDRIVE");

    bestRunIppm = tempBest
}

var averageEp = E(0)
function updateLastTenEternities() {
    let tempBest = 0
    var tempTime = E(0)
    var tempEP = E(0)
    for (var i=0; i<10;i++) {
        tempTime = tempTime.plus(player.lastTenEternities[i][0])
        tempEP = tempEP.plus(player.lastTenEternities[i][1])
    }
    tempTime = tempTime.dividedBy(10)
    tempEP = tempEP.dividedBy(10)
    for (var i=0; i<10; i++) {
        var eppm = player.lastTenEternities[i][1].dividedBy(player.lastTenEternities[i][0]/600)
        if (eppm.gt(tempBest)) tempBest = eppm
        var tempstring = shorten(eppm) + " EP/min"
        if (eppm<1) tempstring = shorten(eppm*60) + " EP/hour"
        document.getElementById("eternityrun"+(i+1)).textContent = "The Eternity "+(i+1)+" eternities ago took " + timeDisplayShort(player.lastTenEternities[i][0]) + " and gave " + shortenDimensions(player.lastTenEternities[i][1]) +" EP. "+ tempstring
    }

    var eppm = tempEP.dividedBy(tempTime/600)
    var tempstring = shorten(eppm) + " EP/min"
    averageEp = tempEP
    if (eppm<1) tempstring = shorten(eppm*60) + " EP/hour"
    document.getElementById("averageEternityRun").textContent = "Last 10 eternities average time: "+ timeDisplayShort(tempTime)+" Average EP gain: "+shortenDimensions(tempEP)+" EP. "+tempstring
}

function addEternityTime(time, ep) {
    for (var i=player.lastTenEternities.length-1; i>0; i--) {
        player.lastTenEternities[i] = player.lastTenEternities[i-1]
    }
    player.lastTenEternities[0] = [time, ep]
}


document.getElementById("postInfinityButton").onclick = function() {document.getElementById("bigcrunch").click()}

function addTime(time, ip) {
    for (var i=player.lastTenRuns.length-1; i>0; i--) {
        player.lastTenRuns[i] = player.lastTenRuns[i-1]
    }
    player.lastTenRuns[0] = [time, ip]
}

var infchallengeTimes = 999999999

function checkForEndMe() {
    var temp = 0
    for (var i=0; i<11; i++) {
        temp += player.challengeTimes[i]
    }
    if (temp <= 1800) giveAchievement("Not-so-challenging")
    if (temp <= 50) giveAchievement("End me")
    var temp2 = 0
    for (var i=0; i<8;i++) {
        temp2 += player.infchallengeTimes[i]
    }
    infchallengeTimes = temp2
    if (temp2 <= 66.6) giveAchievement("Yes. This is hell.")
}


document.getElementById("bigcrunch").onclick = function () {
    var challNumber = parseInt(player.currentChallenge[player.currentChallenge.length-1])
    if (player.currentChallenge.length == 11) challNumber = parseInt("1"+player.currentChallenge[player.currentChallenge.length-1])
    if ((player.money.gte(Number.MAX_VALUE) && !player.currentChallenge.includes("post")) || (player.currentChallenge !== "" && player.money.gte(player.challengeTarget))) {
        if ((player.bestInfinityTime > 600 && !player.break) && player.eternities === 0 && implosionCheck === 0 && player.options.animations.bigCrunch) {
            implosionCheck = 1;
            document.getElementById("body").style.animation = "implode 2s 1";
            setTimeout(function(){ document.getElementById("body").style.animation = ""; }, 2000)
            setTimeout(function(){ document.getElementById("bigcrunch").onclick(); }, 1000)
            return
        }
        implosionCheck = 0;
        if (player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
        if (player.thisInfinityTime <= 6000) giveAchievement("That's faster!")
        if (player.thisInfinityTime <= 600) giveAchievement("Forever isn't that long")
        if (player.thisInfinityTime <= 2) giveAchievement("Blink of an eye")
        if (player.eightAmount == 0) giveAchievement("You didn't need it anyway");
        if (player.galaxies == 1) giveAchievement("Claustrophobic");
        if (player.galaxies == 0 && player.resets == 0) giveAchievement("Zero Deaths")
        if (player.currentChallenge == "challenge2" && player.thisInfinityTime <= 1800) giveAchievement("Many Deaths")
        if (player.currentChallenge == "challenge11" && player.thisInfinityTime <= 1800) giveAchievement("Gift from the Gods")
        if (player.currentChallenge == "challenge5" && player.thisInfinityTime <= 1800) giveAchievement("Is this hell?")
        if (player.currentChallenge == "challenge3" && player.thisInfinityTime <= 100) giveAchievement("You did this again just for the achievement right?");
        if (player.firstAmount == 1 && player.resets == 0 && player.galaxies == 0 && player.currentChallenge == "challenge12") giveAchievement("ERROR 909: Dimension not found")
        if (player.currentChallenge != "" && player.challengeTimes[challNumber-2] > player.thisInfinityTime) player.challengeTimes[challNumber-2] = player.thisInfinityTime
        if (player.currentChallenge.includes("post") && player.infchallengeTimes[challNumber-1] > player.thisInfinityTime) player.infchallengeTimes[challNumber-1] = player.thisInfinityTime
        if (player.currentChallenge == "postc5" && player.thisInfinityTime <= 100) giveAchievement("Hevipelle did nothing wrong")
        if ((player.bestInfinityTime > 600 && !player.break) || (player.currentChallenge != "" && !player.options.retryChallenge)) showTab("dimensions")
        if (player.currentChallenge == "challenge5") {
            kong.submitStats('Challenge 9 time record (ms)', Math.floor(player.thisInfinityTime*100));
        }
        if (player.currentChallenge != "" && !player.challenges.includes(player.currentChallenge)) {
            player.challenges.push(player.currentChallenge);
        }
        if (player.challenges.length > 12) giveAchievement("Infinitely Challenging");
        if (player.challenges.length == 20) giveAchievement("Anti-antichallenged");
        if (!player.break || player.currentChallenge != "") {
            var add = tmp.infMultUpg.times(kongIPMult)
            if (player.timestudy.studies.includes(51)) add = add.times(1e15)
            player.infinityPoints = player.infinityPoints.plus(add);
            addTime(player.thisInfinityTime, add)
        }
        else {
            player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints())
            addTime(player.thisInfinityTime, gainedInfinityPoints())
            if (gainedInfinityPoints().gte(1e150)) giveAchievement("All your IP are belong to us")
            if (gainedInfinityPoints().gte(1e200) && player.thisInfinityTime <= 20) giveAchievement("Ludicrous Speed")
            if (gainedInfinityPoints().gte(1e250) && player.thisInfinityTime <= 200) giveAchievement("I brake for nobody")
        }
        if (!player.achievements.includes("r111") && player.lastTenRuns[9][1] != 1) {
            var n = 0;
            for (i=0; i<9; i++) {
                if (player.lastTenRuns[i][1].gte(player.lastTenRuns[i+1][1].times(Number.MAX_VALUE))) n++;
            }
            if (n == 9) giveAchievement("Yo dawg, I heard you liked infinities...")
        }
        let infGain = tmp.infGain
        if (player.currentEternityChall == "eterc4") {
            infGain = 1
            if (player.infinitied >= 16 - (ECTimesCompleted("eterc4")*4)) {
                document.getElementById("challfail").style.display = "block"
                setTimeout(exitChallenge, 500)
                giveAchievement("You're a mistake")
                failureCount++
                if (failureCount > 9) giveAchievement("You're a failure")
            }
        }
        if (autoS && auto) {
          if (gainedInfinityPoints().dividedBy(player.thisInfinityTime).gt(player.autoIP) && !player.break) player.autoIP = gainedInfinityPoints().dividedBy(player.thisInfinityTime);
          if (player.thisInfinityTime<player.autoTime) player.autoTime = player.thisInfinityTime;
        }
        auto = autoS; //only allow autoing if prev crunch was autoed
        autoS = true;

        doCrunchResetStuff()

        if (player.bestInfinityTime <= 0.01) giveAchievement("Less than or equal to 0.001");

        if (!player.options.retryChallenge) player.currentChallenge = ""

        if (player.resets == 0 && player.currentChallenge == "") {
            if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
            if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
            if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
            if (player.infinityUpgrades.includes("skipResetGalaxy")) {
                player.resets++;
                if (player.galaxies == 0) player.galaxies = 1
            }
        }

        if (player.replicanti.unl && !player.achievements.includes("r95")) player.replicanti.amount = E(1)

        if (player.quantum.speedruns<=22) player.replicanti.galaxies = (player.timestudy.studies.includes(33)) ? Math.floor(player.replicanti.galaxies/2) :0

        setInitialDimensionPower();


        if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") document.getElementById("matter").style.display = "block";
        else document.getElementById("matter").style.display = "none";

        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."

        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));
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
        document.getElementById("matter").style.display = "none";
        document.getElementById("quickReset").style.display = "none";

        checkForEndMe()

        kong.submitStats('Infinitied', getInfinitied());
        kong.submitStats('Fastest Infinity time (ms)', Math.floor(player.bestInfinityTime * 100));
        giveAchievement("To infinity!");
        if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");


        updateAutobuyers();
        if (player.challenges.includes("challenge1")) player.money = E(100)
        if (player.achievements.includes("r37")) player.money = E(1000);
        if (player.achievements.includes("r54")) player.money = E(2e5);
        if (player.achievements.includes("r55")) player.money = E(1e10);
        if (player.achievements.includes("r78")) player.money = E(1e25);
        if (player.challenges.length >= 2) giveAchievement("Daredevil");
        if (player.challenges.length == 12) giveAchievement("AntiChallenged");
        resetInfDimensions();
        player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce, player.totalTickGained))
        updateTickSpeed();
        if (player.challenges.length == 20) giveAchievement("Anti-antichallenged");
        IPminpeak = E(0)


        if (player.eternities > 10 && player.currentEternityChall !== "eterc8" && player.currentEternityChall !== "eterc2" && player.currentEternityChall !== "eterc10" && !inEC(14)) {
            for (var i=1;i<player.eternities-9 && i < 9; i++) {
                if (player.infDimBuyers[i-1]) {
                    buyMaxInfDims(i)
                    buyManyInfinityDimension(i)
                }
            }
        }

        if (getEternitied() >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8" && isChanceAffordable()) {
            var bought = Math.min(Math.max(Math.floor(player.infinityPoints.div(player.replicanti.chanceCost).log(1e15) + 1), 0), hasGluonUpg('gb3')?1/0:100-Math.round(player.replicanti.chance*100))
            player.replicanti.chance = Math.round(player.replicanti.chance*100+bought)/100
            player.replicanti.chanceCost = player.replicanti.chanceCost.times(Decimal.pow(1e15, bought))
        }

        if (player.eternities >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
            while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && isIntervalAffordable()) upgradeReplicantiInterval()
        }

        if (player.eternities >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") {
            autoBuyRG()
        }

        if (QCCompleted(2) && player.replicanti.auto[3] && player.currentEternityChall !== "eterc8") {
            buyReplicantiUpgrade4(true)
        }

        Marathon2 = 0;

    }
  updateChallenges();
  updateChallengeTimes()
  updateLastTenRuns()

    updateTemp()
}


function respecToggle() {
    if (player.respec) {
        player.respec = false
        document.getElementById("respec").className = "storebtn"
    } else {
        player.respec = true
        document.getElementById("respec").className = "timestudybought"
    }
}

function eternity(force, auto, noGain) {
    if ((player.infinityPoints.gte(Number.MAX_VALUE) && (!player.options.eternityconfirm || auto || confirm("Eternity will reset everything except achievements and challenge records. You will also gain an Eternity point and unlock various upgrades."))) || force === true) {
        if (force) player.currentEternityChall = "";
        if (player.currentEternityChall !== "" && player.infinityPoints.lt(player.eternityChallGoal)) return false
        if (player.thisEternity<player.bestEternity && !force) {
            player.bestEternity = player.thisEternity
            if (player.bestEternity < 300) giveAchievement("That wasn't an eternity");
            if (player.bestEternity <= 0.01) giveAchievement("Less than or equal to 0.001");
        }
        if (player.thisEternity < 2) giveAchievement("Eternities are the new infinity")
        updateMultDecreases()
        if (player.infinitied < 10 && !force) giveAchievement("Do you really need a guide for this?");
        if (Decimal.round(player.replicanti.amount) == 9) giveAchievement("We could afford 9");
        if (player.dimlife && !force) giveAchievement("8 nobody got time for that")
        if (player.dead && !force) giveAchievement("You're already dead.")
        if (player.infinitied <= 1 && !force) giveAchievement("Do I really need to infinity")
        if (gainedEternityPoints().gte("1e600") && player.thisEternity <= 600 && player.dilation.active && !force) giveAchievement("Now you're thinking with dilation!")
        temp = []
        if (!noGain) {
            player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints())
            addEternityTime(player.thisEternity, gainedEternityPoints())
            player.eternities += player.achievements.includes('r151')?25:1
        }
        if (player.currentEternityChall !== "") {
            if (player.eternityChalls[player.currentEternityChall] === undefined) {
                player.eternityChalls[player.currentEternityChall] = 1
            } else if (player.eternityChalls[player.currentEternityChall] < 5) player.eternityChalls[player.currentEternityChall] += 1
            player.etercreq = 0
            respecTimeStudies(parseInt(player.currentEternityChall.split('eterc')[1]<=12?1:2))
            if (Object.keys(player.eternityChalls).length >= 10) {
                var eterchallscompletedtotal = 0;
                for (i=1; i<Object.keys(player.eternityChalls).length+1; i++) {
                    eterchallscompletedtotal += player.eternityChalls["eterc"+i]
                }
                if (eterchallscompletedtotal >= 50) {
                    giveAchievement("5 more eternities until the update");
                }
            }
        }
        for (var i=0; i<player.challenges.length; i++) {
            if (!player.challenges[i].includes("post") && player.eternities > 1) temp.push(player.challenges[i])
        }
        if (player.timestudy.studies.includes(191)) player.infinitiedBank += Math.floor(player.infinitied*0.05)
        if (player.achievements.includes("r131")) player.infinitiedBank += Math.floor(player.infinitied*0.05)
        if (player.infinitiedBank > 5000000000) giveAchievement("No ethical consumption");
        if (player.dilation.active && (!force || player.infinityPoints.gte(Number.MAX_VALUE))) {
            const tachyonGain = Decimal.max(tmp.tachyonGain.sub(player.dilation.totalTachyonParticles), 0)
            player.dilation.totalTachyonParticles = player.dilation.totalTachyonParticles.plus(tachyonGain)
            player.dilation.tachyonParticles = player.dilation.tachyonParticles.plus(tachyonGain)
        }
        player.challenges = temp

        player.dilation.active = false
        doEternityResetStuff()
        setInitialDimensionPower()
        if (player.respec) respecTimeStudies()
        player.respec = false
        giveAchievement("Time is relative")
        if (player.eternities >= 100) giveAchievement("This mile took an Eternity");
        if (player.replicanti.unl) player.replicanti.amount = E(1)
        player.replicanti.galaxies = 0
        document.getElementById("respec").className = "storebtn"
        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);

        if (player.eternities <= 30) {
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
        document.getElementById("matter").style.display = "none";
        document.getElementById("quickReset").style.display = "none";
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");
        var autobuyers = document.getElementsByClassName('autoBuyerDiv')
        if (player.eternities < 2) {
            for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
            document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
            document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
            document.getElementById("buyerBtnInf").style.display = "inline-block"
            document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
        }
        updateAutobuyers();
        if (player.achievements.includes("r37")) player.money = E(1000);
        if (player.achievements.includes("r54")) player.money = E(2e5);
        if (player.achievements.includes("r55")) player.money = E(1e10);
        if (player.achievements.includes("r78")) player.money = E(1e25);
        if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r104")) player.infinityPoints = E(2e25);
        updateChallenges();
        updateChallengeTimes()
        updateLastTenRuns()
        updateLastTenEternities()
        if (!player.achievements.includes("r133")) {
            var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
            for (var i = 0; i< infchalls.length; i++) infchalls[i].style.display = "none"
        }
        IPminpeak = E(0)
        EPminpeak = E(0)
        updateMilestones()
        resetTimeDimensions()
        if (player.eternities < 20) player.autobuyers[9].bulk = 1
        if (player.eternities < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
        if (player.eternities < 50) {
            document.getElementById("replicantidiv").style.display="none"
            document.getElementById("replicantiunlock").style.display="inline-block"
        } else if (document.getElementById("replicantidiv").style.display === "none" && player.eternities >= 50) {
            document.getElementById("replicantidiv").style.display="inline-block"
            document.getElementById("replicantiunlock").style.display="none"
        }
        kong.submitStats('Eternities', player.eternities);
        if (player.eternities > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
        document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        if (player.eternities < 2) document.getElementById("break").textContent = "BREAK INFINITY"
        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."
        document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
        document.getElementById("eternityPoints2").style.display = "inline-block"
        document.getElementById("eternitystorebtn").style.display = "inline-block"
        document.getElementById("infiMult").innerHTML = "You get "+tmp.inf_mult_base.toFixed(1)+"x more IP.<br>Currently: "+shorten(tmp.infMultUpg.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        updateEternityUpgrades()
        updateTickSpeed();
        playerInfinityUpgradesOnEternity()
        document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
        updateEternityChallenges()
        if (player.eternities <= 1) {
            showTab("dimensions")
            showDimTab("timedimensions")
            loadAutoBuyerSettings()
        }
        doAutoEterTick()
        Marathon2 = 0;

        updateTemp()
    }

    updateTemp()
}

function doAutoEterTick() {
	if (player.achievements.includes("r146")) {
		for (var d = 1; d < 9; d++) if (player.autoEterOptions["td" + d]) buyMaxTimeDimension(d)
		if (player.autoEterOptions.epmult) buyMaxEPMult()
	}
	//if (player.autoEterOptions.tt && !player.dilation.upgrades.includes(10) && speedrunMilestonesReached > 1) maxTheorems()
}

function updateR146Reward(){
	document.getElementById('epmultauto').style.display=player.achievements.includes("r146")?"":"none"
	for (i=1;i<9;i++) document.getElementById("td"+i+'auto').style.visibility=player.achievements.includes("r146")?"visible":"hidden"
	document.getElementById('togglealltimedims').style.visibility=player.achievements.includes("r146")?"visible":"hidden"
}

function toggleAutoEter(id) {
	player.autoEterOptions[id] = !player.autoEterOptions[id]
	//document.getElementById(id + 'auto').textContent = (id == "dilUpgs" ? "Auto-buy dilation upgrades" : (id == "rebuyupg" ? "Rebuyable upgrade a" : id == "metaboost" ? "Meta-boost a" : "A") + "uto") + ": " + (player.autoEterOptions[id] ? "ON" : "OFF")
	if (id.slice(0,2) == "td") {
		var removeMaxAll = false
		for (var d = 1; d < 9; d++) {
			if (player.autoEterOptions["td" + d]) {
				if (d > 7) removeMaxAll = true
			} else break
		}
		document.getElementById("maxTimeDimensions").style.display = removeMaxAll ? "none" : ""
	}
}

function exitChallenge() {
    if (player.currentChallenge !== "") {
        document.getElementById(player.currentChallenge).textContent = "Start"
        startChallenge("");
        updateChallenges();
    } else if (player.currentEternityChall !== "") {
        player.currentEternityChall = ""
        player.eternityChallGoal = E(Number.MAX_VALUE)
        eternity(true)
        updateEternityChallenges();
    } else if (player.quantum.chal.active > 0) {
        player.quantum.chal.active = 0
        quantumReset(true)
    }
}

function startChallenge(name, target) {
  if(player.options.challConf || name == "" ? true : (name.includes("post")) ? confirm("You will start over with just your infinity upgrades, and achievements. You need to reach a set goal with special conditions. NOTE: The rightmost infinity upgrade column doesn't work on challenges.") : confirm("You will start over with just your infinity upgrades, and achievements. You need to reach infinity with special conditions. NOTE: The rightmost infinity upgrade column doesn't work on challenges.")) {
    if (player.currentChallenge != "") document.getElementById(player.currentChallenge).textContent = "Start"
    
    doNormalChallengeResetStuff()
	player.currentChallenge = name
	player.challengeTarget = target

	if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
        player.thirdCost = E(100)
        player.fourthCost = E(500)
        player.fifthCost = E(2500)
        player.sixthCost = E(2e4)
        player.seventhCost = E(2e5)
        player.eightCost = E(4e6)
    }
    if (player.currentChallenge == "postc1") player.costMultipliers = [E(1e3),E(5e3),E(1e4),E(1.2e4),E(1.8e4),E(2.6e4),E(3.2e4),E(4.2e4)];
    if (player.currentChallenge == "postc2") {
        player.eightAmount = E(1);
        player.eightBought = 1;
        player.resets = 4;
    }

    if (player.replicanti.unl) player.replicanti.amount = E(1)
    player.replicanti.galaxies = 0

    // even if we're in a challenge, apparently if it's challenge 2 we might have four resets anyway.
    setInitialDimensionPower();

    IPminpeak = E(0)
    if (player.currentChallenge.includes("post")) player.break = true
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));

    if (player.eternities < 30) {
        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
    }
    document.getElementById("fifthRow").style.display= "none";
    document.getElementById("sixthRow").style.display= "none";
    document.getElementById("seventhRow").style.display= "none";
    document.getElementById("eightRow").style.display= "none";
    if (name == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") document.getElementById("matter").style.display = "block";
    else document.getElementById("matter").style.display = "none";

    if (name == "challenge12" || name == "challenge9" || name == "challenge5" || player.currentChallenge == "postc1" || player.currentChallenge == "postc4" || player.currentChallenge == "postc5" || player.currentChallenge == "postc6" || player.currentChallenge == "postc8") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";

    showTab('dimensions');
    updateChallenges();
    if (player.challenges.includes("challenge1")) player.money = E(100)
    if (player.achievements.includes("r37")) player.money = E(1000);
    if (player.achievements.includes("r54")) player.money = E(2e5);
    if (player.achievements.includes("r55")) player.money = E(1e10);
    if (player.achievements.includes("r78")) player.money = E(1e25);
    showTab("dimensions")
    kong.submitStats('Infinitied', getInfinitied());
    kong.submitStats('Fastest Infinity time', Math.floor(player.bestInfinityTime / 10))

    if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");

    document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."

    resetInfDimensions();
    player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce, player.totalTickGained))
    updateTickSpeed();

    if (player.resets == 0 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }
    if (player.currentChallenge.includes("post") && player.currentEternityChall !== "") giveAchievement("I wish I had gotten 7 eternities")
    Marathon2 = 0;
}
}

function unlockEChall(idx) {
    if (player.eternityChallUnlocked == 0) {
        player.eternityChallUnlocked = idx
        document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"
        if (!justImported) showTab("challenges")
        if (!justImported) showChallengesTab("eternitychallenges")
        if (idx !== 12) player.etercreq = idx
    }
    updateEternityChallenges()
    updateTimeStudyButtons()
}

function ECTimesCompleted(name) {
    if (player.eternityChalls[name] === undefined) return 0
    else return player.eternityChalls[name]
}

function canUnlockEC(idx, cost, study, study2) {
    study2 = (study2 !== undefined) ? study2 : 0;
    if (player.eternityChallUnlocked !== 0) return false
    if (!player.timestudy.studies.includes(study) && (player.study2 == 0 || !player.timestudy.studies.includes(study2))) return false
    if (player.timestudy.theorem.lt(cost)) return false
    if (player.etercreq == idx && idx !== 11 && idx !== 12) return true

    switch(idx) {
        case 1:
        if (player.eternities >= 20000+(ECTimesCompleted("eterc1")*20000)) return true
        break;

        case 2:
        if (player.totalTickGained >= 1300+(ECTimesCompleted("eterc2")*150)) return true
        break;

        case 3:
        if (player.eightAmount.gte(17300+(ECTimesCompleted("eterc3")*1250))) return true
        break;

        case 4:
        if (1e8 + (ECTimesCompleted("eterc4")*5e7) <= getInfinitied()) return true
        break;

        case 5:
        if (160 + (ECTimesCompleted("eterc5")*14) <= player.galaxies) return true
        break;

        case 6:
        if (40 + (ECTimesCompleted("eterc6")*5) <= player.replicanti.galaxies) return true
        break;

        case 7:
        if (player.money.gte(E("1e500000").times(E("1e300000").pow(ECTimesCompleted("eterc7"))))) return true
        break;

        case 8:
        if (player.infinityPoints.gte(E("1e4000").times(E("1e1000").pow(ECTimesCompleted("eterc8"))))) return true
        break;

        case 9:
        if (player.infinityPower.gte(E("1e17500").times(E("1e2000").pow(ECTimesCompleted("eterc9"))))) return true
        break;

        case 10:
        if (player.eternityPoints.gte(E("1e100").times(E("1e20").pow(ECTimesCompleted("eterc10"))))) return true
        break;

        case 11:
        if (player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72) && !player.timestudy.studies.includes(73)) return true
        break;

        case 12:
        if (player.timestudy.studies.includes(73) && !player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72)) return true
        break;
    }
}

function updateECUnlockButtons() {
    if (canUnlockEC(1, 30, 171)) {
        document.getElementById("ec1unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec1unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(2, 35, 171)) {
        document.getElementById("ec2unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec2unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(3, 40, 171)) {
        document.getElementById("ec3unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec3unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(4, 70, 143)) {
        document.getElementById("ec4unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec4unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(5, 130, 42)) {
        document.getElementById("ec5unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec5unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(6, 85, 121)) {
        document.getElementById("ec6unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec6unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(7, 115, 111)) {
        document.getElementById("ec7unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec7unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(8, 115, 123)) {
        document.getElementById("ec8unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec8unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(9, 415, 151)) {
        document.getElementById("ec9unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec9unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(10, 550, 181)) {
        document.getElementById("ec10unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec10unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(11, 1, 231, 232)) {
        document.getElementById("ec11unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec11unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(12, 1, 233, 234)) {
        document.getElementById("ec12unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec12unl").className = "eternitychallengestudylocked"
    }

    if (player.eternityChallUnlocked !== 0 && player.eternityChallUnlocked < 13) document.getElementById("ec"+player.eternityChallUnlocked+"unl").className = "eternitychallengestudybought"
}

document.getElementById("ec1unl").onclick = function() {
    if (canUnlockEC(1, 30, 171)) {
        unlockEChall(1)
        player.timestudy.theorem = player.timestudy.theorem.sub(30)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec2unl").onclick = function() {
    if (canUnlockEC(2, 35, 171)) {
        unlockEChall(2)
        player.timestudy.theorem = player.timestudy.theorem.sub(35)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec3unl").onclick = function() {
    if (canUnlockEC(3, 40, 171)) {
        unlockEChall(3)
        player.timestudy.theorem = player.timestudy.theorem.sub(40)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec4unl").onclick = function() {
    if (canUnlockEC(4, 70, 143)) {
        unlockEChall(4)
        player.timestudy.theorem = player.timestudy.theorem.sub(70)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec5unl").onclick = function() {
    if (canUnlockEC(5, 130, 42)) {
        unlockEChall(5)
        player.timestudy.theorem = player.timestudy.theorem.sub(130)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec6unl").onclick = function() {
    if (canUnlockEC(6, 85, 121)) {
        unlockEChall(6)
        player.timestudy.theorem = player.timestudy.theorem.sub(185)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec7unl").onclick = function() {
    if (canUnlockEC(7, 115, 111)) {
        unlockEChall(7)
        player.timestudy.theorem = player.timestudy.theorem.sub(115)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec8unl").onclick = function() {
    if (canUnlockEC(8, 115, 123)) {
        unlockEChall(8)
        player.timestudy.theorem = player.timestudy.theorem.sub(115)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec9unl").onclick = function() {
    if (canUnlockEC(9, 415, 151)) {
        unlockEChall(9)
        player.timestudy.theorem = player.timestudy.theorem.sub(415)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec10unl").onclick = function() {
    if (canUnlockEC(10, 550, 181)) {
        unlockEChall(10)
        player.timestudy.theorem = player.timestudy.theorem.sub(550)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec11unl").onclick = function() {
    if (canUnlockEC(11, 1, 231, 232)) {
        unlockEChall(11)
        player.timestudy.theorem = player.timestudy.theorem.sub(1)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec12unl").onclick = function() {
    if (canUnlockEC(12, 1, 233, 234)) {
        unlockEChall(12)
        player.timestudy.theorem = player.timestudy.theorem.sub(1)
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

var ecExpData = {
	inits: {
		eterc1: 1800,
		eterc2: 975,
		eterc3: 600,
		eterc4: 2750,
		eterc5: 750,
		eterc6: 850,
		eterc7: 2000,
		eterc8: 1300,
		eterc9: 1750,
		eterc10: 3000,
		eterc11: 500,
		eterc12: 110000,
        eterc13: 2e6,
        eterc14: 16e6,
        eterc15: 111111,
	},
	increases: {
		eterc1: 200,
		eterc2: 175,
		eterc3: 75,
		eterc4: 550,
		eterc5: 400,
		eterc6: 250,
		eterc7: 530,
		eterc8: 900,
		eterc9: 250,
		eterc10: 300,
		eterc11: 200,
		eterc12: 12000,
        eterc13: 1e6,
        eterc14: 4e6,
        eterc15: 22222,
	}
}
function getECGoal(x) {
	let expInit = ecExpData.inits[x]
	let expIncrease = ecExpData.increases[x]
	let completions = ECTimesCompleted(x)
	let exp = expInit + expIncrease * completions
	return Decimal.pow(10, exp)
}

function inEC(x) { return player.currentEternityChall == 'eterc'+x }

function startEternityChallenge(name, startgoal, goalIncrease) {
    if (player.eternityChallUnlocked == 0 || parseInt(name.split("c")[1]) !== player.eternityChallUnlocked) return
    if((player.options.challConf) || name == "" ? true :  (confirm("You will start over with just your time studies, eternity upgrades and achievements. You need to reach a set IP with special conditions."))) {
        if (player.dilation.active) startDilatedEternity()
        
        eternity(true)

        player.eternityChallGoal =  getECGoal(name)
	    player.currentEternityChall =  name

        if (player.replicanti.unl) player.replicanti.amount = E(1)
        player.replicanti.galaxies = 0

        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.eternities < 30) {
            document.getElementById("secondRow").style.display = "none";
            document.getElementById("thirdRow").style.display = "none";
            document.getElementById("tickSpeed").style.visibility = "hidden";
            document.getElementById("tickSpeedMax").style.visibility = "hidden";
            document.getElementById("tickLabel").style.visibility = "hidden";
            document.getElementById("tickSpeedAmount").style.visibility = "hidden";
            document.getElementById("fourthRow").style.display = "none";
        }
        document.getElementById("fifthRow").style.display = "none";
        document.getElementById("sixthRow").style.display = "none";
        document.getElementById("seventhRow").style.display = "none";
        document.getElementById("eightRow").style.display = "none";
        document.getElementById("matter").style.display = "none";
        document.getElementById("quickReset").style.display = "none";
        var autobuyers = document.getElementsByClassName('autoBuyerDiv')
        if (player.eternities < 2) {
            for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
            document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
            document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
            document.getElementById("buyerBtnInf").style.display = "inline-block"
            document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
        }
        updateAutobuyers();
        if (player.achievements.includes("r37")) player.money = E(1000);
        if (player.achievements.includes("r54")) player.money = E(2e5);
        if (player.achievements.includes("r55")) player.money = E(1e10);
        if (player.achievements.includes("r78")) player.money = E(1e25);
        if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r104")) player.infinityPoints = E(2e25);
        resetInfDimensions();
        updateChallenges();
        updateChallengeTimes()
        updateLastTenRuns()
        updateLastTenEternities()
        var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
        for (var i = 0; i< infchalls.length; i++) infchalls[i].style.display = "none"
        IPminpeak = E(0)
        EPminpeak = E(0)
        updateMilestones()
        completelyResetTimeDimensions()
        if (player.eternities < 20) player.autobuyers[9].bulk = 1
        if (player.eternities < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
        if (player.eternities < 50) {
            document.getElementById("replicantidiv").style.display="none"
            document.getElementById("replicantiunlock").style.display="inline-block"
        }
        kong.submitStats('Eternities', player.eternities);
        if (player.eternities > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
        document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        if (player.eternities < 2) document.getElementById("break").textContent = "BREAK INFINITY"
        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."
        document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
        document.getElementById("eternityPoints2").style.display = "inline-block"
        document.getElementById("eternitystorebtn").style.display = "inline-block"
        document.getElementById("infiMult").innerHTML = "You get "+tmp.inf_mult_base.toFixed(1)+"x more IP.<br>Currently: "+shorten(tmp.infMultUpg.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        updateEternityUpgrades()
        updateTickSpeed();
        playerInfinityUpgradesOnEternity()
        document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
        updateEternityChallenges()
        Marathon2 = 0;

        passed = 2

        updateTemp()
    }
}








function calcPerSec(amount, pow, hasMult) {
    if (!hasMult) return Decimal.floor(amount).times(pow).times(player.achPow).times(timeMult()).times(player.chall2Pow).dividedBy(player.tickspeed.dividedBy(1000));
    else return Decimal.floor(amount).times(pow).times(player.achPow).times(dimMults()).times(timeMult()).times(player.chall2Pow).dividedBy(player.tickspeed.dividedBy(1000));
}

document.getElementById("quickReset").onclick = function () {
    if (player.resets == 0) player.resets--;
    else player.resets -= 2;
    softReset(1);
}


function updateInfPower() {
    document.getElementById("infPowAmount").textContent = shortenMoney(player.infinityPower)
    if (player.currentEternityChall == "eterc9") document.getElementById("infDimMultAmount").textContent = shortenMoney((Decimal.pow(Math.max(player.infinityPower.log2(), 1), 4)).max(1))
    else document.getElementById("infDimMultAmount").textContent = shortenMoney(tmp.inf_eff)
    el('infRaiseAmount').textContent = shortenMoney(tmp.inf_pow)
    if (player.currentEternityChall == "eterc7") document.getElementById("infPowPerSec").textContent = "You are getting " +shortenDimensions(DimensionProduction(1))+" Seventh Dimensions per second."
    else document.getElementById("infPowPerSec").textContent = "You are getting " +shortenDimensions(DimensionProduction(1))+" Infinity Power per second."
}

function updateTimeShards() {
    if (document.getElementById("timedimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {
        document.getElementById("timeShardAmount").textContent = shortenMoney(player.timeShards)

        document.getElementById("tickThreshold").textContent = shorten(tmp.nextTickUpg.div(calcNextTickUpg(-1)))
        el('nextTickUpg').textContent = shortenMoney(tmp.nextTickUpg)
        
        if (player.currentEternityChall == "eterc7") document.getElementById("timeShardsPerSec").textContent = "You are getting "+shortenDimensions(getTimeDimensionProduction(1))+" Eighth Infinity Dimensions per second."
        else document.getElementById("timeShardsPerSec").textContent = "You are getting "+shortenDimensions(getTimeDimensionProduction(1))+" Timeshards per second."

        document.getElementById("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."
    }
}

function updateDilation() {
    if (document.getElementById("dilation").style.display == "block" && document.getElementById("eternitystore").style.display == "block") {
        document.getElementById("tachyonParticleAmount").textContent = shortenMoney(player.dilation.tachyonParticles)
        document.getElementById("dilatedTimeAmount").textContent = shortenMoney(player.dilation.dilatedTime)
        document.getElementById("dilatedTimePerSecond").textContent = "+" + shortenMoney(getDilatedTimeGain()) + "/s"
        document.getElementById("galaxyThreshold").textContent = shortenMoney(tmp.dil_nextThreshold)
        document.getElementById("dilatedGalaxies").textContent = player.dilation.freeGalaxies
    }
}


function getNewInfReq() {
    if (!player.infDimensionsUnlocked[0]) return E("1e1100")
    else if (!player.infDimensionsUnlocked[1]) return E("1e1900")
    else if (!player.infDimensionsUnlocked[2]) return E("1e2400")
    else if (!player.infDimensionsUnlocked[3]) return E("1e10500")
    else if (!player.infDimensionsUnlocked[4]) return E("1e30000")
    else if (!player.infDimensionsUnlocked[5]) return E("1e45000")
    else if (!player.infDimensionsUnlocked[6]) return E("1e54000")
    else return E("1e60000")
}


function newDimension() {
    if (player.money.gte(getNewInfReq())) {
        if (!player.infDimensionsUnlocked[0]) player.infDimensionsUnlocked[0] = true
        else if (!player.infDimensionsUnlocked[1]) player.infDimensionsUnlocked[1] = true
        else if (!player.infDimensionsUnlocked[2]) player.infDimensionsUnlocked[2] = true
        else if (!player.infDimensionsUnlocked[3]) {
            player.infDimensionsUnlocked[3] = true
            giveAchievement("NEW DIMENSIONS???")
        }
        else if (!player.infDimensionsUnlocked[4]) player.infDimensionsUnlocked[4] = true
        else if (!player.infDimensionsUnlocked[5]) player.infDimensionsUnlocked[5] = true
        else if (!player.infDimensionsUnlocked[6]) player.infDimensionsUnlocked[6] = true
        else if (!player.infDimensionsUnlocked[7]) {
            player.infDimensionsUnlocked[7] = true
            giveAchievement("0 degrees from infinity")
        }
    }
}
var blink = true
setInterval(function() {
    $.getJSON('version.txt', function(data){
        //data is actual content of version.txt, so
        //do whatever you need with it
        //I'd compare it with last result and if it's different
        //show the message received and nag for attention
        //like this:
        if (data.version > player.version) {
            player.version = data.version
            document.getElementById("update").style.display = "block"
            document.getElementById("updatePopup").innerHTML = data.message
            //or some more resilient method
            //like forced news bar with message running over and over
        }
    })
}, 60000)





setInterval(function() {
    kong.submitStats('Log10 of total antimatter', player.totalmoney.e);
    kong.submitStats('Log10 of Infinity Points', player.infinityPoints.e);
    kong.submitStats('Log10 of Eternity Points', player.eternityPoints.e);
}, 10000)

var nextAt = [E("1e2000"), E("1e5000"), E("1e12000"), E("1e14000"), E("1e18000"), E("1e20000"), E("1e23000"), E("1e28000")]

var goals = [E("1e850"), E("1e10500"), E("1e5000"), E("1e13000"), E("1e11111"), E("2e22222"), E("1e10000"), E("1e27000")]
setInterval(function() {
    if (tmp.finalNDmult[0].gte(E("1e308")) &&
        tmp.finalNDmult[1].gte(E("1e308")) &&
        tmp.finalNDmult[2].gte(E("1e308")) &&
        tmp.finalNDmult[3].gte(E("1e308")) &&
        tmp.finalNDmult[4].gte(E("1e308")) &&
        tmp.finalNDmult[5].gte(E("1e308")) &&
        tmp.finalNDmult[6].gte(E("1e308")) &&
        tmp.finalNDmult[7].gte(E("1e308"))) giveAchievement("Can't hold all these infinities")

    if (tmp.finalNDmult[0].lt(tmp.finalNDmult[1]) &&
        tmp.finalNDmult[1].lt(tmp.finalNDmult[2]) &&
        tmp.finalNDmult[2].lt(tmp.finalNDmult[3]) &&
        tmp.finalNDmult[3].lt(tmp.finalNDmult[4]) &&
        tmp.finalNDmult[4].lt(tmp.finalNDmult[5]) &&
        tmp.finalNDmult[5].lt(tmp.finalNDmult[6]) &&
        tmp.finalNDmult[6].lt(tmp.finalNDmult[7])) giveAchievement("How the antitables have turned")



    if (player.infinitied == 0 && player.infinityPoints.lt(E(1e50)) && player.eternities <= 0) document.getElementById("infinityPoints2").style.display = "none"
    else document.getElementById("infinityPoints2").style.display = "inline-block"

    if (blink && !player.achievements.includes("r78")) {
        document.getElementById("Blink of an eye").style.display = "none"
        blink = false
    }
    else {
        document.getElementById("Blink of an eye").style.display = "block"
        blink = true
    }
    if (player.challenges.includes("postc1")) {
        let temp = 1
        for (var i=0; i < player.challenges.length; i++) {
            if (player.challenges[i].includes("post")) {
                temp *= 1.3
                document.getElementById("infchallengesbtn").style.display = "inline-block"
            }
        }
        infDimPow = temp
    } else {
        document.getElementById("infchallengesbtn").style.display = "none"
    }

    if (player.money.gte(E("1e2000")) || Object.keys(player.eternityChalls).length > 0 || player.eternityChallUnlocked !== 0) document.getElementById("challTabButtons").style.display = "table"

    document.getElementById("kongip").textContent = "Double your IP gain from all sources (additive). Forever. Currently: x"+kongIPMult+", next: x"+(kongIPMult==1? 2: kongIPMult+2)
    document.getElementById("kongep").textContent = "Triple your EP gain from all sources (additive). Forever. Currently: x"+kongEPMult+", next: x"+(kongEPMult==1? 3: kongEPMult+3)
    document.getElementById("kongdim").textContent = "Double all your normal dimension multipliers (multiplicative). Forever. Currently: x"+kongDimMult+", next: x"+(kongDimMult*2)
    document.getElementById("kongalldim").textContent = "Double ALL the dimension multipliers (Normal, Infinity, Time) (multiplicative until 32x). Forever. Currently: x"+kongAllDimMult+", next: x"+((kongAllDimMult < 32) ? kongAllDimMult * 2 : kongAllDimMult + 32)

    document.getElementById("eternitybtn").style.display = (player.infinityPoints.gte(player.eternityChallGoal) && (player.infDimensionsUnlocked[7] || player.eternities > 24)) ? "inline-block" : "none"


    if (player.eternities !== 0)document.getElementById("eternitystorebtn").style.display = "inline-block"
    for (var i=1; i <=8; i++) {
        document.getElementById("postc"+i+"goal").textContent = "Goal: "+shortenCosts(goals[i-1])
    }

    if (player.replicanti.galaxybuyer !== undefined) document.getElementById("replicantiresettoggle").style.display = "inline-block"
    else document.getElementById("replicantiresettoggle").style.display = "none"

    if (player.eternities > 0) document.getElementById("infmultbuyer").style.display = "inline-block"
    else document.getElementById("infmultbuyer").style.display = "none"
    if (player.eternities > 4) document.getElementById("togglecrunchmode").style.display = "inline-block"
    else document.getElementById("togglecrunchmode").style.display = "none"
    if (player.eternities > 8) document.getElementById("galaxybulk").style.display = "inline-block"
    else document.getElementById("galaxybulk").style.display = "none"

    document.getElementById("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable()) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && isIntervalAffordable()) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantimax").className = (player.infinityPoints.gte(player.replicanti.galCost)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantireset").className = (player.replicanti.galaxies < player.replicanti.gal && player.replicanti.amount.gte(Number.MAX_VALUE)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiunlock").className = (player.infinityPoints.gte(1e140)) ? "storebtn" : "unavailablebtn"
    updateTheoremButtons()

    if (tmp.tsReduce < 0.001) giveAchievement("Do you even bend time bro?")

    if (player.eternities > 9) document.getElementById("bulklabel").textContent = "Buy max dimboosts every X seconds:"
    else document.getElementById("bulklabel").textContent = "Bulk DimBoost Amount:"

    if (player.eternities > 10) {
        for (var i=1;i<player.eternities-9 && i < 9; i++) {
            document.getElementById("infauto"+i).style.visibility = "visible"
        }
        document.getElementById("toggleallinfdims").style.visibility = "visible"
    } else {
        for (var i=1; i<9; i++) {
            document.getElementById("infauto"+i).style.visibility = "hidden"
        }
        document.getElementById("toggleallinfdims").style.visibility = "hidden"
    }

    if (player.eternities !== 0) document.getElementById("eternityconf").style.display = "inline-block"
    else document.getElementById("eternityconf").style.display = "none"
    if (player.eternities >= 40) document.getElementById("replauto1").style.visibility = "visible"
    else document.getElementById("replauto1").style.visibility = "hidden"
    if (player.eternities >= 60) document.getElementById("replauto2").style.visibility = "visible"
    else document.getElementById("replauto2").style.visibility = "hidden"
    if (player.eternities >= 80) document.getElementById("replauto3").style.visibility = "visible"
    else document.getElementById("replauto3").style.visibility = "hidden"
    if (QCCompleted(2)) document.getElementById("replauto4").style.visibility = "visible"
    else document.getElementById("replauto4").style.visibility = "hidden"

    if (player.eternities >= 100) document.getElementById("autoBuyerEter").style.display = "inline-block"

    if (player.eternities == 0) document.getElementById("pasteternities").style.display = "none"
    else document.getElementById("pasteternities").style.display = "inline-block"
    if (player.challenges.length > 1) document.getElementById("challengetimesbtn").style.display = "inline-block"
    else document.getElementById("challengetimesbtn").style.display = "none"
    if (player.infinitied > 0  || player.eternities > 0) document.getElementById("pastinfs").style.display = "inline-block"
    else document.getElementById("pastinfs").style.display = "none"

    if (player.infinitied !== 0 || player.eternities !== 0) document.getElementById("bigCrunchAnimBtn").style.display = "inline-block"
    else document.getElementById("bigCrunchAnimBtn").style.display = "none"
    if (!player.dilation.tachyonParticles.eq(0)) document.getElementById("tachyonParticleAnimBtn").style.display = "inline-block"
    else document.getElementById("tachyonParticleAnimBtn").style.display = "none"

    if (player.eternities > 10 && player.currentEternityChall !== "eterc8") {
        for (var i=1;i<player.eternities-9 && i < 9; i++) {
            if (player.infDimBuyers[i-1]) {
                buyMaxInfDims(i)
                buyManyInfinityDimension(i)
            }
        }
    }

    if (getEternitied() >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8" && isChanceAffordable()) {
		var bought = Math.min(Math.max(Math.floor(player.infinityPoints.div(player.replicanti.chanceCost).log(1e15) + 1), 0), hasGluonUpg('gb3')?1/0:100-Math.round(player.replicanti.chance*100))
		player.replicanti.chance = Math.round(player.replicanti.chance*100+bought)/100
		player.replicanti.chanceCost = player.replicanti.chanceCost.times(Decimal.pow(1e15, bought))
	}

    if (player.eternities >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
        while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && isIntervalAffordable()) upgradeReplicantiInterval()
    }

    if (player.eternities >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") {
        autoBuyRG()
    }

    if (QCCompleted(2) && player.replicanti.auto[3] && player.currentEternityChall !== "eterc8") {
        buyReplicantiUpgrade4(true)
    }

    document.getElementById("eterc1goal").textContent = "Goal: "+shortenCosts(E("1e1800").times(E("1e200").pow(ECTimesCompleted("eterc1"))).max(E("1e1800"))) + " IP"
    document.getElementById("eterc1completed").textContent = "Completed "+ECTimesCompleted("eterc1")+" times."

    document.getElementById("eterc2goal").textContent = "Goal: "+shortenCosts(E("1e975").times(E("1e175").pow(ECTimesCompleted("eterc2"))).max(E("1e975"))) + " IP"
    document.getElementById("eterc2completed").textContent = "Completed "+ECTimesCompleted("eterc2")+" times."

    document.getElementById("eterc3goal").textContent = "Goal: "+shortenCosts(E("1e600").times(E("1e75").pow(ECTimesCompleted("eterc3"))).max(E("1e575"))) + " IP"
    document.getElementById("eterc3completed").textContent = "Completed "+ECTimesCompleted("eterc3")+" times."

    document.getElementById("eterc4goal").textContent = "Goal: "+shortenCosts(E("1e2750").times(E("1e550").pow(ECTimesCompleted("eterc4"))).max(E("1e2750"))) + " IP in "+Math.max((16 - (ECTimesCompleted("eterc4")*4)), 0)+" infinities or less."
    document.getElementById("eterc4completed").textContent = "Completed "+ECTimesCompleted("eterc4")+" times."

    document.getElementById("eterc5goal").textContent = "Goal: "+shortenCosts(E("1e750").times(E("1e400").pow(ECTimesCompleted("eterc5"))).max(E("1e750"))) + " IP"
    document.getElementById("eterc5completed").textContent = "Completed "+ECTimesCompleted("eterc5")+" times."

    document.getElementById("eterc6goal").textContent = "Goal: "+shortenCosts(E("1e850").times(E("1e250").pow(ECTimesCompleted("eterc6"))).max(E("1e850"))) + " IP"
    document.getElementById("eterc6completed").textContent = "Completed "+ECTimesCompleted("eterc6")+" times."

    document.getElementById("eterc7goal").textContent = "Goal: "+shortenCosts(E("1e2000").times(E("1e530").pow(ECTimesCompleted("eterc7"))).max(E("1e2000"))) + " IP"
    document.getElementById("eterc7completed").textContent = "Completed "+ECTimesCompleted("eterc7")+" times."

    document.getElementById("eterc8goal").textContent = "Goal: "+shortenCosts(E("1e1300").times(E("1e900").pow(ECTimesCompleted("eterc8"))).max(E("1e1300"))) + " IP"
    document.getElementById("eterc8completed").textContent = "Completed "+ECTimesCompleted("eterc8")+" times."

    document.getElementById("eterc9goal").textContent = "Goal: "+shortenCosts(E("1e1750").times(E("1e250").pow(ECTimesCompleted("eterc9"))).max(E("1e1750"))) + " IP"
    document.getElementById("eterc9completed").textContent = "Completed "+ECTimesCompleted("eterc9")+" times."

    document.getElementById("eterc10goal").textContent = "Goal: "+shortenCosts(E("1e3000").times(E("1e300").pow(ECTimesCompleted("eterc10"))).max(E("1e3000"))) + " IP"
    document.getElementById("eterc10completed").textContent = "Completed "+ECTimesCompleted("eterc10")+" times."

    document.getElementById("eterc11goal").textContent = "Goal: "+shortenCosts(E("1e500").times(E("1e200").pow(ECTimesCompleted("eterc11"))).max(E("1e500"))) + " IP"
    document.getElementById("eterc11completed").textContent = "Completed "+ECTimesCompleted("eterc11")+" times."

    document.getElementById("eterc12goal").textContent = "Goal: "+shortenCosts(E("1e110000").times(E("1e12000").pow(ECTimesCompleted("eterc12"))).max(E("1e110000"))) + " IP in "+(Math.max(10 - ECTimesCompleted("eterc12")*2, 1)/10) + ((ECTimesCompleted("eterc12") === 0) ? " second or less." :" seconds or less." )
    document.getElementById("eterc12completed").textContent = "Completed "+ECTimesCompleted("eterc12")+" times."

    for (let x = 13; x <= 15; x++) {
        document.getElementById("eterc"+x+"goal").textContent = "Goal: "+shortenCosts(getECGoal("eterc"+x)) + " IP"
        document.getElementById("eterc"+x+"completed").textContent = "Completed "+ECTimesCompleted("eterc"+x)+" times."
    }

    updateECUnlockButtons()
    //updateTSTiersButtons()

    doAutoEterTick()
    updateR146Reward()


    if (player.currentEternityChall == "eterc8") {
        document.getElementById("eterc8repl").style.display = "block"
        document.getElementById("eterc8ids").style.display = "block"
        document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
        document.getElementById("eterc8ids").textContent = "You have "+player.eterc8ids+" purchases left."
    } else {
        document.getElementById("eterc8repl").style.display = "none"
        document.getElementById("eterc8ids").style.display = "none"
    }

    if (player.currentEternityChall == "eterc12" && player.thisEternity >= Math.max(2 * (5 - ECTimesCompleted("eterc12")), 1)) {
        document.getElementById("challfail").style.display = "block"
        setTimeout(exitChallenge, 500)
        giveAchievement("You're a mistake")
        failureCount++
        if (failureCount > 9) giveAchievement("You're a failure")
    }

    document.getElementById("infinitiedBank").style.display = (player.infinitiedBank > 0) ? "block" : "none"
    document.getElementById("infinitiedBank").textContent = "You have " + player.infinitiedBank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " banked infinities."

    if (infchallengeTimes < 7.5) giveAchievement("Never again")
    if (player.infinityPoints.gte(E("1e22000")) && player.timestudy.studies.length == 0) giveAchievement("What do I have to do to get rid of you")
    if (player.replicanti.galaxies >= 180*player.galaxies && player.galaxies > 0) giveAchievement("Popular music")
    if (player.eternityPoints.gte(Number.MAX_VALUE)) giveAchievement("But I wanted another prestige layer...")
    if (player.infinityPoints.gte(1e100) && player.firstAmount.equals(0) && player.infinitied == 0 && player.resets <= 4 && player.galaxies <= 1 && player.replicanti.galaxies == 0) giveAchievement("Like feasting on a behind")
    if (player.infinityPoints.gte('9.99999e999')) giveAchievement("This achievement doesn't exist II");
    if (player.infinityPoints.gte('1e30008')) giveAchievement("Can you get infinite IP?");
    if (player.infinitied > 2e6) giveAchievement("2 Million Infinities")
    if (player.money.gte("9.9999e9999")) giveAchievement("This achievement doesn't exist")
    if (player.money.gte("1e35000")) giveAchievement("I got a few to spare")
    if (player.infinityPower.gt(1)) giveAchievement("A new beginning.");
    if (player.infinityPower.gt(1e6)) giveAchievement("1 million is a lot"); //TBD
    if (player.infinityPower.gt(1e260)) giveAchievement("Minute of infinity"); //TBD
    if (player.totalTickGained >= 308) giveAchievement("Infinite time");
    if (player.firstPow >= 10e30) giveAchievement("I forgot to nerf that")
    if (player.money >= 10e79) giveAchievement("Antimatter Apocalypse")
    if (player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8) giveAchievement("One for each dimension")
    if (player.seventhAmount > 1e12) giveAchievement("Multidimensional");
    if (player.tickspeed.lt(1e-26)) giveAchievement("Faster than a potato");
    if (player.tickspeed.lt(1e-55)) giveAchievement("Faster than a squared potato");
    if (Math.random() < 0.00001) giveAchievement("Do you feel lucky? Well do ya punk?");
    if ((player.matter.gte(2.586e15) && player.currentChallenge == "postc6") || player.matter.gte(Number.MAX_VALUE)) giveAchievement("It's not called matter dimensions is it?")

    checkAchievements()

    updateEverySecond()

    if (!player.quantum.reached && player.meta.best1.gte(QU_REQ_MA) && ECTimesCompleted('eterc15') >= 2) player.quantum.reached = true

    document.getElementById("dilationTabbtn").style.display = (player.dilation.studies.includes(1)) ? "inline-block" : "none"
    updateDilationUpgradeButtons()

    if (player.infinityDimension1.baseAmount == 0 &&
        player.infinityDimension2.baseAmount == 0 &&
        player.infinityDimension3.baseAmount == 0 &&
        player.infinityDimension4.baseAmount == 0 &&
        player.infinityDimension5.baseAmount == 0 &&
        player.infinityDimension6.baseAmount == 0 &&
        player.infinityDimension7.baseAmount == 0 &&
        player.infinityDimension8.baseAmount == 0 &&
        player.infMultCost.equals(10) &&
        player.infinityPoints.gt(E("1e140000"))) {
        giveAchievement("I never liked this infinity stuff anyway")
    }

    if (player.replicanti.amount.gt(E("1e20000"))) giveAchievement("When will it be enough?")
    if (player.tickspeed.e < -8296262) giveAchievement("Faster than a potato^286078")
    if (player.timestudy.studies.length == 0 && player.dilation.active && player.infinityPoints.e >= 20000) giveAchievement("This is what I have to do to get rid of you.")
    if (player.why >= 1e6) giveAchievement("Should we tell them about buy max...")

}, 1000)

function fact(v) {
    let ret=1;
    do {ret *= v} while (--v > 1)
    return ret;
}

var postC2Count = 0;
var IPminpeak = E(0)
var EPminpeak = E(0)
var replicantiTicks = 0

function isChanceAffordable() {
	return player.replicanti.chance < 1 || hasGluonUpg('gb3')
}

function gameLoop(diff) {
    let noPass = passed == 0

    var thisUpdate = new Date().getTime();
    if (thisUpdate - player.lastUpdate >= 21600000) giveAchievement("Don't you dare to sleep")
    if (typeof diff === 'undefined') var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
    diff = diff / 100;
    if (diff < 0) diff = 1;
    if (player.currentEternityChall === "eterc12") diff = diff / 1000;
    if (player.thisInfinityTime < -10) player.thisInfinityTime = Infinity
    if (player.bestInfinityTime < -10) player.bestInfinityTime = Infinity
    if (diff > player.autoTime && !player.break) player.infinityPoints = player.infinityPoints.plus(player.autoIP.times(diff/player.autoTime))
    /*if (player.currentChallenge == "postc6" && player.matter.gte(1)) player.matter = player.matter.plus(diff/10)
    else */
    player.matter = player.matter.times(Decimal.pow((1.03 + player.resets/200 + player.galaxies/100), diff));
    if (player.matter.gt(player.money) && (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1")) {
        if (player.resets > 0) player.resets--;
        softReset(0);
    }

    if (player.currentChallenge == "postc8") postc8Mult = postc8Mult.times(Math.pow(0.000000046416, diff))

    if (player.currentChallenge == "challenge3" || player.matter.gte(1)) player.chall3Pow = player.chall3Pow.times(Decimal.pow(1.00038, diff));
    player.chall2Pow = Math.min(player.chall2Pow + diff/1800, 1);
    if (player.currentChallenge == "postc2") {
        postC2Count++;
        if (postC2Count >= 8 || diff > 80) {
            sacrifice();
            postC2Count = 0;
        }
    }
    if (player.infinityUpgrades.includes("passiveGen")) player.partInfinityPoint += diff / player.bestInfinityTime;
    if (player.partInfinityPoint >= 100) {
        player.infinityPoints = player.infinityPoints.plus(tmp.infMultUpg.times(kongIPMult * (player.partInfinityPoint/10)));
        player.partInfinityPoint = 0;
    }

    if (player.partInfinityPoint >= 10) {
        player.partInfinityPoint -= 10;
        player.infinityPoints = player.infinityPoints.plus(tmp.infMultUpg.times(kongIPMult));
    }



    if (player.infinityUpgrades.includes("infinitiedGeneration") && player.currentEternityChall !== "eterc4") player.partInfinitied += diff / player.bestInfinityTime;
    if (player.partInfinitied >= 50) {
        player.infinitied += Math.floor(player.partInfinitied/5*tmp.infGain)
        player.partInfinitied = 0;
    }

    if (player.partInfinitied >= 5) {
        player.partInfinitied -= 5;
        player.infinitied += tmp.infGain;
    }

    player.infinityPoints = player.infinityPoints.plus(bestRunIppm.times(player.offlineProd/100).times(diff/600))

    if (noPass) if (player.money.lte(Number.MAX_VALUE) || (player.break && player.currentChallenge == "") || (player.currentChallenge != "" && player.money.lte(player.challengeTarget))) {
        if (!inEC(13)) {
            if (player.currentChallenge != "challenge7" && player.currentEternityChall != "eterc3") {
                for (let tier = 7; tier >= 1; --tier) {
                    var name = TIER_NAMES[tier];
    
                    player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 1).times(diff / 100));
                }
            } else if (player.currentEternityChall != "eterc3") {
                for (let tier = 6; tier >= 1; --tier) {
                    var name = TIER_NAMES[tier];
    
                    player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 2).times(diff / 100));
                }
            } else {
                for (let tier = 3; tier >= 1; --tier) {
                    var name = TIER_NAMES[tier];
    
                    player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 1).times(diff / 100));
                }
            }
        }

        let am_gain = tmp.AM_gain

        player.money = player.money.plus(am_gain.times(diff/10));
        player.totalmoney = player.totalmoney.plus(am_gain.times(diff/10));
    }

    calcMetaDimensions(diff)
    quantumTick(diff)
    updateAllTick(diff)

    setAchieveTooltip()

    document.getElementById("dimTabButtons").style.display = "none"

    if (player.currentEternityChall === "eterc12") player.totalTimePlayed += diff*1000
    else player.totalTimePlayed += diff
    player.thisInfinityTime += diff
    player.thisEternity += diff
    player.quantum.time += diff

    if (player.eternities > 0) document.getElementById("tdtabbtn").style.display = "inline-block"

    for (let tier=1;tier<9;tier++) {
        if (!inEC(13) && tier != 8 && (player.infDimensionsUnlocked[tier-1] || ECTimesCompleted("eterc7") > 0)) player["infinityDimension"+tier].amount = player["infinityDimension"+tier].amount.plus(DimensionProduction(tier+1).times(diff/100))
        if (player.infDimensionsUnlocked[tier-1]) {
            document.getElementById("infRow"+tier).style.display = "inline-block"
            document.getElementById("dimTabButtons").style.display = "inline-block"
            var idtabshown = true;
        } else {
            document.getElementById("infRow"+tier).style.display = "none"
            document.getElementById("idtabbtn").style.display = "none"
        }
        if (idtabshown === true || player.eternities >= 1) {
            document.getElementById("idtabbtn").style.display = "inline-block"
        }

        if (!inEC(13) && tier <8) player["timeDimension"+tier].amount = player["timeDimension"+tier].amount.plus(getTimeDimensionProduction(tier+1).times(diff/100))
    }

    if (player.infinitied > 0 && player.eternities < 1) {
        document.getElementById("dimTabButtons").style.display = "inline-block"
        document.getElementById("dtabbtn").style.display = "inline-block"
        document.getElementById("prodtabbtn").style.display = "inline-block"
    }
    if (player.eternities > 0) document.getElementById("dimTabButtons").style.display = "inline-block"

    if (player.currentEternityChall !== "eterc7") player.infinityPower = player.infinityPower.plus(DimensionProduction(1).times(diff/10))
    else if (player.currentChallenge !== "challenge4" && player.currentChallenge !== "postc1") player.seventhAmount = player.seventhAmount.plus(DimensionProduction(1).times(diff/10))

    if (player.currentEternityChall == "eterc7") player.infinityDimension8.amount = player.infinityDimension8.amount.plus(getTimeDimensionProduction(1).times(diff/10))
    else player.timeShards = player.timeShards.plus(getTimeDimensionProduction(1).times(diff/10))

    if (!inEC(13) && getTimeDimensionProduction(1).gt(0) && ECTimesCompleted("eterc7") > 0) player.infinityDimension8.amount = player.infinityDimension8.amount.plus(getTimeDimensionProduction(1).pow(ECTimesCompleted("eterc7")*0.2).minus(1).times(diff/10))

    let gain;
    if (player.timeShards.gte(tmp.nextTickUpg)) {
        player.totalTickGained += bulkNumberFromDecimalFunction(calcNextTickUpg,player.timeShards)
        updateTickSpeed();
    }

    if (player.eternities == 0) {
        document.getElementById("eternityPoints2").style.display = "none"
        document.getElementById("eternitystorebtn").style.display = "none"
    }
    else {
        document.getElementById("eternityPoints2").style.display = "inline-block"
    }


    if (player.money.gte(Number.MAX_VALUE) && (!player.break || (player.currentChallenge != "" && player.money.gte(player.challengeTarget)))) {
        document.getElementById("bigcrunch").style.display = 'inline-block';
        if ((player.currentChallenge == "" || player.options.retryChallenge) && (player.bestInfinityTime <= 600 || player.break)) {}
        else showTab('emptiness');
    } else document.getElementById("bigcrunch").style.display = 'none';

    if (player.break && player.money.gte(Number.MAX_VALUE) && player.currentChallenge == "") {
        document.getElementById("postInfinityButton").style.display = "inline-block"
    } else {
        document.getElementById("postInfinityButton").style.display = "none"
    }


    if (player.break) document.getElementById("iplimit").style.display = "inline"
    else document.getElementById("iplimit").style.display = "none"

    var currentIPmin = gainedInfinityPoints().dividedBy(player.thisInfinityTime/600)
    if (currentIPmin.gt(IPminpeak)) IPminpeak = currentIPmin
    if (IPminpeak.lte("1e100000")) document.getElementById("postInfinityButton").innerHTML = "<b>Big Crunch for "+shortenDimensions(gainedInfinityPoints())+" Infinity Points.</b><br>"+shortenDimensions(currentIPmin) + " IP/min"+"<br>Peaked at "+shortenDimensions(IPminpeak)+" IP/min"
    else document.getElementById("postInfinityButton").innerHTML = "<b>Big Crunch for "+shortenDimensions(gainedInfinityPoints())+" Infinity Points.</b>"

    if (nextAt[player.postChallUnlocked] === undefined) document.getElementById("nextchall").textContent = " "
    else if (!player.achievements.includes("r133")) {
        document.getElementById("nextchall").textContent = "Next challenge unlocks at "+ shortenCosts(nextAt[player.postChallUnlocked]) + " antimatter."
        while (player.money.gte(nextAt[player.postChallUnlocked]) && player.challenges.includes("postc8") === false && player.postChallUnlocked != 8) {
            if (player.postChallUnlocked != 8) player.postChallUnlocked += 1
            if (player.eternities > 6) player.challenges.push("postc"+player.postChallUnlocked)
            updateChallenges()
        }
    }

    let interval = tmp.rep.interval

    if (!inEC(14)) if (player.replicanti.unl && (diff > 5 || interval < 50 || player.timestudy.studies.includes(192))) {
        if (player.timestudy.studies.includes(192) && tmp.rep.est.toNumber() > 0 && tmp.rep.est.toNumber() < 1/0) player.replicanti.amount = Decimal.pow(Math.E, tmp.rep.ln +Math.log((diff*tmp.rep.est/10) * (Math.log10(tmp.rep.speeds.inc)/tmp.rep.speeds.exp)+1) / (Math.log10(tmp.rep.speeds.inc)/tmp.rep.speeds.exp))
        else if (player.timestudy.studies.includes(192)) player.replicanti.amount = Decimal.pow(Math.E, tmp.rep.ln + tmp.rep.est.times(diff * Math.log10(tmp.rep.speeds.inc) / tmp.rep.speeds.exp / 10).add(1).log(Math.E) / (Math.log10(tmp.rep.speeds.inc)/tmp.rep.speeds.exp))
        else player.replicanti.amount = Decimal.pow(Math.E, tmp.rep.ln +(diff*tmp.rep.est/10)).min(Number.MAX_VALUE)
        replicantiTicks = 0
    } else {
        let c = tmp.rep.chance.toNumber()

        if (interval <= replicantiTicks && player.replicanti.unl) {
            if (player.replicanti.amount.lte(100)) {
                var temp = player.replicanti.amount
                for (var i=0; temp.gt(i); i++) {
                    if (c > Math.random()) player.replicanti.amount = player.replicanti.amount.plus(1)
                }
            } else {
                var temp = Decimal.round(player.replicanti.amount.dividedBy(100))
                if (Math.round(c) < 1) {
                    let counter = 0
                    for (var i=0; i<100; i++) {
                        if (c > Math.random()) {
                            counter++;
                        }
                    }
                    player.replicanti.amount = Decimal.min(Number.MAX_VALUE, temp.times(counter).plus(player.replicanti.amount))
                    if (player.timestudy.studies.includes(192)) player.replicanti.amount = temp.times(counter).plus(player.replicanti.amount)
                    counter = 0
                } else {
                    if (player.timestudy.studies.includes(192)) player.replicanti.amount = player.replicanti.amount.times(2)
                    else player.replicanti.amount = Decimal.min(Number.MAX_VALUE, player.replicanti.amount.times(2))

                }
            }
            replicantiTicks -= interval
        }

    }
    if (player.replicanti.amount.gt(0)) replicantiTicks += player.options.updateRate

    let current = tmp.rep.ln

    if (current == Decimal.ln(Number.MAX_VALUE) && player.thisInfinityTime < 600*30) giveAchievement("Is this safe?");
    if (player.replicanti.galaxies >= 10 && player.thisInfinityTime < 150) giveAchievement("The swarm");

    if (player.replicanti.galaxybuyer && player.replicanti.amount.gte(Number.MAX_VALUE) && (player.quantum.speedruns > 18 || !player.timestudy.studies.includes(131))) {
        document.getElementById("replicantireset").click()
    }
    if (isIntervalAffordable()) document.getElementById("replicantiinterval").innerHTML = "Interval: "+timeDisplayShort(Decimal.div(tmp.rep.interval, 100), true, 3)+"<br>-> "+timeDisplayShort(Decimal.div(tmp.rep.interval*.9, 100), true, 3)+". Costs: "+shortenCosts(player.replicanti.intervalCost)+" IP"
    else document.getElementById("replicantiinterval").textContent = "Interval: "+timeDisplayShort(Decimal.div(tmp.rep.interval, 100), true, 3)

    for (let x = 1; x <= 8; x++) {
        if (player.meta[x].auto) buyMD(x,true)
    }
    if (player.meta.auto_reset) metaSoftReset(true)

    updateTemp()

    if (player.infMultBuyer) {
        var dif = player.infinityPoints.e - player.infMultCost.e +1
        if (dif > 0) {
            if (!inEC(14)) player.infMult = player.infMult.times(Decimal.pow(tmp.inf_mult_base, dif))
            player.infMultCost = player.infMultCost.times(Decimal.pow(10, dif))
            document.getElementById("infiMult").innerHTML = "You get "+tmp.inf_mult_base.toFixed(1)+"x more IP.<br>Currently: "+shorten(tmp.infMultUpg.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
            player.infinityPoints = player.infinityPoints.minus(player.infMultCost.dividedBy(10))
            if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = player.autobuyers[11].priority.times(Decimal.pow(2, dif));
            if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = player.autobuyers[11].priority
        }
    }

    let est = tmp.rep.est.min(Number.MAX_VALUE).toNumber()
    
    document.getElementById("replicantiapprox").innerHTML = player.timestudy.studies.includes(192) && player.replicanti.amount.gte(Number.MAX_VALUE) 
    ? "Replicanti increases by " + (
        tmp.rep.est < Math.log10(2) ?
        "x2.00 per " + timeDisplayShort(Math.log10(2) / tmp.rep.est * 10) :
        (tmp.rep.est.gte(1e4) ? shorten(tmp.rep.est) + " OoMs" : "x" + shorten(Decimal.pow(10, tmp.rep.est.toNumber()))) + " per second"
    )   + ".<br>"
        + "Replicate interval slows down by " + tmp.rep.speeds.inc.toFixed(3) + "x per " + getFullExpansion(Math.floor(tmp.rep.speeds.exp)) + " OoMs.<br>"
        + "(2x slower per " + getFullExpansion(Math.floor(tmp.rep.speeds.exp * Math.log10(2) / Math.log10(tmp.rep.speeds.inc))) + " OoMs)"
    : "Approximately " + timeDisplay(Math.max((Math.log(Number.MAX_VALUE) - tmp.rep.ln) / tmp.rep.est.toNumber(), 0) * 10) + " Until Infinite Replicanti"
    
    // "Approximately "+ timeDisplay(estimate*10) + " until infinite Replicanti"

    document.getElementById("replicantiamount").textContent = shortenDimensions(player.replicanti.amount)
    var replmult = tmp.repEff
    document.getElementById("replicantimult").textContent = shorten(replmult.max(1))

    if (hasTSTier(2,101)) player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints().times(diff/1000))
    document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")

    var currentEPmin = gainedEternityPoints().dividedBy(player.thisEternity/600)
    if (currentEPmin.gt(EPminpeak) && player.infinityPoints.gte(Number.MAX_VALUE)) EPminpeak = currentEPmin
    document.getElementById("eternitybtn").innerHTML = (player.eternities == 0) ? "Other times await.. I need to become Eternal" : "<b>I need to become Eternal.</b><br>"+"Gain <b>"+shortenDimensions(gainedEternityPoints())+"</b> Eternity points.<br>"+shortenDimensions(currentEPmin)+ " EP/min<br>Peaked at "+shortenDimensions(EPminpeak)+" EP/min"
    if (gainedEternityPoints().gte(1e6)) document.getElementById("eternitybtn").innerHTML = "Gain <b>"+shortenDimensions(gainedEternityPoints())+"</b> Eternity points."+(player.eternityPoints.gte('1e4000')?"":"<br>"+shortenDimensions(currentEPmin)+ " EP/min<br>Peaked at "+shortenDimensions(EPminpeak)+" EP/min")
    if (player.dilation.active) document.getElementById("eternitybtn").innerHTML = "Gain <b>"+shortenDimensions(gainedEternityPoints())+"</b> Eternity points.<br>"+"+"+shortenMoney(tmp.tachyonGain.sub(player.dilation.totalTachyonParticles).max(0).mul(10).round().div(10)) +" Tachyon particles."
    if (player.currentEternityChall !== "") document.getElementById("eternitybtn").textContent = "Other challenges await.. I need to become Eternal"
    updateMoney();
    updateCoinPerSec();
    updateDimensions()
    updateInfCosts()
    updateInfinityDimensions();
    updateInfPower();
    updateTimeDimensions()
    updateTimeShards()
    updateDilation()
    updateMetaDimensionsHTML()
    updateQuantumHTML()
    updateTSTiersHTML()
    if (getDimensionProductionPerSecond(1).gt(player.money) && !player.achievements.includes("r44")) {
        Marathon+=player.options.updateRate/1000;
        if (Marathon >= 30) giveAchievement("Over in 30 seconds");
    } else {
        Marathon = 0;
    }
    if (DimensionProduction(1).gt(player.infinityPower) && player.currentEternityChall != "eterc7" && !player.achievements.includes("r113")) {
        Marathon2+=player.options.updateRate/1000;
        if (Marathon2 >= 60) giveAchievement("Long lasting relationship");
    } else {
        Marathon2 = 0;
    }
    if (player.eternities >= 1 && (player.options.notation == "Standard" || player.options.notation == "Emojis" || player.options.notation == "Brackets")) {
        painTimer += player.options.updateRate/1000;
        if (painTimer >= 600) giveAchievement("Do you enjoy pain?");
    }

    if(player.money.gt(Math.pow(10,63))) giveAchievement("Supersanic");

    for (let tier = 1; tier <= 8; ++tier) {
        var name = TIER_NAMES[tier];
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
            document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
            document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
        } else {
            if (tier >= 3) {
                document.getElementById(name).className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
            } else {
                document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
            }
        }
    }
    if (player.firstAmount.lt(1)) document.getElementById("first").className = 'storebtn';

    for (var tier = 1; tier < 9; tier++) {
        if (tmp && player.infinityPoints.gte(player["infinityDimension"+tier].cost) && (tier == 8 || player['infinityDimension'+tier].baseAmount < tmp.inf_bought_cap*10)) document.getElementById("infMax"+tier).className = "storebtn"
        else document.getElementById("infMax"+tier).className = "unavailablebtn"
    }

    for (var tier = 1; tier < 9; tier++) {
        if (player.eternityPoints.gte(player["timeDimension"+tier].cost)) document.getElementById("timeMax"+tier).className = "storebtn"
        else document.getElementById("timeMax"+tier).className = "unavailablebtn"
    }

    if (player.dilation.studies.includes(1)) player.dilation.dilatedTime = player.dilation.dilatedTime.plus(getDilatedTimeGain() * diff / 10)

    if (tmp.dil_nextThreshold.lte(player.dilation.dilatedTime)) {
        let fg = Math.floor(player.dilation.dilatedTime.div(1e3).log(tmp.dil_nextThresholdMult))+1

        if (player.dilation.upgrades.includes(5)) fg *= 2

        player.dilation.freeGalaxies = fg
    }




    if (canAfford(player.tickSpeedCost)) {
        document.getElementById("tickSpeed").className = 'storebtn';
        document.getElementById("tickSpeedMax").className = 'storebtn';
    } else {
        document.getElementById("tickSpeed").className = 'unavailablebtn';
        document.getElementById("tickSpeedMax").className = 'unavailablebtn';
    }

    if (player.infinityPoints.gt(0) || player.eternities !== 0) {
        document.getElementById("infinitybtn").style.display = "block";
        document.getElementById("infi11").className = "infinistorebtn1"
        document.getElementById("infi21").className = "infinistorebtn2"
        if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi12").className = "infinistorebtn1"
        else document.getElementById("infi12").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi22").className = "infinistorebtn2"
        else document.getElementById("infi22").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi13").className = "infinistorebtn1"
        else document.getElementById("infi13").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi23").className = "infinistorebtn2"
        else document.getElementById("infi23").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi14").className = "infinistorebtn1"
        else document.getElementById("infi14").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("45Mult") && player.infinityPoints.gte(2)) document.getElementById("infi24").className = "infinistorebtn2"
        else document.getElementById("infi24").className = "infinistorebtnlocked"
        if (player.infinityPoints.gte(3)) document.getElementById("infi31").className = "infinistorebtn3"
        else document.getElementById("infi31").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("timeMult2") && player.infinityPoints.gte(5)) document.getElementById("infi32").className = "infinistorebtn3"
        else document.getElementById("infi32").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("unspentBonus") && player.infinityPoints.gte(7)) document.getElementById("infi33").className = "infinistorebtn3"
        else document.getElementById("infi33").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("resetMult") && player.infinityPoints.gte(10)) document.getElementById("infi34").className = "infinistorebtn3"
        else document.getElementById("infi34").className = "infinistorebtnlocked"
        if (player.infinityPoints.gte(20)) document.getElementById("infi41").className = "infinistorebtn4"
        else document.getElementById("infi41").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset1") && player.infinityPoints.gte(40)) document.getElementById("infi42").className = "infinistorebtn4"
        else document.getElementById("infi42").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset2") && player.infinityPoints.gte(80)) document.getElementById("infi43").className = "infinistorebtn4"
        else document.getElementById("infi43").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset3") && player.infinityPoints.gte(500)) document.getElementById("infi44").className = "infinistorebtn4"
        else document.getElementById("infi44").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints.gte(player.infMultCost)) {
            document.getElementById("infiMult").className = "infinimultbtn"
        } else document.getElementById("infiMult").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e4)) document.getElementById("postinfi11").className = "infinistorebtn1"
        else document.getElementById("postinfi11").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e4)) document.getElementById("postinfi21").className = "infinistorebtn1"
        else document.getElementById("postinfi21").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost)) document.getElementById("postinfi31").className = "infinimultbtn"
        else document.getElementById("postinfi31").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e11)) document.getElementById("postinfi41").className = "infinistorebtn1"
        else document.getElementById("postinfi41").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e5)) document.getElementById("postinfi12").className = "infinistorebtn1"
        else document.getElementById("postinfi12").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e6)) document.getElementById("postinfi22").className = "infinistorebtn1"
        else document.getElementById("postinfi22").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e7)) document.getElementById("postinfi32").className = "infinistorebtn1"
        else document.getElementById("postinfi32").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.dimensionMultDecreaseCost)) document.getElementById("postinfi42").className = "infinimultbtn"
        else document.getElementById("postinfi42").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(20e6)) document.getElementById("postinfi13").className = "infinistorebtn1"
        else document.getElementById("postinfi13").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e9)) document.getElementById("postinfi23").className = "infinistorebtn1"
        else document.getElementById("postinfi23").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e15)) document.getElementById("postinfi33").className = "infinistorebtn1"
        else document.getElementById("postinfi33").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.offlineProdCost)) document.getElementById("offlineProd").className = "infinimultbtn"
        else document.getElementById("offlineProd").className = "infinistorebtnlocked"

    }
    if (player.infinityPoints.equals(0)){
        document.getElementById("infi11").className = "infinistorebtnlocked"
        document.getElementById("infi12").className = "infinistorebtnlocked"
        document.getElementById("infi13").className = "infinistorebtnlocked"
        document.getElementById("infi14").className = "infinistorebtnlocked"
        document.getElementById("infi21").className = "infinistorebtnlocked"
        document.getElementById("infi22").className = "infinistorebtnlocked"
        document.getElementById("infi23").className = "infinistorebtnlocked"
        document.getElementById("infi24").className = "infinistorebtnlocked"
        document.getElementById("infi31").className = "infinistorebtnlocked"
        document.getElementById("infi32").className = "infinistorebtnlocked"
        document.getElementById("infi33").className = "infinistorebtnlocked"
        document.getElementById("infi34").className = "infinistorebtnlocked"
        document.getElementById("infi41").className = "infinistorebtnlocked"
        document.getElementById("infi42").className = "infinistorebtnlocked"
        document.getElementById("infi43").className = "infinistorebtnlocked"
        document.getElementById("infi44").className = "infinistorebtnlocked"
        document.getElementById("infiMult").className = "infinistorebtnlocked"

    }

    if (player.autobuyers[11]%1 === 0 || player.autobuyers[11].interval>100) document.getElementById("break").className = "infinistorebtnlocked"
    else document.getElementById("break").className = "infinistorebtn2"


    if (player.resets > 4) {
        document.getElementById("confirmation").style.display = "inline-block";
        document.getElementById("sacrifice").style.display = "inline-block";
    } else {
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("sacrifice").style.display = "none";
    }

    if (player.infinitied > 0) document.getElementById("sacrifice").style.display = "inline-block";

    if (player.eightAmount > 0 && player.resets > 4 && player.currentEternityChall !== "eterc3") document.getElementById("sacrifice").className = "storebtn"
    else document.getElementById("sacrifice").className = "unavailablebtn"

    if (player.autobuyers[11]%1 !== 0 && player.autobuyers[11].interval == 100) {
        document.getElementById("postinftable").style.display = "inline-block"
    } else {
        document.getElementById("postinftable").style.display = "none"
    }

    if (player.autobuyers[11].interval == 100) document.getElementById("abletobreak").style.display = "none"


    document.getElementById("infinitybtn").style.display = "none";
    document.getElementById("challengesbtn").style.display = "none";

    if (player.money.gte(Number.MAX_VALUE) && (((player.currentChallenge != "" && player.money.gte(player.challengeTarget)) && !player.options.retryChallenge) || (player.bestInfinityTime > 600 && !player.break))) {
        document.getElementById("dimensionsbtn").style.display = "none";
        document.getElementById("optionsbtn").style.display = "none";
        document.getElementById("statisticsbtn").style.display = "none";
        document.getElementById("achievementsbtn").style.display = "none";
        document.getElementById("challengesbtn").style.display = "none";
        document.getElementById("infinitybtn").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
    } else {
        document.getElementById("dimensionsbtn").style.display = "inline-block";
        document.getElementById("optionsbtn").style.display = "inline-block";
        document.getElementById("statisticsbtn").style.display = "inline-block";
        document.getElementById("achievementsbtn").style.display = "inline-block";
        if (player.infinitied > 0) {
            document.getElementById("infinitybtn").style.display = "inline-block";
            document.getElementById("challengesbtn").style.display = "inline-block";
        }
    }

    document.getElementById("epmult").className = player.eternityPoints.gte(player.epmultCost) ? "eternityupbtn" : "eternityupbtnlocked"

    document.getElementById('epmultauto').textContent="Auto: O"+(player.autoEterOptions.epmult?"N":"FF")

    if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("bulkdimboost").style.display = "inline"
    else document.getElementById("bulkdimboost").style.display = "none"

    if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi11").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi21").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi12").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi22").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi13").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("45Mult")) document.getElementById("infi23").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("resetBoost")) document.getElementById("infi14").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("galaxyBoost")) document.getElementById("infi24").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("timeMult2")) document.getElementById("infi31").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("unspentBonus")) document.getElementById("infi32").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("resetMult")) document.getElementById("infi33").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("passiveGen")) document.getElementById("infi34").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset1")) document.getElementById("infi41").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset2")) document.getElementById("infi42").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset3")) document.getElementById("infi43").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipResetGalaxy")) document.getElementById("infi44").className = "infinistorebtnbought"

    if (player.infinityUpgrades.includes("totalMult")) document.getElementById("postinfi11").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("currentMult")) document.getElementById("postinfi21").className = "infinistorebtnbought"
    if (player.tickSpeedMultDecrease <= 2) document.getElementById("postinfi31").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("achievementMult")) document.getElementById("postinfi22").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("infinitiedMult")) document.getElementById("postinfi12").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("postGalaxy")) document.getElementById("postinfi41").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("challengeMult")) document.getElementById("postinfi32").className = "infinistorebtnbought"
    if (player.dimensionMultDecrease <= 3) document.getElementById("postinfi42").className = "infinistorebtnbought"
    if (player.offlineProd == 50) document.getElementById("offlineProd").className = "infinistorebtnbought"


    if (player.infinityUpgrades.includes("infinitiedGeneration")) document.getElementById("postinfi13").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("postinfi23").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) document.getElementById("postinfi33").className = "infinistorebtnbought"

    if (player.currentChallenge !== "") {
        document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(player.challengeTarget) * 100), 100).toFixed(2) + "%"
        document.getElementById("progresspercent").textContent = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(player.challengeTarget) * 100), 100).toFixed(2) + "%"
        document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to challenge goal")
    } else if (!player.break) {
        document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
        document.getElementById("progresspercent").textContent = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
        document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Infinity")
    } else if (player.infDimensionsUnlocked.includes(false)) {
        document.getElementById("progressbar").style.width = Decimal.min(player.money.e / getNewInfReq().e * 100, 100).toFixed(2) + "%"
        document.getElementById("progresspercent").textContent = Decimal.min(player.money.e / getNewInfReq().e * 100, 100).toFixed(2) + "%"
        document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to next dimension unlock")
    } else {
        document.getElementById("progressbar").style.width = Decimal.min(Decimal.log10(player.infinityPoints.plus(1)) / Decimal.log10(Number.MAX_VALUE)  * 100, 100).toFixed(2) + "%"
        document.getElementById("progresspercent").textContent = Decimal.min(Decimal.log10(player.infinityPoints.plus(1)) / Decimal.log10(Number.MAX_VALUE)  * 100, 100).toFixed(2) + "%"
        document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Eternity")
    }

    if (player.eternities > 0) {
        document.getElementById("infinitybtn").style.display = "inline-block";
        document.getElementById("challengesbtn").style.display = "inline-block";
    }

    document.getElementById("ec1reward").textContent = "Reward: "+shortenMoney(Math.pow(Math.max(player.thisEternity*10, 1), 0.3+(ECTimesCompleted("eterc1")*0.05)))+"x on all Time Dimensions (based on time spent this Eternity)"
    document.getElementById("ec2reward").textContent = "Reward: Infinity power affects 1st Infinity Dimension with reduced effect, Currently: "+shortenMoney(player.infinityPower.pow(1.5/(700 - ECTimesCompleted("eterc2")*100)).min(E("1e100")).max(1))+"x"
    document.getElementById("ec3reward").textContent = "Reward: Increase the multiplier for buying 10 dimensions, Currently: "+getDimensionPowerMultiplier().toFixed(2)+"x"
    document.getElementById("ec4reward").textContent = "Reward: Infinity Dimension multiplier from unspent IP, Currently: "+shortenMoney(player.infinityPoints.pow(0.003 + ECTimesCompleted("eterc4")*0.002).min(E("1e200")))+"x"
    document.getElementById("ec5reward").textContent = "Reward: Galaxy cost scaling starts "+((ECTimesCompleted("eterc5")*5))+" galaxies later."
    document.getElementById("ec6reward").textContent = "Reward: Further reduce the dimension cost multiplier increase, Currently: "+player.dimensionMultDecrease.toFixed(1)+"x "
    document.getElementById("ec7reward").textContent = "Reward: First Time dimension produces Eighth Infinity Dimensions, Currently: "+shortenMoney(getTimeDimensionProduction(1).pow(ECTimesCompleted("eterc7")*0.2).minus(1).max(0))+" per second. "
    document.getElementById("ec8reward").textContent = "Reward: Infinity power powers up replicanti galaxies, Currently: " + (Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0) * 100).toFixed(2) + "%"
    document.getElementById("ec9reward").textContent = "Reward: Infinity Dimension multiplier based on time shards, Currently: "+shortenMoney(player.timeShards.pow(ECTimesCompleted("eterc9")*0.1).min(E("1e400")))+"x "
    document.getElementById("ec10reward").textContent = "Reward: Time dimensions gain a multiplier from infinitied stat, Currently: "+shortenMoney(E(Math.max(Math.pow(getInfinitied(), 0.9) * ECTimesCompleted("eterc10") * 0.000002+1, 1)).pow((player.timestudy.studies.includes(31)) ? 4 : 1))+"x "
    document.getElementById("ec11reward").textContent = "Reward: Further reduce the tickspeed cost multiplier increase, Currently: "+player.tickSpeedMultDecrease.toFixed(2)+"x "
    document.getElementById("ec12reward").textContent = "Reward: Infinity Dimension cost multipliers are reduced. (x^"+(1-ECTimesCompleted("eterc12")*0.008)+")"

    el('ec13reward').textContent = `Reward: Increase the exponent of meta-antimatter’s effect formula. Currently: +${(ECTimesCompleted('eterc13')/5).toFixed(1)}`
    el('ec14reward').textContent = `Reward: The IP mult multiplies IP gain per upgrade. (2.0x -> ${(2+ECTimesCompleted('eterc14')/5).toFixed(1)}x)`
    el('ec15reward').textContent = `Reward: Decrease dilation’s penalty. (^0.75 -> ^${(.75+ECTimesCompleted('eterc15')/100).toFixed(2)})`

    // let extraGals = 0
    // if (player.timestudy.studies.includes(225)) extraGals += Math.floor(player.replicanti.amount.e / 2500)
    // if (player.timestudy.studies.includes(226)) extraGals += Math.floor(player.replicanti.gal / 40)
    // if (extraGals !== 0) document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + "+"+extraGals+ " replicated galaxies created."
    // else document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."

    document.getElementById("ec10span").textContent = shortenMoney(ec10bonus) + "x"
    var scale1 = [2.82e-45,1e-42,7.23e-30,5e-21,9e-17,6.2e-11,5e-8,3.555e-6,7.5e-4,1,2.5e3,2.6006e6,3.3e8,5e12,4.5e17,1.08e21,1.53e24,1.41e27,5e32,8e36,1.7e45,1.7e48,3.3e55,3.3e61,5e68,1e73,3.4e80,1e113,Number.MAX_VALUE,E("1e65000")];
    var scale2 = [" protons."," nucleui."," Hydrogen atoms."," viruses."," red blood cells."," grains of sand."," grains of rice."," teaspoons."," wine bottles."," fridge-freezers."," Olympic-sized swimming pools."," Great Pyramids of Giza."," Great Walls of China."," large asteroids.",
                " dwarf planets."," Earths."," Jupiters."," Suns."," red giants."," hypergiant stars."," nebulas."," Oort clouds."," Local Bubbles."," galaxies."," Local Groups."," Sculptor Voids."," observable universes."," Dimensions.", " Infinity Dimensions.", " Time Dimensions."];
    var id = 0;
    if (player.money.times(4.22419e-105).gt(2.82e-45)) {
        if (player.money.times(4.22419e-105).gt(scale1[scale1.length - 1])) id = scale1.length - 1;
        else {
            while (player.money.times(4.22419e-105).gt(scale1[id])) id++;
            if (id > 0) id--;
        }
        if (id >= 7 && id < 11) document.getElementById("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to fill " + formatValue(player.options.notation, player.money * 4.22419e-105 / scale1[id], 2, 1) + scale2[id];
        else document.getElementById("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to make " + formatValue(player.options.notation, player.money.times(4.22419e-105).dividedBy(scale1[id]), 2, 1) + scale2[id];
    } else { //does this part work correctly? i doubt it does
        if (player.money.times(1e-54) < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-54 / player.money, 2, 1) + " attometers cubed, you would have enough to make a proton."
        else if (player.money * 1e-63 < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-63 / player.money, 2, 1) + " zeptometers cubed, you would have enough to make a proton."
        else if (player.money * 1e-72 < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-72 / player.money, 2, 1) + " yoctometers cubed, you would have enough to make a proton."
        else document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 4.22419e-105 / player.money, 2, 1) + " planck volumes, you would have enough to make a proton."
    }
    if (player.money.gt(E("1e100000"))) {
        document.getElementById("infoScale").innerHTML = "<br>If you wrote 3 numbers a second, it would take you <br>" + timeDisplay(player.money.log10()*10/3) + "<br> to write down your antimatter amount.";
    }

    var shiftRequirement = tmp.dimBoostReq

    if (player[TIER_NAMES[shiftRequirement.tier] + 'Bought'] >= shiftRequirement.amount) {
        document.getElementById("softReset").className = 'storebtn';
    } else {
        document.getElementById("softReset").className = 'unavailablebtn';
    }

    if (player.eightBought >= tmp.galaxyReq) {
        document.getElementById("secondSoftReset").className = 'storebtn';
    } else {
        document.getElementById("secondSoftReset").className = 'unavailablebtn';
    }

    if (player.currentChallenge == "challenge4" && player.sixthBought >= tmp.galaxyReq) {
        document.getElementById("secondSoftReset").className = 'storebtn';
    }

    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") document.getElementById("chall2Pow").style.display = "inline-block"
    else document.getElementById("chall2Pow").style.display = "none"
    if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") document.getElementById("chall3Pow").style.display = "inline-block"
    else document.getElementById("chall3Pow").style.display = "none"

    document.getElementById("chall2Pow").textContent = (player.chall2Pow*100).toFixed(2) + "%"
    document.getElementById("chall3Pow").textContent = shorten(player.chall3Pow*100) + "%"


    if (player.infDimensionsUnlocked[7] == false && player.break && player.eternities <= 24) {
        document.getElementById("newDimensionButton").style.display = "inline-block"
    } else document.getElementById("newDimensionButton").style.display = "none"

    if (player.money.gte(getNewInfReq())) document.getElementById("newDimensionButton").className = "newdim"
    else document.getElementById("newDimensionButton").className = "newdimlocked"

    var infdimpurchasewhileloop = 1;
    while (player.eternities > 24 && getNewInfReq().lt(player.money) && player.infDimensionsUnlocked[7] === false) {
        for (i=0; i<8; i++) {
            if (player.infDimensionsUnlocked[i]) infdimpurchasewhileloop++
        }
        newDimension()
        if (player.infDimBuyers[i-1]) buyMaxInfDims(infdimpurchasewhileloop)
        infdimpurchasewhileloop = 1;
    }

    document.getElementById("newDimensionButton").textContent = "Get " + shortenCosts(getNewInfReq()) + " antimatter to unlock a new Dimension."

    document.getElementById("sacrifice").setAttribute('ach-tooltip', "Boosts 8th Dimension by " + formatValue(player.options.notation, tmp.sacPow, 2, 2) + "x");

    document.getElementById("sacrifice").textContent = "Dimensional Sacrifice ("+formatValue(player.options.notation, calcSacrificeBoost(), 2, 2)+"x)"
    if (isNaN(player.totalmoney)) player.totalmoney = E(10)
    if (player.timestudy.studies.includes(181)) player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints().times(diff/1000))
    if (player.dilation.upgrades.includes(12)) {
        player.timestudy.theorem = player.timestudy.theorem.add(getDU12Effect().mul(diff/10))
        if (document.getElementById("timestudies").style.display != "none" && document.getElementById("eternitystore").style.display != "none") {
            if (player.timestudy.theorem.gte(99999)) document.getElementById("timetheorems").innerHTML = "You have <span style='display:inline' class=\"TheoremAmount\">"+shortenMoney(player.timestudy.theorem)+"</span> Time "+"Theorems."
            else document.getElementById("timetheorems").innerHTML = "You have <span style='display:inline' class=\"TheoremAmount\">"+player.timestudy.theorem.toFixed(0)+"</span> Time "+ (player.timestudy.theorem == 1 ? "Theorem." : "Theorems.")
            updateTimeStudyButtons()
        }
    }

    if (player.dilation.active && hasTSTier(2,102) && player.dilation.totalTachyonParticles.lt(tmp.tachyonGain)) {
        player.dilation.totalTachyonParticles = tmp.tachyonGain
        player.dilation.tachyonParticles = tmp.tachyonGain
    }

    document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."

    player.lastUpdate = thisUpdate;

    if (!noPass) {
        passed--
    }
}

function simulateTime(seconds, real) {

    //the game is simulated at a 50ms update rate, with a max of 1000 ticks
    //warning: do not call this function with real unless you know what you're doing
    document.getElementById("offlineprogress").style.display = "block"
    var ticks = seconds * 20;
    var bonusDiff = 0;
    var playerStart = Object.assign({}, player);
    if (ticks > 1000 && !real) {
        bonusDiff = (ticks - 1000) / 20;
        ticks = 1000;
    }
    let ticksDone = 0
    for (ticksDone=0; ticksDone<ticks; ticksDone++) {
        gameLoop(50+bonusDiff)
        autoBuyerTick();
        if (real) console.log(ticksDone)
    }
    var popupString = "While you were away"
    if (player.money.gt(playerStart.money)) popupString+= ",<br> your antimatter increased "+shortenMoney(player.money.log10() - (playerStart.money).log10())+" orders of magnitude"
    if (player.infinityPower.gt(playerStart.infinityPower)) popupString+= ",<br> infinity power increased "+shortenMoney(player.infinityPower.log10() - (Decimal.max(playerStart.infinityPower, 1)).log10())+" orders of magnitude"
    if (player.timeShards.gt(playerStart.timeShards)) popupString+= ",<br> time shards increased "+shortenMoney(player.timeShards.log10() - (Decimal.max(playerStart.timeShards, 1)).log10())+" orders of magnitude"
    if (player.infinitied > playerStart.infinitied || player.eternities > playerStart.eternities) popupString+= ","
    else popupString+= "."
    if (player.infinitied > playerStart.infinitied) popupString+= "<br>you infinitied "+(player.infinitied-playerStart.infinitied)+" times."
    if (player.eternities > playerStart.eternities) popupString+= " <br>you eternitied "+(player.eternities-playerStart.eternities)+" times."
    if (popupString.length == 20) {
        popupString = popupString.slice(0, -1);
        popupString+= "... Nothing happened."
        giveAchievement("While you were away... Nothing happened.")
    }

    document.getElementById("offlinePopup").innerHTML = popupString
}

function startInterval() {
    gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
}

function enableChart() {
    if (document.getElementById("chartOnOff").checked) {
        player.options.chart.on = true;
        if (player.options.chart.warning < 1) alert("Warning: the chart can cause performance issues. Please disable it if you're experiencing lag.")
    } else {
        player.options.chart.on = false;
    }
}

function enableChartDips() {
    if (document.getElementById("chartDipsOnOff").checked) {
        player.options.chart.dips = true;
    } else {
        player.options.chart.dips = false;
    }
}

function updateChart(first) {
    if (first !== true && (player.infinitied >= 1 || player.eternities >= 1) && player.options.chart.on === true) {
        if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") {
            addData(normalDimChart, "0", getDimensionProductionPerSecond(1).times(player.chall3Pow));
        } else {
            addData(normalDimChart, "0", getDimensionProductionPerSecond(1));
        }
    }
    if (player.options.chart.updateRate) {
        setTimeout(updateChart, player.options.chart.updateRate);
    } else {
        setTimeout(updateChart, 1000);
    }
}
updateChart(true);

var slider = document.getElementById("updaterateslider");
var sliderText = document.getElementById("updaterate");

slider.oninput = function() {
    player.options.updateRate = parseInt(this.value);
    sliderText.textContent = "Update rate: " + this.value + "ms"
    if (player.options.updateRate === 200) giveAchievement("You should download some more RAM")
    clearInterval(gameLoopIntervalId);
    gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
}

function dimBoolean() {
    let sr = tmp.dimBoostReq

    var name = TIER_NAMES[sr.tier]
    if (!player.autobuyers[9].isOn) return false
    if (player.autobuyers[9].ticks*100 < player.autobuyers[9].interval) return false
    if (player[name + "Amount"] > sr) return true
    if (player.eternities < 10 && player[name + "Amount"] < getShiftRequirement(player.autobuyers[9].bulk-1).amount) return false
    if (player.overXGalaxies <= player.galaxies) return true
    if ((player.currentChallenge =="challenge4" || player.currentChallenge == "postc1") && player.autobuyers[9].priority < sr.amount && sr.tier == 6) return false
    if (player.autobuyers[9].priority < sr.amount && sr.tier == 8) return false
    return true
}


function maxBuyGalaxies(manual) {
    if (player.currentEternityChall == "eterc6" || player.currentChallenge == "challenge11" || player.currentChallenge == "postc1" || player.currentChallenge == "postc7") return
    if (player.autobuyers[10].priority > player.galaxies || manual) {
        let amount=getAmount(inNC(4)?6:8)
		galaxyReset(bulkNumberFromFunction(getGalaxyRequirement,amount))
    }
}

function maxBuyDimBoosts(manual) {
	let tier = 8
    let sr = tmp.dimBoostReq
	if (player.autobuyers[9].priority >= getAmount(tier) || player.galaxies >= player.overXGalaxies || sr.tier < tier || manual) {
		var bought = Math.min(getAmount(sr.tier), (player.galaxies >= player.overXGalaxies || manual) ? 1/0 : player.autobuyers[9].priority)
		var r
		if (player.currentEternityChall == "eterc5") {
			r = 1
			while (bought >= getShiftRequirement(r).amount) r++
		} else {
			r = bulkNumberFromFunctionWithObject(getShiftRequirement,getAmount(sr.tier),'amount')
		}

		if (r >= 750) giveAchievement("Costco sells dimboosts now")
		if (r >= 1) softReset(r)
	}
}

function inNC(x, n) {
	if (x == 0) return player.currentChallenge == ""
	return player.currentChallenge == "challenge" + x
}

function getEternitied() {
	let total = player.eternities
	return total
}

var timer = 0
function autoBuyerTick() {
    if (player.quantum.speedruns > 20 && player.quantum.buyer.isOn && tmp.quarksGain.gte(player.quantum.buyer.limit) && (player.quantum.chal.active == 0 || player.money.l >= QUANTUM_CHALLENGES[player.quantum.chal.active].goal)) quantumReset(false,true)

    if (player.eternities >= 100 && player.eternityBuyer.isOn && gainedEternityPoints().gte(player.eternityBuyer.limit)) eternity(false, true)

    if (player.autobuyers[11]%1 !== 0) {
    if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval && player.money.gte(Number.MAX_VALUE)) {
        if (player.autobuyers[11].isOn) {
            if (player.autoCrunchMode == "amount") {
                if (!player.break || player.currentChallenge != "" || player.autobuyers[11].priority.lt(gainedInfinityPoints())) {
                    autoS = false;
                    document.getElementById("bigcrunch").click()
                }
            } else if (player.autoCrunchMode == "time"){
                if (!player.break || player.currentChallenge != "" || player.autobuyers[11].priority.lt(player.thisInfinityTime/10)) {
                    autoS = false;
                    document.getElementById("bigcrunch").click()
                }
            } else {
                if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.lastTenRuns[0][1].times(player.autobuyers[11].priority))) {
                    autoS = false;
                    document.getElementById("bigcrunch").click()
                }
            }
            player.autobuyers[11].ticks = 1;
        }
    } else player.autobuyers[11].ticks += 1;

    }


    if (player.autobuyers[10]%1 !== 0) {
        if (player.autobuyers[10].ticks*100 >= player.autobuyers[10].interval && (player.currentChallenge == "challenge4" ? player.sixthBought >= tmp.galaxyReq : player.eightBought >= tmp.galaxyReq)) {
            if (player.eternities < 9 || player.autobuyers[10].bulk == 0) {
                if (player.autobuyers[10].isOn && player.autobuyers[10].priority > player.galaxies) {
                    autoS = false;
                    document.getElementById("secondSoftReset").click()
                    player.autobuyers[10].ticks = 1;
                }
            } else if (player.autobuyers[10].isOn && (Math.round(timer * 100))%(Math.round(player.autobuyers[10].bulk * 100)) == 0){
                maxBuyGalaxies()
            }
        } else player.autobuyers[10].ticks += 1;
    }


    if (player.autobuyers[9]%1 !== 0) {
        if (player.autobuyers[9].isOn && dimBoolean()) {
            if (player.resets < 4) softReset(1)
            else if (player.eternities < 10) softReset(player.autobuyers[9].bulk)
            else if ((Math.round(timer * 100))%(Math.round(player.autobuyers[9].bulk * 100)) == 0 && player.eightBought >= tmp.dimBoostReq.amount) maxBuyDimBoosts()
            player.autobuyers[9].ticks = 0
        }
        player.autobuyers[9].ticks += 1;
    }

    if (player.autoSacrifice%1 !== 0) {
        if (calcSacrificeBoost().gte(player.autoSacrifice.priority) && player.autoSacrifice.isOn) {
            sacrifice(true)
        }
    }




    for (var i=0; i<priority.length; i++) {
        if (priority[i].ticks*100 >= priority[i].interval || priority[i].interval == 100) {
            if ((priority[i].isOn && canBuyDimension(priority[i].tier)) ) {
                if (priority[i] == player.autobuyers[8] ) {
                    if (priority[i].target == 10) buyMaxTickSpeed()
                    else buyTickSpeed()
                } else {
                    if (priority[i].target > 10) {

                        if (player.options.bulkOn) buyBulkDimension(priority[i].target-10, priority[i].bulk, true)
                        else buyBulkDimension(priority[i].target-10, 1, true)
                    }
                    else {
                        buyOneDimension(priority[i].target)
                    }
                }
                priority[i].ticks = 0;
            }
        } else priority[i].ticks += 1;
    }
    updateCosts()

}


setInterval(function() {
    timer += 0.05
    if (!player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 100)

setInterval(function() {
    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 50)


  //start scrolling
  scrollNextMessage();

document.getElementById("challenge2").onclick = function () {
  startChallenge("challenge2", Number.MAX_VALUE)
}

document.getElementById("challenge3").onclick = function () {
  startChallenge("challenge3", Number.MAX_VALUE)
}

document.getElementById("challenge4").onclick = function () {
  startChallenge("challenge4", Number.MAX_VALUE)
}

document.getElementById("challenge5").onclick = function () {
  startChallenge("challenge5", Number.MAX_VALUE);
}

document.getElementById("challenge6").onclick = function () {
  startChallenge("challenge6", Number.MAX_VALUE);
}

document.getElementById("challenge7").onclick = function () {
  startChallenge("challenge7", Number.MAX_VALUE);
}

document.getElementById("challenge8").onclick = function () {
  startChallenge("challenge8", Number.MAX_VALUE);
}

document.getElementById("challenge9").onclick = function () {
  startChallenge("challenge9", Number.MAX_VALUE);
}

document.getElementById("challenge10").onclick = function () {
  startChallenge("challenge10", Number.MAX_VALUE);
}

document.getElementById("challenge11").onclick = function () {
    startChallenge("challenge11", Number.MAX_VALUE);
  }

document.getElementById("challenge12").onclick = function () {
  startChallenge("challenge12", Number.MAX_VALUE);
}



function showInfTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('inftab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function showStatsTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('statstab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function showDimTab(tabName,init) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('dimtab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
    if (tabName === 'antimatterdimensions' && !init) document.getElementById("progress").style.display = "block"
    else document.getElementById("progress").style.display = "none"
}

function showChallengesTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('challengeTab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function showEternityTab(tabName, init) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('eternitytab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
    if (tabName === 'timestudies' && !init) document.getElementById("TTbuttons").style.display = "block"
    else document.getElementById("TTbuttons").style.display = "none"
    resizeCanvas()
}

function showAchTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('achtab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}




function init() {
    console.log('init');

    //setup the onclick callbacks for the buttons
    document.getElementById('dimensionsbtn').onclick = function () {
        showTab('dimensions');
    };
    document.getElementById('optionsbtn').onclick = function () {
        showTab('options');
    };
    document.getElementById('statisticsbtn').onclick = function () {
        showTab('statistics');
    };
    document.getElementById('achievementsbtn').onclick = function () {
        showTab('achievements');
    };
    document.getElementById('challengesbtn').onclick=function () {
      showTab('challenges');
    };
    document.getElementById('infinitybtn').onclick = function () {
        showTab('infinity');
    };
    document.getElementById("shopbtn").onclick = function () {
        showTab('shop')
        kong.updatePurchases();
    }
    document.getElementById("eternitystorebtn").onclick = function () {
        showTab('eternitystore')
    }
    document.getElementById("quantumstorebtn").onclick = function () {
        showTab('quantum')
    }
    //show one tab during init or they'll all start hidden
    showTab('dimensions')
    showInfTab('preinf')
    showStatsTab('stats')
    showDimTab('antimatterdimensions')
    showChallengesTab('challenges')
    showEternityTab('timestudies', true)
    showQuantumTab('quarks_tab')
    load_game();
    updateTickSpeed();
    updateAutobuyers();
    updateChallengeTimes()

    //if (typeof kongregate === 'undefined') document.getElementById("shopbtn").style.display = "none"

}









//Playfab stuff



function closeToolTip() {
    var elements = document.getElementsByClassName("popup")
    for (var i=0; i<elements.length; i++) elements[i].style.display = "none"
}

function tooltipLoad() {
    loadFromPlayFab()
    closeToolTip()
}

function tooltipSave() {
    saveToPlayFab()
    closeToolTip()
}



setInterval(function () {
    save_game()
}, 30000);

setInterval(function () {
    if (playFabId != -1 && player.options.cloud) playFabSaveCheck();
}, 1000*60*5)
updateCosts();
//updateInterval();
updateDimensions();
document.getElementById("hiddenheader").style.display = "none";

setupAllHTMLs()

window.onload = function() {
    startInterval()
    setTimeout(function() {
        if (kong.enabled) {
            playFabLogin();
            kong.updatePurchases();
        }
        else {
            document.getElementById("shopbtn").style.display = "none";
        }
        document.getElementById("container").style.display = "block"
        document.getElementById("loading").style.display = "none"
    }, 1000)

}

window.addEventListener('keydown', function(event) {
    if (keySequence == 0 && event.keyCode == 38) {
        keySequence++
    } else if (keySequence == 1 && event.keyCode == 38) {
        keySequence++
    } else if (keySequence == 2 && event.keyCode == 40) {
        keySequence++
    } else if (keySequence == 3 && event.keyCode == 40) {
        keySequence++
    } else if (keySequence == 4 && event.keyCode == 37) {
        keySequence++
    } else if (keySequence == 5 && event.keyCode == 39) {
        keySequence++
    } else if (keySequence == 6 && event.keyCode == 37) {
        keySequence++
    } else if (keySequence == 7 && event.keyCode == 39) {
        keySequence++
    } else if (keySequence == 8 && event.keyCode == 66) {
        keySequence++
    } else if (keySequence == 9 && event.keyCode == 65) {
        giveAchievement("30 Lives")
    } else {
        keySequence = 0;
    }
    if (event.keyCode == 17) controlDown = true;
    if (event.keyCode == 16) {
        shiftDown = true;
        document.getElementById("studytreeloadsavetext").textContent = "save:"
        drawStudyTree()
    }
    if ((controlDown && shiftDown && (event.keyCode == 67 || event.keyCode == 73 || event.keyCode == 74)) || event.keyCode == 123) {
        giveAchievement("Stop right there criminal scum!")
    }
}, false);

window.addEventListener('keyup', function(event) {
    if (event.keyCode == 17) controlDown = false;
    if (event.keyCode == 16) {
        shiftDown = false;
        document.getElementById("studytreeloadsavetext").textContent = "load:"
        drawStudyTree()
    }
}, false);

window.onfocus = function() {
    controlDown = false;
    shiftDown = false;
    document.getElementById("studytreeloadsavetext").textContent = "load:"
    drawStudyTree()
}

window.addEventListener('keydown', function(event) {
    if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text") return false
    const tmp = event.keyCode;
    if (tmp >= 49 && tmp <= 57) {
        if (tmp == 57) giveAchievement('s41',true)
        else if (shiftDown) buyOneDimension(tmp-48)
        else buyManyDimension(tmp-48)
        return false;
    } else if (tmp >= 97 && tmp <= 105) {
        if (tmp == 105) giveAchievement('s41',true)
        else if (shiftDown) buyOneDimension(tmp-96)
        else buyManyDimension(tmp-96)
        return false;
    }
    switch (event.keyCode) {
        case 65: // A
            toggleAutoBuyers();
        break;

        case 68: // D
            document.getElementById("softReset").onclick()
        break;

        case 71: // G
            document.getElementById("secondSoftReset").onclick()
        break;

        case 77: // M
            if (document.getElementById("antimatterdimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") document.getElementById("maxall").onclick()
            else if (document.getElementById("metadimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") maxAllMD()
        break;

        case 83: // S
            document.getElementById("sacrifice").onclick()
        break;

        case 84: // T
            if (shiftDown) buyTickSpeed()
            else buyMaxTickSpeed()
        break;

        case 82: //R
            replicantiGalaxy()
        break;
    }
  }, false);

  window.addEventListener('keyup', function(event) {
    if (event.keyCode === 70) {
        $.notify("Paying respects", "info")
        giveAchievement("It pays to have respect")
    }
    if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text") return false
    switch (event.keyCode) {
        case 67: // C
            document.getElementById("bigcrunch").onclick()
        break;

        case 69: // E, also, nice.
        document.getElementById("eternitybtn").onclick();
        break;

    }
  }, false);




init();
var totalMult = 1
var currentMult = 1
var infinitiedMult = 1
var achievementMult = 1
var challengeMult = 1
var unspentBonus = 1
var postc8Mult = E(0)
var mult18 = 1
var ec10bonus = E(1)
setInterval( function() {
    totalMult = Math.pow(player.totalmoney.e+1, 0.5)
    currentMult = Math.pow(player.money.e+1, 0.5)
    if (player.timestudy.studies.includes(31)) infinitiedMult = 1 + Math.pow(Math.log10(getInfinitied()+1)*10, 4)
    else infinitiedMult = 1+Math.log10(getInfinitied()+1)*10
    achievementMult = Math.max(Math.pow((player.achievements.length-30-getSecretAchAmount()), 3)/40,1)
    challengeMult = Decimal.max(10*3000/worstChallengeTime, 1)
    unspentBonus = player.infinityPoints.dividedBy(2).pow(1.5).plus(1)
    mult18 = tmp.finalNDmult[0].times(tmp.finalNDmult[7]).pow(0.02)
    if (player.currentEternityChall == "eterc10") {
        ec10bonus = Decimal.pow(getInfinitied(), 1000).max(1)
        if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4)
    } else {
        ec10bonus = E(1)
    }
}, 100)
