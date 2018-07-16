import React, { Component } from 'react';
import './Discover.css';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { PullToRefresh } from 'antd-mobile';
import Axios from 'axios';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.refreshDown = this.refreshDown.bind(this);
    this.refreshUp = this.refreshUp.bind(this);
    this.thumUp = this.thumUp.bind(this);
    this.addComment = this.addComment.bind(this);

    this.state = {
      refreshDown: false,
      refreshUp: false,
      hideLoading: false,
      bannerUrl: "image/banner3.jpg",
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
          comments={message.comments} messageId={message.messageId} thumUp={this.thumUp} addComment={this.addComment}></Message>);
      }
    };

    return (
      <div className="Discover">
        <Loading hide={this.state.hideLoading}/>

        <img className="discover-banner" src={this.state.bannerUrl} alt="banner"/>
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
    function getBanner() {
      return Axios.post("/SSM/test/EnterpriseHandler_findSwiperByQid");
    }
    function getMessages() {
      return Axios.post("/SSM/test/MessageHandler_findAllMessage");
    }
    function getIsLike() {
      return Axios.post("/SSM/test/MessageHandler_findAllMessagelike");
    }

    Axios.post("/SSM/test/CustomerHandler_islogin")
    .then(res => {
    if (res.data.result) {
      Axios.all([getBanner(), getMessages(), getIsLike()])
      .then(Axios.spread((banners, res, mids) => {
        if (banners.data && res.data && mids.data) {
          this.setState({
            hideLoading: true,
            bannerUrl: '/upload/' + banners.data.filter(item => {
              return item.category == 'D';
            })[0].imgurl,
            messages: res.data.map(item => {
              let mid = item.mid;
              return {
                messageId: item.mid,
                avatar: 'image/avatar.png',
                userName: '管理员',
                time: item.mtime,
                imageUrls: item.messageimgList.map(img => {
                  return '/upload/' + img.imgurl;
                }),
                text: item.mtitle,
                likeNum: item.messagelikeList.length,
                isLike: mids.data.some(i => {
                  return i.mid == mid;
                }),
                comments: item.messagereplyList.filter(comment => {return comment.content != null}).map(comment => {
                  return {
                    userName: comment.mrnickname,
                    content: comment.content
                  }
                })
              }
            })
          });
        } else {
          alert("加载失败");
        }
      }))
      .catch(err => {
        alert(err);
      });
    } else {
        window.location.hash = 'login';
    }
    })
    .catch(err => {
    alert(err);
    // window.location.assign("../#login");
    });

    

    

    // setTimeout(() =>
    //     this.setState({hideLoading: true}),
    //     1000
    // );
  };
  refreshDown() {
    this.setState({refreshDown: true});
    function getBanner() {
      return Axios.post("/SSM/test/EnterpriseHandler_findSwiperByQid");
    }
    function getMessages() {
      return Axios.post("/SSM/test/MessageHandler_findAllMessage");
    }
    function getIsLike() {
      return Axios.post("/SSM/test/MessageHandler_findAllMessagelike");
    }

    Axios.all([getBanner(), getMessages(), getIsLike()])
    .then(Axios.spread((banners, res, mids) => {
      if (banners.data && res.data, mids.data) {
        this.setState({
          hideLoading: true,
          bannerUrl: '/upload/' + banners.data.filter(item => {
            return item.category == 'D';
          })[0].imgurl,
          messages: res.data.map(item => {
            return {
              messageId: item.mid,
              avatar: 'image/avatar.png',
              userName: '管理员',
              time: item.mtime,
              imageUrls: item.messageimgList.map(img => {
                return '/upload/' + img.imgurl;
              }),
              text: item.mtitle,
              likeNum: item.messagelikeList.length,
              isLike: mids.data.includes(item.mid),
              comments: item.messagereplyList.filter(comment => {return comment.content != null}).map(comment => {
                return {
                  userName: comment.mrnickname,
                  content: comment.content
                }
              })
            }
          })
        });
      } else {
        alert("加载失败");
      }
    }))
    .catch(err => {
      alert(err);
    });
    setTimeout(() => {
      this.setState({refreshDown: false});
    }, 1000);
  };
  refreshUp() {
    this.setState({refreshUp: true});

    setTimeout(() => {
      this.setState({refreshUp: false});
    }, 1000);
  };
  thumUp(mid) {
    let messages = this.state.messages;
    messages.forEach(item => {
      if (item.messageId == mid) {
          Axios.post("/SSM/test/MessageHandler_saveMessagelike?mid=" + mid)
          .then(() => {
            if (item.isLike) {
              item.likeNum--;
            } else {
              item.likeNum++;
            }
            item.isLike = !item.isLike;
            this.setState({
              messages: messages
            })
          })
          .catch(err => {
            alert(err);
          });
      }
    });
  };
  addComment(mid, content) {
    let messages = this.state.messages;
    Axios.post("/SSM/test/CustomerHandler_findCustomerByPhone")
    .then(res => {
      messages.forEach(item => {
        if (item.messageId == mid) {
          item.comments.push({
            userName: res.data.phone,
            content: content
          });
        }   
      });
      this.setState({
        messages: messages
      })
    })
    .catch(err => {
      alert(err);
    })
    ;
  }
}

export default Discover;