import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { recycledWaste, updateCount } from "../api";
import DataModal from "../constants/DataModal";

const CardComp = ({ product, index, email, setReFetchData, reFetchData }) => {
  const [runCount, setRunCount] = useState(false);
  const [currRecycle, setCurrRecycle] = useState(0);
  const [currId, setCurrId] = useState("");
  const [currCount, setCurrCount] = useState();
  const [typeProbability, setTypeProbability] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (runCount === true) {
      const updateCountFunc = async () => {
        if (currId) {
          const data = await updateCount({
            id: currId,
            count: currCount,
            email,
          });

          if (data.data.updated) {
            setReFetchData((prev) => !prev);
            setRunCount(false);
          }
        }
      };
      updateCountFunc();
    }
  }, [runCount]);

  const handleRecycle = async (e) => {
    e.preventDefault();
    if (currCount < currRecycle) {
      alert("Recycle count cannot be greater than product count");
      return;
    }

    const { data } = await recycledWaste({
      email,
      id: currId,
      count: currRecycle,
    });

    if (data.updated) {
      window.location.reload(true);
    }
  };

  return (
    <>
      {openModal === true && (
        <DataModal setOpenModal={setOpenModal} typeProb={typeProbability} />
      )}
      <div
        key={index}
        className="flex flex-col mx-auto max-w-[300px] my-5 w-full min-h-[300px] h-full col-span-1 bg-[#f5f5f5] rounded-sm"
        style={{
          boxShadow: "rgba(149, 157, 165, 0.4) 0px 8px 24px",
        }}
      >
        <img
          src={product?.image_url}
          alt=" "
          className="object-cover h-[250px] w-full"
        />

        <div className="px-6 py-3 text-center backdrop-blue-lg transparent bg-[rgba(225,225,225,0.2)]">
          <h5 className="text-black text-xl font-medium mb-2">
            {product?.name}
          </h5>
          <div className="ctas w-full flex justify-evenly">
            {/* <NavLink to={`/product/${product._id}`} className=""> */}
            <button
              type="button"
              // onClick={(e) => {
              //   e.preventDefault();
              //   // setTypeProbability()
              // }}
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              View
            </button>
            {/* </NavLink> */}
            <button
              onClick={() => {
                setValue(`http://localhost:5173/product/${product._id}`);
                setQRModal(true);
              }}
              type="button"
              className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out cursor-pointer"
            >
              View QR
            </button>
          </div>
          <div
            className="w-full flex flex-row my-2 px-[1rem] space-x-3"
            onClick={(e) => {
              e.preventDefault();
              setCurrCount(product?.count);
              setCurrId(product._id);
            }}
          >
            <input
              className="flex-[0.5] w-full border-[1px] border-black rounded-md text-center"
              required
              type="number"
              value={currRecycle}
              onChange={(e) => setCurrRecycle(e.target.value)}
            />
            <button
              onClick={(e) => handleRecycle(e)}
              className="flex-[0.5] w-full bg-green-600 hover:bg-green-700 duration-200 rounded-md text-white"
            >
              Recycle
            </button>
          </div>
          <div
            onClick={() => setCurrId(product._id)}
            className="flex flex-row items-center justify-evenly mt-2 gap-4 text-lg font-medium"
          >
            <img
              src="/assets/minus.png"
              alt="minus"
              className="w-10 h-10 cursor-pointer"
              onClick={() => {
                setRunCount(true);
                setCurrCount((prev) => product?.count - 1);
              }}
            />
            <span className="text-center text-xl font-medium">
              {product?.count}
            </span>
            <img
              src="/assets/plus.png"
              alt="plus"
              className="w-10 h-10 cursor-pointer"
              onClick={() => {
                setRunCount(true);
                setCurrCount((prev) => product?.count + 1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComp;
