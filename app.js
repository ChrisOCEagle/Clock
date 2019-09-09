// this object will contain all of my DOM manipulation methods
const domManipulator = {
    
    setAttributes: (element, attributes) => {
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        };
    },

    appendChildren: (element, children) => {
        for (let key in children) {
            element.appendChild(children[key]);
        };
    },

    removeAllChildren: (element) => {
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        };    
    },

    removeChildren: (element, length) => {
        for (let i = 0; i < length; i++) {
            element.removeChild(element.firstChild);
        };
    },

    elementCreator: function(element, id, className, style) {
        var newElement = document.createElement(element);
        if (className === null && style === null) {
            newElement.setAttribute('id', id);
        } else if (id === null && style === null) {
            newElement.setAttribute('class', className);
        } else if (id === null && className === null) {
            newElement.setAttribute('style', style);
        } else if (className == null) {
            this.setAttributes(newElement, {'id': id, 'style': style});
        } else if (id === null) {
            this.setAttributes(newElement, {'class': className, 'style': style});
        } else if (style === null) {
            this.setAttributes(newElement, {'class': className, 'id': id});
        } else {
            this.setAttributes(newElement, {'class': className, 'id': id, 'style': style});
        };
        return newElement;    
    },

    setMultipleElementAttributes: (elements, attributes) => {
        for (let key1 in elements) {
            for (let key2 in attributes) {
                elements[key1].setAttribute(key2, attributes[key2]);
            };
        };
    },
    
};

// determine whether the user wants it to be a clock or a timer
var clockChoice = document.getElementById('clock-choice');
clockChoice.addEventListener('click', function(event) {
    event.preventDefault();
    if (this.getAttribute('data-timer') === "clock") {
        // set the data attribute to be timer
        this.setAttribute('data-timer', 'timer');
        clockChoose(this);
    } else if (this.getAttribute('data-timer') === "timer") {
        // set the data attribute to be clock
        this.setAttribute('data-timer', 'clock');
        timerChoose(this);
    };
});

function clockChoose(obj) {
    // grab the currently clicked switched
    let currSwitch = obj.children[1].children[0];
    // move the current switch
    currSwitch.setAttribute('checked', '');
    // grab the other switch
    let otherSwitch = document.getElementsByClassName('btn-switch')[0];
    // change the id to be timer-choice and the data attribute to be data-timer-type
    domManipulator.setAttributes(otherSwitch, {'id': 'timer-choice', 'data-timer-type': 'countdown'});
    // remove the data-hour attribute
    otherSwitch.removeAttribute('data-hour');
    // change the click event on the switch to be for the timer instead of the hour
    otherSwitch.removeEventListener('click', hourSwitch);
    otherSwitch.addEventListener('click', timerSwitch);
    // set the html for the choice switch
    // let countdownHTML = '<div>Count</div><div>down</div>',
    //     stopwatchHTML = '<div>Stop</div><div>watch</div>',
    //     choiceArr = [
    //         {'id': 'countdown', 'html': countdownHTML},
    //         {'id': 'stopwatch-timer', 'html': stopwatchHTML},
    //         {'label': 'Timer Type'}
    //     ];
    // choiceSwitchHTML(hourChoice.children, choiceArr);
    // // change the digital clock's id to be timer
    // let digital = document.getElementsByClassName('clock')[0];
    // digital.setAttribute('id', 'timer');
    // // remove the children from the digital clock
    // domManipulation.removeChildren(digital);
    // // add the countdown div for the digital timer
    // let countdownDiv = elementCreator('div', 'countdown-timer');
    // domManipulation.appendChildren(digital, [countdownDiv]);
    // // check if the button switch is checked
    // let btnSwitch = hourChoice.getElementsByTagName('input')[0];
    // if (btnSwitch.attributes.length > 1) {
    //     hourChoice.setAttribute('data-timer-type', 'stopwatch');
    // };
    // /* create an area that will contain the buttons that will control countdown timer
    // aka how the user decides what it countdowns from and how it starts counting down */
    // let countdownControlDiv = document.createElement('div');
    // countdownControlDiv.setAttribute('class', 'btns');
    // /* this will create the choice btns that will allow the user to select a spot on the countdown timer
    // and increase or decrease the value of the currently selected position */
    // for (let i = 0; i < 3; i++) {
    //     let btnDiv = document.createElement('button');
    //     btnDiv.innerHTML = '^';
    //     countdownControlDiv.appendChild(btnDiv);
    // };
    // // this button will start the countdown timer
    // let btnStartDiv = document.createElement('button');
    // // setAttributes(btnStartDiv, {});
    // btnStartDiv.innerHTML = 'Start';
    // countdownControlDiv.appendChild(btnStartDiv);
    // document.body.insertBefore(countdownControlDiv, document.getElementById('timer-choice'))
};

