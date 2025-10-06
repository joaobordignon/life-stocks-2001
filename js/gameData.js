// Game configuration and data
const GAME_CONFIG = {
    startYear: 2001,
    maxYears: 10,
    
    // Stock companies reflecting the 2001 tech boom era
    companies: {
        MSFT: { 
            name: "Microsoft Corp", 
            sector: "Software",
            basePrice: 60,
            description: "The software giant behind Windows and Office"
        },
        ORCL: { 
            name: "Oracle Systems", 
            sector: "Database",
            basePrice: 25,
            description: "Database and enterprise software leader"
        },
        CSCO: { 
            name: "Cisco Networks", 
            sector: "Networking",
            basePrice: 45,
            description: "Internet infrastructure and networking equipment"
        },
        INTL: { 
            name: "Intel Corp", 
            sector: "Hardware",
            basePrice: 35,
            description: "Leading processor and chip manufacturer"
        },
        AMZN: { 
            name: "Amazon.com", 
            sector: "E-commerce",
            basePrice: 15,
            description: "Online bookstore expanding into e-commerce"
        }
    },
    
    // Career progression paths
    careerLevels: {
        1: { title: "Junior Developer", baseSalary: 3000 },
        2: { title: "Developer", baseSalary: 4000 },
        3: { title: "Senior Developer", baseSalary: 5500 },
        4: { title: "Lead Developer", baseSalary: 7500 },
        5: { title: "Engineering Manager", baseSalary: 10000 },
        6: { title: "Director of Engineering", baseSalary: 13000 },
        7: { title: "VP of Technology", baseSalary: 17000 },
        8: { title: "Chief Technology Officer", baseSalary: 25000 }
    },
    
    // Asset categories
    assets: {
        housing: {
            studio: { name: "Studio Apartment", cost: 800, description: "Basic starter housing" },
            apartment: { name: "One Bedroom", cost: 1200, description: "Comfortable living space" },
            house: { name: "House", cost: 2000, description: "Your own home with space to grow" }
        },
        transport: {
            bus: { name: "Bus Pass", cost: 100, description: "Reliable public transportation" },
            usedCar: { name: "Used Car", cost: 300, description: "Freedom to go anywhere" },
            newCar: { name: "New Car", cost: 500, description: "Latest model with all the features" }
        },
        equipment: {
            basic: { name: "Basic Setup", cost: 0, description: "Hand-me-down computer" },
            gaming: { name: "Gaming Rig", cost: 200, description: "High-end PC for work and play" },
            professional: { name: "Pro Workstation", cost: 400, description: "Top-tier development environment" }
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_CONFIG;
}
