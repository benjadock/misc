document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem("whiteballs") != null && localStorage.getItem("powerball") != null) {
    const powerballApi = fetch('https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD')
      .then(response => response.json())
      .then(data => processPowerball(data.data));
    const megaMillionsApi = fetch('https://data.ny.gov/resource/5xaw-6ayf.json')
      .then(response => response.json())
      .then(data => processMegaMillions(data));
    Promise.all([powerballApi, megaMillionsApi])
      .then((data) => { processData(data) });
  } else {
    $(".number-form").removeClass("hidden");
  }

  function processPowerball(data) {
    return data.reverse().slice(0, 4).map((row) => {
      return {
        game: 'Powerball',
        date: row[8],
        numbers: row[9].split(' '),
      };
    });
  }

  function processMegaMillions(data) {
    return data.slice(0, 4).map((row) => {
      return {
        game: 'Mega Millions',
        date: row['draw_date'],
        numbers: row['winning_numbers'].split(' ').concat([row['mega_ball']])
      };
    });
  }

  function processData(data) {
    const filteredData = data[0].concat(data[1]).sort(function (a, b) {
      var c = new Date(a['date']);
      var d = new Date(b['date']);
      return c - d;
    }).reverse().slice(0,6);
    const whiteBalls = localStorage.getItem("whiteballs").split(',').map(Number);
    const powerBall = parseInt(localStorage.getItem("powerball"));
    createChosenNumberRow(whiteBalls, powerBall);
    filteredData.map(currentRow => {
      const date = new Date(currentRow.date).toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
      let numbersToAdd = "";
      currentRow.numbers.map((number, index) => {
        number = parseInt(number)
        const isChosen = (index < 5 && whiteBalls.includes(number)) || (index == 5 && number == powerBall);
        numbersToAdd += ballTag(number, isChosen, index == 5);
      });
      const winner = (currentRow.numbers.slice(0, 5).filter(ball => whiteBalls.includes(parseInt(ball))).length == 5 && powerBall == currentRow.numbers[5]);
      $("#container").append(rowTags(currentRow.game, numbersToAdd, date, winner));
    });
  }

  function ballTag(number, isChosen, isPowerBall) {
    return `<span class="${isChosen ? 'chosen' : ''} ${isPowerBall ? 'power' : ''} ball">${number}</span>`;
  }

  function rowTags(game, numbersToAdd, date, winner) {
    return `
      <div class="header-row">${date}${game ? ' - ' + game : ''}</div>
      <div class="number-row ${winner ? 'winner' : ''}">${numbersToAdd}</div>
    `;
  }

  function createChosenNumberRow(whiteBalls, powerBall) {
    let chosenBalls = '';
    whiteBalls.map(ball => { chosenBalls += ballTag(ball, true, false) });
    chosenBalls += ballTag(powerBall, true, true);
    $("#container").append(rowTags(false, chosenBalls, 'Yours', false));
  }

  $(".save-button").click(function () {
    let whiteballs = [];
    $('.white.ball-input').each(function () { whiteballs.push($(this).val()) });
    localStorage.setItem("whiteballs", whiteballs);
    localStorage.setItem("powerball", $('.power.ball-input').val());
    location.reload();
  });
}, false);
