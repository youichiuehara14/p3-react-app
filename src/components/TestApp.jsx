// import { useState, useReducer } from 'react';

// const urlRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php/drinks';
// const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// const TestApp = () => {
//   // const [state, dispatch] = useReducer(reducer, initialState);

//   const [drinkFilter, setDrinkFilter] = useState('');

//   return (
//     <>
//       <div className="w-screen mt-20 ml-20">
//         <input type="text" className="border-1" placeholder="enter your search" />
//         <select
//           name=""
//           id=""
//           onChange={(e) => {
//             setDrinkFilter(e.target.value);
//           }}
//         >
//           <option value="name" className="bg-[#171717] text-amber-500">
//             name
//           </option>
//           <option value="ingredient" className="bg-[#171717] text-amber-500">
//             ingredient
//           </option>
//         </select>
//         <button>Search</button>
//       </div>
//       <h1>This is the select option value you've chosen: {`${drinkFilter}`}</h1>
//     </>
//   );
// };

// export default TestApp;
