import { useNavigate } from "react-router";
import Banner from "../../components/Home/Banner";
import FeaturesSection from "../../components/Home/FeaturesSection";

import HowItWorksSection from "../../components/Home/HowItWorksSection";
import LatestResolvedIssues from "../../components/Home/LatestResolvedIssues";
import Plants from "../../components/Home/Plants";
import Button from "../../components/Shared/Button/Button";
import Container from "../../components/Shared/Container";
import StatisticsSection from "../../components/Home/StatisticsSection";
import TestimonialsSection from "../../components/Home/TestimonialsSection";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <Banner></Banner>
        <LatestResolvedIssues></LatestResolvedIssues>
        <div className="text-center">
          <Button label="All Reports" onClick={() => navigate("/all-issues")} />
        </div>
        <FeaturesSection></FeaturesSection>
        <HowItWorksSection></HowItWorksSection>
        <StatisticsSection></StatisticsSection>
        <TestimonialsSection></TestimonialsSection>
        {/* More components */}
      </Container>
      {/* <Plants /> */}
    </div>
  );
};

export default Home;
