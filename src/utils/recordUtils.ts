import { Record } from '../types';

export function sortRecordsByDate(records: Record[]): Record[] {
  return [...records].sort((a, b) => {
    // まずcreated_atで比較
    if (a.created_at && b.created_at) {
      const createdAtA = new Date(a.created_at).getTime();
      const createdAtB = new Date(b.created_at).getTime();
      if (createdAtA !== createdAtB) return createdAtB - createdAtA;
    }

    // created_atが同じ場合は日付で比較
    const dateA = new Date(a.date + 'T00:00:00Z').getTime();
    const dateB = new Date(b.date + 'T00:00:00Z').getTime();
    if (dateA !== dateB) return dateB - dateA;
    
    // 両方同じ場合はIDで比較
    // IDは必ず存在することを保証
    if (a.id && b.id) {
      return b.id.localeCompare(a.id);
    }
    
    return 0;
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
  if (!record.cat_id || !record.type || !record.date || record.value === undefined) {
    return false;
  }

  const date = new Date(record.date);
  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
}