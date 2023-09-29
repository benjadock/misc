document.addEventListener('DOMContentLoaded', function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const address = urlParams.get('address')
  generateNewTabs(address);
}, false);

function generateNewTabs(address) {
  fetch(`https://geocode.maps.co/search?q=${address}`)
    .then(response => response.json())
    .then(data => openTabs(address, data))
}

function openTabs(address, data) {
  let longitude, latitude, address1, address2
  [longitude, latitude] = [data[0]["lon"], data[0]["lat"]]
  [address1, address2] = address.split(/,(.*)/s)
  const container = document.getElementById('container')
  container.insertAdjacentHTML('beforeend', `<h2><a href="https://broadbandmap.fcc.gov/location-summary/fixed?addr1=${address1}&addr2=${address2}&zoom=15.00&vlon=${longitude}&vlat=${latitude}" target="_blank">FCC Map</a></h2>`);
  container.insertAdjacentHTML('beforeend', `<h2><a href="https://earth.google.com/web/search/${address}" target="_blank">Google Earth</a></h2>`);
}
