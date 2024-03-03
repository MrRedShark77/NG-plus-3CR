// Time studies

function buyWithAntimatter() {
  if (player.money.gte(player.timestudy.amcost)) {
      player.money = player.money.minus(player.timestudy.amcost)
      player.timestudy.amcost = player.timestudy.amcost.times(E("1e20000"))
      player.timestudy.theorem = player.timestudy.theorem.plus(1).round()
      updateTheoremButtons()
      updateTimeStudyButtons()
      return true
  } else return false
}

function buyWithIP() {
  if (player.infinityPoints.gte(player.timestudy.ipcost)) {
      player.infinityPoints = player.infinityPoints.minus(player.timestudy.ipcost)
      player.timestudy.ipcost = player.timestudy.ipcost.times(1e100)
      player.timestudy.theorem = player.timestudy.theorem.plus(1).round()
      updateTheoremButtons()
      updateTimeStudyButtons()
      return true
  } else return false
}

function buyWithEP() {
  if (player.timeDimension1.bought < 1) {
      alert("You need to buy at least 1 time dimension before you can purchase theorems with Eternity points.")
      return false;
  }
  if (player.eternityPoints.gte(player.timestudy.epcost)) {
      player.eternityPoints = player.eternityPoints.minus(player.timestudy.epcost)
      player.timestudy.epcost = player.timestudy.epcost.times(2)
      player.timestudy.theorem = player.timestudy.theorem.plus(1).round()
      updateTheoremButtons()
      updateTimeStudyButtons()
      updateEternityUpgrades()
      return true
  } else return false
}

function canBuyTTWithEP() {
	return player.timeDimension1.bought
}

function maxTheorems() {
    var gainTT = Math.floor((player.money.log10() - player.timestudy.amcost.log10()) / 20000 + 1)
	if (gainTT > 0) {
		player.timestudy.theorem = player.timestudy.theorem.plus(gainTT).round()
		player.timestudy.amcost = player.timestudy.amcost.times(Decimal.pow("1e20000", gainTT))
		player.money = player.money.sub(player.timestudy.amcost.div("1e20000"))
	}
	
	gainTT = Math.floor((player.infinityPoints.log10() - player.timestudy.ipcost.log10()) / 100 + 1)
	if (gainTT > 0) {
		player.timestudy.theorem = player.timestudy.theorem.plus(gainTT).round()
		player.timestudy.ipcost = player.timestudy.ipcost.times(Decimal.pow("1e100", gainTT))
		player.infinityPoints = player.infinityPoints.sub(player.timestudy.ipcost.div("1e100"))
	}
	
	gainTT = Math.floor(player.eternityPoints.div(player.timestudy.epcost).plus(1).log2())
	if (gainTT > 0 && canBuyTTWithEP()) {
		player.timestudy.theorem = player.timestudy.theorem.plus(gainTT).round()
		player.eternityPoints = player.eternityPoints.sub(Decimal.pow(2, gainTT).sub(1).times(player.timestudy.epcost))
		if (!break_infinity_js && isNaN(player.eternityPoints.logarithm)) player.eternityPoints = new Decimal(0)
		player.timestudy.epcost = player.timestudy.epcost.times(Decimal.pow(2, gainTT))
	}
  updateTheoremButtons()
  updateTimeStudyButtons()
  updateEternityUpgrades()
}

function updateTheoremButtons() {
  document.getElementById("theoremam").className = player.money.gte(player.timestudy.amcost) ? "timetheorembtn" : "timetheorembtnlocked"
  document.getElementById("theoremip").className = player.infinityPoints.gte(player.timestudy.ipcost) ? "timetheorembtn" : "timetheorembtnlocked"
  document.getElementById("theoremep").className = player.eternityPoints.gte(player.timestudy.epcost) ? "timetheorembtn" : "timetheorembtnlocked"
  document.getElementById("theoremep").innerHTML = "Buy Time Theorems <br>Cost: "+shortenDimensions(player.timestudy.epcost)+" EP"
  document.getElementById("theoremip").innerHTML = "Buy Time Theorems <br>Cost: "+shortenCosts(player.timestudy.ipcost)+" IP"
  document.getElementById("theoremam").innerHTML = "Buy Time Theorems <br>Cost: "+shortenCosts(player.timestudy.amcost)
  if (player.timestudy.theorem>99999) document.getElementById("timetheorems").innerHTML = "You have <span style='display:inline' class=\"TheoremAmount\">"+shortenMoney(player.timestudy.theorem)+"</span> Time "+"Theorems."
  else document.getElementById("timetheorems").innerHTML = "You have <span style='display:inline' class=\"TheoremAmount\">"+player.timestudy.theorem.toFixed(0)+"</span> Time "+ (player.timestudy.theorem == 1 ? "Theorem." : "Theorems.")
}

