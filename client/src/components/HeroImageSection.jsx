const HeroImageSection = () => {
    return (
        <div className="flex flex-row items-center w-full h-full max-w-7xl mx-auto p-2">
            <div className="relative flex lg:flex-row flex-col items-center justify-center w-full h-full p-4 gap-2">
                <img
                    src="/images/logo.png"
                    alt=" "
                    className="absolute m-auto sm:h-[120px] h-[100px] sm:w-[120px] w-[100px] bg-white rounded-full"
                />
                <img
                    src="/images/pollution.png"
                    alt=" "
                    width={1920}
                    height={1080}
                    className="object-cover lg:w-[50%] w-[100%] lg:h-[300px] h-[300px] rounded-md"
                />
                <img
                    src="/images/industry.png"
                    alt=" "
                    width={1920}
                    height={1080}
                    className="object-cover lg:w-[50%] w-[100%] lg:h-[300px] h-[300px] rounded-md"
                />
            </div>
        </div>
    );
};

export default HeroImageSection;
