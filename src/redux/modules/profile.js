const GET_NOTIFICATION_SETTINGS = 'GET_NOTIFICATION_SETTINGS';
const GET_NOTIFICATION_SETTINGS_SUCCESS = 'GET_NOTIFICATION_SETTINGS_SUCCESS';
const GET_NOTIFICATION_SETTINGS_FAIL = 'GET_NOTIFICATION_SETTINGS_FAIL';
const SET_NOTIFICATION_SETTINGS = 'SET_NOTIFICATION_SETTINGS';
const SET_NOTIFICATION_SETTINGS_SUCCESS = 'SET_NOTIFICATION_SETTINGS_SUCCESS';
const SET_NOTIFICATION_SETTINGS_FAIL = 'SET_NOTIFICATION_SETTINGS_FAIL';
const GET_USER_NOTIFICATIONS = 'GET_USER_NOTIFICATIONS';
const GET_USER_NOTIFICATIONS_SUCCESS = 'GET_USER_NOTIFICATIONS_SUCCESS';
const GET_USER_NOTIFICATIONS_FAIL = 'GET_USER_NOTIFICATIONS_FAIL';
const SEEN_ALL_NOTIFICATIONS = 'SEEN_ALL_NOTIFICATIONS';
const SEEN_ALL_NOTIFICATION_SUCCESS = 'SEEN_ALL_NOTIFICATION_SUCCESS';
const SEEN_ALL_NOTIFICATIONS_FAIL = 'SEEN_ALL_NOTIFICATIONS_FAIL';
const READ_ALL_NOTIFICATIONS = 'READ_ALL_NOTIFICATIONS';
const READ_ALL_NOTIFICATION_SUCCESS = 'READ_ALL_NOTIFICATION_SUCCESS';
const READ_ALL_NOTIFICATIONS_FAIL = 'READ_ALL_NOTIFICATIONS_FAIL';
const READ_NOTIFICATION = 'READ_NOTIFICATION';
const READ_NOTIFICATION_SUCCESS = 'READ_NOTIFICATION_SUCCESS';
const READ_NOTIFICATION_FAIL = 'READ_NOTIFICATION_FAIL';
const SOCKET_SEND_USER_NOTIFICATION = 'SOCKET_SEND_USER_NOTIFICATION';
const GET_CONVERSATION = 'GET_CONVERSATION';
const GET_CONVERSATION_SUCCESS = 'GET_CONVERSATION_SUCCESS';
const GET_CONVERSATION_FAIL = 'GET_CONVERSATION_FAIL';
const GET_CONVERSATION_BY_USER = 'GET_CONVERSATION_BY_USER';
const GET_CONVERSATION_BY_USER_SUCCESS = 'GET_CONVERSATION_BY_USER_SUCCESS';
const GET_CONVERSATION_BY_USER_FAIL = 'GET_CONVERSATION_BY_USER_FAIL';
const GET_CONVERSATION_LIST = 'GET_CONVERSATION_LIST';
const GET_CONVERSATION_LIST_SUCCESS = 'GET_CONVERSATION_LIST_SUCCESS';
const GET_CONVERSATION_LIST_FAIL = 'GET_CONVERSATION_LIST_FAIL';
const CREATE_MESSAGE = 'CREATE_MESSAGE';
const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
const CREATE_MESSAGE_FAIL = 'CREATE_MESSAGE_FAIL';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
const DELETE_MESSAGE_FAIL = 'DELETE_MESSAGE_FAIL';
const CLEAR_CONVERSATION = 'CLEAR_CONVERSATION';
const CLEAR_MAIL_COUNTER = 'CLEAR_MAIL_COUNTER';
const CLEAR_NOTIFICATIONS_COUNTER = 'CLEAR_NOTIFICATIONS_COUNTER';
const SOCKET_GET_MESSAGE = 'SOCKET_GET_MESSAGE';
const SOCKET_LAST_MESSAGE = 'SOCKET_LAST_MESSAGE';
const DELETE_CONVERSATION = 'DELETE_CONVERSATION';
const DELETE_CONVERSATION_SUCCESS = 'DELETE_CONVERSATION_SUCCESS';
const DELETE_CONVERSATION_FAIL = 'DELETE_CONVERSATION_FAIL';
const LEFT_CONVERSATION = 'LEFT_CONVERSATION';
const LEFT_CONVERSATION_SUCCESS = 'LEFT_CONVERSATION_SUCCESS';
const LEFT_CONVERSATION_FAIL = 'LEFT_CONVERSATION_FAIL';
const SEARCH_CONVERSATION = 'SEARCH_CONVERSATION';

