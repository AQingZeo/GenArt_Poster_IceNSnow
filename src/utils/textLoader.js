export async function loadLocalText(relativePath) {
  const response = await fetch(relativePath, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Failed to load text: ${relativePath} (${response.status})`);
  }
  return await response.text();
}

export function normalizeNewlines(text) {
  return text.replace(/\r\n?/g, '\n');
}

