import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WebApp from './WebApp';
import { Provider} from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/rootReducer'
import AuthLogic from './service/authLogic';
import firebaseApp from './service/firebase';


const authLogic = new AuthLogic(firebaseApp);

let store = createStore(rootReducer);
// 생성한 store안에 모든 전역 state를 넣어 관리



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <WebApp authLogic={authLogic}/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

