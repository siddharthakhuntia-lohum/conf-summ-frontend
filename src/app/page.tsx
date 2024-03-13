"use client";
import { useState, useEffect, Suspense, useTransition } from "react";
import axios from "axios";
import { SummaryCard } from "@/components/SummaryCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const fetchItems = async () => {
  const response = await axios.get("http://localhost:3030/summaries");
  return response;
};

export default function Home() {
  const [videoItems, setVideoItems] = useState<
    | {
        id: string;
        length: string;
        summary: string;
        created_at: string;
        publisher: string;
        rating: string;
        thumbnail_url: string;
        publish_date: string;
        title: string;
      }[]
  >([
    // {
    //   "summary": "The lyrics of the song \"Not Done Fighting\" convey a message of resilience and determination. The artist expresses a feeling of being overwhelmed by challenges but refuses to give up. They reflect on their past struggles and how far they have come, from living in difficult circumstances to now laughing all the way to the bank. The artist acknowledges the support of both rich and poor friends and emphasizes the importance of staying true to oneself. Despite facing opposition and feeling misunderstood, the artist remains steadfast in their fight and refuses to walk away or lose everything. The lyrics convey a sense of strength, defiance, and perseverance in the face of adversity.",
    //   "length": "196",
    //   "created_at": "1710264744.472916",
    //   "publisher": "Sony Pictures Animation",
    //   "rating": "None",
    //   "thumbnail_url": "https://i.ytimg.com/vi/2xomWWncop0/hq720.jpg?sqp=-oaymwEXCNUGEOADIAQqCwjVARCqCBh4INgESFo&rs=AOn4CLDHAq8UYQmUvdFF8N1FaqyIOuTcxw",
    //   "publish_date": "1701369000.0",
    //   "id": "2xomWWncop0",
    //   "title": "Spider-Man: Across the Spider-Verse | \"Am I Dreaming\" Metro Boomin x A$AP Rocky x Roisee | Lyrics"
    // }
  ]);

  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const allVideoQuery = useQuery({
    queryKey: ["allItems"],
    queryFn: fetchItems,
  });

  useEffect(() => {
    // console.log("allVideoQuery");
    //TODO: Check why this console is being called multiple times (3 times) 
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
    <Suspense fallback={<div>Loading Suspense...</div>}>
      <div className="flex justify-center items-center m-4 mt-0 sm:m-0">
        <div className="w-full sm:w-8/12">
          {videoItems &&
            videoItems.map((videoItem, index) => (
              <Link href={`/summary/${videoItem?.id}`} key={index}>
                <SummaryCard videoData={videoItem} />
              </Link>
            ))}
        </div>
      </div>
    </Suspense>
  );
}
