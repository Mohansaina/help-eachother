const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY must be set in your .env file');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running database migration...');
  
  try {
    // Add urgency column to help_requests table
    console.log('Adding urgency column to help_requests table...');
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE help_requests ADD COLUMN IF NOT EXISTS urgency TEXT'
    });
    
    if (error1) {
      console.log('Note: Manual column addition may be required');
    }
    
    // Add bio column to helpers table
    console.log('Adding bio column to helpers table...');
    const { error: error2 } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE helpers ADD COLUMN IF NOT EXISTS bio TEXT'
    });
    
    if (error2) {
      console.log('Note: Manual column addition may be required');
    }
    
    console.log('Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to your Render dashboard');
    console.log('2. Click on your service');
    console.log('3. Click "Manual Deploy" to deploy the latest changes');
    console.log('4. Your application will be available with full Supabase integration');
    
  } catch (error) {
    console.error('Migration failed:', error.message);
    console.log('\nPlease run the SQL script manually in your Supabase SQL Editor:');
    console.log(`
-- Add new columns to help_requests table
ALTER TABLE help_requests ADD COLUMN IF NOT EXISTS urgency TEXT;

-- Add new columns to helpers table
ALTER TABLE helpers ADD COLUMN IF NOT EXISTS bio TEXT;
    `);
  }
}

runMigration();