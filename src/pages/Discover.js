import React, { Component } from 'react';
import './Discover.css';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { PullToRefresh } from 'antd-mobile';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.refreshDown = this.refreshDown.bind(this);
    this.refreshUp = this.refreshUp.bind(this);

    this.state = {
      refreshDown: false,
      refreshUp: false,
      hideLoading: false,
      messages: [
        {
          messageId: 1,
          avatar: 'image/avatar.png',
          userName: '管理员',
          time: '2018-06-25',
          imageUrls: [
            'image/course1.jpg', 'image/course2.jpg', 'image/course3.jpg'
          ],
          text: "无阅读，不生活！",
          likeNum: 12,
          isLike: true,
          comments: [
            {
              userName: 'hyf',
              content: '这是一条评论'
            },
            {
              userName: 'hyf',
              content: '这是一条评论'
            },
            {
              userName: 'hyf',
              content: '这是一条评论'
            }
          ]
        },
        {
          messageId: 2,
          avatar: 'image/avatar.png',
          userName: '管理员',
          time: '2018-06-25',
          imageUrls: [
            'image/course3.jpg', 'image/course1.jpg'
          ],
          text: "快乐生活！",
          likeNum: 2,
          isLike: false,
          comments: []
        },
        {
          messageId: 3,
          avatar: 'image/avatar.png',
          userName: '管理员',
          time: '2018-06-25',
          imageUrls: [],
          text: "好好学习，天天向上",
          likeNum: 100,
          isLike: true,
          comments: [
            {
              userName: 'hyf',
              content: '这是一条评论'
            },
            {
              userName: 'hyf',
              content: '这是一条评论'
            },
            {
              userName: 'hyf',
              content: '这是一条评论'
            }
          ]
        },
        {
          messageId: 4,
          avatar: 'image/avatar.png',
          userName: '管理员',
          time: '2018-06-25',
          imageUrls: [],
          text: "好好学习，天天向上",
          likeNum: 100,
          isLike: true,
          comments: []
        }
      ]
    }
  };
  componentWillMount() {
    window.scrollTo(0, 0);
  };
  render() {
    let messages = [];

    if (this.state.messages) {
      for (let message of this.state.messages) {
        messages.push(<Message key={message.messageId} avatar={message.avatar} sender={message.userName} time={message.time} 
          text={message.text} imageUrls={message.imageUrls} likeNum={message.likeNum} isLike={message.isLike}
          comments={message.comments} messageId={message.messageId}></Message>);
      }
    };

    return (
      <div className="Discover">
        <Loading hide={this.state.hideLoading}/>

        <img className="discover-banner" src="image/banner3.jpg" alt="banner"/>
        <div className="messages">
          <PullToRefresh refreshing={this.state.refreshDown} onRefresh={this.refreshDown}>
          <PullToRefresh refreshing={this.state.refreshUp} onRefresh={this.refreshUp} direction="up">
            {messages}
          </PullToRefresh>
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
  refreshDown() {
    this.setState({refreshDown: true});

    setTimeout(() => {
      this.setState({refreshDown: false});
    }, 1000);
  };
  refreshUp() {
    this.setState({refreshUp: true});

    setTimeout(() => {
      this.setState({refreshUp: false});
    }, 1000);
  }
}

export default Discover;