export function groupDataByTeamAndPlayer(data, filters = {}) {
  function filterData(data) {
    const {
      position = {},
      statType = {},
      marketSuspended = 'all',
      searchTerm = '',
    } = filters;
    return data.filter(
      (player) =>
        (player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.teamNickname
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        position[player.position] &&
        statType[player.statType] &&
        (marketSuspended === 'all' ||
          (marketSuspended === 'suspended' && player.marketSuspended) ||
          (marketSuspended === 'open' && !player.marketSuspended))
    );
  }
  const filteredData = filterData(data);

  return filteredData.reduce((groupedData, item) => {
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


export function groupAlternatesByPlayer(data) {
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
