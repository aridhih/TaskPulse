import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Questions from './Questions';
import Features from "./Features";
import LandingNavBar from './LandingNavBar.';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-textPrimary">
      <LandingNavBar />

      {/* Hero Section (No Animations on Text) */}
      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-20 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
          <div className="mr-auto place-self-center col-span-7">
            <h1 className="mb-4 text-zinc-600 text-6xl font-extrabold leading-none tracking-tight">
              The everything <br /> app, for work.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              One app for projects, knowledge, conversations, and more. <br /> Get more done faster—together.
            </p>
            <div>
              <Link
                to="/signup"
                className="px-6 py-3 bg-gradient-to-r from-blue-700 to-pink-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-800 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
              >
                Get started. It’s FREE!
              </Link>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://demo.themesberg.com/landwind/images/hero.png" alt="hero" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Features Section (Now Separate Component) */}
      <Features />

      {/* Questions Section */}
      <section id="Querys" className='w-full'>
        <Questions />
      </section>

      {/* Footer */}
      <section id="about" className='w-full'>
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
