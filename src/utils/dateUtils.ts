export function getAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  
  if (months < 0) {
    return `${years - 1}歳 ${months + 12}ヶ月`;
  }
  return `${years}歳 ${months}ヶ月`;
}