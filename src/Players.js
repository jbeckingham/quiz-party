import React from 'react';

const Players = ({players}) =>
    <div class="players">
        <h1>Players</h1>
        {players.map(player => (
            <div>
                <p>{player.name}: {player.score}</p>
            </div>
        ))}
    </div>

export default Players;