function timerChoose(obj) {
    // grab the currently clicked switched
    let currSwitch = obj.children[1].children[0];
    // move the current switch
    currSwitch.removeAttribute('checked');
    // grab the other switch
    let otherSwitch = document.getElementsByClassName('btn-switch')[0];
    // change the id to be hour-choice and the data attribute to be data-hour
    domManipulator.setAttributes(otherSwitch, {'id': 'hour-choice', 'data-hour': 12});
    // remove the data-timer-type attribute
    otherSwitch.removeAttribute('data-timer-type');
    // change the click event on the switch to be for the hour instead of the timer
    otherSwitch.removeEventListener('click', timerSwitch);
    otherSwitch.addEventListener('click', hourSwitch);    
    // // set the html for the choice switch
    // choiceSwitchHTML(timerChoice.children, choiceArr);
    // // grab the timer and change it to the digital clock
    // let digitalTimer = document.getElementsByClassName('clock')[0];
    // digitalTimer.setAttribute('id', 'digital');
    // // create the date div
    // let dateDiv = domManipulation.elementCreator('div', 'date');
    // let dateNumbersDiv = domManipulation.elementCreator('div', 'date-numbers');
    // let timezoneDiv = domManipulation.elementCreator('div', 'timezone');
    // domManipulation.appendChildren(dateDiv, [dateNumbersDiv, timezoneDiv]);
    // // create the time div
    // let timeDiv = domManipulation.elementCreator('div', 'time');
    // let numberDiv = domManipulation.elementCreator('div', 'number');
    // let hourDiv = domManipulation.elementCreator('div', 'hour');
    // domManipulation.appendChildren(timeDiv, [numberDiv, hourDiv]);
    // // clear the content before adding the new content
    // domManipulation.removeChildren(digitalTimer);
    // // add the date and time to the digital clock
    // domManipulation.appendChildren(digitalTimer, [timeDiv, dateDiv]);
    // // check if the button switch is checked
    // let btnSwitch = timerChoice.getElementsByTagName('input')[0];
    // if (btnSwitch.attributes.length > 1) {
    //     timerChoice.setAttribute('data-hour', '24');
    //     digitalTimer.children[0].removeChild(digitalTimer.children[0].children[1]);
    // };
    
    // document.body.removeChild(document.body.firstElementChild.nextElementSibling)
};

