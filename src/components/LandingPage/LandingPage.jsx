import React from 'react';
import Footer from './Footer';
import LandingNavBar from './LandingNavBar.';
import Questions from './Questions';
import { Link } from 'react-router-dom';

const LandingPage = () => {

 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-textPrimary">


      <LandingNavBar />

      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center col-span-7">
            <h1
              className="mb-4 text-zinc-600 text-6xl font-extrabold leading-none tracking-tight">
              The everything <br /> app, for work.</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              One app for projects, knowledge, conversations and more. <br /> Get more done faster—together.
            </p>
            <div className="ml-5">
              
              <Link to="/signup"  className="px-6 py-3  bg-gradient-to-r from-blue-700 to-pink-600 text-white text-lg font-semibold rounded-full shadow-md hover:from-blue-800 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400">
                Get started. It’s FREE!
              </Link>
            </div>


          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://demo.themesberg.com/landwind/images/hero.png" alt="hero image" />
          </div>
        </div>
      </section>

      <section className="bg-white" id='features'>
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">

          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 sm:text-lg">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">Work with tools
                you already use</h2>
              <p className="mb-8 font-light lg:text-xl">Deliver great service experiences fast - without the complexity of
                traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes
                with ease.</p>

              <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7">
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Continuous integration and deployment</span>
                </li>
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Development workflow</span>
                </li>
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Knowledge management</span>
                </li>
              </ul>
              <p className="mb-8 font-light lg:text-xl">Deliver great service experiences fast - without the complexity of
                traditional ITSM solutions.</p>
            </div>
            <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="https://demo.themesberg.com/landwind/images/feature-1.png" alt="dashboard feature image" />
          </div>

          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="https://demo.themesberg.com/landwind/images/feature-2.png" alt="feature image 2" />
            <div className="text-gray-500 sm:text-lg">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">We invest in
                the world’s potential</h2>
              <p className="mb-8 font-light lg:text-xl">Deliver great service experiences fast - without the
                complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil,
                and deploy changes with ease.</p>

              <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7">
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Dynamic reports and dashboards</span>
                </li>
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Templates for everyone</span>
                </li>
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Development workflow</span>
                </li>
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Limitless business automation</span>
                </li>
                <li className="flex space-x-3">

                  <svg className="flex-shrink-0 w-5 h-5 text-purple-500" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900">Knowledge management</span>
                </li>
              </ul>
              <p className="font-light lg:text-xl">Deliver great service experiences fast - without the complexity of
                traditional ITSM solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 flex">
        <div className="px-4  w-full text-center p-32">
          <figure className="w-full">
            <svg className="h-12 mx-auto mb-3 text-gray-400" viewBox="0 0 24 27" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor" />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl">"Just one small positive thought in the morning can change your whole day"</p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
              <div className="flex items-center divide-x-2 divide-gray-500">
                <div className="pr-3 font-medium text-gray-900">— Dalai Lama</div>
                <div className="pl-3 text-sm font-light text-gray-500">CEO at Google</div>
              </div>
            </figcaption>
          </figure>
        </div>
        <div className='flex justify-center items-center w-full p-10 bg-[#fafcff] mb-40'>
        <img src="public\image.png" alt="none" className='h-96 w-112' />
      </div>
      </section>

     


      <section id='Querys'>
        <Questions />
      </section>

      <section id='about' className='mt-40 w-full'>
        <Footer />
      </section>

      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>


    </div>
  );
};

export default LandingPage;