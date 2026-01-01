import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Send, Phone, Video } from "lucide-react";

const mockChats = [
  {
    id: 1,
    patient: "Sarah Johnson",
    avatar: "SJ",
    lastMessage:
      "Thank you doctor, I'll follow your advice",
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
    message:
      "Good morning doctor, I have some questions about my medication",
    time: "9:30 AM",
  },
  {
    id: 2,
    sender: "doctor",
    message:
      "Good morning! Of course, I'm here to help. What questions do you have?",
    time: "9:32 AM",
  },
  {
    id: 3,
    sender: "patient",
    message:
      "Should I take my blood pressure medication before or after meals?",
    time: "9:35 AM",
  },
  {
    id: 4,
    sender: "doctor",
    message:
      "It's best to take your Lisinopril in the morning with food. This helps reduce any potential side effects and ensures consistent absorption.",
    time: "9:37 AM",
  },
  {
    id: 5,
    sender: "patient",
    message: "Thank you doctor, I'll follow your advice",
    time: "9:40 AM",
  },
];

type Chat = (typeof mockChats)[number];

export function DoctorConsult() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "doctor" as const,
        message: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Consult
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Patient messaging
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          Chat with patients and their families securely in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-3xl bg-white/90 p-4 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
        <Card className="rounded-3xl border-0 bg-white/95 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-900">
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-2">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-xs transition-colors ${
                  selectedChat.id === chat.id
                    ? "bg-teal-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-teal-500 text-xs font-semibold text-white">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {chat.patient}
                    </p>
                    <p className="line-clamp-1 text-[11px] text-gray-600">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500">{chat.time}</p>
                  {chat.unread > 0 && (
                    <span className="mt-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-semibold text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-teal-500 text-xs font-semibold text-white">
                  {selectedChat.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">
                  {selectedChat.patient}
                </CardTitle>
                <p className="text-[11px] text-emerald-600">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Phone size={14} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Video size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex h-90 flex-col justify-between p-4 pt-2">
            <div className="space-y-2 overflow-y-auto pr-2 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "doctor" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                      msg.sender === "doctor"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="mt-1 text-[10px] opacity-80">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5">
              <Input
                className="h-6 flex-1 border-none bg-transparent p-0 text-xs outline-none focus-visible:ring-0"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                className="h-7 w-7 rounded-full bg-teal-500 text-white hover:bg-teal-600"
                onClick={handleSendMessage}
              >
                <Send size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
