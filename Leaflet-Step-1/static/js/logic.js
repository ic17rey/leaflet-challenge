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
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

 // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}


function createMap(earthquakes) {
  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

    // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };
  // Create map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      9.0820, 8.6753
    ],
      zoom: 2.3,
      layers: [streetmap, earthquakes]
    });

  // Create a layer control
  // Pass in baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


//------------
// function markerSize(magnitude)
// {
//     return magnitude * 40;
// }// For the magnitude of the earthquake

// // Define arrays to hold created markers 
// var depthColor = []
// for (var i = 0; i < earthquakes.length; i++)
//     depthColor.push(
//         locations[i].depth
//     )

// var magMarker = []


// for (var i = 0; i < earthquakes.length; i++) {
//     magMarker.push(
//         L.circle(locations[i].coordinates, {
//             stroke: false,
//             fillOpacity: .50,
//             color: "white",
//             fillColor: "fillColor",
//             radius: markerSize(locations[i].earthquakes.feature.properties.mag)
//         })
//     )
// }





// like in unit 17.1 activity 09
// var stateMarkers = [];

// // Loop through locations and create state markers
// for (var i = 0; i < locations.length; i++) {
//   // Setting the marker radius for the state by passing population into the markerSize function
//   stateMarkers.push(
//     L.circle(locations[i].coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "white",
//       radius: markerSize(locations[i].state.population)
//     })
//   );
