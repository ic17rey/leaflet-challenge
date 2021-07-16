# Leaflet Visualizations Challenge

### Background
Two directories exist for the challenge. Leaflet-Step-1 contains the index.html and other files related to the required part of the challenge. Leaflet-Step-2 contains code for the optional part of the challenge.

### Level 1: Basic Visualization (required)

The USGS earthquake data is available at [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). From here the dataset chosen for analysis was for earthquakes greater than 4.5 in magnitude and for the last 30 days.

The data set available is a JSON representation of all earthquakes within the past 30 days that were greater than 4.5 in magnitude. This JSON is used for creating the visualization.

A map is created using Leaflet plotting all the earthquakes from the data set, based on longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size, with greater magnitudes represented with a larger circle. Note: because the visualization is for only earthquakes > 4.5 magnitude the circles are generally similar in size.
   
   * The depth of the earthquake is indicated by color, with earthquakes of greater depths appear darker in color (range is from white to a dark red).

   * Popups are included that provide additional information about each earthquake when a marker is clicked.

   * A legend is displayed in the lower right corner that displays the color range for depth.

   * The visualization includes the U.S. but it is not the primary focus of this map, because for the data set most of the earthquakes greater than 4.5 in magnitude occured outside of the U.S. 

- - -

### Level 2: More Data (Optional)

The goal of the second and optional visualization is to illustrate the relationship between tectonic plates and seismic activity. 

   * Plots a second data set on our map.

   * Additional base map options for the user to choose will be addes as well as options to choose from two different data sets (created into overlays to be turned on and off independently). Layer controls are to be included as well.
