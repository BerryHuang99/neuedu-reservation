import React, { Component } from 'react';
import './User.css';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'hyf'
    }
  };
  render() {
    return (
      <div className="User">
        <div className="user-banner">
          <img className="user-avatar" src='image/avatar.png'/>
          <div className="user-name">{this.state.userName}</div>
        </div>

        <div>
          <div className="user-bar" id="wallet">
            <span className="method"><i className="icon credit card alt"></i>钱包</span><span>></span>
          </div>

          <div className="user-bar">
            <span className="method"><i className="icon phone"></i>手机账号</span><span>12345678910</span>
          </div>

          <div className="user-bar">
            <span className="method"><i className="icon clock o "></i>我的预约</span><span>></span>
          </div>

          <div className="user-bar">
            <span className="method"><i className="icon file text "></i>我的订单</span><span>></span>
          </div>

          <div className="user-bar">
            <span className="method"><i className="icon commenting "></i>我的客服</span><span>></span>
          </div>
        </div>

      </div>
    );
  }
}

export default User;