function buyTimeStudy(name, cost, check) {
  if (shiftDown && check === undefined) studiesUntil(name);
  else if (player.timestudy.theorem.gte(cost) && canBuyStudy(name) && !player.timestudy.studies.includes(name)) {
      player.timestudy.studies.push(name)
      player.timestudy.theorem  = player.timestudy.theorem.sub(cost)
      if (name == 71 || name == 81 || name == 91 || name == 101) {
          document.getElementById(""+name).className = "timestudybought normaldimstudy"
      } else if (name == 72 || name == 82 || name == 92 || name == 102) {
          document.getElementById(""+name).className = "timestudybought infdimstudy"
      } else if (name == 73 || name == 83 || name == 93 || name == 103) {
          document.getElementById(""+name).className = "timestudybought timedimstudy"
      } else if (name == 121 || name == 131 || name == 141) {
          document.getElementById(""+name).className = "timestudybought activestudy"
      } else if (name == 122 || name == 132 || name == 142) {
          document.getElementById(""+name).className = "timestudybought passivestudy"
      } else if (name == 123 || name == 133 || name == 143) {
          document.getElementById(""+name).className = "timestudybought idlestudy"
      } else if (name == 221 || name == 224 || name == 225 || name == 228 || name == 231 || name == 234) {
          document.getElementById(name).className = "timestudybought darkstudy"
      } else if (name == 222 || name == 223 || name == 226 || name == 227 || name == 232 || name == 233) {
          document.getElementById(name).className = "timestudybought lightstudy"
      } else {
          document.getElementById(""+name).className = "timestudybought"
      }
      if (name == 131) {
        if (player.replicanti.galaxybuyer) document.getElementById("replicantiresettoggle").textContent = "Auto galaxy ON (disabled)"
        else document.getElementById("replicantiresettoggle").textContent = "Auto galaxy OFF (disabled)"
      }
      updateTheoremButtons()
      updateTimeStudyButtons()
      drawStudyTree()
  }
}

