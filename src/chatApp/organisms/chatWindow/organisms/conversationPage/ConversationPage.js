import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

// Lodash
import _noop from 'lodash/noop';

// Components
import MessageInput from './molecules/messageInput';
import ChatList from './organisms/chatList';

// Constants
import { EMPTY_OBJECT } from '../../../../constants/chatApp.general';

// Custom Hooks
import useFetchChatHistory from './hooks/useFetchChatHistory';

// Helpers
import {
  getChatListContainerStyle,
  handleMessageSubmit,
} from './helpers/conversationPage.general';

// Styles
import style from './conversationPage.module.css';

const ConversationPage = (props) => {
  const {
    height,
    selectedUserId,
    userMetadata,
    currentUserInfo,
    setUserMetadata,
  } = props;

  const conversationPageContainerStyles = useMemo(() => ({ height }), [height]);

  const chatListContainerStyle = useMemo(
    () => getChatListContainerStyle(height),
    [height]
  );

  const { chatHistory, setChatHistory } = useFetchChatHistory(
    selectedUserId,
    userMetadata
  );

  const onSubmit = useCallback(
    (message) =>
      handleMessageSubmit({
        selectedUserId,
        userMetadata,
        currentUserInfo,
        chatHistory,
        setChatHistory,
        message,
        setUserMetadata,
      }),
    [
      selectedUserId,
      userMetadata,
      currentUserInfo,
      chatHistory,
      setChatHistory,
      setUserMetadata,
    ]
  );

  return (
    <div
      className={style.conversationPageContainer}
      style={conversationPageContainerStyles}
    >
      <div style={chatListContainerStyle} className={style.chatListContainer}>
        <ChatList
          selectedUserId={selectedUserId}
          userMetadata={userMetadata}
          currentUserInfo={currentUserInfo}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      </div>
      <MessageInput
        onSubmit={onSubmit}
        chatMessageInputClassName={style.chatMessageInput}
        sendButtonClassName={style.sendButton}
        inputFieldClassName={style.inputField}
      />
    </div>
  );
};

ConversationPage.propTypes = {
  userMetadata: PropTypes.object,
  selectedUserId: PropTypes.string,
  currentUserInfo: PropTypes.object,
  height: PropTypes.number,
  setUserMetadata: PropTypes.func,
};

ConversationPage.defaultProps = {
  userMetadata: EMPTY_OBJECT,
  currentUserInfo: EMPTY_OBJECT,
  selectedUserId: undefined,
  height: 0,
  setUserMetadata: _noop,
};

export default ConversationPage;
