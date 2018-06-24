import React, { Component } from 'react';
import './Courses.css';
import { Dropdown } from 'semantic-ui-react';
import CoursesList from '../components/CourseList';

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesList: [
        {
         courseId: 1,
         imageUrl: "/image/banner1.jpg",
         courseTitle: "PHP免费试听",
         price: "12",
         courseCategory: "PHP",
        },
        {
         courseId: 2,
         imageUrl: "/image/banner2.jpg",
         courseTitle: "PHP免费试听",
         price: "12",
         courseCategory: "PHP",
        },
        {
          courseId: 3,
          imageUrl: "/image/banner1.jpg",
          courseTitle: "PHP免费试听",
          price: "12",
          courseCategory: "PHP",
         },
         {
          courseId: 4,
          imageUrl: "/image/banner2.jpg",
          courseTitle: "PHP免费试听",
          price: "12",
          courseCategory: "PHP",
         },
     ],
    }
  };
  render() {
    return (
      <div className="Courses">
        <img className="banner" src="/image/banner2.jpg" />

        <div className="courses-body">
          <div className="courses-title">精品推荐</div>
          <div className="menu">

            <Dropdown text='全部'>
              <Dropdown.Menu>
                <Dropdown.Item text='实训中心' />
                <Dropdown.Item text='艺术中心' />
                <Dropdown.Item text='恒大名都' />
              </Dropdown.Menu>
            </Dropdown>  

            <Dropdown text='分类'>
              <Dropdown.Menu>
                <Dropdown.Item text='JAVA' />
              </Dropdown.Menu>
            </Dropdown>  

            <Dropdown text='精品课程'>
              <Dropdown.Menu>
                <Dropdown.Item text='体验课程' />
              </Dropdown.Menu>
            </Dropdown>    
          </div>
          
          <div className="list">
            <CoursesList list={this.state.coursesList}></CoursesList>
          </div>

        </div>
      </div>
    );
  }
}

export default Courses;