import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';

import {
    DEVICE_OPTIONS,
    JAMSTIK_SERVICE_ID,
    MIDI_CHARACTERISTIC,
    CHARACTERISTIC_EVENT
} from './constants';

export default class Jamstik {

    constructor () {
        this.gatt = null;
        this.device = null;
        this.deviceName = null;
        this.service = null;
        this.characteristic = null;
        this.midi = new Subject().mergeMap(this.bufferToSamples);
    }
    
    async connect () {
        this.device = await navigator.bluetooth.requestDevice(DEVICE_OPTIONS);
        this.gatt = await this.device.gatt.connect();
        this.deviceName = this.gatt.device.name;
        this.service = await this.gatt.getPrimaryService(JAMSTIK_SERVICE_ID);
        this.characteristic = await this.service.getCharacteristic(MIDI_CHARACTERISTIC);
        this.characteristic.startNotifications();
        this.characteristic.addEventListener(CHARACTERISTIC_EVENT, event => {
            this.midi.next(event);
        });
    }

    bufferToSamples (event) {
        let samples = [];
        const buffer = new Uint8Array(event.target.value.buffer);
        const [ header, ...midi ] = Array.from(buffer);
        while (midi.length) {
            const [ timestamp, status, note, velocity ] = midi.splice(0, 4);
            samples.push({ header, timestamp, status, note, velocity }); 
        }
        return samples;
    }

    disconnect () {
        if (!this.gatt) { return };
        this.gatt.disconnect();
    }
}
