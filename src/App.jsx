// import React, { useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import EditForm from "./components/EditForm";
// import NameList from "./components/NameList";
// import { NameProvider } from "./NameContext";
// import PostsWithAxios from "./components/PostsWithAxios";

// function App() {
//   return (
//     <>
//       <NameProvider>
//         <Routes>
//           <Route path="/" element={<NameList />} />
//           <Route path="/edit/:i" element={<EditForm />} />
//           <Route path="/posts" element={<PostsWithAxios />} />
//         </Routes>
//       </NameProvider>
//     </>
//   );
// }

// export default App;

// import * as React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <div>
//           <h1>Hello World</h1>
//           <Link to="about">About Uss</Link>   
       
//         </div>
//       ),
//     },
//     {
//       path: "about",
//       element: <div>About</div>,
//     },
//   ]);
  
//   createRoot(document.getElementById("root")).render(
//     <RouterProvider router={router} />
//   );
 
// }

// export default App;

// ###### Nested Route ####
// import React, { useState } from "react";
// import { Routes, Route, Link, Outlet  } from "react-router-dom";
// import EditForm from "./components/EditForm";
// import NameList from "./components/NameList";
// import { NameProvider } from "./NameContext";
// import PostsWithAxios from "./components/PostsWithAxios";

// function App() {
//   return (
//     <>
//     <ul>
//       <Link to="/home">Home </Link>
//       <Link to={'/service'}>Service</Link>
//     </ul>
//       <Routes>
//         <Route path="/" element={<div>Hello World</div>} />
//         <Route path="/home" element={<div>Hello Home</div>} />
//         <Route path="/service" element={<Service />}>
//           <Route index element={<div>Hello Service One</div>} />
//           <Route path="serviceOne" element={<div>Hello Service One</div>} />
//           <Route path="serviceTwo" element={<div>Hello Service Two</div>} />
//         </Route>
//       </Routes>
//     </>
//   );
// }

// const Service = () => {
//   return (
//     <>
//     <Link to="serviceOne" >ServiceOne</Link>
//     <Link to="serviceTwo" >ServiceTwo</Link>
//     <Outlet />
    
//     </>
//   )

// }

// export default App;

// Example Redux Toolkit example
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement, incrementByAmount } from "./counterSlice";

// const App = () => {
//   const count = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();

//   return (
//     <>
//     <p>Count: {count}</p>
//     <button onClick={() => dispatch(increment())}>Increment</button>
//     <button onClick={() => dispatch(decrement())}>Decrement</button>
//     <button onClick={() => dispatch(incrementByAmount(5))}>incrementByAmount</button>
//     </>
//   )
// }
  
// export default App;

import React, { useEffect} from 'react'
import RecipeList from './components/RecipeList'
import FavoriteRecipes from './components/FavoriteRecipes'
import { fetchRecipes} from './recipeSlice'
import {Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'





function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route index path='/' element={<RecipeList />}/>
        <Route path="/favorites" element={<FavoriteRecipes />}></Route>
      </Routes>
    </div>
  );
}

export default App;