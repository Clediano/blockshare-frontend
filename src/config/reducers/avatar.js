export const LOAD_AVATAR = 'LOAD_AVATAR';

const avatar = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_AVATAR':
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
};

export default avatar;