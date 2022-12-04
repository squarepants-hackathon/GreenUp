import HeroAssistance from "../components/HeroAssistance.jsx";
import HeroImageSection from "../components/HeroImageSection";
import HeroSection from "../components/HeroSection";
import SolutionSection from "../components/SolutionSection";
import Footer from "../components/Footer";
import ProcessSection from "../components/ProcessSection.jsx";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <HeroImageSection />
            <HeroAssistance />
            <SolutionSection />
            <ProcessSection />
            <Footer />
        </>
    );
};

export default HomePage;
