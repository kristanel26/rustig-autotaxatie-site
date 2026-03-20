import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/auto-assistent`;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hoi! Ik ben de AutoAssistent van Automobiel Taxaties. Waar kan ik je mee helpen?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => null);
        throw new Error(errorData?.error || "Er ging iets mis.");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const current = assistantSoFar;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: current } : m));
                }
                return [...prev, { role: "assistant", content: current }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Er ging iets mis. Probeer het opnieuw.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed z-[60] flex flex-col overflow-hidden"
          style={{
            bottom: 96,
            right: 24,
            width: 390,
            height: 620,
            maxHeight: "calc(100vh - 120px)",
            maxWidth: "calc(100vw - 32px)",
            borderRadius: 16,
            boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
            background: "#ffffff",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ background: "#1d3c71" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                AT
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AutoAssistent</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Automobiel Taxaties
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: "#ffffff" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] rounded-xl px-4 py-2.5 text-[14px] leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: "#1d3c71", color: "#ffffff", borderBottomRightRadius: 4 }
                      : { background: "#f7f8fa", color: "#1a1a1a", borderBottomLeftRadius: 4 }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div
                  className="rounded-xl px-4 py-3 flex items-center gap-1.5"
                  style={{ background: "#f7f8fa", borderBottomLeftRadius: 4 }}
                >
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="w-2 h-2 rounded-full inline-block"
                      style={{
                        background: "#9ca3af",
                        animation: "chatDotBounce 1.2s infinite",
                        animationDelay: `${dot * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="shrink-0 px-4 py-3 border-t" style={{ borderColor: "#eee" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Stel je vraag..."
                className="flex-1 px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: "#dde3ea",
                  focusRingColor: "#1d3c71",
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                style={{ background: "#ff751f" }}
                aria-label="Verstuur"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed z-[60] flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
        style={{
          bottom: 24,
          right: 24,
          width: 62,
          height: 62,
          borderRadius: "50%",
          background: "#1d3c71",
          boxShadow: "0 4px 16px rgba(29,60,113,0.35)",
        }}
        aria-label={open ? "Chat sluiten" : "Chat openen"}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span
              className="absolute flex items-center justify-center text-white text-[10px] font-bold"
              style={{
                top: -2,
                right: -2,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#ff751f",
                boxShadow: "0 2px 6px rgba(255,117,31,0.4)",
              }}
            >
              1
            </span>
          </>
        )}
      </button>

      {/* Bounce animation */}
      <style>{`
        @keyframes chatDotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;
