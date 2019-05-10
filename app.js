document.onreadystatechange = clock();

// create the clock
function clock() {
    // grabbing the date object
    const date = new Date();

    // call the time
    timer(date);
    // call the date
    calendar(date);

    // have the clock increment every second
    var time;
    time = setTimeout(clock, 1000);
};

// create the time function
function timer(date) {
    // grab the hours, minutes, and seconds
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // have the minutes and seconds always contain two digits
    minute = ticker(minute);
    second = ticker(second);

    // display the time on the application
    if (hour > 12) {
        hour = hour - 12;
        document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
        document.getElementById("hour").innerHTML = "PM"
    } else {
        document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
        document.getElementById("hour").innerHTML = "AM"
    };
};

// create the date function
function calendar(date) {
    // grab the year, month, and day
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var dayOfWeek = date.getDay();
    var monthOfYear;

    // find the month of year
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < months.length; i++) {
        if (i === month) {
            monthOfYear = months[i];
        };
    };
    // find the day of the week
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (let i = 0; i < days.length; i++) {
        if (i === dayOfWeek) {
            dayOfWeek = days[i];
        };
    };

    // display the date on the application
    document.getElementById("date").innerHTML = dayOfWeek + " " + monthOfYear + " " + day + ", " + year;
};

function ticker(tickVal) {
    if (tickVal < 10) {
        tickVal = "0" + tickVal;
    }
    return tickVal;
};