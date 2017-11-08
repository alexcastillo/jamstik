import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

import {
    samplesMapper,
    fretboardMapper
} from './utils';

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
        this.connectionStatus = new BehaviorSubject(false);
        
        this.midi = new Subject()
            .mergeMap(samplesMapper)
            .map(fretboardMapper);
    }
    
    async connect () {
        this.device = await navigator.bluetooth.requestDevice(DEVICE_OPTIONS);
        Observable.fromEvent(this.device, 'gattserverdisconnected').first().subscribe(() => {
            this.gatt = null;
            this.device = null;
            this.deviceName = null;
            this.service = null;
            this.characteristic = null;
            this.connectionStatus.next(false);
        });
        this.gatt = await this.device.gatt.connect();
        this.deviceName = this.gatt.device.name;
        this.service = await this.gatt.getPrimaryService(JAMSTIK_SERVICE_ID);
        this.characteristic = await this.service.getCharacteristic(MIDI_CHARACTERISTIC);
        this.characteristic.startNotifications();
        this.characteristic.addEventListener(CHARACTERISTIC_EVENT, event => {
            this.midi.next(event);
        });
        this.connectionStatus.next(true);
    }

    disconnect () {
        if (!this.gatt) { return };
        this.gatt.disconnect();
    }
}

export * from './utils';
