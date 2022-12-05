import { useEffect, useState } from "react";

const DataModal = ({ setOpenModal, typeProb }) => {
  const [bgColor, setbgColor] = useState("white");
  const [textColor, setTextColor] = useState("white");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");
  const [bin, setBin] = useState("");
  const [method, setMethod] = useState("");

  let tmp = typeProb.toLowerCase();

  useEffect(() => {
    if (tmp === "glass") {
      setBin("Auto Calving");
      setbgColor("#fe3c30");
      setTextColor("#e2e2e2");
      setImage("/assets/glass.png");
      setHeading("Glass");
      setText(
        "Empty glass bottles, jars, and containers, broken or damaged glass items, such as broken windows, mirrors, or light bulbs."
      );
      setMethod("Secured Land Filling");
    } else if (tmp === "metal") {
      setbgColor("#e2e2e2");
      setBin("Auto Calving");
      setTextColor("black");
      setImage("/assets/metal.png");
      setHeading("Metal");
      setText(
        "Empty cans and containers, old appliances, scrap metal broken or damaged metal items, such as old cars, furniture, or tools."
      );
      setMethod("Sharp Pit");
    } else if (tmp === "cardboard") {
      setbgColor("#4bb3da");
      setBin("Auto Calving");
      setTextColor("#e2e2e2");
      setImage("/assets/cardboard.png");
      setHeading("Cardboard");
      setText(
        "empty boxes, cartons, packaging materials,old books, newspapers."
      );
      setMethod("Re-Cycle");
    } else if (tmp === "ewaste") {
      setbgColor("#ffd705");
      setBin("Plasma Pyrolysis");
      setTextColor("black");
      setImage("/assets/ewaste.png");
      setHeading("E-waste");
      setText(
        "Old or broken computers, laptops,  tablets,Outdated or non-functioning TVs, monitors,  cell phones, smartphones."
      );
      setMethod("Deep Burial");
    } else if (tmp === "plastic") {
      setbgColor("#18cd0e");
      setBin("Incineration");
      setTextColor("#e2e2e2");
      setImage("/assets/plastic.png");
      setHeading("Plastic");
      setText(
        "water bottles, soda bottles, food containers, plastic bags,  grocery bags, retail bags, and produce bags."
      );
      setMethod("Secured Land Filling");
    } else if (tmp === "medical") {
      setbgColor("#18cd0e");
      setBin("Incineration");
      setTextColor("#e2e2e2");
      setImage("/assets/medical.png");
      setHeading("Medical");
      setText(
        "Sharps waste, such as needles, syringes,Infectious waste, such as cultures, stocks, swabs,Pharmaceutical waste, such as expired or unused medications and chemicals."
      );
      setMethod("Secured Land Filling");
    } else if (tmp === "paper") {
      setbgColor("#18cd0e");
      setBin("Incineration");
      setTextColor("#e2e2e2");
      setImage("/assets/paper.png");
      setHeading("Paper");
      setText(
        "Old or unused office paper, such as documents, reports, notebooks, Used or discarded paper products, such as newspapers, magazines, books, Paper-based personal care products, such as tissues, napkins, and toilet paper."
      );
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
          {/* <p className="font-bold text-center">Disposing Method : {bin}</p> */}
          <p className="text-xl font-bold font-sans p-2 text-center">
            Treatment Facility: {method}
          </p>
        </div>
      </div>
    </>
  );
};

export default DataModal;
