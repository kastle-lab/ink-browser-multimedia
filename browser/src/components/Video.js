import React, { useState } from 'react';
import YouTube from 'react-youtube';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Video({ setItemInVideoData }) {
  const [videoId, setVideoId] = useState("xc32OQoYvOw");
  const [videoSearch, setVideoSearch] = useState("");

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: { autoplay: 1 }
  };

  async function handlePause(event) {
    // Get the video’s current time in seconds.
    const pauseTime = event.target.getCurrentTime();
    console.log("Video paused at:", pauseTime);
    const keywords = await getOcrTopics(videoId, pauseTime);
    console.log({keywords})
    setItemInVideoData(keywords);
  }

  return (
    <div style={{width: '100%', height: '100%', objectFit: 'cover', display: 'flex', flexDirection: 'column' }}>
    <div className='right-search' style={{ width: '100%', paddingBottom: '5px' }}>
        <TextField
            style={{ width: '100%' }}
            size="small"
            id="video-id-field"
            label="Video ID"
            value={videoSearch}
            onChange={(e) => setVideoSearch(e.target.value)}
        />
        <Button onClick={() => setVideoId(videoSearch)} variant="contained">Enter</Button>
    </div>
    <YouTube
        style={{width: '100%', height: '100%'}}
        videoId={videoId}
        opts={opts}
        onPause={handlePause}
    ></YouTube>
    </div>


  );
}

async function getOcrTopics(videoId, pauseTime) {
  try {
    const response = await fetch('http://localhost:3001/api/ocrTopics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, pauseTime })
    });
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    console.log("data is", data)
    // Return the enriched keyword objects as they are.
    return data.keywords;
  } catch (error) {
    console.error("Error fetching OCR keywords:", error);
    return [{
      name: "Error",
      summary: "Failed to fetch keywords",
      description: error.message,
    }];
  }
}

export default Video;
