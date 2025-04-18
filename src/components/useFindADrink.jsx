import { useEffect, useState } from 'react';

const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlSearchByIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const urlSearchRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const urlSearchById = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const useFindADrink = () => {
  const initialState = {
    searchInput: '',
    searchType: '',
    isAlcoholic: false,
  };

  const [card, setCard] = useState(false);
  const [search, setSearch] = useState(initialState);
  const [searchDrinkResult, setSearchDrinkResult] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('searchDrinkResult'));
    if (data) {
      setSearchDrinkResult(data);
      setCard(true);
    }
  }, []);

  const generateRandomDrink = async () => {
    try {
      const response = await fetch(urlSearchRandom);
      const jsonData = await response.json();
      setSearchDrinkResult(jsonData.drinks);
      setCard(true);
      localStorage.setItem('searchDrinkResult', JSON.stringify(jsonData.drinks));
    } catch (error) {
      console.error(error);
    }
  };

  const generateSearch = async () => {
    if (!search.searchInput) return;

    setCard(true);

    try {
      let response, jsonData;

      if (search.searchType === 'name') {
        response = await fetch(`${urlName}${search.searchInput}`);
        jsonData = await response.json();

        if (!jsonData.drinks) {
          setSearchDrinkResult([]);
          return;
        }

        const filteredDrinks = jsonData.drinks.filter(
          (drink) => drink.strAlcoholic === (search.isAlcoholic ? 'Alcoholic' : 'Non alcoholic')
        );
        setSearchDrinkResult(filteredDrinks);
      }

      if (search.searchType === 'ingredient') {
        response = await fetch(`${urlSearchByIngredient}${search.searchInput}`);
        jsonData = await response.json();
        setSearchDrinkResult(jsonData.drinks || []);
      }

      localStorage.setItem('searchDrinkResult', JSON.stringify(jsonData.drinks));
    } catch (error) {
      console.error(error);
    }
  };

  const getDrinkFullDetails = async (id) => {
    try {
      const response = await fetch(`${urlSearchById}${id}`);
      const jsonData = await response.json();
      setSearchDrinkResult(jsonData.drinks);
      localStorage.setItem('searchDrinkResult', JSON.stringify(jsonData.drinks));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    search,
    setSearch,
    card,
    setCard,
    searchDrinkResult,
    generateSearch,
    generateRandomDrink,
    getDrinkFullDetails,
  };
};

export default useFindADrink;
