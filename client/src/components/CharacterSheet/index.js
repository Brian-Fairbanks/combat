import React, { useRef, useState, useEffect } from "react";
import useWindowSize from "../useWindowSize";
import CharacterSheet from "./CharSheet";

const statList = ["str", "dex", "con", "int", "wis", "cha"];
const numInput = "shadow appearance-none w-1/2 rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center";

function Logic() {

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
    dead: false,

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
          valsToSet["maxHP"] = healthFromRolls + ((valsToSet.conMod * stats.level) * stats.level);
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

  function increaseStatFromModal(stat, val) {
    switch (stat) {
      case "hp":
        let healthFromRolls = 0;

        let hpList = stats.healthRolls;
        hpList[hpList.length] = val;

        hpList.forEach(roll => {
          healthFromRolls += roll;
        })
        let HP = healthFromRolls + (stats.conMod * stats.level);
        setStats({ ...stats, healthRolls: hpList, maxHP: HP });
        break;
      case "curHP":
        let setHP = stats.curHP + val;
        if (setHP > stats.maxHP) { setHP = stats.maxHP }
        setStats({ ...stats, curHP: setHP });
        break;
      case "tempHP":
        setStats({ ...stats, tempHP: stats.tempHP + val, curHP: stats.curHP + val });
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
  const mouseRef = useRef({ x: 0, y: 0, side: "right" });

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // set reference for modal location each time you click
  function setLoc(e) {
    console.log(e);
    console.log("x:", e.pageX - windowRef.current > 100 ? e.pageX : windowRef.current - e.pageX, "y:", e.pageY, "side:", e.pageX - windowRef.current > 100 ? "left" : "right");
    mouseRef.current = { x: windowRef.current - e.pageX > 100 ? e.pageX : windowRef.current - e.pageX, y: e.pageY, side: windowRef.current - e.pageX > 100 ? "left" : "right" };
    console.log(mouseRef.current);
  }

  const windowRef = useRef(0);
  useEffect(() => {
    windowRef.current = windowSize
  }, [windowSize])

  function modaling(stat, val, message = "") {
    setModalContent(
      <form
        className="flex flex-col justify-center items-center align-center"
        onSubmit={(e) => { e.preventDefault(); increaseStatFromModal(stat, val * parseInt(modalRef.current.value)); setModal(false); console.log(modalRef.current.value) }}
      >
        {message ? <div>{message}</div> : ""}
        <input
          type='number'
          inputMode='numeric'
          pattern="[0-9]"
          id="modalInput"
          className={"mb-1 border-2 border-black" + numInput}
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
    if (!stats.dead) {
      if (stats.curHP < (-1 * stats.maxHP) || !stats.deathSaves.fails.includes(false)) {
        dead();
      }
      if (!stats.deathSaves.saves.includes(false)) {
        ressurect();
      }
    }
  }, [stats])

  function dead() {
    console.log("You dead, brah...")
    setStats({ ...stats, dead: true })
  }

  function ressurect() {
    setStats({ ...stats, dead: false, curHP: 1, deathSaves: { saves: [false, false, false], fails: [false, false, false] } })
    console.log("Good job, brah.  You live.");
  }

  // Exporting Character Sheet
  // =======================================

  function handleSave(e) {
  }

  return (
    <div>
      <CharacterSheet
        stats={stats}
        modal={modal}
        modalContent = {modalContent}
        mouseRef = {mouseRef}

        setStats={setStats}
        setModal={setModal}
        setModalContent = {setModalContent}
        setLoc={setLoc}

        modaling={modaling}
        statChangeHandler={statChangeHandler}
        profChangeHandler={profChangeHandler}
        singleChangeHandler={singleChangeHandler}
        ressurect={ressurect}
      />
    </div>
  )
}

export default Logic;