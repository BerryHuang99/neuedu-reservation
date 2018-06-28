import React, { Component } from 'react';
import './User.css';
import { NavLink } from 'react-router-dom';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 1,
      userName: 'hyf',
      avatar: 'image/avatar.png'
    }
  };
  render() {
    return (
      <div className="User">
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
            <span className="method"><i className="icon phone"></i>手机账号</span><span className="bar-right">12345678910</span>
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
  }
}

export default User;