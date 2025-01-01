import React from 'react';
import GameState from './GameState';

export default function Tile({ className, value, onTileClick, gameState, playerTurn }) {      // or export default function Tile(props) { //
    let hoverClass = null;
    if(value == null && playerTurn != null){
      hoverClass = `${playerTurn.toLowerCase()}-hover`;
    }
    if(gameState !== GameState.inProgress){
      hoverClass = '';
    }
    return (
      <div onClick={onTileClick} className={`tile ${className} ${hoverClass}`}>   {/* or props.className    */}
        {value}
      </div>
    );
}
