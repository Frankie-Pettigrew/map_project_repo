const key = 'pk.eyJ1IjoiZnJhbmtpZXBwIiwiYSI6ImNqejBmaGkyczBieHgzY3ZwM2s2dWZ2YXAifQ.ZtGh3ZnCQ8V7ONxzHXvAag';

// Options for map
let options = {
  lat: 39.833333,
  lng: -98.583333,
  zoom: 4,
  studio: true, // false to use non studio styles
  //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
  style: 'mapbox://styles/frankiepp/cjz3bo46y8b5q1cqm68njrxol',
};


// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', key);
let myMap;
let ells = [];
let tmps = [];

let canvas;

function setup(){
  newMap(options.lat,options.lng,4);
}

function draw(){
  clear();
  for(i=0;i<ells.length;i++){
    let pixCoord = myMap.latLngToPixel(ells[i].lt,ells[i].ln);
    let nuPop = ells[i].pop * 0.000001;
    // console.log(nuPop * 0.000001);
    let mapVal = Math.floor(tmps[i]);
    if(mapVal >= 0){
    let nuVal = map(mapVal,-20,20,0,255);
    // console.log(mapVal);
    let nuCol = color(nuVal,0,0,127);
    fill(nuCol);
    } else {
      let nuVal = map(mapVal,-20,20,0,255);
    // console.log(mapVal);
    let nuCol = color(0,0,nuVal,127);
    fill(nuCol);
    }
    noStroke();
    ellipse(pixCoord.x, pixCoord.y, nuPop * 10);
  }
}


function newMap(latt,long,zm){
  console.log("Made new Map");
  let newOptions = {
    lat: latt,
    lng: long,
    zoom: zm,
    studio: true, // false to use non studio styles
    //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
    style: 'mapbox://styles/frankiepp/cjz3bo46y8b5q1cqm68njrxol',
  };
  canvas = createCanvas(screen.width, screen.height/2);
  myMap = mappa.tileMap(newOptions);
  myMap.zoom
  myMap.overlay(canvas);
}

function newEllipse(lat,long,state){

  function fnSt(val){
    return val[0] === state;
  }
  newST = census["2017"].find(fnSt);
  console.log(newST);

  let newObj = {
    lt: lat,
    ln: long,
    pop: newST[1]
  };
  
  ells.push(newObj);
}

function newTemp(obj){
  let delt = obj.nu - obj.old;
  // console.log(delt);
  tmps.push(delt);
}