import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

// Lodash
import _noop from 'lodash/noop';

// Constants
import {
  AVATAR_ALT,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from '../../../../../../../../constants/chatApp.general';

// Components
import MessageInput from '../../../../molecules/messageInput';

// Helpers
import {
  getNestedMessageListStyle,
  handleMessageReply,
} from './helpers/chatCard.general';

// Style
import style from './chatCard.module.css';

const ChatCard = (props) => {
  const {
    chat,
    userMetadata,
    className,
    setChatHistory,
    selectedUserId,
    styleOverrides,
    chatHistory,
    currentUserInfo,
    contentClassName,
  } = props;

  const { message, senderId, threadMessages } = chat;

  const senderInfo = useMemo(
    () => userMetadata[senderId] || EMPTY_OBJECT,
    [userMetadata, senderId]
  );

  const nestedMessageListStyle = useMemo(
    () => getNestedMessageListStyle(chat),
    [chat]
  );

  const onMessageReply = useCallback(
    (newMessage) => handleMessageReply({ chatHistory, setChatHistory, chat, newMessage, currentUserInfo }),
    [setChatHistory, chat, chatHistory, currentUserInfo]
  );

  const renderChatCard = useCallback(
    (chat) => {
      return (
        <ChatCard
          userMetadata={userMetadata}
          selectedUserId={selectedUserId}
          chat={chat}
          setChatHistory={setChatHistory}
          className={style.nestedMessageList}
          contentClassName={style.nestedMessageListContent}
          styleOverrides={nestedMessageListStyle}
          chatHistory={chatHistory}
          currentUserInfo={currentUserInfo}
        />
      );
    },
    [userMetadata, selectedUserId, setChatHistory, nestedMessageListStyle,     chatHistory, currentUserInfo]
  );

  return (
    <div
      className={`${style.chatCardContainer} ${className}`}
      style={styleOverrides}
    >
      <div className={`${style.chatCardContent} ${contentClassName}`}>
        <div className={style.senderDetailContainer}>
          <img
            src={senderInfo?.avatar}
            alt={AVATAR_ALT}
            className={style.avatar}
          />
          <div className={style.senderName}>{senderInfo?.name}</div>
        </div>
        <div className={style.contentContainer}>
          <div className={style.message}>{message}</div>
        </div>
        {threadMessages.map(renderChatCard)}
      </div>
      <div>
        <MessageInput
          onSubmit={onMessageReply}
          chatMessageInputClassName={style.chatMessageInput}
          sendButtonClassName={style.sendButton}
          inputFieldClassName={style.inputField}
          placeholderText='Reply'
        />
      </div>
    </div>
  );
};

ChatCard.propTypes = {
  chat: PropTypes.object,
  userMetadata: PropTypes.object,
  className: PropTypes.string,
  setChatHistory: PropTypes.func,
  selectedUserId: PropTypes.string,
  styleOverrides: PropTypes.object,
  chatHistory: PropTypes.array,
  currentUserInfo: PropTypes.object,
  contentClassName: PropTypes.object,
};

ChatCard.defaultProps = {
  chat: EMPTY_OBJECT,
  userMetadata: EMPTY_OBJECT,
  className: '',
  setChatHistory: _noop,
  selectedUserId: undefined,
  chatHistory: EMPTY_ARRAY,
  currentUserInfo: EMPTY_OBJECT,
  contentClassName: '',
};

export default ChatCard;
