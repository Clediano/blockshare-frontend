import { LOAD_AVATAR } from "../reducers/avatar";

export const loadAvatar = action => ({
  type: LOAD_AVATAR,
  avatar: action.avatar,
  oidavatar: action.oidavatar,
});
