 //Preload Images
$.fn.preload = function () {
    this.each(function () {
        $('<img/>')[0].src = this;
    });
}

$(['images/weed.jpg', 'images/weedbg.jpg', 'images/weedarrow.jpg', 'images/money.jpg', 'images/moneybg.jpg', 'images/moneyarrow.jpg', 'images/fertilizer.jpg', 'images/fertilizerbg.jpg', 'images/fertilizerarrow.jpg']).preload();

 //Savegame
var saveCrypt = "";

 //Coffe or Kush
var coffeeMod = false;
var weedOrCoffee = 'weed';

 //Quality Settings
var particlesDeactivated = false;
var menuflipDeactivated = false;
var softAnimations = false;
var expandAnimations = true;

var currentVersion = '2.7.0';

 //Resources and Resourceflow
var money = 0; //Resource
var mps = 0; //Income per Second | it's actually income / expense per 1/10th second. So 1 amps = 0.1 mps
var mes = 0; //Expense per Second

// achievement relevant variables
var clicks = 0;
var fClicks = 0;
var everClickedWeed = false;

var weed = 20; //starting values
var wps = 0;
var wes = 0;

var fertilizer = 10; //starting values
var fps = 0;
var fes = 0;

 //Clicked Amount
var cursorPower = 1;

 // UI
var introstep = 0;
var acvVisible = false;

//Achievements
var achievements = [];

achievements[0] = [0, 'Taste of Blood']; //
achievements[1] = [0, 'The Circle']; //
achievements[2] = [0, 'Click, Click']; //
achievements[3] = [0, 'Time to Rise']; //
achievements[4] = [0, 'Stunningly 3D']; //
achievements[5] = [0, 'Tenacious']; //
achievements[6] = [0, 'SFW']; //
achievements[7] = [0, 'It Begins']; //
achievements[8] = [0, 'Set for Life']; //
achievements[9] = [0, 'I feel so Slow']; //
achievements[10] = [0, 'The Horror']; //
achievements[11] = [0, 'The Dream'];
achievements[12] = [0, 'Rebel'];
achievements[13] = [0, 'With Pride'];
achievements[14] = [0, 'Insomnia'];
achievements[15] = [0, 'Straight Edge'];

 //Facility and DataHeap
var facilities = new Array(); //dealer, trailer, greenhouse, export1, etc

//amount[0], price[1], className[2], expense[3], income[4], type[5], text[6], unit[7]
//type: 1 - W to M; 2 - M to F; 3 - F to W 
facilities[0] = new Array(0, 15, '.dealer', 0.01, 0.05, 1, " Dealer - buy for ", "$"); //Dealer
facilities[1] = new Array(0, 30, '.trailer', 0.01, 0.05, 3, " Trailer - buy for ", "$"); //Trailer
facilities[2] = new Array(0, 500, '.appartment', 0.3, 1, 3, " Hippie Appartments - buy for ", "$"); //Appartment
facilities[3] = new Array(0, 300, '.export1', 0.2, 1, 1, " Coffee Shops - buy for ", "$"); //Export1
facilities[4] = new Array(0, 2500, '.enchantcursor1', 0, 0, 0, " Cursor Enchantments - buy for ", "g, $ and u"); //Echantcursor1


 facilities[7] = new Array(0, 2000, '.export2', 1, 8, 1, " Mafia Contracts - buy for ", "$"); //export2
 facilities[8] = new Array(0, 3000, '.greenhouse', 1, 10, 3, " Greenhouses - buy for ", "$"); //greenhouse
 facilities[9] = new Array(0, 8000, '.onlineshop', 3, 24, 1, " Online Shops - buy for ", "$");
facilities[10] = new Array(0, 32000, '.franchise', 12, 96, 1, " Franchise Licensings - buy for ", "$");
facilities[11] = new Array(0, 160000, '.marketing', 60, 500, 1, " Marketing Campaigns - buy for ", "$");
facilities[12] = new Array(0, 1280000, '.vendingmachines', 480, 4000, 1, " Vending Machine Clusters - buy for ", "$");
facilities[13] = new Array(0, 96000000, '.legalization1', 36000, 300000, 1, " Legalizations - buy for ", "$");
facilities[14] = new Array(0, 3072000000, '.conduit', 1260000, 10500000, 1, " Conduit Ratio Taxes - buy for ", "$");

facilities[15] = new Array(0, 10000, '.drill', 3, 30, 3, " Drill Extractors - buy for ", "$");
facilities[16] = new Array(0, 0, '.synthetic1', 0, 0, 3, " Synthetic THC Factories - buy for ", "$"); // DISABLED for now
facilities[17] = new Array(0, 40000, '.underwater', 12, 120, 3, " Underwater Plantages - buy for ", "$");
facilities[18] = new Array(0, 0, '.island', 0, 0, 3, " Islands of weed - buy for ", "$"); // DISABLED for now
facilities[19] = new Array(0, 200000, '.rainforest', 60, 600, 3, " Converted Rainforests - buy for ", "$");
facilities[20] = new Array(0, 1500000, '.orbital', 480, 4800, 3, " Orbital Colonies - buy for ", "$");
facilities[21] = new Array(0, 112500000, '.lunar', 36000, 360000, 3, " Lunar Hydrochambers - buy for ", "$");
facilities[22] = new Array(0, 3937500000, '.solar', 1260000, 12600000, 3, " Solar Orbit Concentrators - buy for ", "$");

