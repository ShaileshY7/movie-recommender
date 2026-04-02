# 🎬 CineMatch – AI-Powered Movie Recommender System

## 🚀 Overview

CineMatch is a **full-stack AI-powered movie recommendation system** that helps users discover movies based on their interests.
It provides intelligent recommendations using Machine Learning, allows users to manage their favorites, and watch trailers directly inside the app.

---

## ✨ Features

* 🔐 User Authentication (Register / Login)
* 🔍 Smart Movie Search
* 🤖 AI-based Movie Recommendations
* ❤️ Add / Remove Movies from Favorites
* 🎬 Watch Movie Trailers (YouTube Integration)
* 🌗 Dark / Light Mode Toggle
* 🔥 Trending Movies Section

---

## 🧠 Machine Learning Model

This project uses a **content-based filtering approach** to recommend movies based on similarity between movie features.

### 🔍 How it works:

* Extracts important features like **genres, keywords, cast, and movie metadata**
* Combines these features into a single text representation
* Converts data into numerical vectors using **CountVectorizer / TF-IDF**
* Computes similarity between movies using **cosine similarity**
* Returns the **top similar movies** based on user search

### ⚙️ ML Tools & Libraries:

* Python
* Pandas
* NumPy
* Scikit-learn
* Cosine Similarity

### 📊 Model Pipeline:

Data Collection → Preprocessing → Feature Engineering → Vectorization → Similarity Matrix → Recommendation

### 🎯 Key Highlight:

* The model is **trained on movie metadata** to generate real-time recommendations
* Efficient and fast recommendation using precomputed similarity matrix

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **ML API:** Flask (Python)
* **Database:** MongoDB

---

## 📂 Project Structure

```id="qz07ym"
movie-recommender/
├── frontend/
├── backend/
├── flask-api/
```

---

## ⚙️ How to Run Locally

### 1️⃣ Backend Setup

cd backend
npm install
npm run dev

---

### 2️⃣ ML API (Flask)

cd flask-api
venv\scripts\activate
python app.py


---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

---

## 🔗 Application Flow

Frontend → Backend → Flask ML API → Recommendations → UI

---

## 📸 Screenshots

### 🎯 Features Overview

![Features](frontend/src/assets/hero.png)

### 🏠 Landing Page

![Landing Page](https://github.com/user-attachments/assets/92ce0269-b42a-4013-b6cd-a703d3cfb499)

### 🔍 Search & Recommendations

![Search](https://github.com/user-attachments/assets/f172cfe5-83c6-4f97-a3f2-28a258d7a83c)

### ❤️ Favorites Page

![Favorites](https://github.com/user-attachments/assets/e5af384b-64a0-441f-93a6-82b3444a1879)

---

## 🌐 Live Demo

🚧 Coming Soon (Deployment in progress)

---

## 🎯 Why This Project?

This project demonstrates:

* Full-stack development (React + Node.js + MongoDB)
* Integration of Machine Learning with web applications
* Real-world recommendation system design
* API communication between multiple services

---

## 💡 Future Improvements

* Personalized recommendations based on user history
* Advanced ML models (Collaborative Filtering)
* Mobile responsiveness improvements
* Social sharing features

---

## 👨‍💻 Author

**Shailesh Yadav**
Full Stack Developer | AI Enthusiast

---

## ⭐ Support

If you like this project:

* ⭐ Star this repository
* 🍴 Fork it
* 📢 Share it

---

## 🧠 What I Learned

* Building full-stack applications (React + Node.js)
* Integrating Machine Learning with web apps
* REST API design & communication
* Authentication & state management
* Real-world project structuring

---
