import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Send, Phone, Video } from "lucide-react";

const mockChats = [
  {
    id: 1,
    patient: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Thank you doctor, I'll follow your advice",
    time: "5 min ago",
    unread: 0,
  },
  {
    id: 2,
    patient: "Michael Chen",
    avatar: "MC",
    lastMessage: "When should I take the next insulin dose?",
    time: "15 min ago",
    unread: 2,
  },
  {
    id: 3,
    patient: "Emily Davis (Family)",
    avatar: "ED",
    lastMessage: "My mother is feeling better today",
    time: "1 hour ago",
    unread: 1,
  },
];

const mockMessages = [
  {
    id: 1,
    sender: "patient",
    message: "Good morning doctor, I have some questions about my medication",
    time: "9:30 AM",
  },
  {
    id: 2,
    sender: "doctor",
    message: "Good morning! Of course, I'm here to help. What questions do you have?",
    time: "9:32 AM",
  },
  {
    id: 3,
    sender: "patient",
    message: "Should I take my blood pressure medication before or after meals?",
    time: "9:35 AM",
  },
  {
    id: 4,
    sender: "doctor",
    message: "It's best to take your Lisinopril in the morning with food. This helps reduce any potential side effects and ensures consistent absorption.",
    time: "9:37 AM",
  },
  {
    id: 5,
    sender: "patient",
    message: "Thank you doctor, I'll follow your advice",
    time: "9:40 AM",
  },
];

export function DoctorConsult() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "doctor",
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Consultation</h1>
        <p className="text-slate-600">Chat with patients and their families</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-150">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 text-left hover:bg-slate-50 transition-colors ${
                    selectedChat.id === chat.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>{chat.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p>{chat.patient}</p>
                        <p className="text-xs text-slate-500">{chat.time}</p>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{selectedChat.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedChat.patient}</CardTitle>
                  <p className="text-sm text-slate-600">Active now</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === "doctor"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "doctor" ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