facilities[23] = new Array(0, 40, '.localshop', 0.03, 0.05, 2, " Blackmailed Shops - buy for ", "$");
facilities[5] = new Array(0, 350, '.fakefarm', 1, 1, 2, " Undercover Farms - buy for ", "$"); //Fakefarm
facilities[24] = new Array(0, 2500, '.takeoverfactory', 5.5, 6, 2, " Hijacked Factories - buy for ", "$");
facilities[6] = new Array(0, 9000, '.fakefarm2', 17, 18, 2, " Nuclear Waste Facilities - buy for ", "$"); //Fakefarm2
facilities[25] = new Array(0, 40000, '.tradebonds1', 90, 110, 2, " Trading Bonds - buy for ", "$");
facilities[26] = new Array(0, 100000, '.oceanfilter', 2250, 3000, 2, " Ocean Filters - buy for ", "$");
facilities[27] = new Array(0, 200000000, '.alphacondenser', 4500000, 6000000, 2, " Alpha-Ray Condensers - buy for ", "$");


//Infrastructure Intervention
var moneyflow = 0;
var weedflow = 0;
var fertilizerflow = 0;

function clicked(type) {
    if (type == 'fertilizer') {
        fertilizer = fertilizer + (cursorPower / 2);
        fClicks++;
    };
    if (type == 'weed') {
        weed = weed + cursorPower;
        if (everClickedWeed == false) {
        	everClickedWeed = true;
        }
    };
    if (type == 'money') {
        money = money + cursorPower;
        if (introstep == 2) {
            introHandler(true);
        };
    };
    clicks++;
    if (clicks == 500 && achievements[2][0] == 0) {
    	fireAchievement(2);
    }
    if (clicks == 1500 && achievements[7][0] == 0) {
    	fireAchievement(7);
    }
    if (fClicks == 150 && achievements[9][0] == 0) {
    	fireAchievement(9);
    }
}

$(function () {
    setInterval(wpsHandler, 100);
});
$(function () {
    setInterval(titleUpdater, 2000);
});
$(function () {
    setInterval(saveGame, 60000);
});

function titleUpdater() {
    if (coffeeMod === true) {
        document.title = addCommas(Math.round(money)) + "$ - coffeefy";
    } else {
        document.title = addCommas(Math.round(money)) + "$ - kushify";
    }

    if (introstep == 4 ) {
    	if (weedflow < 0 && weed == 0) { 
    		var actualTitle = document.title;
    		$('#weed').addClass('alert');
    		if (achievements[10][0] == 0) {
    			fireAchievement(10);
    		}
    		document.title = "You're out of " + weedOrCoffee + "!";
    		setTimeout(function(){ document.title = actualTitle },1000);
    	}
		else { $('#weed').removeClass('alert')}
		if (fertilizerflow < 0 && fertilizer == 0) { 
			$('#fertilizer').addClass('alert');
			var actualTitle = document.title;
			document.title = "You're out of fertilizer!";
    		setTimeout(function(){ document.title = actualTitle },1000);
		}
		else { $('#fertilizer').removeClass('alert')}
		if (moneyflow < 0 && money == 0) { 
			$('#money').addClass('alert');
			var actualTitle = document.title;
			document.title = "You're out of money!";
    		setTimeout(function(){ document.title = actualTitle },1000);
		}
		else { $('#money').removeClass('alert')}
    };
}

function wpsHandler() {
    var weedDebt = 0;
    var moneyDebt = 0;
    var fertilizerDebt = 0;

    var moneySpent = 0;
    var fertilizerSpent = 0;
    var weedSpent = 0;

    var redrawPerSecond = false;
    //

	if (weed < wes) {
		weedSpent = weed;
		weedDebt = wes - weed;
		weed = 0;
		redrawPerSecond = true;
	}

	else {
		weedSpent = wes;
		weed = weed - wes;
	}

	if (wes > 0) {
		money = money + ( mps * (weedSpent / wes));
		moneyflow = ( mps * (weedSpent / wes)) - mes;
	}

	if (money < mes) {
		moneySpent = money;
		moneyDebt = mes - money;
		money = 0;
		redrawPerSecond = true;
	}

	else {
		moneySpent = mes;
		money = money - mes;
	}

	if (mes > 0) {
		fertilizer = fertilizer + ( fps * (moneySpent / mes));
		fertilizerflow = ( fps * (moneySpent / mes)) - fes;
	}
	//
	if (fertilizer < fes) {
		fertilizerSpent = fertilizer;
		fertilizerDebt = fes - fertilizer;
		fertilizer = 0;
		redrawPerSecond = true;
	}

	else {
		fertilizerSpent = fes;
		fertilizer = fertilizer - fes;
	}

	if (fes > 0) {
		weed = weed + ( wps * (fertilizerSpent / fes));
		weedflow = ( wps * (fertilizerSpent / fes)) - wes;
	}

	weed = weed - weedDebt;
	if (weed < 0) { weed = 0 }

	money = money - moneyDebt;
	if (money < 0) { money = 0 }

	fertilizer = fertilizer - fertilizerDebt;
	if (fertilizer < 0) { fertilizer = 0 }

	if (redrawPerSecond) {
		updatePerSecond();
	}

	if (money > 1000000 && achievements[11][0] == 0) {
		fireAchievement(11);
	}

	if (money > 2000000 && achievements[15][0] == 0 && everClickedWeed == false) {
		fireAchievement(15);
	}

    $('#fertilizerspan').text(addCommas(Math.round(fertilizer))); //print
    $('#weedspan').text(addCommas(Math.round(weed)));
    $('#moneyspan').text(addCommas(Math.round(money)));
}

