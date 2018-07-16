import React, { Component } from 'react';
import './Orders.css';
import { Tabs, PullToRefresh, Badge } from 'antd-mobile';
import Order from '../components/Order';
import Loading from '../components/Loading';
import Axios from 'axios';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.changeState = this.changeState.bind(this);

        this.state = {
            refresh: false,
            hideLoading: false,
            orders: [
                {
                    orderId: 9,
                    state: 0,
                    imageUrl: 'image/course1.jpg',
                    courseTitle: '体验课：Spring Cloud',
                    coursePrice: 0,
                },
                {
                    orderId: 8,
                    state: 1,
                    imageUrl: 'image/course2.jpg',
                    courseTitle: '体验课：Go',
                    coursePrice: 0,
                },
                {
                    orderId: 7,
                    state: 2,
                    imageUrl: 'image/course3.jpg',
                    courseTitle: '精品课：JS',
                    coursePrice: 120,
                },
                {
                    orderId: 6,
                    state: 3,
                    imageUrl: 'image/course4.jpg',
                    courseTitle: '精品课：mpVue',
                    coursePrice: 120,
                },
                {
                    orderId: 5,
                    state: 4,
                    imageUrl: 'image/course1.jpg',
                    courseTitle: '体验课：Spring Cloud',
                    coursePrice: 0,
                },
                {
                    orderId: 4,
                    state: 5,
                    imageUrl: 'image/course1.jpg',
                    courseTitle: '体验课：Spring Cloud',
                    coursePrice: 0,
                }
            ]
        }
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        const tabs = [
            { title: <Badge>全部订单</Badge> },
            { title: <Badge>待付款</Badge> },
            { title: <Badge>已付款</Badge> },
            { title: <Badge>已使用</Badge> },
            { title: <Badge>取消/退款</Badge> },
        ];
        let orders =[];
        let waitingOrders = [];
        const wOrders = this.state.orders.filter(a => {
            return a.state === 0;
        });
        let paidOrders = [];
        const pOrders = this.state.orders.filter(a => {
            return a.state === 1;
        });
        let usedOrders = [];
        const uOrders = this.state.orders.filter(a => {
            return a.state === 2;
        });
        let canceledOrders = [];
        const cOrders = this.state.orders.filter(a => {
            return a.state === 3 || a.state === 4 || a.state === 5;
        });

        for (let i = 0; i < this.state.orders.length; i++) {
            orders.push(<Order key={this.state.orders[i].orderId} id={this.state.orders[i].orderId} 
                state={this.state.orders[i].state} title={this.state.orders[i].courseTitle}
                imageUrl={this.state.orders[i].imageUrl} price={this.state.orders[i].coursePrice}
                changeState={this.changeState}></Order>)
        }
        for (let i = 0; i < wOrders.length; i++) {
            waitingOrders.push(<Order key={wOrders[i].orderId} id={wOrders[i].orderId} 
                state={wOrders[i].state} title={wOrders[i].courseTitle}
                imageUrl={wOrders[i].imageUrl} price={wOrders[i].coursePrice}
                changeState={this.changeState}></Order>)
        }
        for (let i = 0; i < pOrders.length; i++) {
            paidOrders.push(<Order key={pOrders[i].orderId} id={pOrders[i].orderId} 
                state={pOrders[i].state} title={pOrders[i].courseTitle}
                imageUrl={pOrders[i].imageUrl} price={pOrders[i].coursePrice}
                changeState={this.changeState}></Order>)
        }
        for (let i = 0; i < uOrders.length; i++) {
            usedOrders.push(<Order key={uOrders[i].orderId} id={uOrders[i].orderId} 
                state={uOrders[i].state} title={uOrders[i].courseTitle}
                imageUrl={uOrders[i].imageUrl} price={uOrders[i].coursePrice}
                changeState={this.changeState}></Order>)
        }
        for (let i = 0; i < cOrders.length; i++) {
            canceledOrders.push(<Order key={cOrders[i].orderId} id={cOrders[i].orderId} 
                state={cOrders[i].state} title={cOrders[i].courseTitle}
                imageUrl={cOrders[i].imageUrl} price={cOrders[i].coursePrice}
                changeState={this.changeState}></Order>)
        }
        return (
            <div className="Orders">
                <Loading hide={this.state.hideLoading}/>
                <Tabs tabs={tabs}
                initialPage={0}
                tabBarActiveTextColor="#1cb6b3"
                >
                
                <div style={{height: '100%', backgroundColor: '#fff' }}>
                <PullToRefresh refreshing={this.state.refresh} onRefresh={this.refresh}>
                    {orders}
                </PullToRefresh>
                </div>
                <div style={{height: '100%', backgroundColor: '#fff' }}>
                <PullToRefresh refreshing={this.state.refresh} onRefresh={this.refresh}>
                    {waitingOrders}
                </PullToRefresh>
                </div>
                <div style={{height: '100%', backgroundColor: '#fff' }}>
                <PullToRefresh refreshing={this.state.refresh} onRefresh={this.refresh}>
                    {paidOrders}
                </PullToRefresh>
                </div>
                <div style={{height: '100%', backgroundColor: '#fff' }}>
                <PullToRefresh refreshing={this.state.refresh} onRefresh={this.refresh}>
                    {usedOrders}
                </PullToRefresh>
                </div>
                <div style={{height: '100%', backgroundColor: '#fff' }}>
                <PullToRefresh refreshing={this.state.refresh} onRefresh={this.refresh}>
                    {canceledOrders}
                </PullToRefresh>
                </div>
                
                </Tabs>
            </div>
        );
    };
    componentDidMount() {
        Axios.post("/SSM/test/CustomerHandler_islogin")
        .then(res => {
        if (res.data.result) {
            this.setState({hideLoading: true});
        } else {
            window.location.hash = 'login';
        }
        })
        .catch(err => {
        alert(err);
        // window.location.assign("../#login");
        });

        let state = {
            "待付款": 0,
            "已付款": 1,
            "已使用": 2,
            "已取消": 3,
            "退款中": 4,
            "已退款": 5
        };

        Axios.post("/SSM/test/OrderHandler_findOrderByPhone")
        .then(res => {
            if (res.data) {
                this.setState({
                    hideLoading: true,
                    orders: res.data.map(item => {
                        return {
                            orderId: item.oid,
                            state: state[item.status],
                            imageUrl: item.lesson.imgurl,
                            courseTitle: item.lesson.lname,
                            coursePrice: item.lesson.lprice,
                        }
                    })
                })
            }
        })
        .catch(err => {
            alert(err);
        });

        // setTimeout(() =>
        //     this.setState({hideLoading: true}),
        //     1000
        // );
    };
    refresh() {
        this.setState({refresh: true});

        let state = {
            "待付款": 0,
            "已付款": 1,
            "已使用": 2,
            "已取消": 3,
            "退款中": 4,
            "已退款": 5
        };

        Axios.post("/SSM/test/OrderHandler_findOrderByPhone")
        .then(res => {
            if (res.data) {
                this.setState({
                    hideLoading: true,
                    orders: res.data.map(item => {
                        return {
                            orderId: item.oid,
                            state: state[item.status],
                            imageUrl: item.lesson.imgurl,
                            courseTitle: item.lesson.lname,
                            coursePrice: item.lesson.lprice,
                        }
                    })
                })
            }
        })
        .catch(err => {
            alert(err);
        });

        setTimeout(() => {
            this.setState({refresh: false});
        }, 1000);
    };
    changeState(state, id) {
        let orders = this.state.orders;
        // console.log(state + " " +id);
        orders.forEach(item => {
            if (item.orderId == id) {
                item.state = state;
            }
        });
        this.setState({
            orders: orders
        })
    }
}

export default Orders;
