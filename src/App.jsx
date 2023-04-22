import markets from './assets/props.json';
import odds from './assets/alternates.json';
import TeamTables from './components/TeamTable.jsx';
import Sidebar from './components/Sidebar.jsx';

function App() {
  // Function to group data by team and then by player
  function groupDataByTeamAndPlayer(data) {
    return data.reduce((groupedData, item) => {
      const { teamNickname, playerId } = item;

      // Initialize a new object for the team if it doesn't exist
      if (!groupedData[teamNickname]) {
        groupedData[teamNickname] = {};
      }

      // Initialize a new array for the player if it doesn't exist
      if (!groupedData[teamNickname][playerId]) {
        groupedData[teamNickname][playerId] = [];
      }

      // Add the item to the player's array
      groupedData[teamNickname][playerId].push(item);
      return groupedData;
    }, {});
  }
  const groupedData = groupDataByTeamAndPlayer(markets);

  // Function to group alternate odds by player and then by statType
  function groupAlternatesByPlayer(data) {
    return data.reduce((groupedData, item) => {
      const { playerId, statType } = item;

      // Initialize a new object for the player if it doesn't exist
      if (!groupedData[playerId]) {
        groupedData[playerId] = {};
      }

      // Initialize a new array for the statType if it doesn't exist
      if (!groupedData[playerId][statType]) {
        groupedData[playerId][statType] = [];
      }

      // Add the item to the statType's array
      groupedData[playerId][statType].push(item);
      return groupedData;
    }, {});
  }
  const groupedAlts = groupAlternatesByPlayer(odds);

  return (
    <div className="App">
      <Sidebar groupedData={groupedData} />
      <TeamTables groupedData={groupedData} groupedAlts={groupedAlts} />
    </div>
  );
}

export default App;
