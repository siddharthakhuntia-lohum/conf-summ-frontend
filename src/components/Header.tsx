import React, { useEffect, useState } from "react";
import Link from "next/link";

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
      <Link href="/">Lohum Conference Summarizer</Link>
    </header>
  );
};

export default Header;
