import React, { Component } from 'react';
import Joi from 'joi-browser';
import firebase from 'firebase';
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
      gender:'M',
      latin_name: '',
      reprise: 'Non',
      ring_number: '',
      session_id: '',
      uid: firebase.auth().currentUser.uid,
      weight: '',
      wings_length: ''
    },
    errors: {}
  };

  componentDidMount() {
    // Get the single captures
    const capturer = firebase.database().ref('single_captures');

    capturer.on('value', snap => {
      this.setState({
        single_captures: snap.val()
      })
    })

    this.setPosition()
  }

  setPosition = () => {
    //store in const the capture_session state
    const capture_session = {...this.state.capture_session};

    // Get the current position
    navigator.geolocation.getCurrentPosition(position => {
      // Add the current location to the session lat and lng
      capture_session.location.lat = this.roundToTwo(position.coords.latitude)
      capture_session.location.lng = this.roundToTwo(position.coords.longitude)

      // Set the modified state to the capture_session
      this.setState({capture_session})
    })
  }

  // round numbers to two decimals
  roundToTwo = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  handleCaptureSession = ({currentTarget: input}) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input)
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name]
    }
    const capture_session = {...this.state.capture_session};
    capture_session[input.name] = input.value;
    this.setState({capture_session, errors});
  }

  handleStartCaptureSession = e => {
    e.preventDefault();

    const {location, method, uid} = this.state.capture_session;
    //store the curren timestamp
    const captureTime = Date.now();
    //use it as entry point
    const session = firebase.database().ref('capture_sessions/' + captureTime);
    session.set({location, method, uid
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

  schema = {
    age: Joi.string().max(8).trim().required().label('Age de l’oiseau'),
    fat: Joi.number().less(999999).positive().required().label('Adiposité'),
    gender: Joi.any().valid(['M', 'F']).required().label('Sexe de l’oiseau'),
    latin_name: Joi.string().trim().required().label('Nom latin'),
    reprise: Joi.boolean().truthy('Oui').falsy('Non').required().label('La reprise'),
    ring_number: Joi.string().max(20).trim().required().label('Le numéro de bague'),
    session_id: Joi.string().trim().alphanum().required(),
    uid: Joi.string().alphanum().required(),
    weight: Joi.string().trim().max(10).required().label('Le poids de l’oiseau'),
    wings_length: Joi.string().trim().max(10).required().label('Longueur alaire'),
    method: Joi.string().trim().max(20).required().label('La methode')
  }

  validate = () => {
    const options = {abortEarly: false, escapeHtml: true};
    const {error} = Joi.validate(this.state.newcapture, this.schema, options)
    if(!error) return null;
    const errors = {};
    for (let item of error.details){
      errors[item.path[0]] = item.message;
    }
    return errors
  }

  validateProperty = ({name, value}) => {
    const obj = {[name]: value};
    const schema = { [name]:this.schema[name]};
    const {error} = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleAdd = ({currentTarget: input}) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input)
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name]
    }

    const newcapture = {...this.state.newcapture};
    newcapture[input.name] = input.value;
    this.setState({newcapture, errors});
  }

  handleSubmit = e => {
    e.preventDefault();
    const {age, fat, gender, latin_name, reprise, ring_number, session_id, uid, weight, wings_length} = this.state.newcapture;
    const capturer = firebase.database().ref('single_captures');
    capturer.push({
      age, fat, gender, latin_name, reprise, ring_number, session_id, uid, weight, wings_length
    }).then(() => {
      const newcapture = {...this.state.newcapture};
      newcapture.age = ''
      newcapture.fat = ''
      newcapture.gender = 'M'
      newcapture.latin_name = ''
      newcapture.reprise = 'Non'
      newcapture.ring_number = ''
      newcapture.weight = ''
      newcapture.wings_length = ''
      this.setState({newcapture})
    }
    )
  };

  startNewSession () {
     const {started, method} = this.state.capture_session;
     const {errors} = this.state;
     const {age, fat, latin_name, ring_number, weight, wings_length} = this.state.newcapture;
     //Classes for button startCaptureSession
     let startCaptureSessionClasses = 'btn btn-primary h-margin-top--tiny h-margin-bottom--small'
         startCaptureSessionClasses += errors.method ? ' btn-primary--disabled' : '';
    //Classes for button submitNewCapture
     let submitNewCaptureClasses = 'btn btn-primary h-margin-top--tiny h-margin-bottom--small'
         submitNewCaptureClasses += this.validate() ? ' btn-primary--disabled' : '';
     if (started !== true) {
       return (
        <React.Fragment>
           <h1 className="">Envie de commencer une nouvelle capture?</h1>
           <form onSubmit={this.handleStartCaptureSession} action="" className={"login-form form h-margin-top--big"}>
             <Input type="text"
               name="method"
               onChange={this.handleCaptureSession}
               label="Method de capture"
               value={method}
               className="form-control h-margin-top--tiny"
               aria-describedby="Method de capture"
               errormessage={errors.method}
             />
           <button disabled={errors.method} type="submit" className={startCaptureSessionClasses}>
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
             errormessage={errors.latin_name}
           />
         <Input type="text"
             name="ring_number"
             onChange={this.handleAdd}
             label="Numéro de la bague"
             value={ring_number}
             className="form-control"
             aria-describedby="Numéro de la bague de l'oiseau"
             errormessage={errors.ring_number}
           />
         <Input type="text"
             name="age"
             onChange={this.handleAdd}
             label="Age de l'oiseau"
             value={age}
             className="form-control"
             aria-describedby="Age de l'oiseau"
             errormessage={errors.age}
           />
           <div className="form-group form-group--radios text--small">
             <p className="label__radios">S'agit il d'une reprise?</p>
             <div className="radio-group">
               <label className="h-margin-right--small label-radio" htmlFor="oui">
                 <input
                   type="radio"
                   name="reprise"
                   onClick={this.handleAdd}
                   value="Oui"
                   className="label-radio__input h-hidden-visually"
                   id="oui"
                   aria-describedby="Il s’agit d'une reprise"
                   />
                 <span className="label-radio__decoration"></span>Oui
               </label>
               <label className="label-radio" htmlFor="non">
                 <input
                   type="radio"
                   name="reprise"
                   onClick={this.handleAdd}
                   value="Non"
                   defaultChecked
                   className="label-radio__input h-hidden-visually"
                   id="non"
                   aria-describedby="Il s’agit pas d'une reprise"
                   />
                 <span className="label-radio__decoration"></span>Non
               </label>
             </div>
             {errors.reprise && <span className="label__error">{errors.reprise}</span>}
           </div>
         <div className="form-group form-group--radios text--small">
             <p className="label__radios">Sexe de l'oiseau</p>
             <div className="radio-group">
               <label className="h-margin-right--small label-radio" htmlFor="male">
                 <input
                   type="radio"
                   name="gender"
                   onClick={this.handleAdd}
                   value="M"
                   defaultChecked
                   className="label-radio__input h-hidden-visually"
                   id="male"
                   aria-describedby="Sexe de l'oiseau"
                   />
                 <span className="label-radio__decoration"></span>Masculin
               </label>
               <label className="label-radio" htmlFor="female">
                 <input
                   type="radio"
                   name="gender"
                   onClick={this.handleAdd}
                   value="F"
                   className="label-radio__input h-hidden-visually"
                   id="female"
                   aria-describedby="Sexe de l'oiseau"
                   />
                 <span className="label-radio__decoration"></span>Féminin
               </label>
             </div>
            {errors.gender && <span className="label__error">{errors.gender}</span>}
           </div>
           <Input type="text"
             name="fat"
             onChange={this.handleAdd}
             label="Adiposité"
             value={fat}
             className="form-control"
             aria-describedby="Adiposité de l'oiseau"
             errormessage={errors.fat}
           />
           <Input type="text"
             name="wings_length"
             onChange={this.handleAdd}
             label="Longueur alaire"
             value={wings_length}
             className="form-control"
             aria-describedby="Longueur alaire de l'oiseau"
             errormessage={errors.wings_length}
           />
           <Input type="text"
             name="weight"
             onChange={this.handleAdd}
             label="Poids de l'oiseau"
             value={weight}
             className="form-control"
             aria-describedby="Poids de l'oiseau"
             errormessage={errors.weight}
           />
         <button disabled={this.validate()} type="submit" className={submitNewCaptureClasses}>Valider ma capture</button>
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
