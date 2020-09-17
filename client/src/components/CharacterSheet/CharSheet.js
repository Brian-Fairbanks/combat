import React, { useRef } from "react";
import Modal from "../Modal";
import TextareaAutosize from 'react-textarea-autosize';
import './styles.css';
// import { Link } from "react-router-dom";
// import API from "../../utils/API";

const vertInput = "shadow appearance-none w-full rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline";
// const horInput = "shadow appearance-none w-1/4 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block";
const numInput = "shadow appearance-none w-1/2 rounded p-1 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center";
const text = "input appearance-none rounded-lg text-gray-700 w-full flex-grow p-1 text-xs leading-tight focus:outline-none focus:shadow-outline ";

const statList = ["str", "dex", "con", "int", "wis", "cha"];

function CharacterSheet(props) {
  const playerclass = useRef(0);


  

  //  =======================================
  //  ||  Printing sheet for view
  //  ========================================
return (
    <div className="relative" onClick={e => props.setLoc(e)} >
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
              value={props.stats.name}
              onChange={e => props.singleChangeHandler("name", e.target.value)}
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
              value={props.stats.level}
              onChange={e => props.singleChangeHandler("level", e.target.value)}
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
              value={props.stats.playerName}
              onChange={e => props.singleChangeHandler("playerName", e.target.value)}
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
                    defaultValue={props.stats.proficiency}
                    onChange={e => props.baseProfChangeHandler(parseInt(e.target.value))}
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
                    defaultValue={props.stats.INSPIRARTION}
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
                        type="number"
                        defaultValue={props.stats["base"+stat]}
                        // ref={eval("player"+stat)}
                        onChange={e => props.statChangeHandler(stat, e.target.value)}
                      />
                      {props.stats["feat"+stat]}
                    </div>
                    <div className="flex flex-col w-full h-full">
                      <div className="font-bold text-xl flex-auto flex align-center justify-center items-center">
                        {props.stats[stat + "Mod"]}
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
                    {!props.stats[stat + "Rolls"]?"":props.stats[stat + "Rolls"].map((roll, index) => {
                      return (
                        <div className="flex items-center rollItem leading-2 my-1 sm:m-0" key={stat + roll.name}>
                          <input
                            type="checkbox"
                            className="form-checkbox text-2xs"
                            defaultChecked={roll.proficient}
                            name={roll.name}
                            onChange={e => props.profChangeHandler(stat, index, e.target.checked)}
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
                  {props.stats.passiveWisdom}
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
                  {props.stats.ac}
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
                  {props.stats.initiative}
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
                {props.stats.healthRolls.length < props.stats.level ?
                  <div
                    className="statChange alert"
                    onClick={() => { props.modaling("hp", 1, `Health Roll for Level ${props.stats.healthRolls.length}`) }}
                  >
                    !
                </div>
                  :
                  ""
                }

                <div>
                  <img className="inline-block mr-3" width="16px" height="auto" alt="v" src={require('./attack.png')} onClick={() => { props.modaling("curHP", -1) }} />
                  {`${props.stats.curHP} / ${props.stats.maxHP}`}
                  <img className="inline-block ml-3" width="16px" height="auto" alt="^"src={require('./heal.png')} onClick={() => { props.modaling("curHP", 1) }} />
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
                  <img className="inline-block mr-3" width="16px" height="auto" alt="v" src={require('./attack.png')} onClick={() => { props.modaling("tempHP", -1) }} />
                  {props.stats.tempHP}
                  <img className="inline-block ml-3" width="16px" height="auto" alt="^" src={require('./heal.png')} onClick={() => { props.modaling("tempHP", 1) }} />
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
                  {props.stats.level}
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
                      props.stats.deathSaves.saves.map((saveIndex, index) => {
                        return (
                          <input
                            type="checkbox"
                            className="form-checkbox text-2xs h-2 w-2 checkMargin"
                            key={`deathSaves.saves.${index}`}
                            checked={props.stats.deathSaves.saves[index]}
                            name={`deathSaves.saves.${index}`}
                            onChange={e => props.singleChangeHandler(e.target.name, e.target.checked)}
                          />
                        )
                      })
                    }
                  </div>
                  <div>
                    FAILURES
                {
                      props.stats.deathSaves.saves.map((saveIndex, index) => {
                        return (
                          <input
                            type="checkbox"
                            className="form-checkbox text-2xs h-2 w-2 checkMargin"
                            key={`deathSaves.fails.${index}`}
                            checked={props.stats.deathSaves.fails[index]}
                            name={`deathSaves.fails.${index}`}
                            onChange={e => props.singleChangeHandler(e.target.name, e.target.checked)}
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
                  defaultValue={props.stats.personality}
                  onChange={e => props.singleChangeHandler("personality", e.target.value)}
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
                  defaultValue={props.stats.ideals}
                  onChange={e => props.singleChangeHandler("ideals", e.target.value)}
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
                  defaultValue={props.stats.bonds}
                  onChange={e => props.singleChangeHandler("bonds", e.target.value)}
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
                  defaultValue={props.stats.flaws}
                  onChange={e => props.singleChangeHandler("flaws", e.target.value)}
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
              {props.stats.feats.map(feat => {
                return(
                  <div className="text-xs">
                    <div className="font-bold inline-block">{feat.name}</div>{" : "+ feat.description}
                  </div>
                )
              })}
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
      <Modal visible={props.modal} loc={props.mouseRef.current} content={props.modalContent} close={() => { props.setModal(false) }}></Modal>

      {/* dead popup */}
      {props.stats.dead?
        <div id="dead" className="flex flex-col items-center">
          <div id="deadLabel">DEAD</div>
          <button
            className="bg-blue-500 hover:bg-blue-300 w-32 border-2 border-white shadow text-white font-bold py-2 px-4 rounded"
            onClick={()=>(props.ressurect())}
          >Ressurect Me!</button>
        </div>
        :
        ""
      }
    </div>
  );
}

export default CharacterSheet;