// set the html for the choice switch
function choiceSwitchHTML(arr, arrObj) {
    // for (let i = 0; i < arr.length; i++) {
    //     if (i !== 1) {
    //         if (i === 0 || i === 2) {
    //             for (let j = 0; j < arrObj.length; j++) {
    //                 for (let key in arrObj[j]) {
    //                     if (key !== 'label') {
    //                         if (key === 'id') {
    //                             if (arrObj[j][key].includes('-') && arr[i].attributes[0].value.includes('-')) {
    //                                 arr[i].setAttribute(key, arrObj[j][key]);    
    //                             } else if (!arrObj[j][key].includes('-') && !arr[i].attributes[0].value.includes('-')) {
    //                                 arr[i].setAttribute(key, arrObj[j][key]);    
    //                             };
    //                         } else {
    //                             if (typeof arrObj[j][key] === 'string') {
    //                                 if (arrObj[j][key].toLowerCase().includes('count') && arr[i].attributes[0].value.includes('count')) {
    //                                     arr[i].innerHTML = arrObj[j][key];                    
    //                                 } else if (!arrObj[j][key].toLowerCase().includes('count') && !arr[i].attributes[0].value.includes('count')) {
    //                                     arr[i].innerHTML = arrObj[j][key];                    
    //                                 };
    //                             } else {
    //                                 if (arrObj[j][key] === 12 && !arr[i].attributes[0].value.includes('-')) {
    //                                     arr[i].innerHTML = arrObj[j][key];                    
    //                                 } else if (arrObj[j][key] !== 12 && arr[i].attributes[0].value.includes('-')) {
    //                                     arr[i].innerHTML = arrObj[j][key];                    
    //                                 };
    //                             };
    //                         };
    //                     };
    //                 };
    //             };        
    //         } else {
    //             for (let j = 0; j < arrObj.length; j++) {
    //                 for (let key in arrObj[j]) {
    //                     if (key === 'label') {
    //                         arr[i].innerHTML = arrObj[j][key];    
    //                     };
    //                 };
    //             };        
    //         };
    //     };
    // };
};

// what the user choice element is going to be based on existance of a unique id
// determine whether the user wants it to be 12 or 24 hour time
var userChoice;
if (document.getElementById('hour-choice') !== null) {
    userChoice = document.getElementById('hour-choice');
    userChoice.addEventListener('click', hourSwitch);
} else {
    userChoice = document.getElementById('timer-choice');
    userChoice.addEventListener('click', timerSwitch);
};

function hourSwitch(event) {
    event.preventDefault();
    // grab the div element that contains the time on the digital clock
    let timeDiv = document.getElementById('time');
    // check if the data attribute is 12 or 24
    if (parseInt(this.getAttribute('data-hour')) === 12) {
        // set the data attributes on each element to 24
        domManipulator.setMultipleElementAttributes([this, document.getElementById('header-title')], {'data-hour': 24});
        // move the switch
        this.getElementsByTagName('input')[0].setAttribute('checked', '');
        // remove the element that contains the AM/PM
        timeDiv.removeChild(document.getElementById("hour"));
    } else {
        // set the data attributes on each element to 12
        domManipulator.setMultipleElementAttributes([this, document.getElementById('header-title')], {'data-hour': 12});
        // move the switch
        this.getElementsByTagName('input')[0].removeAttribute('checked');
        // create the element that will contain the AM/PM
        let hourDiv = domManipulator.elementCreator('div', 'hour');
        timeDiv.appendChild(hourDiv);
    };
};

function timerSwitch(event) {
    event.preventDefault();
    console.log(this)
    // let timerDiv = document.getElementById('timer');
    // check if the data attribute is countdown or stopwatch
    if (this.getAttribute('data-timer-type') === 'countdown') {
        // set the data attribute on the current switch to stopwatch
        this.setAttribute('data-timer-type', 'stopwatch');
        // set the data attribute on the header title to 24
        document.getElementById('header-title').setAttribute('data-hour', 24);
        // move the switch
        this.getElementsByTagName('input')[0].setAttribute('checked', '');
        // let stopwatchDiv = domManipulation.elementCreator('div', 'stopwatch-timer');
        // domManipulation.removeChildren(timerDiv);
        // timerDiv.appendChild(stopwatchDiv);
    } else if (this.getAttribute('data-timer-type') === 'stopwatch') {
        // set the data attribute on the current switch to countdown
        this.setAttribute('data-timer-type', 'countdown');
        // set the data attribute on the header title to 12
        document.getElementById('header-title').setAttribute('data-hour', 12);
        // move the switch
        this.getElementsByTagName('input')[0].removeAttribute('checked');
        // let countdownDiv = domManipulation.elementCreator('div', 'countdown-timer');
        // domManipulation.removeChildren(timerDiv);
        // timerDiv.appendChild(countdownDiv);
    };
};

