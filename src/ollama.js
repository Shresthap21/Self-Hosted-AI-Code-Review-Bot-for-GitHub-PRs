export async function reviewWithOllama(diffChunk) {
  const prompt = `
You are an AI GitHub pull request reviewer.

You are reviewing ONLY the provided git diff.

STRICT RULES:
- Review ONLY changed lines from the diff.
- Ignore unchanged code completely.
- Do NOT explain the whole application.
- Do NOT give generic software engineering advice.
- Do NOT hallucinate missing features.
- Do NOT invent security issues.
- Do NOT invent issue IDs, ticket numbers, PR references, or metadata.
- Do NOT mention issues outside the diff.
- Every issue MUST directly relate to a changed line.
- Keep response concise.
- Do NOT repeat the same issue in multiple categories.
- If no real issue exists, reply exactly:
"No significant issues found."

Focus ONLY on:
1. Potential bugs introduced
2. Style or readability issues introduced
3. Performance issues introduced
4. Security risks directly introduced
5. Small improvement suggestions directly related to the diff

Diff:
${diffChunk}
`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: 0
      }
    })
  });

  const data = await response.json();

  return data.response;
}