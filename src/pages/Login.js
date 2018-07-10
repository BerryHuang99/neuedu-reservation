import React, { Component } from 'react';
import './Login.css';
import { InputItem, Button } from 'antd-mobile';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';

class Login extends Component {
    constructor(props) {
        super(props);
        this.sendCode = this.sendCode.bind(this);

        this.state = {
            hideLoading: false,
            codeButton: '发送验证码',
            codeButtonDisable: false 
        }
    };
    sendCode() {
        let i = 0;
        this.setState({codeButtonDisable: true})
        let timeClock = setInterval(() => {
            i++;
            this.setState({codeButton: (60 - i) + ' 秒后重新发送'})
            if (i === 60) {
                this.setState({
                    codeButton: '发送验证码',
                    codeButtonDisable: false
                });
                clearInterval(timeClock);
            }
        }, 1000)
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className="Login">
                <Loading hide={this.state.hideLoading}/>

                <div className="login-title">
                    <img className="login-avatar" src="image/avatar2.jpg" alt="头像"/>
                </div>

                <form>
                    <InputItem className="input" placeholder="手机号" type="phone"><i className="icon user"></i></InputItem>
                    
                    <InputItem className="input" maxLength={4} placeholder="验证码" type="number"><i className="icon lock"></i></InputItem>
                    <Button className="form-button" onClick={this.sendCode} disabled={this.state.codeButtonDisable}>{this.state.codeButton}</Button>
                    
                    {/* <NavLink to="/user"> */}
                        <Button className="form-button">注册/登录</Button>
                    {/* </NavLink> */}
                </form>
            </div>
        );
    };
    componentDidMount() {
        setTimeout(() =>
            this.setState({hideLoading: true}),
            1000
        );
    }
}

export default Login;
