from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from yt_dlp import YoutubeDL
import subprocess
import os
from io import BytesIO
from fastapi.responses import StreamingResponse
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Allow only requests from the frontend
# origins = ["http://localhost:3000"]  # Update with your frontend URL in production

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def status_updates():
    while True:
        yield f"data: Backend is running at {time.strftime('%H:%M:%S')}\n\n"
        time.sleep(2)  # Update every 2 seconds


def get_best_stream_url(url):
    try:
        ydl_opts = {"format": "best", "quiet": True}
        with YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=False)
            return info_dict["url"]
    except Exception as e:
        return None


def extract_clip(stream_url, start_time, end_time, output_name):
    duration = end_time - start_time
    # output_path = f"public/{output_name}.mp4"

    command = [
        "ffmpeg",
        "-ss",
        str(start_time),  # Start time
        "-i",
        stream_url,  # Input video stream
        "-t",
        str(duration),  # Duration of clip
        "-c:v",
        "libx264",  # Ensure compatibility
        "-preset",
        "slow",  # Faster encoding "fast" prioritizes speed over quality. "medium" provides a good balance between speed and quality. "slow" and "very slow" offer higher quality but take longer to encode.
        "-crf",
        "20",
        "-tune",
        "film",
        "-profile:v",
        "high",
        "-level",
        "4.0",
        "-c:a",
        "aac",  # Audio encoding
        "-movflags",
        "frag_keyframe+empty_moov",  # Helps with streaming
        "-f",
        "mp4",  # Output format
        "pipe:1",  # Output to stdout
    ]
    try:
        # subprocess.run(command, check=True)
        # return output_path
        result = subprocess.run(
            command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True
        )
        return BytesIO(result.stdout)
        # process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # return process.stdout

    except subprocess.CalledProcessError as e:
        print("FFmpeg Error:", e.stderr.decode())  # Debugging
        return None

    except Exception as e:
        return None


@app.get("/api/status")
async def status_stream():
    return StreamingResponse(status_updates(), media_type="text/event-stream")


@app.post("/api/clip")
async def create_clip(data: dict):
    url, start_time, end_time, output_name = (
        data["url"],
        float(data["startTime"]),
        float(data["endTime"]),
        data["outputName"],
    )

    if not url or not output_name:
        raise HTTPException(status_code=400, detail="Invalid input data")

    stream_url = get_best_stream_url(url)
    if not stream_url:
        raise HTTPException(status_code=500, detail="Failed to fetch video stream")

    # clip_path = extract_clip(stream_url, start_time, end_time, output_name)
    # if not clip_path:
    #    raise HTTPException(status_code=500, detail="Error processing video")

    # Assuming your FastAPI server is running on http://localhost:8000
    # download_url = f"http://localhost:8000/{clip_path.replace('public/', '')}"

    # return {
    #    "downloadUrl": download_url,
    #    "filePath": f"http://localhost:8000/{clip_path}",
    # }
    video_data = extract_clip(stream_url, start_time, end_time, output_name)
    if not video_data:
        raise HTTPException(status_code=500, detail="Error processing video")

    return StreamingResponse(
        video_data,
        media_type="video/mp4",
        headers={"Content-Disposition": f"attachment; filename={output_name}.mp4"},
    )
