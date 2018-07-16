import React, { Component } from 'react';
import './Wallet.css';
import { Button } from 'antd-mobile';
import Loading from '../components/Loading';
import Axios from 'axios';

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideLoading: false,
            money: 100
        }
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className="Wallet">
                <Loading hide={this.state.hideLoading}/>
                <div className="wallet-banner">
                    <span>￥{this.state.money}</span>
                </div>
                <Button className="wallet-button">充值</Button>
                <Button className="wallet-button">提现</Button>
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
                    money: res.data.money
                });
            } else {
                alert("加载失败");
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

export default Wallet;
