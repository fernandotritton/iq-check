# Troubleshooting Supabase Connection

## Current Issue
Error: P1001 - Can't reach database server at Supabase

## Possible Causes
1. Project is paused
2. Incorrect connection string format
3. Password contains special characters that need URL encoding
4. Firewall/network restrictions

## Steps to Resolve

### 1. Verify Project Status
- Go to your Supabase dashboard
- Check if project shows "Active" (green) or "Paused"
- If paused, click to activate it

### 2. Get Correct Connection String
- Click "Connect" button (top right)
- Look for different connection modes:
  - Direct connection (port 5432)
  - Connection pooling (port 6543)
  - Session mode
- Copy the EXACT connection string shown
- Don't modify anything

### 3. Check Password Encoding
- If your password has special characters like [], @, #, etc.
- Supabase should show it already URL-encoded in the connection string
- Copy it exactly as shown

### 4. Alternative: Use Supabase Client
If direct connection fails, we can use Supabase client library instead of Prisma direct connection.

## What I Need From You
1. Project status (Active/Paused)
2. Exact connection string from Supabase
3. Any error messages you see in Supabase dashboard
