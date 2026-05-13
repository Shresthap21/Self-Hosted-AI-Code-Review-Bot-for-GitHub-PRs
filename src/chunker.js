export function chunkDiff(diff, maxSize = 1500) {
  const chunks = [];

  if (!diff) return chunks;

  let current = "";

  const lines = diff.split("\n");

  for (const line of lines) {
    if ((current + line).length > maxSize) {
      chunks.push(current);
      current = "";
    }
    current += line + "\n";
  }

  if (current) chunks.push(current);

  return chunks;
}