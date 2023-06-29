import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";
import LeaderboardsItem from "../components/LeaderboardsItem";
import Loading from "../components/Loading";

function Leaderboards() {
  const { leaderboards } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  console.log(leaderboards);

  return (
    <section className="container px-28 flex flex-col justify-center items-center pb-10 pt-5">
      <Loading />
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Our Leaderboards</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map(({ score, user }) => (
              <LeaderboardsItem key={user.id} score={score} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaderboards;
