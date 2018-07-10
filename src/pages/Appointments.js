import React, { Component } from 'react';
import './Appointments.css';
import { Tabs, Badge, PullToRefresh } from 'antd-mobile';
import Appointment from '../components/Apponitment';
import Loading from '../components/Loading';

class Appointments extends Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);

        this.state = {
            refresh: false,
            hideLoading: false,
            appointments: [
                {
                    appointId: 123,
                    time: '2018-06-20',
                    state: 0,
                    imageUrl: 'image/course1.jpg',
                    userName: 'hyf',
                    phone: '12345678910'
                },
                {
                    appointId: 124,
                    time: '2018-06-20',
                    state: 1,
                    imageUrl: 'image/course2.jpg',
                    userName: 'hyf',
                    phone: '12345678910'
                },
                {
                    appointId: 125,
                    time: '2018-06-20',
                    state: 1,
                    imageUrl: 'image/course3.jpg',
                    userName: 'hyf',
                    phone: '12345678910'
                },
                {
                    appointId: 126,
                    time: '2018-06-20',
                    state: 0,
                    imageUrl: 'image/course4.jpg',
                    userName: 'hyf',
                    phone: '12345678910'
                },
            ]
        }
    };
    componentWillMount() {
      window.scrollTo(0, 0);
    };
    render() {
        const tabs = [
            { title: <Badge>全部预约</Badge> },
            { title: <Badge>待处理</Badge> },
            { title: <Badge>已处理</Badge> },
        ];
        let appointments = [];
        const allAppointments = this.state.appointments;
        let waitingAppointments = [];
        const wAppointments = this.state.appointments.filter(a => {
            return a.state === 0;
        });
        let finishedAppointments = [];
        const fAppointments = this.state.appointments.filter(a => {
            return a.state === 1;
        });

        for (let i = 0; i < allAppointments.length; i++) {
            appointments.push(
            <Appointment key={allAppointments[i].appointId} state={allAppointments[i].state}
                phone={allAppointments[i].phone} userName={allAppointments[i].userName}
                imageUrl={allAppointments[i].imageUrl} time={allAppointments[i].time}></Appointment>
            );
        }

        for (let i = 0; i < wAppointments.length; i++) {
            waitingAppointments.push(
            <Appointment key={wAppointments[i].appointId} state={wAppointments[i].state}
                phone={wAppointments[i].phone} userName={wAppointments[i].userName}
                imageUrl={wAppointments[i].imageUrl} time={wAppointments[i].time}></Appointment>
            );
        }

        for (let i = 0; i < fAppointments.length; i++) {
            finishedAppointments.push(
            <Appointment key={fAppointments[i].appointId} state={fAppointments[i].state}
                phone={fAppointments[i].phone} userName={fAppointments[i].userName}
                imageUrl={fAppointments[i].imageUrl} time={fAppointments[i].time}></Appointment>
            );
        }

        return (
            <div className="Appointments">
                <Loading hide={this.state.hideLoading}/>
                <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                tabBarActiveTextColor="#1cb6b3"
                >
                <PullToRefresh refreshing={this.state.refresh} onRefresh={this.refresh}>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        {appointments}
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        {waitingAppointments}
                    </div>
                    <div style={{ height: '100%', backgroundColor: '#fff' }}>
                        {finishedAppointments}
                    </div>
                </PullToRefresh>
                </Tabs>
            </div>
        );
    };
    componentDidMount() {
        setTimeout(() =>
            this.setState({hideLoading: true}),
            1000
        );
    };
    refresh() {
        this.setState({refresh: true});

        setTimeout(() => {
            this.setState({refresh: false});
        }, 1000);
    }
}

export default Appointments;
 