import white from "../../public/assets/white.png";
import yellow from "../../public/assets/yellow.png";
import red from "../../public/assets/red.png";
import green from "../../public/assets/green.png";
import blue from "../../public/assets/blue.png";

import React from "react";
import { useEffect, useState } from "react";
import { bgcolor } from "@mui/system";

const DataModal = ({ setOpenModal, typeProb }) => {
  const [bgColor, setbgColor] = useState("white");
  const [textColor, setTextColor] = useState("white");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");
  const [bin, setBin] = useState("");
  const [method, setMethod] = useState("");

  useEffect(() => {
    if (typeProb === "red") {
      setBin("Auto Calving");
      setbgColor("#fe3c30");
      setTextColor("#e2e2e2");
      setImage(red);
      setHeading("Infected Waste");
      setText("Syringes, Gloves & Plastic Waste.");
      setMethod("Secured Land Filling");
    } else if (typeProb === "white") {
      setbgColor("#e2e2e2");
      setBin("Auto Calving");
      setTextColor("black");
      setImage(white);
      setHeading("Sharps");
      setText("Needle & Cut Glasses.");
      setMethod("Sharp Pit");
    } else if (typeProb === "blue") {
      setbgColor("#4bb3da");
      setBin("Auto Calving");
      setTextColor("#e2e2e2");
      setImage(blue);
      setHeading("Glassware");
      setText(
        "Anitbiotic Vials, Metallic Implants, Glassware Material Expect Cytotoxic."
      );
      setMethod("Re-Cycle");
    } else if (typeProb === "yellow") {
      setbgColor("#ffd705");
      setBin("Plasma Pyrolysis");
      setTextColor("black");
      setImage(yellow);
      setHeading("Infected Waste");
      setText(
        "Soiled, Anatomical, Chemical Liquid, Cytotoxic, Laboratory Waste Expired & Discarded Medicines."
      );
      setMethod("Deep Burial");
    } else if (typeProb === "green") {
      setbgColor("#18cd0e");
      setBin("Incineration");
      setTextColor("#e2e2e2");
      setImage(green);
      setHeading("General Waste");
      setText("Kitchen Waste, Paper, Tissues, Water Bottles & Cans.");
      setMethod("Secured Land Filling");
    }
  }, [typeProb]);

  return (
    <>
      <div
        className="fixed top-0 left-0 bg-[rgba(0,0,0,0.6)] w-screen h-screen z-10"
        onClick={() => setOpenModal(false)}
      />
      <div
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
        className={`fixed top-0 bottom-0 left-0 right-0 min-w-[300px] max-w-[400px] h-[min-content] w-full bg-[${bgColor}] text-[${textColor}] z-[999] m-auto shadow-lg rounded-lg p-4`}
      >
        <div className="flex flex-col items-center w-full space-y-1 h-full">
          <h1 className="text-center font-bold font-sans text-2xl">
            {heading}
          </h1>
          <img className="w-[20rem]" src={image} alt="image" />
          <h2 className="text-center text-lg font-bold italic">{text}</h2>
          <p className="font-bold text-center">Disposing Method : {bin}</p>
          <p className="text-xl font-bold font-sans p-2 text-center">
            Treatment Facility: {method}
          </p>
        </div>
      </div>
    </>
  );
};

export default DataModal;
