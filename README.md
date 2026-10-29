# Clockit — Hindi-to-English writing practice

Clockit is a mobile-friendly, installable web app starter. Learners read a Hindi sentence, type an English translation, and get feedback in simple Hindi.

## What is included
- Responsive mobile-first interface
- Beginner / Intermediate / Advanced levels
- Demo sentences that work without an API key
- Smart AI checking endpoint (requires your own OpenAI API key and API usage billing)
- PWA manifest and service worker so the website can be installed on a compatible phone
- Local progress counter stored in the browser

## Run it on a computer
1. Install Node.js (LTS) from https://nodejs.org/
2. Unzip this folder.
3. Open a terminal in the `clockit_app` folder and run: `npm install`
4. Copy `.env.example` to a new file named `.env`.
5. Add your API key to `.env` as `OPENAI_API_KEY=...` (leave it out if you only want demo mode).
6. Run `npm start` and open http://localhost:3000

Never put your API key in the `public` folder or in browser code. Keep `.env` private.

## Use on Android / iPhone
For a real public installable app, deploy this project to a host that supports Node.js and HTTPS. Then open the deployed site in your phone browser:
- Android Chrome: menu (⋮) → Install app / Add to Home screen
- iPhone Safari: Share → Add to Home Screen

This creates an installable web app (PWA). A store-distributed native Android/iOS app would require a separate packaging and store-publishing step.

## Important
- This is a starter build, not yet published online.
- AI checking will not work until the server has a valid API key and can reach the API.
- API use may cost money. Set usage limits in your API account.
- The app currently has sample questions; add more to the `questions` list in `public/index.html`.
