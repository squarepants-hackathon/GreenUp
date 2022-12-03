import { useNavigate } from "react-router-dom";

const SolutionCard = ({ imgURL, heading, about }) => {
    return (
        <div
            className="flex flex-col w-[320px] mx-auto items-center justify-center h-[450px] py-4"
            style={{
                borderTopLeftRadius: "150px",
                borderTopRightRadius: "150px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
        >
            <img
                src={imgURL}
                alt=" "
                className="object-contain rounded-full w-[80%]"
                style={{ border: "4px solid rgba(22, 163, 74, 0.6)" }}
            />
            <h3 className="text-center text-green-600 text-lg font-medium my-4">
                {heading}
            </h3>
            <p className="text-slate-800 font-normal text-sm p-1 text-center">
                {about}
            </p>
        </div>
    );
};

const SolutionData = [
    {
        imgURL: "/eWaste.png",
        heading: "Production",
        redirectUrl: "login",
        about: " lets the manufacturers mark their product to classify in type of waste using unique QR codes for having information about the product and its right disposal method.",
        route: "Get Started",
    },
    {
        imgURL: "/plasticWaste.png",
        heading: "Training Usage",
        redirectUrl: "training",
        about: " lets small clinics and hospital to gain access to staff training modules to ensure better HCW management during usage of such items.",
        route: "Start Training",
    },
    {
        imgURL: "/bioMedicalWaste.png",
        heading: "Disposal",
        redirectUrl: "scanimage",
        about: " let user classify health care waste into five categories through our ML model and QR Code to provide user an optimal dissposal method of the waste.",
        route: "Classify",
    },
    {
        imgURL: "/bioMedicalWaste.png",
        heading: "Disposal",
        redirectUrl: "scanimage",
        about: " let user classify health care waste into five categories through our ML model and QR Code to provide user an optimal dissposal method of the waste.",
        route: "Classify",
    },
    {
        imgURL: "/bioMedicalWaste.png",
        heading: "Disposal",
        redirectUrl: "scanimage",
        about: " let user classify health care waste into five categories through our ML model and QR Code to provide user an optimal dissposal method of the waste.",
        route: "Classify",
    },
];

const SolutionSection = () => {
    let navigate = useNavigate();

    return (
        <div
            className="flex flex-col items-center w-full h-full max-w-7xl mx-auto p-2 mt-16 sm:mb-4 mb-2"
            id="solutions"
        >
            <h2 className="sm:text-4xl text-[1.4rem] text-center font-extrabold text-gray-800 mb-4">
                Solutions for various industries
            </h2>
            <p className="sm:text-lg text-[1rem] font-medium text-gray-600 px-4 text-center mb-4">
                We follow a procedure we've established for recycling waste and
                make sure it's followed.
            </p>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-rows-1 gap-8 w-full my-10">
                {SolutionData.map((individualData, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-center flex-col"
                        >
                            <SolutionCard
                                imgURL={individualData?.imgURL}
                                heading={individualData?.heading}
                                about={individualData?.about}
                            />

                            <button
                                className="bg-black mx-auto flex items-center justify-center w-[325px] py-2 border-2 font-medium text-base cursor-pointer shadow-lg rounded-[5px] text-white my-3"
                                onClick={() =>
                                    navigate(`/${individualData.redirectUrl}`)
                                }
                            >
                                {individualData?.route}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SolutionSection;
