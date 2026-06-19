import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1LV-g2H3yKs_6nbruF1TEbCoV34UX0jI",
  authDomain: "ksome-website.firebaseapp.com",
  projectId: "ksome-website",
  storageBucket: "ksome-website.appspot.com",
  messagingSenderId: "970299265208",
  appId: "1:970299265208:web:870e4de77e51e9032e644d"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── SIGNUP ──────────────────────────────────────────
function signup() {
  const email    = document.getElementById("email")?.value?.trim();
  const password = document.getElementById("password")?.value;
  const confirm  = document.getElementById("confirmPassword")?.value;
  const msg      = document.getElementById("msg");

  if (!email || !password || !confirm) {
    msg.style.color = "red";
    msg.textContent = "❌ Please fill in all fields.";
    return;
  }

  if (password !== confirm) {
    msg.style.color = "red";
    msg.textContent = "❌ Passwords do not match!";
    return;
  }

  if (password.length < 6) {
    msg.style.color = "red";
    msg.textContent = "❌ Password must be at least 6 characters.";
    return;
  }

  msg.style.color = "orange";
  msg.textContent = "⏳ Creating your account...";

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      msg.style.color = "green";
      msg.textContent = "✅ Account created! Redirecting to login...";
      setTimeout(() => { window.location = "login.html"; }, 1500);
    })
    .catch(error => {
      msg.style.color = "red";
      if (error.code === "auth/email-already-in-use") {
        msg.textContent = "❌ This email is already registered. Try logging in.";
      } else if (error.code === "auth/invalid-email") {
        msg.textContent = "❌ Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        msg.textContent = "❌ Password is too weak. Use at least 6 characters.";
      } else {
        msg.textContent = "❌ Error: " + error.message;
      }
    });
}

// ── LOGIN ───────────────────────────────────────────
function login() {
  const email    = document.getElementById("loginEmail")?.value?.trim();
  const password = document.getElementById("loginPassword")?.value;
  const msg      = document.getElementById("msg");

  if (!email || !password) {
    msg.style.color = "red";
    msg.textContent = "❌ Please enter your email and password.";
    return;
  }

  msg.style.color = "orange";
  msg.textContent = "⏳ Signing you in...";

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      msg.style.color = "green";
      msg.textContent = "✅ Login successful! Redirecting...";
      setTimeout(() => { window.location = "my-course.html"; }, 1000);
    })
    .catch(error => {
      msg.style.color = "red";
      if (error.code === "auth/user-not-found") {
        msg.textContent = "❌ No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        msg.textContent = "❌ Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        msg.textContent = "❌ Invalid email address.";
      } else if (error.code === "auth/too-many-requests") {
        msg.textContent = "❌ Too many attempts. Please try again later.";
      } else {
        msg.textContent = "❌ Error: " + error.message;
      }
    });
}

// ── LOGOUT ──────────────────────────────────────────
function logout() {
  signOut(auth).then(() => {
    window.location = "index.html";
  });
}

// Expose to global scope so onclick buttons can find them
window.signup  = signup;
window.login   = login;
window.logout  = logout;
