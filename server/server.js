const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../')));

// API endpoint to get help requests (in-memory storage for demo)
let helpRequests = [
  {
    id: 1,
    title: "Need help with cooking pasta",
    category: "cooking",
    description: "I'm new to cooking and don't know how to cook pasta properly. Would appreciate someone showing me the basics!",
    location: "My house",
    timestamp: new Date().toLocaleString()
  },
  {
    id: 2,
    title: "Computer repair help needed",
    category: "tech",
    description: "My laptop is running very slowly and I think it needs cleaning. Need someone who knows about computer hardware.",
    location: "Online",
    timestamp: new Date().toLocaleString()
  }
];

// API endpoint to get helpers (in-memory storage for demo)
let helpers = [
  {
    id: 1,
    name: "Alex Johnson",
    skill: "Cooking",
    category: "cooking",
    availability: "Weekends and evenings",
    contactMethod: "email",
    contactInfo: "alex.cooking@example.com",
    timestamp: new Date().toLocaleString()
  },
  {
    id: 2,
    name: "Sam Wilson",
    skill: "Computer Repair",
    category: "tech",
    availability: "Weekdays after 5pm",
    contactMethod: "phone",
    contactInfo: "+1 (555) 123-4567",
    timestamp: new Date().toLocaleString()
  }
];

// API routes
app.get('/api/requests', (req, res) => {
  res.json(helpRequests);
});

app.get('/api/helpers', (req, res) => {
  res.json(helpers);
});

// Serve the main HTML file for all other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});