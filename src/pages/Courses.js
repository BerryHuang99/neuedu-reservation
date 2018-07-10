import React, { Component } from 'react';
import './Courses.css';
// import { Dropdown } from 'semantic-ui-react';
import CoursesList from '../components/CourseList';
import { Picker, PullToRefresh } from 'antd-mobile';
import Loading from '../components/Loading';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);

    this.state = {
      hideLoading: false,
      refresh: false,
      location: [
        {value: 1, label: '全部机构'},
        {value: 2, label: '实训中心'},
        {value: 3, label: "艺术中心"},
        {value: 4, label: "恒大名都"}
      ],
      categories: [
        {value: 1, label: '全部分类'},
        {value: 2, label: 'Java'},
        {value: 3, label: 'PHP'},
        {value:4, label: '小程序'}
      ],
      type: [
        {value: 1, label: '精品课程'},
        {value: 2, label: '体验课程'}
      ],
      coursesList: [
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
         },
        {
          courseId: 3,
          imageUrl: "image/course3.jpg",
          courseTitle: "JavaScript入门",
          price: "120",
          courseCategory: "JavaScript",
        },
        {
          courseId: 4,
          imageUrl: "image/course4.jpg",
          courseTitle: "mpVue专业培训",
          price: "120",
          courseCategory: "框架",
        }
     ],
    }
  };
  componentWillMount() {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <div className="Courses">
        <Loading hide={this.state.hideLoading}/>

        <div className="courses-body">
          <div className="menu">

            <Picker title="" cols={1} data={this.state.location} value={[1]}>
              <div>全部机构</div>
            </Picker>

            <Picker title="" cols={1} data={this.state.categories} value={[1]}>
              <div>全部分类</div>
            </Picker>

            <Picker title="" cols={1} data={this.state.type} value={[1]}>
              <div>精品课程</div>
            </Picker>

          </div>

          <PullToRefresh direction="up" refreshing={this.state.refresh} onRefresh={this.refresh}>          
          <div className="list">
            <CoursesList list={this.state.coursesList}></CoursesList>
          </div>
          </PullToRefresh>
          
        </div>
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
    console.log("refresh");
    setTimeout(() => {
      this.setState({refresh: false})
    }, 2000)
  }
}

export default Courses;