function buyStuff(facility) {
    if (facility === 'enchantcursor1') {
        if (weed > (increasePrice(4, (facilities[4][0] + 1)) - 1) && money > (increasePrice(4, (facilities[4][0] + 1)) - 1) && fertilizer > (increasePrice(4, (facilities[4][0] + 1)) - 1)) { //check weed, fertilizer and money
            facilities[4][0]++; //add one
            weed = weed - increasePrice(4, facilities[4][0]); //distract 
            fertilizer = fertilizer - increasePrice(4, facilities[4][0]); //distract 
            money = money - increasePrice(4, facilities[4][0]); //distract 
            updateFacilities();
            return;
        };
        $(".enchantcursor1").css("background-color", "rgba(255,80,80,0.9)");
        setTimeout(function () {
            $(".enchantcursor1").css("background-color", "");
        }, 1000);
        return;
    }
}

function buyFacilityM(i) {
	if (money > (increasePrice(i, (facilities[i][0] + 1)) - 1)) { //check money
			if (introstep == 3) {
				introHandler();
			}

			if (achievements[0][0] == 0) {
				fireAchievement(0);
			}

			if (i == 2 || i == 3 || i == 5) {
				if (achievements[3][0] == 0) {
					fireAchievement(3);
				}
			}

            facilities[i][0]++; //add one facility
            money = money - increasePrice(i, facilities[i][0]); //distract money
            updateFacilities(); // refresh everything
            return;
    };
    $(facilities[i][2]).css("background-color", "rgba(255,80,80,0.9)");
    setTimeout(function () {
            $(facilities[i][2]).css("background-color", "");
    }, 1000);
    return;
}

function fireAchievement(i) {
	achievements[i][0] = 1; //set the achievement to done
	var acvtarget = "#acv" + (i+ 1);
	$(acvtarget).addClass('earned'); //target the achievement and set it to done
	$("#achievementimg").attr("src","icons/" + (i+1) + ".png"); //prepare the correct image
	$("#achievementspan").text(achievements[i][1]); // prepare the correct text
	$(".achievement").removeClass('hidden'); // fade in
    setTimeout("$('.achievement').addClass('hidden');", 3e3); // fade out after 3 seconds
}

