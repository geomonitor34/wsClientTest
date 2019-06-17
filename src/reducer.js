import { createContext } from "react";

export const initialState = {
  messages: []
}

export const messagesReducer = (state=initialState, action) => {
  switch (action.type) {
    case "send":
      return { ...state, messages: [...state.messages, action.payload] };
    case "removeAll":
      return { ...state, messages: [] };
    default:
      return state;
  }
}; 

export const MessagesDispatch = createContext(null);