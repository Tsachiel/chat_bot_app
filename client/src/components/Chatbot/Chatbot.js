import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import HotelLink from "../Hotel/HotelLink";
import { CounterContext } from "../../Context/context";
import { message, List } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Message from "../Sections/Message";
function Chatbot() {
  const [globalState, setGlobalState] = useContext(CounterContext);
  const [messageText, setMessageText] = useState("");
  const [hotel, setHotel] = useState("");
  useEffect(() => {
    setGlobalState({ ...globalState, conversations: [] });
  }, []);

  //Send and Recive text to and from chatbot server
  const textQuery = async (text) => {
    //  First  Need to  take care of the message I sent
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };
    let conversationsTmp = globalState.conversations;
    conversationsTmp.push(conversation);
    setGlobalState({ ...globalState, conversations: conversationsTmp });
    //

    const textQueryVar = { text };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/dialogflow/textQuery",
        textQueryVar
      );

      const content = response.data.fulfillmentMessages[0];
      conversation = {
        who: "bot",
        content: content,
      };

      let conversationsTmp = globalState.conversations;
      conversationsTmp.push(conversation);
      setGlobalState({ ...globalState, conversations: conversationsTmp });
    } catch (err) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error just acurred",
          },
        },
      };
    }
  };

  const textChangeHandler = (e) => {
    setMessageText(e.target.value);
  };

  const keyPressHanlder = (e) => {
    setMessageText(e.target.value);
    if (e.key === "Enter") {
      setMessageText("");
      if (!e.target.value) {
        return alert("You have to enter a message");
      } else {
        textQuery(e.target.value);
        e.target.value=''
      }
    }
  };

  const show = () => {
    return (
      <div>
        {globalState.conversations.map((item, index) => {
          if (item.who === "bot") {
            if (item.content.text.text[0].firstHotel) {
              return (
                <HotelLink
                  firstHotel={item.content.text.text[0].firstHotel}
                  secondHotel={item.content.text.text[0].secondHotel}
                  thirdHotel={item.content.text.text[0].thirdHotel}
                />
              );
            } else {
              return (
                <Message
                  text={item.content.text.text[0].toString()}
                  who={"Bot"}
                />
              );
            }
          } else {
            return <Message text={item.content.text.text} who={"User"} />;
          }
        })}
      </div>
    );
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {globalState.conversations.length > 0 ? show() : ""}
      </div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHanlder}
        type="text"
      />
    </div>
  );
}

export default Chatbot;
