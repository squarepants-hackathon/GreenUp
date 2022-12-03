import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { BsShare, BsDownload } from "react-icons/bs";

const Dashboard = () => {
  return (
    <div className="relative w-full lg:p-10 md:p-7 p-5 bg-gradient-to-b from-[#1e1655] to-[#4b4196]">
      <div className="flex flex-col py-8">
        <div className="flex flex-row items-center justify-start my-4 md:pb-10 pb-5">
          <h1 className="text-[#f5f5f5] lg:text-5xl md:text-4xl sm:text-3xl text-2xl flex items-center">
            Good Morning, Abhi
            <span className="ml-4 h-full text-sm backdrop-blur-lg bg-white/30 rounded p-1 px-2 cursor-pointer">
              <BsShare className="inline my-auto mr-2" />
              Share
            </span>
            <span className="ml-4 h-full text-sm backdrop-blur-lg bg-white/30 rounded p-1 px-2 cursor-pointer">
              <BsDownload className="inline my-auto mr-2" />
              Download
            </span>
          </h1>
        </div>

        <div className="absolute top-[60%] flex flex-row justify-start gap-5 my-4">
          {/* div 1 */}
          <div className="w-[200px] h-[230px] relative bg-white text-black">
            <div className="flex justify-end flex-col h-full">
              <div className={`hidden_area h-[30%] bg-green-300 w-full`}></div>
            </div>
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-xl">
              45%
            </p>
          </div>

          {/* div 2 */}
          <div className="w-[200px] h-[230px] bg-black flex items-center justify-center p-8 bg-gradient-to-t from-cyan-500 to-blue-300">
            <CircularProgressbar value={"10"} text={`${"10"}%`} />
          </div>

          {/* div 3 */}
          <div className="w-[200px] h-[230px] flex flex-col justify-between items-center">
            <div className="w-full h-[47%] bg-black flex flex-col justify-between p-4 bg-gradient-to-b from-[#362f68] to-gray-400">
              <p className="text-[10px] uppercase">Live Visitors</p>
              <h1 className="text-2xl text-semibold">10,241</h1>
            </div>
            <div className="w-full h-[47%] bg-black flex flex-col justify-between p-4 bg-gradient-to-b from-[#362f68] to-gray-400">
              <p className="text-[10px] uppercase">Bounce</p>
              <h1 className="text-2xl text-semibold">3:42</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
