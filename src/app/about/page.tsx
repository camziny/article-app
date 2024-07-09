import React from "react";
import Head from "next/head";

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
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            About Tech News Aggregator
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Tech News Aggregator. This is a collection of the latest
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
