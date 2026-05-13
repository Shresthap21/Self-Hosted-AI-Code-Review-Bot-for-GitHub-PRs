import fs from "fs";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

export async function getOctokit(installationId) {
  const privateKey = fs.readFileSync(
    process.env.GITHUB_PRIVATE_KEY_PATH,
    "utf8"
  );

  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey,
    installationId
  });

  const installationAuth = await auth({
    type: "installation"
  });

  return new Octokit({
    auth: installationAuth.token
  });
}

export async function getPullRequestFiles(octokit, owner, repo, pullNumber) {
  const response = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber
  });

  return response.data;
}
export async function postReviewComment(
  octokit,
  owner,
  repo,
  pullNumber,
  body
) {
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: pullNumber,
    body
  });
}