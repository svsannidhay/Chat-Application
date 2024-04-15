import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import ConversationList from './organisms/conversationList';

// Containers
import withWindowDimensions from '../containers/withWindowDimensions';

// Custom Hooks
import useFetchUserMetadata from './hooks/useFetchUserMetadata';

// Styles
import style from './chatApp.module.css';
import ChatWindow from './organisms/chatWindow';

const ChatApp = (props) => {
  const { height, width } = props;
  const { userMetadata, currentUserInfo, setUserMetadata } = useFetchUserMetadata();

  const [selectedUserId, setSelectedUserId] = useState(undefined);

  return (
    <div className={style.chatAppContainer}>
      <ConversationList
        userMetadata={userMetadata}
        currentUserInfo={currentUserInfo}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        height={height}
      />
      <ChatWindow
        userMetadata={userMetadata}
        currentUserInfo={currentUserInfo}
        selectedUserId={selectedUserId}
        height={height}
        setUserMetadata={setUserMetadata}
      />
    </div>
  );
};

ChatApp.propTypes = {
  height: PropTypes.number,
};

ChatApp.defaultProps = {
  height: 0,
};

export default withWindowDimensions(ChatApp);
