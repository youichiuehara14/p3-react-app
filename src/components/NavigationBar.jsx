import { NavLink } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="">
        <nav className="justify-between items-center flex md:px-25 px-15 pt-5 ">
          <div className="logo">
            <NavLink to="/">
              <img
                src="./YownDrinkLogo.png"
                alt=""
                className=" w-[140px] sm:w-[200px] lg:w-[200px]"
              />
            </NavLink>
          </div>
          <ul className="hidden lg:flex gap-25 md:text-md lg:text-lg ml-auto font-primary">
            <li>
              <HashLink smooth to="/#aboutSection" className="">
                About
              </HashLink>
            </li>

            <li>
              <NavLink to="/ContactUs">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/App">Find a Cocktail</NavLink>
            </li>
          </ul>
          <i
            className={` lg:!hidden block cursor-pointer  ${
              isMenuOpen ? '' : 'bx bx-menu'
            } text-4xl sm:text-5xl `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></i>
        </nav>
        <div
          className={`lg:hidden fixed h-screen w-3/5 right-0 top-0 bg-clip-padding backdrop-filter backdrop-blur-lg 
          border-opacity-100  border-gray-500 border-1  transition-all duration-500 ${
            isMenuOpen ? 'block opacity-100 ' : 'hidden opacity-0 overflow-hidden'
          }`}
        >
          <ul className="flex flex-col gap-6 text-lg p-6 font-primary ">
            <li>
              <i
                className={` bx bx-x text-4xl cursor-pointer`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              ></i>
            </li>
            <li>
              <NavLink to="#aboutSection" className="hover:text-white">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/ContactUs" className="hover:text-white">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/App" className="hover:text-white">
                Find a Cocktail
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
