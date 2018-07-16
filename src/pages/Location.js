import React, { Component } from 'react';
import './Location.css';
import { Modal, List, Button, WhiteSpace, WingBlank, Picker } from 'antd-mobile';
import Loading from '../components/Loading';
import Axios from 'axios';


class Location extends Component {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeEnterprise = this.changeEnterprise.bind(this);
        this.renderMap = this.renderMap.bind(this);

        this.state = {
            hideLoading: false,
            showModal: false,
            current: 0,
            enterprises: [
                {"bid":1,
                "qid":1,
                "name":"实训中心",
                "address":"东软实训中心",
                "tel":"15940471397",
                "longitude":123.43949,
                "latitude":41.70588},
                {"bid":2,
                "qid":1,
                "name":"艺术中心",
                "address":"多才艺术中心",
                "tel":"15940471393",
                "longitude":123.40297,
                "latitude":41.73612}
                ]
        }
    };
    showModal() {
        this.setState({showModal: true});
    };
    closeModal() {
        this.setState({showModal: false});
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        return (
            <div className="Location">
                <Loading hide={this.state.hideLoading}/>
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
                    <List renderHeader={() => <div>{this.state.enterprises[this.state.current].name}</div>} className="popup-list">
                        <List.Item>
                            地址：{this.state.enterprises[this.state.current].address}
                        </List.Item>
                        <List.Item>
                           联系电话：{this.state.enterprises[this.state.current].tel}
                        </List.Item>
                        <Picker title="" cols={1} data={this.state.enterprises.map((item, index) => {
                            return {value: index, label: item.name}
                        })} value={[this.state.current]} onChange={this.changeEnterprise}>
                            <List.Item arrow="horizontal" className="other-enterprise">其他机构</List.Item>
                        </Picker>
                    </List>
                    </Modal>
                </WingBlank>
            </div>
        );
    };
    componentDidMount() {
        
        Axios.post("/SSM/test/BranchHandler_findAllBranch")
        .then(res => {
            if (res.data) {
                this.setState({
                    enterprises: res.data.data,
                    hideLoading: true
                }, this.renderMap);

            } else {
                alert("加载失败");
            }
        })
        .catch(err => {
            alert(err);
        })

        // setTimeout(() =>
        //     this.setState({hideLoading: true}),
        //     1000
        // );
    };
    changeEnterprise(val) {
        this.setState({
            current: (val)
        }, this.renderMap);
    };
    renderMap() {
        const BMap = window.BMap;
        const map = new BMap.Map("container");          // 创建地图实例  
        let point = new BMap.Point(this.state.enterprises[this.state.current].longitude, this.state.enterprises[this.state.current].latitude);  // 创建点坐标  
        map.centerAndZoom(point, 15); 
        let marker = new BMap.Marker(point);        // 创建标注

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let currentPoint = new BMap.Point(position.coords.longitude, position.coords.latitude);
                let currentMarker = new BMap.Marker(currentPoint);
                map.addOverlay(currentMarker);
                let myLabel = new BMap.Label("<div>我的位置</div>", {
                    offset: new BMap.Size(20, 25)
                });
                myLabel.setStyle({
                    color: '#555',
                    padding: "10px",
                    background: '#fff',
                    border: "1px solid #1cb6b3",
                    borderRadius: "5px",
                    overflow: "hidden",
                    lineHeight: "26px",
                    fontSize: "15px"
                });
                currentMarker.setLabel(myLabel);
            });
        }

        map.addOverlay(marker);
        let label = new BMap.Label("<div class='map-title'>" + this.state.enterprises[this.state.current].name + "</div><div>"+ this.state.enterprises[this.state.current].address +"</div>",  {
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
            fontSize: "15px"
        });
        marker.setLabel(label);
        map.enableScrollWheelZoom(true);
    };
}

export default Location;
