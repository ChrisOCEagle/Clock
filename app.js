document.onreadystatechange = clocks();

function clocks() {
    const date = new Date();

    digitalClock(date);
    analogClock(date);

    // have the clock increment every second
    var time;
    time = setTimeout(clocks, 1000);    
};

// create the digital clock
function digitalClock(date) {
    // grab the hours, minutes, and seconds
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // grab the year, month, and day
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var dayOfWeek = date.getDay();
    var monthOfYear;

    // call the time
    timer(hour, minute, second);
    // call the date
    calendar(year, month, day, dayOfWeek, monthOfYear);
};

// create the time function
function timer(hour, minute, second) {
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
function calendar(year, month, day, dayOfWeek, monthOfYear) {
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
    document.getElementById("date").innerHTML = dayOfWeek + " " + monthOfYear + " " + day + ", " + year + " (Eastern Standard Time)";
};

// create the ticker
function ticker(tickVal) {
    if (tickVal < 10) {
        tickVal = "0" + tickVal;
    }
    return tickVal;
};

// create the analog clock
function analogClock(date) {
    var second = date.getSeconds(); // a number that represents the current seconds from 0-59
    var minute = date.getMinutes(); // a number that represents the current minutes from 0-59
    var hour = date.getHours(); // a number that represents the current hour from 0-23

    // create an object for each hand that contains its angle in degrees
    var hands = [
        {
            hand: 'hour',
            angle: (30 * hour), // the angular velocity of the hour hand is 1 degree every 120 sec
        },
        {
            hand: 'minute',
            angle: (6 * minute), // the angular velocity of the minute hand is 1 degree every 10 sec
        },
        {
            hand: 'second',
            angle: (6 * second), // the angular velocity of the second hand is 6 degrees every second
        }
    ];

    // loop through each hand to set their angle
    for (let i = 0; i < hands.length; i++) {
        var elements = document.querySelectorAll('#' + hands[i].hand + '-hand');
        // force the angle to be between 0 and 360 degrees
        if (hands[i].angle > 360) {
            hands[i].angle -= 360;
        };
        for (let j = 0; j < elements.length; j++) {
            elements[j].style.webkitTransform = 'rotate(' + hands[i].angle + 'deg)';
            elements[j].style.transform = 'rotate(' + hands[i].angle + 'deg)';
            // if this is a minute hand, note the second hand's position (to calculate the minute position later)
            if (hands[i].hand === 'minute') {
                elements[j].parentNode.setAttribute('data-second-angle', hands[i + 1].angle);
            };
        };
    };
};

function setupMinuteHand() {
    // find out how far into the minute we are
    var containers = document.querySelectorAll('#minutes-container');
    var secondAngle = containers[0].getAttribute('data-second-angle');
    if (secondAngle > 0) {
        var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
        setTimeout(function() {
            moveMinuteHand(containers);
        }, delay);
    };
};

function moveMinuteHand(containers) {
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = 'rotate(6deg)';
        containers[i].style.transform = 'rotate(6deg)';
    };
    // then continue with a 60 second interval
    setInterval(function() {
        for (let i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 12;
            } else {
                containers[i].angle = 6;
            };
            containers[i].style.webkitTransform = 'rotate(' + containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotate(' + containers[i].angle + 'deg)';
        };
    }, 60000);
};

function moveSecondHand() {
    var containers = document.querySelectorAll('#seconds-container');
    setInterval(function() {
        for (let i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 6;
            } else {
                containers[i].angle += 6;
            };
            containers[i].style.webkitTransform = 'rotate(' + containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotate(' + containers[i].angle + 'deg)';
        };
    }, 1000);
};
