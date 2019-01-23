import React, { Component } from 'react';
import firebase from 'firebase';

class Captures extends Component {
  state = {
    captures: null,
  }

  componentDidMount(){
    // Endpoint on the DB
    const single_captures = firebase.database().ref('single_captures');

    single_captures.on('value', single_captures => {
      this.setState({captures:  single_captures.val()})
    });
  }

  renderCaptures() {
    const {captures} = this.state;
    if (captures !== null) {
      const values = Object.values(captures);
      return (
        <React.Fragment>
          {
            values.map((capture, key) =>
              <div key={key}>
                <h2>{capture.latin_name}</h2>
                <ul className="list-data">
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Âge</span>{capture.age}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Sex</span>{capture.gender}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Reprise</span>{capture.reprise}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Numéro de bague</span>{capture.ring_number}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Poids</span>{capture.weight}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Longueur alaire</span>{capture.wings_length}</li>
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
        <h1>Les captures</h1>
        {this.renderCaptures()}
      </React.Fragment>
    )
  }
}

export default Captures;
