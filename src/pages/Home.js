import React, { Component } from 'react';
import './Home.css';
import ReactSwipe from 'react-swipe';
import CoursesList from '../components/CourseList';
import { Input } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bannerUrl: ["image/banner1.jpg", "image/banner2.jpg"],
      coursesList1: [
         {
          courseId: 1,
          imageUrl: "image/course1.jpg",
          courseTitle: "Spring Cloud免费试听",
          price: "0",
          courseCategory: "Spring",
         },
         {
          courseId: 2,
          imageUrl: "image/course2.jpg",
          courseTitle: "Go免费试听",
          price: "0",
          courseCategory: "Go",
         } 
      ],
      coursesList2: [
        {
         courseId: 1,
         imageUrl: "image/course3.jpg",
         courseTitle: "JavaScript入门",
         price: "120",
         courseCategory: "JavaScript",
        },
        {
         courseId: 2,
         imageUrl: "image/course4.jpg",
         courseTitle: "mpVue专业培训",
         price: "120",
         courseCategory: "框架",
        } 
     ]
    }
  };
  render() {
    let banner = [];
    for (let i = 0; i < this.state.bannerUrl.length; i++) {
       banner.push(<div className="banner-wrap" key={i}><img className="banner-img" src={this.state.bannerUrl[i]} alt="banner"/></div>);
    }
    return (
      <div className="Home">
        <div className="head-bar">
          <NavLink to="/orders"><i className="icon cart"></i></NavLink>
          <div className="search">
            <Input size='mini' icon='search' placeholder='搜索课程' />   
          </div>
        </div>
        <ReactSwipe className="carousel" swipeOptions={{continuous: true, auto: 3000}}>
          {banner}
        </ReactSwipe>
        <div className="navigator">
          <NavLink to="/enterprise">
            <i className="building icon"></i>
            <div>企业简介</div>
          </NavLink>
          <NavLink to="/teachers">
            <i className="users icon"></i>
            <div>师资力量</div>
          </NavLink>
          <NavLink to="location">
            <i className="map pin icon"></i>
            <div>学校位置</div>
          </NavLink>
          <NavLink to="/service">
            <i className="comments icon"></i>
            <div>联系我们</div>
          </NavLink>
        </div>

        <div>
          <div className="title-bar">
            试听课
            <NavLink className="more" to="/courses">更多<i className="arrow right icon"></i></NavLink>
          </div>
          <div className="course-list">
            <CoursesList list={this.state.coursesList1}></CoursesList>
          </div>

          <div className="title-bar">
            超值精品课
            <NavLink className="more" to="/courses">更多<i className="arrow right icon"></i></NavLink>
          </div>
          <div className="course-list">
            <CoursesList list={this.state.coursesList2}></CoursesList>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;