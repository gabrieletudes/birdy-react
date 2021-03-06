import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDove, faFeatherAlt, faUsers, faMap, faSignOutAlt, faHandHolding, faTimes} from '@fortawesome/free-solid-svg-icons'
library.add(faDove, faFeatherAlt, faUsers, faMap, faSignOutAlt, faHandHolding, faTimes)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
