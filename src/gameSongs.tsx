import { GameSong, TimeSignature } from "src/types";

const testSong: GameSong = {
  bpm: 145,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "E5", durationObject: { "4n.": 1 } },
    { pitch: "E5", durationObject: { "8n": 1 } },
    { pitch: "D5", durationObject: { "4n": 1 } },
    { pitch: "C5", durationObject: { "8n": 1 } },
    { pitch: "A4", durationObject: { "4n.": 1 } },
  ],
  name: "test"
};

export const gameSongs: Array<GameSong> = [
  testSong,
];


export const gameSongsString = `[
  strangerThings,
  simpsonsTheme,
  imperialMarch,
  hedwigsTheme,
  thomasTheTankEngine,
  theMandalorian,
  marioBrosMainTheme,
  concerningHobbits,
  aGrandDayOut,
  missionImpossible,
  sunflower,
  theRaidersMarch,
  theChain,
  leFestin,
  standByMe,
  spiritedAwayReprise,
  tetris,
  marriedLife,
  tinyDancer,
  smokeOnTheWater,
  gourmetRace,
  zeldaMainTheme,
  chameleon,
  sevenNationArmy,
  carryOnMyWaywardSon,
  tossACoinToYourWitcher,
  heyJude,
  theLonelyShepherd,
  flyMeToTheMoon,
  oneSummersDay,
  stayinAliveIntro,
  schindlersList,
  furElise,
  avatarLegendOfAang,
  cityOfStars,
  dancingInTheMoonlight,
  battleOfTheHeroes,
  theTimeIsNow,
  september,
  cantinaBand,
  theGloryDays,
  underTheMilkyWay,
  pokemonGottaCatchEmAll,
  goodMornin,
  miiChannel,
  vertigo,
  spidermanSpiderman,
  monstersInc,
  letEmIn,
  stayinAliveChorus,
  lifesIncredibleAgain,
];


`