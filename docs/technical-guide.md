# LIFE-STOCKS-2001 - Technical Implementation Guide

## Quick Start Setup (30 minutes)

### 1. Project Setup
Create the following folder structure:
```
life-stocks-2001/
├── index.html
├── css/
│   └── main.css
├── js/
│   ├── main.js
│   ├── gameState.js
│   └── stockMarket.js
└── data/
    └── gameData.js
```

### 2. Basic HTML Structure (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STONKS-9800</title>
    <link rel="stylesheet" href="css/main.css">
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script>
</head>
<body>
    <div id="game-container">
        <div id="main-ui">
            <div id="stats-panel">
                <h2>📊 STATS</h2>
                <div id="cash">💰 Cash: $<span id="cash-amount">10000</span></div>
                <div id="income">📈 Monthly Income: $<span id="income-amount">3000</span></div>
                <div id="job">💼 Job: <span id="job-title">Junior Developer</span></div>
                <div id="month">📅 Month: <span id="current-month">1</span></div>
                <button id="next-month-btn" class="action-btn">⏭️ Next Month</button>
            </div>
            
            <div id="main-panel">
                <div id="dashboard" class="panel active">
                    <h1>🚀 STONKS-9800</h1>
                    <div class="action-grid">
                        <button class="action-btn" onclick="showPanel('stocks')">📈 Stocks</button>
                        <button class="action-btn" onclick="showPanel('job')">💼 Career</button>
                        <button class="action-btn" onclick="showPanel('assets')">🏠 Assets</button>
                        <button class="action-btn" onclick="showPanel('minigames')">🎮 Skills</button>
                    </div>
                </div>
                
                <div id="stocks" class="panel">
                    <h2>📈 Stock Market</h2>
                    <div id="stock-list"></div>
                    <button class="back-btn" onclick="showPanel('dashboard')">← Back</button>
                </div>
                
                <div id="job" class="panel">
                    <h2>💼 Career Center</h2>
                    <div id="job-info"></div>
                    <button class="back-btn" onclick="showPanel('dashboard')">← Back</button>
                </div>
                
                <div id="assets" class="panel">
                    <h2>🏠 Assets & Lifestyle</h2>
                    <div id="assets-list"></div>
                    <button class="back-btn" onclick="showPanel('dashboard')">← Back</button>
                </div>
                
                <div id="minigames" class="panel">
                    <h2>🎮 Skill Training</h2>
                    <div id="skills-info"></div>
                    <button class="back-btn" onclick="showPanel('dashboard')">← Back</button>
                </div>
            </div>
        </div>
    </div>
    
    <script src="js/gameState.js"></script>
    <script src="js/stockMarket.js"></script>
    <script src="data/gameData.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

