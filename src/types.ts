export interface Message {
  id: string;
  sender: 'client' | 'ai';
  text: string;
  time: string;
  status?: 'sent' | 'read' | 'booked';
}

export interface CalculatorState {
  weeklyLeads: number;
  avgPropertyPrice: number;
  commissionPercent: number;
  responseTimeKey: 'menos5' | 'hasta1h' | 'de2a4h' | 'finde';
}

export interface CaseStudyPreset {
  id: string;
  title: string;
  time: string;
  clientMessage: string;
  aiResponse: string;
  badge: string;
}
