export type LicenseType = 'Personal' | 'Commercial' | 'Exclusive';

export interface License {
  type: LicenseType;
  price: number;
  description: string;
}

export interface Beat {
  id: string;
  title: string;
  bpm: number;
  key: string;
  tags: string[];
  coverUrl: string;
  category: 'Loop' | 'Loop Pack';
  licenses: License[];
}

export interface CartItem {
  id: string;
  beat: Beat;
  license: License;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  taxWithheld: number;
  items: string;
  status: 'Completed' | 'Pending';
}

export interface ChartData {
  month: string;
  revenue: number;
  tax: number;
}
