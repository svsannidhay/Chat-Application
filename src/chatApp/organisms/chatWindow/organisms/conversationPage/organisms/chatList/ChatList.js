import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

// Custom hooks
import useFetchChatHistory from './hooks/useFetchChatHistory';

// Constants
import { EMPTY_OBJECT } from '../../../../../../constants/chatApp.general';

// Components
import ChatCard from './molecules/chatCard';

// Style
import style from './chatList.module.css';

const ChatList = (props) => {
  const { currentUserInfo, userMetadata, selectedUserId } = props;

  const { chatHistory, setChatHistory } = useFetchChatHistory(selectedUserId);  


  const renderChatCard = useCallback((chat) => {
    return ( 
    <ChatCard
      userMetadata={userMetadata}
      selectedUserId={selectedUserId}
      chat={chat}
      setChatHistory={setChatHistory}
      className={style.chatCardContainer}
    />);
  }, [userMetadata, selectedUserId, setChatHistory]);

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
}

ChatList.defaultProps = {
  currentUserInfo: EMPTY_OBJECT, 
  userMetadata: EMPTY_OBJECT,
  selectedUserId: undefined,
};

export default ChatList