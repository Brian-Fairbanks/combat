import React, { useRef, useState, useEffect } from "react";
import Modal from "../Modal";
import TextareaAutosize from 'react-textarea-autosize';
import './styles.css';
import useWindowSize from "../useWindowSize";
// import { Link } from "react-router-dom";
// import API from "../../utils/API";

const vertInput = "shadow appearance-none w-full rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline";
// const horInput = "shadow appearance-none w-1/4 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block";
const numInput = "shadow appearance-none w-1/2 rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center";
const text = "input appearance-none rounded-lg text-gray-700 w-full flex-grow p-1 text-xs leading-tight focus:outline-none focus:shadow-outline ";

const statList = ["str", "dex", "con", "int", "wis", "cha"];

function CharacterSheet() {

  const playerclass = useRef(0);

  // runs once page loads, and stats are populated from the database
  useEffect(() => {
    console.log(stats.proficiency)
    statList.forEach(stat => {
      statUpdate(stat, stats[stat], { type: "first" });
    })
  }, [])


  // Stats Setup
  // ====================================

  const [stats, setStats] = useState({
    name: "Belythan",
    level: 1,
    playerName: "User",

    proficiency: 5,
    INSPIRARTION: 0,
    passiveWisdom: 0,
    curHP: 1,
    maxHP: 0,
    healthRolls: [10],
    tempHP: 0,
    ac: 0,
    initiative: 0,

    deathSaves: { saves: [false, false, false], fails: [false, false, false] },
    dead:false,

    personality: `You phrase your requests as orders and expect others to obey`,
    ideals: "in life as in war, the stronger force wins",
    bonds: "I fight for those who can not fight for themselves (the sea folk)",
    flaws: "I have little resprct for those who are not a proven warrior",

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

  // when the user changes the Proficiency value
  function baseProfChangeHandler(val) {
    statUpdate(null, val, { type: "baseProf", val });
  }

  // Changing a single stat, which will not effect anythig else
  function singleChangeHandler(stat, val) {
    let temp = { [stat]: val, }
    // handle deathsaves
    if (stat.includes("deathSaves")) {
      let data = stat.split(".");
      console.log(data[1]);
      temp = { deathSaves: stats.deathSaves };
      temp.deathSaves[data[1]][data[2]] = val;
    }
    setStats((prevState) => ({
      ...prevState,
      ...temp
    }));
  }


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
          break;
        case "con":
          let healthFromRolls = 0;
          stats.healthRolls.forEach(roll => {
            healthFromRolls += roll;
          })
          valsToSet["maxHP"] = healthFromRolls + ((valsToSet.conMod * stats.level)* stats.level);
          break;
        case "dex":
          valsToSet["ac"] = (valsToSet.dexMod);
          valsToSet["initiative"] = (valsToSet.dexMod);
          break;
        default:
          break;
      }

    }

    setStats((prevState) => ({
      ...prevState,
      ...valsToSet
    }));
  }

  // Helpers for StatUpdate
  //=================================

  function increaseStatFromModal(stat, val){
    switch(stat){
      case "hp":
        let healthFromRolls = 0;

        let hpList = stats.healthRolls;
        hpList[hpList.length] = val;

        hpList.forEach(roll => {
          healthFromRolls+= roll;
        })
        let HP = healthFromRolls + (stats.conMod * stats.level);
        setStats({...stats, healthRolls:hpList, maxHP: HP});
        break;
        case "curHP":
          let setHP = stats.curHP+val;
          if (setHP > stats.maxHP){setHP = stats.maxHP}
          setStats({...stats, curHP:setHP});
          break;
        case "tempHP":
          setStats({...stats, tempHP: stats.tempHP+val,  curHP: stats.curHP+val});
          break;
      default:
        break;
    }
  }

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



    // Modal Setup
  // =================================
  const windowSize = useWindowSize();
  const modalRef = useRef(0);
  const mouseRef = useRef({x:0, y:0, side:"right"});

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // set reference for modal location each time you click
  function setLoc(e) {
    console.log(e);
    console.log( "x:",e.pageX-windowRef.current>100?e.pageX:windowRef.current-e.pageX, "y:", e.pageY, "side:", e.pageX-windowRef.current>100?"left":"right" );
    mouseRef.current = { x: windowRef.current-e.pageX>100?e.pageX:windowRef.current-e.pageX, y: e.pageY, side:windowRef.current-e.pageX>100?"left":"right" };
    console.log(mouseRef.current);
  }

  const windowRef = useRef(0);
  useEffect(()=>{
    windowRef.current=windowSize
  },[windowSize])

  function modaling(stat, val, message="") {
    setModalContent(
      <form 
        className = "flex flex-col justify-center items-center align-center"
        onSubmit={(e) => {e.preventDefault(); increaseStatFromModal(stat, val*parseInt(modalRef.current.value)); setModal(false); console.log(modalRef.current.value)}}
      >
        {message?<div>{message}</div>:""}
        <input
          type='number'
          inputMode='numeric'
          pattern="[0-9]"
          id="modalInput"
          className={"mb-1 border-2 border-black"+numInput}
          ref={modalRef}
        />
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Submit</button >
      </form>
    );
    setModal(true); 
  }

  // Death Save Roll Settings
  // =========================================

      // check if you are dead
      useEffect(() => {
        if(!stats.dead){
          if (stats.curHP<(-1*stats.maxHP) || !stats.deathSaves.fails.includes(false)) {
            dead();
          }
          if (!stats.deathSaves.saves.includes(false)) {
            ressurect();
          }
        }
      }, [stats])

  function dead() {
    console.log("You dead, brah...")
    setStats({ ...stats, dead:true })
  }

  function ressurect() {
    setStats({ ...stats, dead:false, curHP:1, deathSaves: { saves: [false, false, false], fails: [false, false, false] } })
    console.log("Good job, brah.  You live.");
  }

  // Exporting Character Sheet
  // =======================================

  function handleSave(e) {
  }


  //  =======================================
  //  ||  Printing sheet for view
  //  ========================================

  return (
    <div className="relative" onClick={e => setLoc(e)} >
      <form className="grid grid-cols-3 bg-white shadow-lg rounded p-3 pb-5 pt-8 mb-4 md:w-3xl max-w-3xl min-w-3xl my-4 mx-auto">
        {/* 1/1 */}
        <div className="my-auto relative">
          <div className="nameDragonHead" />
          <div className="nameDragonTail" />
          <div className="nameBorder my-auto p-2">
            <input
              className="appearance-none rounded w-full py-1 mb-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-bold"
              id="username"
              type="text"
              value={stats.name}
              onChange={e => singleChangeHandler("name", e.target.value)}
            />
          </div>
          <label className="block text-gray-700 text-2xs mb-2 ml-5 coverFix" htmlFor="username">
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
              value={stats.level}
              onChange={e => singleChangeHandler("level", e.target.value)}
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
              value={stats.playerName}
              onChange={e => singleChangeHandler("playerName", e.target.value)}
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
        <div className="row-span-4 sm:row-span-2">
          <div className="">

            <div className="overflow-hidden mb-4">
              {/* Proficiency Bonus */}
              <div className="flex  my-1 mx-0 sm:mx-3">
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
                  <label className=" text-gray-700 text-2xs text-center" htmlFor="username">
                    PROFICIENCY BONUS
                </label>
                </div>
              </div>

              {/* INSPIRATION */}
              <div className="flex  my-1 mx-0 sm:mx-3">
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
                <div className={stat + " stat flex flex-col sm:flex-row"} key={stat}>
                  <div className="statNum w-2/3 sm:w-16 styledBorder text-center mx-auto sm:mx-0">
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
                    <div className="flex flex-col w-full h-full">
                      <div className="font-bold text-xl flex-auto flex align-center justify-center items-center">
                        {stats[stat + "Mod"]}
                      </div>

                      <div className="text-gray-700 text-2xs mb-1 sm:mb-4 w-full text-center font-bold">
                        {
                          stat === "str" ? "Strength" :
                            stat === "dex" ? "Dexterity" :
                              stat === "con" ? "Constitution" :
                                stat === "int" ? "Intelligence" :
                                  stat === "wis" ? "Wisdom" :
                                    "Charisma"
                        }
                      </div>
                    </div>
                  </div>
                  <div className="rolls w-auto text-xxs pl-2  border-black sm:border-t pt-4 sm:pt-2">
                    {stats[stat + "Rolls"].map((roll, index) => {
                      return (
                        <div className="flex items-center rollItem leading-2 my-1 sm:m-0" key={stat + roll.name}>
                          <input
                            type="checkbox"
                            className="form-checkbox text-2xs"
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
                  <label className=" text-gray-700 text-2xs text-center" htmlFor="username">
                    PASSIVE WISDOM
                </label>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* 2/2 */}
        <div className="col-span-2 sm:col-span-1">

          <div className="flex flex-wrap px-2">
            {/* AC */}
            <div className="w-1/3 marginFix">
              <div className="statBorder flex flex-col items-center align-center">
                <div>
                  {stats.ac}
                </div>
                <div className="text-2xs text-center font-bold" >
                  ARMOR CLASS
              </div>
              </div>
            </div>

            {/* Initiative  */}
            <div className="w-1/3 marginFix">
              <div className="statBorder flex flex-col items-center align-center">
                <div>
                  {stats.initiative}
                </div>
                <div className="text-2xs text-center font-bold" >
                  INITIATIVE
            </div>
              </div>
            </div>

            {/* SPEED */}
            <div className="w-1/3 marginFix">
              <div className="statBorder flex flex-col items-center align-center">
                <div>
                  {"P H V"}
                </div>
                <div className="text-2xs text-center font-bold" >
                  SPEED
            </div>
              </div>
            </div>

            {/* HP */}
            <div className="w-full marginFix">
              <div className="statBorder flex flex-col items-center align-center relative">

                {/* alert to roll for additional health */}
                {stats.healthRolls.length < stats.level ?
                  <div
                    className="statChange alert"
                    onClick={() => { modaling("hp", 1, `Health Roll for Level ${stats.healthRolls.length}`) }}
                  >
                    !
                </div>
                  :
                  ""
                }

                <div>
                  <img className="inline-block mr-3" width="16px" height="auto" alt="v" src={require('./attack.png')} onClick={() => { modaling("curHP", -1) }} />
                  {`${stats.curHP} / ${stats.maxHP}`}
                  <img className="inline-block ml-3" width="16px" height="auto" alt="^"src={require('./heal.png')} onClick={() => { modaling("curHP", 1) }} />
                </div>
                <div className="text-2xs text-center font-bold" >
                  Current Hit Points
            </div>
              </div>
            </div>

            {/* Temp HP */}
            <div className="w-full marginFix">
              <div className="statBorder col-span-3 flex flex-col items-center align-center">
                <div>
                  <img className="inline-block mr-3" width="16px" height="auto" alt="v" src={require('./attack.png')} onClick={() => { modaling("tempHP", -1) }} />
                  {stats.tempHP}
                  <img className="inline-block ml-3" width="16px" height="auto" alt="^" src={require('./heal.png')} onClick={() => { modaling("tempHP", 1) }} />
                </div>
                <div className="text-2xs text-center font-bold" >
                  Temporary Hit Points
              </div>
              </div>
            </div>

            {/* Hit Dice */}
            <div className="w-1/2 marginFix">
              <div className="statBorder flex flex-col items-center align-center">
                <div>
                  {stats.level}
                </div>
                <div className="text-2xs text-center font-bold" >
                  Hit Dice
              </div>
              </div>
            </div>

            {/* Death Saves */}
            <div className="w-1/2 marginFix">
              <div className="statBorder flex flex-col items-center align-center text-2xs font-bold text-right">
                <div>
                  <div>
                    SUCCESSES
                {
                      // saves
                      stats.deathSaves.saves.map((saveIndex, index) => {
                        return (
                          <input
                            type="checkbox"
                            className="form-checkbox text-2xs h-2 w-2 checkMargin"
                            key={`deathSaves.saves.${index}`}
                            checked={stats.deathSaves.saves[index]}
                            name={`deathSaves.saves.${index}`}
                            onChange={e => singleChangeHandler(e.target.name, e.target.checked)}
                          />
                        )
                      })
                    }
                  </div>
                  <div>
                    FAILURES
                {
                      stats.deathSaves.saves.map((saveIndex, index) => {
                        return (
                          <input
                            type="checkbox"
                            className="form-checkbox text-2xs h-2 w-2 checkMargin"
                            key={`deathSaves.fails.${index}`}
                            checked={stats.deathSaves.fails[index]}
                            name={`deathSaves.fails.${index}`}
                            onChange={e => singleChangeHandler(e.target.name, e.target.checked)}
                          />
                        )
                      })
                    }
                  </div>
                  <div className="text-2xs text-center font-bold" >
                    Death Saves
              </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* 2/3 */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex flex-wrap px-2">

            {/* PERSONALITY TRAITS */}
            <div className="w-full marginFix">
              <div className="statBorder flex flex-col items-center align-center w-full">
                <TextareaAutosize
                  className={text}
                  defaultValue={stats.personality}
                  onChange={e => singleChangeHandler("personality", e.target.value)}
                />
                <div className="text-2xs text-center font-bold" >
                  PERSONALITY TRAITS
              </div>
              </div>
            </div>

            {/* IDEALS */}
            <div className="w-full marginFix">
              <div className="statBorder flex flex-col items-center align-center">
                <TextareaAutosize
                  className={text}
                  defaultValue={stats.ideals}
                  onChange={e => singleChangeHandler("ideals", e.target.value)}
                />
                <div className="text-2xs text-center font-bold" >
                  IDEALS
              </div>
              </div>
            </div>

            {/* Bonds */}
            <div className="w-full marginFix">
              <div className="statBorder flex flex-col items-center align-center">
                <TextareaAutosize
                  className={text}
                  defaultValue={stats.bonds}
                  onChange={e => singleChangeHandler("bonds", e.target.value)}
                />
                <div className="text-2xs text-center font-bold" >
                  BONDS
              </div>
              </div>
            </div>

            {/* Flaws */}
            <div className="w-full marginFix">
              <div className="statBorder flex flex-col items-center align-center">
                <TextareaAutosize
                  className={text}
                  defaultValue={stats.flaws}
                  onChange={e => singleChangeHandler("flaws", e.target.value)}
                />
                <div className="text-2xs text-center font-bold" >
                  FLAWS
              </div>
              </div>
            </div>


          </div>
        </div>

        {/* 3/2 */}
        <div className="py-2 px-0 sm:py-0 sm:px-2 col-span-2 sm:col-span-1">
          <div className="w-full h-full statBorder flex flex-col items-center align-center">
            <div className="flex-grow py-2">
              {"P H V"}
            </div>
            <div className="text-2xs text-center font-bold" >
              ATTACKS AND SPELLCASTING
            </div>
          </div>
        </div>

        {/* 3/3 */}
        <div className="py-2 px-0 sm:py-0 sm:px-2 col-span-2 sm:col-span-1">
          <div className="w-full h-full statBorder flex flex-col items-center align-center">
            <div className="flex-grow py-2">
              {"P H V"}
            </div>
            <div className="text-2xs text-center font-bold" >
              FEATURES AND TRAITS
            </div>
          </div>
        </div>

        {/* 4/1 */}
        <div className="py-2 mt-2 mr-2">
          <div className="w-full h-full statBorder flex flex-col items-center align-center">
            <div className="flex-grow py-2">
              {"P H V"}
            </div>
            <div className="text-2xs text-center font-bold" >
              OTHER PROFICIENCIES & LANGUAGES
            </div>
          </div>
        </div>

        {/* 4/2 */}
        <div className="p-2 mt-2 col-span-2">
          <div className="w-full h-full statBorder flex flex-col items-center align-center">
            <div className="flex-grow py-2">
              {"P H V"}
            </div>
            <div className="text-2xs text-center font-bold" >
              EQUIPMENT
            </div>
          </div>
        </div>


      </form>

      {/* Modals */}
      <Modal visible={modal} loc={mouseRef.current} content={modalContent} close={() => { setModal(false) }}></Modal>

      {/* dead popup */}
      {stats.dead?
        <div id="dead" className="flex flex-col items-center">
          <div id="deadLabel">DEAD</div>
          <button
            className="bg-blue-500 hover:bg-blue-300 w-32 border-2 border-white shadow text-white font-bold py-2 px-4 rounded"
            onClick={()=>(ressurect())}
          >Ressurect Me!</button>
        </div>
        :
        ""
      }
    </div>
  );
}

export default CharacterSheet;