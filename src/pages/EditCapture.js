import React, {Component} from 'react'
import firebase from 'firebase'
import Joi from 'joi-browser';
import Input from '../components/input';
import {Link} from 'react-router-dom';

class SingleCapture extends Component {
  state = {
    capture: {
      key: '',
      age: '',
      fat: '',
      gender:'',
      latin_name: '',
      reprise: '',
      ring_number: '',
      session_id: '',
      weight: '',
      wings_length: ''
    },
    errors:{}
  }

  componentDidMount(){
    // store the id of the capture passed on the params
    const captureId = this.props.match.params.captureId
    // Endpoint on the DB
    const captureref = firebase.database().ref('single_captures');

    captureref.orderByKey().equalTo(captureId).on('value', result => {
      // variable to store the capture data
      let singlecapture = {};
      // Loop trough the data array
      result.forEach((thecapture) => {
        // select the data that we want from the endpoint
        const {age, fat, gender, latin_name, reprise, ring_number, session_id, uid, weight, wings_length} = thecapture.val();
        // fill the object with the data
        singlecapture = {
          key: thecapture.key,
          age,
          fat,
          gender,
          latin_name,
          reprise,
          ring_number,
          session_id,
          uid,
          weight,
          wings_length
        }
      })
      this.setState(prevState => ({
        capture: {
            ...prevState.capture,
            key: singlecapture.key,
            age: singlecapture.age,
            fat: singlecapture.fat,
            gender: singlecapture.gender,
            latin_name: singlecapture.latin_name, reprise: singlecapture.reprise, ring_number: singlecapture.ring_number, session_id: singlecapture.session_id, uid: singlecapture.uid, weight: singlecapture.weight, wings_length: singlecapture.wings_length
        }
      }))
    });
  }

  schema = {
    key: Joi.string(),
    age: Joi.string().max(8).trim().required().label('Age de l’oiseau'),
    fat: Joi.number().less(999999).positive().required().label('Adiposité'),
    gender: Joi.any().valid(['M', 'F']).required().label('Sexe de l’oiseau'),
    latin_name: Joi.string().trim().required().label('Nom latin'),
    reprise: Joi.any().valid(['Oui', 'Non']).required().label('La reprise'),
    ring_number: Joi.string().max(20).trim().required().label('Le numéro de bague'),
    session_id: Joi.string().trim().alphanum().required(),
    uid: Joi.string().alphanum().required(),
    weight: Joi.string().trim().max(10).required().label('Le poids de l’oiseau'),
    wings_length: Joi.string().trim().max(10).required().label('Longueur alaire')
  }

  validate = () => {
    const options = {abortEarly: false, escapeHtml: true};
    const {error} = Joi.validate(this.state.capture, this.schema, options)
    if(!error) return null;
    const errors = {};
    for (let item of error.details){
      errors[item.path[0]] = item.message;
    }
    return errors
  }

  // validate the property
  validateProperty = ({name, value}) => {
    const obj = {[name]: value};
    const schema = { [name]:this.schema[name]};
    const {error} = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  // Handle add of value
  handleAdd = ({currentTarget: input}) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input)
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name]
    }

    const capture = {...this.state.capture};
    capture[input.name] = input.value;
    this.setState({capture, errors});
  }

  renderCapture() {
    const {capture, errors} = this.state;
    // const keys = Object.keys(capture);
    const {age, fat, gender, latin_name, reprise, ring_number, weight, wings_length} = this.state.capture;
   //Classes for button submitNewCapture
    let submitNewCaptureClasses = 'btn btn-primary h-margin-top--tiny h-margin-bottom--small'
        submitNewCaptureClasses += this.validate() ? ' btn-primary--disabled' : '';
    if (capture !== null) {
      return (
        <form onSubmit={this.handleSubmit} action="" className="login-form form h-margin-top--tiny">
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
                  onChange={this.handleAdd}
                  value="Oui"
                  checked={reprise === "Oui"}
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
                  onChange={this.handleAdd}
                  value="Non"
                  checked={reprise === "Non"}
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
                  onChange={this.handleAdd}
                  value="M"
                  checked={gender === "M"}
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
                  onChange={this.handleAdd}
                  value="F"
                  checked={gender === "F"}
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
        <button disabled={this.validate()} type="submit" className={submitNewCaptureClasses}>Enregistrer les modifications</button>
        <Link className="btn btn-secondary--outlined" to="/mescaptures">Annuler l'edition</Link>
        </form>
      )} else {
        return <p>No data yet</p>
      }
    }

  render () {
    return (
      <React.Fragment>
        <h1 className="">Modifier la capture</h1>
        {this.renderCapture()}
      </React.Fragment>
    )
  }
}

export default SingleCapture;
