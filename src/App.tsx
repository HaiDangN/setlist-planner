import { useState } from "react";
import "./App.css";
import { SAMPLE_TRACKS } from "./features/tracks/data.sample.ts";
import type { Track } from "./features/tracks/model.ts";
import scoreTransition from "./features/tracks/score.ts";

function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(
    SAMPLE_TRACKS[0] ?? null
  );
  return (
    <main>
      <section className="tracklist-panel">
        Tracklist:
        {SAMPLE_TRACKS.map((track: Track) => (
          <li key={track.id}>
            {track.title} - {track.artist}
          </li>
        ))}
      </section>
      <section className="suggestions-panel">
        Suggestions:
        {currentTrack &&
          SAMPLE_TRACKS.filter((track) => track.id !== currentTrack?.id).map(
            (track) => (
              <li key={track.id}>
                {track.title} - {track.artist}:{" "}
                {scoreTransition(currentTrack, track).toFixed(2)}
              </li>
            )
          )}
      </section>
      <section className="setlist-panel"></section>
    </main>
  );
}
console.log(SAMPLE_TRACKS[0]);
console.log(SAMPLE_TRACKS[1]);
console.log(scoreTransition(SAMPLE_TRACKS[0], SAMPLE_TRACKS[1]));
export default App;
