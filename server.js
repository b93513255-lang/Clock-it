import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/check", async (req, res) => {
  const { hindi, answer, level } = req.body || {};
  if (!hindi || !answer || typeof hindi !== "string" || typeof answer !== "string") {
    return res.status(400).json({ error: "Please enter a sentence and your English translation." });
  }
  if (hindi.length > 500 || answer.length > 1000) {
    return res.status(400).json({ error: "Please keep your answer shorter." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "AI checking is not connected yet. Add an API key to the server's .env file. You can still use the demo questions."
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions: `You are Clockit, a kind Hindi-to-English writing tutor for Indian beginners.
Evaluate the learner's English translation of a Hindi sentence. Accept any meaning-preserving, grammatically correct natural translation, not only one exact wording.
Reply ONLY as valid JSON with these keys:
{"correct": boolean, "natural_translation": string, "simple_explanation_hindi": string, "suggestion": string}
Keep the Hindi explanation simple and encouraging. If meaning is right but grammar has a small error, set correct=false and explain the error. Do not be harsh. Do not mark a valid alternate translation wrong. The level is ${String(level || "Beginner").slice(0,30)}.`,
      input: `Hindi sentence: ${hindi}\nLearner's English answer: ${answer}\nReturn the JSON now.`
    });
    let raw = response.output_text || "";
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "").trim();
    const result = JSON.parse(raw);
    return res.json(result);
  } catch (err) {
    console.error("Clockit AI error:", err?.message || err);
    return res.status(502).json({ error: "Clockit couldn't check that answer right now. Please try again." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Clockit is running on http://localhost:${port}`));
