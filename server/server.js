const express = require('express');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://raxgljgmtqsoscdahegq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../')));

// API routes
// Get all help requests
app.get('/api/requests', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('help_requests')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Get all helpers
app.get('/api/helpers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('helpers')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching helpers:', error);
    res.status(500).json({ error: 'Failed to fetch helpers' });
  }
});

// Add a new help request
app.post('/api/requests', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('help_requests')
      .insert([
        {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          location: req.body.location,
          timestamp: new Date().toLocaleString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

// Add a new helper
app.post('/api/helpers', async (req, res) => {
  try {
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
          timestamp: new Date().toLocaleString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating helper:', error);
    res.status(500).json({ error: 'Failed to create helper' });
  }
});

// Serve the main HTML file for all other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});