# 🎨 Xframe — Turn X (Twitter) Posts into Shareable Posters

**Xframe** is a full-stack web app that transforms X (formerly Twitter) posts into beautiful, downloadable posters using stylish templates.

---

## 🚀 Project Summary

- Paste an X post link
- App extracts content (username, profile pic, text, post image)
- Choose from sleek poster templates
- Download or share your design

---

## 🧱 Tech Stack

| Layer       | Tech                                  |
|------------|----------------------------------------|
| Frontend   | React (Vite) + Tailwind CSS / shadcn   |
| Poster Gen | `html2canvas` or `dom-to-image`        |
| Backend    | Node.js + Express.js                   |
| Database   | MongoDB Atlas (optional for templates) |
| Deployment | Vercel (frontend), Render (backend)    |

---

## 📅 4-Week Development Plan

### ✅ Week 1: Planning, Setup & Design

**Goal:** Lay the foundation for frontend/backend, finalize UI/UX, and simulate content parsing.

#### 🔧 Tasks
- [ ] Create GitHub repo with README and project goals
- [ ] Set up basic tech stack:
  - Vite + React + Tailwind or shadcn
  - Node.js + Express backend
  - MongoDB Atlas (optional)
- [ ] Create UI mockups (Figma or pen-paper):
  - Landing page (paste link)
  - Poster preview area
  - Template selector
- [ ] Simulate X post data:
```js
{
  username: "thisisparth",
  profilePic: "https://...",
  postText: "Believe in the process",
  postImage: "https://..."
}
```
- [ ] Build basic frontend components:
  - Navbar
  - FormInput
  - TemplateCard

---

### ✅ Week 2: Poster Generator MVP

**Goal:** Core poster generation using `html2canvas` or `dom-to-image`.

#### 🔧 Tasks
- [ ] Build Poster component with layout:
  - Profile pic + text + post image
  - Mobile/Desktop responsive
- [ ] Add 2–3 predefined poster templates
- [ ] Add Download button → Save as PNG
- [ ] Add fonts, shadows, gradients for visual appeal

> ⚠️ Don’t overbuild templates — start with a few polished options.

---

### ✅ Week 3: Backend Integration + Template System

**Goal:** Add backend support for template saving and management.

#### 🔧 Tasks
- [ ] Set up Express backend
- [ ] Create backend APIs:
  - `GET /templates` → return available templates
  - `POST /designs` → save generated posters
- [ ] Connect frontend to backend via Axios
- [ ] (Optional) Add basic login/signup

---

### ✅ Week 4: Polish, Deploy, Document

**Goal:** Finalize UI, deploy, and prepare project for showcase.

#### 🔧 Tasks
- [ ] Add loading states and error handling
- [ ] Polish mobile responsiveness
- [ ] Deploy:
  - Frontend → Vercel
  - Backend → Render or Railway
- [ ] Create demo video using Loom/Screenity
- [ ] Write documentation:
  - Features
  - Tech stack
  - How to run locally
- [ ] Prepare 1-page summary PDF for college presentation

---

## ✨ Future Ideas (Bonus)
- Auto-detect dominant colors from post image
- Real X post scraping using Puppeteer
- Template builder for custom drag-and-drop designs

---

## 📣 Author
Made with ❤️ by Parth Mangire  
