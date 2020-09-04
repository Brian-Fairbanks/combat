import React, { useRef, useState, useEffect } from "react";
import './styles.css';
// import { Link } from "react-router-dom";
// import API from "../../utils/API";

const vertInput = "shadow appearance-none w-full rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
// const horInput = "shadow appearance-none w-1/4 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block";
const numInput = "shadow appearance-none w-1/2 rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center";

const statList = ["str", "dex", "con", "int", "wis", "cha"];

function CharacterSheet() {

  const usernameRef = useRef(0);
  const playerclass = useRef(0);
  // const playerStr = useRef(0);
  // const playerDex = useRef(0);
  // const playerCon = useRef(0);
  // const playerInt = useRef(0);
  // const playerWis = useRef(0);
  // const playerCha = useRef(0);

  // const [missingField, setMissingField] = useState(false);
  // const [wrongCredentials, setWrongCredentials] = useState(false);

  const [stats, setStats] = useState({
    proficiency: 5,
    INSPIRARTION: 0,
    passiveWisdom: 0,
    str: 20,
    dex: 14,
    con: 16,
    int: 12,
    wis: 14,
    cha: 18,

    strRolls: [
      { name: "Saving Throws", score: 0, proficient: false, toolTip: "" },
      { name: "Athletics", score: 0, proficient: false, toolTip: "" },
    ],

    dexRolls: [
      { name: "Saving Throws", score: 0, proficient: false, toolTip: "" },
      { name: "Acrobatics", score: 0, proficient: false, toolTip: "" },
      { name: "Slight of Hand", score: 0, proficient: false, toolTip: "" },
      { name: "Stealth", score: 0, proficient: false, toolTip: "" },
    ],

    conRolls: [
      { name: "Saving Throws", score: 0, proficient: false, toolTip: "" },
    ],

    intRolls: [
      { name: "Saving Throws", score: 0, proficient: false, toolTip: "" },
      { name: "Arcana", score: 0, proficient: false, toolTip: "" },
      { name: "History", score: 0, proficient: false, toolTip: "" },
      { name: "Investigation", score: 0, proficient: false, toolTip: "" },
      { name: "Nature", score: 0, proficient: false, toolTip: "" },
      { name: "Religion", score: 0, proficient: false, toolTip: "" },
    ],

    wisRolls: [
      { name: "Saving Throws", score: 0, proficient: true, toolTip: "" },
      { name: "Animal Handling", score: 0, proficient: false, toolTip: "" },
      { name: "Insight", score: 0, proficient: true, toolTip: "" },
      { name: "Medicine", score: 0, proficient: false, toolTip: "" },
      { name: "Perception", score: 0, proficient: false, toolTip: "" },
      { name: "Survival", score: 0, proficient: false, toolTip: "" },
    ],

    chaRolls: [
      { name: "Saving Throws", score: 0, proficient: true, toolTip: "" },
      { name: "Deception", score: 0, proficient: false, toolTip: "" },
      { name: "Intimidation", score: 0, proficient: true, toolTip: "" },
      { name: "Performance", score: 0, proficient: false, toolTip: "" },
      { name: "Persuasion", score: 0, proficient: true, toolTip: "" },
    ]


  });

  // any time a user manually changes a stat value
  function statChangeHandler(stat, val) {
    statUpdate(stat, val, { type: "stat" });
  }

  // any time a user manually changes a skill value
  function profChangeHandler(stat, index, val) {
    statUpdate(stat, stats[stat], { type: "prof", index, val });
  }

  function baseProfChangeHandler(val) {
    statUpdate(null, val, { type: "baseProf", val });
  }

  // runs once page loads, and stats are populated from the database
  useEffect(() => {
    console.log(stats.proficiency)
    statList.forEach(stat => {
      statUpdate(stat, stats[stat], { type: "first" });
    })
  }, [])


  // updates a stat, and modifies all associated numbers
  //=======================================================
  function statUpdate(stat, statVal, data) {
    // console.log(`setting ${stat+"Mod"} to ${Math.floor( stats[stat] /2)-5}`)
    let statMod = Math.floor(statVal / 2) - 5;
    let valsToSet = {};

    console.log(data);
    // when changing proficiency...
    if (data.type === "baseProf") {
      console.log("Only chaning proficiency");
      valsToSet = {
        PROFICIENCY: statVal
      }
      statList.forEach(stat => {
        statMod = Math.floor(stats[stat] / 2) - 5;
        console.log(statMod);
        valsToSet[stat + "Rolls"] = (updateChecks(stats[stat + "Rolls"], stat, statMod, data));
      })

    }
    // for all else...
    else {
      valsToSet = {
        [stat]: statVal,
        [stat + "Mod"]: statMod
      }

      valsToSet[stat + "Rolls"] = (updateChecks(stats[stat + "Rolls"], stat, statMod, data));

      switch (stat) {
        case "wis":
          valsToSet["passiveWisdom"] = 10 + (valsToSet["wisRolls"].find(roll => (roll.name === "Perception")).score)
      }

    }

    console.log(valsToSet);

    setStats((prevState) => ({
      ...prevState,
      ...valsToSet
    }));
  }

  // Helpers for StatUpdate
  //=================================

  function updateChecks(valsToSet, stat, statMod, data) {
    let profBoost = stats.proficiency;
    let score;

    if (data.type === "baseProf") {
      profBoost = data.val;
    }

    return valsToSet.map((roll, index) => {
      let prof = {};
      score = roll.proficient ? profBoost + statMod : statMod;

      // check if a skill proficiency needs to be changed
      if (data.type === "prof" && data.index === index) {
        console.log(`Change Proficiency for ${roll.name} to ${data.val}`)
        prof = { proficient: data.val };
        score = prof.proficient ? profBoost + statMod : statMod;
      }

      return (
        {
          ...roll,
          score,
          ...prof
        }
      )
    });
  }


  // Exporting Character Sheet
  // =======================================

  function handleSave(e) {
  }


  // Printing sheet for view
  //========================================
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
      <div className="row-span-2">
        <div className="">

          <div className="overflow-hidden mb-4">
            {/* Proficiency Bonus */}
            <div className="flex  my-1 mx-3">
              <div className="styledBorder1 w-8 flex justify-center items-center p-1">
                <input
                  className={"h-full w-6 text-center rounded-full text-xs"}
                  id="class"
                  type="text"
                  defaultValue={stats.proficiency}
                  onChange={e => baseProfChangeHandler(parseInt(e.target.value))}
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
                  defaultValue={stats.INSPIRARTION}
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

          {/* Stats Loop */}
          {statList.map(stat => {
            return (
              <div className={stat + " stat flex flex-row"} key={stat}>
                <div className="statNum w-16 styledBorder text-center">
                  <div className="statTop">
                    <input
                      className={numInput}
                      id="class"
                      type="text"
                      defaultValue={stats[stat]}
                      // ref={eval("player"+stat)}
                      onChange={e => statChangeHandler(stat, e.target.value)}
                    />
                  </div>
                  <div className = "flex flex-col w-full h-full">
                    <div className="font-bold text-xl flex-auto flex align-center justify-center items-center">
                      {stats[stat + "Mod"]}
                    </div>

                    <div className="text-gray-700 text-2xs mb-5 w-full text-center font-bold">
                      {
                        stat == "str" ? "Strength" :
                          stat == "dex" ? "Dexterity" :
                            stat == "con" ? "Constitution" :
                              stat == "int" ? "Intelligence" :
                                stat == "wis" ? "Wisdom" :
                                  "Charisma"
                      }
                    </div>
                  </div>
                </div>
                <div className="rolls w-auto text-xxs pl-2">
                  {stats[stat + "Rolls"].map((roll, index) => {
                    return (
                      <div className="flex items-center rollItem leading-2" key={stat + roll.name}>
                        <input
                          type="checkbox"
                          className="form-checkbox text-2xs h-2 w-2"
                          defaultChecked={roll.proficient}
                          name={roll.name}
                          onChange={e => profChangeHandler(stat, index, e.target.checked)}
                        />
                        <div className="w-4 mr-1 text-center">
                          {roll.score}
                        </div>
                        <div className="">
                          {roll.name}
                        </div>
                      </div>)
                  })}
                </div>
              </div>

            )
          })}

          <div className="overflow-hidden mt-2">
            {/* Proficiency Bonus */}
            <div className="flex  my-1 mx-3">
              <div className="styledBorder1 w-8 flex justify-center items-center p-1 text-gray-700 text-xs">
                {stats.passiveWisdom}
              </div>
              <div className="styledBorder2 flex-grow flex justify-center items-center px-2">
                <label className=" text-gray-700 text-2xs" htmlFor="username">
                  PASSIVE WISDOM
                </label>
              </div>
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