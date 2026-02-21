(function () {
  const messagesEl = document.getElementById("messages");
  const inputEl = document.getElementById("msgInput");
  const btnSend = document.getElementById("btnSend");
  const btnLogout = document.getElementById("btnLogout");
  const whoamiEl = document.getElementById("whoami");
  const netText = document.getElementById("netText");
  const netDot = document.getElementById("netDot");
  const chatError = document.getElementById("chatError");
  const membersListEl = document.getElementById("membersList");
  const onlineCountEl = document.getElementById("onlineCount");

  const RAW_API = window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL ? window.APP_CONFIG.API_BASE_URL : "";
  const API = String(RAW_API).replace(/\/$/, ""); // rapihin biar gak double //

  function showChatError(msg) {
    chatError.textContent = msg;
    chatError.classList.remove("hidden");
  }
  function clearChatError() {
    chatError.textContent = "";
    chatError.classList.add("hidden");
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatTime(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  }

  function setNet(online) {
    netText.textContent = online ? "Online" : "Offline";
    netDot.style.background = online ? "var(--online)" : "var(--offline)";
  }

  if (!window.Auth || typeof Auth.requireAuth !== "function") {
    showChatError("auth.js belum tersedia. Pastikan file js/auth.js sudah dibuat (tugas Cath).");
    return;
  }
  Auth.requireAuth("login.html");

  // Ambil user login
  let currentUser = null;
  try {
    currentUser = Auth.getUser ? Auth.getUser() : null;
  } catch {}

  const username = currentUser && currentUser.username ? String(currentUser.username) : "-";
  whoamiEl.textContent = username;

  // Sidebar anggota (statis untuk UI, bisa dikembangkan nanti)
  const MEMBERS = ["catherine", "ibnu", "shafira", "shinta"];

  function renderMembers() {
    const lower = String(username || "").toLowerCase();
    let onlineCount = 0;

    const html = MEMBERS.map((name) => {
      const isOnline = name === lower; // yang login dianggap online
      if (isOnline) onlineCount++;

      return `
        <div class="member ${isOnline ? "member--online" : ""}">
          <div class="member-left">
            <span class="member-dot"></span>
            <div>
              <div class="member-name">${escapeHtml(name)}</div>
              <div class="member-sub">${isOnline ? "online" : "last seen:"}</div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    membersListEl.innerHTML = html;
    onlineCountEl.textContent = String(onlineCount);
  }

  renderMembers();

  let lastRenderedHash = "";
  let isFetching = false;

  async function fetchMessages() {
    if (isFetching) return;
    isFetching = true;
    clearChatError();

    try {
      const headers = Object.assign(
        { "Content-Type": "application/json" },
        Auth.buildAuthHeaders ? Auth.buildAuthHeaders() : {}
      );

      const res = await fetch(`${API}/api/chat/get-messages`, { headers });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengambil pesan.");
      }

      setNet(true);

      const msgs = Array.isArray(data.data) ? data.data : [];
      msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      // Render hanya kalau berubah (biar tidak flicker)
      const hash = JSON.stringify(msgs.map((m) => [m.id, m.sender, m.text, m.timestamp]));
      if (hash !== lastRenderedHash) {
        lastRenderedHash = hash;
        renderMessages(msgs);
      }
    } catch {
      setNet(false);
      showChatError("Gagal mengambil pesan. Periksa koneksi atau pastikan backend berjalan.");
    } finally {
      isFetching = false;
    }
  }

  function renderMessages(msgs) {
    const html = msgs
      .map((m) => {
        const sender = escapeHtml(m.sender ?? "Anonymous");
        const time = escapeHtml(formatTime(m.timestamp));
        const text = escapeHtml(m.text ?? "");

        return `
          <article class="msg">
            <div class="msg-head">
              <div class="msg-sender">${sender}</div>
              <div class="msg-time">${time}</div>
            </div>
            <div class="msg-text">${text}</div>
          </article>
        `;
      })
      .join("");

    messagesEl.innerHTML = html;
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage() {
    const text = (inputEl.value || "").trim();
    if (!text) return;

    btnSend.disabled = true;
    clearChatError();

    try {
      const headers = Object.assign(
        { "Content-Type": "application/json" },
        Auth.buildAuthHeaders ? Auth.buildAuthHeaders() : {}
      );

      const res = await fetch(`${API}/api/chat/send-message`, {
        method: "POST",
        headers,
        body: JSON.stringify({ text }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengirim pesan.");
      }

      inputEl.value = "";
      await fetchMessages();
    } catch {
      showChatError("Gagal mengirim pesan. Periksa koneksi atau autentikasi.");
    } finally {
      btnSend.disabled = false;
      inputEl.focus();
    }
  }

  btnSend.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  btnLogout.addEventListener("click", async () => {
    btnLogout.disabled = true;
    clearChatError();

    try {
      const headers = Object.assign(
        { "Content-Type": "application/json" },
        Auth.buildAuthHeaders ? Auth.buildAuthHeaders() : {}
      );
      await fetch(`${API}/api/auth/logout`, { method: "POST", headers }).catch(() => {});
    } finally {
      if (Auth.clearSession) Auth.clearSession();
      window.location.href = "login.html";
    }
  });

  // Polling 2 detik
  fetchMessages();
  setInterval(fetchMessages, 2000);
})();
