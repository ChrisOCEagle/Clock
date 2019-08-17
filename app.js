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
    let swtch = document.getElementsByTagName('input')[1];
    swtch.setAttribute('checked', '');
    // remove the click event on the switch
    userChoice.removeEventListener('click', hourSwitch);
    userChoice.addEventListener('click', timerSwitch);
    // changing the data attributes on the choice switch
    let hourChoice = document.getElementById('hour-choice'),
        hourChoiceAttr = {
            'id': 'timer-choice',
            'data-timer': 'countdown'
        };
    setAttributes(hourChoice, hourChoiceAttr);
    hourChoice.removeAttribute('data-hour');
    // set the html for the choice switch
    let countdownHTML = '<div>Count</div><div>down</div><div>Timer</div>',
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
    let digital = document.getElementsByClassName('clock')[0];
    digital.setAttribute('id', 'timer');
    // remove the children from the digital clock
    removeChildren(digital);
    // add the countdown div for the digital timer
    let countdownDiv = elementID('div', 'countdown-timer');
    appendChildren(digital, [countdownDiv]);
    // check if the button switch is checked
    let btnSwitch = hourChoice.getElementsByTagName('input')[0];
    if (btnSwitch.attributes.length > 1) {
        let dataAttr = hourChoice.getAttribute('data-timer');
        console.log(dataAttr, typeof dataAttr)
        // dataAttr.value = 'stopwatch';
    };
};

function timerChoose(obj) {
    // set the data attribute to be clock
    obj.clockChoice.setAttribute('data-timer', 'clock');
    // move the switch
    let swtch = document.getElementsByTagName('input')[1];
    swtch.removeAttribute('checked');
    // add the click event on the switch
    userChoice.removeEventListener('click', timerSwitch);
    userChoice.addEventListener('click', hourSwitch);
    // changing the data attributes on the choice switch
    let timerChoice = document.getElementById("timer-choice"),
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
    let label = elementID('span', 'label');
    label.innerHTML = 'Hour Time';
    timerChoice.appendChild(label);
    // grab the timer and change it to the digital clock
    let digitalTimer = document.getElementsByClassName('clock')[0];
    digitalTimer.setAttribute('id', 'digital');
    // create the date div
    let dateDiv = elementID('div', 'date');
    let dateNumbersDiv = elementID('div', 'date-numbers');
    let timezoneDiv = elementID('div', 'timezone');
    appendChildren(dateDiv, [dateNumbersDiv, timezoneDiv]);
    // create the time div
    let timeDiv = elementID('div', 'time');
    let numberDiv = elementID('div', 'number');
    let hourDiv = elementID('div', 'hour');
    appendChildren(timeDiv, [numberDiv, hourDiv]);
    // clear the content before adding the new content
    removeChildren(digitalTimer);
    // add the date and time to the digital clock
    appendChildren(digitalTimer, [timeDiv, dateDiv]);
    // check if the button switch is checked
    let btnSwitch = timerChoice.getElementsByTagName('input')[0];
    if (btnSwitch.attributes.length > 1) {
        let dataAttr = timerChoice.getAttribute('data-hour');
        console.log(dataAttr, typeof dataAttr)
        // dataAttr.value = 24;
    };
};

function removeChildren(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function elementID(element, id) {
    let newElement = document.createElement(element);
    newElement.setAttribute('id', id);
    return newElement;
};

// determine whether the user wants it to be 12 or 24 hour time
var userChoice = document.getElementsByClassName('btn-switch')[0];
userChoice.addEventListener('click', hourSwitch);

function hourSwitch(event) {
    event.preventDefault();
    let timeDiv = document.getElementById('time');
    if (parseInt(this.getAttribute('data-hour')) === 12) {
        this.setAttribute('data-hour', 24);
        this.getElementsByTagName('input')[0].setAttribute('checked', '');
        timeDiv.removeChild(document.getElementById("hour"));
    } else {
        this.setAttribute('data-hour', 12);
        this.getElementsByTagName('input')[0].removeAttribute('checked');
        let hourDiv = elementID('div', 'hour');
        timeDiv.appendChild(hourDiv);
    };
};

function timerSwitch(event) {
    event.preventDefault();
    let timerDiv = document.getElementById('timer');
    if (this.getAttribute('data-timer') === 'countdown') {
        this.setAttribute('data-timer', 'stopwatch');
        this.getElementsByTagName('input')[0].setAttribute('checked', '');
        let stopwatchDiv = elementID('div', 'stopwatch-timer');
        removeChildren(timerDiv);
        timerDiv.appendChild(stopwatchDiv);
    } else if (this.getAttribute('data-timer') === 'stopwatch') {
        this.setAttribute('data-timer', 'countdown');
        this.getElementsByTagName('input')[0].removeAttribute('checked');
        let countdownDiv = elementID('div', 'countdown-timer');
        removeChildren(timerDiv);
        timerDiv.appendChild(countdownDiv);
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
    let date = new Date();

    document.getElementById("digital") ? digitalClock(date) : () => {};
    analogClock(date);

    // have the clock increment every second
    let time;
    time = setTimeout(clocks, 1000);    
};

// create the digital clock
function digitalClock(date) {
    // grab the hours, minutes, and seconds
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    // grab the year, month, and day
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let dayOfWeek = date.getDay();
    let monthOfYear;
    // get the timezone
    let timezone = date.toString().substr(date.toString().indexOf('('), date.toString().length);

    // call the time
    timer(hour, minute, second);
    // call the date
    calendar(year, month, day, dayOfWeek, monthOfYear, timezone);
};

// create the time function
function timer(hour, minute, second) {
    let hourChoice = userChoice.getAttribute('data-hour');
    let timeDiv = document.getElementById("time");
    let hourDiv = document.getElementById("hour");
    // have the minutes and seconds always contain two digits
    minute = ticker(minute);
    second = ticker(second);

    // display the time on the application
    if (parseInt(hourChoice) === 24) {
        timeDiv.children[0].innerHTML = hour + ":" + minute + ":" + second;
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
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < months.length; i++) {
        if (i === month) {
            monthOfYear = months[i];
        };
    };
    // find the day of the week
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
    let second = date.getSeconds(); // a number that represents the current seconds from 0-59
    let minute = date.getMinutes(); // a number that represents the current minutes from 0-59
    let hour = date.getHours(); // a number that represents the current hour from 0-23

    // create an object for each hand that contains its angle in degrees
    let hands = [
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
        let elements = document.querySelectorAll('#' + hands[i].hand + '-hand');
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
    let containers = document.querySelectorAll('#minutes-container');
    let secondAngle = containers[0].getAttribute('data-second-angle');
    if (secondAngle > 0) {
        let delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
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
    let containers = document.querySelectorAll('#seconds-container');
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
