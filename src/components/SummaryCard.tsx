import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type VideoData = {
  videoId: string;
  channelName: string;
  summary: string;
  createdAt: string;
};

export function CardWithForm({ videoData }: { videoData: VideoData }) {
  const { videoId, channelName, summary, createdAt } = videoData;

  const TEXT = summary;

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>{videoId}</CardTitle>
        <CardDescription>A small TLDR</CardDescription>
      </CardHeader>
      <CardContent>
        {TEXT.length > 300 ? `${TEXT.substring(0, 300)}...` : TEXT}
      </CardContent>
    </Card>
  );
}
