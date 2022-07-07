import { GameSong, TimeSignature } from "src/types";

const testSong: GameSong = {
  bpm: 113,
  timeSignature: TimeSignature.FOURFOUR,
  readyForProduction: true,
  notes: [
    { pitch: "C5", durations: ["8n"] },
    { pitch: "A4", durations: ["8n"] },
    { pitch: "C5", durations: ["8n"] },
    { pitch: "D5", durations: ["16n"] },
    { pitch: "C5", durations: ["16n"] },
    { rest: true, pitch: "C5", durations: ["8t"] },
    { pitch: "E4", durations: ["4t"] },
    { pitch: "F4", durations: ["8n"] },
    { pitch: "F#4", durations: ["8n"] },
    { pitch: "G4", durations: ["4n"] },
  ],
  name: "Bob-omb Battlefield Theme"
};

export const gameSongs: Array<GameSong> = [
  testSong,
];


export const gameSongsString = `[
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
  strangerThings,
  dancingInTheMoonlight,
  battleOfTheHeroes,
  theTimeIsNow,
  september,
  cantinaBand,
  blindingLights,
  theGloryDays,
  gavityFallsTheme,
  underTheMilkyWay,
  pokemonGottaCatchEmAll,
  goodMornin,
  uptownFunkIntro,
  miiChannel,
  punchOut,
  vertigo,
  spidermanSpiderman,
  shapeOfYouIntro,
  insideTheCastleWalls,
  myHeartWillGoOnIntro,
  monstersInc,
  delfinoPlaze,
  letEmIn,
  stayinAliveChorus,
  lifesIncredibleAgain,
  bobombBattlefield,
  loveStoryIntro,
  gavityFallsTheme,
  midlyOpusOne,
];


`