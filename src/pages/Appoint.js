import React, { Component } from 'react'
import './Appoint.css'
import {InputItem, Button, TextareaItem} from 'antd-mobile';

class Appoint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: 120,
            courseName: 'Spring Cloud'
        }
    };
    render() {
        return (
            <div className="Appoint">
                <div className="page-title">
                    预约课程
                </div>
                <div className="buy-image">
                    <img src="image/course1.jpg" alt="课程"/>
                    <div className="course-name">课程名称：{this.state.courseName}</div>
                </div>
                <div className="buy-body">
                    <InputItem className="input" placeholder="姓名"><i className="icon user"></i></InputItem>
                    <InputItem className="input" type="phone" placeholder="联系电话"><i className="icon phone"></i></InputItem>
                    <TextareaItem className="textarea" placeholder="留言" rows={5}></TextareaItem>
                    <Button className="form-button">预约</Button>
                </div>
            </div>
        );
    }
}

export default Appoint;
