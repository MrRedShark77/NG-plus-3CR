var currentSave = 0;
var saves = {
  0: null,
  1: null,
  2: null
};

function getPlayerData() {
    let s = {
        money: E(10),
        tickSpeedCost: E(1000),
        tickspeed: E(1000),
        firstCost: E(10),
        secondCost: E(100),
        thirdCost: E(10000),
        fourthCost: E(1000000),
        fifthCost: E(1e9),
        sixthCost: E(1e13),
        seventhCost: E(1e18),
        eightCost: E(1e24),
        firstAmount: E(0),
        secondAmount: E(0),
        thirdAmount: E(0),
        fourthAmount: E(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: E(0),
        sixthAmount: E(0),
        seventhAmount: E(0),
        eightAmount: E(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        firstPow: E(1),
        secondPow: E(1),
        thirdPow: E(1),
        fourthPow: E(1),
        fifthPow: E(1),
        sixthPow: E(1),
        seventhPow: E(1),
        eightPow: E(1),
        sacrificed: E(0),
        achievements: [],
        infinityUpgrades: [],
        challenges: [],
        currentChallenge: "",
        infinityPoints: E(0),
        infinitied: 0,
        infinitiedBank: 0,
        totalTimePlayed: 0,
        bestInfinityTime: 9999999999,
        thisInfinityTime: 0,
        resets: 0,
        galaxies: 0,
        tickDecrease: 0.9,
        totalmoney: E(0),
        achPow: 1,
        newsArray: [],
        interval: null,
        lastUpdate: new Date().getTime(),
        autobuyers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        costMultipliers: [E(1e3), E(1e4), E(1e5), E(1e6), E(1e8), E(1e10), E(1e12), E(1e15)],
        tickspeedMultiplier: E(10),
        chall2Pow: 1,
        chall3Pow: E(0.01),
        matter: E(0),
        chall11Pow: E(1),
        partInfinityPoint: 0,
        partInfinitied: 0,
        break: false,
        challengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
        infchallengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
        lastTenRuns: [],
        lastTenEternities: [],
        infMult: E(1),
        infMultCost: E(10),
        tickSpeedMultDecrease: 10,
        tickSpeedMultDecreaseCost: 3e6,
        dimensionMultDecrease: 10,
        dimensionMultDecreaseCost: 1e8,
        overXGalaxies: 10,
        version: 10,
        postC3Reward: E(1),
        postC8Mult: E(1),
        infDimensionsUnlocked: [false, false, false, false, false, false, false, false],
        infinityPower: E(1),
        spreadingCancer: 0,
        postChallUnlocked: 0,
        postC4Tier: 0,
        postC3Reward: E(1),
        eternityPoints: E(0),
        eternities: 0,
        eternitiedBank: 0,
        thisEternity: 0,
        bestEternity: 9999999999,
        eternityUpgrades: [],
        epmult: E(1),
        epmultCost: E(500),
        galaxyMaxBulk: false,
        infinityDimension1 : {
            cost: E(1e8),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infinityDimension2 : {
            cost: E(1e9),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infinityDimension3 : {
            cost: E(1e10),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infinityDimension4 : {
            cost: E(1e20),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infinityDimension5 : {
            cost: E(1e140),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infinityDimension6 : {
            cost: E(1e200),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infinityDimension7 : {
            cost: E(1e250),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infinityDimension8 : {
            cost: E(1e280),
            amount: E(0),
            bought: 0,
            power: E(1),
            baseAmount: 0
        },
        infDimBuyers: [false, false, false, false, false, false, false, false],
        timeShards: E(0),
        tickThreshold: E(1),
        totalTickGained: 0,
        timeDimension1: {
            cost: E(1),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        timeDimension2: {
            cost: E(5),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        timeDimension3: {
            cost: E(100),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        timeDimension4: {
            cost: E(1000),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        timeDimension5: {
            cost: E("1e2350"),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        timeDimension6: {
            cost: E("1e2650"),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        timeDimension7: {
            cost: E("1e3000"),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        timeDimension8: {
            cost: E("1e3350"),
            amount: E(0),
            power: E(1),
            bought: 0
        },
        offlineProd: 0,
        offlineProdCost: 1e7,
        challengeTarget: 0,
        autoSacrifice: 1,
        replicanti: {
            amount: E(0),
            unl: false,
            chance: 0.01,
            chanceCost: E(1e150),
            interval: 1000,
            intervalCost: E(1e140),
            gal: 0,
            galaxies: 0,
            galCost: E(1e170),
            auto: [false, false, false, false],
            mult: 0,
        },
        timestudy: {
            auto: false,
            theorem: E(0),
            amcost: E("1e20000"),
            ipcost: E(1),
            epcost: E(1),
            studies: [],
        },
        autoEterOptions: {
            td1: false,
            td2: false,
            td3: false,
            td4: false,
            td5: false,
            td6: false,
            td7: false,
            td8: false,
            epmult: false,
        },
        ts_tier: [],
        eternityChalls: {},
        eternityChallGoal: E(Number.MAX_VALUE),
        currentEternityChall: "",
        eternityChallUnlocked: 0,
        etercreq: 0,
        autoIP: E(0),
        autoTime: 1e300,
        infMultBuyer: false,
        autoCrunchMode: "amount",
        respec: false,
        eternityBuyer: {
            limit: E(0),
            isOn: false
        },
        eterc8ids: 50,
        eterc8repl: 40,
        dimlife: true,
        dead: true,
        dilation: {
            studies: [],
            active: false,
            tachyonParticles: E(0),
            dilatedTime: E(0),
            totalTachyonParticles: E(0),
            nextThreshold: E(1000),
            freeGalaxies: 0,
            upgrades: [],
            rebuyables: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
            },
            auto_upg: false,
        },
        why: 0,
        options: {
            newsHidden: false,
            notation: "Mixed scientific",
            //Standard = normal prefixed numbers, Scientific = standard form, Engineering = powers of 3.
            scientific: false,
            challConf: false,
            sacrificeConfirmation: true,
            retryChallenge: false,
            bulkOn: true,
            cloud: true,
            hotkeys: true,
            theme: undefined,
            secretThemeKey: 0,
            eternityconfirm: true,
            dilationconfirm: true,
            quantumconfirm: true,
            commas: true,
            updateRate: 50,
            chart: {
                updateRate: 1000,
                duration: 10,
                warning: 0,
            },
            animations: {
                floatingText: true,
                bigCrunch: true,
                eternity: true,
                tachyonParticles: true,
                quantum: true,
            },
            hideCompletedAchs: false,
        },
        meta: {
            firstDBought: false,
            antimatter: E(10),
            best1: E(10),
            reset: 0,
            auto_reset: false,
        },
        quantum: getQuantumSave(),
    }

    for (let x = 0; x < 10; x++) {
        s.lastTenRuns.push([600*60*24*31, E(1)])
        s.lastTenEternities.push([600*60*24*31, E(1)])
    }

    for (let x = 1; x <= 8; x++) s.meta[x] = {
        amount: E(0),
        bought: 0,
        auto: false,
    }

    for (let x = 2; x < TS_TIERS.length; x++) s.ts_tier[x-2] = []

    return s
}

function loadPlayer(player) {
    let DATA = getPlayerData()
    return deepUndefinedAndDecimal(deepNaN(player, DATA), DATA)
}

function deepNaN(obj, data) {
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).m)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let x = 0; x < Object.keys(data).length; x++) {
        let k = Object.keys(data)[x]
        if (obj[k] === null || data[k] === undefined) continue;
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function onLoad() {
    player = loadPlayer(player)

    setupTemp()

    if (player.version<13) {
        player.version = 13

        let p = [[4,5,6,7,8,9,10],[5,6,7,9,10,11,12]]

        for (let i = 0; i < player.dilation.upgrades.length; i++) {
            if (p[0].includes(player.dilation.upgrades[i])) player.dilation.upgrades[i] = p[1][p[0].indexOf(player.dilation.upgrades[i])]
        }
    }

    if (player.version<13.001) {
        player.version = 13.001
        let checkTD = false

        for (let x = 1; x <= 8; x++) if (player['timeDimension'+x].cost.gte('1e4000')) {
            checkTD = true
            break
        }

        if (checkTD) {
            completelyResetTimeDimensions()

            $.notify('The game will resets all TDs because of TD cost new scaling!')
        }
    }

    if (player.version<13.002) {
        player.version = 13.002
        player.quantum.time = player.totalTimePlayed
    }

    if (player.version<13.003) {
        player.version = 13.003
        
        updateMultDecreases()
    }

    if (player.version<13.004) {
        player.version = 13.004
        
        player.timestudy.theorem = player.timestudy.theorem.round()
    }

    setTheme(player.options.theme);

    sliderText.textContent = "Update rate: " + player.options.updateRate + "ms";
    slider.value = player.options.updateRate;

    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].tier === undefined) {
            player.autobuyers[i].tier = i+1
        }
        if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].target%1 !== 0) {
            player.autobuyers[i].target = i+1
            if (i == 8) player.autobuyers[i].target = 1
        }

        if (player.autobuyers[i]%1 !== 0 && (player.autobuyers[i].bulk === undefined || isNaN(player.autobuyers[i].bulk) || player.autobuyers[i].bulk === null)) {
            player.autobuyers[i].bulk = 1
        }
    }
    if (player.autobuyers[8].tier == 10) player.autobuyers[8].tier = 9

    if (player.thirdAmount !== 0 || player.eternities >= 30) document.getElementById("fourthRow").style.display = "table-row";
    if (player.fourthAmount !== 0|| player.eternities >= 30)
    if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
    if (player.fifthAmount !== 0|| player.eternities >= 30)
    if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
    if (player.sixthBought !== 0|| player.eternities >= 30)
    if (player.resets > 2 && player.currentChallenge !== "challenge4" && player.currentChallenge !== "postc1") document.getElementById("seventhRow").style.display = "table-row";
    if (player.seventhAmount !== 0|| player.eternities >= 30)
    if (player.resets > 3 && player.currentChallenge !== "challenge4") document.getElementById("eightRow").style.display = "table-row";

    if (typeof player.autobuyers[9].bulk !== "number") {
        player.autobuyers[9].bulk = 1
    }
    if (player.eternities == 0) {
        document.getElementById("eternityPoints2").style.display = "none";
        document.getElementById("eternitystorebtn").style.display = "none";
        document.getElementById("tdtabbtn").style.display = "none";
    }

    if (player.quantum.unlocked) document.getElementById("quantumstorebtn").style.display = "";

    document.getElementById('replicantibulkmodetoggle').textContent="Mode: "+(player.galaxyMaxBulk?"Max":"Singles")

    document.getElementById("confirmation").checked = !player.options.sacrificeConfirmation

    transformSaveToDecimal();
    updateTemp()
    updateCosts();
    updateTickSpeed();
    updateAchievements();
    updateChallenges();
    updateCheckBoxes();
    toggleChallengeRetry()
    toggleChallengeRetry()
    toggleBulk()
    toggleBulk()
    toggleCloud()
    toggleCloud()
    respecToggle()
    respecToggle()
    toggleEternityConf()
    toggleEternityConf()
    toggleCommas()
    toggleCommas()

    if (!player.replicanti.auto[0]) document.getElementById("replauto1").textContent = "Auto: OFF"
    if (!player.replicanti.auto[1]) document.getElementById("replauto2").textContent = "Auto: OFF"
    if (!player.replicanti.auto[2]) document.getElementById("replauto3").textContent = "Auto: OFF"
    if (!player.replicanti.auto[3]) document.getElementById("replauto4").textContent = "Auto: OFF"

    loadAutoBuyerSettings();
    updateLastTenRuns()
    updateLastTenEternities()

    updateInfCosts()


    if (player.replicanti.unl == true) {
        document.getElementById("replicantidiv").style.display="inline-block"
        document.getElementById("replicantiunlock").style.display="none"
    } else {
        document.getElementById("replicantidiv").style.display="none"
        document.getElementById("replicantiunlock").style.display="inline-block"
    }

    if (player.currentChallenge == "challenge12" || player.currentChallenge == "challenge9" || player.currentChallenge == "challenge5" ||
        player.currentChallenge == "postc1" || player.currentChallenge == "postc4" || player.currentChallenge == "postc5" || player.currentChallenge == "postc6" || player.currentChallenge == "postc8") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";


    if (player.break == true) document.getElementById("break").textContent = "FIX INFINITY"
    document.getElementById("infiMult").innerHTML = "You get "+tmp.inf_mult_base.toFixed(1)+"x more IP.<br>Currently: "+shortenDimensions(tmp.infMultUpg.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"

    document.getElementById("notation").textContent = "Notation: " + player.options.notation

    document.getElementById("floatingTextAnimBtn").textContent = "Floating text: " + ((player.options.animations.floatingText) ? "ON" : "OFF")
    document.getElementById("bigCrunchAnimBtn").textContent = "Big crunch: " + ((player.options.animations.bigCrunch) ? "ON" : "OFF")
    document.getElementById("tachyonParticleAnimBtn").textContent = "Tachyon particles: " + ((player.options.animations.tachyonParticles) ? "ON" : "OFF")
    document.getElementById("quantumAnimBtn").textContent = "Quantum: " + ((player.options.animations.quantum) ? "ON" : "OFF")

    if (player.infinitied == 0 && player.eternities == 0) document.getElementById("infinityPoints2").style.display = "none"

    if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") document.getElementById("matter").style.display = "inline-block";
    else document.getElementById("matter").style.display = "none";

    if (player.eternityChallUnlocked !== 0) document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"

    clearOldAchieves()

    document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"

    for (var i=0; i<player.timestudy.studies.length; i++) {
        if (player.timestudy.studies[i] == 71 || player.timestudy.studies[i] == 81 || player.timestudy.studies[i] == 91 || player.timestudy.studies[i] == 101) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought normaldimstudy"
        } else if (player.timestudy.studies[i] == 72 || player.timestudy.studies[i] == 82 || player.timestudy.studies[i] == 92 || player.timestudy.studies[i] == 102) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought infdimstudy"
        } else if (player.timestudy.studies[i] == 73 || player.timestudy.studies[i] == 83 || player.timestudy.studies[i] == 93 || player.timestudy.studies[i] == 103) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought timedimstudy"
        } else if (player.timestudy.studies[i] == 121 || player.timestudy.studies[i] == 131 || player.timestudy.studies[i] == 141) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought activestudy"
        } else if (player.timestudy.studies[i] == 122 || player.timestudy.studies[i] == 132 || player.timestudy.studies[i] == 142) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought passivestudy"
        } else if (player.timestudy.studies[i] == 123 || player.timestudy.studies[i] == 133 || player.timestudy.studies[i] == 143) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought idlestudy"
        } else if (player.timestudy.studies[i] == 221 || player.timestudy.studies[i] == 224 || player.timestudy.studies[i] == 225 || player.timestudy.studies[i] == 228 || player.timestudy.studies[i] == 231 || player.timestudy.studies[i] == 234) {
            document.getElementById(player.timestudy.studies[i]).className = "timestudybought darkstudy"
        } else if (player.timestudy.studies[i] == 222 || player.timestudy.studies[i] == 223 || player.timestudy.studies[i] == 226 || player.timestudy.studies[i] == 227 || player.timestudy.studies[i] == 232 || player.timestudy.studies[i] == 233) {
            document.getElementById(player.timestudy.studies[i]).className = "timestudybought lightstudy"
        } else {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought"
        }
    }

    if (player.options.newsHidden) {
        document.getElementById("game").style.display = "none";
    }
    if (player.options.challConf) {
        document.getElementById("challengeconfirmation").textContent = "Challenge confirmation OFF"
    } else {
        document.getElementById("challengeconfirmation").textContent = "Challenge confirmation ON"
    }

    document.getElementById("chartDurationInput").value = player.options.chart.duration;
    document.getElementById("chartUpdateRateInput").value = player.options.chart.updateRate;
    if (player.options.chart.on) document.getElementById("chartOnOff").checked = true
    else document.getElementById("chartOnOff").checked = false
    if (player.options.chart.dips) document.getElementById("chartDipsOnOff").checked = true
    else document.getElementById("chartDipsOnOff").checked = false
    
    if (player.options.theme == "Dark" || player.options.theme == "Dark Metro") {
        Chart.defaults.global.defaultFontColor = '#888';
        normalDimChart.data.datasets[0].borderColor = '#888'
    } else {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    }

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

    if (player.replicanti.galaxybuyer) document.getElementById("replicantiresettoggle").textContent = "Auto galaxy ON"
    else document.getElementById("replicantiresettoggle").textContent = "Auto galaxy OFF"

    if (!player.options.hotkeys) document.getElementById("hotkeys").textContent = "Enable hotkeys"
    updateAutobuyers();
    setAchieveTooltip();
    updatePriorities();
    updateTheoremButtons();
    updateTimeStudyButtons();
    totalMult = Math.pow(player.totalmoney.e+1, 0.5)
    currentMult = Math.pow(player.money.e+1, 0.5)
    infinitiedMult = 1+Math.log10(getInfinitied()+1)*10
    achievementMult = Math.max(Math.pow((player.achievements.length-30), 3)/40,1)
    challengeMult = Decimal.max(10*3000/worstChallengeTime, 1)
    unspentBonus = player.infinityPoints.dividedBy(2).pow(1.5).plus(1)
    transformSaveToDecimal();
    updateChallengeTimes();
    updateMilestones();
    updateEternityUpgrades();
    loadInfAutoBuyers();
    resizeCanvas();
    checkForEndMe();
    updateEternityChallenges();
    updateDilationUpgradeCosts()
    updateHTMLOnLoad()
    let diff = new Date().getTime() - player.lastUpdate
    if (diff > 1000*1000) {
        simulateTime(diff/1000)
    }

    if (new Date().getHours() == 3 && new Date().getMinutes() == 0) giveAchievement('s46',true)

    document.getElementById("hideCompletedAchs").textContent=(player.options.hideCompletedAchs?"Show":"Hide")+" completed achievement rows"
}

function load_cloud_save(saveId, cloudPlayer) {
  saves[saveId] = cloudPlayer;

  if (window.location.href.split("//")[1].length > 20) set_save('dimensionTestSave2', saveId, cloudPlayer);
  else set_save('dimensionSave2', saveId, cloudPlayer);

  if (currentSave == saveId) {
    load_game();
    updateChallenges();
    transformSaveToDecimal();
  }
}

function load_game(root) {
  if (!root) {
    if (window.location.href.split("//")[1].length > 20) var root = get_save('dimensionTestSave2');
    else var root = get_save('dimensionSave2');
  }

  // Start: Migration for old save format
  if (root && !root.saves) {
    var _root = getRootSaveObject();
    _root.saves[currentSave] = root;
    root = _root;

    player = root.saves[currentSave];
    save_game();
  }
  // End: Migration

  // If there's no save, insert default root object
  if (!root) root = getRootSaveObject();

  currentSave = root.current;
  saves = root.saves;

  if (saves[currentSave]) player = saves[currentSave];

  onLoad();
}


function save_game(changed, silent) {
  if (window.location.href.split("//")[1].length > 20) set_save('dimensionTestSave2', currentSave, player);
  else set_save('dimensionSave2', currentSave, player);
  if (!silent) $.notify(changed ? "Game loaded" : "Game saved", "info")
}

function change_save(saveId) {
  // Save previous save to make sure no changes are lost
  save_game(false, true);
  closeToolTip();

  currentSave = saveId;

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
  IPminpeak = E(0)
  EPminpeak = E(0)
  player = saves[saveId] || defaultStart;
  save_game(true);
  load_game();
  updateChallenges()
  transformSaveToDecimal()
  showDimTab('antimatterdimensions')
  showStatsTab('stats')
  showChallengesTab('challenges')
  showEternityTab('timestudies', true)
}

function transformSaveToDecimal() {

  document.getElementById("eternitybtn").style.display = (player.infinityPoints.gte(Number.MAX_VALUE) || player.eternities > 0) ? "inline-block" : "none"

  if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autobuyers[11].priority !== "undefined")player.autobuyers[11].priority = E(player.autobuyers[11].priority)
}


function loadAutoBuyerSettings() {
  for (var i=0; i<9; i++) {
      document.getElementById("priority" + (i+1)).selectedIndex = player.autobuyers[i].priority-1
      if (i == 8 && player.autobuyers[i].target == 10) document.getElementById("toggleBtnTickSpeed").textContent = "Buys max"
      else if (i == 8 && player.autobuyers[i].target !== 10) document.getElementById("toggleBtnTickSpeed").textContent = "Buys singles"
      else if (player.autobuyers[i].target > 10) document.getElementById("toggleBtn" + (i+1)).textContent = "Buys until 10"
      else document.getElementById("toggleBtn" + (i+1)).textContent = "Buys singles"

  }
  document.getElementById("priority10").value = player.autobuyers[9].priority
  document.getElementById("priority11").value = player.autobuyers[10].priority
  document.getElementById("priority12").value = player.autobuyers[11].priority
  document.getElementById("overGalaxies").value = player.overXGalaxies
  document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
  document.getElementById("prioritySac").value = player.autoSacrifice.priority
  document.getElementById("bulkgalaxy").value = player.autobuyers[10].bulk
  document.getElementById("priority13").value = player.eternityBuyer.limit
  document.getElementById("priority14").value = player.quantum.buyer.limit

}

function set_save(name, saveId, value) {
	saves[saveId] = value;
    localStorage.setItem(name, btoa(JSON.stringify(getRootSaveObject(), function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
}

function get_save(name) {
  try {
    return JSON.parse(atob(localStorage.getItem(name)), function(k, v) { return (v === Infinity) ? "Infinity" : v; });
  } catch(e) { console.log("Fuck IE", e); }
}

function getRootSaveObject() {
  return {
    current: currentSave,
    saves: saves
  };
}

setTimeout(drawAnimations, 100)
setTimeout(onLoad, 100)