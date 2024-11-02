import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

function App() {
  const [videoURL, setVideoURL] = useState<string>("");
  const [finalVideoURL, setFinalVideoURL] = useState<string>("");
  const playerRef = useRef<ReactPlayer>(null);
  const [displayStartTime, setDisplayStartTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [displayStopTime, setDisplayStopTime] = useState(100);
  const [stopTime, setStopTime] = useState(100);
  const vidHeight = `${(((window.innerWidth / 16) * 9) / 100) * 75}px`;

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (progress.playedSeconds > stopTime) {
      playerRef.current?.seekTo(startTime, "seconds");
    }
  };

  const changeStartTime = (start: number) => {
    if (playerRef.current) {
      if (start < stopTime) {
        setDisplayStartTime(start);
        setStartTime(start);
      } else {
        setDisplayStartTime(startTime);
      }
    }
  };

  const changeStopTime = (stop: number) => {
    if (playerRef.current) {
      if (stop > startTime) {
        setDisplayStopTime(stop);
        setStopTime(stop);
      } else {
        setDisplayStopTime(stopTime);
      }
    }
  };

  return (
    <div
      style={{ width: "100%", justifyContent: "center", paddingTop: "30px" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <input
          value={videoURL}
          placeholder="Video URL"
          style={{ width: "40%", padding: "10px" }}
          onChange={(e) => {
            setVideoURL(e.target.value);
          }}
          onBlur={(e) => {
            setFinalVideoURL(e.target.value);
          }}
        />
      </div>
      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <ReactPlayer
          ref={playerRef}
          url={finalVideoURL}
          playing
          controls
          width="75%"
          height={vidHeight}
          onReady={() =>
            playerRef.current && setStopTime(playerRef.current.getDuration())
          }
          onProgress={handleProgress}
        />
      </div>
      <span
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          paddingTop: "30px",
        }}
      >
        <div>
          Start Time:
          <input
            type="number"
            value={displayStartTime}
            onChange={(e) => {
              setDisplayStartTime(parseFloat(e.target.value));
            }}
            onBlur={() => changeStartTime(displayStartTime)}
          />
        </div>

        <div>
          End Time:
          <input
            type="number"
            value={displayStopTime}
            onChange={(e) => setDisplayStopTime(parseFloat(e.target.value))}
            onBlur={() => changeStopTime(displayStopTime)}
          />
        </div>
      </span>
      <span
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          paddingTop: "30px",
        }}
      >
        <button
          onClick={() =>
            changeStartTime(playerRef.current?.getCurrentTime() || 0)
          }
        >
          Set Start Time
        </button>
        <button
          onClick={() =>
            changeStopTime(playerRef.current?.getCurrentTime() || 100)
          }
        >
          Set Stop Time
        </button>
      </span>
    </div>
  );
}

export default App;