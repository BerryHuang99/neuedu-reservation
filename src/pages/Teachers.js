import React, { Component } from 'react';
import './Teachers.css';
import Loading from '../components/Loading';
import Axios from 'axios'

class Teachers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideLoading: false,
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
    componentWillMount() {
      window.scrollTo(0, 0);
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
                <Loading hide={this.state.hideLoading}/>
                <img className="teachers-banner" src={this.state.banner} alt="名师阵容"/>

                <div className="show-teachers">
                    {teachers}
                </div>
            </div>
        );
    };
    componentDidMount() {
        function getBanner() {
            return Axios.post("/SSM/test/TeacherHandler_findimgurl");
        }
        function getTeachers() {
            return Axios.post("/SSM/test/TeacherHandler_findAllTeacher");
        }

        Axios.all([getBanner(), getTeachers()])
        .then(Axios.spread((res1, res2) => {
            let banner = res1.data;
            let teachers = res2.data;

            if (banner && teachers && teachers.data) {
                this.setState({
                    "banner": banner,
                    "teachers": teachers.data.map(item => {
                        return {
                            name: item.tname,
                            avatar: item.tphoto_url,
                            detail: item.introduction
                        }
                    }),
                    hideLoading: true
                });
            } else {
                alert("加载失败");
            }
        }))
        .catch(err => {
            alert(err);
        })

        // setTimeout(() =>
        //     this.setState({hideLoading: true}),
        //     1000
        // );
    }
}

export default Teachers;
