import React, { Component } from 'react'
import './Enterprise.css'
import { Image } from 'semantic-ui-react'

class Enterprise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoUrl: 'image/guage.mp4',
            title: '机构介绍',
            content: '东软睿道教育信息技术有限公司（简称东软睿道）由东软创办，是东软基于20年来对IT产业实践的理解和对IT教育实践的洞察，整合国内外众多优秀合作伙伴的教育资源和产品，依托信息与通信技术，通过线上与线下服务模式的组合，基于互联网和云计算来实现交互式与实践式学习的教育与人才服务提供商。',
            showImages: [
                'image/show1.jpg', 'image/show2.jpg', 'image/show3.jpg', 'image/show4.jpg'
            ]
        }
    };
    render() {
        let images = [];
        if (this.state.showImages.length) {
            for (let i = 0; i < this.state.showImages.length; i++) {
                images.push(<Image className="show-image" size="medium" src={this.state.showImages[i]} key={i}/>)
            }
        }
        return (
            <div className="Enterprise">
                <video width="100%" controls="controls">
                    <source src={this.state.videoUrl} type="video/mp4"/>
                    不支持的视频
                </video>

                <div className="Enterprise-body">
                    <h4>
                        {this.state.title}
                    </h4>
                    <p>
                        {this.state.content}
                    </p>

                    <hr/>

                    <h4>精彩展示</h4>

                    {images}
                </div>
            </div>
        );
    }
}

export default Enterprise;
