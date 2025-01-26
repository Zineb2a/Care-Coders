import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Sidebar from "../SideBar/SideBar"; // Import Sidebar

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef(null);

  // Auto-scroll to the bottom of the chat when messages are updated
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f8fafe",
      }}
    >
      {/* Sidebar */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Box>

      {/* Main Chatbot Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: "16px", md: "24px" },
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#70B1CB",
            marginBottom: "16px",
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Dr. Patience
        </Typography>

        {/* Messages */}
        <Box
          ref={messagesContainerRef}
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: "800px",
            overflowY: "auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            height: { xs: "65vh", md: "70vh" },
          }}
        >
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent:
                  msg.role === "assistant" ? "flex-start" : "flex-end",
                marginBottom: "12px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: msg.role === "assistant" ? "#eaf4fc" : "#c2e1f6",
                  color: msg.role === "assistant" ? "#333333" : "#ffffff",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  maxWidth: "80%",
                  fontSize: "0.95rem",
                  wordWrap: "break-word",
                }}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
            marginTop: "16px",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              fontSize: { xs: "0.85rem", md: "1rem" },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={isLoading}
            sx={{
              marginLeft: "8px",
              backgroundColor: "#c2e1f6",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#99c0db",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;
