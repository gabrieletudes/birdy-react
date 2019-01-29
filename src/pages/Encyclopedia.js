import React, { Component } from 'react';
import firebase from 'firebase'

class Encyclopedia extends Component {
  state = {
    encyclopedia: null,
  }

  componentDidMount(){
    // Endpoint on the DB
    const encyclopedia = firebase.database().ref('encyclopedia');

    encyclopedia.on('value', result => {
      this.setState({encyclopedia:  result.val()})
    });
  }

  renderEncyclopedia() {
    const {encyclopedia} = this.state;
    if (encyclopedia !== null) {
      const values = Object.values(encyclopedia);
      return (
        <React.Fragment>
          {
            values.map((record, key) =>
              <div key={key}>
                <ul className="list-data">
                  <li className="list-data__element">
                    <img src={record.picture} alt="" width="250" height="250" />
                  </li>
                  <li className="list-data__element">
                      <audio className="custom-audio-small" preload="metadata" controls src={record.song}> Your browser does not support the <code>audio</code> element.
                      </audio>
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Nom commun</span>{record.common_name}
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
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">lng</span>{record.distribution.lng}
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
        <h1>Encyclopedie</h1>
        {this.renderEncyclopedia()}
      </React.Fragment>
    )
  }
}

export default Encyclopedia;
