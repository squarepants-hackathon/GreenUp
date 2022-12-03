const Dashboard = () => {
    return (
        <div className="relative w-full lg:p-10 md:p-7 p-5 bg-[#1e1655]">
            <div className="flex flex-col py-8">
                <div className="flex flex-row items-center justify-start my-4 md:pb-10 pb-5">
                    <h1 className="text-[#f5f5f5] lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
                        Good Morning, Abhi
                    </h1>
                </div>

                <div className="absolute top-[60%] flex flex-row justify-start gap-5 my-4">
                    <div className="w-[200px] h-[230px] bg-black relative">
                        <div className="flex justify-end flex-col h-full">
                            <div className={`hidden_area h-[30%] bg-green-300 w-full`}></div>
                        </div>
                        <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-xl">45%</p>
                    </div>

                    <div className="w-[200px] h-[230px] bg-black"></div>

                    <div className="w-[200px] h-[230px] flex flex-col justify-between items-center">
                        <div className="w-full h-[47%] bg-black"></div>
                        <div className="w-full h-[47%] bg-black"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;