import { Record } from '../types';

export function formatRecord(record: Record | null): string {
  if (!record) return '記録なし';

  const date = new Date(record.date).toLocaleDateString('ja-JP');
  
  if (record.type === 'activity') {
    const activityLabels: { [key: string]: string } = {
      very_active: 'とても活発',
      active: '活発',
      normal: '普通',
      low: 'おとなしい',
      inactive: 'ほとんど動かない'
    };
    return `${activityLabels[record.value as string]} (${date})`;
  }

  return `${record.value}${record.unit || ''} (${date})`;
}