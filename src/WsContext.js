import React from "react";
import EventEmitter from "events"

const wsContext = () => {
  const socket = new WebSocket("ws://localhost:12345/ws");
  const listener = new EventEmitter();

  socket.onopen = event => {
    console.log("onopen", event)
    listener.emit({ type: "open", data: event })
  }
  socket.onclose = event => {
    console.log("TCL: onclose -> event", event)
    listener.emit({ type: "close", data: event })
  }
  socket.onmessage = event => {
    console.log("TCL: onmessage -> event", event)
    listener.emit({ type: "message", data: JSON.parse(event.data) })
    listener.emit("message", JSON.parse(event.data))
  }

  return {
    socket,
    listener,
    send: msg => {
      socket.send(msg)
    },
    close: socket.close
  }
}

export const WsContext = React.createContext(wsContext())