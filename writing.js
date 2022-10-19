$(function () {
  let timer = $('#timer');
  let timeout;
  let lyrics = $('#lyrics');
  let prevLyrics = $('#prev-lyrics');
  let timerLength = $('#timer-length');
  let clearButton = $("#clear-prev");
  let seconds = 0;
  let storage = window.localStorage;

  timer.click(function () {
    seconds = timerLength.val();
    $(this).hasClass('cleared') ? startTimer() : stopTimer(ringBell=false);
  });

  clearButton.click(function () {
    storage.clear();
    prevLyrics.html('');
    clearButton.addClass('hidden');
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

  function addPreviousLyric(lyricsText) {
    prevLyrics.prepend(`<hr/><p>${lyricsText}</p>`);
  }

  function storePreviousLyric(lyricsText) {
    let lyrics = storage.getItem('lyrics');
    storage.setItem('lyrics', (lyrics != null ? lyrics : '') + (lyrics != null ? '||' : '') + lyricsText);
  }

  function stopTimer(ringBell=true) {
    clearInterval(timeout);
    seconds = timerLength.val();
    timer.html('Start!').removeClass('started').addClass('cleared');
    clearButton.removeClass('hidden');
    lyrics.prop('disabled', true);
    if (lyrics.val().length > 0) {
      addPreviousLyric(lyrics.val());
      storePreviousLyric(lyrics.val());
    }
    lyrics.val('');
    if (ringBell) {
      new Audio('wwe-bell-single.mp3').play();
    }
  }

  if (storage.getItem('lyrics') != null) {
    storage.getItem('lyrics').split('||').map((lyric) => {lyric.length > 0 && addPreviousLyric(lyric)});
    clearButton.removeClass('hidden')
  }
});