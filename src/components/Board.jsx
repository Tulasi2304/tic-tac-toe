import React from 'react';
import Tile from './Tile';
import Strike from './Strike';

export default function Board({tiles, onTileClick, playerTurn, strikeClass, gameState}) {
  return (
    <div className='board'>
      <Tile onTileClick={()=> {onTileClick(0)}} value={tiles[0]} playerTurn={playerTurn} gameState={gameState} className='right-border bottom-border'/>
      <Tile onTileClick={()=> {onTileClick(1)}} value={tiles[1]} playerTurn={playerTurn} gameState={gameState} className='right-border bottom-border'/>
      <Tile onTileClick={()=> {onTileClick(2)}} value={tiles[2]} playerTurn={playerTurn} gameState={gameState} className='bottom-border'/>
      <Tile onTileClick={()=> {onTileClick(3)}} value={tiles[3]} playerTurn={playerTurn} gameState={gameState} className='right-border bottom-border'/>
      <Tile onTileClick={()=> {onTileClick(4)}} value={tiles[4]} playerTurn={playerTurn} gameState={gameState} className='right-border bottom-border'/>
      <Tile onTileClick={()=> {onTileClick(5)}} value={tiles[5]} playerTurn={playerTurn} gameState={gameState} className='bottom-border'/>
      <Tile onTileClick={()=> {onTileClick(6)}} value={tiles[6]} playerTurn={playerTurn} gameState={gameState} className='right-border'/>
      <Tile onTileClick={()=> {onTileClick(7)}} value={tiles[7]} playerTurn={playerTurn} gameState={gameState} className='right-border'/>
      <Tile onTileClick={()=> {onTileClick(8)}} value={tiles[8]} playerTurn={playerTurn} gameState={gameState}/>
      <Strike strikeClass={strikeClass}/>
    </div>
  )
}
