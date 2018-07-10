import React, { Component } from 'react';
import './Service.css';
import Loading from '../components/Loading';

class Service extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideLoading: false,
        }
    };
    componentWillMount() {
        window.scrollTo(0, 0);
      };
    render() {
        return (
            <div className="Service">
                <Loading hide={this.state.hideLoading}/>
                this is Service
            </div>
        );
    };
    componentDidMount() {
        setTimeout(() =>
            this.setState({hideLoading: true}),
            1000
        );
    }
}

export default Service;
