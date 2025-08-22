import { describe, it, expect } from "vitest";
import scoreTransition from "./score";
import type { Track } from "./model";

describe("scoreTransition", () => {
  it("scores high when bpm/genre/key align", () => {
    const t1: Track = {
      id: "1",
      title: "Song A",
      artist: "DJ A",
      bpm: 120,
      genre: "house",
      energy: 3,
      camelotKey: "8A",
    };
    const t2: Track = {
      id: "2",
      title: "Song B",
      artist: "DJ B",
      bpm: 122,
      genre: "house",
      energy: 4,
      camelotKey: "8A",
    };
    expect(scoreTransition(t1, t2)).toBeGreaterThan(0.9);
  });
});
