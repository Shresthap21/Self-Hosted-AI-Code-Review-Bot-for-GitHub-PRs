const IGNORED_FILES = [
  ".vscode/",
  "package-lock.json",
  "yarn.lock",
  ".min.js"
];

export function shouldReviewFile(file) {
  if (!file.patch) {
    return false;
  }

  const filename = file.filename;

  if (IGNORED_FILES.some(ignore => filename.includes(ignore))) {
    return false;
  }

  return true;
}