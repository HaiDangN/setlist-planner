import { useState } from "react";
import "./App.css";
import { SAMPLE_TRACKS } from "./features/tracks/data.sample.ts";
import type { Track } from "./features/tracks/model.ts";
import scoreTransition, {
  scoreGenre,
  scoreKey,
} from "./features/tracks/score.ts";
import type { CamelotKey } from "./features/tracks/model";

function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(
    SAMPLE_TRACKS[0] ?? null
  );
  function handleCurrentTrackClick(trackId: string) {
    setCurrentTrack(
      SAMPLE_TRACKS.find((track) => track.id === trackId) ?? currentTrack
    );
  }
  function getBpmBadgeClass(from: number, to: number): string {
    const diff = Math.abs(from - to);
    if (diff <= 5) return "badge bpm excellent";
    if (diff <= 10) return "badge bpm good";
    if (diff <= 20) return "badge bpm ok";
    else return "badge bpm bad";
  }
  function getGenreBadgeClass(from: string, to: string): string {
    const similarity = scoreGenre(from, to);
    if (similarity === 1) return "badge genre excellent";
    if (similarity >= 0.8) return "badge genre good";
    if (similarity >= 0.5) return "badge genre ok";
    else return "badge genre bad";
  }
  function getKeyBadgeClass(from: CamelotKey, to: CamelotKey): string {
    const keyDifference = scoreKey(from, to);
    if (keyDifference >= 0.8) return "badge key excellent";
    if (keyDifference >= 0.6) return "badge key good";
    else return "badge key bad";
  }
  return (
    <main>
      <section className="tracklist-panel">
        Tracklist:
        {SAMPLE_TRACKS.map((track: Track) => (
          <button
            key={track.id}
            onClick={() => handleCurrentTrackClick(track.id)}
          >
            {track.title} - {track.artist}
          </button>
        ))}
      </section>
      <section className="suggestions-panel">
        Suggestions:
        <li className="suggested-track" key={currentTrack?.id}>
          Current Track: {currentTrack?.title} - {currentTrack?.artist}:{" "}
          <div className="suggested-track__badges">
            <span className="badge">{currentTrack?.bpm}</span>
            <span className="badge">{currentTrack?.genre}</span>
            <span className="badge">{currentTrack?.camelotKey}</span>
          </div>
        </li>
        {currentTrack &&
          SAMPLE_TRACKS.filter((track) => track.id !== currentTrack?.id)
            .sort(
              (a, b) =>
                scoreTransition(currentTrack, b) -
                scoreTransition(currentTrack, a)
            )
            .map((track) => (
              <li className="suggested-track" key={track.id}>
                {track.title} - {track.artist}:{" "}
                {scoreTransition(currentTrack, track).toFixed(2)}
                <div className="suggested-track__badges">
                  <span
                    className={getBpmBadgeClass(currentTrack.bpm, track.bpm)}
                  >
                    {track.bpm}
                  </span>
                  <span
                    className={getGenreBadgeClass(
                      currentTrack.genre,
                      track.genre
                    )}
                  >
                    {track.genre}
                  </span>
                  <span
                    className={getKeyBadgeClass(
                      currentTrack.camelotKey,
                      track.camelotKey
                    )}
                  >
                    {track.camelotKey}
                  </span>
                </div>
              </li>
            ))}
      </section>
      <section className="setlist-panel"></section>
    </main>
  );
}
console.log(SAMPLE_TRACKS[0]);
console.log(SAMPLE_TRACKS[1]);
console.log(scoreTransition(SAMPLE_TRACKS[0], SAMPLE_TRACKS[1]));
export default App;
