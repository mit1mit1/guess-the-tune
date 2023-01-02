import { Duration, GameSong, Pitch, TimeSignature } from "src/types";
import CryptoJS from "crypto-js";

type MinifiedSong = {
  b: number;
  t: TimeSignature;
  r: boolean | undefined;
  na: string;
  no: {
    p: Pitch;
    d: Duration;
    s: boolean | undefined;
    r: boolean | undefined;
  }[];
};

export const minifySong = (song: GameSong): MinifiedSong => {
  return {
    b: song.bpm,
    t: song.timeSignature,
    r: !!song.readyForProduction,
    na: song.name,
    no: song.notes.map((note) => ({
      p: note.pitch,
      d: note.durations,
      s: !!note.staccato,
      r: !!note.rest,
    })),
  };
};

export const maxifySong = (minifiedSong: MinifiedSong): GameSong => {
  return {
    bpm: minifiedSong.b,
    timeSignature: minifiedSong.t,
    readyForProduction: minifiedSong.r,
    name: minifiedSong.na,
    notes: minifiedSong.no.map((no) => ({
      pitch: no.p,
      durations: no.d,
      staccato: no.s,
      rest: no.r,
    })),
  };
};

const passphrase = "Secret Passphrase";

export const encodeSong = (song: GameSong) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(minifySong(song)),
    passphrase
  ).toString();
};

export const decodeSong = (encodedSongJSON: string) => {
  return maxifySong(
    JSON.parse(
      CryptoJS.AES.decrypt(encodedSongJSON.toString(), passphrase).toString(
        CryptoJS.enc.Utf8
      )
    )
  );
};
