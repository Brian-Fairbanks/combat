import React, { useRef, useState } from "react";
import './styles.css';
import { Link } from "react-router-dom";
import API from "../../utils/API";

const vertInput = "shadow appearance-none w-full rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const horInput = "shadow appearance-none w-1/4 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block";
const numInput = "shadow appearance-none w-1/2 rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center";

function CharacterSheet() {

  const usernameRef = useRef();
  const playerclass = useRef();
  const playerStr = useRef(20);
  const playerDex = useRef(0);
  const playerCon = useRef(0);
  const playerInt = useRef(0);
  const playerWis = useRef(0);
  const playerCha = useRef(0);

  // const [missingField, setMissingField] = useState(false);
  // const [wrongCredentials, setWrongCredentials] = useState(false);

  const [stats, setStats] = useState({str:0, dex:0, con:0, int:0, wis:0, cha:0});

  function myChangeHandler(stat, val){
    setStats({...stats, [stat]:Math.floor(val/2)-5})
  }

  function handleSave(e) {
  }

  

  return (
    <form className="grid grid-cols-3 bg-white shadow-lg rounded p-3 py-5 mb-4 sm:w-2/4 my-4 mx-auto">
      
      {/* 1/1 */}
      <div className="std-border my-auto p-2">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          ref={usernameRef}
        />
        <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
          CHARACTER NAME
        </label>
      </div>

      {/* 1/2 */}
      <div className="col-span-2 std-border mb-5 p-2">
      <div className="w-3/12 inline-block">
          <input
            className={vertInput}
            id="class"
            type="text"
            ref={playerclass}
          />
          <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
            CLASS
          </label>
        </div>

        <div className="w-1/12 inline-block">
          <input
            className={vertInput}
            id="class"
            type="text"
            ref={playerclass}
          />
          <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
            LEVEL
          </label>
        </div>

        <div className="w-1/3 inline-block">
          <input
            className={vertInput}
            id="class"
            type="text"
            ref={playerclass}
          />
          <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
            BACKGROUND
          </label>
        </div>

        <div className="w-1/3 inline-block">
          <input
            className={vertInput}
            id="class"
            type="text"
            ref={playerclass}
          />
          <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
            PLAYER NAME
          </label>
        </div>

        <div className="w-1/3 inline-block">
          <input
            className={vertInput}
            id="class"
            type="text"
            ref={playerclass}
          />
          <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
            RACE
          </label>
        </div>

        <div className="w-1/3 inline-block">
          <input
            className={vertInput}
            id="class"
            type="text"
            ref={playerclass}
          />
          <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
            ALIGNMENT
          </label>
        </div>

        <div className="w-1/3 inline-block">
          <input
            className={vertInput}
            id="class"
            type="text"
            ref={playerclass}
          />
          <label className="block text-gray-700 text-2xs mb-2" htmlFor="username">
            EXPERIENCE POINTS
          </label>
        </div>
      </div>


      {/* 2/1 - 3/1 */}
      <div className="std-border row-span-2">
        <div className="">

          <div className="overflow-hidden">
            {/* Proficiency Bonus */}
            <div className="flex  my-1 mx-3">
              <div className="styledBorder1 w-8 flex justify-center items-center p-1">
                <input
                  className={"h-full w-6 text-center rounded-full text-xs"}
                  id="class"
                  type="text"
                  ref={playerclass}
                />
                </div>
              <div className="styledBorder2 flex-grow flex justify-center items-center px-2">
                <label className=" text-gray-700 text-2xs" htmlFor="username">
                  PROFICIENCY BONUS
                </label>
              </div>
            </div>

            {/* INSPIRATION */}
            <div className="flex my-1 mx-3">
              <div className="styledBorder1 w-8 flex justify-center items-center p-1">
                <input
                  className={"h-full w-6 text-center rounded-full text-xs"}
                  id="class"
                  type="text"
                  ref={playerclass}
                />
                </div>
              <div className="styledBorder2 flex-grow flex justify-center items-center px-2">
                <label className=" text-gray-700 text-2xs" htmlFor="username">
                  INSPIRATION
                </label>
              </div>
            </div>

          </div>

          {/* Strength */}
          <div id="stat str flex flex-row">
            <div className="statNum w-1/3 std-border inline-block text-center">
              <div className="statTop">
                <input
                  className={numInput}
                  id="class"
                  type="text"
                  placeholder="0"
                  ref={playerStr}
                  onChange={e => myChangeHandler("str", e.target.value)}
                />
              </div>
              <div>
                {stats.str}
              </div>

              <label className="inline-block text-gray-700 text-2xs mb-2 w-full text-center font-bold" htmlFor="username">
                Strength
              </label>
            </div>
            <div className="rolls w-2/3 inline-block text-xs pl-2">
              <ul>
                <li>Saving Throw</li>
                <li>Acrobatics</li>
              </ul>
            </div>
          </div>


        </div>
      </div>

      {/* 2/2 */}
      <div className="std-border">
        2/2
      </div>

      {/* 2/3 */}
      <div className="std-border">
        2/3
      </div>

      {/* 3/2 */}
      <div className="std-border">
        3/2
      </div>

      {/* 3/3 */}
      <div className="std-border">
        3/3
      </div>
    </form>
  );
}

export default CharacterSheet;