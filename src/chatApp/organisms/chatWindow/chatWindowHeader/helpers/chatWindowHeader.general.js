// Constants
import { EMPTY_OBJECT } from "../../../../constants/chatApp.general";

export  const getUserInfoToRender = (userData = EMPTY_OBJECT, currentUserInfo = EMPTY_OBJECT) => {
  if (userData.id === currentUserInfo.id) return {
    ...userData,
    name: `${userData.name} (You)`,
  };
  return  userData;
}