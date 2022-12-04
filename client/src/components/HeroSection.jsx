const HeroSection = () => {
    return (
        <div className="w-full h-full max-w-7xl mx-auto p-2 flex flex-col justify-center items-center sm:mt-10 mt-6 py-5">
            <h2 className="sm:text-7xl text-5xl text-center font-bold text-gray-800 mb-4">
                <span className="text-green-600">Green</span>Up
            </h2>
            <p className="sm:text-2xl text-xl font-medium text-gray-700 lg:px-80 px-4 text-center sm:leading-8 leading-6">
                Join the sustainable revolution
            </p>
        </div>
    );
};

export default HeroSection;
