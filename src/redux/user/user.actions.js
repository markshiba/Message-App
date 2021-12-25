import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const listAllUser = (allUses) => ({
  type: UserActionTypes.LIST_ALL_USERS,
  payload: allUses,
});

export const setSelectedUser = (user) => ({
  type: UserActionTypes.SET_SELECTED_USER,
  payload: user,
});