function buyDilationStudy(name, cost) {
    if (player.timestudy.theorem.gte(cost) && canBuyDilationStudy(name) && !player.dilation.studies.includes(name)) {
        if (name === 1) {
            showEternityTab("dilation")
            document.getElementById("dilstudy1").innerHTML = "Unlock time dilation<span>Cost: 5000 Time Theorems"
        }
        if (name === 6) {
            showTab('dimensions')
            showDimTab("metadimensions")
            giveAchievement('r141',true)

            setTimeout(()=>{
                $.notify(`You've unlocked Time Study Tier II!`)
            },1000)
        }
        player.dilation.studies.push(name)
        player.timestudy.theorem = player.timestudy.theorem.sub(cost).round()
        document.getElementById("dilstudy"+name).className = "dilationupgbought"
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
  }

function hasRow(row) {
  for (var i=0; i<player.timestudy.studies.length; i++) {
      if (Math.floor(player.timestudy.studies[i]/10) == row) return true
  }
}

function canBuyStudy(name) {
  var row = Math.floor(name/10)
  var col = name%10
  if (name == 33) {
      if (player.timestudy.studies.includes(21)) return true; else return false
  }
  if (name == 62) {
      if (player.eternityChalls.eterc5 !== undefined && player.timestudy.studies.includes(42)) return true; else return false
  }

  if ((name == 71 || name == 72) && player.eternityChallUnlocked == 12) {
    return false;
  }

  if ((name == 72 || name == 73) && player.eternityChallUnlocked == 11) {
    return false;
  }

  if (name == 181) {
      if (player.eternityChalls.eterc1 !== undefined && player.eternityChalls.eterc2 !== undefined && player.eternityChalls.eterc3 !== undefined && player.timestudy.studies.includes(171)) return true; else return false;
  }
  if (name == 201) if(player.timestudy.studies.includes(192) && !player.dilation.upgrades.includes(10)) return true; else return false
  if (name == 211) if(player.timestudy.studies.includes(191)) return true; else return false
  if (name == 212) if(player.timestudy.studies.includes(191)) return true; else return false
  if (name == 213) if(player.timestudy.studies.includes(193)) return true; else return false
  if (name == 214) if(player.timestudy.studies.includes(193)) return true; else return false
  switch(row) {

      case 1: return true
      break;

      case 2:
      case 5:
      case 6:
      case 11:
      case 15:
      case 16:
      case 17:
      if (hasRow(row-1)) return true; else return false
      break;

      case 3:
      case 4:
      case 8:
      case 9:
      case 10:
      case 13:
      case 14:
      if (player.timestudy.studies.includes((row-1)*10 + col)) return true; else return false
      break;

      case 12:
      if (hasRow(row-1) && (!hasRow(row) || hasTSTier(2,63))) return true; else return false
      break;

      case 7:
      if (player.dilation.upgrades.includes(10)) {
        if (player.timestudy.studies.includes(61)) return true; else return false;
      } else if (!player.timestudy.studies.includes(201)) {
          if (player.timestudy.studies.includes(61) && !hasRow(row)) return true; else return false
      } else {
          if (player.timestudy.studies.filter(function(x) {return Math.floor(x / 10) == 7}).length < 2) return true; else return false
      }
      break;

      case 19:
      if (player.eternityChalls.eterc10 !== undefined && player.timestudy.studies.includes(181)) return true; else return false
      break;

      case 22:
      if (player.timestudy.studies.includes(210 + Math.round(col/2)) && (hasTSTier(2,111) || ((name%2 == 0) ? !player.timestudy.studies.includes(name-1) : !player.timestudy.studies.includes(name+1)))) return true; else return false
      break;

      case 23:
      if ( (player.timestudy.studies.includes(220 + Math.floor(col*2)) || player.timestudy.studies.includes(220 + Math.floor(col*2-1))) && (hasTSTier(2,111) || !player.timestudy.studies.includes((name%2 == 0) ? name-1 : name+1))) return true; else return false;
      break;
  }
}

function canBuyDilationStudy(name) {
    if (name == 1 && ECTimesCompleted("eterc11") >= 5 && ECTimesCompleted("eterc12") >= 5 && player.timestudy.amcost.log10() / 20000 + player.timestudy.ipcost.log10() / 100 + player.timestudy.epcost.log2() >= 13000) return true
    if (player.dilation.studies.includes(name-1) && player.timestudy.theorem >= [5000,1e6,1e7,1e8,1e9,1e15][name-1]) return true
    else return false
}

var all = [11, 21, 22, 33, 31, 32, 41, 42, 51, 61, 62, 71, 72, 73, 81, 82 ,83, 91, 92, 93, 101, 102, 103, 111, 121, 122, 123, 131, 132, 133, 141, 142, 143, 151, 161, 162, 171, 181, 191, 192, 193, 201, 211, 212, 213, 214, 221, 222, 223, 224, 225, 226, 227, 228, 231, 232, 233, 234]
var studyCosts = [1, 3, 2, 2, 3, 2, 4, 6, 3, 3, 3, 4, 6, 5, 4, 6, 5, 4, 5, 7, 4, 6, 6, 12, 9, 9, 9, 5, 5, 5, 4, 4, 4, 8, 7, 7, 15, 200, 400, 730, 300, 900, 120, 150, 200, 120, 900, 900, 900, 900, 900, 900, 900, 900, 500, 500, 500, 500]
function updateTimeStudyButtons() {
  for (var i=0; i<all.length; i++) {
      if (!player.timestudy.studies.includes(all[i])) {
          if (canBuyStudy(all[i]) && studyCosts[i]<=player.timestudy.theorem) {
              if (all[i] == 71 || all[i] == 81 || all[i] == 91 || all[i] == 101) {
                  document.getElementById(all[i]).className = "timestudy normaldimstudy"
              } else if (all[i] == 72 || all[i] == 82 || all[i] == 92 || all[i] == 102) {
                  document.getElementById(all[i]).className = "timestudy infdimstudy"
              } else if (all[i] == 73 || all[i] == 83 || all[i] == 93 || all[i] == 103) {
                  document.getElementById(all[i]).className = "timestudy timedimstudy"
              } else if (all[i] == 121 || all[i] == 131 || all[i] == 141) {
                  document.getElementById(all[i]).className = "timestudy activestudy"
              } else if (all[i] == 122 || all[i] == 132 || all[i] == 142) {
                  document.getElementById(all[i]).className = "timestudy passivestudy"
              } else if (all[i] == 123 || all[i] == 133 || all[i] == 143) {
                  document.getElementById(all[i]).className = "timestudy idlestudy"
              } else if (all[i] == 221 || all[i] == 224 || all[i] == 225 || all[i] == 228 || all[i] == 231 || all[i] == 234) {
                  document.getElementById(all[i]).className = "timestudy darkstudy"
              } else if (all[i] == 222 || all[i] == 223 || all[i] == 226 || all[i] == 227 || all[i] == 232 || all[i] == 233) {
                  document.getElementById(all[i]).className = "timestudy lightstudy"
              } else {
                  document.getElementById(all[i]).className = "timestudy"
              }
          }
          else {
              if (all[i] == 71 || all[i] == 81 || all[i] == 91 || all[i] == 101) {
                  document.getElementById(all[i]).className = "timestudylocked normaldimstudylocked"
              } else if (all[i] == 72 || all[i] == 82 || all[i] == 92 || all[i] == 102) {
                  document.getElementById(all[i]).className = "timestudylocked infdimstudylocked"
              } else if (all[i] == 73 || all[i] == 83 || all[i] == 93 || all[i] == 103) {
                  document.getElementById(all[i]).className = "timestudylocked timedimstudylocked"
              } else if (all[i] == 121 || all[i] == 131 || all[i] == 141) {
                  document.getElementById(all[i]).className = "timestudylocked activestudylocked"
              } else if (all[i] == 122 || all[i] == 132 || all[i] == 142) {
                  document.getElementById(all[i]).className = "timestudylocked passivestudylocked"
              } else if (all[i] == 123 || all[i] == 133 || all[i] == 143) {
                  document.getElementById(all[i]).className = "timestudylocked idlestudylocked"
              } else {
                  document.getElementById(all[i]).className = "timestudylocked"
              }
          }
      }
  }

  el('131').innerHTML = (player.quantum.speedruns>18?"You get 50% more replicanti galaxies":`Automatic replicanti galaxies are disabled, but you can get 50% more replicanti galaxies`)+`<span>Cost: 5 Time Theorems`

  for (i=1; i<7; i++) {
    if (player.dilation.studies.includes(i)) document.getElementById("dilstudy"+i).className = "dilationupgbought"
    else if (canBuyDilationStudy(i)) document.getElementById("dilstudy"+i).className = "dilationupg"
    else document.getElementById("dilstudy"+i).className = "timestudylocked"
  }
}

function studiesUntil(id) {
  var col = id % 10;
  var row = Math.floor(id / 10);
  var path = [0,0];
  for(var i=1;i<4;i++){
      if (player.timestudy.studies.includes(70+i)) path[0] = i;
      if (player.timestudy.studies.includes(120+i))path[1] = i;
  }
  if ((row > 10 && path[0] === 0) || (row > 14 && path[1] === 0)) {
      return;
  }
  for (var i = 1; i < row; i++) {
      var chosenPath = path[i > 11 ? 1 : 0];
      if (row > 6 && row < 11) var secondPath = col;
      if ((i > 6 && i < 11) || (i > 11 && i < 15)) buyTimeStudy(i * 10 + (chosenPath === 0 ? col : chosenPath), studyCosts[all.indexOf(i * 10 + (chosenPath === 0 ? col : chosenPath))], 0);
      if ((i > 6 && i < 11) && player.timestudy.studies.includes(201)) buyTimeStudy(i * 10 + secondPath, studyCosts[all.indexOf(i * 10 + secondPath)], 0);
      else for (var j = 1; all.includes(i * 10 + j) ; j++) buyTimeStudy(i * 10 + j, studyCosts[all.indexOf(i * 10 + j)], 0);
  }
  buyTimeStudy(id, studyCosts[all.indexOf(id)], 0);
}


function respecTimeStudies(tier=ts_tier_tab) {
    if (tier == 1) {
        for (var i=0; i<all.length; i++) {
            if (player.timestudy.studies.includes(all[i])) {
                player.timestudy.theorem = player.timestudy.theorem.add(studyCosts[i]).round()
            }
        }
        if (player.timestudy.studies.length === 0) giveAchievement("You do know how these work, right?")
        player.timestudy.studies = []
        switch(player.eternityChallUnlocked) {
          case 1:
          player.timestudy.theorem = player.timestudy.theorem.add(30).round()
          break;
    
          case 2:
          player.timestudy.theorem = player.timestudy.theorem.add(35).round()
          break;
    
          case 3:
          player.timestudy.theorem = player.timestudy.theorem.add(40).round()
          break;
    
          case 4:
          player.timestudy.theorem = player.timestudy.theorem.add(70).round()
          break;
    
          case 5:
          player.timestudy.theorem = player.timestudy.theorem.add(130).round()
          break;
    
          case 6:
          player.timestudy.theorem = player.timestudy.theorem.add(85).round()
          break;
    
          case 7:
          player.timestudy.theorem = player.timestudy.theorem.add(115).round()
          break;
    
          case 8:
          player.timestudy.theorem = player.timestudy.theorem.add(115).round()
          break;
    
          case 9:
          player.timestudy.theorem = player.timestudy.theorem.add(415).round()
          break;
    
          case 10:
          player.timestudy.theorem = player.timestudy.theorem.add(550).round()
          break;
    
          case 11:
          player.timestudy.theorem = player.timestudy.theorem.add(1).round()
          break;
    
          case 12:
          player.timestudy.theorem = player.timestudy.theorem.add(1).round()
          break;
        }

        if (player.eternityChallUnlocked<=12) player.eternityChallUnlocked = 0
    } else {
        let pts = player.ts_tier[tier-2]
        let k = []
        let costs = tmp.ts_tier.cost[tier]

        for (let i = 0; i < pts.length; i++) {
            if (TS_DIL[tier].includes(pts[i])) k.push(pts[i])
            player.timestudy.theorem = player.timestudy.theorem.add(costs[pts[i]]).round()
        }

        player.ts_tier[tier-2] = k
        if (player.eternityChallUnlocked>12) player.eternityChallUnlocked = 0
    }
  updateTimeStudyButtons()
  updateTheoremButtons()
  drawStudyTree()
  if (player.replicanti.galaxybuyer) document.getElementById("replicantiresettoggle").textContent = "Auto galaxy ON"
  else document.getElementById("replicantiresettoggle").textContent = "Auto galaxy OFF"
}

function exportStudyTree() {
  let output = document.getElementById('treeExportOutput');
  let parent = output.parentElement;

  parent.style.display = "";
  output.value = player.timestudy.studies + "|" + player.eternityChallUnlocked + "|" + player.ts_tier[0];

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

function importStudyTree(input) {
    if (typeof input !== 'string') var input = prompt()
    if (sha512_256(input) == "08b819f253b684773e876df530f95dcb85d2fb052046fa16ec321c65f3330608") giveAchievement("You followed the instructions")
    if (input === "") return false
    var studiesToBuy = input.split("|")[0].split(",");
    for (i=0; i<studiesToBuy.length; i++) {
        document.getElementById(studiesToBuy[i]).click();
    }
    if (input.split("|")[2]) {
        studiesToBuy = input.split("|")[2].split(",");
        for (i=0; i<studiesToBuy.length; i++) {
            buyTSTier(2,parseInt(studiesToBuy[i]),true)
        }
    }
    if (parseInt(input.split("|")[1]) !== 0) {
        justImported = true;
        document.getElementById("ec"+parseInt(input.split("|")[1])+"unl").click();
        setTimeout(function(){ justImported = false; }, 100);
    }
};

function studyTreeSaveButton(num) {
    if (shiftDown) {
        localStorage.setItem("studyTree"+num, player.timestudy.studies + "|" + player.eternityChallUnlocked + "|" + player.ts_tier[0]);
        $.notify("Study tree "+num+" saved", "info")
    } else if (localStorage.getItem("studyTree"+num) !== null && localStorage.getItem("studyTree"+num) !== "|0") {
        importStudyTree(localStorage.getItem("studyTree"+num));
        $.notify("Study tree "+num+" loaded", "info")
    }
}