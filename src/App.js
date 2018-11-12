import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Index from './components/Index'
import Daily from './components/Daily'
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return <Router>
        <div className="app">
          <div className="app-body">
            <div className="side-bar">
              <Navigation />
            </div>
            <div className="contain-block">
              <Route exact path="/" render={props =><Index {...props} />} />
            <Route exact path="/daily" render={props => <Daily {...props} />} />
            </div>
          </div>
        </div>
      </Router>
  }
}

export default App;
