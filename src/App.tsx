import { useState } from "react";
import "./App.css";
import { SAMPLE_TRACKS } from "./features/tracks/data.sample.ts";
import type { Track } from "./features/tracks/model.ts";

function App() {
  return (
    <main>
      <section className="tracklist-panel">
        {SAMPLE_TRACKS.map((track: Track) => (
          <li key={track.id}>
            {track.title} - {track.artist}
          </li>
        ))}
      </section>
      <section className="suggestions-panel"></section>
      <section className="setlist-panel"></section>
    </main>
  );
}

export default App;
