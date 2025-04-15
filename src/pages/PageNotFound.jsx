import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div>
        <NavigationBar />
      </div>
      <div className="sm:text-6xl text-4xl mx-auto my-auto mt-60 font-secondary ">
        <h1>Page Not Found</h1>
      </div>
      <div className=" py-3 border-t-1 mt-auto border-[#5c5c5c] shadow-2xl shadow-[#ffcab5]">
        <div className="max-w-10/11 mx-auto  ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
