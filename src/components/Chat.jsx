const sendMessage = async () => {
  if (!input.trim()) return;

  // user message
  setMessages((prev) => [...prev, { role: "user", text: input }]);

  try {
    const res = await fetch(
      "https://ramkumar01234.app.n8n.cloud/webhook/ai-article-webhook",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          sessionId: sessionIdRef.current,
        }),
      }
    );

    const rawText = await res.text(); // IMPORTANT
    const data = rawText ? JSON.parse(rawText) : {};

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: data.article || "AI ka response mila, par empty tha",
      },
    ]);
  } catch (err) {
    console.error("Frontend error:", err);
    setMessages((prev) => [
      ...prev,
      { role: "ai", text: "Backend se response nahi aa pa raha" },
    ]);
  }

  setInput("");
};
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>
          🤖 AI Chatbot
        </h2>

        <div
          style={{
            height: "300px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "10px",
            backgroundColor: "#fafafa",
            marginBottom: "10px",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  maxWidth: "80%",
                  backgroundColor:
                    msg.role === "user" ? "#dbeafe" : "#e5e7eb",
                  color: "#111",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              color: "#000",
              backgroundColor: "#fff",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
