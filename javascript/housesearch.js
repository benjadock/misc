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
  [address1, address2] = address.split(',')[0]
  window.open(`https://broadbandmap.fcc.gov/location-summary/fixed?addr1=${address1}&addr2=${address2}&zoom=15.00&vlon=${longitude}&vlat=${latitude}`, '_blank')
  window.open(`https://earth.google.com/web/search/${address}`, '_blank')
}
