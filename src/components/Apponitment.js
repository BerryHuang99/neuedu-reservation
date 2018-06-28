import React, { Component } from 'react'
import './Appointment.css'

class Appointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderStates: [
                '待处理',
                '已处理'
            ]
        }
    };
    render() {
        return (
            <div className="Appointment">
                <div className="order-header">
                    <span>{this.props.time}</span>
                    <span>{this.state.orderStates[this.props.state]}</span>
                </div>
                <div className="order-body">
                    <img className="order-img" src={this.props.imageUrl} alt="图片"/>
                    <div className="order-detail">
                        <div className="order-title">
                            {this.props.userName}
                        </div>
                        <div className="order-price">
                            {this.props.phone}
                        </div>
                    </div>
                </div>

                <div className="order-footer"></div>
            </div>
        );
    }
}

export default Appointment;