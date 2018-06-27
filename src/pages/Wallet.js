import React, { Component } from 'react';
import './Wallet.css';
import { Button } from 'antd-mobile';

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    };
    render() {
        return (
            <div className="Wallet">
                <div className="wallet-banner">
                    <span>￥100</span>
                </div>
                <Button className="wallet-button">充值</Button>
                <Button className="wallet-button">提现</Button>
            </div>
        );
    }
}

export default Wallet;
