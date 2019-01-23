import React, { Component } from 'react';
import firebase from 'firebase'
import {Link} from 'react-router-dom';
import Input from '../components/input';

class Home extends Component {
  state = {
    showmessage: false,
    capture_session: {
      started: false,
      location: {
        lat: '',
        lng: ''
      },
      method: '',
      uid: firebase.auth().currentUser.uid
    },
    newcapture: {
      age: '',
      fat: '',
      gender:'',
      latin_name: '',
      reprise: false,
      ring_number: '',
      session_id: '',
      weight: '',
      wings_length: ''
    },
  };

  componentDidMount() {
    const capturer = firebase.database().ref('single_captures');

    capturer.on('value', snap => {
        this.setState({
            single_captures: snap.val()
        })
    })
  }


  handleCaptureSession = ({currentTarget: input}) => {
    const capture_session = {...this.state.capture_session};
    capture_session[input.name] = input.value;
    this.setState({capture_session});
  }

  handleStartCaptureSession = e => {
    e.preventDefault();
    const {location, method, uid} = this.state.capture_session;
    //store the curren timestamp
    const captureTime = Date.now();
    //use it as entry point
    const session = firebase.database().ref('capture_sessions/' + captureTime);
    session.set({
      location, method, uid
    })
    session.once('value').then(snapshot => {
      // create a copy of the state elements
      const newcapture = {...this.state.newcapture};
      const capture_session = {...this.state.capture_session};
      // store new created capture session key
      newcapture.session_id = snapshot.key;
      // set capture session to true
      capture_session.started = true;
      // set the state back to respective fields
      this.setState({capture_session});
      this.setState({newcapture});
    })
  };


  handleAdd = ({currentTarget: input}) => {
    const newcapture = {...this.state.newcapture};
    newcapture[input.name] = input.value;
    this.setState({newcapture});
  }

  handleSubmit = e => {
    e.preventDefault();
    const {age, fat, gender, latin_name, reprise, ring_number, session_id, weight, wings_length} = this.state.newcapture;
    const capturer = firebase.database().ref('single_captures');
    capturer.push({
      age, fat, gender, latin_name, reprise, ring_number, session_id, weight, wings_length
    }).then(() => {
      const newcapture = {...this.state.newcapture};
      newcapture.age = ''
      newcapture.fat = ''
      newcapture.gender = ''
      newcapture.latin_name = ''
      newcapture.reprise =  false
      newcapture.ring_number = ''
      newcapture.weight = ''
      newcapture.wings_length = ''
      this.setState({newcapture})
    }
    )
  };

  startNewSession () {
     const {started, method} = this.state.capture_session;
     const {age, fat, gender, latin_name, reprise, ring_number, session_id, weight, wings_length} = this.state.newcapture;
     if (started !== true) {
       return (
        <React.Fragment>
           <h1 className="" >Envie de commencer une nouvelle capture?</h1>
           <form onSubmit={this.handleStartCaptureSession} action="" className="login-form form h-margin-top--big">
             <Input type="text"
               name="method"
               onChange={this.handleCaptureSession}
               label="Method de capture"
               value={method}
               className="form-control h-margin-top--tiny"
               aria-describedby="Method de capture"
             />
             <button type="submit" className="btn btn-primary h-margin-top--tiny h-margin-bottom--small">
               Commencer la capture
             </button>
           </form>
        </React.Fragment>
      )
     } else {
       return (
         <form onSubmit={this.handleSubmit} action="" className="login-form form">
           <Input type="text"
             name="latin_name"
             onChange={this.handleAdd}
             label="Nom latin"
             value={latin_name}
             className="form-control"
             aria-describedby="Nom latin de l'oiseau"
           />
           <Input type="number"
             name="ring_number"
             onChange={this.handleAdd}
             label="Numéro de la bague"
             value={ring_number}
             className="form-control"
             aria-describedby="Numéro de la bague de l'oiseau"
           />
           <Input type="number"
             name="age"
             onChange={this.handleAdd}
             label="Age de l'oiseau"
             value={age}
             className="form-control"
             aria-describedby="Age de l'oiseau"
           />
           <Input type="text"
             name="reprise"
             onChange={this.handleAdd}
             label="S'agit il d'une reprise?"
             value={reprise}
             className="form-control"
             aria-describedby="S'agit il d'une reprise?"
           />
           <Input type="text"
             name="gender"
             onChange={this.handleAdd}
             label="Sexe de l'oiseau"
             value={gender}
             className="form-control"
             aria-describedby="Sexe de l'oiseau"
           />
           <Input type="text"
             name="fat"
             onChange={this.handleAdd}
             label="Adiposité"
             value={fat}
             className="form-control"
             aria-describedby="Adiposité de l'oiseau"
           />
           <Input type="text"
             name="wings_length"
             onChange={this.handleAdd}
             label="Longueur alaire"
             value={wings_length}
             className="form-control"
             aria-describedby="Longueur alaire de l'oiseau"
           />
           <Input type="text"
             name="weight"
             onChange={this.handleAdd}
             label="Poid de l'oiseau"
             value={weight}
             className="form-control"
             aria-describedby="Poid de l'oiseau"
           />
         <button type="submit" className="btn btn-primary h-margin-top--tiny h-margin-bottom--small">Valider ma capture</button>
         <Link className="btn btn-secondary--outlined" to="/signup">Finir la session de bagage</Link>
         </form>
       )
     }
  }

  render () {
    return (
      <React.Fragment>
        {this.startNewSession()};
      </React.Fragment>
    )
  }
}

export default Home;
