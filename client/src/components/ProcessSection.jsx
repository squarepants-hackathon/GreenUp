const ProcessSection = () => {
    return (
        <div
            className="w-full h-full max-w-7xl mx-auto p-2 flex flex-col justify-center items-center"
            id="process"
        >
            <h2 className="sm:text-4xl text-[1.4rem] text-center font-extrabold text-gray-800 mb-4">
                The waste classification process
            </h2>
            <p className="sm:text-lg text-[1rem] font-medium text-gray-600 px-4 text-center mb-4">
                We follow a procedure we've established for classification of
                waste and make sure it's followed!
            </p>
            <img
                src="/images/process.png"
                alt=" "
                className="sm:w-[90%] w-full sm:h-[90%] h-full mx-auto my-10"
            />
        </div>
    );
};

export default ProcessSection;
