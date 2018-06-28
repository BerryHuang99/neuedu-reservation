import React, { Component } from 'react';
import './Order.css';
import { Button } from 'antd-mobile';

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderStates: [
                '待付款',
                '已付款',
                '已使用',
                '已取消',
                '已退款'
            ],
            orderButton: [
                <div className="order-footer"><Button className="order-button" size="small">付款</Button><Button className="order-button" size="small">取消</Button></div>,
                <div className="order-footer"><Button className="order-button" size="small">退款</Button></div>,
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
    }
}

export default Order;