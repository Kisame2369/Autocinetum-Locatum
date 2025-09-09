import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const Header = lazy(() => import("../Header/Header.jsx"));

function App() {
  

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
    </>
  )
};

export default App
