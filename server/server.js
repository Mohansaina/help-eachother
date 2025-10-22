const express = require('express');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with fallback to in-memory storage
const supabaseUrl = process.env.SUPABASE_URL || 'https://raxgljgmtqsoscdahegq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT || 8080;

// In-memory storage as fallback
let helpRequests = [];
let helpers = [];

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../')));

// Check Supabase connection on startup
async function checkSupabaseConnection() {
  try {
    // Simple health check
    const { data, error } = await supabase.from('help_requests').select('id').limit(1);
    if (error) {
      console.log('Supabase connection check failed:', error.message);
      return false;
    }
    console.log('Supabase connection successful - using persistent storage');
    return true;
  } catch (error) {
    console.log('Supabase connection check failed:', error.message);
    return false;
  }
}

// API routes
// Get all help requests
app.get('/api/requests', async (req, res) => {
  try {
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('help_requests')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching requests from Supabase:', error.message);
      // Fallback to in-memory storage
      res.json(helpRequests);
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching requests:', error.message);
    // Fallback to in-memory storage
    res.json(helpRequests);
  }
});

// Get all helpers
app.get('/api/helpers', async (req, res) => {
  try {
    // Try to fetch from Supabase first
    const { data, error } = await supabase
      .from('helpers')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching helpers from Supabase:', error.message);
      // Fallback to in-memory storage
      res.json(helpers);
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching helpers:', error.message);
    // Fallback to in-memory storage
    res.json(helpers);
  }
});

// Add a new help request
app.post('/api/requests', async (req, res) => {
  try {
    // Try to insert into Supabase first
    const { data, error } = await supabase
      .from('help_requests')
      .insert([
        {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          location: req.body.location,
          urgency: req.body.urgency,
          timestamp: new Date().toLocaleString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating request in Supabase:', error.message);
      // Fallback to in-memory storage
      const newRequest = {
        id: helpRequests.length > 0 ? Math.max(...helpRequests.map(r => r.id)) + 1 : 1,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        urgency: req.body.urgency,
        timestamp: new Date().toLocaleString()
      };
      helpRequests.push(newRequest);
      res.status(201).json(newRequest);
    } else {
      res.status(201).json(data);
    }
  } catch (error) {
    console.error('Error creating request:', error.message);
    // Fallback to in-memory storage
    const newRequest = {
      id: helpRequests.length > 0 ? Math.max(...helpRequests.map(r => r.id)) + 1 : 1,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      urgency: req.body.urgency,
      timestamp: new Date().toLocaleString()
    };
    helpRequests.push(newRequest);
    res.status(201).json(newRequest);
  }
});

// Add a new helper
app.post('/api/helpers', async (req, res) => {
  try {
    // Try to insert into Supabase first
    const { data, error } = await supabase
      .from('helpers')
      .insert([
        {
          name: req.body.name,
          skill: req.body.skill,
          category: req.body.category,
          availability: req.body.availability,
          contact_method: req.body.contactMethod,
          contact_info: req.body.contactInfo,
          bio: req.body.bio,
          timestamp: new Date().toLocaleString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating helper in Supabase:', error.message);
      // Fallback to in-memory storage
      const newHelper = {
        id: helpers.length > 0 ? Math.max(...helpers.map(h => h.id)) + 1 : 1,
        name: req.body.name,
        skill: req.body.skill,
        category: req.body.category,
        availability: req.body.availability,
        contact_method: req.body.contactMethod,
        contact_info: req.body.contactInfo,
        bio: req.body.bio,
        timestamp: new Date().toLocaleString()
      };
      helpers.push(newHelper);
      res.status(201).json(newHelper);
    } else {
      res.status(201).json(data);
    }
  } catch (error) {
    console.error('Error creating helper:', error.message);
    // Fallback to in-memory storage
    const newHelper = {
      id: helpers.length > 0 ? Math.max(...helpers.map(h => h.id)) + 1 : 1,
      name: req.body.name,
      skill: req.body.skill,
      category: req.body.category,
      availability: req.body.availability,
      contact_method: req.body.contactMethod,
      contact_info: req.body.contactInfo,
      bio: req.body.bio,
      timestamp: new Date().toLocaleString()
    };
    helpers.push(newHelper);
    res.status(201).json(newHelper);
  }
});

// Serve the main HTML file for all other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
  
  // Check Supabase connection
  const isConnected = await checkSupabaseConnection();
  if (isConnected) {
    console.log('✅ Using Supabase for persistent storage');
  } else {
    console.log('⚠️  WARNING: Using in-memory storage. Data will not persist between server restarts.');
    console.log('To enable persistent storage, please provide a valid Supabase service role key.');
  }
});