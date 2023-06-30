import PropTypes from "prop-types";

function LeaderboardsItem({ score, user: { name, avatar } }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <td className="px-6 py-4 flex items-center gap-3">
        <img className="w-8 h-8 rounded-full" src={avatar} alt={name} />
        <span>{name}</span>
      </td>
      <td className="px-6 py-4">{score}</td>
    </tr>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardsItem.propTypes = {
  score: PropTypes.number.isRequired,
  user: PropTypes.arrayOf(userShape).isRequired,
};

export default LeaderboardsItem;
