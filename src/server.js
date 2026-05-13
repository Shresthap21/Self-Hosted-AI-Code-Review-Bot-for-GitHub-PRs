import express from "express";
import dotenv from "dotenv";

import {
  getOctokit,
  getPullRequestFiles,
  postReviewComment,
} from "./github.js";

import { reviewWithOllama } from "./ollama.js";
import { shouldReviewFile } from "./diffParser.js";
import { chunkDiff } from "./chunker.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Code Review Bot is running");
});

app.post("/webhook", async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const action = req.body.action;

    console.log("====================================");
    console.log("GitHub webhook received");
    console.log("Event:", event);
    console.log("Action:", action);

    if (event !== "pull_request") {
      return res.status(200).send("Ignored");
    }

    if (!["opened", "synchronize", "reopened"].includes(action)) {
      return res.status(200).send("Ignored action");
    }

    const installationId = req.body.installation.id;
    const owner = req.body.repository.owner.login;
    const repo = req.body.repository.name;
    const pullNumber = req.body.pull_request.number;

    const octokit = await getOctokit(installationId);

    const files = await getPullRequestFiles(
      octokit,
      owner,
      repo,
      pullNumber
    );

    console.log("Changed files:");

    let finalReview = `# 🤖 AI Code Review\n\n`;

    for (const file of files) {
      console.log("-----------------------------");
      console.log("File:", file.filename);

      if (!shouldReviewFile(file)) {
        console.log("Skipping file");
        continue;
      }

      if (!file.patch) {
        console.log("No patch available");
        continue;
      }

      console.log("Sending to Ollama...");

      const chunks = chunkDiff(file.patch);

      let fileReview = "";

      for (const chunk of chunks) {
        const review = await reviewWithOllama(chunk);
        fileReview += review + "\n\n";
      }

      finalReview += `## File: ${file.filename}\n\n`;
      finalReview += fileReview;
      finalReview += `---\n\n`;

      console.log("Review done for:", file.filename);
    }

    await postReviewComment(
      octokit,
      owner,
      repo,
      pullNumber,
      finalReview
    );

    console.log("Review comment posted to PR");

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Error processing webhook");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});