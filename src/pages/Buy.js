import React, { Component } from 'react';
import './Buy.css';
import {InputItem, Button} from 'antd-mobile';
import Loading from '../components/Loading';

class Buy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideLoading: false,
            price: 120,
            courseName: 'Spring Cloud',
        }
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className="Buy">
                <Loading hide={this.state.hideLoading}/>
                <div className="page-title">
                    购买课程
                </div>
                <div className="buy-image">
                    <img src="image/course1.jpg" alt="课程"/>
                    <div className="course-name">课程名称：{this.state.courseName}</div>
                </div>
                <div className="buy-body">
                    <InputItem className="input" placeholder="姓名"><i className="icon user"></i></InputItem>
                    <InputItem className="input" type="phone" placeholder="联系电话"><i className="icon phone"></i></InputItem>
                    <Button className="form-button">支付￥{this.state.price}</Button>
                    <Button className="form-button"><i className="icon comment"></i>联系我们</Button>
                </div>
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

export default Buy;
