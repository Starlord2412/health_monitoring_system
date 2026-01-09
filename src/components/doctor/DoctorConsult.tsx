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

export default function DoctorConsult() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "doctor" as const,
        message,
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
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Consultation
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Chat with patients and their families in real time.
            </p>
          </div>
          <div className="hidden gap-3 sm:flex">
            <Button variant="outline" size="sm">
              Conversation history
            </Button>
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
              New consult
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:divide-x lg:divide-slate-100">
              {/* Chat List */}
              <div className="border-b border-slate-100 lg:border-b-0">
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-xs font-medium tracking-tight text-slate-500">
                    Conversations
                  </p>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                    {mockChats.length} active
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {mockChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition ${
                        selectedChat.id === chat.id
                          ? "bg-teal-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-teal-500 text-xs font-semibold text-white">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {chat.patient}
                          </p>
                          <p className="whitespace-nowrap text-[11px] text-slate-400">
                            {chat.time}
                          </p>
                        </div>
                        <p className="truncate text-xs text-slate-500">
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[11px] font-semibold text-white">
                          {chat.unread}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="lg:col-span-2 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-teal-500 text-xs font-semibold text-white">
                        {selectedChat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-semibold">
                        {selectedChat.patient}
                      </CardTitle>
                      <p className="text-xs text-emerald-600">
                        Active now
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4">
                  <div className="mx-auto flex max-w-xl flex-col gap-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === "doctor"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                            msg.sender === "doctor"
                              ? "bg-teal-500 text-white rounded-br-sm"
                              : "bg-white text-slate-900 rounded-bl-sm"
                          }`}
                        >
                          <p>{msg.message}</p>
                          <p
                            className={`mt-1 text-[11px] ${
                              msg.sender === "doctor"
                                ? "text-teal-100"
                                : "text-slate-400"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-white px-4 py-3">
                  <div className="mx-auto flex max-w-xl gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="text-sm"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-teal-500 hover:bg-teal-600"
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
