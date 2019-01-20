import React, {Component} from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Input from '../components/input'
import BirdyLogo from '../logo-birdy-text.svg'

class SignUpPage extends Component {
  state = {
    account: {
      full_name: '',
      isn_id: '',
      useremail: '',
      password: ''

    },
    errors:{
      full_name: '',
      isn_id: '',
      useremail: '',
      password: ''
    }
  }

  handleSignup = e => {
    e.preventDefault();
    const {useremail, password} = this.state.account
    firebase.auth().createUserWithEmailAndPassword(useremail, password).then((theuser) => {
      this.createNewUser(theuser)
    }).catch((error) => {
      console.error(error);
    })
  }

  createNewUser(newuser) {
    const {full_name, isn_id} = this.state.account
    const {email, uid} = newuser.user
    firebase.database().ref('users/' + uid).set({
        full_name,
        email,
        isn_id,
        userId: uid
    });
  }

  handleLog = ({currentTarget: input}) => {
    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({account});
  }

  render () {
    const {account} = this.state

    return (
      <div className="login-wrapper">
        <div className="big-logo-wrapper">
          <img src={BirdyLogo} alt="Birdy Logo" width="132" className="round-image__element"/>
        </div>
        <form onSubmit={this.handleSignup} action="" className="login-form form">
          <Input type="text"
            name="full_name"
            onChange={this.handleLog}
            label="Entrez ici votre Nom et prenom *"
            value={account.full_name}
            className="form-control"
            aria-describedby="Prenom de l'utilisateur"
            errormessage="Mot de passe est obligatoir"
            />
          <Input type="text"
            name="isn_id"
            onChange={this.handleLog}
            label="Entez ici votre ID du ISN *"
            value={account.isn_id}
            className="form-control"
            aria-describedby="Id du ISN de l'utilisateur"
            />
          <Input  type="text"
            name="useremail"
            onChange={this.handleLog}
            label="Entrez ici votre Email *"
            value={account.useremail}
            className="form-control"
            aria-describedby="User Email"
            />
          <Input  type="password"
            name="password"
            onChange={this.handleLog}
            label="Entrez ici votre mot de passe *"
            value={account.password}
            className="form-control"
            aria-describedby="Mot de passe de l'utilisateur"
            />
          <button type="submit" className="btn btn-primary h-margin-top--tiny h-margin-bottom--small">Creer mon compte</button>
          <Link className="btn btn-secondary--outlined" to="/">Se connecter</Link>
        </form>
      </div>
    )
  }
}

export default SignUpPage
