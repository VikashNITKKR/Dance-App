import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const RecordView = ({
  showPreview = true,
  setShowPreview,
}: {
  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
}) => {
  const [recordedBlob, setRecordedBlob] = useState(null);

  const saveVideoToLocalstorage = (blob: Blob) => {
    const reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
      const dataUrl = reader.result;
      console.log(dataUrl);

      localStorage.setItem("recordedVideo", dataUrl as string);
      console.log(dataUrl);
    };
    reader.readAsDataURL(blob);
  };
  useEffect(() => {
    console.log("showPreview", showPreview);
  }, [showPreview]);

  return (
    <div>
      <ReactMediaRecorder
        video={true}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <button
              onClick={() => {
                setShowPreview(true);

                startRecording();
                setRecordedBlob(null);
              }}
            >
              Start Recording
            </button>
            <button
              onClick={() => {
                setShowPreview(false);
                stopRecording();
                saveVideoToLocalstorage(recordedBlob);
              }}
            >
              Stop Recording
            </button>
            {!showPreview ? (
              <video
                src={mediaBlobUrl ?? ""}
                controls
                autoPlay
                loop
                onLoadedData={(e) => {
                  // Capture the recorded blob when the video loads
                  if (e?.target?.src !== recordedBlob) {
                    setRecordedBlob(e.target.src);
                  }
                }}
              />
            ) : null}
          </div>
        )}
      />
    </div>
  );
};

export default RecordView;
