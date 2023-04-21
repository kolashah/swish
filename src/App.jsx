import markets from './assets/props.json';
import odds from './assets/alternates.json';
import TeamTables from './components/TeamTable.jsx';

function App() {
  //creates object that seperates data by team, and team by player
  function groupDataByTeamAndPlayer(data) {
    return data.reduce((groupedData, item) => {
      const { teamNickname, playerName } = item;

      if (!groupedData[teamNickname]) {
        groupedData[teamNickname] = {};
      }

      if (!groupedData[teamNickname][playerName]) {
        groupedData[teamNickname][playerName] = [];
      }

      groupedData[teamNickname][playerName].push(item);
      return groupedData;
    }, {});
  }

  const groupedData = groupDataByTeamAndPlayer(markets);
  return (
    <div className="App">
      <TeamTables groupedData={groupedData} />
    </div>
  );
}

export default App;
