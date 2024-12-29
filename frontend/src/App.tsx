import { Route, Routes, useParams } from "react-router-dom";


import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import { Login } from "./pages/login";
import { ProductsList } from "./pages/products-list";
import Profile from "./pages/profile";
import { SlicesList } from "./pages/slices-list";
import { SlicePage } from "./pages/slice-page";
import DefaultLayout from "./layouts/default";
import { useState } from "react";

function App() {
  // const {id} = useParams()
  const [globalData, setGLobalData] = useState([{
    id: 1,
    name: "Hi"
  }])

  return (
    <DefaultLayout>
      <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Profile setGlobalData={setGLobalData}/>} path='/profile' />
          <Route element={<ProductsList products={globalData}/>} path='/products' />
          <Route element={<SlicesList />} path='/slices' />
          {/* <Route element={<SlicePage />} path='/slice/:id' /> */}
      </Routes>
    </DefaultLayout>
  )
}

export default App;
