import React, { Component } from 'react';
import './Wallet.css';
import { Button } from 'antd-mobile';
import Loading from '../components/Loading';

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideLoading: false,
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
                    <span>￥100</span>
                </div>
                <Button className="wallet-button">充值</Button>
                <Button className="wallet-button">提现</Button>
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

export default Wallet;
