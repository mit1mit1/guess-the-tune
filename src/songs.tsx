import { GameSong, Note } from "src/types";

const simpsonsTheme: GameSong = {
  bpm: 172,
  notes: [
    { pitch: "C4", duration: "4n." },
    { pitch: "E4", duration: "4n" },
    { pitch: "F#4", duration: "4n" },
    { pitch: "A4", duration: "8n" },
    { pitch: "G4", duration: "4n." },
    { pitch: "E4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "A3", duration: "8n" },
  ],
};

const imperialMarch: GameSong = {
  bpm: 103,
  notes: [
    { pitch: "A4", duration: "4n" },
    { pitch: "A4", duration: "4n" },
    { pitch: "A4", duration: "4n" },
    { pitch: "F4", duration: "8n." },
    { pitch: "C5", duration: "16n" },
    { pitch: "A4", duration: "4n" },
    { pitch: "F4", duration: "8n." },
    { pitch: "C5", duration: "16n" },
    { pitch: "A4", duration: "2n" },
  ],
};

const hedwigsTheme: GameSong = {
  bpm: 78,
  notes: [
    { pitch: "E3", duration: "8n" },
    { pitch: "A3", duration: "8n." },
    { pitch: "C4", duration: "16n" },
    { pitch: "B3", duration: "8n" },
    { pitch: "A3", duration: "4n" },
    { pitch: "E4", duration: "8n" },
    { pitch: "D4", duration: "4n." },
    { pitch: "B3", duration: "4n." },
  ],
};

export const gameSongs: Array<GameSong> = [
  simpsonsTheme,
  imperialMarch,
  hedwigsTheme,
];
