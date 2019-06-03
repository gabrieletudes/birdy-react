import React, {Component} from 'react'
import firebase from 'firebase'
import Loading from '../components/Loading'
import MarkerClusterer from '@google/markerclustererplus'

class Zones extends Component {
  state = {
    currentuser: {
      uid: firebase.auth().currentUser.uid,
      lat: 50.2,
      lng: 6.52,
    },
    zoom: 15,
    capture_sessions: [],
    loading: true,
  }

  componentDidMount(){
    window.initMap = this.initMap
    this.getAllCaptures()
    this.setUserPosition()
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
    }, { maximumAge: 60000, timeout: 27000})
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
    let index = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }

  getAllCaptures = () => {
    const allcaptures = {...this.state.capture_sessions}
    // Get the capture sessions
    const capture_sessions = firebase.database().ref('capture_sessions');
    const single_captures = firebase.database().ref('single_captures');

    // Retrives the single captures
    single_captures.on('child_added', (capture) => {
      // store the capture data
      let thecapture = capture.val();
      // add capture location property to the allcaptures array at given position
      allcaptures[capture.key] = {location:null}
      // Retrives all the location of a given capture
      capture_sessions.orderByKey().equalTo(thecapture.session_id).once('child_added', (capturesession) => {
        // store the capturesession data
        let captureloc = capturesession.val()
        // add the capture location to allcaptures array
        allcaptures[capture.key].location = captureloc.location
        // Affect the value to the state
      }).then(
        this.setState({capture_sessions: allcaptures})
      )
    })
    setTimeout(() => {
      this.setState({loading: false})
      this.renderMap()
    }, 1000)
  }

  initMap = () => {
    // destructure state
    const { capture_sessions, currentuser } = this.state

    const allcaptures = Object.values(capture_sessions);
    //generate map
    let map = new window.google.maps.Map(
      document.getElementById('map'), {
        center: {lat: currentuser.lat, lng: currentuser.lng},
        zoom: 8
      })

    //loop generate marker
    const markers = allcaptures.map(result => {
      let marker = new window.google.maps.Marker({
        position: {lat: result.location.lat, lng: result.location.lng},
        map: map
      })
      return marker
    })

    // Add a marker clusterer to manage the markers.
    new MarkerClusterer(map, markers,{imagePath: '/map-images/m'})
  }

  render() {
    const {loading} = this.state

    if (loading) {
      return (
        <Loading />
      )
    } else {
      return (
        <div className="birdy-map" id="map"></div>
      )
    }
  }
}


export default Zones;
