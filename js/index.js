var circle = $('.red-circle');
var audio = new Audio('http://www.podst.ru/pix/user_files/2/8935/007.mp3');
var sessionTime = $('#session-time')[0].value;
var circleHeight = 385 - (385 / (sessionTime * 60));
var timeinterval;
var breakTime = false;
var clockCountDisabled = false;
var clockCountStarted = false;
console.log(sessionTime)

function getTimeRemaining(endtime) {
  var t = endtime - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {

  var clock = document.getElementById(id);

  function updateClock() {
    /*if(clockCountDisabled) {
       clearInterval(timeinterval);
       clockCountDisabled = false;
     };*/
    var t = getTimeRemaining(endtime);
    var contMinutes = ('0' + t.minutes).slice(-2);
    var contSeconds = ('0' + t.seconds).slice(-2);
    clock.innerHTML = contMinutes + ':' + contSeconds;

    circleHeight -= (385 / (sessionTime * 61));
    circle[0].style.clip = 'rect(' + circleHeight + 'px, 385px, 385px, 0px)';
    if (t.total <= 0) {
      clearInterval(timeinterval);
      clockCountDisabled = false;
      clockCountStarted = false;
      if (!breakTime) {
        breakTime = true;
      } else {
        breakTime = false;
      }
      audio.play();
      main();
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);

};

function endTimeGetter(min) {
  var time = min * 60 * 1000;
  var endtime = Date.parse(new Date()) + time;
  return endtime;
};

function main() {

  clearInterval(timeinterval);
  if (clockCountStarted) {
    clockCountDisabled = true;
    clockCountStarted = false;
    breakTime = false;
  } else {
    if (!breakTime) {
      mainSession();
    };
    circleHeight = 385 - (385 / (sessionTime * 60));
    circle[0].style.clip = 'rect(' + circleHeight + 'px, 385px, 385px, 0px)';
    clockCountStarted = true;
    if (breakTime) {
      mainBreak();
    }
    initializeClock('clock-feild', endTimeGetter(sessionTime))
  }
}

function mainBreak() {
  sessionTime = $('#break-time')[0].value;
  $('#clock-intro')[0].innerHTML = 'Break';
  circle[0].style.background = '#F45C57';
  circle[0].style.border = '3px solid #F45C57';
};

function mainSession() {
  sessionTime = $('#session-time')[0].value;
  $('#clock-intro')[0].innerHTML = 'Session';

  circle[0].style.background = '#9DD8A4';
  circle[0].style.border = '3px solid #9DD8A4';
};

function handleTime(obj) {
  var parName = obj.toElement.parentElement.className;
  var elContent = obj.toElement.innerHTML;
  console.log(parName.search('box-one'))
  if (parName.search('box-one') > 0) {
    if (elContent === '+') {
      $('#break-time')[0].value = Number($('#break-time')[0].value) + 1;
    } else {
      if ($('#break-time')[0].value > 1) {
        $('#break-time')[0].value = Number($('#break-time')[0].value) - 1;
      }
    }
  };
  if (parName.search('box-two') > 0) {
    if (elContent === '+') {
      $('#session-time')[0].value = Number($('#session-time')[0].value) + 1;
    } else {
      if ($('#session-time')[0].value > 1) {
        $('#session-time')[0].value = Number($('#session-time')[0].value) - 1;
      }
    }
  };
  if (!clockCountStarted) {
    $('#clock-feild')[0].innerHTML = $('#session-time')[0].value;
    circle[0].style.clip = 'rect(385px, 385px, 385px, 0px)';
  };
};
$('.maintain-button').click(handleTime);

$('.timer-border').click(main);