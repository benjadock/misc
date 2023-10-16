$(function () {
  getWords();
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
    $(this).html(nouns[randomIndex(nouns.length)]);
  });
  $('.adjective').each(function() {
    $(this).html(adjectives[randomIndex(adjectives.length)]);
  });
}

function randomIndex(number) {
  return Math.floor(Math.random() * number);
}