import React, { Component } from 'react';
import './Login.css';
import { InputItem, Button } from 'antd-mobile';
import Loading from '../components/Loading';
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.sendCode = this.sendCode.bind(this);
        this.login = this.login.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changePassword = this.changePassword.bind(this);

        this.state = {
            hideLoading: true,
            codeButton: '发送验证码',
            codeButtonDisable: false,
            phone: '',
            password: ''
        }
    };
    sendCode() {
        if (/^1\d{10}/.test(this.state.phone)) {
            let i = 0;
            this.setState({codeButtonDisable: true});
            let param = new URLSearchParams();
            param.append('phone', this.state.phone);
            Axios.post("/SSM/test/CustomerHandler_getcode", param)
            .catch(err => {
                console.log(err);
            })
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
        } else {
            alert("手机号格式错误");
        }
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
                    <InputItem className="input" placeholder="手机号" onBlur={this.changePhone} type="phone"><i className="icon user"></i></InputItem>
                    
                    <InputItem className="input" maxLength={4} placeholder="验证码" onBlur={this.changePassword} type="number"><i className="icon lock"></i></InputItem>
                    <Button className="form-button" onClick={this.sendCode} disabled={this.state.codeButtonDisable}>{this.state.codeButton}</Button>
                    
                    <Button onClick={this.login} className="form-button">注册/登录</Button>
                </form>
            </div>
        );
    };
    login() {
        if (/^1\d{10}/.test(this.state.phone)) {
            if (this.state.password) {
                this.setState({hideLoading: false});
                let param = new URLSearchParams();
                param.append('phone', this.state.phone);
                param.append('password', this.state.password);
                Axios.post("/SSM/test/CustomerHandler_login", param)
                .then(res => {
                    if (res.data.result) {
                        window.history.back();
                    } else {
                        alert("登录失败！");
                        this.setState({hideLoading: true});
                    }
                })
                .catch(err => {
                    alert(err);
                    this.setState({hideLoading: true});
                    window.history.back();
                });
            } else {
                alert("请输入验证码");
            }
        } else {
            alert('手机号码格式错误');
        }
    };
    changePhone(e) {
        this.setState({
            phone: e.replace(/\s/g, '')
        });
    };
    changePassword(e) {
        this.setState({
            password: e
        });
    }
}

export default Login;
