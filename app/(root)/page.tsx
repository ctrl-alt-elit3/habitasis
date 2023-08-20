"use client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { MoonLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const font = Poppins({ weight: "600", subsets: ["latin"] });

interface PostResult {
  breakdown: {
    fuelPrice: {
      fromPostcode: number;
      estimatedData: boolean;
      average: number;
      weightedPostcode: number;
    };
    vehicleRego: {
      fromPostcode: number;
      estimatedData: boolean;
      average: number;
      weightedPostcode: number;
    };
    rentValue: {
      fromPostcode: number;
      estimatedData: boolean;
      average: number;
      weightedPostcode: number;
    };
  };
  postcode: string;
  score: number;
}

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState<PostResult>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length != 4) setError(false);
  }, [input]);

  const submit = async () => {
    // Check if character limit is exceeded
    if (input.length != 4) return setError(true);
    else setError(false);

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
      // const data1 = await res.json();
      // console.log(data1);
      const data: PostResult = await res.json();
      console.log(data);

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
        <p className="text-2xl font-bold old text-center pb-2 font-mono	">
          How <span className="text-lime-400 font-bold">liveable</span> is your
          suburb?
        </p>
        <p className="text-base font-light text-opacity-10 old text-center pb-4 font-mono	">
          habitasis - livability in numbers.
        </p>
        {/* Error message (Not implemented) */}
        {error && (
          <p className="text-center text-xs pt-1 text-red-500">
            Character limit exceeded, please enter less text
          </p>
        )}
        {/* Input field */}
        <div className="flex flex-row gap-4 justify-center w-1/2 mx-auto">
          <div className="relative w-full">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-2 border-gray-300 bg-white p-2 rounded-xl text-sm focus:outline-none resize-none"
              placeholder="Enter your postcode"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={submit}
              className="w-full bg-lime-400 text-text1 px-8 py-2 text-xl font-medium transition ease-in-out duration-500 hover:scale-110 font-mono rounded-xl"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-4">
                  <p>Loading!</p>
                  {/* <MoonLoader size={20} color="white" /> */}
                </div>
              ) : (
                "Discover"
              )}
            </Button>
          </div>
        </div>

        {/* Output */}
        {suggestion && (
          <div className="flex flex-row gap-10 mt-6">
            <Card className="p-6 px-10">
              <CardHeader>
                <CardTitle>
                  Your postcode, {suggestion.postcode}, has a livability score
                  of:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="">
                  <div className="text-6xl text-lime-400">
                    {suggestion.score}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 px-10 flex-1">
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700">
                  <span className="text-lg font-bold">Average Fuel Prices</span>
                  <div className="flex flex-row justify-between">
                    <span>
                      Your postcode: <br />$
                      {suggestion.breakdown.fuelPrice.average.toFixed(2)}
                    </span>
                    <span>
                      Average (NSW): <br />
                      {suggestion.breakdown.fuelPrice.average.toFixed(2)}
                    </span>
                    <span>
                      Weighted score: <br />$
                      {suggestion.breakdown.fuelPrice.average.toFixed(2)}
                    </span>
                  </div>
                  <br />
                  <span className="text-lg font-bold">
                    Monthly Vehicle Registrations
                  </span>
                  <br />
                  <div className="flex flex-row justify-between">
                    <span>
                      Your postcode: <br />
                      {suggestion.breakdown.vehicleRego.fromPostcode.toFixed(2)}
                    </span>
                    <span>
                      Average (NSW): <br />
                      {suggestion.breakdown.vehicleRego.average.toFixed(2)}
                    </span>
                    <span>
                      Weighted score: <br />
                      {suggestion.breakdown.vehicleRego.weightedPostcode.toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <br />
                  <span className="text-lg font-bold">Average Weekly Rent</span>
                  <br />
                  <div className="flex flex-row justify-between">
                    <span>
                      Your postcode: <br />$
                      {suggestion.breakdown.rentValue.fromPostcode.toFixed(2)}
                    </span>
                    <span>
                      Average (NSW): <br />$
                      {suggestion.breakdown.rentValue.average.toFixed(2)}
                    </span>
                    <span>
                      Weighted score: <br />
                      {suggestion.breakdown.rentValue.weightedPostcode.toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <div className="basis-1/2">
              <div className="mt-8 items-center ">
                <div className="relative w-full rounded-md bg-gray-100 p-4">
                  <div className="text-sm text-gray-700">
                    <span className="text-xl">Score Breakdown</span>
                    <br />
                    <span className="text-lg">Average Fuel Prices</span>
                    <br />
                    <div className="flex flex-row justify-between">
                      <span>
                        Your postcode: <br />$
                        {suggestion.breakdown.fuelPrice.average.toFixed(2)}
                      </span>
                      <span>
                        Average (NSW): <br />
                        {suggestion.breakdown.fuelPrice.average.toFixed(2)}
                      </span>
                      <span>
                        Weighted score: <br />$
                        {suggestion.breakdown.fuelPrice.average.toFixed(2)}
                      </span>
                    </div>
                    <br />
                    <span className="text-lg">
                      Monthly Vehicle Registrations
                    </span>
                    <br />
                    <div className="flex flex-row justify-between">
                      <span>
                        Your postcode: <br />
                        {suggestion.breakdown.vehicleRego.fromPostcode.toFixed(
                          2
                        )}
                      </span>
                      <span>
                        Average (NSW): <br />
                        {suggestion.breakdown.vehicleRego.average.toFixed(2)}
                      </span>
                      <span>
                        Weighted score: <br />
                        {suggestion.breakdown.vehicleRego.weightedPostcode.toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <br />
                    <span className="text-lg">Average Weekly Rent</span>
                    <br />
                    <div className="flex flex-row justify-between">
                      <span>
                        Your postcode: <br />$
                        {suggestion.breakdown.rentValue.fromPostcode.toFixed(2)}
                      </span>
                      <span>
                        Average (NSW): <br />$
                        {suggestion.breakdown.rentValue.average.toFixed(2)}
                      </span>
                      <span>
                        Weighted score: <br />
                        {suggestion.breakdown.rentValue.weightedPostcode.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
