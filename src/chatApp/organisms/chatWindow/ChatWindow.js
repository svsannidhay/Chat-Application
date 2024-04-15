import React from 'react';
import PropTypes from 'prop-types';

// Lodash
import _noop from 'lodash/noop';

// Constants
import { EMPTY_OBJECT } from '../../constants/chatApp.general';
import { CHAT_WINDOW_HEADER_HEIGHT } from './constants/chatWindow.general';

// Components
import ChatWindowHeader from './molecules/chatWindowHeader';
import ConversationPage from './organisms/conversationPage/ConversationPage';

// Styles
import style from './chatWindow.module.css';


const ChatWindow = (props) => {
  const { userMetadata, currentUserInfo, selectedUserId, height, setUserMetadata } = props;

  return (
    <div className={style.chatWindowContainer}>
      <ChatWindowHeader
        selectedUserId={selectedUserId}
        userMetadata={userMetadata}
        currentUserInfo={currentUserInfo}
      />
      <ConversationPage 
        height={height - CHAT_WINDOW_HEADER_HEIGHT}
        selectedUserId={selectedUserId}
        userMetadata={userMetadata}
        currentUserInfo={currentUserInfo}
        setUserMetadata={setUserMetadata}
      />
    </div>
  );
};

ChatWindow.propTypes = {
  userMetadata: PropTypes.object,
  selectedUserId: PropTypes.string,
  currentUserInfo: PropTypes.object,
  height: PropTypes.number,
  setUserMetadata: PropTypes.func,
};

ChatWindow.defaultProps = {
  userMetadata: EMPTY_OBJECT,
  currentUserInfo: EMPTY_OBJECT,
  selectedUserId: undefined,
  height: 0,
  setUserMetadata: _noop,
};

export default ChatWindow;
