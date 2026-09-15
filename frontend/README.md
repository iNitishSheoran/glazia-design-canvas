# Forme - Full-Stack Design Canvas

A modern, full-stack visual design canvas application built with the MERN stack and React Konva. Forme allows users to create, edit, save, and manage custom design projects with a highly interactive workspace.

**Live Frontend:** [View on Vercel](https://glazia-design-canvas.vercel.app) 
**Live Backend API:** [View on Render](https://glazia-design-canvas.onrender.com)

## 🌟 Features

* **Interactive Canvas:** Draw, resize, rotate, and drag shapes (Rectangles, Circles, Lines, Text) using React Konva.
* **Layer Management:** Bring shapes to the front or send them to the back of the canvas.
* **History Control:** Full Undo and Redo functionality.
* **Real-time Properties:** Edit colors, dimensions, coordinates, and typography via a dynamic properties panel.
* **Authentication:** Secure user login and registration using JWT (JSON Web Tokens).
* **Cloud Storage:** Autosave capabilities and permanent storage of canvases in MongoDB.
* **Export:** Instantly export your canvas designs as PNG files.

## 💻 Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, React Konva, Axios, Lucide React
* **Backend:** Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT), bcryptjs
* **Deployment:** Vercel (Frontend) & Render (Backend)

## 📂 Monorepo Structure

This project is organized as a monorepo:
* `/frontend` - Contains the Vite/React frontend application.
* `/backend` - Contains the Node/Express API and database models.

## 🚀 Quick Start (Run Locally)

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/glazia-design-canvas.git](https://github.com/YOUR_USERNAME/glazia-design-canvas.git)
cd glazia-design-canvas
