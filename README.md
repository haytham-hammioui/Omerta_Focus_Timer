# Omerta Focus Timer

Omerta Focus Timer is a distraction-free focus timer with an analog clock, configurable focus sessions, screen wake lock support, light and dark themes, and a dedicated fullscreen clock mode.

## Features

- 25, 45, and 60 minute focus presets
- Custom sessions from 1 to 999 minutes
- Start, pause, reset, and completion notification
- Optional screen wake lock while studying
- Light and dark mode with a saved preference
- Fullscreen clock mode using the button or the `F` key
- Small countdown shown in fullscreen only while a session is running

## Run locally

No build step or dependencies are required.

### Option 1: Open the file

Open `index.html` directly in a modern browser. Timer functionality works immediately; screen wake lock and fullscreen support may require a secure browser context depending on the browser.

### Option 2: Use a local server

From the project directory, run one of these commands:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

Alternatively, if Node.js is installed:

```bash
npx serve .
```

## Usage

1. Choose a preset or enter a custom number of minutes.
2. Select **Start** to begin the focus session.
3. Use **Keep Screen On** when you want to prevent the display from sleeping.
4. Select the fullscreen button, or press `F`, to focus on the clock.
5. Press `F` or `Esc` to leave fullscreen mode.

## Project structure

```text
index.html   Page structure
style.css    Layout, themes, and fullscreen presentation
app.js       Clock, timer, wake lock, theme, and fullscreen behavior
```

## Browser support

The app uses standard browser APIs and works best in current versions of Chrome, Edge, Firefox, and Safari. The Screen Wake Lock API is not available in every browser, but the rest of the timer remains usable when it is unavailable.