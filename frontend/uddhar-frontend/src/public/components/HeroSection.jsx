// Description: Hero section consisting of image stack in left side and related text in right side.

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { texts, heroImg } from "../data/Data";


const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImg.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-around h-screen max-md:h-auto bg-gradient-to-b from-amber-200 to-gray-100 px-5 max-md:flex-col">
      {/* Left: Image Stack */}
      <div className="relative max-md:w-full w-1/2 min-md:min-h-100 h-130 overflow-hidden max-md:min-w-100 mx-10">
        {heroImg.map((img, i) => (
          <motion.img
            key={`Image ${uuidv4()}`}
            src={img}
            alt={`Image ${i}`}
            className="absolute w-full h-full object-cover rounded-lg shadow-lg"
            initial={{ y: 100, opacity: 0 }}
            animate={i === index ? { y: 0, opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ display: i === index ? "block" : "none" }}
          />
        ))}
      </div>
      {/* Right: Text Section */}
      <div className="text-center w-1/3 overflow-hidden max-md:mt-5 max-md:w-full">
        <motion.div
          key={index}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl font-bold">{texts[index].title}</h1>
          <p className="text-lg mt-2 text-gray-600">{texts[index].subtitle}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
