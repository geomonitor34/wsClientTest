import React, { useRef, useState, useEffect, useContext } from "react";
import { WsContext } from "../../WsContext";
import { MessagesDispatch } from "../../reducer";

export const SendMessage = props => {
  const inputEl = useRef(null);
  const ws = useContext(WsContext);
  const [msg, setMsg] = useState("");
  const dispatch = useContext(MessagesDispatch);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useEffect(() => {
    function addMessage(msg) {
      console.log("TCL: msg", msg)
      dispatch({ type: "send", payload: { msg: msg.content, own: false } });
    }
    ws.listener.on('message', addMessage);
    console.log("TCL: ws.listener.", ws.listener)
  }, [ws.listener, dispatch]);

  return (
    <div className="form">
      <input
        ref={inputEl}
        value={msg}
        onChange={e => setMsg(e.target.value)}
        onKeyPress={hanldeKeyPress}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );

  function handleSend() {
    if (msg === "") {
      return;
    }
    ws.send(msg);
    setMsg("");
    dispatch({ type: "send", payload: { msg, own: true } });
  }

  function hanldeKeyPress(e) {
    if (e.key === "Enter") {
      handleSend();
      e.preventDefault();
    }
  }
};
