import { Record } from '../types';

export function sortRecordsByDate(records: Record[]): Record[] {
  return [...records].sort((a, b) => {
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    
    // 同じ日付の場合はIDで比較（新しいものが先）
    return (b.id || '').localeCompare(a.id || '');
  });
}

export function filterRecordsByType(records: Record[], type: Record['type']): Record[] {
  return records.filter(record => record.type === type);
}

export function getLatestRecordByType(records: Record[], type: Record['type']): Record | null {
  const typeRecords = filterRecordsByType(records, type);
  return sortRecordsByDate(typeRecords)[0] || null;
}

export function validateRecord(record: Partial<Record>): boolean {
  if (!record.catId || !record.type || !record.date || record.value === undefined) {
    return false;
  }

  const date = new Date(record.date);
  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
}