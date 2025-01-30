import { useEffect, useState } from "react";

const backendUrls = process.env.NEXT_PUBLIC_BACKEND_URLS?.split(",") || [];

export function BackendStatus() {
  //const [status, setStatus] = useState("Checking backend status...");
  //const [status, setStatus] = useState<"online" | "offline">("offline");

  const [statuses, setStatuses] = useState<Record<string, string>>({});
  //const [onlineBackends, setOnlineBackends] = useState<string[]>([]);

  useEffect(() => {
    const eventSources: EventSource[] = [];

    backendUrls.forEach((url) => {
      const eventSource = new EventSource(`${url}/api/status`);

      eventSource.onmessage = () => {
        setStatuses((prev) => ({ ...prev, [url]: "online" }));
        // setOnlineBackends((prev) => [...new Set([...prev, url])]); // Add if not already in the list
      };

      eventSource.onerror = () => {
        setStatuses((prev) => ({ ...prev, [url]: "offline" }));
        // setOnlineBackends((prev) => prev.filter((backend) => backend !== url)); // Remove offline backends
        eventSource.close();
      };

      eventSources.push(eventSource);
    });

    return () => {
      eventSources.forEach((es) => es.close());
    };
  }, [backendUrls]);

  // Function to fetch data only from online backends
  /*  const fetchFromOnlineBackend = async () => {
    if (onlineBackends.length === 0) {
      console.error("No online backend available.");
      return;
    }

    const backend = onlineBackends[0]; // Use the first available backend
    try {
      const response = await fetch(`${backend}/api/status`);
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Failed to fetch from", backend, error);
    }
  };
*/
  return (
    <div className="status-container">
      <h4 className="text-md font-bold">Backend Status</h4>
      {backendUrls.map((url) => (
        <div key={url} className="flex items-center space-x-2">
          <span
            className={`dot ${
              statuses[url] === "online" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span>
            {url}: {statuses[url] || "checking..."}
          </span>
        </div>
      ))}
    </div>
  );
}
