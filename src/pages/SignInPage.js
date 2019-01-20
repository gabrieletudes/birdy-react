import React, {Component} from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Input from '../components/input'
import BirdyLogo from '../logo-birdy-text.svg'

class SignInPage extends Component {
  state = {
    account: {
      useremail: '',
      password: ''
    },
    errors: {
      username: '',
      password: ''
    }
  }

  handleSignin = e => {
    e.preventDefault();
    const {useremail, password} = this.state.account
    firebase.auth().signInWithEmailAndPassword(useremail, password).then((u) => {
    }).catch((error) => {
        console.log(error);
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
        <form onSubmit={this.handleSignin} action="" className="login-form form">
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
          <button type="submit" className="btn btn-primary h-margin-top--tiny h-margin-bottom--small">Me connecter</button>
          <Link className="btn btn-secondary--outlined" to="/signup">Creer un compte</Link>
        </form>
      </div>
    )
  }
}

export default SignInPage
