import React, { Component } from 'react';
import './Courses.css';
// import { Dropdown } from 'semantic-ui-react';
import CoursesList from '../components/CourseList';
import { Picker, PullToRefresh } from 'antd-mobile';
import Loading from '../components/Loading';
import Axios from 'axios'

class Courses extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeType = this.changeType.bind(this);

    this.state = {
      hideLoading: false,
      refresh: false,
      page: 1,
      currentLoacation: 0,
      currentCategory: 0,
      currentType: 0,
      location: [
        {value: 0, label: '全部机构', bid: 1},
        {value: 1, label: '实训中心', bid: 2},
        {value: 2, label: "艺术中心", bid: 3},
        {value: 3, label: "恒大名都", bid: 4}
      ],
      categories: [
        {value: 0, label: '全部分类'},
        {value: 1, label: 'Java'},
        {value: 2, label: 'PHP'},
        {value: 3, label: '小程序'}
      ],
      type: [
        {value: 0, label: '全部课程'},
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

            <Picker title="" cols={1} data={this.state.location} value={[0]} onChange={this.changeLocation}>
              <div>{this.state.location[this.state.currentLoacation].label}</div>
            </Picker>

            <Picker title="" cols={1} data={this.state.categories} value={[0]} onChange={this.changeCategory}>
              <div>{this.state.categories[this.state.currentCategory].label}</div>
            </Picker>

            <Picker title="" cols={1} data={this.state.type} value={[0]} onChange={this.changeType}>
              <div>{this.state.type[this.state.currentType].label}</div>
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

    Axios.post("/SSM/test/CustomerHandler_islogin")
    .then(res => {
    if (res.data.result) {
        // this.setState({hideLoading: true});
    } else {
        window.location.hash = 'login';
    }
    })
    .catch(err => {
    alert(err);
    // window.location.assign("../#login");
    });

    function getLocations() {
      return Axios.post("/SSM/test/BranchHandler_findAllBranch");
    }
    function getCategories() {
      return Axios.post("/SSM/test/LessonHandler_selectCategory");
    }
    function getCourses1() {
      return Axios.post("/SSM/test/FreelistenHandler_findAllFreelisten?page=1&limit=3");
    }
    function getCourses2() {
      return Axios.post("/SSM/test/LessonHandler_findAllLessonByPage?page=1&limit=3");
    }

    Axios.all([getLocations(), getCategories(), getCourses1(), getCourses2()])
    .then(Axios.spread((res1, res2, c1, c2) => {
      if (res1.data && res2.data && c1.data && c2.data) {
        this.setState({
          hideLoading: true,
          location: [{value: 0, label: "全部机构"}].concat(res1.data.data.map((item, index) => {
            return {value: index + 1, label: item.name, bid: item.bid};
          })),
          categories: [{value: 0, label: "全部分类"}].concat(res2.data.map((item, index) => {
            return {value: index + 1, label: item};
          })),
          coursesList: c1.data.data.map(item => {
            return {
              courseId: item.fid,
              imageUrl: item.imgurl,
              courseTitle: item.title,
              price: "0",
              courseCategory: "体验课",
            }
          }).concat(c2.data.data.map(item => {
            return {
              courseId: item.lid,
              imageUrl: item.imgurl,
              courseTitle: item.lname,
              price: item.lprice,
              courseCategory: item.category,
            }
          }))
        });
      } else {
        alert("加载失败");
      }
    }))
    .catch(err => {
      alert(err);
    });


      setTimeout(() =>
          this.setState({hideLoading: true}),
          1000
      );
  };
  refresh() {
    this.setState({refresh: true});
    var page = this.state.page;

    function getCourses1() {
      return Axios.post("/SSM/test/FreelistenHandler_findAllFreelisten?page="+ (page + 1) +"&limit=3");
    }
    function getCourses2() {
      return Axios.post("/SSM/test/LessonHandler_findAllLessonByPage?page="+ (page + 1) +"&limit=3");
    }

    
    Axios.all([getCourses1(), getCourses2()])
    .then(Axios.spread((c1, c2) => {
      if (c1.data && c2.data) {

        this.setState({
          page: this.state.page + 1,
          coursesList: this.state.coursesList.concat(c1.data.data.map(item => {
            return {
              courseId: item.fid,
              imageUrl: item.imgurl,
              courseTitle: item.title,
              price: "0",
              courseCategory: "体验课",
            }
          }), c2.data.data.map(item => {
            return {
              courseId: item.lid,
              imageUrl: item.imgurl,
              courseTitle: item.lname,
              price: item.lprice,
              courseCategory: item.category,
            }
          })),
          refresh: false
        });

      } else {
        alert("加载失败");
        this.setState({
          refresh: false
        });
      }
    }))
    .catch(err => {
      alert(err);
    });

    setTimeout(() => {
      this.setState({refresh: false})
    }, 2000)
  };
  changeLocation(e) {
    this.setState({
      currentLoacation: e[0]
    });
  };
  changeCategory(e) {
    this.setState({
      currentCategory: e[0]
    });
  };
  changeType(e) {
    this.setState({hideLoading: false});
    function getCourses1() {
      return Axios.post("/SSM/test/FreelistenHandler_findAllFreelisten?page=1&limit=6");
    }
    function getCourses2() {
      return Axios.post("/SSM/test/LessonHandler_findAllLessonByPage?page=1&limit=6");
    }
    this.setState({
      currentType: e[0]
    }, () => {
      switch(this.state.currentType) {
        case 0:
          Axios.all([getCourses1(), getCourses2()])
          .then(Axios.spread((c1, c2) =>{
            if (c1.data && c2.data) {

              this.setState({
                page: 1,
                hideLoading: true,
                coursesList: c1.data.data.map(item => {
                  return {
                    courseId: item.fid,
                    imageUrl: item.imgurl,
                    courseTitle: item.title,
                    price: "0",
                    courseCategory: "体验课",
                  }
                }).concat(c2.data.data.map(item => {
                  return {
                    courseId: item.lid,
                    imageUrl: item.imgurl,
                    courseTitle: item.lname,
                    price: item.lprice,
                    courseCategory: item.category,
                  }
                }))
              });
      
            } else {
              alert("加载失败");
              this.setState({
                refresh: false
              });
            }
          }))
          .catch(err => {
            alert(err);
          })
          break;
        case 1:
          getCourses2()
          .then(c2 => {
            if (c2.data) {
              this.setState({
                page: 1,
                hideLoading: true,
                coursesList: c2.data.data.map(item => {
                  return {
                    courseId: item.lid,
                    imageUrl: item.imgurl,
                    courseTitle: item.lname,
                    price: item.lprice,
                    courseCategory: item.category,
                  }
                })
              })
            } else {
              alert("加载失败");
            }
          })
          .catch(err => {
            alert(err);
          })
          break;
        case 2:
          getCourses1()
          .then(c1 => {
            if (c1.data) {
              this.setState({
                page: 1,
                hideLoading: true,
                coursesList: c1.data.data.map(item => {
                  return {
                    courseId: item.fid,
                    imageUrl: item.imgurl,
                    courseTitle: item.title,
                    price: "0",
                    courseCategory: "体验课",
                  }
                })
              })
            } else {
              alert("加载失败");
            }
          })
          .catch(err => {
            alert(err);
          })
          break;
        default:
          this.setState({
            hideLoading: true
          })
          break;
      }
    });
  };
}

export default Courses;