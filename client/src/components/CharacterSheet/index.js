import React, { useRef, useState, useEffect } from "react";
import useWindowSize from "../useWindowSize";
import CharacterSheet from "./CharSheet";
import { set } from "mongoose";

const statList = ["str", "dex", "con", "int", "wis", "cha"];
const numInput = "shadow appearance-none w-1/2 rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center";

function Logic() {



  // useEffect(() => {
  //   if (!firstRun) {
  //     statList.forEach(stat => {
  //       // statUpdate(stat, stats["base" + stat], { type: "first" });
  //     })
  //     setFirstRun("Feats")
  //   }

  //   else if (firstRun === "Feats") {
  //     console.log("========== Done with first pass ==========", stats)
  //     // getFeatVals();
  //   }

  // }, [firstRun])


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
    // featinitiative: 0,

    deathSaves: { saves: [false, false, false], fails: [false, false, false] },
    dead: false,

    personality: `You phrase your requests as orders and expect others to obey`,
    ideals: "in life as in war, the stronger force wins",
    bonds: "I fight for those who can not fight for themselves (the sea folk)",
    flaws: "I have little resprct for those who are not a proven warrior",

    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,

    basestr: 20,
    basedex: 14,
    basecon: 16,
    baseint: 12,
    basewis: 14,
    basecha: 18,


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
    ],

    feats: [
      { name: "Con+2", statEffects: { stat: "con", val: 2 } },
      { name: "Dex+2", statEffects: { stat: "dex", val: 2 } },
      { name: "Alert", description: "+5 Initiative, can't be surprised, no advantage for hidden attackers ", statEffects: { stat: "initiative", val: 5 } },
      { name: "Tough", description: "gain 2 hit points per character level", statEffects: { stat: "maxHP", val: "stats.level*2" } }
    ]
  });


  // runs once page loads, and stats are populated from the database
  const [toUpdate, setToUpdate] = useState(true);

  useEffect(() => {
    if (toUpdate) {
      setToUpdate(!toUpdate);
      updateAll();
    }
  }, [stats])



  // any time a user manually changes a stat value
  function statChangeHandler(stat, val) {
    setStats({...stats, ["base"+stat]:parseInt(val)})
    setToUpdate(!toUpdate);
  }

  // any time a user manually changes a skill value
  function profChangeHandler(stat, index, val) {
    // set stat
    let rolls = { [stat + "Rolls"]: stats[stat + "Rolls"] };
    rolls[stat + "Rolls"][index].proficient = val;
    setStats({ ...stats, ...rolls });
    // prepare to updateAll
    setToUpdate(!toUpdate);
  }

  // when the user changes the Proficiency value
  function baseProfChangeHandler(val) {
    setStats({ ...stats, proficiency:parseInt(val) });
    // prepare to updateAll
    setToUpdate(!toUpdate);
    // statUpdate(null, val, { type: "baseProf", val });
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
    setToUpdate(!toUpdate);
  }


//====================================================================

// ||  Function to update all stats, and fill out the player sheet 

//====================================================================

  async function updateAll() {
    // copy current stat list into new array
    let valsToSet = { ...stats };

    // first round changes
    statList.forEach(stat => {
      let theseStats = calcStats(stat, valsToSet);
      valsToSet = { ...valsToSet, ...theseStats };
    })

    // apply feats
    valsToSet = getFeatVals(valsToSet)
    console.log(valsToSet);

    // apply equip

    // reupdate everything
    statList.forEach(stat => {
      let theseStats = calcStats(stat, valsToSet);
      valsToSet = { ...valsToSet, ...theseStats };
    })

    // set final update to stats
    setStats((prevState) => ({
      ...prevState,
      ...valsToSet
    }));
  }


  // Helpers for updateAll
  //=================================

  function calcStats(stat, theseStats) {
    let valsToSet = {};
    let buffedStat = theseStats["base" + stat] + (theseStats["feat" + stat] ? theseStats["feat" + stat] : 0);
    let statMod = Math.floor(buffedStat / 2) - 5;

    valsToSet = {
      ...theseStats,
      [stat]: buffedStat,
      [stat + "Mod"]: statMod
    }

    valsToSet[stat + "Rolls"] = (applyProficiencyToSkills(theseStats, stat, statMod, theseStats.proficiency));


    switch (stat) {
      case "wis":
        console.log(valsToSet);
        valsToSet["passiveWisdom"] = 10 + (valsToSet["wisRolls"].find(roll => (roll.name === "Perception")).score)
        break;
      case "con":
        let healthFromRolls = 0;
        theseStats.healthRolls.forEach(roll => {
          healthFromRolls += roll;
        })
        valsToSet["maxHP"] = (valsToSet["featmaxHP"] ? valsToSet["featmaxHP"] : 0) + healthFromRolls + ((valsToSet.conMod * theseStats.level));
        break;
      case "dex":
        valsToSet["ac"] = (valsToSet.dexMod + (theseStats.featac ? theseStats.featac : 0));
        valsToSet["initiative"] = (valsToSet.dexMod + (theseStats.featinitiative ? theseStats.featinitiative : 0));
        break;
      default:
        break;
    }

    return valsToSet;
  }


  // apply all stats from feats
  function getFeatVals(theseStats) {
    let valsToSet = {};
    theseStats.feats.forEach(feat => {
      if (feat.statEffects) {
        let stat = feat.statEffects.stat;
        let val = eval(feat.statEffects.val)
        if (!valsToSet["feat" + stat]) { valsToSet["feat" + stat] = 0 };
        valsToSet["feat" + stat] += val
      }
    })
    console.log("================ APPLYING FEATS! ====================")
    return {...theseStats, ...valsToSet}
  }

  function applyProficiencyToSkills(theseStats, stat, statMod, profBoost) {
    return theseStats[stat + "Rolls"].map((roll) => {
      let score = roll.proficient ? profBoost + statMod : statMod;
      return (
        { ...roll, score }
      )
    });
  }


  function increaseStatFromModal(stat, val) {
    switch (stat) {
      case "hp":
        let healthFromRolls = 0;

        let hpList = stats.healthRolls;
        hpList[hpList.length] = val;

        hpList.forEach(roll => {
          healthFromRolls += roll;
        })
        let HP = (stats["featmaxHP"] ? stats["featmaxHP"] : 0) + healthFromRolls + (stats.conMod * stats.level);
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
  // Modal Setup
  // =================================
  const windowSize = useWindowSize();
  const modalRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, side: "right" });

  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // set reference for modal location each time you click
  function setLoc(e) {
    // console.log(e);
    // console.log("x:", e.pageX - windowRef.current > 100 ? e.pageX : windowRef.current - e.pageX, "y:", e.pageY, "side:", e.pageX - windowRef.current > 100 ? "left" : "right");
    mouseRef.current = { x: windowRef.current - e.pageX > 100 ? e.pageX : windowRef.current - e.pageX, y: e.pageY, side: windowRef.current - e.pageX > 100 ? "left" : "right" };
    // console.log(mouseRef.current);
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
        modalContent={modalContent}
        mouseRef={mouseRef}

        setStats={setStats}
        setModal={setModal}
        setModalContent={setModalContent}
        setLoc={setLoc}

        modaling={modaling}
        statChangeHandler={statChangeHandler}
        profChangeHandler={profChangeHandler}
        baseProfChangeHandler={baseProfChangeHandler}
        singleChangeHandler={singleChangeHandler}
        ressurect={ressurect}
      />
    </div>
  )
}

export default Logic;