import type { Track, CamelotKey } from "./model";
import { GENRE_SIMILARITY } from "./genre.similarity";

const WEIGHTS = {
  genre: 0.4,
  bpm: 0.4,
  key: 0.2,
};

const BPM_RANGES = {
  // Sweet spot = within 5 bpm
  // Maybe later replace with percentage values
  S: 5,
  // Hard limit = within 20 bpm
  T: 20,
  // Curve steepness
  p: 1.7,
};

function scoreBpm(fromBpm: number, toBpm: number) {
  const diffs = [
    Math.abs(toBpm - fromBpm),
    // Doubletime / halftime
    Math.abs(toBpm * 2 - fromBpm),
    Math.abs(toBpm / 2 - fromBpm),
  ];
  const diff = Math.min(...diffs);
  if (diff <= BPM_RANGES.S) return 1;
  if (diff >= BPM_RANGES.T) return 0;
  const x = (diff - BPM_RANGES.S) / (BPM_RANGES.T - BPM_RANGES.S);
  return 1 - Math.pow(x, BPM_RANGES.p);
}

function scoreKey(fromKey: CamelotKey, toKey: CamelotKey) {
  const fromNumber = fromKey.slice(0, -1);
  const fromLetter = fromKey.slice(-1);

  const toNumber = toKey.slice(0, -1);
  const toLetter = toKey.slice(-1);
  if (fromKey === toKey) {
    return 1;
  } else if (fromNumber === toNumber) {
    return 0.8;
  } else if (
    fromLetter === toLetter &&
    Math.abs(Number(fromNumber) - Number(toNumber)) === 1
  ) {
    return 0.7;
  } else {
    return 0;
  }
}
function scoreGenre(from: string, to: string): number {
  const f = from.toLowerCase();
  const t = to.toLowerCase();
  return GENRE_SIMILARITY[f]?.[t] ?? 0;
}
export default function scoreTransition(from: Track, to: Track) {
  console.log(GENRE_SIMILARITY["House"]);
  console.log(GENRE_SIMILARITY[from.genre]?.[to.genre]);
  return (
    WEIGHTS.bpm * scoreBpm(from.bpm, to.bpm) +
    WEIGHTS.key * scoreKey(from.camelotKey, to.camelotKey) +
    WEIGHTS.genre * scoreGenre(from.genre, to.genre)
  );
}
