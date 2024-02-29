"use client";
import axios from "axios";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

const fetchVideo = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [, id] = queryKey;
  return axios.get(`http://localhost:3035/summary`, {
    params: { video: id },
  });
};

export default function BlogPost({ params }: { params: { id: string } }) {
  const { id } = params;

  const videoSummary = useQuery({
    queryKey: ["video", id],
    queryFn: fetchVideo,
  });

  if (videoSummary.isLoading) {
    return <div>Loading...</div>;
  }

  if (videoSummary.isError) {
    return <div>Error: {videoSummary.error.message}</div>;
  }

  console.log(videoSummary.data);

  const { videoId, channelName, summary, createdAt } = videoSummary.data?.data;
  return (
    <div className="flex justify-center items-center my-4 mx-8">
      <div className="max-w-screen-xl">
        <h1 className="text-2xl font-bold mb-4">
          {"TODO"}:{id}
        </h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 mb-2">Author: {channelName}</p>
          <p className="text-gray-600 mb-2">Published Date: {createdAt}</p>
        </div>
        <div className="my-8">{summary}</div>
      </div>
    </div>
  );
}
