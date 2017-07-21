import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input } from 'formsy-react-components';
import { clearConversation, deleteConversation, leftConversation } from '../../redux/modules/profile';
import './index.scss';

@connect((state) => ({
}), {
  clearConversation,
  deleteConversation,
  leftConversation
})

class ListMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsersID: [],
    };
    this.getReceivers = this.getReceivers.bind(this);
  }

  getReceivers(receivers) {
    let result;
    const receiversArr = [];

    if (receivers.length === 1) {
      result = `${receivers[0].first_name} ${receivers[0].last_name}`;
    } else if (receivers.length > 1) {
      receivers.map(receiver => {
        receiversArr.push(` ${receiver.first_name}`);
      });
      result = receiversArr.toString();
    }

    return result;
  }
  render() {
    const { conversations } = this.props;
    return (
      <div className="messages-mnu">
        <div className="additional-title">Messanger
         <Link to="/messages/new" className="new-message" onClick={() => this.props.clearConversation()}><i/></Link>
        </div>
        <ul className="conversations-list">
          <Form rowClassName={[{'form-group': false}, {row: false}, 'messages-form']} >
            <Input
              name="to"
              value=""
              labelClassName={[{'col-sm-3': false}, 'disabled-label']}
              elementWrapperClassName={[{'col-sm-9': false}, 'messages-search']}
              type="text"
              placeholder="Search"
           />
          </Form>

          { !conversations &&
            <li style={{padding: '10px 15px'}}>No conversations yet.</li>
          }

          { conversations && conversations.map(conversation => (
            <div>
              <Link to={`/messages/${conversation.conversation_id}`} key={conversation.conversation_id}>
                <li>
                  <img src={conversation.receivers[0].avatar32} alt=""/>
                  <h5>{this.getReceivers(conversation.receivers)}</h5>
                </li>
                <span>{conversation.messages[0].date.substring(11, 17)}</span>
                <p>{conversation.messages[0].text}</p>
              </Link>
              <div>
                <i/>
                <div className="conversation-settings">
                  <ul>
                    { conversation.receivers.length > 1 &&
                      <li onClick={() => this.props.leftConversation(conversation.conversation_id)}>Leave Group</li>
                    }
                    <li onClick={() => this.props.deleteConversation(conversation.conversation_id)}>Delete</li>
                    <li>Mark as Spam</li>
                  </ul>
                </div>
              </div>
            </div>
         ))}

          {/*<Link to="/messages">*/}
          <a href="#">
            <li>
              <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
              <h5>Name Surname</h5>
            </li>
            <p>Message text...</p>
          </a>
          {/*</Link>*/}

          <a href="#">
            <li>
              <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
              <h5>Name Surname</h5>
            </li>
            <p>Message text...</p>
          </a>
        </ul>
      </div>
    );
  }
}

ListMessage.propTypes = {
  conversations: PropTypes.array,
  cleanConversation: PropTypes.func,
  deleteConversation: PropTypes.func,
  leftConversation: PropTypes.func,
};

export default ListMessage;
