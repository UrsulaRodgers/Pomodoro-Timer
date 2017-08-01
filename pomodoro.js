$(document).ready(function(){
	//alarm for the end of session
	var endSession = $("#endSession")[0];
	//alarm for the end of break
	var endBreak = $("#endBreak")[0];
	var countSession = 0;
	var countBreak = 0;
	$("#break").prop("disabled",true);
	$("#start").prop("disabled",true);
	
	
	function setSession() {
		var countSession = parseInt($("#setSession").html()); //takes the value currently set in the div for session
		$("#setBreak").hide();
		$("#breakIncrease").hide();
		$("#breakReduce").hide();
		$("#setSession").show();
		$("#sessionIncrease").show();
		$("#sessionReduce").show();
		//increase the session time by 1 min per click
		$("#sessionIncrease").click(function(){
			countSession++;
			$("#setSession").html(countSession);
		})
		
		//reduce the session time by 1 min per click - prevents negative numbers being set
		$("#sessionReduce").click(function(){
			if (countSession > 0) {
				countSession--;
				$("#setSession").html(countSession);
			}
		})
		$("#break").prop("disabled",false);
		
	}
	function setBreak() {
		var countBreak = parseInt($("#setBreak").html());//takes the value currently set in the div for break
		$("#setSession").hide();
		$("#sessionIncrease").hide();
		$("#sessionReduce").hide();
		$("#setBreak").show();
		$("#breakIncrease").show();
		$("#breakReduce").show();
		//increase the break time by 1 min per click
		$("#breakIncrease").click(function(){
			countBreak++;
			$("#setBreak").html(countBreak);
			console.log(countBreak);
		})
		//reduce the break time by 1 min per click - prevents negative numbers being set
		$("#breakReduce").click(function(){
			if (countBreak > 0) {
				countBreak--;
				$("#setBreak").html(countBreak);
			}	
		})	
		$("#start").prop("disabled",false);
		
	}
	
	//selects session mode - can proceed to set the session time
	$("#session").click(function(){
		$("#mode").html("SESSION");
		setSession();
		
	});
	//selects break mode - can proceed to set the break time
	$("#break").click(function(){
		$("#mode").html("BREAK");
		setBreak();
	});
	//click to start the timer
	$("#start").click(function(){
		$("#reset").prop("disabled", true);
		$("#start").prop("disabled", true);
		$("#session").prop("disabled", true);
		$("#break").prop("disabled", true);
		//allows intervals of 1 sec to be counted down
		var counter = setInterval(timer,1000);	
		$("#mode").html("SESSION"); //the session timer always precedes the break timer
		$("#countDown").show(); 
		$("#setSession").hide();
		$("#setBreak").hide();
		var sessionSec = parseInt($("#setSession").html())*60;
		var breakSec = parseInt($("#setBreak").html())*60;
		function timer() {
			//count down by 1 sec
			sessionSec -=1;
			if (sessionSec === 0) {
				clearInterval(counter);
				endSession.play();
				var breakCounter = setInterval(breakTimer, 1000);
			}
			if (sessionSec%60>=10){
				$("#countDown").html(Math.floor(sessionSec/60)+":"+sessionSec%60);
			} else {
				$("#countDown").html(Math.floor(sessionSec/60)+":"+"0"+sessionSec%60);
			}
			$("#stop").click(function(){
				clearInterval(counter);
				$("#reset").prop("disabled", false);
			})
			function breakTimer() {
				$("#mode").html("BREAK"); 
				breakSec -=1;
				if (breakSec === 0){
					clearInterval(breakCounter);
					endBreak.play();
					$("#reset").prop("disabled", false);
				}
				if (breakSec%60>=10){
					$("#countDown").html(Math.floor(breakSec/60)+":"+breakSec%60);
				} else {
					$("#countDown").html(Math.floor(breakSec/60)+":"+"0"+breakSec%60);
				}
				$("#stop").click(function(){
					clearInterval(breakCounter);
					$("#reset").prop("disabled", false);
				})
			}
		}
		
	})
	$("#reset").click(function(){
		$("#countDown").hide();
		$("#setSession").show();
		$("#setSession").html("0");
		$("#mode").html("MODE");
		$("#break").prop("disabled", true);
		$("#session").prop("disabled", false);
		$("#start").prop("disabled", false);
	})
})
