"use client";

import { Card, ClipForm } from "@/components";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <h2 className="text-center text-xl font-bold">YouTube Video Clipper</h2>
        <ClipForm setMessage={setMessage} />
        {message && (
          <div>
            {message.startsWith("Clip created successfully!") && (
              <p className="mt-4 text-center text-sm text-green-600">
                {message}
                {/* Download link will be handled within ClipForm now */}
              </p>
            )}
            {!message.startsWith("Clip created successfully!") && (
              <p className="mt-4 text-center text-sm text-red-600">{message}</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
