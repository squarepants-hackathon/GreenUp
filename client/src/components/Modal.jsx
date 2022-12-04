import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Modal = ({ onClose }) => {
  const URL = import.meta.env.VITE_BACKEND_BASE || "http://localhost:5500";

  const [name, setName] = useState("");
  const [image_url, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("General Waste");
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("email")));
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      setEmail(user?.email);
    }
  }, [user]);

  function showUploadWidget() {
    window.cloudinary.openUploadWidget(
      {
        cloudName: `${import.meta.env.VITE_CLOUD_NAME}`,
        uploadPreset: `${import.meta.env.VITE_PRESET}`,
        sources: ["local", "camera", "url"],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Fira+Sans",
              active: true,
            },
          },
        },
      },
      (err, result) => {
        if (!err && result?.event === "success") {
          setImage(result.info.secure_url);
        }
      }
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image_url) {
      alert("image is required");
      return;
    }
    try {
      setEmail(user.email);
      const response = await fetch(`${URL}/api/createProduct/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          image_url,
          type,
          manufacture: email,
        }),
      });
      const data = await response.json();
      onClose();
      console.log(data);
    } catch (err) {
      alert(err);
    }
    window.location.reload(true);
  };
  return (
    <>
      <div
        className="fixed top-0 left-0 bg-[rgba(0,0,0,0.6)] w-screen h-screen z-[100]"
        onClick={onClose}
      />
      <div className="fixed top-0 bottom-0 left-0 right-0 min-w-[400px] max-w-[500px] h-[500px] w-full bg-[#f5f5f5] z-[999] m-auto text-black shadow-lg rounded-lg p-4">
        <h2 className="text-2xl text-center font-semibold">Add Product</h2>

        <form
          className="product-form flex flex-col justify-between h-[90%]"
          onSubmit={submitHandler}
        >
          {/* Name */}
          <label htmlFor="name" className="text-lg font-medium mt-2">
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter Product Name"
            className="mx-auto border outline-none w-full p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Description */}
          <label htmlFor="description" className="text-lg font-medium mt-2">
            Description
          </label>
          <input
            name="description"
            type="text"
            placeholder="Enter Product Description"
            className="mx-auto border outline-none my-2 w-full p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Drop Down */}
          <label htmlFor="drop-down" className="text-lg font-medium mt-2">
            Disposal Type
          </label>
          <select
            name="drop-down"
            id="drop-down"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="General Waste">General Waste</option>
            <option value="Infected Plastic">Infected Plastic</option>
            <option value="Infected Waste">Infected Waste</option>
            <option value="Glassware">Glassware</option>
            <option value="Sharps">Sharps</option>
          </select>

          {/* Image */}
          <button
            className="button inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            onClick={showUploadWidget}
          >
            PICK IMAGE
          </button>
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-gray-700"
            disabled={!image_url}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Modal;
