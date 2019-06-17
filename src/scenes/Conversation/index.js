import React from "react";

export const Conversation = ({ messages }) => {
  return (
    <ul id="messages">
      {messages.map(renderMessage)}
    </ul>
  );

  function renderMessage({ msg, own }, idx) {
    return (
      <li key={idx} className={ own ? "right" : "left"}><span>{msg}</span></li>
    )
  }
};
