import React, {Component} from 'react'
import firebase from 'firebase'
//import MarkerClusterer from '@google/markerclustererplus'

class Zones extends Component {
  state = {
    currentuser: {
      uid: firebase.auth().currentUser.uid,
      lat: null,
      lng: null,
    },
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

  setUserPosition = () => {
    //store in const the capture_session state
    const currentuser = {...this.state.currentuser};

    // Get the current position
    navigator.geolocation.getCurrentPosition(position => {
      // Add the current location to the user lat and lng
      currentuser.lat = this.roundToTwo(position.coords.latitude)
      currentuser.lng = this.roundToTwo(position.coords.longitude)

      // Set the modified state for the currenuser
      this.setState({currentuser})
    },()=>{
      console.error('There’s no position shared')
    }, { enableHighAccuracy: false, maximumAge: 60000, timeout: 27000
})
  }

  // round numbers to two decimals
  roundToTwo = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  removeGoogleMapAPI(){
    let index = window.document.getElementsByTagName('script')[0]
    index.parentNode.removeChild(index)
    window.google = {}
  }

  renderMap = () => {
    this.loadScript("https://maps.googleapis.com/maps/api/js?key=KEY_API&callback=initMap")
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

    capture_sessions.once('value', snapshot => {
      this.setState({
        capture_sessions: snapshot.val()
      }, this.renderMap())
    })
    this.setUserPosition()
  }

  initMap = () => {
    const { capture_sessions, currentuser } = this.state

    const allcaptures = Object.values(capture_sessions);
    //generate map
    var map = new window.google.maps.Map(
      document.getElementById('map'), {
        center: {lat: currentuser.lat, lng: currentuser.lng},
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
      // Add the circle for this ringingsite to the map.
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
