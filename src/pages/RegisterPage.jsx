import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";
import { IoPeopleCircleOutline } from "react-icons/io5";
import Loading from "../components/Loading";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate("/");
  };

  return (
    <section className="flex min-h-screen">
      <Loading />
      <header className="flex-grow bg-blue-500 justify-center items-center flex">
        <h1>
          <IoPeopleCircleOutline className="w-48 h-48" />
        </h1>
      </header>
      <article className="flex-grow flex justify-center items-center flex-col gap-4">
        <h2 className="text-4xl mb-20">Register Page</h2>

        <RegisterInput register={onRegister} />
        <p className="w-full px-28">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 underline">
            Login
          </Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
