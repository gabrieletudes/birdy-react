import React, {Component} from 'react'
import firebase from 'firebase'

class SingleBird extends Component {
  state = {
    bird: null,
  }

  componentDidMount(){
    const birdId = this.props.match.params.birdId
    // Endpoint on the DB
    const bird = firebase.database().ref('encyclopedia');

    bird.orderByKey().equalTo(birdId).on('value', result => {
      this.setState({bird:  result.val()})
    });
  }

  renderBird() {
    const {bird} = this.state;
    if (bird !== null) {
      const values = Object.values(bird);
      return (
        <React.Fragment>
          {
            values.map((record, key) =>
              <div key={key}>
                <ul className="list-data">
                  <li className="list-data__element list-data__element--no-margin h-full-width h-centered">
                    <img src={record.picture} alt="" width="250" height="250" />
                  </li>
                  <li className="list-data__element">
                    <h1>{record.common_name}</h1>
                  </li>
                  <li className="list-data__element">
                      <audio className="custom-audio-small" preload="metadata" controls src={record.song}> Your browser does not support the <code>audio</code> element.
                      </audio>
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Nom Latin</span>{record.latin_name}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Famille</span>{record.family}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Type de vol</span>{record.flight_type}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Taille</span>{record.height}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Durée de vie</span>{record.lifetime}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">lat</span>{record.distribution.lat}
                    <span className="text-bold h-margin-left--small h-margin-right--tiny">lng</span>{record.distribution.lng}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Alimentation</span>{record.food}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Poids</span>{record.weight}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Envergure</span>{record.wingspan}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Habitat</span>{record.habitat}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Lieux de nidifications</span>{record.nesting_spots}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Description</span>{record.description}
                  </li>
                </ul>
              </div>
            )
          }
        </React.Fragment>
      )} else {
        return <p>No data yet</p>
      }
    }

  render () {
    return (
      <React.Fragment>
        {this.renderBird()}
      </React.Fragment>
    )
  }
}

export default SingleBird;
