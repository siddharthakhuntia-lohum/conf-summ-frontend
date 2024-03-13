"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";

export default function VideoSubmitForm() {
  const [videoURL, setVideoURL] = useState("");
  const [isGeneratingLoading, setIsGeneratingLoading] = useState(false);
  const [errors, setErrors] = useState<{ videoURL?: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="w-full flex justify-center items-center flex-col md:flex-row gap-4">
            <Input
              id="videoURL"
              type="text"
              placeholder="Enter a Youtube URL"
              className="p-3 rounded-md w-96"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <Button
              className="p-3 text-white rounded-md w-24"
              type="submit"
              disabled={isGeneratingLoading}
            >
              Submit
            </Button>
          </div>
          {errors.videoURL && (
            <span className="text-red-500 text-sm">{errors.videoURL}</span>
          )}
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
