import React from "react";
import Head from "next/head";
import Image from "next/image";
import techNews from "../../data/images/techNews.png";

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About - Tech News Aggregator</title>
        <meta
          name="description"
          content="Learn more about our tech news aggregation site."
        />
      </Head>
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center">
            <Image
              src={techNews}
              alt="tech news logo"
              width={350}
              height={350}
            />
          </div>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to tech news aggregator. This is a collection of the latest
            and most relevant tech news articles from various reliable sources.
            The goal is to provide you with up-to-date information and insights
            in the world of technology, all in one place.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            This platform is designed to help tech enthusiasts, professionals,
            and anyone interested in technology to stay informed with ease. We
            hope you find our service valuable and engaging.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
