import {HmsTimePipe} from './hms-time.pipe';

describe('HmsTimePipe', () => {
    let pipe: HmsTimePipe;

    beforeEach(() => {
        pipe = new HmsTimePipe();
    });

    it('create an instance', () => {
        const pipe = new HmsTimePipe();
        expect(pipe).toBeTruthy();
    });

    it('should convert correctly', () => {
        expect(pipe.transform(61)).toEqual('01:01');
        expect(pipe.transform(1)).toEqual('00:01');
        expect(pipe.transform(40)).toEqual('00:40');
        expect(pipe.transform(60)).toEqual('01:00');
        expect(pipe.transform(3600)).toEqual('01:00:00');
        expect(pipe.transform(3601)).toEqual('01:00:01');
        expect(pipe.transform(90)).toEqual('01:30');
    });
});
