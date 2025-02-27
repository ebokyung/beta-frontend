import { Banner, StorySection, CalendarSection } from "@/components/main";
import "react-loading-skeleton/dist/skeleton.css";

const MainPage = () => {
  return (
    <main>
      <Banner />
      <StorySection />
      <CalendarSection />
    </main>
  );
};

export default MainPage;
