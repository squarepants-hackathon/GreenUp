import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as tmImage from "@teachablemachine/image";

const Modal = ({ onClose }) => {
    const URL = import.meta.env.VITE_BACKEND_BASE || "http://localhost:5500";

    const [name, setName] = useState("");
    const [image_url, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [prediction, setPrediction] = useState("");
    const [type, setType] = useState("select");
    const [email, setEmail] = useState(
        JSON.parse(localStorage.getItem("email"))
    );
    const { user } = useAuth0();

    useEffect(() => {
        if (user) {
            setEmail(user?.email);
        }
    }, [user]);

    useEffect(() => {
        capture();
    }, [image_url]);

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

    async function getBase64ImageFromUrl(imageUrl) {
        let res = await fetch(imageUrl);
        let blob = await res.blob();

        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    resolve(reader.result);
                },
                false
            );

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        });
    }

    async function capture() {
        let URL = "https://teachablemachine.withgoogle.com/models/";
        let category = "";
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

        const imageData = await getBase64ImageFromUrl(image_url);

        let newImage = new Image();
        newImage.src = imageData;

        const prediction = await model.predict(newImage);

        console.log(prediction);

        let highestProb = 0;
        let typeProb = 0;

        prediction.map((val) => {
            let currentProb = val.probability * 100;

            if (currentProb > highestProb) {
                highestProb = currentProb;
                typeProb = val.className;
            }
        });

        setPrediction(typeProb);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!image_url) {
            alert("image is required");
            return;
        }
        try {
            let finalType = type == "select" ? prediction : type;
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
                    type: finalType,
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
            <div className="fixed top-0 bottom-0 left-0 right-0 min-w-[400px] h-fit max-w-[500px] w-full bg-[#f5f5f5] z-[999] m-auto text-black shadow-lg rounded-lg p-4">
                <h2 className="text-2xl text-center font-semibold">
                    Add Product
                </h2>

                <form
                    className="product-form flex flex-col justify-evenly h-[90%]"
                    onSubmit={submitHandler}
                >
                    {/* Name */}
                    <div className="flex flex-col w-full space-y-2">
                        <label
                            htmlFor="name"
                            className="text-lg font-medium mt-2"
                        >
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
                    </div>

                    {/* Description */}
                    <div className="flex flex-col w-full space-y-2">
                        <label
                            htmlFor="description"
                            className="text-lg font-medium mt-2"
                        >
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
                    </div>

                    {/* Weight */}
                    <div className="flex flex-col w-full space-y-2">
                        <label
                            htmlFor="weight"
                            className="text-lg font-medium mt-2"
                        >
                            Weight
                        </label>
                        <input
                            name="weight"
                            type="text"
                            placeholder="Enter Product Weight (grams)"
                            className="mx-auto border outline-none my-2 w-full p-2"
                            value={weight}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className="image_upload w-full flex justify-center items-center h-40 mt-4 mb-2 border-4">
                        {!image_url && (
                            <p
                                className="cursor-pointer"
                                onClick={showUploadWidget}
                            >
                                Please pick an image
                            </p>
                        )}
                        {image_url && (
                            <img
                                src={image_url}
                                alt="product_image"
                                className="w-full h-full cover"
                            />
                        )}
                    </div>

                    {/* Drop Down */}
                    <div className="flex flex-col w-full space-y-2 mb-4">
                        <label
                            htmlFor="drop-down"
                            className="text-lg font-medium mt-2"
                        >
                            Disposal Type
                        </label>
                        <select
                            name="drop-down"
                            id="drop-down"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            // required
                            className="py-2"
                        >
                            <option value="select">Select</option>
                            <option value="medical">Medical</option>
                            <option value="ewaste">Ewaste</option>
                            <option value="plastic">Plastic</option>
                            <option value="paper">Paper</option>
                            <option value="metal">Metal</option>
                            <option value="glass">Glass</option>
                            <option value="cardboard">Cardboard</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className=" w-full px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-gray-700"
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
