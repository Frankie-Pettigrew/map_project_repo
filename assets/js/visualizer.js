
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

const options = {
    lat: 0,
    lng: 0,
    zoom: 1.5,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  }

function setup(){
   canvas =  createCanvas(640, 640);
//    background(100);

  // Create a tile map with lat 0, lng 0, zoom 4
  myMap = mappa.tileMap(options); 
  // Overlay the canvas over the tile map
  myMap.overlay(canvas);

}

function draw(){
  // takes lat and long of the country nigeria and then converts it into a 2D vector.
  const nigeria = myMap.latLngToPixel(11.396396,5.076543);
  clear();
  ellipse(nigeria.x, nigeria.y, 50, 50);
}