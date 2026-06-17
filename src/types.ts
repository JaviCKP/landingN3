export interface Message {
  id: string;
  sender: 'client' | 'ai';
  text: string;
  time: string;
  status?: 'sent' | 'read' | 'booked';
}

export interface CalculatorState {
  leads: number;
  minutesPerLead: number;
  avgCommission: number;
}

export interface CaseStudyPreset {
  id: string;
  title: string;
  time: string;
  clientMessage: string;
  aiResponse: string;
  badge: string;
}
