import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
export interface IMidiEvent {
    header: number;
    timestamp: number;
    status: number;
    note: number;
    velocity: number;
}
export class Jamstik {
    deviceName: string;
    midi: Observable<IMidiEvent>;
    constructor();
    connect(): Promise<void>;
    bufferToSamples(event: any): IMidiEvent[];
    disconnect(): void;
}
