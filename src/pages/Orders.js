import React, { Component } from 'react';
import './Orders.css';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    };
    render() {
        const tabs = [
            { title: <Badge>全部订单</Badge> },
            { title: <Badge>待付款</Badge> },
            { title: <Badge>已付款</Badge> },
            { title: <Badge>已使用</Badge> },
            { title: <Badge>取消/退款</Badge> },
          ];
        return (
            <div className="Orders">
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    Content of forth tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    Content of fifth tab
                </div>
                </Tabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default Orders;
