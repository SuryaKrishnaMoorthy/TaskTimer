/*Initializing variables*/
var arr = [];
var obj = {};
var startBtn;
var deleteBtn;

/*Logic for add button*/
$("#addBtn").click(function() {
  if ($("#addTask").val().trim() &&
    $("#addMinutes").val().trim() && $("#addSeconds").val().trim() &&
    $("#addSeconds").val() <= 59 && $("#addSeconds").val() >= 0 &&
    $("#addMinutes").val() >= 0) {
    /*To populate array objects as key-value pairs*/
    arr.push({
      task: $("#addTask").val(),
      min: $("#addMinutes").val(),
      sec: $("#addSeconds").val()
    });
    /*Resetting values after each add task*/
    $("#addTask").val("");
    $("#addMinutes").val('5');
    $("#addSeconds").val('0');
    /*Loop through array*/
    for (var i = 1; i <= arr.length; i++) {

      var li = $("<li class='row" + i + "'>"); //to create list item with unique id
      var taskAndTime = arr[i - 1]; //to get the 0th element

      /*Accessing last element of array*/
      if (i === (arr.length)) {

        startBtn = $("<button id='StartButton' type = 'button'>Start Timer</button>");
        deleteBtn = $("<button class='row" + i + " delTask' type='button'>Delete Task</button>");

        /*To hide the deleted list item*/
        deleteBtn.click(function() {
          $(this).parent().hide();
        });


        /*To navigate to new window with parameters*/
        startBtn.click(function() {
          if (!(li.hasClass("complete"))) {
            var url = "/timer.html?minutes=" + taskAndTime.min + "&seconds=" + taskAndTime.sec;
            window.open(url, '_blank');
          } else {
            alert("completed task!")
            console.log(this.startBtn.parent().addClass('complete'));
            //  console.log()
          }
        });

        /*Display the list element with values*/
        li.append("<span class= strike' id='task'>" + taskAndTime.task + "</span>	")
          .append("<span class='strike' id='time'>" + taskAndTime.min + "min " + taskAndTime.sec + "sec " + "</span>	")
          .append(startBtn).append(deleteBtn);
        $("ol").append(li);

      } //end if.

      /*To strike of the completed tasks*/
      li.dblclick(function() {
        console.log(this);
        $(this).toggleClass('complete');
      });
    } //end for
  } else {
    alert("You must enter valid task and time values.");
  }
});
