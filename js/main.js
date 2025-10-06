// Life Stocks 2001 - Main Game Controller
// Initialize game systems when page loads

// Global game objects
window.gameState = null;
window.stockMarket = null;
window.miniGameManager = null;

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Life Stocks 2001 - Starting game initialization...');
    
    // Initialize core game systems
    initializeGame();
    
    // Set up event handlers
    setupEventHandlers();
    
    // Start the game loop
    startGameLoop();
    
    console.log('✅ Game initialization complete!');
});

// Initialize all game systems
function initializeGame() {
    try {
        // Create game state manager
        window.gameState = new GameState();
        
        // Create stock market system
        window.stockMarket = new StockMarket();
        
        // Create mini-game manager
        window.miniGameManager = new MiniGameManager();
        
        // Update UI with initial data
        window.gameState.updateUI();
        window.gameState.updateSkillsDisplay();
        window.gameState.updateNewsContent();
        
        console.log('🎮 All game systems initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing game:', error);
        showErrorMessage('Failed to initialize game. Please refresh the page.');
    }
}

// Set up all event handlers
function setupEventHandlers() {
    // Next month button
    const nextMonthBtn = document.getElementById('next-month-btn');
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            nextMonthBtn.disabled = true;
            nextMonthBtn.textContent = '⏳ Processing...';
            
            setTimeout(() => {
                window.gameState.nextMonth();
                nextMonthBtn.disabled = false;
                nextMonthBtn.textContent = '⏭️ Next Month';
            }, 500);
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Press 'N' for next month
        if (event.key.toLowerCase() === 'n' && !event.ctrlKey && !event.altKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                document.getElementById('next-month-btn').click();
            }
        }
        
        // Press 'ESC' to go back to dashboard
        if (event.key === 'Escape') {
            showPanel('dashboard');
        }
    });
    
    // Auto-save every 30 seconds
    setInterval(() => {
        if (window.gameState) {
            window.gameState.saveGame();
        }
    }, 30000);
}

// Start the main game loop
function startGameLoop() {
    // Update stock prices every 10 seconds for visual effect
    setInterval(() => {
        if (window.stockMarket && document.getElementById('stocks').classList.contains('active')) {
            window.stockMarket.renderStockList();
        }
    }, 10000);
    
    console.log('🔄 Game loop started');
}

// Panel navigation system
function showPanel(panelName) {
    console.log(`📱 Switching to panel: ${panelName}`);
    
    // Hide all panels
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected panel
    const targetPanel = document.getElementById(panelName);
    if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Update panel content based on which panel is shown
        updatePanelContent(panelName);
    } else {
        console.error(`❌ Panel not found: ${panelName}`);
    }
}

// Update content when switching panels
function updatePanelContent(panelName) {
    switch(panelName) {
        case 'stocks':
            if (window.stockMarket) {
                window.stockMarket.renderStockList();
            }
            break;
            
        case 'job':
            updateJobPanel();
            break;
            
        case 'assets':
            updateAssetsPanel();
            break;
            
        case 'minigames':
            if (window.miniGameManager) {
                window.miniGameManager.showSkillsMenu();
            }
            break;
            
        case 'dashboard':
            // Update news ticker when returning to dashboard
            if (window.gameState) {
                window.gameState.updateNewsContent();
            }
            break;
    }
}

