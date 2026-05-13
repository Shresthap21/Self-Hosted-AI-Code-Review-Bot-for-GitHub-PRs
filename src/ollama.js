export async function reviewWithOllama(diffChunk) {
  const prompt = `
You are a senior software engineer reviewing a GitHub pull request.

Review ONLY the changed code in this diff.

========================
STRICT RULES
========================
- Ignore formatting-only changes
- Ignore removed comments
- Do NOT hallucinate functionality outside the diff
- Do NOT invent issue IDs, ticket numbers, or metadata
- Do NOT assume missing features or external context
- Do NOT speculate about future failures or edge cases not visible in diff
- Do NOT mention tools, systems, or files not present in the diff
- Be concise and strictly grounded in the diff

If no real issue exists, explicitly say "No issues found".

========================
FOCUS ON
========================
1. Bugs
2. Performance issues
3. Security concerns
4. Readability
5. Maintainability

========================
OUTPUT FORMAT (MUST FOLLOW EXACTLY)
========================

## Summary
Short summary.

## Issues Found
- Issue:
  Suggestion:

## Final Verdict
Looks good / Needs changes

========================
DIFF
========================
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
      stream: false
    })
  });

  const data = await response.json();

  return data.response;
}