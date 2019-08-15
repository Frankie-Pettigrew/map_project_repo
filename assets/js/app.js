const year =["2010","2011","2012","2013","2014","2015","2016","2017"]
let states = [];
let json = {};
let census = {};
const baseURL = "https://api.census.gov/data/"
const dataURL = "/acs/acs1/?get=NAME,B01001_001E&for=state:*&key="
const censusAPI = "a095faa2651e19f53c3a76671b58c0e1a5488dd9"


$.ajax({
  url: "https://gist.githubusercontent.com/wavded/1250983/raw/bf7c1c08f7b1596ca10822baeb8049d7350b0a4b/stateCodeToFips.json",
  method: 'GET'
}).then(function(data) {
  json = $.parseJSON(data);
  // console.log(json);
  states = $.makeArray(json);
  // console.log(states);

})

for (let i = 0; i < year.length; i++) {

let queryURL = baseURL + year[i] + dataURL + censusAPI
// console.log(queryURL);

$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function(response) {
  // console.log(response)
census[year[i]] = response;

 }
);

}
// console.log(census);