const initialState = {
  notificationSettings: {},
  notifications: [],
  conversation: {},
  conversations: [],
  bubbleMessage: 0,
  bubbleNotification: 0,
  bubbleCommon: 0
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION_SETTINGS:
      return {
        ...state,
        gettingNotification: true,
      };
    case GET_NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        gettingNotification: false,
        notificationSettings: action.result.data
      };
    case GET_NOTIFICATION_SETTINGS_FAIL:
      return {
        ...state,
        gettingNotification: false,
        error: action.error,
      };

    case SET_NOTIFICATION_SETTINGS: {
      return {
        ...state,
        settingNotification: true,
      };
    }
    case SET_NOTIFICATION_SETTINGS_SUCCESS: {
      const newNotificationSettings = Object.assign(state.notificationSettings);

      switch (action.notification_type) {
        case 'settings':
          newNotificationSettings.settings = action.settings;
          break;
        case 'updates':
          newNotificationSettings.updates = action.settings;
          break;

        default:
          console.log('error');
      }

      return {
        ...state,
        settingNotification: false,
        notificationSettings: newNotificationSettings
      };
    }
    case SET_NOTIFICATION_SETTINGS_FAIL: {
      return {
        ...state,
        settingNotification: false,
        error: action.error,
      };
    }

    case GET_USER_NOTIFICATIONS:
      return {
        ...state,
        gettingUserNotification: true,
      };
    case GET_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        gettingUserNotification: false,
        notifications: action.result.data
      };
    case GET_USER_NOTIFICATIONS_FAIL:
      return {
        ...state,
        gettingUserNotification: false,
        error: action.error,
      };

    case SEEN_ALL_NOTIFICATIONS:
      return {
        ...state,
        seeingAllNotifications: true,
      };
    case SEEN_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        seeingAllNotifications: false,
        // notifications: action.result.data
      };
    case SEEN_ALL_NOTIFICATIONS_FAIL:
      return {
        ...state,
        seeingAllNotifications: false,
        error: action.error,
      };

    case READ_ALL_NOTIFICATIONS:
      return {
        ...state,
        readingAllNotifications: true,
      };
    case READ_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        readingAllNotifications: false,
        // notifications: action.result.data
      };
    case READ_ALL_NOTIFICATIONS_FAIL:
      return {
        ...state,
        readingAllNotifications: false,
        error: action.error,
      };

    case READ_NOTIFICATION:
      return {
        ...state,
        readingNotification: true,
      };
    case READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        readingNotification: false,
        // notifications: action.result.data
      };
    case READ_NOTIFICATION_FAIL:
      return {
        ...state,
        readingNotification: false,
        error: action.error,
      };

    case SOCKET_SEND_USER_NOTIFICATION:
      return {
        ...state,
        socketUserNotification: true,
        notifications: [action.data, ...state.notifications],
        bubbleNotification: state.bubbleNotification + 1,
        bubbleCommon: state.bubbleNotification + 1 + state.bubbleMessage
      };

    case CLEAR_NOTIFICATIONS_COUNTER:
      return {
        ...state,
        bubbleNotification: 0,
      };

    case GET_CONVERSATION:
      return {
        ...state,
        gettingConversation: true,
      };
    case GET_CONVERSATION_SUCCESS:
      const newConversation = action.result.data;
      if (newConversation.receivers) {
        newConversation.receiversID = [];
        newConversation.receivers.map(receiver => {
          newConversation.receiversID.push(receiver.id);
        });
      }
      return {
        ...state,
        gettingConversation: false,
        conversation: newConversation
      };
    case GET_CONVERSATION_FAIL:
      return {
        ...state,
        gettingConversation: false,
        error: action.error,
      };

    case GET_CONVERSATION_BY_USER:
      return {
        ...state,
        gettingConversation: true,
      };
    case GET_CONVERSATION_BY_USER_SUCCESS:
      const newConversationByUser = action.result.data;
      if (newConversationByUser.receivers > 0) {
        newConversationByUser.receiversID = [];
        newConversationByUser.receivers.map(receiver => {
          newConversationByUser.receiversID.push(receiver.id);
        });
      }
      const addTemporaryConversation = Object.assign(
        {}, state.conversations[0].new ? state.conversations[0] : action.result.data, {
          conversation_id: action.result.data.conversation_id ? action.result.data.conversation_id : 'new',
          receivers: [{
            id: 'new',
            first_name: action.user_name,
            last_name: '',
            avatar: 'https://s3-us-west-2.amazonaws.com/dev.validbook/200x200.png',
          }],
          new: true,
        });
      return {
        ...state,
        gettingConversation: false,
        conversation: newConversationByUser,
        conversations: state.conversations[0].new
          ?
          [state.conversations[0] = addTemporaryConversation, ...state.conversations]
          :
          [addTemporaryConversation, ...state.conversations]
      };
    case GET_CONVERSATION_BY_USER_FAIL:
      return {
        ...state,
        gettingConversation: false,
        error: action.error,
      };

    case GET_CONVERSATION_LIST:
      return {
        ...state,
        gettingConversationList: true,
      };
    case GET_CONVERSATION_LIST_SUCCESS:
      const newConversations = action.result.data;
      newConversations.map(conversation => {
        conversation.receiversID = [];
        const receiversName = [];
        conversation.receivers.map(receiver => {
          conversation.receiversID.push(receiver.id);
          receiversName.push(receiver.first_name, receiver.last_name);
        });
        conversation.receiversName = receiversName.toString();
      });

      newConversations.sort((a, b) => {
        if (a.messages[0].date > b.messages[0].date) {
          return -1;
        }
        if (a.messages[0].date < b.messages[0].date) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        gettingConversationList: false,
        conversations: newConversations,
        copyConversations: newConversations,
      };
    case GET_CONVERSATION_LIST_FAIL:
      return {
        ...state,
        gettingConversationList: false,
        error: action.error,
      };

    case CREATE_MESSAGE:
      return {
        ...state,
        sendingMessage: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      let newMessage;
      console.log('state.conversation', state.conversation);
      if (state.conversation.length === 0) {
        console.log('NO CONVERSATION');
        newMessage = {
          conversation_id: action.result.data.conversation_id,
          messages: [action.result.data]
        };
      } else {
        console.log('CONVERSATION');
        newMessage = Object.assign({}, state.conversation, {
          messages: [...state.conversation.messages, action.result.data]
        });
      }

      return {
        ...state,
        sendingMessage: false,
        conversation: newMessage
      };
    case CREATE_MESSAGE_FAIL:
      return {
        ...state,
        sendingMessage: false,
        error: action.error,
      };

    case DELETE_MESSAGE:
      return {
        ...state,
        deletingMessage: true,
      };
    case DELETE_MESSAGE_SUCCESS:
      const deletingMessage = Object.assign({}, state.conversation, {
        messages: state.conversation.messages.filter(message => (message.id !== action.message_id))
      });

      return {
        ...state,
        deletingMessage: false,
        conversation: deletingMessage
      };
    case DELETE_MESSAGE_FAIL:
      return {
        ...state,
        deletingMessage: false,
        error: action.error,
      };

    case CLEAR_CONVERSATION:
      return {
        ...state,
        conversation: [],
      };

    case CLEAR_MAIL_COUNTER:
      return {
        ...state,
        bubbleMessage: 0,
        bubbleCommon: state.bubbleNotification
      };

    case SOCKET_GET_MESSAGE:
      const newSocketMessage = Object.assign({}, state.conversation, {
        messages: [...state.conversation.messages, action.msg]
      });
      return {
        ...state,
        conversation: newSocketMessage,
      };

    case SOCKET_LAST_MESSAGE:
      console.log('newSocketLastMessage');
      const newSocketLastMessage = state.conversations.map(conversation => {
        if (conversation.conversation_id === action.msg.conversation_id) {
          let conversationMessages = conversation.messages;
          conversationMessages = action.msg;
          return {
            ...conversation,
            messages: [conversationMessages]
          };
        }
        return {
          ...conversation
        };
      });
      return {
        ...state,
        conversations: newSocketLastMessage,
        bubbleMessage: state.bubbleMessage + 1,
        bubbleCommon: state.bubbleMessage + 1 + state.bubbleNotification
      };

    case DELETE_CONVERSATION:
      return {
        ...state,
        deletingConversation: true,
      };
    case DELETE_CONVERSATION_SUCCESS:
      const deletingConversations = state.conversations.filter(conversation => (conversation.conversation_id !== action.id));

      return {
        ...state,
        deletingConversation: false,
        conversations: deletingConversations
      };
    case DELETE_CONVERSATION_FAIL:
      return {
        ...state,
        deletingConversation: false,
        error: action.error,
      };

    case LEFT_CONVERSATION:
      return {
        ...state,
        leavingConversation: true,
      };
    case LEFT_CONVERSATION_SUCCESS:
      const leavingConversation = state.conversations.filter(conversation => (conversation.conversation_id !== action.id));
      return {
        ...state,
        leavingConversation: false,
        conversations: leavingConversation
      };
    case LEFT_CONVERSATION_FAIL:
      return {
        ...state,
        leavingConversation: false,
        error: action.error,
      };

    case SEARCH_CONVERSATION:
      const searchPhrase = new RegExp(action.text, 'i');
      const foundConversation = state.copyConversations.filter(conversation => conversation.receiversName.match(searchPhrase));
      return {
        ...state,
        conversations: foundConversation
      };

    default:
      return state;
  }
}

