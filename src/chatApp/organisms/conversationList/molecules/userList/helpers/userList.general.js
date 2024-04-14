// Constants
import { EMPTY_OBJECT } from '../../../../../constants/chatApp.general';
import { HEADER_HEIGHT } from '../constants/userList.general';

// Styles
import style from '../userList.module.css';

export const getStyles = (height) => ({
  height: height - HEADER_HEIGHT,
});

export  const getDisplayName = (userData = EMPTY_OBJECT, currentUserInfo = EMPTY_OBJECT) => {
  if (userData.id === currentUserInfo.id) return `${userData.name} (You)`;
  return  userData.name;
}

export const getSelectedClassName = (userId, selectedUserId) =>  userId === selectedUserId ? style.selectedUser : '';