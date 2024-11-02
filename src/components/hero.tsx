'use client';

import React, { ReactNode } from 'react';
import { Highlight } from './highlights';
import Image from 'next/image';

interface HeroProps {
  highlightText: string;
  headingText: string;
  subheadingText: string;
  children: ReactNode;
}

export function Hero({ highlightText, headingText, subheadingText, children }: HeroProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <Image
        src="/path/to/hero-image.jpg"
        alt="Hero image description"
        width={800} // specify width
        height={400} // specify height
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9945FF] to-[#14F195] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <p className="uppercase text-sm lg:font-lg font-bold">
              <Highlight>{highlightText}</Highlight>
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl mt-4">
              {headingText}
            </h1>
            <p className="mt-6 text-pretty text-base font-medium text-gray-400 sm:text-xl/8">
              {subheadingText}
            </p>
            <div className="mt-10 flex justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9945FF] to-[#14F195] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}