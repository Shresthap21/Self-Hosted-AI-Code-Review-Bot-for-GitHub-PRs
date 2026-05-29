export async function reviewWithOllama(diffChunk) {
  const prompt = `You are a code reviewer. Review this git diff.

Look ONLY at changed lines (starting with + or -) and identify real bugs or issues.

Reply in this format:
**Bug:** \`[exact changed line]\` — [what is wrong and how to fix it]

If no real bug exists, reply only: No significant issues found.

Git diff:
${diffChunk}`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: 0,
        num_predict: 200
      }
    })
  });

  const data = await response.json();
  return data.response;
}