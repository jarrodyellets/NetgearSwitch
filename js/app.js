$(document).ready(function() {
  let power = false;
  let powerCycle = false;
  let bandIn = [0, 0, 0, 0, 0];
  let timer = 0;
  let onArr = [];
  let offArr = [];

  $(".powerLight").on("click", function() {
    if (!power) {
      power = !power;
      timer = 0;
      powerCycle = true;
      $(this).addClass("lightsOnStill");
      setTimeout(function() {
        $(".bulb").css( "opacity", "1" );
      }, 100);
      setTimeout(function() {
        if (power) {
          $(".bulb").css( "opacity", "0" );
          for (let i = 0; i < 5; i++) {
            powerOn(i, timer);
            timer += 1000;
          }
          onArr.push(
            setTimeout(function() {
              $(".bulb").addClass("lightsOn");
            }, 5100)
          );
          setTimeout(function() {
            $(".bulb").removeClass("lightsOn");
          }, 6100);
        }
      }, 2000);
      setTimeout(function() {
        powerCycle = false;
      }, 8000);
    } else if (power) {
      power = !power;
      bandIn = [0, 0, 0, 0, 0];
      $(this).removeClass("lightsOnStill");
      $(".bulb").removeClass("lightsOn");
      $(".bulb").css( "opacity", "0" );
      clearOn();
      onArr = [];
      offArr = [];
    }
  });

  $(".port").click(function() {
    let portId = $(this).attr("id");
    let arrId = Number(portId[1]);
    let light1 = "#" + portId + " > .lightR > .bulb";
    let light2 = "#" + portId + " > .lightL > .bulb";
    if (!powerCycle && power) {
      if (bandIn[arrId] === 0) {
        bandIn[arrId] = bandIn[arrId] + 1;
        $(light1).addClass("lightsOn");
      } else if (bandIn[arrId] === 1) {
        bandIn[arrId] = bandIn[arrId] + 1;
        $(light1).removeClass("lightsOn");
        $(light2).addClass("lightsOn");
      } else if (bandIn[arrId] === 2) {
        bandIn[arrId] = bandIn[arrId] + 1;
        $("#" + portId + " > .light > .bulb").removeClass("lightsOn");
        setTimeout(function() {
          $("#" + portId + " > .light > .bulb").addClass("lightsOn");
        }, 50);
      } else if (bandIn[arrId] === 3) {
        bandIn[arrId] = bandIn[arrId] + 1;
        $("#" + portId + " > .light > .bulb").removeClass("lightsOn");
        $("#" + portId + " > .light > .bulb").css("opacity", "1");
      } else {
        bandIn[arrId] = 0;
        $("#" + portId + " > .light > .bulb").css("opacity", "0");
      }
    }
  });

  function powerOn(i) {
    onArr.push(
      setTimeout(function() {
        $("#p" + i + " > .light > .bulb").addClass("lightsOn");
      }, timer)
    );
    setTimeout(function() {
      $("#p" + i + " > .light > .bulb").removeClass("lightsOn");
    }, timer + 1000);
  }

  function clearOn() {
    onArr.forEach(function(time) {
      clearTimeout(time);
    });
  }
});