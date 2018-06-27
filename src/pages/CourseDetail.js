import React, { Component } from 'react';
import './CourseDetail.css';
import { List } from 'antd-mobile';
import {NavLink} from 'react-router-dom';

class CourseDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: 12345678910,
            address: '这里是地址1234564487',
            name: 'Php',
            price: 120,
            content: '这里是富文本'
        }
    };
    render() {
        return (
            <div className="CourseDetail">
                <div className="page-title">课程详情</div>

                <List>
                    <List.Item extra={this.state.address}>
                        门店地址
                    </List.Item>
                    <List.Item extra={this.state.phone}>
                        联系电话
                    </List.Item>
                </List>
                <div id="map"></div>
                <List>
                    <List.Item extra={this.state.name}>
                        课程名
                    </List.Item>
                    <List.Item extra={this.state.price}>
                        价格
                    </List.Item>
                </List>

                <div className="course-content">
                    {this.state.content}
                </div>

                <div className="footer-back">
                </div>
                <footer className="footer" id="course-footer">
                    <div className="course-option">
                        <i className="icon comments"></i>
                        <div>联系我们</div>
                    </div>

                    
                    <div className="course-option">
                    <NavLink to="/buy">
                        <i className="icon cart"></i>
                        <div>购买</div>
                    </NavLink>
                    </div>
                </footer>

            </div>
        );
    };
    componentDidMount() {
        const BMap = window.BMap;
        const map = new BMap.Map("map");          // 创建地图实例  
        let point = new BMap.Point(123.445967,41.711486);  // 创建点坐标  
        map.centerAndZoom(point, 15); 
        let marker = new BMap.Marker(point);        // 创建标注    
        map.addOverlay(marker,);
        let label = new BMap.Label("<div class='map-title'>沈阳东软睿道</div><div>地址:世纪路51附近</div>",  {
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
    };
}

export default CourseDetail;
