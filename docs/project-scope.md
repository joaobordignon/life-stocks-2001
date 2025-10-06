# Stonks-9800 based Browser Game - Weekend Project Scope

## Project Overview

**Game Name:** Life Stocks 2001: Career Simulation Game  
**Development Time:** Weekend Project (48-72 hours)  
**Target Platform:** Web Browser (HTML5/JavaScript)  
**Recommended Framework:** Phaser.js for game mechanics + HTML/CSS for UI  
**Development Approach:** "Code Vibing" - Iterative, experimental development  

## Core Game Concept

A retro-inspired career simulation game where players navigate their professional life while managing finances, investing in stocks, and making strategic decisions. The game combines life simulation, stock trading, and skill-building mini-games in a streamlined weekend-appropriate scope.

## MVP (Minimum Viable Product) - Weekend Scope

### Phase 1: Core Systems (Day 1 - 8 hours)

#### Basic Game Structure
- **Game Loop:** Simple turn-based system (monthly cycles)
- **Main Screen:** Dashboard showing key stats and options
- **Data Management:** Local storage for save/load functionality
- **UI Framework:** HTML panels with CSS styling for menus

#### Essential Stats System
```javascript
playerStats = {
  cash: 10000,
  monthlyIncome: 3000,
  monthlyExpenses: 2000,
  skillPoints: { programming: 0, marketing: 0, finance: 0 },
  jobTitle: "Junior Developer",
  stress: 0,
  happiness: 50
}
```

#### Basic Job System
- **Starting Job:** Junior Developer (fixed income)
- **Promotion Mechanic:** Simple skill point requirements
- **3 Job Levels:** Junior → Senior → Lead (unlocks better salaries)

### Phase 2: Stock Trading System (Day 1 - 4 hours)

#### Simple Stock Market
- **5 Pop Culture Tech Companies:**
  - TechFlow (social media)
  - GameCorp (gaming)
  - CloudMax (cloud services)
  - AIFuture (artificial intelligence)
  - CryptoNext (blockchain)

#### Stock Mechanics
- **Price Generation:** Simple random walk with trend modifiers
- **Buy/Sell Actions:** Basic interface for stock transactions
- **Portfolio View:** List of owned stocks with current values
- **Market Events:** 2-3 random events that affect stock prices

### Phase 3: Mini-Games (Day 2 - 6 hours)

#### Skill-Building Mini-Games
1. **Code Debug (Programming Skill)**
   - Simple pattern matching game
   - Find the bug in code snippets
   - 30 seconds, earn programming points

2. **Marketing Pitch (Marketing Skill)**
   - Word association game
   - Connect product features to benefits
   - Timer-based scoring

3. **Budget Balance (Finance Skill)**
   - Simple math puzzles
   - Balance income/expense equations
   - Multiple choice format

#### Mini-Game Integration
- Play once per month per skill
- Results affect skill point gains
- Higher skills unlock better job opportunities

### Phase 4: Monthly Events System (Day 2 - 4 hours)

#### Event Categories
1. **Career Events:**
   - Promotion opportunities
   - Job offers from new companies
   - Performance reviews

2. **Market Events:**
   - Tech bubble news
   - Company scandals
   - New product launches

3. **Lifestyle Events:**
   - Rent increases
   - Equipment purchases (laptop upgrades)
   - Stress management choices

#### Event Implementation
- Simple random selection from predefined event pool
- 2-3 choices per event with clear consequences
- Text-based with simple decision buttons

### Phase 5: Asset & Lifestyle System (Day 2 - 2 hours)

#### Basic Assets
- **Housing:** Studio ($800/month) → Apartment ($1200/month) → House ($2000/month)
- **Transport:** Bus Pass ($100/month) → Used Car ($300/month) → New Car ($500/month)
- **Tech Gear:** Basic Laptop → Gaming Setup → Professional Workstation

#### Futuristic Consumables (Simplified)
- **Productivity Boost Items:**
  - Energy Drinks (+temporary skill boost)
  - VR Focus Headset (+mini-game performance)
  - Smart Productivity Assistant (+monthly income bonus)

## Technical Implementation Plan

### Day 1 - Foundation (12 hours)
**Morning (4 hours):**
- Set up Phaser.js project structure
- Create basic HTML template with game canvas
- Implement main menu and basic navigation
- Set up local storage for game state

**Afternoon (4 hours):**
- Create player stats system
- Build dashboard UI with current status display
- Implement basic job system with income calculation
- Add month progression mechanics

**Evening (4 hours):**
- Create stock market data structure
- Implement buy/sell stock functionality
- Build simple stock portfolio display
- Add basic random price fluctuations

### Day 2 - Game Mechanics (12 hours)
**Morning (4 hours):**
- Develop first mini-game (Code Debug)
- Integrate mini-game results with skill system
- Create skill point progression mechanics
- Test mini-game scoring and rewards

