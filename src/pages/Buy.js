import React, { Component } from 'react';
import './Buy.css';
import {InputItem, Button, Modal} from 'antd-mobile';
import Loading from '../components/Loading';
import Axios from 'axios';

class Buy extends Component {
    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.buy = this.buy.bind(this);

        this.state = {
            hideLoading: false,
            lid: 1,
            price: 120,
            name: '',
            phone: '',
            courseName: 'Spring Cloud',
            imageUrl: 'image/course1.jpg'
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
                    <img src={this.state.imageUrl} alt="课程"/>
                    <div className="course-name">课程名称：{this.state.courseName}</div>
                </div>
                <div className="buy-body">
                    <InputItem className="input" onBlur={this.changeName} placeholder="姓名"><i className="icon user"></i></InputItem>
                    <InputItem className="input" onBlur={this.changePhone} type="phone" placeholder="联系电话"><i className="icon phone"></i></InputItem>
                    <Button className="form-button" onClick={this.buy}>支付￥{this.state.price}</Button>
                    <Button className="form-button"><i className="icon comment"></i>联系我们</Button>
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
        });

        let href = window.location.href;
        let search = href.match(/lid=[a-zA-Z\d-_]+/);
        let id = '';

        if (search) {
            id = search[0].split('=')[1];

            if (id) {
                Axios.post("/SSM/test/LessonHandler_findLessonById?lid=" + id)
                .then(res => {
                    if (res.data) {
                        this.setState({
                            "id": id,
                            hideLoading: true,
                            price: res.data.lprice,
                            courseName: res.data.lname,
                            imageUrl: res.data.imgurl
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
    changeName(e) {
        this.setState({
            name: e
        });
    };
    changePhone(e) {
         this.setState({
             phone: e.replace(/\s/g, '')
         })
    };
    buy() {
        Modal.alert("支付", "是否确认付款？", [
            { text: '稍后支付', onPress: () => {
                if (/^1\d{10}/.test(this.state.phone)) {
                    if (this.state.name) {
                        let param = new URLSearchParams();
                        param.append('lid', this.state.id);
                        param.append('total', 0);
                        param.append('nickname', this.state.name);
                        param.append('tel', this.state.phone);
                        param.append('status', '待付款');
                        Axios.post("/SSM/test/OrderHandler_saveOrder", param)
                        .then(res => {
                            if (res.data.result) {
                                alert("购买成功！");
                                window.location.hash = "orders";
                            } else {
                                alert("购买失败");
                            }
                        })
                        .catch(err => {
                            alert(err);
                        })
                    } else {
                        alert("用户名不可为空");
                    }
                } else {
                    alert("手机号格式错误");
                }
            }, style: 'default' },
            { text: '确认支付', onPress: () => {
                if (/^1\d{10}/.test(this.state.phone)) {
                    if (this.state.name) {
                        let param = new URLSearchParams();
                        param.append('lid', this.state.id);
                        param.append('total', this.state.price);
                        param.append('nickname', this.state.name)
                        param.append('tel', this.state.phone);
                        param.append('status', '已付款');
                        Axios.post("/SSM/test/OrderHandler_saveOrder", param)
                        .then(res => {
                            if (res.data.result) {
                                alert("购买成功！");
                                window.location.hash = "orders";
                            } else {
                                alert("购买失败");
                            }
                        })
                        .catch(err => {
                            alert(err);
                        })
                    } else {
                        alert("用户名不可为空");
                    }
                } else {
                    alert("手机号格式错误");
                }
                } 
            }]
        );
    }

}

export default Buy;
