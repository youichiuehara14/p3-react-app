import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const RandomCards = () => {
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    const generateRandomDrink = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const jsonData = await response.json();
      setRandomDrink(jsonData.drinks[0]);
    };
    generateRandomDrink();
  }, []);

  return (
    <>
      <div className="flex lg:flex-row lg:gap-20 gap-10 relative p-20 items-center flex-col">
        <div className="">
          <img
            src={`${randomDrink.strDrinkThumb}`}
            alt={`${randomDrink.strDrink}`}
            className=" lg:max-w-[200px] sm:max-w-[400px] max-w-[300px]"
          />
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <h2 className="lg:text-4xl  sm:text-5xl text-4xl font-semibold">
            {randomDrink.strDrink}
          </h2>
          <span className="lg:text-md  text-sm font-semibold border-1 self-start px-2 text-white bg-[#171717]">
            {randomDrink.strAlcoholic}
          </span>
          <h3 className="text-2xl font-semibold">Ingredients</h3>
          <ul className="ml-5 grid xl:grid-cols-4 lg:grid-cols-1 grid-rows-2 ">
            {Object.keys(randomDrink)
              .filter((key) => key.includes('strIngredient') && randomDrink[key])
              .map((ingredient) => (
                <li key={ingredient} className="list-disc font-secondary mb-2">
                  {randomDrink[ingredient]}
                </li>
              ))}
          </ul>
          <p>
            Want to learn and discover more about other drinks and how to make it? Proceed to the
            App to find out!
          </p>
        </div>

        <Link className="flex flex-col items-center justify-center" to="/App">
          <i className="bx bxs-right-arrow-circle lg:text-8xl md:text-7xl text-6xl"></i>
          <span className="text-md lg:text-2xl font-semibold">Proceed to App</span>
        </Link>
      </div>
    </>
  );
};

export default RandomCards;
