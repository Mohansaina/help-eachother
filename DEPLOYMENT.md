# Deployment Guide for Community Help Network

This guide will help you deploy your Community Help Network application to Render with full Supabase integration.

## Prerequisites

1. A Render account (https://render.com)
2. Your Supabase service role key (NOT the anon key)
3. Your Supabase project URL

## Deploying to Render

### Step 1: Create a New Web Service

1. Go to https://dashboard.render.com
2. Click "New" and select "Web Service"
3. Connect your GitHub repository: `https://github.com/Mohansaina/help-eachother`
4. Click "Connect"

### Step 2: Configure Your Web Service

Fill in the following information:

- **Name**: `community-help-network`
- **Region**: Choose the closest region to you
- **Branch**: `master`
- **Root Directory**: Leave empty (your project is in the root)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 3: Add Environment Variables

In the "Advanced" section, add these environment variables:

1. **SUPABASE_URL**
   - Key: `SUPABASE_URL`
   - Value: `https://raxgljgmtqsoscdahegq.supabase.co`

2. **SUPABASE_KEY**
   - Key: `SUPABASE_KEY`
   - Value: `[Your Supabase service role key]`

**Important**: Make sure you're using the service role key, not the anon key. The service role key has full database access permissions.

### Step 4: Deploy

Click "Create Web Service" and wait for the deployment to complete.

## Database Schema Update

After deployment, you need to update your Supabase database schema to include the new columns for urgency and bio.

### Option 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/raxgljgmtqsoscdahegq
2. Click on "SQL Editor" in the left sidebar
3. Run this SQL script:
   ```sql
   -- Add new columns to help_requests table
   ALTER TABLE help_requests ADD COLUMN IF NOT EXISTS urgency TEXT;
   
   -- Add new columns to helpers table
   ALTER TABLE helpers ADD COLUMN IF NOT EXISTS bio TEXT;
   ```

### Option 2: Using the Migration Script

You can also find the migration script in your repository at `supabase/migrations/002_add_columns.sql`

## Troubleshooting

### Common Issues

1. **Invalid API Key Error**
   - Make sure you're using the service role key, not the anon key
   - Check that there are no extra spaces in your environment variables

2. **Database Connection Failed**
   - Verify your Supabase URL is correct
   - Ensure your service role key is valid

3. **Application Not Starting**
   - Check the build logs in Render for any errors
   - Ensure all dependencies are properly installed

### Checking Your Deployment

1. After deployment, click on your service in the Render dashboard
2. Go to the "Logs" tab to monitor your application
3. Look for the message: "✅ Using Supabase for persistent storage"
4. Visit your application URL to test it

## Updating Your Application

To update your deployed application after making changes:

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin master
   ```
2. Go to your Render dashboard
3. Click on your service
4. Click "Manual Deploy" or wait for automatic deployment

## Support

If you encounter any issues during deployment, please check:

1. Your environment variables are correctly set
2. Your Supabase service role key is valid
3. Your database schema is up to date
4. The Render logs for specific error messages