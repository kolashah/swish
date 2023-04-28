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

// Find odds for the given optimalLine from the array of alternate lines
function findOddsByLine(altLines, optimalLine) {
  return altLines.find((alt) => alt.line === optimalLine);
}
let count = 0;
// dataUtils.js
export function processData(data, groupedAlts) {
  count++;
  return data.map((row) => {
    const { playerId, statType, line } = row;

    // Get alternate lines for the given statType
    const altLines = groupedAlts[playerId]?.[statType] || [];
    const altLineValues = altLines.map((alt) => alt.line);

    // Check if the optimal line exists in alternate lines
    const optimalLineExists = altLineValues.includes(line);

    // Check if any of over/under/push odds are greater than 40% for the optimal line
    const optimalLine = row.line;
    const {
      overOdds = 0,
      underOdds = 0,
      pushOdds = 0,
    } = findOddsByLine(altLines, optimalLine) ?? {};
    const oddsAboveForty = Math.max(overOdds, underOdds, pushOdds) > 0.4;

    // Return processed row data
    return {
      ...row,
      highLine: Math.max(row.line, ...altLineValues),
      lowLine: Math.min(row.line, ...altLineValues),
      marketSuspended:
        !optimalLineExists || !oddsAboveForty ? true : row.marketSuspended,
    };
  });
}
