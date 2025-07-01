
"use client";

import React from "react";


export default function Cta() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl bgcolor2"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] bgborder blur-3xl" />
          </div>
          {/* Stripes illustration */}
          
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="text-3xl font-bold textcolor1 md:text-4xl">
            Ready to build smarter, faster, and more transparently?
            </h2>
            <h3  className="my-6 text-xl textcolor1">Start your 14-day free trial — No credit card required.</h3>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <a
                className="custom-btn-md group mb-4 w-full bgcolor1 text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                href="#0"
              >
                <span className="relative inline-flex items-center">
                  Start Free Trial{" "}
                  <span className="ml-1 tracking-normal textcolor2 transition-transform group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
