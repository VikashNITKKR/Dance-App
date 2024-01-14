"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";

export default function Component() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying , setIsPlaying] = useState(false);
  
  
  const handleRestartClick = () => {
    // Check if the video ref exists
    if (videoRef.current) {
      videoRef.current.currentTime =0;
      setIsPlaying(true);
      videoRef.current.play();
    }
  };
  useEffect(()=>{
    if (videoRef.current){
      videoRef.current.onended = ()=>{
        setIsPlaying(false);
      }
    }
  },[videoRef])
  const handlePlayClick = () => {
    // Check if the video ref exists
    if (videoRef.current) {
      if(isPlaying){
        videoRef.current.pause();
        setIsPlaying(false);
      }
      else {
        videoRef.current.play();
        setIsPlaying(true);
      }
      
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="rounded-xl overflow-hidden max-w-2xl w-full">
        <video ref={videoRef} src="dance.mp4" className="w-full aspect-video rounded-md bg-muted"  ></video>
      </div>
      <div className="flex justify-center mt-10 gap-4">
        <Button className="bg-green-500" onClick={handlePlayClick}>
          {/* <Link className="text-white no-underline" href="#"> */}
            {isPlaying ? " Pause " : " Play "}
          {/* </Link> */}
        </Button>
        {/* <Button className="bg-yellow-400" onClick={handlePauseClick} > */}
          {/* <Link className="text-white no-underline" href="#"> */}
            {/* Pause */}
          {/* </Link> */}
        {/* </Button> */}
        <Button className="bg-red-500" onClick={handleRestartClick}>
          {/* <Link className="text-white no-underline" href="#"> */}
            Restart
          {/* </Link> */}
        </Button>
      </div>
      <div className="mt-8">
        <Button className="bg-blue-600">
          <Link className="text-white no-underline" href="/compare">
            Continue
          </Link>
        </Button>
      </div>
    </div>
  )
}




