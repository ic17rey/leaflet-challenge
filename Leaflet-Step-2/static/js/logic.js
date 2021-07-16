//Store the URL to the selected data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Create the legend for the bottom of the screen and the values that will create the colors for depth
var legend = L.control({position: "bottomright"});
legend.onAdd = function(){
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML += (
  '<span> <b>Depth</b> </span><br>' +
  '<span style="background:white"> <= 0 </span><br>' +
  '<span style="background:#FFE4E1">  > 0 , <= 30 </span><br>' +
  '<span style="background:#fcc8c4"> > 30, <= 60 </span><br>' +
  '<span style="background:#f88379"> > 60 , <= 90 </span><br>' +
  '<span style="background:#f66054"> > 90, <= 120 </span><br>' +
  '<span style="background:#f32d1c"> > 120, <= 150 </span><br>' +
  '<span style="background:#960018"> > 150 </span>'  
  )

  return div
}

// Create the function that will be used when plotting earthquakes for circle color
function getColor(depth) {
  switch (true) {
    case depth>150:
      return '#960018'; 

    case depth>120:
      return '#f32d1c'; 
      
    case depth>90:
    return '#f66054'; 
  
    case depth>60:
      return '#f88379';
    
    case depth>30:
      return '#fcc8c4'; 
    
    case depth>0:
      return '#FFE4E1'; 

    case depth<=0:
      return 'white'; 
  
    default:
      return 'white';
  }
}

// Perform a GET request to the query URL
d3.json(url).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// Define a function we want to run once for each feature in the features array
function createFeatures(earthquakeData) {
  
  // Give each feature a popup about the earthquake
  function onEachFeature(feature, layer) {
     layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + 
     "Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>"
     + new Date(feature.properties.time) + "</p>");
  }

  // Create function for circles to be displayed for each feature (magnitude determines size, depth determines color)
  function createCircle(feature, layer){
           
    let options = {
      radius: feature.properties.mag * 2.4, //size of markers
      color: "black",
      fillColor: getColor(feature.geometry.coordinates[2] ),
      //opacity: 1,
      fillOpacity: 0.8,
      weight: .50,
    }
  return L.circleMarker(layer, options);
  }  

// Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array  

var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: createCircle,
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

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });
  // Define baseMaps object for layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Map": satellitemap
  };  

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes > 4.5 Magnitude": earthquakes
  };
  


  var myMap = L.map("map", {
    center: [
      28.4637, -43.7492
    ],
      zoom: 2.5,
      layers: [satellitemap, earthquakes]
  });

    legend.addTo(myMap);
  
  // Create a layer control
  // Pass in baseMaps and overlayMaps
  // Add layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

    


//Satellite: mapbox://styles/mapbox/satellite-v9
//Outdoors: mapbox://styles/mapbox/outdoors-v11
//GrayScale: LIGHT?