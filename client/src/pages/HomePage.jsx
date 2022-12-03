import HeroAssistance from "../components/HeroAssistance.jsx";
import HeroImageSection from "../components/HeroImageSection";
import HeroSection from "../components/HeroSection";
import SolutionSection from "../components/SolutionSection";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <HeroImageSection />
            <HeroAssistance />
            <SolutionSection />
            <Footer />
        </>
    );
};

export default HomePage;
