import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

// Components
import MessageInput from './molecules/messageInput';
import ChatList from './organisms/chatList';

// Constants
import { EMPTY_OBJECT } from '../../../../constants/chatApp.general';

// Helpers
import { getChatListContainerStyle } from './helpers/conversationPage.general';

// Styles
import style from './conversationPage.module.css';

const ConversationPage = (props) => {
  const { height, selectedUserId, userMetadata, currentUserInfo } = props;

  const conversationPageContainerStyles = useMemo(() => ({ height }), [height]);

  const onSubmit = useCallback(() => {}, []);

  const chatListContainerStyle = useMemo(() => getChatListContainerStyle(height), [height]);

  return (
    <div
      className={style.conversationPageContainer}
      style={conversationPageContainerStyles}
    >
      <div style={chatListContainerStyle} className={style.chatListContainer}>
        <ChatList selectedUserId={selectedUserId} userMetadata={userMetadata} currentUserInfo={currentUserInfo} />
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
};

ConversationPage.defaultProps = {
  userMetadata: EMPTY_OBJECT,
  currentUserInfo: EMPTY_OBJECT,
  selectedUserId: undefined,
  height: 0,
};

export default ConversationPage;
