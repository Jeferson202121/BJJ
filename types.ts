
export type Role = 'ADM' | 'PROFESSOR' | 'ALUNO';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: Role;
  status: 'active' | 'paused' | 'debt';
  teacherId?: string;
  belt?: string;
  paymentStatus: 'paid' | 'unpaid';
  monthlyFee?: number; // Valor da mensalidade do aluno
  dueDate?: number;
  lastAiAudit?: string;
  isVerified?: boolean;
  purchasedUpgrades?: string[]; // IDs dos upgrades comprados
  observations?: string; // Notas administrativas
}

export interface Teacher extends User {
  studentCount: number;
  paymentInstructions?: string; // Meios de recebimento do professor
  pixKey?: string; // Chave PIX principal
  plan: 'free' | 'premium';
  planStartDate: number;
  pendingPlanUpgrade?: boolean; // Nova flag para solicitações pendentes
  gatewayConfig?: {
    type: 'manual' | 'stripe' | 'paypal' | 'mercadopago';
    status: 'connected' | 'disconnected';
    apiKey?: string;
    webhookUrl?: string;
  };
}

export interface Announcement {
  id: string;
  teacherId: string;
  content: string;
  timestamp: number;
  authorName: string;
}
