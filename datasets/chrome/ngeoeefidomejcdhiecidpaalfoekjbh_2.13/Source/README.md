# Capsule Hub by Tilantra

A powerful Chrome extension that allows you to capture, manage, and inject conversation context across multiple AI platforms. Seamlessly bridge your workflows between **ChatGPT**, **Google Gemini**, **Claude.ai**, and **DeepSeek**.

## ✨ Features

- 🧠 **Universal AI Bridge**: Seamlessly move context between **ChatGPT**, **Google Gemini**, **Claude.ai**, and **DeepSeek**.
- 📧 **Gmail Integration**: Capture context directy from your emails with a dedicated 💊 button, turning correspondence into AI prompts in seconds.
- 🔄 **Smart Versioning**: Automatically tracks conversation evolution. Choose to create a **New Capsule** or append a **New Version** to maintain a clean history of your prompts.
- 💊 **The Magic Drop**: A revolutionary Drag & Drop workflow. Pick up a capsule and drop it directly into any chat box with a custom visual indicator.
- 👥 **Team Contexts**: Organize capsules by Department (Engineering, Product, Marketing) and track contributions with `created_by` visibility.
- 🛡️ **Privacy & Cleaning**: Automatic masking of injection footprints to keep your conversations clean.
- 📎 **Rich Attachment Context**: Support for capturing and injecting **20+ file types**, including PDFs, Images, and source code (Java, Python, Shell, etc.).
- 🔍 **Library Management**: Lightning-fast search by tags or content summaries, featuring scroll indicators.
- 🔄 **Cross-Site Sync**: Seamless login synchronization between the Guidera website and the extension.

## 🗂 How It Works

1. **Capture**: Open any conversation or email. Click the **Generate Capsule** button.
2. **Generate / Version**: If you've used a capsule here before, choose to create a **New Version** to evolve the context or a **New Capsule** to start fresh.
3. **The Library**: Switch to your target AI platform and open **View Capsules**.
4. **The Magic Drop**: Search for your capsule and simply **Drag & Drop** the 💊 into the chat. 
5. **Execute**: The capsule "pops" open, injecting context instantly, ready for your next prompt.

## 🚀 Coming Next

- 💬 **Slack Integration**: Flow capsules directly from team conversations into AI chats.
- ⚡ **Dynamic Context**: Add context on-the-fly whenever needed during an active chat.
- 🎨 **Capsule Editor**: A dedicated UI for changing capsules and their content dynamically.

## 📂 Project Structure

- **`manifest.json`**: Extension configuration (MV3) with cross-platform host permissions.
- **`popup.js` / `popup.html`**: Enhanced UI logic featuring team filtering, search, and library management.
- **`background.js`**: Central service worker handling authentication and API communication.
- **`content.js`**: Platform-aware orchestration script.
- **`gmail-inserter.js`**: Specialized injector for Gmail context capture.
- **`gpt-inserter.js`**: Specialized injector for ChatGPT.
- **`gemini-inserter.js`**: UI automation for Gemini and AI Studio.
- **`claude-inserter.js`**: UI automation for Claude.ai.
- **`ds-inserter.js`**: UI automation for DeepSeek.

## 📦 Installation (Developer Mode)

1. Clone this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the project folder.

## 🔐 Backend Setup

The extension connects to the Tilantra Capsule API for summarization and storage. Ensure your `background.js` is configured with the correct environment.
