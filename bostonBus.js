var busStops = [];

async function run(){
	const locations = await getBusLocations();
  let time = new Date();
  let myTime = time.getSeconds() % 2;

  locations.forEach((x,i) => {
    let coord = [x.attributes.longitude, x.attributes.latitude];

    if (!busStops.length || i >= busStops.length) {
      var marker = new mapboxgl.Marker().setLngLat(coord).addTo(map);

      busStops.push(marker);
    }
    else {
      busStops[i].setLngLat(coord);
    }
  })

	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();

mapboxgl.accessToken = 'pk.eyJ1IjoicGVjaGUwMDkiLCJhIjoiY2tuaDNvdDAzMGlwdTJ1cWhtMjl0Yjd1dCJ9.OW-Kq9ux6HrzORPZxFB2Yw';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v8',
  center: [-71.104081, 42.365554],
  zoom: 12,
});

