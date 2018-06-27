import React, { Component } from 'react';
import './Discover.css';
import Message from '../components/Message'

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }
  render() {
    let messages = [];

    if (this.state.messages) {
      for (let message of this.state.messages) {
        messages.push(<Message key={message.messageId} avatar={message.avatar} sender={message.userName} time={message.time} 
          text={message.text} imageUrls={message.imageUrls} likeNum={message.likeNum} isLike={message.isLike}
          comments={message.comments} messageId={message.messageId}></Message>);
      }
    }

    return (
      <div className="Discover">
        <img className="discover-banner" src="image/banner3.jpg" alt="banner"/>
        <div className="messages">
          {messages}
        </div>
      </div>
    );
  }
}

export default Discover;