import About from '../components/About';
import NavigationBar from '../components/NavigationBar';

const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col gap-20">
        <NavigationBar />
        <About />
      </div>
    </>
  );
};

export default AboutPage;
