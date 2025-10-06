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
            currentYear: 2001,
            stress: 0,
            happiness: 50,
            portfolio: {},
            assets: {
                housing: "studio",
                transport: "bus",
                equipment: "basic"
            },
            gamesPlayedThisMonth: {
                programming: false,
                marketing: false,
                finance: false
            }
        };
        
        this.gameData = {
            maxMonths: 120, // 10 years
            startYear: 2001
        };
        
        this.loadGame();
        this.updateSkillsDisplay();
    }
    
    saveGame() {
        const saveData = {
            ...this.player,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('lifestocks2001_save', JSON.stringify(saveData));
        this.showMessage('Game saved!', 'success');
    }
    
    loadGame() {
        const saved = localStorage.getItem('lifestocks2001_save');
        if (saved) {
            const saveData = JSON.parse(saved);
            this.player = { ...this.player, ...saveData };
            this.showMessage('Game loaded!', 'success');
        }
    }
    
    nextMonth() {
        // Calculate monthly changes
        const netIncome = this.player.monthlyIncome - this.player.monthlyExpenses;
        this.player.cash += netIncome;
        this.player.currentMonth++;
        
        // Update year
        if (this.player.currentMonth > 12) {
            this.player.currentMonth = 1;
            this.player.currentYear++;
        }
        
        // Reset monthly mini-game tracking
        this.player.gamesPlayedThisMonth = {
            programming: false,
            marketing: false,
            finance: false
        };
        
        // Update stock prices
        if (window.stockMarket) {
            window.stockMarket.updatePrices();
        }
        
        // Random event chance (30%)
        if (Math.random() < 0.3) {
            this.triggerRandomEvent();
        }
        
        // Check win/lose conditions
        this.checkGameEnd();
        
        this.updateUI();
        this.updateNewsContent();
        this.saveGame();
    }
    
    triggerRandomEvent() {
        const events = [
            {
                title: "Market Volatility Alert! 📈📉",
                description: "Dot-com stocks are experiencing wild swings today!",
                effect: () => {
                    // Increase stock volatility for this month
                    if (window.stockMarket) {
                        window.stockMarket.increaseVolatility();
                    }
                }
            },
            {
                title: "Performance Review Time! 💼",
                description: "Your manager wants to discuss your progress...",
                effect: () => {
                    const totalSkills = this.player.skills.programming + 
                                      this.player.skills.marketing + 
                                      this.player.skills.finance;
                    
                    if (totalSkills > 20) {
                        const raise = 500 + (this.player.jobLevel * 200);
                        this.player.monthlyIncome += raise;
                        this.showMessage(`Promotion! Salary increased by $${raise}/month!`, 'success');
                        this.player.jobLevel++;
                        this.updateJobTitle();
                    } else {
                        this.showMessage("Keep improving your skills for a promotion!", 'error');
                    }
                }
            },
            {
                title: "Tech Conference Invitation! 🎓",
                description: "Attend a conference to boost your skills?",
                effect: () => {
                    if (this.player.cash >= 1000) {
                        const choice = confirm("Spend $1000 to attend a tech conference and gain skills?");
                        if (choice) {
                            this.player.cash -= 1000;
                            this.player.skills.programming += 3;
                            this.player.skills.marketing += 2;
                            this.player.skills.finance += 1;
                            this.updateSkillsDisplay();
                            this.showMessage("Conference completed! Skills improved!", 'success');
                        }
                    }
                }
            },
            {
                title: "Y2K Bug Aftermath! 🐛",
                description: "Companies are still dealing with legacy system issues...",
                effect: () => {
                    if (this.player.skills.programming > 15) {
                        const bonus = 2000 + (this.player.skills.programming * 50);
                        this.player.cash += bonus;
                        this.showMessage(`Consulting bonus! Earned $${bonus} fixing Y2K bugs!`, 'success');
                    }
                }
            }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        setTimeout(() => {
            alert(`${event.title}\n\n${event.description}`);
            event.effect();
        }, 500);
    }
    
    updateJobTitle() {
        const jobTitles = {
            1: "Junior Developer",
            2: "Developer",
            3: "Senior Developer", 
            4: "Lead Developer",
            5: "Engineering Manager",
            6: "Director of Engineering",
            7: "VP of Technology",
            8: "Chief Technology Officer"
        };
        
        this.player.jobTitle = jobTitles[Math.min(this.player.jobLevel, 8)] || "Tech Executive";
    }
    
    checkGameEnd() {
        const totalMonths = (this.player.currentYear - this.gameData.startYear) * 12 + this.player.currentMonth;
        
        if (totalMonths >= this.gameData.maxMonths) {
            this.showGameOver("Time's up! You've completed your 10-year journey!");
        } else if (this.player.cash <= -10000) {
            this.showGameOver("Game Over! You've gone too far into debt.");
        } else if (this.player.cash >= 1000000) {
            this.showGameOver("Congratulations! You've become a millionaire!");
        }
    }
    
    showGameOver(message) {
        const modal = document.getElementById('game-over-modal');
        const finalStats = document.getElementById('final-stats');
        
        const totalSkills = this.player.skills.programming + 
                          this.player.skills.marketing + 
                          this.player.skills.finance;
        
        let portfolioValue = 0;
        if (window.stockMarket) {
            portfolioValue = window.stockMarket.getPortfolioValue();
        }
        
        finalStats.innerHTML = `
            <p><strong>${message}</strong></p>
            <hr style="margin: 20px 0;">
            <div class="final-stats-grid">
                <div>💰 Final Cash: $${this.player.cash.toLocaleString()}</div>
                <div>📈 Portfolio Value: $${portfolioValue.toLocaleString()}</div>
                <div>💼 Final Job: ${this.player.jobTitle}</div>
                <div>🎯 Total Skills: ${totalSkills}</div>
                <div>📅 Time Played: ${this.player.currentYear - this.gameData.startYear} years, ${this.player.currentMonth} months</div>
                <div>🏆 Net Worth: $${(this.player.cash + portfolioValue).toLocaleString()}</div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }
    
    updateUI() {
        document.getElementById('cash-amount').textContent = this.player.cash.toLocaleString();
        document.getElementById('income-amount').textContent = this.player.monthlyIncome.toLocaleString();
        document.getElementById('job-title').textContent = this.player.jobTitle;
        document.getElementById('current-month').textContent = this.player.currentMonth;
        document.getElementById('current-year').textContent = this.player.currentYear;
    }
    
    updateSkillsDisplay() {
        document.getElementById('prog-skill').textContent = this.player.skills.programming;
        document.getElementById('market-skill').textContent = this.player.skills.marketing;
        document.getElementById('finance-skill').textContent = this.player.skills.finance;
    }
    
    updateNewsContent() {
        const newsItems = [
            `Month ${this.player.currentMonth}, ${this.player.currentYear}: The dot-com boom continues to reshape the tech industry...`,
            `Breaking: New startups are emerging daily in Silicon Valley...`,
            `Market Watch: Tech stocks showing unprecedented growth...`,
            `Career Alert: Demand for skilled developers at all-time high...`,
            `Investment Tip: Diversification remains key in volatile markets...`,
            `Tech News: Y2K aftermath creates new opportunities for developers...`
        ];
        
        const randomNews = newsItems[Math.floor(Math.random() * newsItems.length)];
        document.getElementById('news-content').textContent = randomNews;
    }
    
    showMessage(text, type = 'success') {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    buyStock(symbol, shares) {
        const stock = window.stockMarket.getStock(symbol);
        const cost = stock.price * shares;
        
        if (this.player.cash >= cost) {
            this.player.cash -= cost;
            this.player.portfolio[symbol] = (this.player.portfolio[symbol] || 0) + shares;
            this.updateUI();
            this.saveGame();
            this.showMessage(`Bought ${shares} shares of ${symbol}!`, 'success');
            return true;
        } else {
            this.showMessage('Not enough cash!', 'error');
            return false;
        }
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
            this.showMessage(`Sold ${shares} shares of ${symbol}!`, 'success');
            return true;
        } else {
            this.showMessage('Not enough shares!', 'error');
            return false;
        }
    }
}

// Restart game function
function restartGame() {
    localStorage.removeItem('lifestocks2001_save');
    location.reload();
}
