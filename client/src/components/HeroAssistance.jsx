const HeroAssistance = () => {
    return (
        <div
            className="flex flex-col items-center w-full h-full max-w-7xl mx-auto p-2 my-4"
            id="aboutus"
        >
            <h2 className="sm:text-4xl text-[1.4rem] text-center font-extrabold text-gray-800 mb-4">
                How may we be of assistance?
            </h2>
            <p className="sm:text-lg text-[1rem] font-medium text-gray-600 px-4 text-center mb-4">
                we salvage materials from garbage and give them new life.
            </p>

            <div className="grid lg:grid-cols-2 grid-rows-1 w-full md:my-4 my-8 gap-y-4 sm:px-4 px-0">
                <div className="flex flex-row rounded-[50px] w-full max-w-[550px] min-w-[300px] p-1 h-auto bg-sky-100 justify-between items-center mx-auto px-2">
                    <div className="sm:h-[80px] h-[60px] sm:w-[80px] w-[60px] p-4 bg-sky-400 text-white font-medium lg:text-base text-xs rounded-full my-auto flex items-center justify-center">
                        MISSION
                    </div>
                    <p className="font-normal sm:text-sm text-[0.7rem] sm:ml-2 ml-1">
                        Our goal is to set the standard for excellence in
                        healthcare waste management across the country by
                        collaborating with public agencies, businesses, and
                        citizens.
                    </p>
                </div>

                <div className="flex flex-row rounded-[50px] w-full max-w-[550px] min-w-[300px] p-1 h-auto bg-green-100 justify-between items-center mx-auto px-2">
                    <div className="sm:h-[80px] h-[60px] sm:w-[80px] w-[60px] p-5 bg-green-400 text-white font-medium lg:text-base text-xs rounded-full my-auto flex items-center justify-center">
                        VISION
                    </div>
                    <p className="font-normal sm:text-sm text-[0.7rem] sm:ml-2 ml-1">
                        Our goal is to see a society where healthcare waste is
                        correctly managed, resulting in a better environment,
                        better health, and safer conditions for all forms of
                        life.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroAssistance;
