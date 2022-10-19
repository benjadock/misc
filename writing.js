$(function () {
  let timer = $('#timer');
  let timeout;
  let lyrics = $('#lyrics');
  let timerLength = $('#timer-length');
  let seconds = 0;

  timer.click(function () {
    seconds = timerLength.val();
    $(this).hasClass('cleared') ? startTimer() : stopTimer(ringBell=false);
  });

  function startTimer() {
    timer.removeClass('cleared').addClass('started');
    lyrics.prop('disabled', false).focus();
    updateTimer();
    timeout = setInterval(function () {
      seconds-- < 1 ? stopTimer() : updateTimer();
    }, 1000);
  }

  function updateTimer() {
    timer.html(`${(seconds - (seconds % 60)) / 60}:${String(seconds % 60).padStart(2, '0')}`);
  }

  function stopTimer(ringBell=true) {
    clearInterval(timeout);
    seconds = timerLength.val();
    timer.html('Start!').removeClass('started').addClass('cleared');
    lyrics.prop('disabled', true);
    if (ringBell) {
      new Audio('wwe-bell-single.mp3').play();
    }
  }
});