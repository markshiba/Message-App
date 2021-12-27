import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import messageReducer from "./messages/messages.reducer";

export default combineReducers({
  user: userReducer,
  message: messageReducer,
});
