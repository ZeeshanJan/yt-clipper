// ClipForm.tsx
"use client";
import { useState, useRef } from "react";
import { Button } from "@/components";

interface ClipFormProps {
  setMessage: (message: string) => void;
}

export function ClipForm({ setMessage }: ClipFormProps) {
  const [url, setUrl] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [outputName, setOutputName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(""); // Declare downloadUrl state here
  const videoRef = useRef(null);

  //setMessage(message);
  const handleSubmit = async () => {
    if (!url || !outputName) {
      setMessage("YouTube URL and output file name are required.");
      return;
    }

    setMessage("Processing your request...");

    try {
      const response = await fetch("http://localhost:8000/api/clip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, startTime, endTime, outputName }),
      });

      //const data = await response.json();

      if (!response.ok) {
        setMessage("Something went wrong.");
        return;
      }

      // Convert response stream to a Blob
      const blob = await response.blob();
      const clipUrl = URL.createObjectURL(blob); // Create a URL for the Blob

      setDownloadUrl(clipUrl);
      setMessage("Clip created successfully!");
      // Trigger the download immediately
      const downloadLink = document.createElement("a");
      downloadLink.href = clipUrl;
      downloadLink.download = `${outputName}.mp4`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      setMessage(`An error occurred while processing your request: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">YouTube URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter YouTube video URL"
          />
        </div>

        {url && (
          <div className="mt-4">
            <iframe
              ref={videoRef}
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${new URL(
                url
              ).searchParams.get("v")}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Start Time:</label>
          <input
            type="number"
            step="0.01"
            value={startTime}
            onChange={(e) => setStartTime(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Time:</label>
          <input
            type="number"
            step="0.01"
            value={endTime}
            onChange={(e) => setEndTime(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Output File Name:
          </label>
          <input
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="e.g., clip"
          />
        </div>

        <Button onClick={handleSubmit} className="w-full mt-4">
          <span>Create Clip</span>
        </Button>

        {downloadUrl && (
          <div className="mt-4 text-center">
            <a
              href={downloadUrl}
              download={`${outputName}.mp4`}
              className="text-blue-600 underline"
            >
              Download Clip
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClipForm;
