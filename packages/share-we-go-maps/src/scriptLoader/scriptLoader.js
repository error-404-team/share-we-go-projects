import React from 'react';

// Get Apis Google Maps
{
  /* <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
type="text/javascript"></script> */
}

function scriptLoader(url) {
  var index = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default scriptLoader;

// วิธีใช้
// import ScriptsLoader from 'ScriptsLoader'
// ScriptsLoader('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap')
