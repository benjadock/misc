document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem("whiteballs") != null && localStorage.getItem("powerball") != null) {
    fetch('https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD')
      .then(response => response.json())
      .then(data => processData(data.data));
  } else {
    $(".number-form").removeClass("hidden");
  }

  function processData(data) {
    const whiteBalls = localStorage.getItem("whiteballs").split(',').map(Number);
    const powerBall = parseInt(localStorage.getItem("powerball"));
    createChosenNumberRow(whiteBalls, powerBall);
    const currentDate = new Date();
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 10);
    const filteredData = data.filter(row => new Date(row[8]) > dateToCheck).reverse();
    filteredData.map(row => {
      const currentRow = { date: row[8], numbers: row[9].split(' ') };
      const date = new Date(currentRow.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      let numbersToAdd = "";
      currentRow.numbers.map((number, index) => {
        number = parseInt(number)
        const isChosen = (index < 5 && whiteBalls.includes(number)) || (index == 5 && number == powerBall);
        numbersToAdd += ballTag(number, isChosen, index == 5);
      });
      const winner = (currentRow.numbers.slice(0,5).filter(ball => whiteBalls.includes(parseInt(ball))).length == 5 && powerBall == currentRow.numbers[5]);
      $("#container").append(rowTags(numbersToAdd, date, winner));
    });
  }

  function ballTag(number, isChosen, isPowerBall) {
    return `<span class="${isChosen ? 'chosen' : ''} ${isPowerBall ? 'power' : ''} ball">${number}</span>`;
  }

  function rowTags(numbersToAdd, date, winner) {
    return `<div class="header-row">${date}</div><div class="number-row ${winner ? 'winner' : ''}">${numbersToAdd}</div>`;
  }

  function createChosenNumberRow(whiteBalls, powerBall) {
    let chosenBalls = '';
    whiteBalls.map(ball => { chosenBalls += ballTag(ball, true, false) });
    chosenBalls += ballTag(powerBall, true, true);
    $("#container").append(rowTags(chosenBalls, 'Yours', false));
  }

  $(".save-button").click(function() {
    let whiteballs = [];
    $('.white.ball-input').each(function () { whiteballs.push($(this).val()) });
    localStorage.setItem("whiteballs", whiteballs);
    localStorage.setItem("powerball", $('.power.ball-input').val());
    location.reload();
  });
}, false);