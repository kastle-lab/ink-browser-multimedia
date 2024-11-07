
import React, { useState } from 'react'
import YouTube from "react-youtube";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Video({ setItemInVideoData }) {

    const [videoId, setVideoId] = useState("y7sXDpffzQQ");
    const [videoSearch, setVideoSearch] = useState("");

    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
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
                onPause={(_) => {
                    setItemInVideoData(getVideoContent())
                }}
            ></YouTube>
        </div>
    )

}

function getVideoContent() {

    // TODO replace with actual generated list
    const videoItems = [
        {
            name: "Other",
            summary: "Hello, World!",
            description: "Programming is COOL! :D",
        },
    ]

    return videoItems;
}

export default Video
