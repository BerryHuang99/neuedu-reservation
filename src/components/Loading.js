import React, { Component } from 'react';
import './Loading.css';
import { Icon } from 'antd-mobile';

class Loading extends Component {
    render() {
        return (
            <div className={"Loading " + (this.props.hide ? "loading-hide" : "")}>
                <Icon type="loading" size="lg" />
            </div>
        );
    }
}

export default Loading;