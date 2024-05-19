import React, { useEffect, useRef, useState } from "react";
import "./chats.css";

import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";
import img1 from "../../../assets/img1.jpeg";
import img2 from "../../../assets/219688.webp";
import chaticon1 from "../../../assets/chats/icon1.svg";
import chaticon2 from "../../../assets/chats/icon2.svg";
import chaticon0 from "../../../assets/chats/icon0.svg";
import chaticon from "../../../assets/chats/icon.svg";
import messengericon1 from "../../../assets/chatmessage/icon1.svg";
import messengericon2 from "../../../assets/chatmessage/icon2.svg";
import messengericon3 from "../../../assets/chatmessage/icon3.svg";
import messengericon4 from "../../../assets/chatmessage/icon4.svg";

const socket = io.connect("http://localhost:8000");

function Chats() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (text || file) {
      const messageData = {
        text,
        file: file ? URL.createObjectURL(file) : null,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      socket.emit("send_message", messageData);
      setMessages((prev) => [...prev, { ...messageData, fromMe: true }]);
      setText("");
      setFile(null);
      setFilePreview(null);
    }
  };

  useEffect(() => {
    const receiveMessage = (data) => {
      setMessages((prev) => [...prev, { ...data, fromMe: false }]);
    };

    socket.on("receive_message", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, []);

  return (
    <div className="Chats">
      <div className="profile">
        <img src={img1} alt="avatar" />
        <div className="profiledetails">
          <div className="UserName" last-seen="Yesterday">
            Jimmy
          </div>
          <div className="icons">
            <img src={chaticon0} />
            <img src={chaticon} />
            <img src={chaticon1} />
            <img src={chaticon2} />
          </div>
        </div>
      </div>
      <div className="userschats">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`messages ${message.fromMe ? "chatsbyme" : ""}`}
            date-time={message.time}
          >
            {message.text && <div>{message.text}</div>}
            {message.file &&(
              <div>
                <img
                  src={message.file}
                  alt="file"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}

            {/* <embed
              src={message.file}
              width="80%"
              height="80%"
              type="application/pdf"
            /> */}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <div className="messenger">
        <label htmlFor="images">
          <img src={messengericon2} />
        </label>
        <input
          type="file"
          id="images"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img src={messengericon1} onClick={() => setOpen((prev) => !prev)} />
        <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji} />
        </div>
        <div className="inputmessage">
          <input
            type="text"
            placeholder="Type a message....."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={() => setOpen(false)}
          />
          {filePreview && (
            <div className="image-preview">
              <img
                src={filePreview}
                alt="image preview"
                style={{
                  width: "max(10px,0.75vw,0.75vh)",
                  aspectRatio: 1,
                  marginLeft: "10px",
                }}
              />
              <button
                onClick={() => {
                  setFile(null);
                  setFilePreview(null);
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <img src={messengericon3} />
        <img src={messengericon4} onClick={sendMessage} />
      </div>
    </div>
  );
}

export default Chats;
