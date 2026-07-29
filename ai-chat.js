// ===== KSOME AI Chat Widget =====
// This talks to YOUR OWN backend server (not the AI provider directly).
// Your backend should accept a POST request and return a JSON reply.
// Update AI_ENDPOINT below to match your server's route.

const AI_ENDPOINT = "https://your-backend.example.com/api/ksome-ai"; // <-- change this

const aiBtn = document.getElementById("ksome-ai-btn");
const aiChat = document.getElementById("ksome-ai-chat");
const closeBtn = document.getElementById("close-ai");
const sendBtn = document.getElementById("send-ai");
const input = document.getElementById("user-message");
const messages = document.getElementById("ai-messages");

// Toggle chat open/closed
aiBtn.addEventListener("click", () => {
  aiChat.classList.toggle("hidden");
  if (!aiChat.classList.contains("hidden")) {
    input.focus();
  }
});

closeBtn.addEventListener("click", () => {
  aiChat.classList.add("hidden");
});

// Send on button click or Enter key
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "ai-message user" : "ai-message";
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // Show a temporary "typing" message
  const typingDiv = document.createElement("div");
  typingDiv.className = "ai-message";
  typingDiv.textContent = "…";
  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    // Expecting your backend to respond like: { "reply": "some text" }
    typingDiv.textContent = data.reply || "Sorry, I didn't get a response.";
  } catch (err) {
    console.error("KSOME AI error:", err);
    typingDiv.textContent = "⚠️ Couldn't reach the AI right now. Please try again later.";
  }
}
