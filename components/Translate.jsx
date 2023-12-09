// huggingface.jsx
"use client";
import React, { useState } from "react";
import axios from "axios";

const Translate = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [language, setLanguage] = useState("en-es"); // Default language pair

  const fetchTranslation = async () => {
    const response = await axios({
      method: "post",
      url: "/api/huggingface", // Your serverless function endpoint
      data: { text: inputText, lang: language }, // Sending the selected language to the backend
      headers: { "Content-Type": "application/json" },
    });

    setTranslatedText(response.data.translation_text);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="to-light-blue-500 absolute inset-0 -skew-y-6 bg-gradient-to-r from-cyan-400 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mx-auto max-w-md">
            <div>
              <h1 className="text-2xl font-semibold">Hugging Face API Test</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Select Language</label>
                  <select
                    onChange={handleLanguageChange}
                    value={language}
                    className="rounded border border-gray-300 p-4 text-gray-700 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="en-es">English to Spanish</option>
                    <option value="en-de">English to German</option>
                    <option value="en-fr">English to French</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Input Text</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={inputText}
                    className="rounded border border-gray-300 p-4 text-gray-700 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={fetchTranslation}
                  className="to-light-blue-500 mt-6 rounded bg-gradient-to-r from-cyan-400 px-10 py-3 text-white shadow-md transition duration-300 hover:shadow-lg"
                >
                  Translate
                </button>
              </div>
              <div className="pt-6 text-base font-bold leading-6 sm:text-lg sm:leading-7">
                <p className="text-lg text-gray-700">{translatedText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translate;
