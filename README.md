# yt-clipper
### Clip/Trim YouTube Videos

This self-host application enables you to clip and download specific segments from YouTube videos with ease.

**Key Features:**

* Seamless Clipping: Extract video portions from YouTube URLs using `yt_dlp` and `ffmpeg`.
* Quality Control: Customize video clip quality settings to achieve optimal results.
* Direct Downloads: Stream the clipped video directly to your browser for immediate download.
* Dockerized Convenience: Simplified deployment with included Dockerfiles for both frontend and backend services.

**Getting Started**

1. Clone the Repository:

   git clone [https://github.com/zeeshanjan/yt-clipper.git](https://github.com/zeeshanjan/yt-clipper.git)

2. Build and Run with Docker:

   ```bash
   cd yt-clipper
   docker-compose up -d
   ```
   
   This command builds the Docker images and runs the application in detached mode.

**Using yt-clipper**

1. Access the Frontend: Open the frontend (http://localhost:3000) application in your web browser.
2. Provide YouTube URL: Paste the URL of the YouTube video you want to clip.
3. Set Clip Timing: Specify the start and end times for your desired clip segment.
4. Choose Output Filename: Select a name for the downloaded video file.
5. Create Clip: Click the "Create Clip" button. The application will process the request and provide a download link for the clipped video.

**Development Setup**

1. Clone the Repository:

   git clone [https://github.com/zeeshanjan/yt-clipper.git](https://github.com/zeeshanjan/yt-clipper.git)

2. Install Dependencies:

   * Backend:

```bash
     cd yt-clipper/backend
     pip install -r requirements.txt
     python3 main.py
```

* Frontend:

```bash
     cd yt-clipper/frontend
     npm install
```

3. Run Development Servers:

   * Backend:
   
   ```bash 
     python3 main.py
   ```

   * Frontend:
   ```bash
     npm run dev
   ```

**Contributing**

We welcome contributions to this project! Refer to the CONTRIBUTING.md file for details.

**License**

This project is licensed under the MIT License - see the LICENSE file for details.

**Enjoy clipping your favorite YouTube videos!**
