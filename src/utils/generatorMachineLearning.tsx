import { gameSongsSpare } from "src/gameSongsSpare";
import ml5 from "ml5";
import { notBangers } from "src/constants/notBangers";
import { durationNames, pitchNames } from "src/constants";
import { BaseDuration, GameSong, Pitch } from "src/types";
import { probabilisticallyGenerateSong, probabilisticGameSongs } from "./generatorProbability";
import { generatedBangers } from "src/constants/generatedBangers";

export const machineLearntSongs = [];

const getDurationNumber = (durations: Array<BaseDuration>) => {
    let number = 0;
    durations.forEach((baseDuration, index) => {
        number += durationNames.indexOf(baseDuration) * ((index + 1) * durationNames.length)
    })
    return number;
}

const nn = ml5.neuralNetwork({
    task: 'classification', // or 'regression'
    inputs: ['duration0', 'duration1', 'duration2', 'duration3', 'duration4', 'duration5', 'duration6', 'duration7', 'pitch0', 'pitch1', 'pitch2', 'pitch3', 'pitch4', 'pitch5', 'pitch6', 'pitch7',],
    outputs: ['isBanger', 'isNotBanger'],
    debug: true,
});

const goodSongs = gameSongsSpare.concat(generatedBangers);

goodSongs.filter(song => song.notes.length === 8).forEach(song => {
    let inputs: any = {}
    song.notes.forEach((note, index) => {
        inputs['pitch' + index.toString()] = pitchNames.indexOf(note.pitch) + 1;
        inputs['duration' + index.toString()] = getDurationNumber(note.durations) + 1;
    });
    nn.addData(inputs, { isBanger: 1, isNotBanger: 0 });
});

notBangers.forEach(song => {
    let inputs: any = {}
    song.notes.forEach((note, index) => {
        inputs['pitch' + index.toString()] = pitchNames.indexOf(note.pitch as Pitch) + 1;
        inputs['duration' + index.toString()] = getDurationNumber(note.durations as Array<BaseDuration>) + 1;
    });
    nn.addData(inputs, { isBanger: 0, isNotBanger: 1 });
});

nn.normalizeData();


const trainingOptions = {
    epochs: 32,
    batchSize: 3
}
nn.train(trainingOptions, finishedTraining);

function finishedTraining() {
    let songsSearched = 0;
    console.log('beginning search for banger')
    const discoveredBangers: Array<GameSong> = []
    console.log('enter while loop')
    while (songsSearched < 50) {
        let song = probabilisticallyGenerateSong();
        let inputs: any = {}
        song.notes.forEach((note, index) => {
            inputs['pitch' + index.toString()] = pitchNames.indexOf(note.pitch) + 1;
            inputs['duration' + index.toString()] = getDurationNumber(note.durations) + 1;
        });
        // eslint-disable-next-line no-loop-func
        nn.predict(inputs, (error: any, result: any) => {
            if (error) {
                console.log(error);
                return;
            }
            if (result[0].isBanger > result[1].isNotBanger + 0.3) {
                console.log(
                    'pushing banger'
                )
                discoveredBangers.push(song);
            }
            if (songsSearched > 45) {
                console.log('all Bangers are:')
                console.log(JSON.stringify(discoveredBangers));
            }
        });
        songsSearched++;
    }
}
