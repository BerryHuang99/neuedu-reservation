import React, { Component } from 'react'
import './Teachers.css'

class Teachers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            banner: 'image/teachers.jpg',
            teachers: [
                {
                    name: '费圆圆',
                    avatar: 'image/fyy.jpg',
                    detail: '主要从事HTML5、Java开源领域及Android移动开发，在东软集团担任过6年的软件工程师，2年半的HTML5、JAVA培训讲师，承担过东北大学，北交大等重点高校培训项目。'
                },
                {
                    name: '费圆圆',
                    avatar: 'image/fyy.jpg',
                    detail: '主要从事HTML5、Java开源领域及Android移动开发，在东软集团担任过6年的软件工程师，2年半的HTML5、JAVA培训讲师，承担过东北大学，北交大等重点高校培训项目。'
                }
            ]
        }
    };
    render() {

        let teachers = [];
        for (let i = 0; i < this.state.teachers.length; i++) {
            teachers.push(
                <div className="teacher" key={i}>
                    <div className="teacher-left">
                        <img className="teacher-avatar" src={this.state.teachers[i].avatar} alt="teacher avatar"/>
                        <div className="teacher-name">
                            {this.state.teachers[i].name}
                        </div>
                    </div>
                    <div className="teacher-right">
                        <p>{this.state.teachers[i].detail}</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="Teachers">
                <img className="teachers-banner" src={this.state.banner} alt="名师阵容"/>

                <div className="show-teachers">
                    {teachers}
                </div>
            </div>
        );
    }
}

export default Teachers;
