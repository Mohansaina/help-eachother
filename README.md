# Community Help Network

A platform connecting people who need help with those who can offer guidance.

## Features
- Request help in various categories with urgency levels
- Offer help to others in the community with detailed profiles
- Browse helpers directory with filtering options
- Filter requests and helpers by category
- Responsive design for all devices
- Persistent data storage with Supabase
- Enhanced forms with validation and additional fields

## Enhanced Features
- **Urgency Levels**: Specify how urgent your help request is (Low, Medium, High)
- **Detailed Helper Profiles**: Helpers can include a brief bio about their experience
- **Terms Agreement**: Helpers must agree to terms before registering
- **Improved Form Validation**: Better user feedback and validation

## Technologies Used
- HTML5
- CSS3 (with modern flexbox and grid layouts)
- JavaScript (ES6+)
- Node.js with Express (for server deployment)
- Supabase (for persistent data storage)
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
4. Create a `.env` file with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```
5. Start the development server: `npm start`
6. Open your browser to the provided local address

### For Server Deployment (Render)
1. Fork this repository
2. Create a new Web Service on Render
3. Connect your forked repository
4. Add environment variables:
   - SUPABASE_URL: your Supabase project URL
   - SUPABASE_KEY: your Supabase anon key
5. Set the build command to `npm install`
6. Set the start command to `npm start`
7. Deploy!

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
5. Add environment variables:
   - SUPABASE_URL: your Supabase project URL
   - SUPABASE_KEY: your Supabase anon key
6. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
7. Deploy!

## Project Structure
```
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Client-side JavaScript
├── server/
│   ├── server.js       # Express server with Supabase integration
│   └── package.json    # Server dependencies
├── package.json        # Project metadata and dependencies
├── render.yaml         # Deployment config for Render
├── .env                # Environment variables (not committed to git)
├── README.md           # This file
└── .gitignore          # Files to ignore in git
```

## How It Works
This is a full-stack application with:
- Frontend: Static HTML, CSS, and JavaScript
- Backend: Node.js with Express server
- Data: Supabase database for persistent storage

The server serves the static files and provides API endpoints that interact with the Supabase database.