function checkSpeed() { // check all transfer and gain speeds and apply respective animations to arrow and ps
    // all values / 10, because of the 10 times per second update

    $('#weed, #weedspan').removeClass('pulseslow pulsemed pulsefast decline');

    if ((wps - wes) > 0 && (wps - wes) <= 1) {
        $('#weed').addClass('pulseslow');
    };
    if ((wps - wes) >= 1 && (wps - wes) <= 4) {
        $('#weed').addClass('pulsemed');
    };
    if ((wps - wes) >= 4) {
        $('#weed').addClass('pulsefast');
    };
    if (weedflow < 0) {
        $('#weedspan').addClass('decline');
    };


    $('#money, #moneyspan').removeClass('pulseslow pulsemed pulsefast decline');

    if ((mps - mes) > 0 && (mps - mes) <= 2) {
        $('#money').addClass('pulseslow');
    };
    if ((mps - mes) >= 2 && (mps - mes) <= 8) {
        $('#money').addClass('pulsemed');
    };
    if ((mps - mes) >= 8) {
        $('#money').addClass('pulsefast');
    };
    if (moneyflow < 0) {
        $('#moneyspan').addClass('decline');
    };

    $('#fertilizer, #fertilizerspan').removeClass('pulseslow pulsemed pulsefast decline');

    if ((fps - fes) > 0 && (fps - fes) <= 0.8) {
        $('#fertilizer').addClass('pulseslow');
    };
    if ((fps - fes) >= 0.8 && (fps - fes) <= 2.0) {
        $('#fertilizer').addClass('pulsemed');
    };
    if ((fps - fes) >= 2.0) {
        $('#fertilizer').addClass('pulsefast');
    };
    if (fertilizerflow < 0) {
        $('#fertilizerspan').addClass('decline');
    };

    if (softAnimations == true) {
    	$('#weed, #money, #fertilizer').removeClass('pulsefast pulseslow pulsemed').delay(250).queue(function(next){
		    $(this).addClass('pulsenone');
		    next();
		});
    }
    else {
    	$('.pulsenone').removeClass('pulsenone');
    }

    $('.arrow').addClass('flownone');

    if (wes > 0 && wes <= 0.5) {
        $('.wtom').removeClass('flownone flowmed flowfast').addClass('flowslow');
    };
    if (wes >= 0.5 && wes <= 1.5) {
        $('.wtom').removeClass('flownone flowslow flowfast').addClass('flowmed');
    };
    if (wes >= 1.5) {
        $('.wtom').removeClass('flownone flowslow flowmed').addClass('flowfast');
    };

    if (mes > 0 && mes <= 0.5) {
        $('.mtof').removeClass('flownone flowimed flowifast').addClass('flowislow');
    };
    if (mes >= 0.5 && mes <= 1.5) {
        $('.mtof').removeClass('flownone flowislow flowifast').addClass('flowimed');
    };
    if (mes >= 1.5) {
        $('.mtof').removeClass('flownone flowislow flowimed').addClass('flowifast');
    };

    if (fes > 0 && fes <= 0.5) {
        $('.ftow').removeClass('flownone flowfast flowmed').addClass('flowslow');
    };
    if (fes >= 0.5 && fes <= 1.5) {
        $('.ftow').removeClass('flownone flowfast flowslow').addClass('flowmed');
    };
    if (fes >= 1.5) {
        $('.ftow').removeClass('flownone flowslow flowmed').addClass('flowfast');
    };
}

function updatePerSecond() {
    $('.mps').text(addCommas(Math.round(moneyflow * 10 * 100) / 100)); //update X/s indicators
    $('.fps').text(addCommas(Math.round(fertilizerflow * 10 * 100) / 100));
    $('.wps').text(addCommas(Math.round(weedflow * 10 * 100) / 100));
    $('.wtom').text(addCommas(Math.round(wes * 10 * 100) / 100)); //update arrows
    $('.ftow').text(addCommas(Math.round(fes * 10 * 100) / 100));
    $('.mtof').text(addCommas(Math.round(mes * 10 * 100) / 100));
    checkSpeed(); //check for pulse animations
}

function updateFacilities() {
	mes = 0;
	mps = 0;
	wes = 0;
	wps = 0;
	fes = 0;
	fps = 0;
	//calculate the new expenses and gains from the facilities, print all shop labels
    for (var i = 0; i < facilities.length; i++) {
    	if (facilities[i][5] == 1) {
    		wes = wes + (facilities[i][0] * facilities[i][3]);
    		mps = mps + (facilities[i][0] * facilities[i][4]);
    	}
    	else if (facilities[i][5] == 2) {
    		mes = mes + (facilities[i][0] * facilities[i][3]);
    		fps = fps + (facilities[i][0] * facilities[i][4]);
    	}
    	else if (facilities[i][5] == 3) {
    		fes = fes + (facilities[i][0] * facilities[i][3]);
    		wps = wps + (facilities[i][0] * facilities[i][4]);
    	}
    	var printString = facilities[i][0] + facilities[i][6] + addCommas(Math.round(increasePrice(i, (facilities[i][0] + 1)))) + facilities[i][7];
	    $(facilities[i][2]).text(printString);
    };
    moneyflow = (mps - mes);
    weedflow = (wps - wes);
    fertilizerflow = (fps - fes);
    cursorPower = 1 + (1.5 * facilities[4][0]);
    updatePerSecond();

    if (wps > 0 && mps > 0 && fps > 0 && achievements[1][0] == 0) {
		fireAchievement(1);
	}
	if (mps > 10 && achievements[8][0] == 0) {
		fireAchievement(8);
	}
}

function increasePrice(facility, number) {
    return facilities[facility][1] * Math.pow(1.09, (number - 1));
}


