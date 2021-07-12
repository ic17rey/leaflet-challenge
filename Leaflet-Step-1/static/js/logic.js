//Store the URL to the selected data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL
d3.json(url).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});



// Define a function we want to run once for each feature in the features array
function createFeatures(earthquakeData) {
  
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
     layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + 
     "Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>"
     + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  
  //NEED markers as circles sized based on mag and color based on depth
  // var circleStyle = {
  //   color: "white",
  //   fillColor: "green", //colorFill
  //   fillOpacity: 0.5,
  //   fillOpacity: .50,
  //   radius: 10 //markerSize
    
  // };
  function createCircle(feature, layer){
    let options = {
      radius: feature.properties.mag * 2, //markerSize
      color: "black",
      fillColor: "lightgreen", //colorFill
      fillOpacity: 0.8,
      weight: .50,
    }
  return L.circleMarker(layer, options);
}  
  

var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: createCircle,
    //or if have created a function call it here
    //markerSize?
    onEachFeature: onEachFeature
  });

 // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {
  
  // Define streetmap layer
  // Create overlay object to hold our overlay layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var myMap = L.map("map", {
    center: [
      //17.7917, -7.0926
      //14, -14
      28.4637, -43.7492
    ],
      zoom: 2.5,
      layers: [streetmap, earthquakes]
    });
  }
    
  
  
//For other layers (Leaflet-Step-2)

//Satellite: mapbox://styles/mapbox/satellite-v9
//Outdoors: mapbox://styles/mapbox/outdoors-v11
//GrayScale: LIGHT?

  // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "dark-v10",
  //   accessToken: API_KEY
  // });

  // Define a baseMaps object to hold our base layers
  // var baseMaps = {
  //   "Street Map": streetmap,
  //   "Dark Map": darkmap
  // };

  
  // var overlayMaps = {
  //   "Earthquakes" : earthquakes
  // };
  // Create map, giving it the streetmap and earthquakes layers to display on load

  // Create a layer control
  // Pass in baseMaps and overlayMaps
  // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);//
//}

//For Legend and color scaling? Chloropleth
// Load in geojson data
// var geoData = "static/data/Median_Household_Income_2016.geojson";

// var geojson;

// // Grab data with d3
// d3.json(geoData).then(function(data) {

//   // Create a new choropleth layer
//   geojson = L.choropleth(data, {

//     // Define what  property in the features to use
//     valueProperty: "MHI2016",

//     // Set color scale
//     scale: ["#ffffb2", "#b10026"],

//     // Number of breaks in step range
//     steps: 10,

//     // q for quartile, e for equidistant, k for k-means
//     mode: "q",
//     style: {
//       // Border color
//       color: "#fff",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a pop-up to each layer
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
//         "$" + feature.properties.MHI2016);
//     }
//   }).addTo(myMap);

//   // Set up the legend
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var limits = geojson.options.limits;
//     var colors = geojson.options.colors;
//     var labels = [];

//     // Add min & max
//     var legendInfo = "<h1>Median Income</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);

// });
