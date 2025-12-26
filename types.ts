
export enum BeltColor {
  WHITE = 'Branca',
  GREY_WHITE = 'Cinza/Branca',
  GREY = 'Cinza',
  GREY_BLACK = 'Cinza/Preta',
  YELLOW_WHITE = 'Amarela/Branca',
  YELLOW = 'Amarela',
  YELLOW_BLACK = 'Amarela/Preta',
  ORANGE_WHITE = 'Laranja/Branca',
  ORANGE = 'Laranja',
  ORANGE_BLACK = 'Laranja/Preta',
  GREEN_WHITE = 'Verde/Branca',
  GREEN = 'Verde',
  GREEN_BLACK = 'Verde/Preta',
  BLUE = 'Azul',
  PURPLE = 'Roxa',
  BROWN = 'Marrom',
  BLACK = 'Preta'
}

export type Stripes = 0 | 1 | 2 | 3 | 4;

export type UserRole = 'Administrador' | 'Professor' | 'Instrutor' | 'Monitor' | 'Aluno';

export type InstructorCategory = 'Monitor' | 'Instrutor' | 'Professor';

export type PlanType = 'Gratuito' | 'Premium' | 'Mensal' | 'Trimestral' | 'Anual';

export interface Subscription {
  plan: string;
  startDate: string;
  studentLimit: number;
  price: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  responsibleName?: string;
  responsiblePhone?: string;
  birthDate: string;
  belt: BeltColor;
  stripes: Stripes;
  status: 'Ativo' | 'Inativo';
  joinDate: string;
  notes: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: string;
  pixKey?: string;
  category: InstructorCategory;
  status: 'Ativo' | 'Pausado';
  joinDate: string;
  plan?: 'Gratuito' | 'Premium';
}

export interface AdminTask {
  id: string;
  title: string;
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  completed: boolean;
  dueDate: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Kimono' | 'Equipamento' | 'Suplemento' | 'Plano';
  sellerId: string;
  image: string;
  status?: 'Ativo' | 'Pausado';
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  role: string;
  content: string;
  timestamp: string;
}