function introHandler(moneyTriggered) {
    if (introstep == 0) {
        $('#introtext').text('This is money.');
        $('#money').fadeIn().removeClass('intro');
        introstep++;
        return;
    };
    if (introstep == 1) {
        $('#introtext').text('Click on it.');
        $('#introbutton').fadeOut();
        introstep++;
        return;
    };
    if (moneyTriggered == true) {
        introstep++;
        $('#skipintro').fadeOut();
        $('#introtext').text('You like money.');
        setTimeout(function () {
            $('#introtext').text('Who the hell doesnt?')
        }, 3000);
        setTimeout(function () {
            $('#introtext').text('Alright.')
        }, 5000);
        setTimeout(function () {
            $('#intro').addClass('side')
        }, 6000);
        setTimeout(function () {
            $('#weed').fadeIn().removeClass('intro')
        }, 6200);
        setTimeout(function () {
            $('#introtext').text('Now this is ' + weedOrCoffee + '.')
        }, 7000);
        setTimeout(function () {
            $('#introtext').text('Maybe you like ' + weedOrCoffee + '.')
        }, 9000);
        setTimeout(function () {
            $('#introtext').text('But what counts is, you can sell it.')
        }, 11000);
        setTimeout(function () {
            $('#introtext').text('However, thats really annoying and dangerous.')
        }, 13000);
        setTimeout(function () {
            $('#introtext').text('So hire some idiot to do it for you!')
        }, 15000);
        setTimeout(function () {
            $('#containerwtom').fadeIn().removeClass('intro');
            $('.dealer').fadeIn().removeClass('intro');
            $('#title').addClass('sizedown')
        }, 15000);
        return;
    }

    if (introstep == 3) {
        introstep++;
        $('#intro').removeClass('side').addClass('tiny');
        $('#introtext').text('Good job. Now rise!');
        $('.intro').fadeIn('400').removeClass('intro');
        setTimeout(function () {
            $('#intro').fadeOut()
        }, 3000);
    }
}

function skipIntro() {
    $('#intro').remove().fadeOut();
    $('.intro').fadeIn().removeClass('intro');
    $('#title').addClass('sizedown');
    introstep = 4;
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function cheatNow() {
    var cheat = prompt('Enter the secret word!');
    if (cheat == 'whatuup') {
        money = 5000;
        weed = 5000;
        fertilizer = 5000;
    } else if (cheat == 'cmoune') {
        money = 100000;
        weed = 100000;
        fertilizer = 100000;
    };
}

function saveGame(useTextfield) {
    var saveRaw = Math.round(money) + "%" + Math.round(weed) + "%" + Math.round(fertilizer) + "%" + facilities[0][0] + "%" + facilities[1][0] + "%" + facilities[2][0] + "%" + facilities[3][0] + "%" + facilities[4][0] + "%" + facilities[5][0] + "%" + facilities[6][0] + "%" + facilities[7][0] + "%" + facilities[8][0] + "%" + facilities[9][0] + "%" + facilities[10][0] + "%" + facilities[11][0] + "%" + facilities[12][0] + "%" + facilities[13][0] + "%" + facilities[14][0] + "%" + facilities[15][0] + "%" + facilities[16][0] + "%" + facilities[17][0] + "%" + facilities[18][0] + "%" + facilities[19][0] + "%" + facilities[20][0] + "%" + facilities[21][0] + "%" + facilities[22][0] + "%" + facilities[23][0] + "%" + facilities[24][0] + "%" + facilities[25][0] + "%" + facilities[26][0] + "%" + facilities[27][0] + "%" + coffeeMod + "%" + particlesDeactivated + "%" + softAnimations + "%" + expandAnimations;
    saveCrypt = encode64(saveRaw);

    if (useTextfield === true) {
        $('#saveForm').val(saveCrypt);
        if (achievements[13][0] == 0) {
        	fireAchievement(13);
        }
    } 

    else {
        setCookie("kushify_savegame", saveCrypt, 30);

        var saveARaw = achievements[0][0] + "%" + achievements[1][0] + "%" + achievements[2][0] + "%" + achievements[3][0] + "%" + achievements[4][0] + "%" + achievements[5][0] + "%" + achievements[6][0] + "%" + achievements[7][0] + "%" + achievements[8][0] + "%" + achievements[9][0] + "%" + achievements[10][0] + "%" + achievements[11][0] + "%" + achievements[12][0] + "%" + achievements[13][0] + "%" + achievements[14][0] + "%" + achievements[15][0];

        saveARaw = encode64(saveARaw);

        setCookie("kushify_achievements", saveARaw, 30);

        //check if successful
        var reg = getCookie("kushify_savegame");
    	if (reg == saveCrypt) {
        	$("#alertMessage").fadeIn(400);
        	setTimeout("$('#alertMessage').fadeOut(400)", 2e3);
        }
        else {
        	$("#alertMessage2").fadeIn(400);
        	setTimeout("$('#alertMessage2').fadeOut(400)", 2e3);
        }
    }
}

function loadGame(useCookie, doSkipIntro) {
    if (useCookie === true) {
        var cryptedSave = getCookie("kushify_savegame");
        var cryptedAchievements = getCookie("kushify_achievements");
        var achieveState = decode64(cryptedAchievements); //Decode the Save
    	var achieveArray = achieveState.split("%");
        for (var i = 0; i < achievements.length; i++) {
        	achievements[i][0] = Number(achieveArray[i]);
        	var acvtarget = '#acv' + (i + 1);
        	if (Number(achieveArray[i] == 1)) {
        		$(acvtarget).addClass('earned');
        	}
        	else {
        		$(acvtarget).removeClass('earned');
        	}
    	}
    } 
    else {
        var cryptedSave = $('#saveForm').val();
        if (cryptedSave === "" || decode64(cryptedSave) === false) { //check if input is empty or contains illegal chars
            alert('Save Corrupt! Empty or illegal characters found!');
            return;
        }
    }

    var saveState = decode64(cryptedSave); //Decode the Save
    var saveArray = saveState.split("%"); //Split on all %
    //alert(saveArray.length); (Debug)

    for (var i = 0; i < (facilities.length + 3); i++) { //check if any of the values from 0 - end of facilities is NaN
        var numberResult = Number(saveArray[i]);
        //alert("Run " + i + " - " + saveArray[i] + " - " + numberResult); (Debug)
        if (isNaN(numberResult)) {

            alert('Your save is corrupt or old, starting a new game!');
            return;
        }
    }

    var newMoney = Number(saveArray[0]);
    money = newMoney; //define new money

    var newWeed = Number(saveArray[1]);
    weed = newWeed; //define new weed

    var newFertilizer = Number(saveArray[2]);
    fertilizer = newFertilizer; //define new fertilizer


    for (var i = 0; i < facilities.length; i++) {
        facilities[i][0] = Number(saveArray[(i + 3)]);
    }

    if (saveArray[(facilities.length + 3)] == 'true') {
        coffeefy();
        $('#switch').prop('checked', false);
    } else {
        coffeefy(true);
        $('#switch').prop('checked', true);
    }

    if (saveArray[(facilities.length + 4)] == 'true') {
        particlesDeactivated = true;
        $('#switch2').prop('checked', false);
    } else {
        particlesDeactivated = false;
        $('#switch2').prop('checked', true);
    }

    if (saveArray[(facilities.length + 5)] == 'true') {
        softAnimations = true;
        $('#switch3').prop('checked', false);
    } else {
        softAnimations = false;
        $('#switch3').prop('checked', true);
    }

    if (saveArray[(facilities.length + 6)] == 'true') {
        $('#switch4').prop('checked', true);
        expandAnimations = true;
    } else {
        $('#switch4').prop('checked', false);
        expandAnimations = false;
    }

    wes = 0;
    mes = 0;
    fes = 0;
    mps = 0;
    fps = 0;
    wps = 0;

    updateFacilities();

    $("#alertMessage3").fadeIn(400);
    setTimeout("$('#alertMessage3').fadeOut(400)", 2e3);
}

 // COOKIE SAVE AND CHECK
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var reg = getCookie("kushify_savegame");
    if (reg != "") {
        skipIntro();
        loadGame(true);
        if (achievements[5][0] == 0) {
        	fireAchievement(5);
        }
    }
}

