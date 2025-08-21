export type CamelotKey =
  | "1A"
  | "1B"
  | "2A"
  | "2B"
  | "3A"
  | "3B"
  | "4A"
  | "4B"
  | "5A"
  | "5B"
  | "6A"
  | "6B"
  | "7A"
  | "7B"
  | "8A"
  | "8B"
  | "9A"
  | "9B"
  | "10A"
  | "10B"
  | "11A"
  | "11B"
  | "12A"
  | "12B";

export type Track = {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  genre: string;
  energy: 1 | 2 | 3 | 4 | 5;
  camelotKey: CamelotKey;
};
