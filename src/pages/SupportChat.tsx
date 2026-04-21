import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  from: "agent" | "rider";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: "m1",
    from: "agent",
    text: "Hi 👋 I'm your support agent. How can I help you today?",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

const SupportChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [
      ...prev,
      { id: `r-${Date.now()}`, from: "rider", text, time: now },
    ]);
    setInput("");
    // Placeholder agent response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          from: "agent",
          text: "Support will respond shortly. Thanks for your patience!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3 border-b border-border bg-card">
        <Link to="/support" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
          <Headphones className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">Support Agent</p>
          <p className="text-[11px] text-primary flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex ${m.from === "rider" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl ${
                m.from === "rider"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border text-foreground rounded-bl-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from === "rider" ? "opacity-70" : "text-muted-foreground"}`}>
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 pb-3 pt-2 border-t border-border bg-card safe-bottom">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") send();
            }}
            placeholder="Type a message…"
            className="flex-1 px-4 py-3 rounded-full bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="thumb-zone w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 active:animate-press"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;