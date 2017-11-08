
import {
    STANDARD_TUNNING as standardTunning
} from '../constants';

export const samplesMapper = event => {
    let samples = [];
    const buffer = new Uint8Array(event.target.value.buffer);
    const [ header, ...midi ] = Array.from(buffer);
    while (midi.length) {
        const [ timestamp, status, note, velocity ] = midi.splice(0, 4);
        samples.push({ header, timestamp, status, note, velocity }); 
    }
    return samples;
};

export const isOnFilter = ({ status }) =>
    status >= 0x90 && status < 0xa0;

export const isOffFilter = ({ status }) =>
    status >= 0x80 && status < 0x90;

export const fretboardMapper = sample => {
    const { status, note, velocity } = sample;
    const stringId = isOnFilter(sample)
      ? status - 0x90
      : status - 0x80;
    const fret = note - standardTunning[stringId];
    const playedAt = Date.now();
    return Object.assign({}, sample, { fret, stringId, playedAt });
};
