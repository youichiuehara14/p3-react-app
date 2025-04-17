import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import FindADrink from '../components/FindADrink';

const AppPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <NavigationBar />
        <FindADrink />
        <div className="mt-auto py-3  border-t-1 border-[#5c5c5c] shadow-2xl shadow-[#ffcab5]  ">
          <div className="max-w-10/11 mx-auto ">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppPage;
