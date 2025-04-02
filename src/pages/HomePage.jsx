import Hero from '../components/Hero';
import NavigationBar from '../components/NavigationBar';
import About from '../components/About';
import Footer from '../components/Footer';
import RandomCards from '../components/RandomCards';
import AnnouncementBar from '../components/AnnouncementBar';
const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col   ">
        <div className="">
          <div>
            <NavigationBar />
          </div>
          <div>
            <Hero />
          </div>
          <div id="aboutSection">
            <About />
          </div>
          <div>
            <RandomCards />
          </div>
        </div>
        <div className=" py-3 border-t-1 mt-5  border-[#5c5c5c] shadow-2xl shadow-[#ffcab5] bg-[#171717]">
          <div className="max-w-10/11 mx-auto  ">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
