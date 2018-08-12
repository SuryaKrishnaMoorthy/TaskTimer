/* To start the function as soon as page loads */
$(function() {
  /* To extract parameters from the url */
  let queryString = new Array();

  if (queryString.length == 0) {
    if (window.location.search.split('?').length > 1) {
      var uri = window.location;
      var uri_dec = decodeURIComponent(uri);

      /* Splitting url and populating array 'params' */
      let params = uri_dec.split('?')[1].split('&');

      /* Populating queryString array */
      for (let i = 0; i < params.length; i++) {
        let key = params[i].split('=')[0];
        let value = params[i].split('=')[1];
        queryString[key] = value;
      } // end for
    } // end if
  } // end if

  startTimer(queryString, "newTab");
});

/* The main timer function */
function startTimer(queryString, location) {

  /* Fetching the value from user input */
  let givenMinutes = parseInt(queryString["minutes"]);
  let givenSeconds = parseInt(queryString["seconds"]);
  let taskName = queryString["taskName"];

  let startTime = Date.now();

  /* Initilaizing local variables as per user input and Display the starting value of timer */
  let seconds = givenSeconds;
  let minutes = givenMinutes;
  $(".taskName").text(taskName);
  if (location === "newTab") {
    $(".timeValue").text(display(minutes, seconds));
  } else {
    $(".timerValue").text(display(minutes, seconds));
  }

  if (givenSeconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  /* Main timer logic */
  if (givenMinutes || givenSeconds) {
    let intervalId = setInterval(function() {

      /* Calculate the total seconds passed */
      let currentTime = Date.now();
      let secondsPast = Math.floor((currentTime - startTime) / 1000);
      if (location === "newTab") {
        $(".timeValue").text(display(minutes, seconds));
      } else {
        $(".timerValue").text(display(minutes, seconds));
      }
      $(".timerTitle").text(display(minutes, seconds) + " - " + taskName);

      /* Decrement minutes when seconds approaches zero */
      if (seconds === 0) {
        minutes--;
        seconds = 60;
      }
      seconds--;

      /* Logic to stop the timer */
      let totalSeconds = (givenMinutes * 60) + givenSeconds;
      if (secondsPast === totalSeconds) {
        if (location === "newTab") {
          $(".textValue").append("Timer Done!");
        } else {
          location = location.replace(/\s+/g, '.');
          $("li." + location).addClass("complete"); // mark the row complete
          $("button:contains('Started')").html("Start"); // revert the name
        }
        clearInterval(intervalId);
      } //end if
    }, 1000);
    return intervalId;
  }

}

/* Function to add zero padding*/
function display(minutes, seconds) {
  let mm;
  let ss;
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
  let str = mm + ss;
  return str;
}

/* Change task name font color on mouse over */
function changeFontColor(color) {
  $("h3").css("color", color);
}
