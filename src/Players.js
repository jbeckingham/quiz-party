import React from 'react';

const Players = ({players}) =>
    <div className="players">
        <h1>Players</h1>
        {players.map(name => (
            <div key={name}>
                <p>{name}</p>
            </div>
        ))}
    </div>

export default Players;
