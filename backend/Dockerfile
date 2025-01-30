# Use Python 3.10 as base image
FROM python:3.10

# Set working directory inside the container
WORKDIR /app

# Install system dependencies (for FFmpeg)
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Copy only requirements first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose FastAPI's port (optional, but good practice)
EXPOSE 8000

# Run FastAPI server with proper exec format
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
