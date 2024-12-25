/**
 * 日付文字列を日本語のフォーマットに変換する
 * @param dateString - ISO形式の日付文字列 (例: "2024-03-05")
 * @returns フォーマットされた日付文字列 (例: "2024年3月5日")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (err) {
    console.error('Error formatting date:', err);
    return dateString; // フォーマットに失敗した場合は元の文字列を返す
  }
}

// 型定義のエクスポート
export type DateFormatter = (dateString: string) => string; 