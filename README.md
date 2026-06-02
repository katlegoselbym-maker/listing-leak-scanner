# Listing Leak Scanner

Free forensic copy diagnostic that finds the single highest-damage word or phrase in any listing. Powered by Claude AI via a secure Vercel serverless proxy. Converts to the 72-Hour Listing Autopsy on Payhip.

---

## Project Structure

```
listing-leak-scanner/
├── api/
│   └── diagnose.js        ← Vercel serverless function (keeps API key secret)
├── src/
│   ├── App.jsx            ← Main React app
│   └── main.jsx           ← React entry point
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── .gitignore
```

---

## Deploy in 5 Steps

### Step 1 — Push to GitHub

Create a new repo on GitHub called `listing-leak-scanner`.

Then run these commands in your terminal inside this project folder:

```bash
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/listing-leak-scanner.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New Project**
3. Import your `listing-leak-scanner` repo from GitHub
4. Vercel will auto-detect Vite. Leave all build settings as-is
5. Do NOT click Deploy yet — do Step 3 first

---

### Step 3 — Add the Anthropic API Key

Still inside the Vercel project setup (before deploying):

1. Scroll to **Environment Variables**
2. Add this exactly:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (starts with `sk-ant-...`)
3. Make sure the environment is set to **Production, Preview, Development**

You can find or create your API key at: [console.anthropic.com](https://console.anthropic.com)

---

### Step 4 — Deploy

Click **Deploy**. Vercel builds the project and gives you a live URL like:

```
https://listing-leak-scanner.vercel.app
```

---

### Step 5 — Test It

1. Open your live URL
2. Paste any listing description (at least 60 characters)
3. Click RUN LEAK SCAN
4. You should get a forensic result with the Payhip buy button

If you get an error, check that your `ANTHROPIC_API_KEY` environment variable is set correctly in Vercel dashboard under Settings → Environment Variables.

---

## Making Changes

Any time you push to GitHub, Vercel redeploys automatically.

```bash
git add .
git commit -m "your change description"
git push
```

---

## The Funnel Connection

Free scanner → Result with hard wall → Button links to https://payhip.com/b/Og6Pd → Payhip collects $37 → Buyer gets the full 72-Hour Listing Autopsy HTML file.

No changes needed. The Payhip link is already hardcoded in the app.
