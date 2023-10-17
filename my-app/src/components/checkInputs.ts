/**
 * Defines the kinds of sequence we are thinking of---the answer to
 * the puzzle. We might imagine swapping in many of these and using
 * the same puzzle infrastructure.
 *
 * @param input A 3-number sequences
 * @returns true or false, depending on if the sequence matches
 */
export function pattern(input: string): boolean {
  if (input.includes("brief")) return true;
  if (input.includes("verbose")) return true;
  if (input.includes("load_file")) return true;
  if (input.includes("view")) return true;
  if (input.includes("search")) return true;
  return false;
}

export function checkFile(input: string): boolean {
  if(input.includes("header.csv")) return true;
  return false;
}
