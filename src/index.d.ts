import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
export interface IMidiEvent {
    header: number;
    timestamp: number;
    status: number;
    note: number;
    velocity: number;
    stringId?: number;
    fret?: number;
}
export default class Jamstik {
    deviceName: string;
    midi: Observable<IMidiEvent>;
    connectionStatus: Observable<boolean>;
    constructor();
    connect(): Promise<void>;
    bufferToSamples(event: any): IMidiEvent[];
    disconnect(): void;
}
export function isOnFilter (event:IMidiEvent):boolean;
export function isOffFilter (event:IMidiEvent):boolean;
export function fretboardMapper (event:IMidiEvent):IMidiEvent;