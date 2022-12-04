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
    imgURL: "/images/directory.png",
    heading: "Directory",
    redirectUrl: "/",
    about:
      "Directory of local initiatives and programs focused on reducing plastic waste would allow businesses to easily find and join initiatives in their area.",
    route: "Get Started",
  },
  {
    imgURL: "/images/forum.png",
    heading: "Forum",
    redirectUrl: "training",
    about:
      "Platform for businesses to share their success stories and best practices with other members of the community would encourage collaboration.",
    route: "Start Training",
  },
  {
    imgURL: "images/insights.png",
    heading: "Analytics and Insights",
    redirectUrl: "inventory",
    about:
      "Tools and analytics would help businesses track their progress and contributions towards reducing plastic waste, providing insights and insights into areas for improvement.",
    route: "Classify",
  },
  {
    imgURL: "images/rewards.png",
    heading: "Reward Program",
    redirectUrl: "inventory",
    about:
      "Rewards program would offer incentives to businesses that actively participate in reducing plastic waste. This could include a variety of rewards and recognition.",
    route: "Classify",
  },
  {
    imgURL: "images/wastereduction.png",
    heading: "Waste Reduction Challenge",
    redirectUrl: "inventory",
    about:
      "Plastic waste reduction challenge would allow businesses to compete to see who can reduce their plastic waste the most over a set period of time. This could create friendly competition and motivation for businesses to take action.",
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
        We follow a procedure we've established for recycling waste and make
        sure it's followed.
      </p>
      <div className="flex flex-row flex-wrap justify-center items-center gap-24 w-full my-10">
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
                onClick={() => navigate(`/${individualData.redirectUrl}`)}
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
