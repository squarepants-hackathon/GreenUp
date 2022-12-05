import React, { useEffect, useState } from "react";

import Modal from "../components/Modal";
import { companyProduct, recycledWaste, updateCount } from "../api";
import CardComp from "../components/CardComp";

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("email")));
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const [productList, setProductList] = useState([]);

  const [reFetchData, setReFetchData] = useState(false);

  useEffect(() => {
    if (email.length !== 0) {
      const fetchData = async () => {
        const { data } = await companyProduct(email);
        setProducts(data.products);
        setProductList(data.products);
      };
      fetchData();
    }
  }, [reFetchData, email]);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();

    if (value.length === 0) {
      setProducts(productList);
      return;
    }
    let result = [];
    result = products.filter((data) => {
      return data.name.search(value) !== -1;
    });
    setProducts(result);
  };

  return (
    <>
      {showModal && <Modal onClose={() => setShowModal((prev) => !prev)} />}

      <div className="flex flex-col w-full h-full">
        <h1 className="heading text-center font-semibold md:text-5xl sm:text-4xl text-3xl text-slate-800">
          Products
        </h1>

        <div className="flex flex-col items-center justify-center z-50 p-2">
          <input
            type="text"
            onChange={(event) => handleSearch(event)}
            className="flex max-w-sm w-full mx-auto p-2 border-2 rounded-md mb-4 mt-2 bg-[#f5f5f5] outline-slate-400"
            placeholder="Search.."
          />
          <button
            className="bg-black text-white py-[0.4rem] px-2 rounded-sm w-[100px] cursor-pointer"
            onClick={() => setShowModal((prev) => !prev)}
          >
            Add
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 z-10 w-full h-full max-w-7xl mx-auto p-2 my-8">
          {products?.map((product, index) => (
            <CardComp
              product={product}
              index={index}
              email={email}
              setReFetchData={setReFetchData}
              reFetchData={reFetchData}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Inventory;
