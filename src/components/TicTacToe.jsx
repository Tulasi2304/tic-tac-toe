// import React from 'react'  --> not needed
import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import clickSoundAsset from "../sounds/click.mp3";
import gameOverSoundAsset from "../sounds/game_over.mp3";

const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const winningCombos = [
    {combo: [0, 1, 2], strikeClass: "strike-row-1"},
    {combo: [3, 4, 5], strikeClass: "strike-row-2"},
    {combo: [6, 7, 8], strikeClass: "strike-row-3"},

    {combo: [0, 3, 6], strikeClass: "strike-column-1"},
    {combo: [1, 4, 7], strikeClass: "strike-column-2"},
    {combo: [2, 5, 8], strikeClass: "strike-column-3"},

    {combo: [0, 4, 8], strikeClass: "strike-diagonal-1"},
    {combo: [2, 4, 6], strikeClass: "strike-diagonal-2"},
];

function checkWinner(tiles, setStrikeClass, setGameState){
    for(const {combo, strikeClass} of winningCombos){
        const tileVal1 = tiles[combo[0]];
        const tileVal2 = tiles[combo[1]];
        const tileVal3 = tiles[combo[2]];

        if(tileVal1 !== null && tileVal1 === tileVal2 && tileVal1 === tileVal3){
            setStrikeClass(strikeClass);
            if(tileVal1 === PLAYER_X){
                setGameState(GameState.playerXWins);
            }
            else{
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }
    const allTilesFilled = tiles.every((tile)=> tile !== null);
    if(allTilesFilled){
        setGameState(GameState.draw);
    }
}

export default function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);

    const handleClick = (index) => {
        if(gameState !== GameState.inProgress){
            return;
        }

        if(tiles[index] !== null){
            return;
        }
        const updatedTiles = [...tiles];
        updatedTiles[index] = playerTurn;
        setTiles(updatedTiles);

        if(playerTurn === PLAYER_X){
            setPlayerTurn(PLAYER_O);
        }
        else{
            setPlayerTurn(PLAYER_X);
        }
    };

    useEffect(()=>{
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass();
    }

    useEffect(()=>{
        if(tiles.some((tile) => tile !== null)){
            clickSound.play();
        }
    }, [tiles]);

    useEffect(() => {
        if(gameState !== GameState.inProgress){
            gameOverSound.play();
        }
    }, [gameState]);

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board tiles={tiles} playerTurn={playerTurn} onTileClick={handleClick} strikeClass={strikeClass} gameState={gameState} />
            <GameOver gameState={gameState}/>
            <Reset gameState={gameState} onReset={handleReset}/>
        </div>
    );
}