// Update job panel content
function updateJobPanel() {
    const jobInfo = document.getElementById('job-info');
    if (!jobInfo || !window.gameState) return;
    
    const player = window.gameState.player;
    const totalSkills = player.skills.programming + player.skills.marketing + player.skills.finance;
    
    jobInfo.innerHTML = `
        <div class="job-current">
            <h3>👔 Current Position</h3>
            <div class="job-details">
                <p><strong>Title:</strong> ${player.jobTitle}</p>
                <p><strong>Level:</strong> ${player.jobLevel}</p>
                <p><strong>Monthly Salary:</strong> $${player.monthlyIncome.toLocaleString()}</p>
                <p><strong>Total Skills:</strong> ${totalSkills} points</p>
            </div>
        </div>
        
        <div class="job-progression">
            <h3>📈 Career Advancement</h3>
            <div class="advancement-info">
                ${totalSkills < 20 ? 
                    `<p>🎯 <strong>Next Goal:</strong> Reach 20 total skill points for promotion consideration</p>
                     <p>📚 <strong>Tip:</strong> Play skill training mini-games to improve your abilities!</p>` :
                    `<p>✅ <strong>Ready for promotion!</strong> Wait for your next performance review.</p>`
                }
            </div>
        </div>
        
        <div class="job-skills">
            <h3>🎯 Skill Breakdown</h3>
            <div class="skills-breakdown">
                <div class="skill-item">
                    <span>💻 Programming: ${player.skills.programming}</span>
                    <div class="skill-bar-container">
                        <div class="skill-bar-fill" style="width: ${Math.min(player.skills.programming * 5, 100)}%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <span>📊 Marketing: ${player.skills.marketing}</span>
                    <div class="skill-bar-container">
                        <div class="skill-bar-fill" style="width: ${Math.min(player.skills.marketing * 5, 100)}%"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <span>💰 Finance: ${player.skills.finance}</span>
                    <div class="skill-bar-container">
                        <div class="skill-bar-fill" style="width: ${Math.min(player.skills.finance * 5, 100)}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Update assets panel content
function updateAssetsPanel() {
    const assetsList = document.getElementById('assets-list');
    if (!assetsList || !window.gameState) return;
    
    const player = window.gameState.player;
    
    assetsList.innerHTML = `
        <div class="assets-category">
            <h3>🏠 Housing</h3>
            <p>Current: ${GAME_CONFIG.assets.housing[player.assets.housing].name}</p>
            <p>Monthly Cost: $${GAME_CONFIG.assets.housing[player.assets.housing].cost}</p>
            <div class="asset-options">
                ${Object.keys(GAME_CONFIG.assets.housing).map(key => {
                    const asset = GAME_CONFIG.assets.housing[key];
                    const isCurrent = key === player.assets.housing;
                    return `
                        <button class="asset-btn ${isCurrent ? 'current' : ''}" 
                                onclick="upgradeAsset('housing', '${key}')"
                                ${isCurrent ? 'disabled' : ''}>
                            ${asset.name} - $${asset.cost}/month
                            ${isCurrent ? '(Current)' : ''}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
        
        <div class="assets-category">
            <h3>🚗 Transportation</h3>
            <p>Current: ${GAME_CONFIG.assets.transport[player.assets.transport].name}</p>
            <p>Monthly Cost: $${GAME_CONFIG.assets.transport[player.assets.transport].cost}</p>
            <div class="asset-options">
                ${Object.keys(GAME_CONFIG.assets.transport).map(key => {
                    const asset = GAME_CONFIG.assets.transport[key];
                    const isCurrent = key === player.assets.transport;
                    return `
                        <button class="asset-btn ${isCurrent ? 'current' : ''}" 
                                onclick="upgradeAsset('transport', '${key}')"
                                ${isCurrent ? 'disabled' : ''}>
                            ${asset.name} - $${asset.cost}/month
                            ${isCurrent ? '(Current)' : ''}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
        
        <div class="assets-category">
            <h3>💻 Equipment</h3>
            <p>Current: ${GAME_CONFIG.assets.equipment[player.assets.equipment].name}</p>
            <p>Monthly Cost: $${GAME_CONFIG.assets.equipment[player.assets.equipment].cost}</p>
            <div class="asset-options">
                ${Object.keys(GAME_CONFIG.assets.equipment).map(key => {
                    const asset = GAME_CONFIG.assets.equipment[key];
                    const isCurrent = key === player.assets.equipment;
                    return `
                        <button class="asset-btn ${isCurrent ? 'current' : ''}" 
                                onclick="upgradeAsset('equipment', '${key}')"
                                ${isCurrent ? 'disabled' : ''}>
                            ${asset.name} - $${asset.cost}/month
                            ${isCurrent ? '(Current)' : ''}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Asset upgrade function
function upgradeAsset(category, assetKey) {
    if (!window.gameState) return;
    
    const currentAsset = window.gameState.player.assets[category];
    if (currentAsset === assetKey) return; // Already owned
    
    const newAsset = GAME_CONFIG.assets[category][assetKey];
    const oldAsset = GAME_CONFIG.assets[category][currentAsset];
    
    const costDifference = newAsset.cost - oldAsset.cost;
    
    if (costDifference > 0) {
        const confirmed = confirm(`Upgrade to ${newAsset.name}?\nAdditional monthly cost: $${costDifference}`);
        if (!confirmed) return;
    }
    
    // Update player assets
    window.gameState.player.assets[category] = assetKey;
    
    // Update monthly expenses
    window.gameState.player.monthlyExpenses += costDifference;
    
    // Update UI
    window.gameState.updateUI();
    updateAssetsPanel();
    window.gameState.saveGame();
    
    window.gameState.showMessage(`Upgraded to ${newAsset.name}!`, 'success');
}

// Stock trading functions (called from stockMarket.js)
function buyStock(symbol, shares) {
    if (window.gameState && window.gameState.buyStock(symbol, shares)) {
        window.stockMarket.renderStockList();
        console.log(`✅ Bought ${shares} shares of ${symbol}`);
    }
}

function sellStock(symbol, shares) {
    if (window.gameState && window.gameState.sellStock(symbol, shares)) {
        window.stockMarket.renderStockList();
        console.log(`✅ Sold ${shares} shares of ${symbol}`);
    }
}

// Utility functions
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Game restart function (called from game over modal)
function restartGame() {
    const confirmed = confirm('Are you sure you want to start a new game? All progress will be lost!');
    if (confirmed) {
        localStorage.removeItem('lifestocks2001_save');
        location.reload();
    }
}

// Debug functions (useful during development)
function debugGameState() {
    console.log('🐛 Current Game State:', window.gameState.player);
}

function debugAddMoney(amount = 10000) {
    if (window.gameState) {
        window.gameState.player.cash += amount;
        window.gameState.updateUI();
        console.log(`💰 Added $${amount} to cash`);
    }
}

function debugAddSkills(amount = 10) {
    if (window.gameState) {
        window.gameState.player.skills.programming += amount;
        window.gameState.player.skills.marketing += amount;
        window.gameState.player.skills.finance += amount;
        window.gameState.updateSkillsDisplay();
        console.log(`🎯 Added ${amount} to all skills`);
    }
}

// Export functions for console debugging
window.debugGameState = debugGameState;
window.debugAddMoney = debugAddMoney;
window.debugAddSkills = debugAddSkills;

console.log('📁 main.js loaded successfully');
