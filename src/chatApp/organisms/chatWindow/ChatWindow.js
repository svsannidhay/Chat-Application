import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { EMPTY_OBJECT } from '../../constants/chatApp.general';

// Components
import ChatWindowHeader from './chatWindowHeader';

// Styles
import style from './chatWindow.module.css';

const ChatWindow = (props) => {
  const { userMetadata, currentUserInfo, selectedUserId, height } = props;

  return (
    <div className={style.chatWindowContainer}>
      <ChatWindowHeader
        selectedUserId={selectedUserId}
        userMetadata={userMetadata}
        currentUserInfo={currentUserInfo}
      />
    </div>
  );
};

ChatWindow.propTypes = {
  userMetadata: PropTypes.object,
  selectedUserId: PropTypes.string,
  currentUserInfo: PropTypes.object,
  height: PropTypes.number,
};

ChatWindow.defaultProps = {
  userMetadata: EMPTY_OBJECT,
  currentUserInfo: EMPTY_OBJECT,
  selectedUserId: undefined,
  height: 0,
};

export default ChatWindow;
