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

const ChatApp = (props) => {
  const { height, width } = props;
  const { userMetadata, currentUserInfo } = useFetchUserMetadata();

  const [selectedUserId, setSelectedUserId] = useState(null); 

  return (
    <div className={style.chatAppContainer}>
      <ConversationList 
        userMetadata={userMetadata} 
        currentUserInfo = {currentUserInfo} 
        selectedUserId={selectedUserId} 
        setSelectedUserId={setSelectedUserId} 
        height={height}
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
