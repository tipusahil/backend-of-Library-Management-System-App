<!-- তুমি যেভাবে বিস্তারিতভাবে assignment টা তুলে ধরেছো, সেটা অনেক ভালো। এটা করলে তুমি **React + Redux Toolkit Query + TypeScript + Express.js + MongoDB** ecosystem-এ solid একটি production-level mini project করতে পারবে। নিচে ধাপে ধাপে *কীভাবে শুরু করবে, কোন অংশ আগে করবে, কোন structure ফলো করবে,* তার পুরো গাইড দিলাম।

- assigment + ei prompt ta diye soution ber kora.
    
     ei assignment ta ami kivabe korte pari? age ki banbano age kon part er kaj korbo? ar mvc pattern e korbo naki modular pattarn e korbo? structure kemon korle valo hobe, ekto guide korta hobe tomake 
    

---

## ✅ Step-by-Step Guide: Assignment সফলভাবে শেষ করতে

---

### 🧠 Phase 1: Planning (Day 1)

### 🔹 পড়া ও রিসার্চ:

- Assignment-এর প্রতিটি অংশ ভালোভাবে বোঝো।
- UI কেমন হবে সেটা কাগজে বা FigJam/Figma তে স্কেচ করে রাখো (নেভবার, বুক লিস্ট, ফর্ম, বোরো সামারি)।

### 🔹 Tech Stack নিশ্চিত করো:

- **Frontend**: React + TypeScript + Redux Toolkit + RTK Query + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + Mongoose

---

## 🏗️ Project Structure (Modular + MVC hybrid: সহজ + maintainable)

### 🔸 Backend Structure (modular with MVC touch) hybrid:

```
backend/
├── src/
│   ├── app.ts              ← Express setup
│   ├── server.ts           ← server listen
│   ├── config/             ← db config/env config
│   ├── modules/
│   │   ├── books/
│   │   │   ├── book.controller.ts
│   │   │   ├── book.model.ts
│   │   │   ├── book.route.ts
│   │   │   └── book.service.ts
│   │   ├── borrows/
│   │   │   ├── borrow.controller.ts
│   │   │   ├── borrow.model.ts
│   │   │   ├── borrow.route.ts
│   │   │   └── borrow.service.ts
│   └── utils/              ← error handler, response formatter
├── .env
└── package.json

```

### 🔸 Frontend Structure

```
frontend/
├── src/
│   ├── app/                ← redux store setup
│   ├── api/                ← RTK Query endpoints
│   ├── pages/
│   │   ├── books/
│   │   ├── create-book/
│   │   ├── edit-book/
│   │   ├── borrow/
│   │   └── borrow-summary/
│   ├── components/
│   ├── layout/             ← navbar/footer
│   ├── routes/             ← react-router
│   └── types/              ← shared TS types
└── package.json

```

---

## 🛠️ Phase 2: Backend Development (Day 2–3)

### ✅ প্রথমে Backend তৈরি করো কারণ Frontend depends on APIs.

1. **Book Model** তৈরি করো:

```
// book.model.ts
title: string;
author: string;
genre: string;
isbn: string;
description?: string;
copies: number;
available: boolean;

```

1. **CRUD APIs for book**:
    - `GET /books` — pagination সহ
    - `GET /books/:id`
    - `POST /books`
    - `PATCH /books/:id`
    - `DELETE /books/:id`
2. **Borrow Model + Logic**:
    - Validate: quantity ≤ available copies
    - Update book availability if quantity = 0
    - API: `POST /borrow`, `GET /borrow-summary` (aggregated)
3. **CORS + Error Handler Middleware যোগ করো**

---

## 🎨 Phase 3: Frontend Setup (Day 4–6)

### ✅ React + RTK Query + Tailwind প্রজেক্ট তৈরি করো:

1. `Vite + React + TypeScript` + Tailwind install করো
2. Redux Toolkit store setup করো

### ✅ RTK Query Setup

- Books API (`getBooks`, `getBook`, `createBook`, `updateBook`, `deleteBook`)
- Borrow API (`borrowBook`, `getBorrowSummary`)

---

## 💡 Phase 4: Build Pages (Day 6–10)

### 🔸 `/books` Page:

- Table view with all actions: Edit, Delete, Borrow

### 🔸 `/create-book` Page:

- Form with title, author, genre, isbn, etc.
- `onSubmit`: call `createBook` mutation

### 🔸 `/edit-book/:id` Page:

- Preload data and edit
- Handle update logic and validations

### 🔸 `/borrow/:id` Page:

- Form to borrow book (quantity, dueDate)
- Show toast on success

### 🔸 `/borrow-summary` Page:

- Show borrow stats with aggregation API

-------

## ✅ Bonus Features (For Full Marks):

| Feature | Implementation Hint |
| --- | --- |
| Optimistic UI | RTK Query → `updateQueryData` ব্যবহার করো |
| Toast Notifications | `react-hot-toast` বা `react-toastify` use করো |
| Responsive UI | Tailwind responsive classes ব্যবহার করো |
| Type-safe forms | `react-hook-form` + Zod or custom TypeScript |

---

## 🧪 Final Steps (Day 10–13)

1. **Testing করো**: সব route, form, API কাজ করে কি না
2. **README লেখো**: features, tech stack, how to run
3. **Deploy**:
    - Backend → `Render` / `Railway`
    - Frontend → `Netlify` / `Vercel`

---

## 🧠 Priority-based Task Breakdown

| Priority | Task | Notes |
| --- | --- | --- |
| 🥇 | Backend APIs Ready | Without this frontend stuck |
| 🥈 | Frontend Pages with RTK Query | Books, Create, Borrow etc |
| 🥉 | Styling + Toast + Final polish | Tailwind + UX |

---

## ✅ Tools Recommendation:

- **Backend**: Express, Mongoose, cors, dotenv
- **Frontend**: React, TypeScript, Vite, Tailwind, Redux Toolkit, React Router, Toastify, React Hook Form

---

## ✅ Deadline Planning:

| Day | Target |
| --- | --- |
| Jul 1-2 | Backend book + borrow API |
| Jul 3 | Frontend setup + navbar + routing |
| Jul 4 | Book list + Create + Borrow form |
| Jul 5 | Edit/Delete + Borrow Summary + polish |

---

## 💬 যদি Backend আগে থেকে থাকে?

- তখনো review করে check করো API ঠিক আছে কিনা
- নাহলে clone করে modify করো নতুন schema অনুযায়ী

---

### 🔚 শেষ কথা:

তুমি এই প্ল্যান অনুযায়ী চললে ৫ দিনের মধ্যে পুরা assignment শেষ করা সম্ভব।

তুমি চাইলে আমি:

- ✅ MongoDB Schema design করে দিতে পারি
- ✅ RTK Query boilerplate setup করে দিতে পারি
- ✅ Tailwind-ready basic UI skeleton বানিয়ে দিতে পারি

তোমার কোন অংশে হেল্প লাগবে বললেই আমি আলাদা করে করে দিচ্ছি।

**চলো, শুরু করি — Backend schema তৈরি থেকে! চাইলে সেটা এখনই বানিয়ে দেই।** -->