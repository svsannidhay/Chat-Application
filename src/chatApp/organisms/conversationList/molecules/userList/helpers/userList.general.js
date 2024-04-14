// Constants
import { EMPTY_OBJECT } from '../../../../../constants/chatApp.general';

// Styles
import style from '../userList.module.css';

export const getStyles = (height) => ({
  height: height,
});

export const getDisplayName = (
  userData = EMPTY_OBJECT,
  currentUserInfo = EMPTY_OBJECT
) => {
  if (userData.id === currentUserInfo.id) return `${userData.name} (You)`;
  return userData.name;
};

export const getSelectedClassName = (userId, selectedUserId) =>
  userId === selectedUserId ? style.selectedUser : '';
