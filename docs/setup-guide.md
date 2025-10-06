# Life Stocks 2001 - Complete Development Setup Guide

Welcome to your first programming project! Let's set up a professional development environment that will help you learn while building your game. 🚀

## 🎯 What We're Setting Up

1. **VS Code** - Your main coding environment
2. **WSL (Windows Subsystem for Linux)** - Linux environment on Windows
3. **Git & GitHub** - Version control and code backup
4. **AI Coding Assistant** - Perplexity/CodeGPT for help
5. **Project Structure** - Organized folder setup

---

## 📋 Prerequisites Check

Before we start, make sure you have:
- ✅ Windows 10/11 (Build 19041 or higher)
- ✅ VS Code installed ([Download here](https://code.visualstudio.com/))
- ✅ Internet connection
- ✅ Admin rights on your computer

---

## 🔧 Step 1: Enable WSL and Install Ubuntu

WSL lets you run Linux on Windows, which is perfect for web development!

### Enable WSL
1. **Open PowerShell as Administrator**
   - Press `Windows + X`, select "Windows PowerShell (Admin)"

2. **Run the installation command:**
   ```powershell
   wsl --install
   ```

3. **Restart your computer** when prompted

4. **After restart, install Ubuntu 22.04:**
   ```powershell
   wsl --install -d Ubuntu-22.04
   ```

5. **Set up your Ubuntu user:**
   - When prompted, create a username (lowercase, no spaces)
   - Create a password (you won't see it as you type)

### Test WSL Installation
```bash
# In Ubuntu terminal, check version
lsb_release -a

# Update packages
sudo apt update && sudo apt upgrade -y
```

---

## 🎨 Step 2: Configure VS Code for WSL Development

### Install Essential VS Code Extensions

1. **Open VS Code**
2. **Go to Extensions** (`Ctrl + Shift + X`)
3. **Install these extensions:**

   **Essential for Development:**
   - `Remote Development` (by Microsoft) - Work with WSL/containers
   - `WSL` (by Microsoft) - WSL integration
   - `Live Server` (by Ritwick Dey) - Local web server
   - `Prettier` (by Prettier) - Code formatting
   - `Auto Rename Tag` (by Jun Han) - HTML tag editing

   **Git & GitHub:**
   - `GitHub Pull Requests and Issues` (by GitHub) - GitHub integration
   - `GitLens` (by GitKraken) - Enhanced Git features
   - `Git Graph` (by mhutchie) - Visual Git history

   **Web Development:**
   - `HTML CSS Support` (by ecmel) - Better HTML/CSS
   - `JavaScript (ES6) code snippets` (by charalampos karypidis)
   - `Bracket Pair Colorizer 2` (by CoenraadS) - Colorful brackets

### Connect VS Code to WSL

1. **Open Ubuntu terminal** (from Windows Start menu)
2. **Navigate to your desired project location:**
   ```bash
   cd ~
   mkdir projects
   cd projects
   ```

3. **Launch VS Code from WSL:**
   ```bash
   code .
   ```

4. **You'll see "Installing VS Code Server"** - this is normal!
5. **Look for "WSL: Ubuntu-22.04"** in the bottom-left corner of VS Code

---

## 🐙 Step 3: Set Up Git and GitHub

### Configure Git in WSL
```bash
# Set your identity (use your real name and GitHub email)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Set VS Code as default editor
git config --global core.editor "code --wait"

# Check configuration
git config --list
```

### Create GitHub Account & Repository

1. **Go to [GitHub.com](https://github.com)**
2. **Create an account** (if you don't have one)
3. **Click "New Repository"**
4. **Repository settings:**
   - Name: `life-stocks-2001`
   - Description: `A retro career simulation browser game`
   - ✅ Public
   - ✅ Add a README file
   - Add .gitignore: `Node`
   - License: `MIT`

### Connect VS Code to GitHub

1. **In VS Code, press `Ctrl + Shift + P`**
2. **Type:** `GitHub: Sign in`
3. **Follow the browser authentication**
4. **Return to VS Code when complete**

### Clone Your Repository

1. **In VS Code, press `Ctrl + Shift + P`**
2. **Type:** `Git: Clone`
3. **Select "Clone from GitHub"**
4. **Choose your `life-stocks-2001` repository**
5. **Select your projects folder** (`/home/yourusername/projects/`)
6. **Click "Open" when VS Code asks**

---

## 🤖 Step 4: Set Up AI Coding Assistant

You have two great options for AI assistance in VS Code:

### Option A: GitHub Copilot with Perplexity (Recommended)

**If you have GitHub Pro or want the best experience:**

1. **Install GitHub Copilot:**
   - Go to Extensions (`Ctrl + Shift + X`)
   - Search "GitHub Copilot"
   - Install both "GitHub Copilot" and "GitHub Copilot Chat"

2. **Add Perplexity Integration:**
   - Extensions → Search "PerplexityAI"
   - Install the official PerplexityAI extension
   - This works with GitHub Copilot to provide web search

3. **Authenticate:**
   - Press `Ctrl + Shift + P`
   - Type "GitHub Copilot: Sign In"
   - Follow the authentication process

4. **Usage:**
   - Type code and see suggestions appear
   - Use `@perplexityai` in Copilot Chat for web-backed answers
   - Press `Ctrl + I` for inline chat

### Option B: CodeGPT Extension (Free Alternative)

**If you want a free option with Perplexity:**

1. **Install CodeGPT Extension:**
   - Extensions → Search "CodeGPT"
   - Install "CodeGPT" by Daniel San

2. **Get Perplexity API Key:**
   - Visit [Perplexity.ai](https://www.perplexity.ai/)
   - Sign up for account
   - Go to Settings → API Keys
   - Create new API key

3. **Configure CodeGPT:**
   - In VS Code, go to Settings (`Ctrl + ,`)
   - Search "CodeGPT"
   - Set Provider to "Perplexity"
   - Enter your API key
   - Choose model (e.g., "pplx-7b-chat")

4. **Usage:**
   - Right-click code → "CodeGPT: Explain"
   - Press `Ctrl + Shift + P` → "CodeGPT: Ask"
   - Use the CodeGPT sidebar panel

---

## 📁 Step 5: Create Your Project Structure

### Set Up the Game Files

1. **In VS Code, create the following folder structure:**

```
life-stocks-2001/
├── README.md              (already exists)
├── index.html
├── css/
│   └── main.css
├── js/
│   ├── main.js
│   ├── gameState.js
│   ├── stockMarket.js
│   └── miniGames.js
├── assets/
│   ├── sounds/            (for future use)
│   └── images/            (for future use)
├── data/
│   └── gameData.js
└── docs/                  (for documentation)
```

2. **Create the folders and files:**
   - Right-click in Explorer → "New Folder"
   - Right-click in Explorer → "New File"

3. **Update your README.md:**
```markdown
# Life Stocks 2001 🚀📈

A retro-inspired career simulation browser game where you navigate professional life while managing finances, trading stocks, and building skills.

## 🎮 Game Features
- Career progression system
- Stock market trading
- Skill-building mini-games
- Monthly life simulation
- Retro 80s/90s aesthetic

## 🛠️ Tech Stack
- HTML5/CSS3/JavaScript
- Local Storage for saves
- Responsive design

## 🚀 Getting Started
1. Clone this repository
2. Open `index.html` in a browser
3. Start your financial journey!

## 📈 Development Progress
- [x] Project setup
- [ ] Basic game loop
- [ ] Stock market system
- [ ] Mini-games
- [ ] UI polish

---
*Built with ❤️ as a weekend learning project*
```

---

## 🧪 Step 6: Test Your Setup

### Create a Test File

1. **Create `test.html` in your project root:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Life Stocks 2001 - Setup Test</title>
    <style>
        body { 
            font-family: 'Courier New', monospace; 
            background: linear-gradient(45deg, #0a0a23, #1a1a3a);
            color: #00ff00;
            text-align: center;
            padding: 50px;
        }
        h1 { color: #00ffff; text-shadow: 0 0 10px #00ffff; }
    </style>
</head>
<body>
    <h1>🚀 LIFE STOCKS 2001 🚀</h1>
    <p>Setup successful! Ready to start coding.</p>
    <script>
        console.log("JavaScript is working!");
        alert("Welcome to your new development environment!");
    </script>
</body>
</html>
```

2. **Test Live Server:**
   - Right-click `test.html`
   - Select "Open with Live Server"
   - Your browser should open with the test page

3. **Test Git:**
   ```bash
   # In VS Code terminal (Ctrl + `)
   git add .
   git commit -m "Initial setup and test files"
   git push origin main
   ```

---

## 🎓 Step 7: Learning Resources & Next Steps

### Essential VS Code Shortcuts
- `Ctrl + Shift + P` - Command Palette
- `Ctrl + ` - Open Terminal
- `Ctrl + Shift + E` - Explorer
- `Ctrl + /` - Comment/Uncomment
- `Ctrl + D` - Select word (multi-cursor)
- `F12` - Go to definition
- `Ctrl + Shift + F` - Find in files

### Recommended Learning Path
1. **Start with HTML/CSS basics** - Mozilla MDN Web Docs
2. **Learn JavaScript fundamentals** - FreeCodeCamp
3. **Practice Git commands** - GitHub's Learning Lab
4. **Use your AI assistant** - Ask questions as you code!

### Project Development Flow
1. **Make small changes**
2. **Test frequently** (use Live Server)
3. **Commit often** (`git add . && git commit -m "description"`)
4. **Push to GitHub** (`git push`)
5. **Ask AI for help** when stuck

---

## 🆘 Troubleshooting

### WSL Issues
- **"WSL 2 requires an update"** → Download from Microsoft Store
- **Ubuntu won't start** → `wsl --shutdown` then restart
- **Permission denied** → Use `sudo` for system commands

### VS Code Issues
- **Extensions not working** → Reload window (`Ctrl + Shift + P` → "Reload Window")
- **WSL connection lost** → Click bottom-left corner → "Connect to WSL"
- **Git authentication** → Use GitHub Personal Access Tokens

### AI Assistant Issues
- **No suggestions** → Check internet connection and API keys
- **Wrong responses** → Be more specific in your questions
- **Rate limits** → Wait a few minutes between requests

---

## 🎉 You're Ready to Code!

Your development environment is now set up with:
- ✅ Professional code editor (VS Code)
- ✅ Linux development environment (WSL)
- ✅ Version control (Git/GitHub)
- ✅ AI coding assistant
- ✅ Live web server for testing

**Your next step:** Start building Life Stocks 2001 using the technical guide I provided earlier!

Remember:
- **Ask questions** - Use your AI assistant
- **Make mistakes** - That's how you learn
- **Have fun** - Programming should be enjoyable!
- **Take breaks** - Don't code for hours without stopping

Happy coding! 🚀✨

---

*This setup guide will grow with your project. Feel free to add notes and tips as you learn!*