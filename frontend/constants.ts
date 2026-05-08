import { Beat, Transaction, ChartData } from './types';

export const SAMPLE_LICENSES = [
  { type: 'Personal' as const, price: 2, description: 'Standard WAV loop. Non-profit use.' },
  { type: 'Commercial' as const, price: 15, description: 'WAV + Stems. For-profit use & placements.' }
];

export const PACK_LICENSES = [
  { type: 'Personal' as const, price: 10, description: 'Full kit (10+ loops). Non-profit use.' },
  { type: 'Commercial' as const, price: 40, description: 'Full kit + Stems. Royalty-free for indie releases.' }
];

export const MOCK_BEATS: Beat[] = [
  {
    id: 's1',
    title: 'Devil Ray Bounce',
    bpm: 142,
    key: 'C# Min',
    tags: ['Trap', 'Dark', 'Stem'],
    coverUrl: 'https://picsum.photos/seed/devilray/400/400',
    category: 'Loop',
    licenses: SAMPLE_LICENSES
  },
  {
    id: 's2',
    title: 'Tropicana Keys',
    bpm: 98,
    key: 'F Maj',
    tags: ['R&B', 'Smooth', 'Loop'],
    coverUrl: 'https://picsum.photos/seed/tropicana/400/400',
    category: 'Loop',
    licenses: SAMPLE_LICENSES
  },
  {
    id: 'p1',
    title: 'Mobile Money Vol. 1',
    bpm: 120,
    key: 'Various',
    tags: ['Bundle', 'Drill', 'Trap'],
    coverUrl: 'https://picsum.photos/seed/pack1/400/400',
    category: 'Loop Pack',
    licenses: PACK_LICENSES
  },
  {
    id: 's3',
    title: 'FL Studio Grime',
    bpm: 140,
    key: 'A Min',
    tags: ['Grime', 'Aggressive', 'Stem'],
    coverUrl: 'https://picsum.photos/seed/grime/400/400',
    category: 'Loop',
    licenses: SAMPLE_LICENSES
  },
  {
    id: 's4',
    title: '2017 Throwback',
    bpm: 130,
    key: 'D Min',
    tags: ['Vintage', 'Upbeat', 'Loop'],
    coverUrl: 'https://picsum.photos/seed/throwback/400/400',
    category: 'Loop',
    licenses: SAMPLE_LICENSES
  },
  {
    id: 'p2',
    title: 'Skimp Signature Sounds',
    bpm: 85,
    key: 'Various',
    tags: ['Bundle', 'Boom Bap', 'Soul'],
    coverUrl: 'https://picsum.photos/seed/skimp/400/400',
    category: 'Loop Pack',
    licenses: PACK_LICENSES
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'INV-001', date: '2023-10-24', amount: 15.00, taxWithheld: 4.50, items: 'Devil Ray Bounce (Commercial)', status: 'Completed' },
  { id: 'INV-002', date: '2023-10-22', amount: 2.00, taxWithheld: 0.60, items: 'Tropicana Keys (Personal)', status: 'Completed' },
  { id: 'INV-003', date: '2023-10-18', amount: 40.00, taxWithheld: 12.00, items: 'Mobile Money Vol. 1 (Commercial)', status: 'Completed' },
  { id: 'INV-004', date: '2023-10-15', amount: 4.00, taxWithheld: 1.20, items: 'FL Studio Grime (Personal) x2', status: 'Completed' },
];

export const MOCK_CHART_DATA: ChartData[] = [
  { month: 'May', revenue: 45, tax: 13.5 },
  { month: 'Jun', revenue: 80, tax: 24 },
  { month: 'Jul', revenue: 65, tax: 19.5 },
  { month: 'Aug', revenue: 120, tax: 36 },
  { month: 'Sep', revenue: 210, tax: 63 },
  { month: 'Oct', revenue: 340, tax: 102 },
];
