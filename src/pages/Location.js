import React, { Component } from 'react';
import './Location.css';
import { Modal, List, Button, WhiteSpace, WingBlank, Picker } from 'antd-mobile';


class Location extends Component {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            showModal: false,
            enterprises: [
                {value: 1, label: '实训中心'},
                {value: 2, label: '艺术中心'},
                {value: 3, label: '恒大名都'}
            ]
        }
    };
    showModal() {
        this.setState({showModal: true});
    };
    closeModal() {
        this.setState({showModal: false});
    }
    render() {
        return (
            <div className="Location">
                <div id="container"></div>

                <Button id="location-button" onClick={this.showModal}>详情</Button>
                <WingBlank>
                    <WhiteSpace />
                    <Modal
                    popup
                    visible={this.state.showModal}
                    onClose={this.closeModal}
                    animationType="slide-up"
                    >
                    <List renderHeader={() => <div>沈阳东软睿道培训中心</div>} className="popup-list">
                        <List.Item>
                            地址：辽宁省 沈阳市 浑南区 世纪路51号附近。
                        </List.Item>
                        <List.Item>
                           联系电话：12345678910
                        </List.Item>
                        <Picker title="" cols={1} data={this.state.enterprises} value={[1]}>
                            <List.Item arrow="horizontal" className="other-enterprise">其他机构</List.Item>
                        </Picker>
                    </List>
                    </Modal>
                </WingBlank>
            </div>
        );
    };
    componentDidMount() {
        const BMap = window.BMap;
        const map = new BMap.Map("container");          // 创建地图实例  
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

export default Location;
