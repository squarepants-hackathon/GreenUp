// import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import * as tmImage from "@teachablemachine/image";

import scan from "../assets/scan.png";
import recycle from "../assets/recycle.png";
import classification from "../assets/classification.png";
import DataModal from "../constants/DataModal";

const videoConstraints = {
  width: window.innerWidth * 1,
  height: window.innerHeight * 1,
  facingMode:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "environment"
      : "user",
};

const WebcamCapture = ({ setOpenModal, setTypeProbability, category }) => {
  const webcamRef = useRef(null);
  let webcam;

  const capture = async () => {
    let URL = "https://teachablemachine.withgoogle.com/models/";

    if (category === "e-waste") {
      URL += "/mCsoP6AyQ";
    } else if (category === "plastic-waste") {
      URL += "mCsoP6AyQ/";
    } else {
      URL += "CS19oS292/";
    }

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const model = await tmImage.load(modelURL, metadataURL);

    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    webcam.update();
    const prediction = await model.predict(webcam.canvas);

    let highestProb = 0;
    let typeProb = 0;

    prediction.map((val) => {
      let currentProb = val.probability * 100;

      if (currentProb > highestProb) {
        highestProb = currentProb;
        typeProb = val.className;
      }
    });

    if (parseInt(highestProb) > 85) {
      setOpenModal((prev) => true);
      setTypeProbability(typeProb);
      console.log(typeProb);
    } else {
      alert("retry!!");
    }
  };

  async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop);
  }

  return (
    <>
      <div
        className="absolute overflow-hidden w-screen h-screen"
        style={{
          background: "rgba(225, 225, 225, 0.5)",
          backdropFilter: "blur(14px)",
        }}
      >
        <Webcam
          style={{
            height: "100%",
            maxHeight: "100vh",
            maxWidth: "100vw",
            width: "100%",
          }}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          videoConstraints={videoConstraints}
        />
      </div>
      <div className="absolute z-10 lg:right-[12rem] lg:top-[26rem] sm:bottom-[10rem] bottom-[2rem]">
        <button
          onClick={capture}
          className="rounded-xl text-white font-semibold text-center bg-green-700 hover:bg-opacity-80 transition-all duration-200 px-4 py-2 mx-auto"
        >
          Classify
        </button>
      </div>
      <div className="results"></div>
    </>
  );
};

export default function WebCam() {
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);

  const category = queryParams.get("category");

  const [value, setValue] = useState("");
  const [typeProbability, setTypeProbability] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    function handleNavigation() {
      value.length !== 0 && navigate("../object", { state: value });
    }
    handleNavigation();
  }, [value.length, value, navigate]);

  return (
    <>
      {openModal === true && (
        <DataModal setOpenModal={setOpenModal} typeProb={typeProbability} />
      )}
      <div className="flex lg:flex flex-col lg:relative bg-black bg-opacity-80 w-screen h-screen">
        <div className="flex lg:relative flex-col justify-center items-center h-full w-full overflow-hidden">
          <WebcamCapture
            setTypeProbability={setTypeProbability}
            setOpenModal={setOpenModal}
            category={category}
          />
        </div>

        <div
          className="flex-col bg-white lg:right-0 lg:absolute items-center h-full lg:w-[30rem] w-full px-4 py-0"
          style={{
            background: "rgba(225, 225, 225, 0.5)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="flex-col justify-center">
            <div className="flex-col font-bold text-3xl my-4">
              <div className="flex justify-center">
                <h2 className="">How we</h2>
                <h2 className="text-green-500 pl-2">work</h2>
              </div>
            </div>
            <div className="bg-green-100 rounded-md bg-opacity-30 lg:space-y-8 space-y-4 py-4 px-2 lg:mt-7 mt-[1.55rem]">
              <div className="flex space-x-1">
                <img
                  src={scan}
                  className="w-[45px] h-[40px] sm:w-[3rem] sm:h-auto"
                  alt=" "
                />
                <div className="flex items-center justify-center font-semibold text-[0.8rem] sm:text-[1rem]">
                  Scan image of the healthcare waste which is need to be
                  disposed.
                </div>
              </div>
              <div className="flex space-x-1">
                <img
                  src={classification}
                  className="w-[40px] h-[40px] sm:w-[3rem] sm:h-auto"
                  alt=" "
                />
                <div className="flex items-center justify-center font-semibold text-[0.8rem] sm:text-[1rem]">
                  Classify waste through our ML model in 5 categories specified
                  by WHO.
                </div>
              </div>
              <div className="flex space-x-1">
                <img
                  src={recycle}
                  className="w-[40px] h-[40px] sm:w-[3rem] sm:h-auto"
                  alt=" "
                />
                <div className="flex items-center justify-center font-semibold text-[0.8rem] sm:text-[1rem]">
                  Get to know the correct disposal method of the identified
                  waste.
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 style={{ color: "white", margin: "auto" }}>{value}</h1>
      </div>
    </>
  );
}
