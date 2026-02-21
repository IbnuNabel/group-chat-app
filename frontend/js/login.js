(function () {
  const form = document.getElementById("loginForm");
  const errBox = document.getElementById("loginError");
  const btn = document.getElementById("btnLogin");
  const elUser = document.getElementById("username");
  const elPass = document.getElementById("password");
  const elRemember = document.getElementById("rememberMe");

  function showError(msg) {
    errBox.textContent = msg;
    errBox.classList.remove("hidden");
  }
  function clearError() {
    errBox.textContent = "";
    errBox.classList.add("hidden");
  }

  // Jika sudah punya token, langsung ke chat
  try {
    if (window.Auth && typeof Auth.getToken === "function" && Auth.getToken()) {
      window.location.href = "chat.html";
      return;
    }
  } catch (_) {}

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    const username = (elUser.value || "").trim();
    const password = (elPass.value || "").trim();

    if (!username || !password) {
      showError("Username dan password wajib diisi.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Memproses...";

    try {
      const API = String(window.APP_CONFIG.API_BASE_URL || "").replace(/\/$/, "");

      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        showError(data.message || "Login gagal.");
        return;
      }

      if (!window.Auth || typeof Auth.setSession !== "function") {
        showError("auth.js belum tersedia. Pastikan file js/auth.js sudah dibuat (tugas Cath).");
        return;
      }

      Auth.setSession({
        token: data.token,
        user: data.user,
        remember: !!elRemember.checked,
      });

      window.location.href = "chat.html";
    } catch (err) {
      showError("Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:5000.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Masuk";
    }
  });
})();