import React, { useRef, useState, useEffect } from 'react';
import playButton from "./play-button-arrowhead.png";
import PostCss from './Post.module.css';

function VideoPlayer({ children, video, maxH, videoPlayerRef }) {
    // console.log(maxH)
    // const videoPlayerRef = useRef(null);
    const mainBoxRef = useRef(null);
    const [isPlayed, setIsPlayed] = useState(false);
    // const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const containerRect = mainBoxRef.current.getBoundingClientRect();
            if (containerRect.top < 0 && isPlayed) {
                setIsPlayed(false);
                videoPlayerRef.current.pause();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isPlayed]);

    const handleVideoClick = () => {
        const video = videoPlayerRef.current;
        if (isPlayed) {
            video.pause();
            setIsPlayed(false);
        } else {
            video.play();
            setIsPlayed(true);
        }
    };

    // const handleMute = (isMuted) => {
    //     videoPlayerRef.current.muted = isMuted;
    //     setIsMuted(isMuted);
    // }

    const handleVideoEnded = () => {
        setIsPlayed(false);
    };

    return (
        <div style={{ position: "relative" }} ref={mainBoxRef}>
            <video
                style={{ display: "flex", width: "100%", maxHeight: maxH, backgroundColor: "black" }}
                ref={videoPlayerRef}
                src={video}
                onClick={handleVideoClick}
                onTouchStart={handleVideoClick}
                onEnded={handleVideoEnded}
            />
            {!isPlayed && (
                <img className={PostCss.video_player_play_button} src={playButton} alt="playButton" onClick={handleVideoClick} />
            )}
            {/* {isMuted ?
                <img className={PostCss.video_player_mute_button} src={muteButton} onClick={() => handleMute(false)} alt="speaker" />
                :
                <img className={PostCss.video_player_mute_button} src={speaker} onClick={() => handleMute(true)} alt="speaker" />
            } */}
        </div>
    );
}

export default VideoPlayer;
