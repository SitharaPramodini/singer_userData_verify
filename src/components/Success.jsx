import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Success = () => {


  
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        // window.close();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);



  return (
    <div>
    <img src="logo2.png" className="flex justify-center mx-auto w-24 mt-6"></img>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center"
    >
      <img
        src="success.gif"
        className="mt-28 h-auto w-52 mb-4"
        alt="Success"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />

      {imageLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-4 text-2xl mt-8 font-extrabold leading-none tracking-tight text-green-500 md:text-5xl lg:text-6xl">
            You have<br></br> acknowledged your <br></br> data!
          </h1>
          <p className="my-8 text-sm font-light px-6 text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
            Thank you for choosing Singer Finance. We will process your details.
          </p>
          <p className="text-gray-300 text-sm text-center">Now you can close the tab</p>
        </motion.div>
      )}
    </motion.div>
    </div>
  );
};

export default Success;
