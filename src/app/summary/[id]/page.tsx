"use client";
import axios from "axios";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { formatEPOCHDate, calulateReadingTime } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import CenterDot from "@/components/CenterDot";
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";

const fetchVideo = ({ queryKey }: QueryFunctionContext<[string, string]>) => {
  const [, id] = queryKey;
  return axios.get(`http://localhost:3030/get-summary`, {
    params: { videoId: id },
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

  // console.log(videoSummary.data);

  const { summary, title, created_at, thumbnail_url, publisher } = videoSummary.data?.data;
  // {
  //   summary:
  //     'The lyrics of the song "Not Done Fighting" convey a message of resilience and determination. The artist expresses a feeling of being overwhelmed by challenges but refuses to give up. They reflect on their past struggles and how far they have come, from living in difficult circumstances to now laughing all the way to the bank. The artist acknowledges the support of both rich and poor friends and emphasizes the importance of staying true to oneself. Despite facing opposition and feeling misunderstood, the artist remains steadfast in their fight and refuses to walk away or lose everything. The lyrics convey a sense of strength, defiance, and perseverance in the face of adversity.',
  //   created_at: "1710264744.472916",
  //   publisher: "Sony Pictures Animation",
  //   thumbnail_url:
  //     "https://i.ytimg.com/vi/2xomWWncop0/hq720.jpg?sqp=-oaymwEXCNUGEOADIAQqCwjVARCqCBh4INgESFo&rs=AOn4CLDHAq8UYQmUvdFF8N1FaqyIOuTcxw",
  //   title:
  //     'Spider-Man: Across the Spider-Verse | "Am I Dreaming" Metro Boomin x A$AP Rocky x Roisee | Lyrics',
  // };
  const formattedDate = formatEPOCHDate(created_at);
  const readingTime = calulateReadingTime(summary);
  return (
    <div className="flex justify-center items-center">
      <div className="w-full sm:w-8/12 m-4 mt-0 sm:m-0 sm:mb-4">
        <div className="my-4">
          <Breadcrumb className="text-xl">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-base">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <p className="text-base">Summary</p>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
        <div className="flex justify-center items-center ">
          <div className="text-neutral-400 flex items-center">
            {publisher}
            <CenterDot />
            {formattedDate}
            <CenterDot />
            <FiBookOpen className="mr-1" />
            {readingTime} min read
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row  gap-4 mt-4">
          <div className="w-full lg:w-7/12">
            <div className="text-justify">{summary}</div>
          </div>
          <div className="w-full lg:w-5/12 flex justify-center items-start">
            <Image
              src={thumbnail_url}
              alt="Video Thumbnail"
              className="w-full rounded-lg m-4 lg:m-0"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
