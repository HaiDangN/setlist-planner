import { scoreGenre, scoreKey } from "./score.ts";
import type { CamelotKey } from "./model";

export function getBpmBadgeClass(from: number, to: number): string {
  const diff = Math.abs(from - to);
  if (diff <= 5) return "badge bpm excellent";
  if (diff <= 10) return "badge bpm good";
  if (diff <= 20) return "badge bpm ok";
  else return "badge bpm bad";
}
export function getGenreBadgeClass(from: string, to: string): string {
  const similarity = scoreGenre(from, to);
  if (similarity === 1) return "badge genre excellent";
  if (similarity >= 0.8) return "badge genre good";
  if (similarity >= 0.5) return "badge genre ok";
  else return "badge genre bad";
}
export function getKeyBadgeClass(from: CamelotKey, to: CamelotKey): string {
  const keyDifference = scoreKey(from, to);
  if (keyDifference >= 0.8) return "badge key excellent";
  if (keyDifference >= 0.6) return "badge key good";
  else return "badge key bad";
}