**Afternoon (4 hours):**
- Build event system framework
- Create 5-6 basic career events
- Implement event choice consequences
- Add event triggering to monthly cycle

**Evening (4 hours):**
- Add asset purchase system
- Create lifestyle expense calculations
- Implement happiness/stress mechanics
- Build simple asset management UI

### Day 3 - Polish & Features (Optional - 8 hours)
**Morning (4 hours):**
- Add two additional mini-games
- Create more stock market events
- Implement company bankruptcy mechanics
- Add promotion/job change notifications

**Evening (4 hours):**
- UI polish and visual improvements
- Add sound effects (optional)
- Create simple tutorial/help system
- Bug fixes and balance testing

## File Structure
```
stonks-9800/
├── index.html          # Main game page
├── css/
│   ├── main.css        # Main stylesheet
│   └── retro.css       # Retro theme styling
├── js/
│   ├── main.js         # Game initialization
│   ├── gameState.js    # Player data management
│   ├── stockMarket.js  # Stock trading logic
│   ├── miniGames.js    # Mini-game implementations
│   ├── events.js       # Random event system
│   └── ui.js           # User interface management
├── assets/
│   ├── sounds/         # Sound effects (optional)
│   └── images/         # UI icons and graphics
└── data/
    ├── stocks.json     # Stock company data
    ├── events.json     # Event definitions
    └── jobs.json       # Job progression data
```

## Core Features Priority List

### Must Have (MVP)
1. ✅ Basic dashboard with stats
2. ✅ Simple job system with income
3. ✅ Stock buy/sell functionality
4. ✅ One working mini-game
5. ✅ Monthly progression system
6. ✅ Local save/load functionality

### Should Have (Polish)
1. ⭐ Three mini-games total
2. ⭐ Random event system
3. ⭐ Asset purchase system
4. ⭐ Basic stress/happiness mechanics
5. ⭐ Stock market events
6. ⭐ Job promotion system

### Could Have (Stretch Goals)
1. 🎯 Company bankruptcy scenarios
2. 🎯 Multiple starting career paths
3. 🎯 Advanced stock analysis tools
4. 🎯 Multiplayer comparison features
5. 🎯 Achievement system
6. 🎯 Export game statistics

### Won't Have (Out of Scope)
1. ❌ Complex graphics or animations
2. ❌ Real-time multiplayer
3. ❌ Mobile app version
4. ❌ Server-side data storage
5. ❌ Complex economic modeling
6. ❌ Multiple game modes

## Risk Assessment & Mitigation

### High Risk - Scope Creep
**Risk:** Adding too many features and not finishing
**Mitigation:** Stick strictly to MVP list, save ideas for version 2

### Medium Risk - Mini-Game Complexity
**Risk:** Mini-games taking too long to develop
**Mitigation:** Keep games simple (30 seconds max), use basic HTML interactions

### Medium Risk - Stock Market Realism
**Risk:** Over-engineering the stock simulation
**Mitigation:** Use simple random number generation with basic trends

### Low Risk - UI Complexity
**Risk:** Spending too much time on visual polish
**Mitigation:** Use CSS frameworks, focus on functionality over aesthetics

## Success Metrics

### Weekend Success Criteria
- [ ] Game is playable from start to finish
- [ ] Player can complete at least 12 months of gameplay
- [ ] All core systems work without major bugs
- [ ] Game state persists between sessions
- [ ] At least one mini-game is fully functional

### User Experience Goals
- Average play session: 15-30 minutes
- Learning curve: Understandable within 5 minutes
- Replayability: Different outcomes based on player choices
- Performance: Runs smoothly in all modern browsers

## Next Steps & Future Development

### Version 2.0 Ideas
- More complex skill trees
- Additional career paths (designer, manager, entrepreneur)
- Real market data integration
- Social features (compare with friends)
- Mobile-responsive design
- More sophisticated economic modeling

### Community Features
- High score sharing
- Strategy guides
- Modding support for custom events
- Player-generated company scenarios

## Development Tools Needed

### Required
- Code editor (VS Code recommended)
- Modern web browser for testing
- Local web server (Live Server extension or Python SimpleHTTPServer)
- Git for version control

### Recommended
- Phaser.js documentation
- JSON formatter for data files
- Browser developer tools for debugging
- Time tracking app to monitor progress

## Final Notes

This scope is designed to be completed in 48-72 hours by a developer with basic JavaScript knowledge. The focus is on getting core mechanics working rather than creating a polished final product. The "code vibing" approach means being flexible with implementation details while staying committed to the core feature set.

Remember: The goal is to have fun while creating something playable, not to build the perfect simulation. Embrace the retro aesthetic and keep things simple!

---

**Ready to start coding?** Set up your development environment, create the basic HTML structure, and begin with the player stats system. Good luck with your weekend game jam! 🚀