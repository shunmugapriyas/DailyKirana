import type { CategoryKey } from '../types/expense';

export type Category = {
  key: CategoryKey;
  color: string;
  icon: string;
  labels: {
    ta: string;
    en: string;
  };
};

export const categories: Category[] = [
  { key: 'food', color: '#E97864', icon: '🍲', labels: { ta: 'உணவு', en: 'Food' } },
  { key: 'rent', color: '#7F6EDB', icon: '🏠', labels: { ta: 'வாடகை', en: 'Rent' } },
  { key: 'travel', color: '#4D9BD8', icon: '🚌', labels: { ta: 'பயணம்', en: 'Travel' } },
  { key: 'beauty', color: '#D95E9F', icon: '💄', labels: { ta: 'அழகு', en: 'Beauty' } },
  { key: 'medical', color: '#46A878', icon: '💊', labels: { ta: 'மருத்துவம்', en: 'Medical' } },
  { key: 'kids', color: '#F2A541', icon: '🧒', labels: { ta: 'குழந்தைகள்', en: 'Kids' } },
  { key: 'groceries', color: '#5C9F55', icon: '🛒', labels: { ta: 'மளிகை', en: 'Groceries' } },
  { key: 'goldSavings', color: '#C9952C', icon: '🪙', labels: { ta: 'தங்க சேமிப்பு', en: 'Gold Savings' } },
  { key: 'chitFund', color: '#B469B8', icon: '📒', labels: { ta: 'சீட்டு', en: 'Chit Fund' } },
  { key: 'sip', color: '#3E8B8E', icon: '📈', labels: { ta: 'SIP', en: 'SIP' } },
  { key: 'other', color: '#8A817C', icon: '•', labels: { ta: 'மற்றவை', en: 'Other' } },
];

export function getCategory(key: CategoryKey) {
  return categories.find((category) => category.key === key) ?? categories[categories.length - 1];
}
