import React, {Component} from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Input from '../components/input'
import MessagePop from '../components/MessagePop'
import BirdyLogo from '../logo-birdy-text.svg'

class SignInPage extends Component {
  state = {
    account: {
      useremail: '',
      password: ''
    },
    message:{
      text: null,
      type: null
    }
  }

  handleSignin = e => {
    e.preventDefault();
    const {useremail, password} = this.state.account

    const message = {...this.state.message}

    firebase.auth().signInWithEmailAndPassword(useremail, password).then((u) => {
      message['text'] = 'welcome user';
      message['type'] = 'success'
      this.setState(
        {message}
      )
    }).catch((error) => {
      message['text'] = error.message;
      message['type'] = 'error'
      this.setState({message})
    });
  }

  handleLog = ({currentTarget: input}) => {
    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({account});
  }

  render () {
    const {account, message} = this.state

    return (
      <div className="login-wrapper">
        <div className="big-logo-wrapper">
          <img src={BirdyLogo} alt="Birdy Logo" width="auto" className="round-image__element logo"/>
        </div>
        {message.text && <MessagePop message={message.text} type={message.type} />}
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
