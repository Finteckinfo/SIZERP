"use client";

import React from "react";
import { useState } from "react";


export default function LargeTestimonial() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="py-12 md:py-20 mt-5">
          <div className="space-y-3 text-center">
            <div className="relative inline-flex">
              <svg
                className="absolute -left-6 -top-2 -z-10"
                width={40}
                height={49}
                viewBox="0 0 40 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7976 -0.000136375L39.9352 23.4746L33.4178 31.7234L13.7686 11.4275L22.7976 -0.000136375ZM9.34947 17.0206L26.4871 40.4953L19.9697 48.7441L0.320491 28.4482L9.34947 17.0206Z"
                  fill="#95C461"
                />
              </svg>
              <img
                className="rounded-full"
                src='/images/jayweb3.jpg'
                width={78}
                height={78}
                alt="JayWeb3"
              />
            </div>
            <p className="text-2xl font-bold textcolor1 mt-5">
            "We built this ERP system because we were tired of juggling five different tools to manage projects, teams, and payments. Our mission is to streamline your workflow, reward productivity transparently through tokens, and {" "}
              <em className="italic textcolor2">help you scale without the chaos.</em>,
              Whether you're running a remote startup, a creative agency, or a growing tech team — this is the all-in-one solution we wish we had years ago."
            </p>
            <div className="text-sm font-medium text-gray-500">
              <span className="textcolor2">Jay</span>{" "}
              <span className="textcolor2">/</span>{" "}
              <a className="textcolor2" href="#0">
                CEO, Founder - Sizland
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
