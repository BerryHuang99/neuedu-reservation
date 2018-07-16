import React, { Component } from 'react'
import './Appoint.css'
import {InputItem, Button, TextareaItem} from 'antd-mobile';
import Loading from '../components/Loading';
import Axios from 'axios';

class Appoint extends Component {
    constructor(props) {
        super(props);
        this.appoint = this.appoint.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.changeName = this.changeName.bind(this);

        this.state = {
            hideLoading: false,
            id: '',
            price: 120,
            courseName: 'Spring Cloud',
            imgUrl: "image/course1.jpg",
            phone: '',
            userName: '',
            message: ''
        }
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className="Appoint">
                <Loading hide={this.state.hideLoading}/>

                <div className="page-title">
                    预约课程
                </div>
                <div className="buy-image">
                    <img src={this.state.imgUrl} alt="课程"/>
                    <div className="course-name">课程名称：{this.state.courseName}</div>
                </div>
                <div className="buy-body">
                    <InputItem className="input" onBlur={this.changeName} placeholder="姓名"><i className="icon user"></i></InputItem>
                    <InputItem className="input" type="phone" placeholder="联系电话" onBlur={this.changePhone}><i className="icon phone"></i></InputItem>
                    <TextareaItem className="textarea" placeholder="留言" onBlur={this.changeMessage} rows={5} maxLength={120}></TextareaItem>
                    <Button className="form-button" onClick={this.appoint}>预约</Button>
                </div>
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
        })

        let href = window.location.href;
        let search = href.match(/fid=[a-zA-Z\d-_]+/);
        let id = '';

        if (search) {
            id = search[0].split('=')[1];

            if (id) {
                Axios.post("/SSM/test/FreelistenHandler_findFreelistenById?fid=" + id)
                .then(res => {
                    if (res.data) {
                        this.setState({
                            "id": id,
                            hideLoading: true,
                            price: 0,
                            courseName: res.data.title,
                            imgUrl: res.data.imgurl
                        });
                    } else {
                        alert("加载失败");
                    }
                })
                .catch(err => {
                    alert(err);
                })
            }
        } else {
            alert("加载失败");
        }

        // setTimeout(() =>
        //     this.setState({hideLoading: true}),
        //     1000
        // );
    };
    appoint() {

        if (this.state.userName) {
            if (this.state.phone.length === 11) {
                this.setState({
                    hideLoading: false,
                });
                
                let param = new URLSearchParams();
                param.append('fid', this.state.id);
                param.append('cname', this.state.userName);
                param.append('tel', this.state.phone);
                param.append('comment', this.state.message);

                Axios.post('/SSM/test/FreelistenbookHandler_saveFreelistenbook', param)
                .then(res => {
                    if (res.data) {

                        if (res.data.result) {
                            alert("预约成功");
                            window.location.hash = '/appointments';
                        } else {
                            alert("预约失败");
                            this.setState({
                                hideLoading: true
                            });
                        }

                    } else {
                        alert("操作失败");
                        this.setState({
                            hideLoading: true,
                        });
                    }
                })
                .catch(err => {
                    alert(err);
                })

            } else {
                alert("请填写11位手机号");
            }
        } else {
            alert('请填写客户名')
        }

    };
    changePhone(e) {
        this.setState({
            phone: e.replace(/\s/g, '')
        });
    };
    changeMessage(e) {
        this.setState({
            message: e
        });
    };
    changeName(e) {
        this.setState({
            userName: e
        });
    }
}

export default Appoint;
