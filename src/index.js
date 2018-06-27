import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import Enterprise from './pages/Enterprise';
import Teachers from './pages/Teachers';
import Location from './pages/Location';
import CourseDetail from './pages/CourseDetail';
import Buy from './pages/Buy';
import Appoint from './pages/Appoint';
import Orders from './pages/Orders';
import Appointments from './pages/Appointments';
import Wallet from './pages/Wallet';
import Login from './pages/Login';


ReactDOM.render(<HashRouter>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route exact path='/courses' component={App}/>
                        <Route exact path='/discover' component={App}/>
                        <Route exact path='/user' component={App}/>
                        <Route exact path="/enterprise" component={Enterprise}/>
                        <Route exact path="/teachers" component={Teachers}/>
                        <Route exact path="/location" component={Location}/>
                        <Route exact path="/coursedetail" component={CourseDetail}/>
                        <Route exact path="/buy" component={Buy}/>
                        <Route exact path="/appoint" component={Appoint}/>
                        <Route exact path="/orders" component={Orders}/>
                        <Route exact path="/appointments" component={Appointments}/>
                        <Route exact path="/wallet" component={Wallet}/>
                        <Route exact path="/login" component={Login}/>

                    </Switch>
                </HashRouter>, document.getElementById('root'));
registerServiceWorker();
