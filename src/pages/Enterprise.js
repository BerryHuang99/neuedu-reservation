import React, { Component } from 'react';
import './Enterprise.css';
import { Image } from 'semantic-ui-react';
import Loading from '../components/Loading';
import Axios from 'axios';

class Enterprise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideLoading: false,
            videoUrl: '',
            title: '机构介绍',
            content: '',
            // showImages: [
            //     'image/show1.jpg', 'image/show2.jpg', 'image/show3.jpg', 'image/show4.jpg'
            // ]
            show: ''
        }
    };
    componentWillMount() {
        window.scrollTo(0, 0);
    };
    render() {
        // let images = [];
        // if (this.state.showImages.length) {
        //     for (let i = 0; i < this.state.showImages.length; i++) {
        //         images.push(<Image className="show-image" size="medium" src={this.state.showImages[i]} key={i}/>)
        //     }
        // }
        let vedio = '';
        if (this.state.videoUrl) {
            vedio = <video width="100%" controls="controls"><source src={this.state.videoUrl} type="video/mp4"/>不支持的视频</video>
        }
        return (
            <div className="Enterprise">
                <Loading hide={this.state.hideLoading}/>

                {vedio}

                <div className="Enterprise-body">
                    <h4>
                        {this.state.title}
                    </h4>
                    <p>
                        {this.state.content}
                    </p>

                    <hr/>

                    <h4>精彩展示</h4>

                    <div className="show-enterprise" dangerouslySetInnerHTML={{__html: this.state.show}}>
                    </div>
                </div>
            </div>
        );
    };
    componentDidMount() {
        Axios.post("/SSM/test/EnterpriseHandler_findEnterpriseById")
        .then(res => {
            if (res.data) {
                let data = res.data;
                this.setState({
                    videoUrl: '/upload/' + data.videopath,
                    content: data.introduction,
                    show: data.uetext,
                    hideLoading: true
                });
            } else {
                alert("数据获取失败");
            }
        }).catch(err => {
            alert(err);
        });

        // setTimeout(() => {
        //     this.setState({
        //         videoUrl: 'image/guage.mp4',
        //         hideLoading: true
        //     });
        // }, 1000);
    }
}

export default Enterprise;
