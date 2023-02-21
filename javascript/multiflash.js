document.addEventListener('DOMContentLoaded', function () {
  let rangeX = this.getElementById('range-x');
  let rangeY = this.getElementById('range-y');
  let initialTimeSet = generateTimesSet(rangeX.value, rangeY.value);
  populateCard(initialTimeSet);
  $('#card').click(function() {
    if ($('#card-result').hasClass('hidden')) {
      $('#card-result').removeClass('hidden');
    } else {
      let newTimeSet = generateTimesSet(rangeX.value, rangeY.value);
      populateCard(newTimeSet);
    }
  });
  $('#range-x,#range-y').change(function() {
    let newTimeSet = generateTimesSet(rangeX.value, rangeY.value);
    populateCard(newTimeSet);
  });
}, false);

function getRandomNumber(range) {
  return parseInt((Math.random() * parseInt(range)) + 1);
}

function generateTimesSet(rangeX, rangeY) {
  let numberX = getRandomNumber(rangeX);
  let numberY = getRandomNumber(rangeY);
  let result = (numberX * numberY);
  return {
    x: numberX,
    y: numberY,
    result: result
  };
}

function populateCard(timeSet) {
  let x = document.getElementById('card-x');
  let y = document.getElementById('card-y');
  let result = document.getElementById('card-result');
  x.innerHTML = timeSet['x'];
  y.innerHTML = timeSet['y'];
  result.innerHTML = timeSet['result'];
  result.classList.add('hidden')
}