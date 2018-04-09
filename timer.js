/*To start the function as soon as page loads*/
$(function() {
  /*To extract parameters from the url*/
  var queryString = new Array();

  if (queryString.length == 0) {
    if (window.location.search.split('?').length > 1) {

      /*splitting url and populating array 'params'*/
      var params = window.location.search.split('?')[1].split('&');

      /*Populating queryString array*/
      for (var i = 0; i < params.length; i++) {
        var key = params[i].split('=')[0];
        var value = params[i].split('=')[1];
        queryString[key] = value;
      } //end for
      console.log(queryString);
    } //end if
  } //end if

  /* Fetching the value from user input */
  var givenMinutes = parseInt(queryString["minutes"]);
  var givenSeconds = parseInt(queryString["seconds"]);
  //
  // if (isNaN(givenMinutes)) {
  //   givenMinutes = 0;
  // }
  // if (isNaN(givenSeconds)) {
  //   givenSeconds = 0;
  // }

  var startTime = Date.now();

  /* Initilaizing local variables as per user input and Display the starting value of timer */
  var seconds = givenSeconds;
  var minutes = givenMinutes;
  $("#time").text(display(minutes, seconds));

  if (givenSeconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  /* Main timer logic */
  var intervalId = setInterval(function() {

    /* Calculate the total seconds passed */
    var currentTime = Date.now();
    var secondsPast = Math.floor((currentTime - startTime) / 1000);
    //console.log(secondsPast);
    $("#time").text(display(minutes, seconds));
    $("#timerTitle").text(display(minutes, seconds));

    /* Decrement minutes when seconds approaches zero */
    if (seconds === 0) {
      minutes--;
      seconds = 60;
    }
    seconds--;

    /* Logic to stop the timer */
    var totalSeconds = (givenMinutes * 60) + givenSeconds;
    if (secondsPast === totalSeconds) {
      $("#text").append("Timer Done!");
      clearInterval(intervalId);
    } //end if
  }, 1000);
});

/* function to add zero padding*/
function display(minutes, seconds) {
  var mm;
  var ss;
  if (minutes < 10) {
    mm = "0" + minutes + ":";
  } else {
    mm = minutes + ":";
  }
  if (seconds < 10) {
    ss = "0" + seconds;
  } else {
    ss = seconds;
  }
  var str = mm + ss;
  return str;
}