export function getConversationID(globalState) {
  const path = globalState.routing.locationBeforeTransitions.pathname;
  const id = path.substring(path.indexOf('/messages') + 10);
  if (id) {
    return id;
  }
  if (globalState.profile.conversations) {
    return globalState.profile.conversations[0].conversation_id;
  }
}

export function clearConversation() {
  return {
    type: CLEAR_CONVERSATION
  };
}

export function clearMailCounter() {
  return {
    type: CLEAR_MAIL_COUNTER
  };
}

export function clearNotificationsCounter() {
  return {
    type: CLEAR_NOTIFICATIONS_COUNTER
  };
}

export function socketGetMessage(msg) {
  return {
    type: SOCKET_GET_MESSAGE,
    msg
  };
}

export function socketLastMessage(msg) {
  return {
    type: SOCKET_LAST_MESSAGE,
    msg
  };
}

export function socketUserNotification(data) {
  console.log('redux socketUserNotification', data);
  return {
    type: SOCKET_SEND_USER_NOTIFICATION,
    data
  };
}

export function searchConversation(text) {
  return {
    type: SEARCH_CONVERSATION,
    text
  };
}

export function getNotificationSettings() {
  return {
    types: [GET_NOTIFICATION_SETTINGS, GET_NOTIFICATION_SETTINGS_SUCCESS, GET_NOTIFICATION_SETTINGS_FAIL],
    promise: (client) => client.get('/notifications/settings')
  };
}

