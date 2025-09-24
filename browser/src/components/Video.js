import React, { useState } from 'react';
import YouTube from 'react-youtube'; // React wrapper for embedding YouTube videos
import TextField from '@mui/material/TextField'; // Input field (MUI)
import Button from '@mui/material/Button'; // Button (MUI)
import Tooltip from '@mui/material/Tooltip'; // Tooltip (MUI)

/**
 * Video Component
 *
 * Purpose:
 * --------
 * - Embeds a YouTube video in the app.
 * - Lets users enter a YouTube video ID manually.
 * - Listens for pause events → sends current frame to backend → gets keywords.
 *
 * Props:
 * ------
 * - setItemInVideoData: callback to send extracted keywords up to parent component.
 * - setVideoId: callback to send selected videoId up to parent component.
 */
function Video({ setItemInVideoData, setVideoId }) {
  // Local state for video ID and input field
  const [videoId, setLocalVideoId] = useState("xc32OQoYvOw"); // default YouTube video ID
  const [videoSearch, setVideoSearch] = useState(""); // user input for new video

  // YouTube player options
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: { autoplay: 1 } // autoplay video when loaded
  };

  /**
   * handlePause
   * -----------
   * Triggered when the user pauses the video.
   * - Gets the current time in seconds.
   * - Calls backend API to extract OCR keywords from the paused frame.
   * - Updates parent with extracted keywords.
   */
  async function handlePause(event) {
    const pauseTime = event.target.getCurrentTime(); // get paused timestamp
    console.log("Video paused at:", pauseTime);

    const keywords = await getOcrTopics(videoId, pauseTime); // call backend
    console.log({ keywords });

    setItemInVideoData(keywords); // pass results to parent component
  }

  /**
   * handleVideoChange
   * -----------------
   * Updates the current videoId when user enters a new one.
   * - Updates local state.
   * - Sends new videoId to parent.
   */
  const handleVideoChange = () => {
    setLocalVideoId(videoSearch); // local state update
    setVideoId(videoSearch); // notify parent
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Input for entering a new YouTube video ID */}
      <Tooltip
        title="VideoID of the youtube videos that you want to understand through Ink Browser"
        arrow
      >
        <div className='right-search' style={{ width: '100%', paddingBottom: '5px' }}>
          <TextField
            style={{ width: '100%' }}
            size="small"
            id="video-id-field"
            label="Video ID"
            value={videoSearch}
            onChange={(e) => setVideoSearch(e.target.value)}
          />
          <Button onClick={handleVideoChange} variant="contained">Enter</Button>
        </div>
      </Tooltip>

      {/* YouTube player */}
      <YouTube
        style={{ width: '100%', height: '100%' }}
        videoId={videoId} // video currently selected
        opts={opts} // config options
        onPause={handlePause} // event listener
      />
    </div>
  );
}

/**
 * getOcrTopics
 * ------------
 * Helper function to call backend API and fetch OCR keywords.
 *
 * Params:
 * - videoId: the YouTube video ID
 * - pauseTime: timestamp in seconds where the video was paused
 *
 * Returns:
 * - List of enriched keywords from backend (or an error object if failed).
 */
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
    console.log("data is", data);

    // Return keywords directly
    return data.keywords;
  } catch (error) {
    console.error("Error fetching OCR keywords:", error);
    // Return fallback error keyword so UI doesn’t break
    return [{
      name: "Error",
      summary: "Failed to fetch keywords",
      description: error.message,
    }];
  }
}

export default Video;