document.onreadystatechange = clocks();

function clocks() {
    let date = new Date();
    let hourChoice = userChoice.getAttribute('data-hour');
    let headerChoice = document.getElementById('header-title');
    let headerHourChoice = headerChoice.getAttribute('data-hour');

    // grab the hours, minutes, and seconds
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let times = {
        hour,
        minute,
        second,
        hourChoice,
    };

    // grab the year, month, and day
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let dayOfWeek = date.getDay();
    let monthOfYear;
    // get the timezone
    let timezone = date.toString().substr(date.toString().indexOf('('), date.toString().length);
    let dates = {
        year,
        month,
        day,
        dayOfWeek,
        monthOfYear,
        timezone,
    };

    // display the time on the application
    if (parseInt(headerHourChoice) === 24) {
        headerChoice.innerHTML = hour + ":" + minute + ":" + second;
    } else {
        if (hour > 12) {
            hour = hour - 12;
            headerChoice.innerHTML = hour + ":" + minute + ":" + second + "PM";
        } else if (hour === 12) {
            headerChoice.innerHTML = hour + ":" + minute + ":" + second + "PM";
        } else if (hour === 0) {
            hour = hour + 12;
            headerChoice.innerHTML = hour + ":" + minute + ":" + second + "AM";
        } else {
            headerChoice.innerHTML = hour + ":" + minute + ":" + second + "AM";
        };
    };

    month = month + 1;
    headerChoice.innerHTML += " " + month + "/" + day + "/" + year;

    if (document.getElementById("digital") !== null) {
        digitalClock({times, dates});
    } else if (document.getElementById("countdown-timer") !== null) {
        countdownTimer();    
    } else {
        stopwatchTimer();
    };

    analogClock(times);

    // have the clock increment every second
    let time;
    time = setTimeout(clocks, 1000);    
};

// create the digital clock
function digitalClock(date) {
    // call the time
    timer(date.times);
    // call the date
    calendar(date.dates);
};

// create the countdown timer
function countdownTimer() {
    console.log("Here is a countdown timer")
};

// create the stopwatch
function stopwatchTimer() {
    console.log('Here is a stopwatch')
};

// create the time function
function timer(times) {
    // grab the hours, minutes, and seconds
    let hour = times.hour;
    let minute = times.minute;
    let second = times.second;
    let hourChoice = times.hourChoice;

    let timeDiv = document.getElementById("time");
    let hourDiv = document.getElementById("hour");
    // have the minutes and seconds always contain two digits
    minute = ticker(minute);
    second = ticker(second);

    // display the time on the application
    if (parseInt(hourChoice) === 24) {
        timeDiv.children[0].innerHTML = hour + ":" + minute + ":" + second;
    } else {
        if (hour > 12) {
            hour = hour - 12;
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            hourDiv.innerHTML = "PM";
        } else if (hour === 12) {
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            hourDiv.innerHTML = "PM";
        } else if (hour === 0) {
            hour = hour + 12;
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            hourDiv.innerHTML = "AM";
        } else {
            document.getElementById("number").innerHTML = hour + ":" + minute + ":" + second;
            hourDiv.innerHTML = "AM";
        };
    };
};

// create the date function
function calendar(dates) {
    // grab the year, month, and day
    let year = dates.year;
    let month = dates.month;
    let day = dates.day;
    let dayOfWeek = dates.dayOfWeek;
    let monthOfYear = dates.monthOfYear;
    // get the timezone
    let timezone = dates.timezone;

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
    // month = month + 1;
    // document.getElementById("header-title").innerHTML += " " + month + "/" + day + "/" + year;
};

// create the ticker
function ticker(tickVal) {
    if (tickVal < 10) {
        tickVal = "0" + tickVal;
    }
    return tickVal;
};

// create the analog clock
function analogClock(times) {
    let second = times.second; // a number that represents the current seconds from 0-59
    let minute = times.minute; // a number that represents the current minutes from 0-59
    let hour = times.hour; // a number that represents the current hour from 0-23

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
