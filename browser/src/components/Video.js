
import React, { useState } from 'react'
import YouTube from "react-youtube";

function Video({ setItemInVideoData }) {

    const [videoId, setVideoId] = useState("y7sXDpffzQQ");

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    return (
        <div>
            <YouTube
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
