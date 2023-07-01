import { IoPeopleCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import Loading from "../components/Loading";

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <>
      <Loading />
      <section className="flex min-h-screen">
        <header className="flex-grow bg-blue-500 justify-center items-center flex">
          <h1>
            <IoPeopleCircleSharp className="w-48 h-48" />
          </h1>
        </header>
        <article className="flex-grow flex justify-center items-center flex-col gap-4">
          <h2 className="text-4xl mb-20">
            Discuss <strong>With People</strong>, <br />
            Through Open World.
          </h2>

          <LoginInput login={onLogin} />
          <p className="w-full px-28">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-800 underline">
              Register
            </Link>
          </p>
        </article>
      </section>
    </>
  );
}

export default LoginPage;
