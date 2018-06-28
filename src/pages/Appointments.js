import React, { Component } from 'react';
import './Appointments.css';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Appointment from '../components/Apponitment';

class Appointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                tabBarActiveTextColor="#1cb6b3"
                >
                <div style={{ height: '100%', backgroundColor: '#fff' }}>
                    {appointments}
                </div>
                <div style={{ height: '100%', backgroundColor: '#fff' }}>
                    {waitingAppointments}
                </div>
                <div style={{ height: '100%', backgroundColor: '#fff' }}>
                    {finishedAppointments}
                </div>
                </Tabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default Appointments;
