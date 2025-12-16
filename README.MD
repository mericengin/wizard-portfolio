# 🧙‍♂️ Kaya's Interactive Wizard Portfolio

> A gamified 2D portfolio built with JavaScript and Kaboom.js.
> **[Play the Live Demo Here](https://mericengin.github.io/wizard-portfolio/)**

## 📖 About
This project transforms a traditional CV into an interactive RPG experience. Instead of scrolling through text, recruiters play as a **Wizard**, exploring a pixel-art world to discover my Work Experience, Education, and Skills.

It features a custom "Terminal" UI for reading content, an NPC Robot companion, and atmospheric 8-bit music.

## ✨ Features
* **Interactive Exploration:** Walk into glowing "Orbs" to reveal specific CV sections.
* **NPC Companion:** A robot entity that shares random facts about Natural Language Processing (NLP) and my background.
* **Audio System:** Ambient background music with a toggleable Mute button.
* **"Recruiter Mode":** Includes a prominent button to download the static PDF resume instantly.
* **Visual Juice:** Particle effects, camera smoothing, and idle animations.

## 🎮 Controls
| Key | Action |
| :--- | :--- |
| **Arrow Keys** | Move Character |
| **Esc** | Close Pop-up Windows |
| **Click / Tap** | Toggle Music |

## 🛠️ Built With
* **[Kaboom.js](https://kaboomjs.com/)** - Lightweight JavaScript Game Library
* **HTML5 / CSS3** - For the UI overlay and Terminal modals
* **JavaScript (ES6)** - Game logic and state management

## 🚀 How to Run Locally
Because this project uses ES Modules and external assets, you cannot simply double-click `index.html`. You must run it on a local server to avoid CORS errors.

### Option 1: Python (Easiest)
1.  Clone the repository:
    ```bash
    git clone [https://github.com/mericengin/wizard-portfolio.git](https://github.com/mericengin/wizard-portfolio.git)
    cd wizard-portfolio
    ```
2.  Start a simple HTTP server:
    ```bash
    python3 -m http.server
    ```
3.  Open your browser and go to `http://localhost:8000`.

### Option 2: VS Code
1.  Install the **"Live Server"** extension.
2.  Right-click `index.html` and select **"Open with Live Server"**.

## 📂 Project Structure
```text
/wizard-portfolio
├── assets/
│   └── wizard-final.png  # Character Sprite
├── index.html            # Main entry point & UI
├── style.css             # Styling for the "Terminal" pop-ups
├── game.js               # Game logic, NPC behavior, and Data
├── music.mp3             # Background track
└── resume.pdf            # Static CV file