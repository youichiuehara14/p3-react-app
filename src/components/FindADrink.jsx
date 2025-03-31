import { useState } from 'react';
const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlSearchByIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const urlSearchRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const urlSearchById = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const FindADrink = () => {
  const [searchDrinkResult, setSearchDrinkResult] = useState([]);

  const initialState = {
    searchInput: '',
    searchType: '',
    isAlcoholic: false,
    card: false,
  };

  const [search, setSearch] = useState(initialState);

  // when component with api is loaded, it doesnt need to render immediately
  // when surprise me button is clicked, it generates a random searchDrinkResult

  const [Card, setCard] = useState(false);

  const generateRandomDrink = async () => {
    try {
      const response = await fetch(`${urlSearchRandom}`);
      const jsonData = await response.json();
      console.log(jsonData);
      setSearchDrinkResult(jsonData.drinks);
      setCard(true);
    } catch (error) {
      console.error(error);
    }
  };

  const generateSearch = async () => {
    if (!search.searchInput) {
      return;
    }

    if (search.searchType === 'name') {
      try {
        const response = await fetch(`${urlName}${search.searchInput}`);
        const jsonData = await response.json();

        if (!jsonData.drinks) {
          setSearchDrinkResult([]);
          return;
        }

        const filteredDrinks = jsonData.drinks.filter(
          (drink) => drink.strAlcoholic === (search.isAlcoholic ? 'Alcoholic' : 'Non alcoholic')
        );

        setSearchDrinkResult(filteredDrinks);
        setCard(true);
      } catch (error) {
        console.error(error);
      }
    }

    if (search.searchType === 'ingredient') {
      try {
        const response = await fetch(`${urlSearchByIngredient}${search.searchInput}`);
        const jsonData = await response.json();
        if (!jsonData.drinks) {
          setSearchDrinkResult([]);
          return;
        }

        setSearchDrinkResult(jsonData.drinks);
        setCard(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getDrinkFullDetails = async (id) => {
    try {
      const response = await fetch(`${urlSearchById}${id}`);
      const jsonData = await response.json();
      setSearchDrinkResult(jsonData.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const renderDrinkCards = () => {
    if (searchDrinkResult.length === 0) {
      return (
        <div className="text-center text-red-500 font-semibold mt-5">Sorry, no drink found.</div>
      );
    }

    return searchDrinkResult.map((drink) => (
      <article
        key={drink.idDrink}
        className={` ${
          Card
            ? 'flex flex-col md:flex-row items-center  text-black bg-white mt-5 mb-10 px-8 py-10 '
            : 'hidden'
        } `}
        onClick={() => {
          getDrinkFullDetails(drink.idDrink);
        }}
      >
        <div className="max-w-full">
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="max-w-[250px] max-h-[250px] sm:max-w-[350px] sm:max-h-[350px] md:max-w-[300px] md:max-h-[300px] py-5 object-cover  border-amber-600"
          />
        </div>
        <div className="flex flex-col pt-5 sm:pl-10 h-full cursor-pointer">
          <h1 className="text-4xl sm:text-5xl  lg:text-6xl  font-secondary font-semibold mb-2">
            {drink.strDrink}
          </h1>
          <span className="font-semibold border-1 self-start px-2 text-white bg-[#171717]">
            {drink.strAlcoholic}
          </span>
          <h2 className="md:text-4xl font-secondary font-semibold mb-2 ">Ingredients</h2>
          <ul className="mb-5 grid grid-rows-2 grid-flow-col">
            {Object.keys(drink)
              .filter((key) => key.includes('strIngredient') && drink[key])
              .map((ingredient) => (
                <li key={ingredient} className="list-disc ml-8 font-secondary">
                  {drink[ingredient]}
                </li>
              ))}
          </ul>
          <h3 className="md:text-4xl font-secondary font-semibold">Instructions</h3>
          <p className="font-secondary text-sm">{drink.strInstructions}</p>
        </div>
      </article>
    ));
  };

  return (
    <>
      <section className="w-screen flex sm:flex-col flex-col-reverse sm:items-center gap-1 mt-5 ">
        <form
          className="flex sm:flex-row sm:justify-center sm:gap-0  mx-10 p-5 rounded-md  gap-2 flex-col  "
          onSubmit={(e) => e.preventDefault()}
        >
          <select
            className="border px-2 py-2 bg-[#171717] text-white focus:outline-none "
            onChange={(e) => {
              setSearch({ ...search, searchType: e.target.value });
            }}
          >
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="ingredient">Ingredient</option>
          </select>
          <div className="border-1 flex items-center ">
            <i className="bx bx-search p-1 "></i>

            <input
              id="searchDrinkResult-search"
              type="text"
              className="focus:outline-none px-2 py-2 w-full "
              placeholder="Search for your drink..."
              onChange={(e) => {
                setSearch({ ...search, searchInput: e.target.value });
              }}
            />
          </div>
          <button className="border-1 px-2 py-2 cursor-pointer" onClick={generateSearch}>
            Search
          </button>
          <button className="border-1 px-2 py-2 cursor-pointer" onClick={generateRandomDrink}>
            Surprise Me!
          </button>
        </form>

        <div
          className={`gap-5 mx-auto  ${
            search.searchType ? 'flex opacity-100' : ' hidden   opacity-0'
          }`}
        >
          <button
            className={`px-4 py-2.5 sm:text-sm text-xs border-[#797979] text-md border-1 ${
              search.isAlcoholic
                ? ' duration-300 border-none rounded-md shadow-2xl text-white  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br  focus:outline-none  shadow-orange-900/90 dark:shadow-xl dark:shadow-orange-800/50  '
                : ' duration-300 '
            }`}
            onClick={() => {
              setSearch({ ...search, isAlcoholic: true });
            }}
          >
            Alcoholic
          </button>
          <button
            className={`px-4 py-2.5 sm:text-sm text-xs border-1 border-[#797979] ${
              !search.isAlcoholic
                ? 'duration-300 rounded-md border-none text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br  focus:outline-none shadow-lg shadow-orange-500/70 dark:shadow-lg dark:shadow-orange-800/80 '
                : ' duration-300  text-white'
            }`}
            onClick={() => {
              setSearch({ ...search, isAlcoholic: false });
            }}
          >
            Non-Alcoholic
          </button>
        </div>
      </section>

      <section className="w-5/6 mx-auto ">{renderDrinkCards()}</section>
    </>
  );
};
export default FindADrink;
