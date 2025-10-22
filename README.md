# Community Help Network

A platform connecting people who need help with those who can offer guidance.

## Features
- Request help in various categories
- Offer help to others in the community
- Browse helpers directory
- Filter requests and helpers by category
- Responsive design for all devices

## Technologies Used
- HTML5
- CSS3 (with modern flexbox and grid layouts)
- JavaScript (ES6+)
- Node.js with Express (for server deployment)
- Font Awesome Icons

## Categories
- Cooking & Nutrition
- Study & Education
- Technology
- Health & Wellness
- Finance & Budgeting
- Home Maintenance
- Creative Skills
- Other

## Setup Instructions

### For Local Development
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser to the provided local address

### For Server Deployment (Render)
1. Fork this repository
2. Create a new Web Service on Render
3. Connect your forked repository
4. Set the build command to `npm install`
5. Set the start command to `npm start`
6. Deploy!

## Deployment Options

### GitHub Pages (Static Site - Free)
1. Go to your repository settings
2. Scroll down to "Pages"
3. Select "GitHub Actions" as the source
4. The site will be deployed to `https://[username].github.io/help-eachother`

### Render (Full Server - Free Tier Available)
1. Go to [Render](https://render.com)
2. Sign up for an account
3. Create a new Web Service
4. Connect your GitHub repository
5. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Deploy!

## Project Structure
```
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Client-side JavaScript
├── server/
│   ├── server.js       # Express server
│   └── package.json    # Server dependencies
├── package.json        # Project metadata and dependencies
├── README.md           # This file
└── .gitignore          # Files to ignore in git
```

## How It Works
This is a full-stack application with:
- Frontend: Static HTML, CSS, and JavaScript
- Backend: Node.js with Express server
- Data: In-memory storage (would be replaced with a database in production)

The server serves the static files and provides API endpoints for future expansion.