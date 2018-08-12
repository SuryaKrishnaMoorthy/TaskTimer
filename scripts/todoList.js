/* Initializing letiables */
let arr = [];
let obj = {};
let intervalId;

/* Logic for add button */
$(".addButton").click(function() {
    if ($(".addTask").val().trim() &&
        $(".addMinutes").val().trim() && $(".addSeconds").val().trim() &&
        $(".addSeconds").val() <= 59 && $(".addSeconds").val() >= 0 &&
        $(".addMinutes").val() >= 0) {

        /* To populate array objects as key-value pairs */
        arr.push({
            task: $(".addTask").val(),
            min: $(".addMinutes").val(),
            sec: $(".addSeconds").val()
        });

        /* Resetting values after each add task */
        $(".addTask").val("");
        $(".addMinutes").val('5');
        $(".addSeconds").val('0');

        /* Loop through array */
        for (let i = 1; i <= arr.length; i++) {

            let li = $("<li class='row" + i +
                "' title='Double click to mark the task completed/reset the timer.'>"); // to create list item
            let taskAndTime = arr[i - 1]; // to get the 0th element

            /* Accessing last element of array */
            if (i === (arr.length)) {
                let start = $("<button class='timerButton' type='button' title='Start timer'>" +
                    "Start</button>");
                let pause = $("<button class='timerButton' type='button' title='Pause timer'>" +
                    "Pause</button>");
                let stop = $("<button class='timerButton' type='button' title='Stop timer'>" +
                    "Stop</button>");
                let launch = $("<button class='timerButton' type='button' title='Launch timer in new tab'>" +
                    "Launch</button>");
                let remove = $("<button class='row" + i + " timerButton' type='button' title='Delete task'>" +
                    "Delete</button>");

                /* To hide the deleted list item */
                remove.click(function() {
                    $(this).parent().hide();
                });

                /* To navigate to new window with parameters */
                launch.click(function() {
                    if (!(li.hasClass("complete"))) {
                        let url = "./views/timer.html?taskName=" + taskAndTime.task +
                            "&minutes=" + taskAndTime.min + "&seconds=" + taskAndTime.sec;
                        window.open(url, '_blank');
                    } else {
                        alert("Completed task!")
                    }
                });

                /* To start the timer in the same page */
                start.click(function() {
                    if (!(li.hasClass("complete"))) {
                        if (!(li.hasClass("started"))) {
                            $('li').removeClass("started"); // remove any existing running timer row
                            $(".timer").empty(); // clear the space of current timer
                            clearInterval(intervalId);
                            let timeValue = $("<h1 class='timerValue'></h1>");
                            $(".timer").append(timeValue);
                            let queryString = {
                                "minutes": taskAndTime.min,
                                "seconds": taskAndTime.sec
                            };
                            li.addClass("started"); // an identifier to know which row is active
                            $("button:contains('Started')").html("Start");
                            $("button:contains('Resume')").html("Pause");
                            $(this).html("Started");
                            intervalId = startTimer(queryString, li.attr("class"));
                        }
                    } else {
                        alert("Completed task!")
                    }
                });

                /* To pause the running timer */
                pause.click(function() {
                    if (li.hasClass("started")) {
                        let title = $(this).text();
                        if (title === "Pause") {
                            clearInterval(intervalId);
                            $(this).html("Resume");
                        } else {
                            let queryString = {
                                "minutes": $(".timerValue").text().split(":")[0],
                                "seconds": $(".timerValue").text().split(":")[1]
                            };
                            $(this).html("Pause");
                            intervalId = startTimer(queryString, li.attr("class"));
                        }
                    }
                });

                /* To stop the time */
                stop.click(function() {
                    if (li.hasClass("started")) {
                        $("button:contains('Started')").html("Start");
                        $("button:contains('Resume')").html("Pause");
                        $('li').removeClass("started");
                        $(".timer").empty();
                        clearInterval(intervalId);
                    }
                });

                /* Display the list element with values */
                li.append("<span class='taskList'>" + taskAndTime.task + "</span>")
                    .append("<span class='timeList'>" + taskAndTime.min + "min " + taskAndTime.sec + "sec" + "</span>")
                    .append(launch).append(remove).append(stop).append(pause).append(start);
                if ($(".list").has("ol").length) {
                    $("ol").append(li);
                } else {
                    let ol = $("<ol>");
                    ol.append(li);
                    $(".list").append(ol);
                }

            } // end if.

            /* To strike of the completed tasks */
            li.dblclick(function() {
                $(this).toggleClass('complete');
            });
        } // end for
    } else {
        alert("You must enter valid task and time values.");
    }
});
