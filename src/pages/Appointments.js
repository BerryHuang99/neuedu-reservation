import React, { Component } from 'react';
import './Appointments.css';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

class Appointments extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    };
    render() {
        const tabs = [
            { title: <Badge>全部预约</Badge> },
            { title: <Badge>待处理</Badge> },
            { title: <Badge>已处理</Badge> },
          ];
        return (
            <div className="Appointments">
                <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                tabBarActiveTextColor="#1cb6b3"
                >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    Content of first tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    Content of second tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    Content of third tab
                </div>
                </Tabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default Appointments;