### 3. Game State Management (js/gameState.js)
```javascript
class GameState {
    constructor() {
        this.player = {
            cash: 10000,
            monthlyIncome: 3000,
            monthlyExpenses: 2000,
            skills: {
                programming: 0,
                marketing: 0,
                finance: 0
            },
            jobTitle: "Junior Developer",
            jobLevel: 1,
            currentMonth: 1,
            stress: 0,
            happiness: 50,
            portfolio: {},
            assets: {
                housing: "studio",
                transport: "bus",
                equipment: "basic"
            }
        };
        
        this.loadGame();
    }
    
    saveGame() {
        localStorage.setItem('stonks9800_save', JSON.stringify(this.player));
    }
    
    loadGame() {
        const saved = localStorage.getItem('stonks9800_save');
        if (saved) {
            this.player = { ...this.player, ...JSON.parse(saved) };
        }
    }
    
    nextMonth() {
        // Calculate monthly changes
        this.player.cash += this.player.monthlyIncome - this.player.monthlyExpenses;
        this.player.currentMonth++;
        
        // Update stock prices
        if (window.stockMarket) {
            window.stockMarket.updatePrices();
        }
        
        // Random event chance
        if (Math.random() < 0.3) {
            this.triggerRandomEvent();
        }
        
        this.updateUI();
        this.saveGame();
    }
    
    triggerRandomEvent() {
        const events = [
            {
                title: "Market Volatility!",
                description: "Tech stocks are swinging wildly today!",
                effect: () => {
                    // More volatile stock movements this month
                    console.log("Market volatility increased!");
                }
            },
            {
                title: "Performance Review",
                description: "Your boss wants to see you...",
                effect: () => {
                    if (this.player.skills.programming > 10) {
                        this.player.monthlyIncome += 500;
                        alert("Promotion! Your salary increased by $500/month!");
                    }
                }
            }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        alert(`${event.title}\n${event.description}`);
        event.effect();
    }
    
    updateUI() {
        document.getElementById('cash-amount').textContent = this.player.cash;
        document.getElementById('income-amount').textContent = this.player.monthlyIncome;
        document.getElementById('job-title').textContent = this.player.jobTitle;
        document.getElementById('current-month').textContent = this.player.currentMonth;
    }
    
    buyStock(symbol, shares) {
        const stock = window.stockMarket.getStock(symbol);
        const cost = stock.price * shares;
        
        if (this.player.cash >= cost) {
            this.player.cash -= cost;
            this.player.portfolio[symbol] = (this.player.portfolio[symbol] || 0) + shares;
            this.updateUI();
            this.saveGame();
            return true;
        }
        return false;
    }
    
    sellStock(symbol, shares) {
        if (this.player.portfolio[symbol] >= shares) {
            const stock = window.stockMarket.getStock(symbol);
            const revenue = stock.price * shares;
            
            this.player.cash += revenue;
            this.player.portfolio[symbol] -= shares;
            if (this.player.portfolio[symbol] === 0) {
                delete this.player.portfolio[symbol];
            }
            
            this.updateUI();
            this.saveGame();
            return true;
        }
        return false;
    }
}
```

### 4. Stock Market System (js/stockMarket.js)
```javascript
class StockMarket {
    constructor() {
        this.stocks = {
            TFLOW: { name: "TechFlow", price: 150, trend: 0.02, volatility: 0.15 },
            GCORP: { name: "GameCorp", price: 85, trend: -0.01, volatility: 0.20 },
            CMAX: { name: "CloudMax", price: 220, trend: 0.05, volatility: 0.12 },
            AIFUT: { name: "AIFuture", price: 300, trend: 0.08, volatility: 0.25 },
            CNEXT: { name: "CryptoNext", price: 45, trend: -0.03, volatility: 0.30 }
        };
    }
    
    getStock(symbol) {
        return this.stocks[symbol];
    }
    
    updatePrices() {
        for (let symbol in this.stocks) {
            const stock = this.stocks[symbol];
            
            // Random walk with trend and volatility
            const change = stock.trend + (Math.random() - 0.5) * stock.volatility;
            stock.price = Math.max(1, stock.price * (1 + change));
            
            // Occasionally reverse trends
            if (Math.random() < 0.1) {
                stock.trend *= -1;
            }
        }
    }
    
    renderStockList() {
        const container = document.getElementById('stock-list');
        container.innerHTML = '';
        
        for (let symbol in this.stocks) {
            const stock = this.stocks[symbol];
            const owned = window.gameState.player.portfolio[symbol] || 0;
            
            const stockDiv = document.createElement('div');
            stockDiv.className = 'stock-item';
            stockDiv.innerHTML = `
                <div class="stock-header">
                    <strong>${symbol}</strong> - ${stock.name}
                    <span class="stock-price">$${stock.price.toFixed(2)}</span>
                </div>
                <div class="stock-actions">
                    Owned: ${owned} shares
                    <button onclick="buyStock('${symbol}', 1)" class="buy-btn">Buy 1</button>
                    <button onclick="sellStock('${symbol}', 1)" class="sell-btn" ${owned > 0 ? '' : 'disabled'}>Sell 1</button>
                </div>
            `;
            container.appendChild(stockDiv);
        }
    }
}

function buyStock(symbol, shares) {
    if (window.gameState.buyStock(symbol, shares)) {
        window.stockMarket.renderStockList();
        console.log(`Bought ${shares} shares of ${symbol}`);
    } else {
        alert("Not enough cash!");
    }
}

function sellStock(symbol, shares) {
    if (window.gameState.sellStock(symbol, shares)) {
        window.stockMarket.renderStockList();
        console.log(`Sold ${shares} shares of ${symbol}`);
    } else {
        alert("Not enough shares!");
    }
}
```

