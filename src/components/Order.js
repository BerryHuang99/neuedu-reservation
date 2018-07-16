import React, { Component } from 'react';
import './Order.css';
import { Button, Modal } from 'antd-mobile';
import Axios from 'axios';

class Order extends Component {
    constructor(props) {
        super(props);
        this.pay = this.pay.bind(this);
        this.refund = this.refund.bind(this);
        this.cancel = this.cancel.bind(this);

        this.state = {
            orderStates: [
                '待付款',
                '已付款',
                '已使用',
                '已取消',
                '退款中',
                '已退款'
            ],
            orderButton: [
                <div className="order-footer"><Button className="order-button" size="small" onClick={this.pay}>付款</Button><Button className="order-button" onClick={this.cancel} size="small">取消</Button></div>,
                <div className="order-footer"><Button className="order-button" size="small" onClick={this.refund}>退款</Button></div>,
                <div className="order-footer"></div>,
                <div className="order-footer"></div>,
                <div className="order-footer"></div>,
                <div className="order-footer"></div>
            ]
        }
    };
    render() {
        return (
            <div className="Order">
                <div className="order-header">
                    <span>订单编号：{this.props.id}</span>
                    <span>{this.state.orderStates[this.props.state]}</span>
                </div>
                <div className="order-body">
                    <img className="order-img" src={this.props.imageUrl} alt="图片"/>
                    <div className="order-detail">
                        <div className="order-title">
                            {this.props.title}
                        </div>
                        <div className="order-price">
                            ￥{this.props.price}
                        </div>
                    </div>
                </div>

                {this.state.orderButton[this.props.state]}

            </div>
        );
    };
    pay() {
        Modal.alert('支付', '是否确认付款？？', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                let param = new URLSearchParams();
                param.append('oid', this.props.id);
                param.append('status', '已付款');
                param.append('total', this.props.price);
                Axios.post("/SSM/test/OrderHandler_updateOrder", param)
                .then(() => {
                    this.props.changeState(1, this.props.id);
                })
                .catch(err => {
                    alert("支付失败");
                })
            }}]);
    };
    refund() {
        Modal.alert('退款', '是否确认退款？？', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                let param = new URLSearchParams();
                param.append('oid', this.props.id);
                param.append('status', '退款中');
                param.append('total', this.props.price);
                Axios.post("/SSM/test/OrderHandler_updateOrder", param)
                .then(() => {
                    this.props.changeState(4, this.props.id);
                })
                .catch(err => {
                    alert("退款失败");
                })
            }}]);
    };
    cancel() {
        Modal.alert('取消', '是否确认取消订单？？', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                let param = new URLSearchParams();
                param.append('oid', this.props.id);
                param.append('status', '已取消');
                param.append('total', 0);
                Axios.post("/SSM/test/OrderHandler_updateOrder", param)
                .then(() => {
                    this.props.changeState(3, this.props.id);
                })
                .catch(err => {
                    alert("取消失败");
                })
            }}]);
    };
}

export default Order;