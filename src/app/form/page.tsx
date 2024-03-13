"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Check } from "lucide-react";

const VIDEO_SOURCE_LIST: { label: string; value: string }[] = [
  { label: "Youtube", value: "youtube" },
  { label: "Vimeo", value: "vimeo" },
  { label: "Dailymotion", value: "dailymotion" },
  { label: "AWS S3", value: "aws-s3" },
];

export default function VideoSubmitForm() {
  const [videoURL, setVideoURL] = useState("");
  const [isGeneratingLoading, setIsGeneratingLoading] = useState(false);
  const [errors, setErrors] = useState<{ videoURL?: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSource, setVideoSource] = useState("youtube");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateForm = () => {
    let errors: { videoURL?: string } = {};
    if (!videoURL) {
      errors.videoURL = "Video URL is required";
    } else if (
      !videoURL.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)
    ) {
      errors.videoURL = "Invalid URL";
    }
    setErrors(errors);

    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();

    setIsGeneratingLoading(true);
    if (isFormValid) {
      try {
        const videoSummary = await axios.post(
          "http://localhost:3030/get-summary",
          {
            videoURL,
            videoSource,
          }
        );
        console.log(videoSummary);
        setIsGeneratingLoading(false);
        setVideoURL("");
        setIsModalOpen(true);
        console.log("Form submitted successfully!");
      } catch (error) {
        setIsGeneratingLoading(false);
        console.error(error);
      }
    } else {
      setIsGeneratingLoading(false);
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-gray-200  flex justify-center items-center flex-col"
          style={{ height: "30vh" }}
        >
          <div className="w-[500px] flex justify-center items-center flex-col gap-4">
            <Input
              id="videoURL"
              type="text"
              placeholder="Enter a Youtube URL"
              className="p-3 rounded-md w-96"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            {errors.videoURL && (
              <span className="text-red-500 text-sm">{errors.videoURL}</span>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="w-96" asChild>
                <Button
                  variant="outline"
                  className="flex justify-start font-normal"
                >
                  {
                    VIDEO_SOURCE_LIST.find((item) => item.value === videoSource)
                      ?.label
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {VIDEO_SOURCE_LIST.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() => setVideoSource(item.value)}
                    disabled={item.value !== "youtube"}
                    className="w-[372px]"
                  >
                    {item.value === videoSource && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    {item.value === "youtube"
                      ? item.label
                      : item.label + " (coming soon)"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="p-3 text-white rounded-md w-24"
              type="submit"
              disabled={isGeneratingLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
