import React, { Component } from 'react';
import './CourseDetail.css';
import { List } from 'antd-mobile';
import {NavLink} from 'react-router-dom';
import Loading from '../components/Loading';
import Axios from 'axios';

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.renderMap = this.renderMap.bind(this);

        this.state = {
            hideLoading: false,
            id: '',
            phone: '',
            address: '',
            name: '',
            price: 0,
            type: 0,
            longitude: 0,
            latitude: 0,
            enterpriseName: '',
            content: ''
        }
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        let map = "";
        let option = '';
        let enterprise = '';
        if (this.state.longitude) {
            map = <div id="map"></div>;
        }

        if (this.state.type === 1) {
            option = <NavLink to={"/appoint?fid=" + this.state.id}>
                        <i className="icon bookmark"></i>
                        <div>预约</div>
                    </NavLink>;
        } else if (this.state.type === 2) {
            option = <NavLink to={"/buy?lid=" + this.state.id}>
                        <i className="icon cart"></i>
                        <div>购买</div>
                    </NavLink>;
        }

        if (this.state.enterpriseName) {
            enterprise = <List>
                            <List.Item extra={this.state.address}>
                                门店地址
                            </List.Item>
                            <List.Item extra={this.state.phone}>
                                联系电话
                            </List.Item>
                        </List>;
        }

        return (
            <div className="CourseDetail">
                <Loading hide={this.state.hideLoading}/>

                <div className="page-title">课程详情</div>
                {enterprise}
                
                {map}
                <List>
                    <List.Item extra={this.state.name}>
                        课程名
                    </List.Item>
                    <List.Item extra={this.state.price}>
                        价格
                    </List.Item>
                </List>

                <div dangerouslySetInnerHTML={{__html: this.state.content}} className="course-content">
                    
                </div>

                <div className="footer-back">
                </div>
                <footer className="footer" id="course-footer">
                    <div className="course-option">
                        <i className="icon comments"></i>
                        <div>联系我们</div>
                    </div>

                    
                    <div className="course-option">
                    {option}
                    </div>
                </footer>

            </div>
        );
    };
    componentDidMount() {
        let id = ''
        let type = ''

        function getCourse(type, id) {
            if (type == 'fid') {
                return Axios.post("/SSM/test/FreelistenHandler_findFreelistenById?fid=" + id);
            } else {
                return Axios.post("/SSM/test/LessonHandler_findLessonById?lid=" + id);
            }
        }

        let href = window.location.hash;
        let search = href.match(/\?[a-zA-Z\d&=-_]+/);
        
        if (search) {
            let s = search[0].match(/[a-zA-Z\d-_]+\=[a-zA-Z\d-_]+/);

            if (s) {
                for (let item of s) {
                    const i = item.split("=");
                    if (i[0] == 'fid') {
                        id = i[1];
                        type = 'fid'
                        break;
                    } else if (i[0] == 'lid') {
                        id = i[1];
                        type = 'lid';
                        break;
                    }
                }
            }
        }

        if (id && type) {
            getCourse(type, id)
            .then(res => {
                if (res.data) {
                    if (type == 'fid') {

                        this.setState({
                            "id": id,
                            name: res.data.title,
                            price: 0,
                            type: 1,
                            content: res.data.fdesc,
                        })

                        Axios.post("/SSM/test/BranchHandler_findBranchById?bid=" + res.data.bid)
                        .then(bres => {
                            if (bres.data) {
                                this.setState({
                                    hideLoading: true,
                                    phone: bres.data.tel,
                                    address: bres.data.address,
                                    longitude: bres.data.longitude,
                                    latitude: bres.data.latitude,
                                    enterpriseName: bres.data.name
                                });
                                this.renderMap();
                            } else {
                                alert("加载失败！");
                            }
                        })
                        .catch(err => {
                            alert(err);
                        });

                    } else {
                        this.setState({
                            hideLoading: true,
                            "id": id,
                            name: res.data.lname,
                            price: res.data.lprice,
                            type: 2,
                            content: res.data.ldesc
                        });
                    }
                } else {
                    alert("加载失败");
                }
            })
            .catch(err => {
                alert(err);
            })
        } else {
            alert("加载失败");
        }


        // setTimeout(() =>
        //     this.setState({hideLoading: true}),
        //     1000
        // );
    };
    renderMap() {
        const BMap = window.BMap;
        const map = new BMap.Map("map");          // 创建地图实例  
        let point = new BMap.Point(this.state.longitude, this.state.latitude);  // 创建点坐标  
        map.centerAndZoom(point, 15); 
        let marker = new BMap.Marker(point);        // 创建标注    
        map.addOverlay(marker,);
        let label = new BMap.Label("<div class='map-title'>"+ this.state.enterpriseName + "</div><div>地址:" + this.state.address +"</div>",  {
            offset: new BMap.Size(25, 15)
        });
        label.setStyle({
            color: '#555',
            padding: "10px",
            background: '#fff',
            border: "1px solid #1cb6b3",
            borderRadius: "5px",
            overflow: "hidden",
            lineHeight: "26px",
            fontSize: "15px",
            });
        marker.setLabel(label);
        map.enableScrollWheelZoom(true);
    }
}

export default CourseDetail;
