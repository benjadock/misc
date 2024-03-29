$(function () {
  // Initial words population
  getWords();
  // Refresh words on header click
  $('.refresh').on('click', getWords);
  // Refresh words on 'Enter'
  document.onkeyup = function(event) { (event['code'] == 'Enter' ) && getWords(); };
});

function getWords() {
  const nounsFile = fetch('assets/text/nouns.txt')
    .then(file => file.text())
    .then(text => {return text.split('\n')});
  const adjectivesFile = fetch('assets/text/adjectives.txt')
    .then(file => file.text())
    .then(text => {return text.split('\n')});
  Promise.all([nounsFile, adjectivesFile])
    .then((data) => { processWords(data) });
}

function processWords(data) {
  const nouns = data[0];
  const adjectives = data[1];
  $('.noun').each(function() {
    const currentNoun = nouns[randomIndex(nouns.length)];
    $(this).html(currentNoun).prop('href', `https://duckduckgo.com?q=!mw ${currentNoun}`);
  });
  $('.adjective').each(function() {
    const currentAdjective = adjectives[randomIndex(adjectives.length)];
    $(this).html(currentAdjective).prop('href', `https://duckduckgo.com?q=!mw ${currentAdjective}`);
  });
}

function randomIndex(number) {
  return Math.floor(Math.random() * number);
}
