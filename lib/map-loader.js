import scriptLoader from './script-loader';

function mapLoader (connect,initMap) {

    console.log(connect);
    
    scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${connect.key}&libraries=${connect.libraries}&callback=initMap`)

    window.initMap = initMap;
}

export default mapLoader;