$(document).ready(function(){

	let power = false;
	let powerCycle = false
	let bandIn = [0, 0, 0, 0, 0];
	let timer = 0;
	let onArr = [];
	let offArr = [];

	$(".powerLight").on("click", function(){
		if(!power){
			power = !power;
			timer = 0;
			powerCycle = true;
			$(this).addClass("lightsOnStill");
			setTimeout(function(){
				$(".light").addClass("lightsOnStill");
			}, 100);
			setTimeout(function(){
				if(power){
					$(".light").removeClass("lightsOnStill");
					for(let i = 0; i < 5; i++){
						powerOn(i, timer);
						timer += 1000;
					}
					onArr.push(
						setTimeout(function(){
							$(".light").addClass("lightsOn");
						}, 5100));
					setTimeout(function(){
						$(".light").removeClass("lightsOn");
					}, 6100);
				}
			}, 2000);
			setTimeout(function(){
				powerCycle = false;
			}, 8000);
		} else if(power){
			power = !power;
			bandIn = [0, 0, 0, 0, 0];
			$(this).removeClass("lightsOnStill");
			$(".lights").removeClass("lightsOn");
			$(".lights").removeClass("lightsOnStill");
			clearOn();
			onArr = [];
			offArr = [];
		}
	});

	$(".port").on("click", function(){
		let portId = $(this).attr("id");
		let arrId = Number(portId[1]);
		let light1 = "#" + portId + ' > .lightR'
		let light2 = "#" + portId + ' > .lightL'
		if(!powerCycle && power){
			if(bandIn[arrId] === 0){
				bandIn[arrId] = bandIn[arrId] + 1;
				$(light1).addClass("lightsOn")
			} else if(bandIn[arrId] === 1){
				bandIn[arrId] = bandIn[arrId] + 1;
				$(light1).removeClass("lightsOn")
				$(light2).addClass("lightsOn")	
			} else if(bandIn[arrId] === 2){
				bandIn[arrId] = bandIn[arrId] + 1;
				$("#" + portId + ' > .light').removeClass("lightsOn")
				setTimeout(function(){
					$("#" + portId + ' > .light').addClass("lightsOn")
				}, 50);
			} else if(bandIn[arrId] === 3){
				bandIn[arrId] = bandIn[arrId] + 1;
				$("#" + portId + ' > .light').removeClass("lightsOn")
				$("#" + portId + ' > .light').addClass("lightsOnStill")
			}	else {
				bandIn[arrId] = 0;
				$("#" + portId + ' > .light').removeClass("lightsOnStill")	
			}
		}
	});

	function powerOn(i){
		onArr.push(
			setTimeout(function(){
				$("#p" + i + ' > .light').addClass("lightsOn");
			}, timer));
		setTimeout(function(){
				$("#p" + i + ' > .light').removeClass("lightsOn");
			}, timer + 1000);
	}

	function clearOn(){
		onArr.forEach(function(time){
			clearTimeout(time);
		});
	}

});