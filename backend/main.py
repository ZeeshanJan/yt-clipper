import uvicorn
from api import app
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


if __name__ == "__main__":
    # uvicorn.run(app, host="0.0.0.0", port=8000)
    host = str(os.getenv("HOST"))
    port = int(os.getenv("PORT"))

    print(f"Host: {host} - and type: {type(host)}")
    print(f"Port: {port} - and type: {type(port)}")

    uvicorn.run(app, host=host, port=port)
