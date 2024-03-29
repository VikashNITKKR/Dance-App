"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useReactMediaRecorder , ReactMediaRecorder} from "react-media-recorder";

export default function Component() {

  const [isRecording , setIsRecording] = useState(false);
  const [isRecordingSaved , setIsRecordingSaved] = useState(false);

  const demoRef = useRef<HTMLVideoElement |null>(null);
  const userVideoRef = useRef<HTMLVideoElement |null>(null);

  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);



  function handleRecordingButton(){
    if (isRecording){
      stopRecording();
      return;
    }
    else if (isRecordingSaved){
      reRecording();
    }
    else {
      startRecording();
    }
  }
  function startRecording(){
    if (!demoRef.current || !mediaRecorderRef.current )
    {
      alert("something went wrong please try again later ");
      return ; 
    }
    demoRef.current.currentTime =0;
    demoRef.current.play();
    setIsRecording(true);

    
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);
      localStorage.setItem('recordedVideo', videoUrl);
      setRecordedVideoUrl(videoUrl);
      setRecordedChunks([]);
    };
    
  }
  function stopRecording(){
    if (!demoRef.current)
    {
      alert("something went wrong please try again later ");
      return ; 
    }
    
    demoRef.current.pause();
    
    // demoRef.current.currentTime =0;
    setIsRecording(false);
    setIsRecordingSaved(true);

    mediaRecorderRef.current.ondataavailable=function (){};
    mediaRecorderRef.current.stop();
  }
  function reRecording(){
    // clear previous Recording first 
    startRecording();
    
  }
  function previewRecording(){

    if (!userVideoRef.current || !localStorage.getItem("recordedVideo"))
    return;

    userVideoRef.current.srcObject = null ;
    userVideoRef.current.src = localStorage.getItem("recordedVideo");
    userVideoRef.current.load();
    userVideoRef.current.play();

    console.log(userVideoRef.current.src);
  }

  useEffect(()=>{
    if (!userVideoRef.current)
    return ;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream)=>{
      userVideoRef.current.srcObject= stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
    })
  },[])

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-5xl">
        <div className="w-full aspect-w-16 aspect-h-9">
          <span className="w-full h-full object-cover shadow-md rounded-md bg-muted" />
          <video src="dance.mp4" ref={demoRef} className="w-full aspect-video rounded-md bg-muted"  ></video>
        </div>
        <div className="w-full aspect-w-16 aspect-h-9">
          {/* <span className="w-full h-full object-cover shadow-md rounded-md bg-muted" /> */}
          <video ref={userVideoRef}  className="w-full aspect-video rounded-md bg-muted" autoPlay typeof="video/webm" ></video>
          
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={handleRecordingButton} className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500">
          { isRecording  ?  "Stop Recording " : isRecordingSaved ? "ReRecord" : "Start Recording"}
        </button>
        <button disabled={isRecording || !isRecordingSaved} onClick={previewRecording}  className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500">
          Play Recorded Video
        </button>
        {/* <button className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium text-white bg-yellow-400 rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500">
          Submit Recording
        </button> */}
      </div>
      <div className="mt-8">
        { isRecordingSaved && !isRecording ? <Link 
          className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          href="/videoComparision"
        >
          Continue
        </Link> : 
        <Button  onClick={()=>{if(isRecording) alert("Please Stop the Recording first"); }}
          className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Continue
        </Button> }
      </div>
    </main>
  )
}



