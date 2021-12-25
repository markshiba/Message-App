import MessageActionTypes from "./messages.type";

export const setMessageChatted = (messageChatted) => ({
  type: MessageActionTypes.MESSAGE_CHATTED,
  payload: messageChatted,
});