function clearCookie() {
    setCookie("kushify_savegame", "", 30);
    setCookie("kushify_achievements", "", 30);
}

function coffeefy(classic) {
    if (classic === true) {
        coffeeMod = false;
        $("#weed, .wtom, #containerwtom").removeClass('coffeemod');
        $('#title').text('KUSHIFY');
        weedOrCoffee = 'weed';
        $('.kushify').fadeOut("400", function () {
            $('.coffeefy').fadeIn();
        });
        return;
    };
    coffeeMod = true;
    $("#weed, .wtom, #containerwtom").addClass('coffeemod');
    $('#title').text('COFFEEFY');
    weedOrCoffee = 'coffee';
    if (achievements[6][0] == 0) {
    	fireAchievement(6);
    }
    $('.coffeefy').fadeOut("400", function () {
        $('.kushify').fadeIn();
    });

}

function showAchievements() {
	if (acvVisible == false) {
		$('#bluroverlay, #blurunderlay').fadeIn('100');
		$('#contentsblur').addClass('activated');
		acvVisible = true;
		setTimeout(function(){
			$("#blurunderlay").bind('click', function() { // close the overlay once clicked away
		    	showAchievements();
	    	});
		},500);
		
		return;
	}
	else {
		$('#bluroverlay, #blurunderlay').fadeOut('100');
		$('#contentsblur').removeClass('activated');
		acvVisible = false;
		$("#blurunderlay").unbind('click'); // remove the listener
		return;
	}
}

