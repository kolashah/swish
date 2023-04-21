import markets from './assets/props.json';
import odds from './assets/alternates.json';
import TeamTables from './components/TeamTable.jsx';

function App() {
  //creates object that seperates data by team, and team by player
  function groupDataByTeamAndPlayer(data) {
    return data.reduce((groupedData, item) => {
      const { teamNickname, playerId } = item;

      if (!groupedData[teamNickname]) {
        groupedData[teamNickname] = {};
      }

      if (!groupedData[teamNickname][playerId]) {
        groupedData[teamNickname][playerId] = [];
      }

      groupedData[teamNickname][playerId].push(item);
      return groupedData;
    }, {});
  }
  const groupedData = groupDataByTeamAndPlayer(markets);

  function groupAlternatesByPlayer(data) {
    return data.reduce((groupedData, item) => {
      const { playerId, statType } = item;

      if (!groupedData[playerId]) {
        groupedData[playerId] = {};
      }

      if (!groupedData[playerId][statType]) {
        groupedData[playerId][statType] = [];
      }

      groupedData[playerId][statType].push(item);
      return groupedData;
    }, {});
  }
  const groupedAlts = groupAlternatesByPlayer(odds)
  return (
    <div className="App">
      <TeamTables groupedData={groupedData} groupedAlts={groupedAlts}/>
    </div>
  );
}

export default App;
