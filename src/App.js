import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Index = () => {
  return <div></div>
}

const Daily = () => {
  return <div></div>
}

const Navigation = () => {
  return <div className="navigation">
    <ul className="nav">
      <li>
        <Link to={'/'} className="nav-link" >
          <span className="">列車查詢</span>
        </Link>
      </li>
      <li>
        <Link to={'/daily'} className="nav-link" >
          <span className="">當日查詢</span>
        </Link>
      </li>
    </ul>
  </div>
}

const UserForm = () => {
  return <div className="user-form">
    </div>
}

class App extends Component {
  render() {
    return <Router>
        <div className="app">
          <div className="app-body">
            <div className="side-bar">
              <Navigation />
            </div>
            <div className="contain-block">
              <UserForm />
              <div className="card-block">
                <Route exact path="/" component={Index} />
                <Route exact path="/daily" component={Daily} />
              </div>
            </div>
          </div>
        </div>
      </Router>
  }
}

export default App;
