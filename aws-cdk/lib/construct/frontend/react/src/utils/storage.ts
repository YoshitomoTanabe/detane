export interface Record {
  date: string;
  poop: number;
  pee: number;
  milk: number;
}

export const DEFAULT_RECORDS: Record[] = [];

export function getRecords(): Record[] {
  const stored = localStorage.getItem('babyRecords');
  return stored ? JSON.parse(stored) : DEFAULT_RECORDS;
}

export function saveRecords(records: Record[]): void {
  localStorage.setItem('babyRecords', JSON.stringify(records));
}

export function getTodayRecord(): Record {
  const today = new Date().toISOString().split('T')[0];
  const records = getRecords();
  const record = records.find(r => r.date === today);
  return record || { date: today, poop: 0, pee: 0, milk: 0 };
}

export function incrementCount(type: 'poop' | 'pee' | 'milk'): Record {
  const today = new Date().toISOString().split('T')[0];
  const records = getRecords();
  const existingIndex = records.findIndex(r => r.date === today);
  
  if (existingIndex >= 0) {
    records[existingIndex][type]++;
  } else {
    records.push({
      date: today,
      poop: type === 'poop' ? 1 : 0,
      pee: type === 'pee' ? 1 : 0,
      milk: type === 'milk' ? 1 : 0,
    });
  }
  
  saveRecords(records);
  return getTodayRecord();
}

export function updateRecord(date: string, updates: Partial<Record>): void {
  const records = getRecords();
  const index = records.findIndex(r => r.date === date);
  
  if (index >= 0) {
    records[index] = { ...records[index], ...updates };
  } else {
    records.push({ date, poop: 0, pee: 0, milk: 0, ...updates });
  }
  
  saveRecords(records);
}

export function getRecordByDate(date: string): Record | undefined {
  const records = getRecords();
  return records.find(r => r.date === date);
}
