# Mini-Game Implementation Example

## Code Debug Mini-Game (js/miniGames.js)

Here's a simple implementation of the programming skill mini-game:

```javascript
class MiniGameManager {
    constructor() {
        this.currentGame = null;
        this.gameContainer = null;
    }
    
    startCodeDebugGame() {
        this.gameContainer = document.getElementById('minigames');
        this.currentGame = new CodeDebugGame();
        this.currentGame.start();
    }
    
    endGame(skillType, pointsEarned) {
        // Add skill points to player
        window.gameState.player.skills[skillType] += pointsEarned;
        
        // Show results
        alert(`Game Over! You earned ${pointsEarned} ${skillType} skill points!`);
        
        // Return to skills menu
        this.showSkillsMenu();
    }
    
    showSkillsMenu() {
        const container = document.getElementById('minigames');
        container.innerHTML = `
            <h2>🎮 Skill Training</h2>
            <div class="skills-grid">
                <div class="skill-card">
                    <h3>💻 Programming: ${window.gameState.player.skills.programming}</h3>
                    <p>Debug code to improve your programming skills</p>
                    <button class="action-btn" onclick="window.miniGameManager.startCodeDebugGame()">
                        Play Code Debug
                    </button>
                </div>
                
                <div class="skill-card">
                    <h3>📊 Marketing: ${window.gameState.player.skills.marketing}</h3>
                    <p>Create compelling pitches</p>
                    <button class="action-btn disabled">Coming Soon</button>
                </div>
                
                <div class="skill-card">
                    <h3>💰 Finance: ${window.gameState.player.skills.finance}</h3>
                    <p>Balance budgets and analyze investments</p>
                    <button class="action-btn disabled">Coming Soon</button>
                </div>
            </div>
        `;
    }
}

class CodeDebugGame {
    constructor() {
        this.timeLeft = 30;
        this.score = 0;
        this.currentBug = null;
        this.gameActive = false;
        
        this.bugs = [
            {
                code: "function addNumbers(a, b) {\n  return a + b\n}",
                problem: "Missing semicolon",
                solution: "function addNumbers(a, b) {\n  return a + b;\n}"
            },
            {
                code: "let items = [1, 2, 3];\nfor (i = 0; i < items.length; i++) {\n  console.log(items[i]);\n}",
                problem: "Variable 'i' not declared",
                solution: "let items = [1, 2, 3];\nfor (let i = 0; i < items.length; i++) {\n  console.log(items[i]);\n}"
            },
            {
                code: "if (user.age = 18) {\n  console.log('Adult');\n}",
                problem: "Assignment instead of comparison",
                solution: "if (user.age === 18) {\n  console.log('Adult');\n}"
            },
            {
                code: "const numbers = [1, 2, 3];\nnumbers.push(4);\nnumbers = [5, 6, 7];",
                problem: "Cannot reassign const variable",
                solution: "let numbers = [1, 2, 3];\nnumbers.push(4);\nnumbers = [5, 6, 7];"
            },
            {
                code: "function greeting(name) {\n  return 'Hello ' + name\n}\ngreeting();",
                problem: "Missing argument in function call",
                solution: "function greeting(name) {\n  return 'Hello ' + name;\n}\ngreeting('World');"
            }
        ];
    }
    
    start() {
        this.gameActive = true;
        this.presentBug();
        this.startTimer();
    }
    
    presentBug() {
        this.currentBug = this.bugs[Math.floor(Math.random() * this.bugs.length)];
        
        const gameHTML = `
            <div id="debug-game">
                <div class="game-header">
                    <h3>🐛 Debug the Code!</h3>
                    <div class="game-stats">
                        <span>⏱️ Time: <span id="timer">${this.timeLeft}</span>s</span>
                        <span>🏆 Score: <span id="score">${this.score}</span></span>
                    </div>
                </div>
                
                <div class="code-section">
                    <h4>Buggy Code:</h4>
                    <pre class="code-block buggy">${this.currentBug.code}</pre>
                    <p class="problem-hint">🔍 Problem: ${this.currentBug.problem}</p>
                </div>
                
                <div class="solution-section">
                    <h4>Your Fix:</h4>
                    <textarea id="code-input" placeholder="Type the corrected code here...">${this.currentBug.code}</textarea>
                    <button id="submit-fix" class="action-btn" onclick="window.currentDebugGame.submitFix()">
                        Submit Fix
                    </button>
                </div>
                
                <button class="back-btn" onclick="window.miniGameManager.endGame('programming', ${this.score})">
                    End Game
                </button>
            </div>
        `;
        
        document.getElementById('minigames').innerHTML = gameHTML;
        window.currentDebugGame = this;
    }
    
    submitFix() {
        if (!this.gameActive) return;
        
        const userCode = document.getElementById('code-input').value.trim();
        const correctCode = this.currentBug.solution.trim();
        
        if (userCode === correctCode) {
            this.score += 10;
            this.showFeedback("✅ Correct! Bug fixed!", "success");
            
            setTimeout(() => {
                if (this.gameActive) {
                    this.presentBug();
                }
            }, 1500);
        } else {
            this.showFeedback("❌ Not quite right. Try again!", "error");
        }
        
        document.getElementById('score').textContent = this.score;
    }
    
    showFeedback(message, type) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback ${type}`;
        feedbackDiv.textContent = message;
        
        const gameContainer = document.getElementById('debug-game');
        gameContainer.appendChild(feedbackDiv);
        
        setTimeout(() => {
            if (feedbackDiv.parentNode) {
                feedbackDiv.parentNode.removeChild(feedbackDiv);
            }
        }, 1500);
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            
            const timerElement = document.getElementById('timer');
            if (timerElement) {
                timerElement.textContent = this.timeLeft;
            }
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        const skillPoints = Math.floor(this.score / 5); // 1 skill point per 5 points scored
        window.miniGameManager.endGame('programming', skillPoints);
    }
}

