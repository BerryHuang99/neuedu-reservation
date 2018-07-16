import React, { Component } from 'react';
import './Message.css';
import { Feed, Modal, Button, Form } from 'semantic-ui-react';
import { TextareaItem } from 'antd-mobile'
import Axios from 'axios';

class Message extends Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.thumUp = this.thumUp.bind(this);

        this.state = {
            modalOpen: false,
            content: ''
        }
    };
    render() {
        let img = [];
        let comments = [];
        let commentList = "";
        if (this.props.imageUrls.length && Array.isArray(this.props.imageUrls)) {
            for (let i = 0; i < this.props.imageUrls.length; i++) {
                img.push(<img src={this.props.imageUrls[i]} key={i} alt="消息图"/>);
            }
        }
        if (this.props.comments.length && Array.isArray(this.props.comments)) {
            for (let i = 0; i < this.props.comments.length; i++) {
                comments.push(<div key={i}><span className="comment-user">{this.props.comments[i].userName}</span>{this.props.comments[i].content}</div>);
            }
            commentList = <div className={comments ? "feed-comments" : ""}>
                            {comments}
                        </div>
        }
        return (
        <div className="Message">
        <Feed>
            <Feed.Event>
                <Feed.Label className="feed-label">
                    <img  className="avatar" src={this.props.avatar} alt="头像"/>
                </Feed.Label>
                <Feed.Content className="feed-content">
                    <Feed.Summary>
                    {this.props.sender}
                    <Feed.Date>{this.props.time}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {this.props.text}
                    </Feed.Extra>
                    <Feed.Extra images>
                    
                        {img}
                    
                    </Feed.Extra>
                    <Feed.Meta>
                        <span onClick={this.thumUp}>
                            <i className={this.props.isLike ? 'icon like is-like' : 'icon like'}></i>
                            {this.props.likeNum}
                        </span>
                        <span>
                            <i className='icon comment' onClick={this.openModal}></i>
                        </span>

                        <Modal size="tiny" open={this.state.modalOpen} onClose={this.closeModal}>
                            <Modal.Header>评论</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <TextareaItem className="textarea-item" onBlur={this.changeContent} rows="5" placeholder="评论内容..."/>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.closeModal}>取消</Button>
                                <Button className="submit" color="teal" onClick={this.sendComment}>提交</Button>
                            </Modal.Actions>
                        </Modal>

                    </Feed.Meta>
                    {commentList}
                </Feed.Content>
            </Feed.Event>
        </Feed>
        </div>
        );
    };
    openModal() {
        this.setState({modalOpen: true});
    };
    closeModal() {
        this.setState({modalOpen: false});
    };
    sendComment() {
        if (this.state.content) {
            let param = new URLSearchParams();
            param.append('mid', this.props.messageId);
            param.append('content', this.state.content);
            Axios.post("/SSM/test/MessageHandler_saveMessagereply", param)
            .then(() => {
                this.setState({
                    modalOpen: false
                });
                this.props.addComment(this.props.messageId, this.state.content);
            })
            .catch(err => {
                alert(err);
            })
        } else {
            alert("评论不可为空！");
        }
    };
    changeContent(e) {
        this.setState({
            content: e
        });
    };
    thumUp() {
        this.props.thumUp(this.props.messageId);
    }
}

export default Message;