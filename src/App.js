import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Discover from './pages/Discover';
import User from './pages/User';
import {NavLink} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/courses' component={Courses}/>
          <Route exact path='/discover' component={Discover}/>
          <Route exact path='/user' component={User}/>
        </Switch>

        <footer id="footer">
          <NavLink exact className="nav" activeClassName="selected" to="/"><i className="home icon"></i><div className="nav-label">首页</div></NavLink>
          <NavLink className="nav" activeClassName="selected" to="/courses"><i className="unordered list icon"></i><div className="nav-label">课程</div></NavLink>
          <NavLink className="nav" activeClassName="selected" to="/discover"><i className="eye icon"></i><div className="nav-label">发现</div></NavLink>
          <NavLink className="nav" activeClassName="selected" to="/user"><i className="user icon"></i><div className="nav-label">我的</div></NavLink>
        </footer>
      </div>
    );
  }
}

export default App;
