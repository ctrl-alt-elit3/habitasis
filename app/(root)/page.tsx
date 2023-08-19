"use client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { MoonLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

const font = Poppins({ weight: "600", subsets: ["latin"] });

interface PostResult {
  postcode: string;
  score: string;
  breakdown: {
    fuelPrice: {
      fromPostcode: number;
      average: number;
      weightedPostcode: number;
    };
    vehicleRego: {
      fromPostcode: number;
      average: number;
      weightedPostcode: number;
    };
    rentValue: {
      fromPostcode: number;
      average: number;
      weightedPostcode: number;
    };
  };
}

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState<PostResult>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length < 4) setError(false);
  }, [input]);

  const submit = async () => {
    // Check if character limit is exceeded
    if (input.length > 4) return setError(true);

    // Set loading state
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      // const suggestion: { result: string } = await res.json();
      // const { result } = suggestion;
      // const data = await res.json();
      // console.log(data);
      const data: PostResult = await res.json();

      // const result = data.postcode;
      // console.log("result", result);

      setSuggestion(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto py-12">
        <h2 className="text-2xl font-b old text-center pb-4 font-mono	">
          Find your next suburb 🏘️
        </h2>

        {/* Input field */}
        <div className="flex flex-col gap-4 justify-center w-1/2 mx-auto">
          <div className="relative w-full">
            {/* Error message (Not implemented) */}
            {error && (
              <p className="text-xs pt-1 text-red-500">
                Character limit exceeded, please enter less text
              </p>
            )}
            <textarea
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-2 border-gray-300 bg-white p-4 rounded-lg text-sm focus:outline-none resize-none"
              placeholder="Enter your topic here"
            />
          </div>
          <div className="flex w-full justify-center">
            <Button
              type="button"
              onClick={submit}
              className="bg-sec_btn1 text-text1 px-8 py-2 rounded border border-text1 text-xl font-medium transition ease-in-out duration:500 hover:scale-110 font-mono"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-4">
                  <p>Loading...</p>
                  <MoonLoader size={20} color="white" />
                </div>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          {/* Output */}
          {suggestion && (
            <div className="mt-8 items-center ">
              <p className="text-lg font-semibold pb-2 font-mono">
                Your suburb result:
              </p>
              <div className="relative w-full rounded-md bg-gray-100 p-4">
                <p className="text-sm text-gray-700">
                  Postcode: {suggestion.postcode}
                  <br />
                  Fuel Price:
                  <br />
                  &nbsp;&nbsp;From Postcode:{" "}
                  {suggestion.breakdown.fuelPrice.fromPostcode.toFixed(2)}
                  <br />
                  &nbsp;&nbsp;Average:{" "}
                  {suggestion.breakdown.fuelPrice.average.toFixed(2)}
                  <br />
                  &nbsp;&nbsp;Weighted Postcode:{" "}
                  {suggestion.breakdown.fuelPrice.weightedPostcode.toFixed(2)}
                  <br />
                  Vehicle Rego:
                  <br />
                  &nbsp;&nbsp;From Postcode:{" "}
                  {suggestion.breakdown.vehicleRego.fromPostcode.toFixed(2)}
                  <br />
                  &nbsp;&nbsp;Average:{" "}
                  {suggestion.breakdown.vehicleRego.average.toFixed(2)}
                  <br />
                  &nbsp;&nbsp;Weighted Postcode:{" "}
                  {suggestion.breakdown.vehicleRego.weightedPostcode.toFixed(2)}
                  <br />
                  Rent Value:
                  <br />
                  &nbsp;&nbsp;From Postcode:{" "}
                  {suggestion.breakdown.rentValue.fromPostcode.toFixed(2)}
                  <br />
                  &nbsp;&nbsp;Average:{" "}
                  {suggestion.breakdown.rentValue.average.toFixed(2)}
                  <br />
                  &nbsp;&nbsp;Weighted Postcode:{" "}
                  {suggestion.breakdown.rentValue.weightedPostcode.toFixed(2)}
                </p>
                <hr className="my-3" /> {/* Horizontal line */}
                <div className="text-lg">Score: {suggestion.score} ✨</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
