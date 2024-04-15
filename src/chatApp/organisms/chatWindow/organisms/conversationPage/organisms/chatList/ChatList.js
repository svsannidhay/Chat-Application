import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

// Constants
import { EMPTY_OBJECT } from '../../../../../../constants/chatApp.general';

// Components
import ChatCard from './molecules/chatCard';

// Style
import style from './chatList.module.css';

const ChatList = (props) => {
  const { currentUserInfo, userMetadata, selectedUserId, chatHistory, setChatHistory } = props;


  const renderChatCard = useCallback((chat) => {
    return ( 
    <ChatCard
      userMetadata={userMetadata}
      selectedUserId={selectedUserId}
      chat={chat}
      chatHistory={chatHistory}
      setChatHistory={setChatHistory}
      className={style.chatCardContainer}
      currentUserInfo={currentUserInfo}
    />);
  }, [userMetadata, selectedUserId, setChatHistory, chatHistory, currentUserInfo]);

  return (
    <div>
      {chatHistory.map(renderChatCard)}
    </div>
  );
};

ChatList.propTypes = {
  currentUserInfo: PropTypes.object,
  userMetadata: PropTypes.object,
  selectedUserId: PropTypes.string,
  chatHistory: PropTypes.object,
}

ChatList.defaultProps = {
  currentUserInfo: EMPTY_OBJECT, 
  userMetadata: EMPTY_OBJECT,
  selectedUserId: undefined,
  chatHistory: EMPTY_OBJECT,
};

export default ChatList