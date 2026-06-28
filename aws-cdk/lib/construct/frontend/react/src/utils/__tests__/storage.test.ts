import {
  getRecords,
  saveRecords,
  getTodayRecord,
  incrementCount,
  updateRecord,
  getRecordByDate,
  DEFAULT_RECORDS,
  type Record,
} from '../storage';

describe('storage utility functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    jest.useRealTimers();
  });

  describe('getRecords', () => {
    it('should return empty array when no records are stored', () => {
      const records = getRecords();
      expect(records).toEqual([]);
    });

    it('should return stored records', () => {
      const testRecords: Record[] = [
        { date: '2024-01-01', poop: 3, pee: 5, milk: 4 },
      ];
      saveRecords(testRecords);
      const records = getRecords();
      expect(records).toEqual(testRecords);
    });
  });

  describe('saveRecords', () => {
    it('should save records to localStorage', () => {
      const testRecords: Record[] = [
        { date: '2024-01-01', poop: 2, pee: 3, milk: 4 },
      ];
      saveRecords(testRecords);
      const stored = JSON.parse(localStorage.getItem('babyRecords') || '[]');
      expect(stored).toEqual(testRecords);
    });
  });

  describe('getTodayRecord', () => {
    it('should return a record for today with initial values', () => {
      const today = new Date().toISOString().split('T')[0];
      const record = getTodayRecord();
      expect(record.date).toBe(today);
      expect(record.poop).toBe(0);
      expect(record.pee).toBe(0);
      expect(record.milk).toBe(0);
    });

    it('should return existing today record', () => {
      const today = new Date().toISOString().split('T')[0];
      const testRecord: Record = { date: today, poop: 3, pee: 2, milk: 1 };
      saveRecords([testRecord]);
      const record = getTodayRecord();
      expect(record).toEqual(testRecord);
    });
  });

  describe('incrementCount', () => {
    it('should increment poop count', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-06-27'));
      const record = incrementCount('poop');
      expect(record.poop).toBe(1);
      expect(record.pee).toBe(0);
      expect(record.milk).toBe(0);
    });

    it('should increment pee count', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-06-28'));
      const record = incrementCount('pee');
      expect(record.poop).toBe(0);
      expect(record.pee).toBe(1);
      expect(record.milk).toBe(0);
    });

    it('should increment milk count', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-06-29'));
      const record = incrementCount('milk');
      expect(record.poop).toBe(0);
      expect(record.pee).toBe(0);
      expect(record.milk).toBe(1);
    });

    it('should increment multiple counts', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-06-30'));
      incrementCount('poop');
      incrementCount('poop');
      incrementCount('pee');
      const record = getTodayRecord();
      expect(record.poop).toBe(2);
      expect(record.pee).toBe(1);
      expect(record.milk).toBe(0);
    });

    it('should persist incremented values', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-07-01'));
      localStorage.clear();
      incrementCount('poop');
      const records = getRecords();
      const todayRecord = records.find(r => r.date === '2024-07-01');
      expect(todayRecord).toBeDefined();
      expect(todayRecord?.poop).toBe(1);
    });
  });

  describe('updateRecord', () => {
    it('should create a new record if not exists', () => {
      const testDate = '2024-06-26';
      updateRecord(testDate, { poop: 2, pee: 3, milk: 1 });
      const record = getRecordByDate(testDate);
      expect(record).toEqual({
        date: testDate,
        poop: 2,
        pee: 3,
        milk: 1,
      });
    });

    it('should update existing record', () => {
      const testDate = '2024-06-26';
      const initialRecord: Record = {
        date: testDate,
        poop: 1,
        pee: 1,
        milk: 1,
      };
      saveRecords([initialRecord]);
      updateRecord(testDate, { poop: 5 });
      const record = getRecordByDate(testDate);
      expect(record?.poop).toBe(5);
      expect(record?.pee).toBe(1);
      expect(record?.milk).toBe(1);
    });
  });

  describe('getRecordByDate', () => {
    it('should return undefined if record does not exist', () => {
      const record = getRecordByDate('2024-01-01');
      expect(record).toBeUndefined();
    });

    it('should return record if it exists', () => {
      const testRecord: Record = {
        date: '2024-01-01',
        poop: 3,
        pee: 2,
        milk: 4,
      };
      saveRecords([testRecord]);
      const record = getRecordByDate('2024-01-01');
      expect(record).toEqual(testRecord);
    });
  });
});
