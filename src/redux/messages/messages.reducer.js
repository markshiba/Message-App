import MessageActionTypes from "./messages.type";

const INITIAL_STATE = {
  messageChatted: null,
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MessageActionTypes.MESSAGE_CHATTED:
      return {
        ...state,
        messageChatted: action.payload,
      };

    default:
      return state;
  }
};

export default messageReducer;
