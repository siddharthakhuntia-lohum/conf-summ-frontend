"use client";
import { useState, useEffect, Suspense, useTransition } from "react";
import axios from "axios";
import { CardWithForm } from "@/components/SummaryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const fetchItems = async () => {
  const response = await axios.get("http://localhost:3035/summaries");
  return response;
};

export default function Home() {
  const [videoItems, setVideoItems] = useState<
    | {
        videoId: string;
        channelName: string;
        summary: string;
        createdAt: string;
      }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [videoURL, setVideoURL] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isGeneratingLoading, setIsGeneratingLoading] = useState(false);

  const allVideoQuery = useQuery({
    queryKey: ["allItems"],
    queryFn: fetchItems,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingLoading(true);
    try {
      const videoSummary = await axios.post("http://localhost:3035/summary", {
        video: videoURL,
      });

      setVideoItems((prev) => {
        return [videoSummary.data, ...prev];
      });
      setIsGeneratingLoading(false);

    } catch (error) {
      setIsGeneratingLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    startTransition(() => {
      if (allVideoQuery.isSuccess) {
        setVideoItems(allVideoQuery.data.data);
        setLoading(false);
      }
    });
  }, [allVideoQuery.data, allVideoQuery.isSuccess]);

  if (allVideoQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (allVideoQuery.isError) {
    return <div>Error</div>;
  }

  return (
    // TODO: Make use of suspense
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-gray-600  flex justify-center items-center"
          style={{ height: "30vh" }}
        >
          <Input
            id="videoURL"
            type="text"
            placeholder="Enter a Youtube URL"
            className="p-3 rounded-md w-2/6 mx-2"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <Button className="p-3 text-white rounded-md w-24" type="submit" disabled={isGeneratingLoading}>
            Submit
          </Button>
        </div>
      </form>
      <div className="flex justify-center items-center my-4">
        {/* TODO: Make it paginated */}
        <div className="grid grid-cols-2 gap-4">
          {videoItems &&
            videoItems.map((videoItem, index) => (
              <Link href={`/summary/${videoItem?.videoId}`} key={index}>
                <CardWithForm videoData={videoItem} />
              </Link>
            ))}
        </div>
      </div>
    </Suspense>
  );
}