// Initialize mini-game manager
window.miniGameManager = new MiniGameManager();
```

## Additional CSS for Mini-Games (add to main.css)

```css
/* Mini-game specific styles */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.skill-card {
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid #00ff00;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.skill-card h3 {
    color: #00ffff;
    margin-bottom: 10px;
}

.skill-card p {
    margin: 10px 0;
    font-size: 14px;
    color: #cccccc;
}

#debug-game {
    max-width: 800px;
    margin: 0 auto;
}

.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #00ff00;
}

.game-stats {
    display: flex;
    gap: 20px;
    font-size: 14px;
}

.code-section, .solution-section {
    margin: 20px 0;
}

.code-block {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #00ff00;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.4;
}

.code-block.buggy {
    border-color: #ff6600;
    background: rgba(255, 102, 0, 0.1);
}

.problem-hint {
    color: #ff9900;
    font-style: italic;
    margin: 10px 0;
}

#code-input {
    width: 100%;
    height: 150px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid #00ff00;
    color: #00ff00;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    border-radius: 5px;
    resize: vertical;
}

#code-input:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 40px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
    z-index: 1000;
    animation: fadeInOut 1.5s ease-in-out;
}

.feedback.success {
    background: rgba(0, 255, 0, 0.9);
    color: black;
    border: 2px solid #00aa00;
}

.feedback.error {
    background: rgba(255, 102, 0, 0.9);
    color: black;
    border: 2px solid #cc6600;
}

@keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
}

.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #666 !important;
}

.disabled:hover {
    transform: none !important;
    background: #666 !important;
}
```

## Integration Steps

1. **Add the mini-games script** to your HTML:
```html
<script src="js/miniGames.js"></script>
```

2. **Update the showPanel function** in main.js:
```javascript
function showPanel(panelName) {
    // Hide all panels
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected panel
    document.getElementById(panelName).classList.add('active');
    
    // Update panel content
    if (panelName === 'stocks') {
        window.stockMarket.renderStockList();
    } else if (panelName === 'minigames') {
        window.miniGameManager.showSkillsMenu();
    }
}
```

3. **Test the mini-game**:
   - Click "Skills" button in main dashboard
   - Click "Play Code Debug"
   - Try fixing the code snippets
   - Watch your programming skill points increase!

## Next Mini-Game Ideas

**Marketing Pitch Game:**
- Match product features to customer benefits
- Multiple choice questions with time pressure
- Score based on speed and accuracy

**Budget Balance Game:**
- Simple math equations
- Balance income vs expenses
- Increasing difficulty with larger numbers

This mini-game system provides:
- ✅ Skill progression mechanics
- ✅ Engaging gameplay break from main systems
- ✅ Easy to extend with more games
- ✅ Immediate feedback and rewards
- ✅ Timer-based challenge system

The modular design makes it easy to add more mini-games later while keeping the code organized and maintainable!