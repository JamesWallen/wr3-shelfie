import React, {Component} from 'react';
import './App.css';
import Header from './Components/Header/Header';
// import {HashRouter} from 'react-router-dom';
// import routes from './routes';

class App extends Component {
  render() {
    return (
      // <HashRouter>
        <div>
          <Header />
          <section>
            {/* {routes} */}
          </section>
        </div>
      // </HashRouter>
    )
  }
}

export default App;