import { useState, useEffect, useRef } from "react";
import "./styles/Chatbot.css";
import { portfolioData } from "../data/portfolioData";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: `Hi! I'm Naveen's AI Assistant. Ask me anything about his skills, experience, or projects!`, sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("skill") || lowerInput.includes("tech")) {
      const skills = portfolioData.skills.map(s => s.name).join(", ");
      return `Naveen's top skills include: ${skills}.`;
    }
    if (lowerInput.includes("experience") || lowerInput.includes("intern") || lowerInput.includes("work")) {
      return portfolioData.experience.map(exp => `${exp.role} at ${exp.company}`).join(" | ");
    }
    if (lowerInput.includes("project")) {
      return `He has built several projects including: ${portfolioData.projects.map(p => p.title).join(", ")}.`;
    }
    if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("phone") || lowerInput.includes("hire")) {
      return `You can reach Naveen at ${portfolioData.personal.email} or call him at ${portfolioData.personal.phone}.`;
    }
    if (lowerInput.includes("education") || lowerInput.includes("college") || lowerInput.includes("degree")) {
      return portfolioData.education.map(edu => `${edu.degree} from ${edu.institution}`).join(". ");
    }
    if (lowerInput.includes("about") || lowerInput.includes("who")) {
      return portfolioData.about;
    }

    return "I'm not sure about that! Try asking about Naveen's skills, experience, projects, or contact info.";
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInputText("");

    // Simulate thinking delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Search / Chat Window */}
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <span className="online-dot"></span> AI Assistant
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Naveen..."
          />
          <button onClick={handleSend} className="send-btn">
            <FiSend />
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        className={`chatbot-toggle-btn ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <FiMessageSquare className="chat-icon" />
      </button>
    </div>
  );
};

export default Chatbot;
