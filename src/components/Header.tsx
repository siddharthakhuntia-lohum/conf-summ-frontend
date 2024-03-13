import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiExternalLink } from "react-icons/fi";

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isSticky ? "sticky" : ""} bg-gray-800 text-white py-4 px-6`}
    >
      <div className="flex justify-between items-center">
        <Link href="/">Lohum Conference Summarizer</Link>

        <Button asChild variant="link" className="text-grey-200">
          <Link href="/form">
            Submit A Video
            <FiExternalLink className="ml-2" />
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
