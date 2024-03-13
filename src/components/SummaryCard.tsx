import * as React from "react";
import Image from "next/image";
import { formatEPOCHDate, calulateReadingTime } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CenterDot from "./CenterDot";

export type VideoData = {
  id: string;
  length: string;
  summary: string;
  created_at: string;
  publisher: string;
  rating: string;
  thumbnail_url: string;
  publish_date: string;
  title: string;
};

export function SummaryCard({ videoData }: { videoData: VideoData }) {
  const { summary, title, created_at, thumbnail_url } = videoData;

  const formattedDate = formatEPOCHDate(created_at);
  const readingTime = calulateReadingTime(summary);

  return (
    <Card className="w-full min-h-72 my-4 bg-neutral-200  flex justify-center items-center">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-5/12 flex justify-center items-center lg:ml-4 lg:my-4">
          <Image
            src={thumbnail_url}
            alt="Video Thumbnail"
            className="w-full rounded-lg  lg:m-0"
            width={400}
            height={400}
          />
        </div>
        <div className="w-full lg:w-7/12">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            {summary.length > 400 ? `${summary.substring(0, 400)}...` : summary}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
