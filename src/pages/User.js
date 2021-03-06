import React, { Component } from 'react';
import './User.css';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import Axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideLoading: false,
      userId: 1,
      userName: 'hyf',
      avatar: 'image/avatar2.jpg',
      phone: ''      
    }
  };
  componentWillMount() {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <div className="User">
        <Loading hide={this.state.hideLoading}/>

        <div className="user-banner">
          <img className="user-avatar" src={this.state.avatar} alt="头像"/>
          <div className="user-name">{this.state.userName}</div>
        </div>

        <div>
          <NavLink to="/wallet">
          <div className="user-bar" id="wallet">
            <span className="method"><i className="icon credit card alt"></i>钱包</span><span className="bar-right">></span>
          </div>
          </NavLink>

          <div className="user-bar">
            <span className="method"><i className="icon phone"></i>手机账号</span><span className="bar-right">{this.state.phone}</span>
          </div>

          <NavLink to="/appointments">
          <div className="user-bar">
            <span className="method"><i className="icon clock o "></i>我的预约</span><span className="bar-right">></span>
          </div>
          </NavLink>

          <NavLink to="/orders">
          <div className="user-bar">
            <span className="method"><i className="icon file text "></i>我的订单</span><span className="bar-right">></span>
          </div>
          </NavLink>

          <NavLink to="/service">
          <div className="user-bar">
            <span className="method"><i className="icon commenting "></i>我的客服</span><span className="bar-right">></span>
          </div>
          </NavLink>

          <NavLink to="/login">
          <div className="user-bar">
            <span className="method"><i className="icon sign out "></i>注销</span><span className="bar-right">></span>
          </div>
          </NavLink>
        </div>

      </div>
    );
  };
  componentDidMount() {
    Axios.post("/SSM/test/CustomerHandler_islogin")
    .then(res => {
      if (res.data.result) {
        // this.setState({hideLoading: true});
      } else {
        window.location.hash = 'login';
      }
    })
    .catch(err => {
      alert(err);
      // window.location.assign("../#login");
    });

    Axios.post("/SSM/test/CustomerHandler_findCustomerByPhone")
    .then(res => {
      if (res.data) {
        this.setState({
          hideLoading: true,
          userId: res.data.cid,
          userName: res.data.phone,
          phone: res.data.phone
        });
      } else {
        alert("加载失败！");
      }
    })
    .catch(err => {
      alert(err);
    })
      
      // setTimeout(() =>
      //     this.setState({hideLoading: true}),
      //     1000
      // );
  }
}

export default User;