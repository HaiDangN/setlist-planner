import { useState, useMemo } from "react";
import "./App.css";
import { SAMPLE_TRACKS } from "./features/tracks/data.sample.ts";
import type { Track } from "./features/tracks/model.ts";
import scoreTransition from "./features/tracks/score.ts";
import {
  getBpmBadgeClass,
  getGenreBadgeClass,
  getKeyBadgeClass,
} from "./features/tracks/classnames";

function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(
    SAMPLE_TRACKS[0] ?? null
  );
  function handleCurrentTrackClick(trackId: string) {
    setCurrentTrack(
      SAMPLE_TRACKS.find((track) => track.id === trackId) ?? currentTrack
    );
  }
  const suggestions = useMemo(() => {
    if (!currentTrack) return [];
    return SAMPLE_TRACKS.filter((t) => t.id !== currentTrack.id)
      .map((t) => ({
        track: t,
        score: scoreTransition(currentTrack, t),
      }))
      .sort((a, b) => b.score - a.score);
  }, [currentTrack]);
  return (
    <main>
      <section className="tracklist">
        Tracklist:
        <p>Click a track to see it's suggested transition tracks</p>
        <div className="tracklist__list">
          {SAMPLE_TRACKS.map((track: Track) => (
            <button
              key={track.id}
              onClick={() => handleCurrentTrackClick(track.id)}
            >
              {track.title} - {track.artist}
            </button>
          ))}
        </div>
      </section>
      <section className="suggestions">
        <div className="suggestions__header">
          <p>Suggestions:</p>
          <div className="suggestions__columns">
            <span>Track</span>
            <span>BPM</span>
            <span>Genre</span>
            <span>Key</span>
            <span>Energy</span>
          </div>
        </div>

        <ul className="suggestions__rows">
          {currentTrack && (
            <li className="suggestions__item current" key={currentTrack.id}>
              <span className="suggestions__item-name">
                Current: {currentTrack.title} - {currentTrack.artist}
              </span>
              <span className="badge bpm">{currentTrack.bpm}</span>
              <span className="badge genre">{currentTrack.genre}</span>
              <span className="badge key">{currentTrack.camelotKey}</span>
              <span className="badge energy">{currentTrack.energy}</span>
            </li>
          )}
          {/* Render memoized suggested tracks */}
          {currentTrack &&
            suggestions.map(({ track, score }) => (
              <li className="suggestions__item" key={track.id}>
                <span className="suggestions__item-name">
                  {track.title} - {track.artist}: {score.toFixed(2)}
                </span>
                <span className={getBpmBadgeClass(currentTrack.bpm, track.bpm)}>
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
                <span className="badge energy">{track.energy}</span>
              </li>
            ))}
        </ul>
      </section>
      <section className="setlist"></section>
    </main>
  );
}
export default App;
