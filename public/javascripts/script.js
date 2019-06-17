//set default degree (360*5)
var degree = 7200;
//number of clicks = 0
var clicks = 0;

$(document).ready(function(){  
  
  
  var HOUSE_DATA = {
    'BELLWOODS' : {
      index : 1, 
      numMembers : 27
    },
    'RIVERDALE' : {
      index : 2,
      numMembers : 32
    },
    'LIBERTY' : {
      index : 3,
      numMembers : 27
    },
    'KENSINGTON' : {
      index : 4,
      numMembers : 30
    },
    'ROSEDALE' : {
      index : 5,
      numMembers : 31
    }, 
    'YORK' : {
      index : 0,
      numMembers : 31
    }
  }

  var getLowestHouseSet = function() {
    var lowestSet = ['RIVERDALE'];

    for(houseName in HOUSE_DATA) {
      var lowest = HOUSE_DATA[lowestSet[0]].numMembers;
      if (HOUSE_DATA[houseName].numMembers < lowest) {
        lowestSet = [houseName];
      } else if (HOUSE_DATA[houseName].numMembers === lowest) {
        lowestSet.push(houseName);
      } 
    }

    return lowestSet;
  }

  var getSelectedHouse = function() {
    var lowestSet = getLowestHouseSet();
    var selectedHouseName = lowestSet[(Math.floor(Math.random() * lowestSet.length) + 1) - 1];

    return selectedHouseName;
  }

	/*WHEEL SPIN FUNCTION*/
	$('#spin').click(function(){
		
		//add 1 every click
		clicks ++;
		
		/*multiply the degree by number of clicks
	  generate random number between 1 - 360, 
    then add to the new degree*/
    var newDegree = degree*clicks;
    
    //Factor in weighted bias0 - 1 + 1)) + 1;
    var selectedHouseName = getSelectedHouse();
    var extraDegree =  360 - (HOUSE_DATA[selectedHouseName].index * 60) - Math.floor(Math.random() * (30 - 5 + 1)) + 30;
    HOUSE_DATA[selectedHouseName].numMembers++;

		totalDegree = newDegree+extraDegree;
		
		/*let's make the spin btn to tilt every
		time the edge of the section hits 
		the indicator*/
		$('#wheel .sec').each(function(){
			var t = $(this);
			var noY = 0;
			
			var c = 0;
			var n = 700;	
			var interval = setInterval(function () {
				c++;				
				if (c === n) { 
					clearInterval(interval);				
				}	
					
				var aoY = t.offset().top;
				$("#txt").html(aoY);
				// console.log(aoY);
				
				/*23.7 is the minumum offset number that 
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore, 
				exactly aligned with the spin btn*/
				if(aoY < 23.89){

					$('#spin').addClass('spin');
					setTimeout(function () { 
						$('#spin').removeClass('spin');
					}, 100);	
				}
			}, 10);
			
			$('#inner-wheel').css({
				'transform' : 'rotate(' + totalDegree + 'deg)'			
			});
		 
			noY = t.offset().top;
			
		});
	});
  
  
  window.getLowestHouseSet = getLowestHouseSet;
  window.getSelectedHouse = getSelectedHouse;
	
});//DOCUMENT READY
	

