// import { useEffect, useState } from 'react';
import { useState } from 'react';
const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlSearchByIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const urlSearchRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const urlSearchById = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const FindADrink = () => {
  const initialState = {
    searchInput: '',
    searchType: '',
    isAlcoholic: false,
  };

  const [card, setCard] = useState(false);

  // const getLocalStorage = () => {
  //   const data = JSON.parse(localStorage.getItem('searchDrinkResult'));
  //   if (!data) {
  //     return;
  //   } else if (data) {
  //     setCard(true);
  //     return data;
  //   }
  // };

  const [search, setSearch] = useState(initialState);
  const [searchDrinkResult, setSearchDrinkResult] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem('searchDrinkResult', JSON.stringify(searchDrinkResult));
  // }, [searchDrinkResult]);

  const generateRandomDrink = async () => {
    try {
      const response = await fetch(`${urlSearchRandom}`);
      const jsonData = await response.json();
      setSearchDrinkResult(jsonData.drinks);
      setCard(true);
      localStorage.setItem('searchDrinkResult', JSON.stringify(jsonData.drinks));
    } catch (error) {
      console.error(error);
    }
  };

  const generateSearch = async () => {
    setCard(true);
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
        if (jsonData.drinks && typeof jsonData.drinks === 'string') {
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

  const conditionalStyles = {
    cardStyles: card
      ? 'flex flex-col md:flex-row items-center text-black bg-white mt-5 mb-10 px-8 py-10'
      : 'hidden',
    alcoholicButtonVisibility: search.searchType === 'name' ? 'flex' : 'hidden',
    isAlcoholicButtonStyles: search.isAlcoholic
      ? `duration-300 border-none rounded-md bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br  shadow-orange-900/90 dark:shadow-xl dark:shadow-orange-800/50`
      : ' ',
    isNonAlcoholicButtonStyles: !search.isAlcoholic
      ? `duration-300 border-none rounded-md bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br  shadow-orange-900/90 dark:shadow-xl dark:shadow-orange-800/50`
      : ' ',
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

  const noCardIsOpen = () => {
    return searchDrinkResult.length === 0;
  };

  const renderDrinkCards = () => {
    return noCardIsOpen() ? (
      <div className={`text-center text-red-500 font-semibold mt-5`}>Sorry, no drink found.</div>
    ) : (
      searchDrinkResult.map((drink) => {
        const isInstructionVisible = {
          isVisible: drink.strInstructions ? 'block' : 'hidden',
          isNotVisible: drink.strInstructions ? 'hidden' : 'block',
        };
        return (
          <article key={drink.idDrink} className={`${conditionalStyles.cardStyles}`}>
            <div className="max-w-full">
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="max-w-[250px] max-h-[250px] sm:max-w-[350px] sm:max-h-[350px] md:max-w-[300px] md:max-h-[300px] py-5 object-cover border-amber-600"
              />
            </div>
            <div className="flex flex-col pt-5 sm:pl-10 h-full">
              <h1 className="text-4xl sm:text-5xl  lg:text-6xl  font-secondary font-semibold mb-2 text-center sm:text-left">
                {drink.strDrink}
              </h1>
              <span className="font-semibold border-1 self-start px-2 text-white bg-[#171717]">
                {drink.strAlcoholic}
              </span>
              <h2
                className={`${isInstructionVisible.isVisible} md:text-4xl font-secondary font-semibold mb-2 `}
              >
                Ingredients
              </h2>
              <ul className={`mb-5 grid-rows-2 grid-flow-col`}>
                {Object.keys(drink)
                  .filter((key) => key.includes('strIngredient') && drink[key])
                  .map((ingredient) => (
                    <li key={ingredient} className="list-disc ml-8 font-secondary">
                      {drink[ingredient]}
                    </li>
                  ))}
              </ul>
              <h3
                className={`${isInstructionVisible.isVisible} md:text-4xl font-secondary font-semibold`}
              >
                Instructions
              </h3>
              <p className="font-secondary text-sm">{drink.strInstructions}</p>

              <button
                className={`${isInstructionVisible.isNotVisible}  bg-[#171717] text-white font-semibold border-1 max-w-60 text-sm px-1 py-2`}
                onClick={() => {
                  getDrinkFullDetails(drink.idDrink);
                }}
              >
                Click to find out the full details!
              </button>
            </div>
          </article>
        );
      })
    );
  };

  return (
    <>
      {/* <section className="w-screen flex sm:flex-col flex-col-reverse sm:items-center gap-1 mt-5 "> */}
      <section className="w-full flex flex-col-reverse sm:flex-col sm:items-center gap-1 mt-5 px-4">
        <form
          className="flex sm:flex-row sm:justify-center sm:gap-0 mx-10 p-5 rounded-md gap-2 flex-col"
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

        <div className={`gap-5 mx-auto ${conditionalStyles.alcoholicButtonVisibility}`}>
          <button
            className={`px-4 py-2.5 sm:text-sm text-xs border-[#797979] text-md border-1 ${conditionalStyles.isAlcoholicButtonStyles}`}
            onClick={() => {
              setSearch({ ...search, isAlcoholic: true });
            }}
          >
            Alcoholic
          </button>
          <button
            className={`px-4 py-2.5 sm:text-sm text-xs border-1 border-[#797979] ${conditionalStyles.isNonAlcoholicButtonStyles}`}
            onClick={() => {
              setSearch({ ...search, isAlcoholic: false });
            }}
          >
            Non-Alcoholic
          </button>
        </div>
      </section>
      <section className="w-5/6 mx-auto">{renderDrinkCards()}</section>
    </>
  );
};
export default FindADrink;
