import React from 'react';
import NavigationBar from '../components/NavigationBar';

import Footer from '../components/Footer';
import FindADrink from '../components/findadrink';

const AppPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div>
          <NavigationBar />
        </div>
        <div>
          <FindADrink />
        </div>
        <div className="mt-auto py-3  border-t-1    border-[#5c5c5c] shadow-2xl shadow-[#ffcab5]">
          <div className="max-w-10/11 mx-auto  ">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppPage;
