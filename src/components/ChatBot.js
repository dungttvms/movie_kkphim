import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, IconButton } from "@mui/material";
import ChatBot from "react-simple-chatbot";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "../images/Chatbot.png";
import styled, { keyframes } from "styled-components";

import { getSearchMovie } from "../features/movies/movieSlice.js";
import chatBotImage from "../images/Logo.png";
import avatar from "../images/avatar.png";
import { apiService2 } from "../app/apiService.js";
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
  z-index: 1001;
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
  const [movie, setMovie] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSentData = useCallback(async () => {
    if (!username || !phoneNumber || !movie) {
      console.log("Thiếu data trả về");
      return;
    }
    const data = { username: username.value, phoneNumber, movie: movie.value };

    try {
      await apiService2.post("/phimgialai", data);
      toast.success("Cảm ơn bạn ");
    } catch (error) {
      toast.error(error.message);
    }
  }, [username, phoneNumber, movie]);

  const handleSearchSubmit = useCallback(
    (keyword) => {
      dispatch(getSearchMovie({ keyword }));
      navigate(`/tim-kiem?keyword=${encodeURIComponent(keyword)}`);
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (movie.value && username.value && phoneNumber) {
      handleSearchSubmit(movie.value);
      handleSentData();
    }
  }, [
    movie.value,
    username.value,
    phoneNumber,
    handleSearchSubmit,
    handleSentData,
  ]);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
    handleSentData();
    setUsername("");
    setPhoneNumber("");
    setMovie("");
  };

  const steps = [
    {
      id: "Step_1",
      message:
        "Chào mừng bạn đã đến với Phim Gia Lai, rạp chiếu phim trong ngôi nhà bạn",
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
      trigger: (value) => {
        setUsername(value);
        return "Step_4";
      },
    },
    {
      id: "Step_4",
      message: "Chào {previousValue}, Vui lòng nhập số điện thoại của bạn",
      trigger: "Step_5",
    },
    {
      id: "Step_5",
      user: true,
      validator: (value) => {
        const phoneRegex = /^(0[35789][0-9]{8})$/;
        if (phoneRegex.test(value)) {
          setPhoneNumber(value);
          return true;
        } else {
          return "SĐT sai định dạng. SĐT gồm 10 số, bắt đầu từ 09/08/07/05/03";
        }
      },
      trigger: "Step_6",
    },
    {
      id: "Step_6",
      message: "Bạn đang cần chúng tôi tìm giúp bạn bộ phim nào?",
      trigger: "Step_7",
    },
    {
      id: "Step_7",
      user: true,
      trigger: (value) => {
        setMovie(value);
        return "Step_8";
      },
    },
    {
      id: "Step_8",
      message:
        "Chúng tôi đang tìm kiếm bộ phim {previousValue} cho bạn. Vui lòng chờ giây lát...",
      trigger: () => {
        closeChatbot();
        return "Step_9"; // Nếu bạn muốn thêm bước khác, bạn có thể thêm bước này
      },
      end: true, // Hoặc kết thúc tại đây
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
          <ChatBot
            steps={steps}
            userAvatar={avatar}
            hideInput={false}
            botAvatar={chatBotImage}
          />
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
