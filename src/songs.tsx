import { GameSong, TimeSignature } from "src/types";

const simpsonsTheme: GameSong = {
  bpm: 172,
  notes: [
    { pitch: "C5", duration: "4n." },
    { pitch: "E5", duration: "4n" },
    { pitch: "F#5", duration: "4n" },
    { pitch: "A5", duration: "8n" },
    { pitch: "G5", duration: "4n." },
    { pitch: "E5", duration: "4n" },
    { pitch: "C5", duration: "4n" },
    { pitch: "A4", duration: "8n" },
  ],
  timeSignature: TimeSignature.FOURFOUR,
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
  timeSignature: TimeSignature.FOURFOUR,
};

const hedwigsTheme: GameSong = {
  bpm: 78,
  notes: [
    { pitch: "E4", duration: "8n" },
    { pitch: "A4", duration: "8n." },
    { pitch: "C5", duration: "16n" },
    { pitch: "B4", duration: "8n" },
    { pitch: "A4", duration: "4n" },
    { pitch: "E5", duration: "8n" },
    { pitch: "D5", duration: "4n." },
    { pitch: "B4", duration: "4n." },
  ],
  timeSignature: TimeSignature.FOURFOUR,
};

export const gameSongs: Array<GameSong> = [
  simpsonsTheme,
  imperialMarch,
  hedwigsTheme,
];
