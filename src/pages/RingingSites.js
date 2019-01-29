import React, {Component} from 'react'
import firebase from 'firebase'
//import MarkerClusterer from '@google/markerclustererplus'

class Zones extends Component {
  state = {
    lat: 52.61,
    lng: 5.5,
    zoom: 15,
    capture_sessions: []

  }
  componentDidMount(){
    this.getAllCaptures()
    window.initMap = this.initMap
  }

  componentWillUnmount(){
    this.removeGoogleMapAPI();
  }

  removeGoogleMapAPI(){
    let index = window.document.getElementsByTagName('script')[0]
    index.parentNode.removeChild(index)
    window.google = {}
  }

  renderMap = () => {
    this.loadScript("https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap")
  }

  loadScript = (url) => {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }

  getAllCaptures = () => {
    // Get the capture sessions
    const capture_sessions = firebase.database().ref('capture_sessions');

    capture_sessions.on('value', snapshot => {
      this.setState({
        capture_sessions: snapshot.val()
      }, this.renderMap())
    })
  }

  initMap = () => {
  const { capture_sessions } = this.state

  const allcaptures = Object.values(capture_sessions);
    //generate map
    var map = new window.google.maps.Map(
      document.getElementById('map'), {
        center: {lat: this.state.lat, lng: this.state.lng},
        zoom: 8
      })

    //loop generate marker
    allcaptures.map(result => {
      var marker = new window.google.maps.Marker({
        position: {lat: result.location.lat, lng: result.location.lng},
        map: map
      })
      return marker
    })

    // Add a marker clusterer to manage the markers.
    /*var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: '/map-images/m'})*/

      for (var ringingsite in allcaptures) {
        // Add the circle for this city to the map.
        var siteCircle = new window.google.maps.Circle({
          strokeColor: '#3b5f77',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#3b5f77',
          fillOpacity: 0.35,
          map: map,
          center: allcaptures[ringingsite].location,
          radius: this.state.lat * 2
        });
      }
  }

  render() {
    return (
      <div className="birdy-map" id="map"></div>
    )
  }
}


export default Zones;