### 5. Main Game Logic (js/main.js)
```javascript
// Initialize game systems
window.gameState = new GameState();
window.stockMarket = new StockMarket();

// UI Navigation
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
    }
}

// Event handlers
document.getElementById('next-month-btn').addEventListener('click', () => {
    window.gameState.nextMonth();
});

// Initialize UI
window.gameState.updateUI();
```

### 6. Basic Styling (css/main.css)
```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Courier New', monospace;
    background: linear-gradient(45deg, #0a0a23, #1a1a3a);
    color: #00ff00;
    min-height: 100vh;
}

#game-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

#main-ui {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 20px;
    height: 80vh;
}

#stats-panel {
    background: rgba(0, 255, 0, 0.1);
    border: 2px solid #00ff00;
    padding: 20px;
    border-radius: 10px;
}

#stats-panel h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #00ffff;
}

#stats-panel > div {
    margin: 15px 0;
    font-size: 14px;
}

.panel {
    display: none;
    background: rgba(0, 255, 0, 0.05);
    border: 2px solid #00ff00;
    padding: 30px;
    border-radius: 10px;
    overflow-y: auto;
}

.panel.active {
    display: block;
}

.action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin: 30px 0;
}

.action-btn, .buy-btn, .sell-btn, .back-btn {
    background: linear-gradient(45deg, #00aa00, #00ff00);
    color: black;
    border: none;
    padding: 15px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-family: inherit;
    transition: all 0.3s ease;
}

.action-btn:hover, .buy-btn:hover, .sell-btn:hover {
    background: linear-gradient(45deg, #00ff00, #44ff44);
    transform: translateY(-2px);
}

.stock-item {
    background: rgba(0, 0, 0, 0.3);
    margin: 10px 0;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #00ff00;
}

.stock-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.stock-price {
    color: #00ffff;
    font-weight: bold;
}

.stock-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.buy-btn {
    background: linear-gradient(45deg, #0066cc, #0099ff);
    font-size: 12px;
    padding: 8px 15px;
}

.sell-btn {
    background: linear-gradient(45deg, #cc6600, #ff9900);
    font-size: 12px;
    padding: 8px 15px;
}

.sell-btn:disabled {
    background: #666;
    cursor: not-allowed;
}

.back-btn {
    background: linear-gradient(45deg, #666, #999);
    margin-top: 20px;
}

h1 {
    text-align: center;
    color: #00ffff;
    text-shadow: 0 0 10px #00ffff;
    font-size: 2.5em;
    margin-bottom: 30px;
}

h2 {
    color: #00ffff;
    margin-bottom: 20px;
}
```

## Quick Testing Checklist

After setting up the files above:

1. ✅ **Open index.html in browser** - Should see retro-styled dashboard
2. ✅ **Click "Stocks" button** - Should show 5 companies with buy/sell options
3. ✅ **Buy a stock** - Cash should decrease, owned shares should increase
4. ✅ **Click "Next Month"** - Income should be added, stock prices should change
5. ✅ **Refresh page** - Game state should persist (localStorage)

## Next Implementation Steps

Once the basic framework is working:

1. **Add Mini-Games** - Create simple skill-building games
2. **Expand Job System** - Add promotion mechanics based on skills
3. **Add Assets** - Housing and equipment purchases
4. **Create Events** - Random monthly events with choices
5. **Polish UI** - Add animations and better visual feedback

This foundation gives you a working game loop with the core mechanics in place. From here, you can add features incrementally while maintaining a playable state throughout development!

Happy coding! 🚀