/**
 * Safely parses strings that may not be parsable. Returns an object with the parsed
 * value if possible, otherwise return an object containing the error.
 * @param str - JSON string.
 */
export function safeJsonParse(str: string): { error: Error | null, value: unknown } {
  try {
    return { error: null, value: JSON.parse(str) };
  } catch (err) {
    return { error: err, value: null };
  }
}
