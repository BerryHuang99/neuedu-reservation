import React, { Component } from 'react';
import './CourseList.css';
import {Card, Image} from 'semantic-ui-react'

class CoursesList extends Component {
  constructor(props) {
      super(props);

      this.state = {};
  };
  render() {
    let list = [];

    if (Array.isArray(this.props.list)) {
        for (let item of this.props.list) {
            list.push(
                <Card className="course-card" key={item.courseId}>
                    <Image className="course-image" src={item.imageUrl}/>
                    <Card.Content>
                    <Card.Header>{item.courseTitle}</Card.Header>
                    <Card.Meta>
                        <span>￥{item.price}</span>
                    </Card.Meta>
                    </Card.Content>
                </Card>
            );
        }
    }
    return (
      <div className="CoursesList">
        {list}
      </div>
    );
  }
}

export default CoursesList;