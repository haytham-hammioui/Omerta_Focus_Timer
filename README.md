# ⏱️ Omerta Focus Timer

A clean and distraction-free focus timer designed to help you stay focused while studying or working.

Omerta Focus Timer includes a real-time analog clock, customizable focus sessions, screen wake lock, light/dark themes, and a dedicated fullscreen clock mode.

## 🌐 Live Demo

Use Omerta Focus Timer directly in your browser:

**https://haytham-hammioui.github.io/Omerta_Focus_Timer/**

No installation is required.

## ✨ Features

- ⏱️ 25, 45, and 60 minute focus presets
- ⚙️ Custom focus sessions from 1 to 999 minutes
- ▶️ Start, pause, and reset controls
- 🔔 Focus session completion notification
- 💡 Keep Screen On using the Screen Wake Lock API
- 🌙 Light and dark themes with saved preference
- 🕐 Real-time analog clock
- ⛶ Dedicated fullscreen clock mode
- ⌨️ Press `F` to enter or leave fullscreen mode
- 📱 Responsive design for different screen sizes
- 🌐 Runs entirely in the browser
- 🚫 No dependencies or frameworks

## 🚀 Usage

1. Open the [live website](https://haytham-hammioui.github.io/Omerta_Focus_Timer/).
2. Choose `25`, `45`, `60`, or enter a custom number of minutes.
3. Select **Start** to begin your focus session.
4. Enable **Keep Screen On** if you don't want your display to sleep.
5. Use the **fullscreen button** or press `F` to focus on the analog clock.
6. Press `F` or `Esc` to leave fullscreen mode.

## 💻 Run Locally

No build process or dependencies are required.

### Option 1 — Open directly

```bash
git clone https://github.com/haytham-hammioui/Omerta_Focus_Timer.git
cd Omerta_Focus_Timer
```

Then open `index.html` in a modern browser.

> Some browser features, especially Screen Wake Lock, may require a secure context.

### Option 2 — Local server

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

Alternatively, with Node.js:

```bash
npx serve .
```

## 📁 Project Structure

```text
Omerta_Focus_Timer/
├── index.html
├── style.css
├── app.js
├── README.md
└── LICENSE
```

## 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Screen Wake Lock API
- Fullscreen API

No frameworks or external dependencies are required.

## 🌍 Browser Support

Designed for modern versions of Chrome, Edge, Firefox, and Safari.

Screen Wake Lock availability depends on browser support.

---