export function seenAllNotification() {
  return {
    types: [SEEN_ALL_NOTIFICATIONS, SEEN_ALL_NOTIFICATION_SUCCESS, SEEN_ALL_NOTIFICATIONS_FAIL],
    promise: (client) => client.post('/notifications/seen-all')
  };
}

export function readAllNotification() {
  return {
    types: [READ_ALL_NOTIFICATIONS, READ_ALL_NOTIFICATION_SUCCESS, READ_ALL_NOTIFICATIONS_FAIL],
    promise: (client) => client.post('/notifications/read-all')
  };
}

export function readNotification(notification_id) {
  return {
    types: [READ_NOTIFICATION, READ_NOTIFICATION_SUCCESS, READ_NOTIFICATION_FAIL],
    promise: (client) => client.post(`/notifications/read/${notification_id}`)
  };
}

export function setNotificationSettings(settings, notification_type) {
  console.log('setNotificationSettings', settings, notification_type);
  return {
    types: [SET_NOTIFICATION_SETTINGS, SET_NOTIFICATION_SETTINGS_SUCCESS, SET_NOTIFICATION_SETTINGS_FAIL],
    promise: (client) => client.post('/notifications/settings', { data: { settings, notification_type }}),
    settings,
    notification_type
  };
}

export function getUserNotifications() {
  return {
    types: [GET_USER_NOTIFICATIONS, GET_USER_NOTIFICATIONS_SUCCESS, GET_USER_NOTIFICATIONS_FAIL],
    promise: (client) => client.get('/notifications')
  };
}

export function getConversationByID(id) {
  return {
    types: [GET_CONVERSATION, GET_CONVERSATION_SUCCESS, GET_CONVERSATION_FAIL],
    promise: (client) => client.get(`/conversations/${id}`)
  };
}

export function getConversationByUser(user_ids, user_name) {
  return {
    types: [GET_CONVERSATION_BY_USER, GET_CONVERSATION_BY_USER_SUCCESS, GET_CONVERSATION_BY_USER_FAIL],
    promise: (client) => client.get('/conversations/by-users', { params: { user_ids }}),
    user_name
  };
}

export function getConversationList() {
  return {
    types: [GET_CONVERSATION_LIST, GET_CONVERSATION_LIST_SUCCESS, GET_CONVERSATION_LIST_FAIL],
    promise: (client) => client.get('/conversations')
  };
}

export function deleteConversation(id) {
  return {
    types: [DELETE_CONVERSATION, DELETE_CONVERSATION_SUCCESS, DELETE_CONVERSATION_FAIL],
    promise: (client) => client.del(`/conversations/${id}`),
    id
  };
}

export function leftConversation(id) {
  return {
    types: [LEFT_CONVERSATION, LEFT_CONVERSATION_SUCCESS, LEFT_CONVERSATION_FAIL],
    promise: (client) => client.patch(`/conversations/${id}`),
    id
  };
}

export function createMessage(text, conversation_id, receivers) {
  return {
    types: [CREATE_MESSAGE, CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_FAIL],
    promise: (client) => client.post('/messages', { data: { text, conversation_id, receivers }}),
  };
}

export function deleteMessage(message_id) {
  return {
    types: [DELETE_MESSAGE, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL],
    promise: (client) => client.del(`/messages/${message_id}`),
    message_id
  };
}
