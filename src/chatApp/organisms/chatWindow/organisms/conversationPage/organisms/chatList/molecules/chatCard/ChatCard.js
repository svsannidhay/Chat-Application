import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Constants
import { AVATAR_ALT, EMPTY_OBJECT } from '../../../../../../../../constants/chatApp.general';

// Style
import style from './chatCard.module.css';

const ChatCard = (props) => {
  const { chat, userMetadata, className } = props;

  const { message, senderId, depth=0} = chat;

  const senderInfo = useMemo(() => userMetadata[senderId] || EMPTY_OBJECT, [userMetadata, senderId]);
  const { avatar, name } = senderInfo;

  console.log(chat);

 return (
  <div className={`${style.chatCardContainer} ${className} `}>
  <div className={style.senderDetailContainer}>
    <img src={avatar} alt={AVATAR_ALT} className={style.avatar} />
    <div className={style.senderName}>{name}</div>
  </div>
  <div className={style.contentContainer}>

    <div className={style.message}>
      {message}
    </div>
  </div>
</div>
 );
};

ChatCard.propTypes = {

};

ChatCard.defaultProps = {

};

export default ChatCard;