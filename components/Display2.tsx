"use client";
import Image from "next/image";
import React, { useState } from "react";

const Display = () => {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [prompt, setPrompt] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      // tonyassi/text-to-image
      // stabilityai/stable-diffusion-2-1
      // https://api-inference.huggingface.co/models/runawayml/stable-diffusion-vi-5
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

    
  };

  return (
    <section className="mt-16 w-full max-w-[40em]">
      <div className="flex w-full flex-col gap-2">
        <form
          className="relative flex items-center justify-center "
          onSubmit={handleSubmit}
        >
          <Image
            src="/assets/link.svg"
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
            width={10}
            height={10}
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className="url_input peer"
          />
          <button
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            type="submit"
          >
            ↵
          </button>
        </form>
        {summary && (
          <div className="link_card">
            <div className="copy_btn">
              <Image
                src="/assets/copy.svg"
                alt="copy_icon"
                className="h-[40%] w-[40%] object-contain"
                width={10}
                height={10}
              />
            </div>
            <p>
              {!loading && output && (
                <div className="result-image">
                  <img src={output} alt="art" />
                </div>
              )}
            </p>
          </div>
        )}

        {loading === 1 && (
          <div className="bg-white p-3">
            <div className="flex animate-pulse space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-[50vh]"></div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setarticle(item)}
              className="link_card"
            >
              <div className="copy_btn">
                <Image
                  src="/assets/copy.svg"
                  alt="copy_icon"
                  className="h-[40%] w-[40%] object-contain"
                  width={10}
                  height={10}
                />
              </div>
              <p>{item.url}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Display;
