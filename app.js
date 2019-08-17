// determine whether the user wants it to be a clock or a timer
var clockChoice = document.getElementById('clock-choice');
clockChoice.addEventListener('click', (event) => {
    event.preventDefault();
    if (this.clockChoice.getAttribute('data-timer') === "clock") {
        clockChoose(this);
    } else if (this.clockChoice.getAttribute('data-timer') === "timer") {
        timerChoose(this);
    };
});

function clockChoose(obj) {
    // set the data attribute to be timer
    obj.clockChoice.setAttribute('data-timer', 'timer');
    // move the switch
    var swtch = document.getElementsByTagName('input')[1];
    swtch.setAttribute('checked', '');
    // changing the data attributes on the choice switch
    var hourChoice = document.getElementById('hour-choice'),
        hourChoiceAttr = {
            'id': 'timer-choice',
            'data-timer': 'countdown'
        };
    setAttributes(hourChoice, hourChoiceAttr);
    hourChoice.removeAttribute('data-hour');
    // set the html for the choice switch
    var countdownHTML = '<div>Count</div><div>down</div><div>Timer</div>',
        stopwatchHTML = '<div>Stop</div><div>watch</div>';
    for (let i = 0; i < hourChoice.children.length; i++) {
        if (i === 0) {
            hourChoice.children[i].setAttribute('id', 'countdown');
            hourChoice.children[i].innerHTML = countdownHTML;
        } else if (i === 2) {
            hourChoice.children[i].setAttribute('id', 'stopwatch');
            hourChoice.children[i].innerHTML = stopwatchHTML;
        } else if (i !== 1) {
            hourChoice.removeChild(hourChoice.children[i]);
        };
    };
    // change the digital clock's id to be timer
    var digital = document.getElementsByClassName('clock')[0];
    digital.setAttribute('id', 'timer');
    // remove the date element from the digital clock
    digital.removeChild(digital.children[1]);
    digital.removeChild(digital.children[0]);
};

function timerChoose(obj) {
    // set the data attribute to be clock
    obj.clockChoice.setAttribute('data-timer', 'clock');
    // move the switch
    var swtch = document.getElementsByTagName('input')[1];
    swtch.removeAttribute('checked');
    // changing the data attributes on the choice switch
    var timerChoice = document.getElementById("timer-choice"),
        timerChoiceAttr = {
            'id': 'hour-choice',
            'data-hour': '12'
        };
    setAttributes(timerChoice, timerChoiceAttr);
    timerChoice.removeAttribute('data-timer');
    // set the html for the choice switch
    for (let i = 0; i < timerChoice.children.length; i++) {
        if (i === 0) {
            timerChoice.children[i].setAttribute('id', 'twelve');
            timerChoice.children[i].innerHTML = 12;
        } else if (i === 2) {
            timerChoice.children[i].setAttribute('id', 'twenty-four');
            timerChoice.children[i].innerHTML = 24;
        };
    };
    // add the label to the hour switch
    var label = document.createElement('span');
    label.setAttribute('id', 'label');
    label.innerHTML = 'Hour Time';
    timerChoice.appendChild(label);
    // add the date to the digital clock
    var digitalTimer = document.getElementsByClassName('clock')[0];
    digitalTimer.setAttribute('id', 'digital');
    var dateDiv = document.createElement('div');
    dateDiv.setAttribute('id', 'date');
    var dateNumbersDiv = document.createElement('div');
    dateNumbersDiv.setAttribute('id', 'date-numbers');
    var timezoneDiv = document.createElement('div');
    timezoneDiv.setAttribute('id', 'timezone');
    appendChildren(dateDiv, [dateNumbersDiv, timezoneDiv]);
    // add the time to the digital clock
    var timeDiv = document.createElement('div');
    timeDiv.setAttribute('id', 'time');
    var numberDiv = document.createElement('div');
    numberDiv.setAttribute('id', 'number');
    var hourDiv = document.createElement('div');
    hourDiv.setAttribute('id', 'hour');
    appendChildren(timeDiv, [numberDiv, hourDiv]);
    appendChildren(digitalTimer, [timeDiv, dateDiv]);
};

// determine whether the user wants it to be 12 or 24 hour time
var userChoice = document.getElementsByClassName('btn-switch')[0];
userChoice.addEventListener('click', hourSwitch);

function hourSwitch(event) {
    event.preventDefault();
    if (parseInt(this.getAttribute('data-hour')) === 12) {
        this.setAttribute('data-hour', 24);
        this.getElementsByTagName('input')[0].setAttribute('checked', '');
        document.getElementById("time").removeChild(document.getElementById("hour"));
    } else {
        this.setAttribute('data-hour', 12);
        this.getElementsByTagName('input')[0].removeAttribute('checked');
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "hour");
        document.getElementById("time").appendChild(newDiv);
    };
};

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
};

function appendChildren(element, children) {
    for (let key in children) {
        element.appendChild(children[key]);
    };
};

document.onreadystatechange = clocks();

function clocks() {
    var date = new Date();

    document.getElementById("digital") ? digitalClock(date) : () => {};
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
    // get the timezone
    var timezone = date.toString().substr(date.toString().indexOf('('), date.toString().length);

    // call the time
    timer(hour, minute, second);
    // call the date
    calendar(year, month, day, dayOfWeek, monthOfYear, timezone);
};

// create the time function
function timer(hour, minute, second) {
    var hourChoice = userChoice.getAttribute('data-hour');
    var timeDiv = document.getElementById("time");
    var hourDiv = document.getElementById("hour");
    // have the minutes and seconds always contain two digits
    minute = ticker(minute);
    second = ticker(second);

    // display the time on the application
    if (parseInt(hourChoice) === 24) {
        timeDiv.childNodes[1].innerHTML = hour + ":" + minute + ":" + second;
        document.getElementById("header-title").innerHTML = hour + ":" + minute + ":" + second;
    } else {
        if (hour > 12) {
            hour = hour - 12;
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            document.getElementById("header-title").innerHTML = hour + ":" + minute + ":" + second + "PM";
            hourDiv.innerHTML = "PM";
        } else if (hour === 12) {
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            document.getElementById("header-title").innerHTML = hour + ":" + minute + ":" + second + "PM";
            hourDiv.innerHTML = "PM";
        } else if (hour === 0) {
            hour = hour + 12;
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            document.getElementById("header-title").innerHTML = hour + ":" + minute + ":" + second + "AM";
            hourDiv.innerHTML = "AM";
        } else {
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            document.getElementById("header-title").innerHTML = hour + ":" + minute + ":" + second + "AM";
            hourDiv.innerHTML = "AM";
        };
    };
};

// create the date function
function calendar(year, month, day, dayOfWeek, monthOfYear, timezone) {
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
    document.getElementById("date-numbers").innerHTML = dayOfWeek + " " + monthOfYear + " " + day + ", " + year;
    document.getElementById("timezone").innerHTML = timezone;
    month = month + 1;
    document.getElementById("header-title").innerHTML += " " + month + "/" + day + "/" + year;
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
