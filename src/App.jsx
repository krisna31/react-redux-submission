import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import { asyncPreloadProcess } from "./states/isPreload/action.js";
import { asyncUnsetAuthUser } from "./states/authUser/action.js";
import Leaderboards from "./pages/Leaderboards";
import DetailPages from "./pages/DetailPages";
import NotFoundPages from "./pages/NotFoundPages";

function App() {
  const { authUser = null, isPreload = false } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="h-screen flex flex-col">
        <nav className="sticky bottom-0">
          <Navigation authUser={authUser} signOut={onSignOut} />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/threads/:id" element={<DetailPages />} />
            <Route path="/*" element={<NotFoundPages />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
