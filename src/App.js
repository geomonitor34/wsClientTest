import React, { useReducer } from "react";
import { SendMessage } from "./scenes/SendMessage";
import { Conversation } from "./scenes/Conversation";
import { messagesReducer, MessagesDispatch, initialState } from "./reducer";

import "./App.css"

function App() {
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  return (
    <div className="App">
      <MessagesDispatch.Provider value={dispatch}>
        <Conversation messages={state.messages} />
        <SendMessage />
      </MessagesDispatch.Provider>
    </div>
  )
}

export default App