$(document).ready(function () {

	$('.tooltip').tooltipster({
	   animation: 'fall',
	   theme: 'tooltipster-light',
	});
    checkCookie();
    var hash = window.location.hash;
    if (hash == '#coffee') {
        coffeefy();
        $('#switch').prop('checked', false);
    }

    $("#switch").change(function () {
        if ($('#switch').prop('checked')) {
            coffeefy(true);
        } else {
            coffeefy();
            if ($('#switch').prop('checked') == false && $('#switch2').prop('checked') == false && $('#switch3').prop('checked') == false && $('#switch4').prop('checked') == false && achievements[12][0] == 0) {
            	fireAchievement(12);
            }
        }
    });

    $("#switch2").change(function () {
        if ($('#switch2').prop('checked')) {
            particlesDeactivated = false;
            //menuflipDeactivated = false; meny doesnt seem to like being interfered with. wip.
        } else {
            particlesDeactivated = true;
            if ($('#switch').prop('checked') == false && $('#switch2').prop('checked') == false && $('#switch3').prop('checked') == false && $('#switch4').prop('checked') == false && achievements[12][0] == 0) {
            	fireAchievement(12);
            }
            //menuflipDeactivated = true; meny doesnt seem to like being interfered with. wip.
        }
    });

    $("#switch3").change(function () {
        if ($('#switch3').prop('checked')) { 
        	softAnimations = false; 
        	if (introstep == 4) {
        		checkSpeed();
        	};
        } 
        else { 
        	softAnimations = true;
        	if (introstep == 4) {
        		checkSpeed();
        	};
        	if ($('#switch').prop('checked') == false && $('#switch2').prop('checked') == false && $('#switch3').prop('checked') == false && $('#switch4').prop('checked') == false && achievements[12][0] == 0) {
        		fireAchievement(12);
        	}
        }
    });

    $("#switch4").change(function () {
        if ($('#switch4').prop('checked')) {
            expandAnimations = true;
        } else {
            expandAnimations = false;
            if ($('#switch').prop('checked') == false && $('#switch2').prop('checked') == false && $('#switch3').prop('checked') == false && $('#switch4').prop('checked') == false && achievements[12][0] == 0) {
            	fireAchievement(12);
            }
        }
    });

    // print all labels
    for (var i = 0; i < facilities.length; i++) {
    	var printString = facilities[i][0] + facilities[i][6] + addCommas(Math.round(increasePrice(i, (facilities[i][0] + 1)))) + facilities[i][7];
	    $(facilities[i][2]).text(printString);
    }

	$('#containerwtom, #containerftow, #containermtof').hover(function() {
	  $.data(this, "timer", setTimeout($.proxy(function() {
	    if (expandAnimations == true) {
    		$(this).addClass('expanded');
    	}
	  }, this), 900));
	}, function() {
	  clearTimeout($.data(this, "timer"));
	  $(this).removeClass('expanded');
	});

    $('.dealer').tooltipster({ content: $('<span>A poor bastard that will sell your stuff on the street. <span>+ ' + (facilities[0][4] * 10) + '$/s</span> | <span>- ' + (facilities[0][3] * 10) + 'g/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
    $('.trailer').tooltipster({ content: $('<span>An old and shabby trailer with some hippies in it, growing kush and consuming fertilizer. <span>+ ' + addCommas(facilities[1][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[1][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.appartment').tooltipster({ content: $('<span>A place with a THC/air ratio of approximately 1:2 full of dedicated potheads to nourish your plants. <span>+ ' + addCommas(facilities[2][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[2][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.greenhouse').tooltipster({ content: $('<span>After paying some bribes to the local police, you can now reign over entire Greenhouses full of plants. <span>+ ' + addCommas(facilities[8][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[8][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.export1').tooltipster({ content: $('<span>You start a weed retail store, with the convenient side effect of hot espresso and fresh cookies. <span>+ ' + (facilities[3][4] * 10) + '$/s</span> | <span>- ' + (facilities[3][3] * 10) + 'g/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.export2').tooltipster({ content: $('<span>Taking weed economy to a new level, this relationship will make you rich, and possibly endanger your life. <span>+ ' + addCommas(facilities[7][4] * 10) + '$/s</span> | <span>- ' + addCommas(facilities[7][3] * 10) + 'g/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.enchantcursor1').tooltipster({ content: $('<span>By smearing the rare mixture of Dollar bills, Weed and Fertilizer on your gaming mouse, you managed to unlock a secret rapid fire button.</span>'), theme: 'tooltipster-light' });
	$('.onlineshop').tooltipster({ content: $('<span>Starting an online shop to spread your business across the entire nation. <span>+ ' + addCommas(facilities[9][4] * 10) + '$/s</span> | <span>- ' + addCommas(facilities[9][3] * 10) + 'g/s</span></span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.franchise').tooltipster({ content: $('<span>Expand the kush empire and sell the permission to buy and resell your weed! How cool is that?<span>+ ' + addCommas(facilities[10][4] * 10) + '$/s</span> | <span>- ' + addCommas(facilities[10][3] * 10) + 'g/s</span></span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.marketing').tooltipster({ content: $('<span>Contract some big rappers in the industry to praise your kush above all else. <span>+ ' + addCommas(facilities[11][4] * 10) + '$/s</span> | <span>- ' + addCommas(facilities[11][3] * 10) + 'g/s</span></span></span>'), theme: 'tooltipster-light' });
	$('.vendingmachines').tooltipster({ content: $('<span>Start setting up kush vending machines in the city, enabling your customers to get their fix everywhere, anonymous and expensive as hell. <span>+ ' + addCommas(facilities[12][4] * 10) + '$/s</span> | <span>- ' + addCommas(facilities[12][3] * 10) + 'g/s</span></span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.legalization1').tooltipster({ content: $('<span>You manage to pay the relevant people to legalize and monopolize your kush in some random developing country. <span>+ ' + addCommas(facilities[13][4] * 10) + '$/s</span> | <span>- ' + addCommas(facilities[13][3] * 10) + 'g/s</span></span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.conduit').tooltipster({ content: $('<span>Your empire starts diverting kush into the main water conduits, while collecting ridiculous amounts of taxes. <span>+ ' + addCommas(facilities[14][4] * 10) + '$/s</span> | <span>- ' + addCommas(facilities[14][3] * 10) + 'g/s</span></span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.drill').tooltipster({ content: $('<span>Gigantic drills that excavate the kush storages of past civilizations. <span>+ ' + addCommas(facilities[15][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[15][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.synthetic1').tooltipster({ content: $('<span>Following a break-through in science, you can now create the essence of kush by force. <span>+ ' + addCommas(facilities[16][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[16][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.underwater').tooltipster({ content: $('<span>Conquering the endless realms of the oceans, you start growing weed plants in epic proportions way under the water level. <span>+ ' + addCommas(facilities[17][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[17][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.island').tooltipster({ content: $('<span>You decide to continue by simply buying whole islands, wiping any civilization on it and starting to grow kush on three parallel layers. <span>+ ' + addCommas(facilities[18][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[18][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.rainforest').tooltipster({ content: $('<span>By releasing a rapidly spreading kushifying virus, you are now able to convert entire rainforests to serve you as huge kush plots. <span>+ ' + addCommas(facilities[19][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[19][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.orbital').tooltipster({ content: $('<span>Leaving the limiting boundaries of earth behind, kush is now being planted on space stations in the orbit. <span>+ ' + addCommas(facilities[20][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[20][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.lunar').tooltipster({ content: $('<span>Kush is now being cultivated within super-cold high-density hydrochambers on the dark side of the moon. <span>+ ' + addCommas(facilities[21][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[21][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.solar').tooltipster({ content: $('<span>Advancing right to the biggest energy source within a radius of the next 20 lightyears, you release gigantic carriers with heat condensing modular cultivation chambers to rapidly generate insane heaps of kush. <span>+ ' + addCommas(facilities[22][4] * 10) + 'g/s</span> | <span>- ' + addCommas(facilities[22][3] * 10) + 'u/s</span></span>'), theme: 'tooltipster-light', speed: 250 });

	$('.localshop').tooltipster({ content: $('<span>Your local gardening shop will now stealthily deliver you fertilizer without anyone noticing. <span>+ ' + addCommas(facilities[23][4] * 10) + 'u/s</span> | <span>- ' + addCommas(facilities[23][3] * 10) + '$/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.fakefarm').tooltipster({ content: $('<span>A local farmer that will now buy fertilizer under his name and give it to you, while of course taking your money. <span>+ ' + addCommas(facilities[5][4] * 10) + 'u/s</span> | <span>- ' + addCommas(facilities[5][3] * 10) + '$/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.takeoverfactory').tooltipster({ content: $('<span>By hiring professionals and their dogs, you establish a dedicated factory that is now producing at your command. <span>+ ' + addCommas(facilities[24][4] * 10) + 'u/s</span> | <span>- ' + addCommas(facilities[24][3] * 10) + '$/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.fakefarm2').tooltipster({ content: $('<span>By blackmailing some officials, you manage to take over a whole facility full of potential fertilizer. Once mixed with money. <span>+ ' + addCommas(facilities[6][4] * 10) + 'u/s</span> | <span>- ' + addCommas(facilities[6][3] * 10) + '$/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.tradebonds1').tooltipster({ content: $('<span>You realise that the leadership of pretty much any country below the equator is happy to sell you their "fertilizer". <span>+ ' + addCommas(facilities[25][4] * 10) + 'u/s</span> | <span>- ' + addCommas(facilities[25][3] * 10) + '$/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.oceanfilter').tooltipster({ content: $('<span>Collecting the biomaterial of the oceans, you establish a constantly high flow of high-quality fertilizer. <span>+ ' + addCommas(facilities[26][4] * 10) + 'u/s</span> | <span>- ' + addCommas(facilities[26][3] * 10) + '$/s</span></span>'), theme: 'tooltipster-light', speed: 250 });
	$('.alphacondenser').tooltipster({ content: $('<span>Kushify inc.s research department developes a method to condense the radioactive alpha rays emitted by the sun into material that is "pretty much the same thing". <span>+ ' + addCommas(facilities[27][4] * 10) + 'u/s</span> | <span>- ' + addCommas(facilities[27][3] * 10) + '$/s</span></span>'), theme: 'tooltipster-light', speed: 250 });

	var today = new Date().getHours();
	if (today >= 0 && today <= 4) {
	   setTimeout(function () { fireAchievement(14); }, 120*60*1000);
	}


	jQuery(window).bind('beforeunload', function(){
		var reg = getCookie("kushify_savegame");
    	if (reg != "") {
			return 'Unsaved Progress will be lost!';
		}
	});

});

window.onload = function() {
	$('#loadingspan').fadeOut('100', function() {
		$('#introbutton, #skipintro').fadeIn('100');
	});
};
	