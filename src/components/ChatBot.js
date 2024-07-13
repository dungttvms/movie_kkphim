import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";

import CloseIcon from "@mui/icons-material/Close";

import SupportAgentIcon from "../images/customer-service_870175.png";
import styled, { keyframes } from "styled-components";
import apiService from "../app/apiService";
import { toast } from "react-toastify";

const ChatContainer = styled.div`
  position: relative;
`;
const ChatBotAnim = keyframes`
  0% {
    transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.6;
  }
  50% {
    transform: rotate(0) scale(1) skew(1deg);
    opacity: 0.6;
  }
  100% {
    transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.6;
  }
`;

const ChatBox = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  animation: ${ChatBotAnim}1s infinite ease-in-out;
`;

const ChatIconStyled = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  margin-right: 5px;
  background-color: #d2691e;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${ChatBotAnim} 1s infinite ease-in-out, shake 0.3s infinite;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
      transform: translateY(0);
    }
    25% {
      transform: translateX(-3px);
      transform: translateY(-3px);
    }
    50% {
      transform: translateX(3px);
      transform: translateY(3px);
    }
    75% {
      transform: translateX(-3px);
      transform: translateY(-3px);
    }
  }
`;

function CustomChatBot() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");

  const handleSentData = async () => {
    if (!username || !phoneNumber || !province) {
      return;
    }
    const data = {
      username: username,
      phoneNumber: phoneNumber,
      province: province,
    };

    try {
      await apiService.post("/chatBots", data);

      toast.success("Cảm ơn bạn ");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
    handleSentData();
    setUsername("");
    setPhoneNumber("");
    setProvince("");
  };

  const steps = [
    {
      id: "Step_1",
      message:
        "Chào mừng bạn đến với website Chợ đất Tây Nguyên - Nơi kết nối các giá trị Bất động sản khu vực Tây Nguyên",
      trigger: "Step_2",
    },
    {
      id: "Step_2",
      message: "Để tiện xưng hô, vui lòng nhập tên của bạn!",
      trigger: "Step_3",
    },
    {
      id: "Step_3",
      user: true,
      trigger: "Step_4",
      validator: (value) => {
        setUsername(value);
        return true;
      },
    },
    {
      id: "Step_4",
      message: "Chào {previousValue}, Bạn vui lòng nhập số điện thoại",
      trigger: "Step_5",
    },
    {
      id: "Step_5",
      user: true,
      trigger: "Step_6",
      validator: (value) => {
        const phoneRegex = /^(0[35789][0-9]{8})$/;
        if (phoneRegex.test(value)) {
          setPhoneNumber(value);
          return true;
        } else {
          return "Vui lòng nhập SĐT đúng định dạng";
        }
      },
    },
    {
      id: "Step_6",
      message: "Bạn đang quan tâm đến Bất động sản khu vực nào?",
      trigger: "Step_7",
    },

    {
      id: "Step_7",
      user: true,
      trigger: "Step_8",
      validator: (value) => {
        setProvince(value);
        return true;
      },
    },

    {
      id: "Step_8",
      message:
        "Cảm ơn bạn, Chợ đất Tây Nguyên sẽ liên hệ với bạn trong thời gian sớm nhất",

      end: true,
    },
  ];

  return (
    <ChatContainer>
      <ChatBox onClick={toggleChatbot}>
        <ChatIconStyled>
          <img
            src={SupportAgentIcon}
            alt="Support Agent"
            style={{ height: "60px", width: "60px" }}
          />
        </ChatIconStyled>
      </ChatBox>
      {showChatbot && (
        <Box
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ChatBot steps={steps} />

          <IconButton
            sx={{
              color: "#ffffff",
              bgcolor: "#d2691e",
              zIndex: 9999,
              left: "-20px",
              top: "-258px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={closeChatbot}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </ChatContainer>
  );
}

export default CustomChatBot;
