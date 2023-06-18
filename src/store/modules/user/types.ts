export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id: number;
  username?: string;
  avatar?: string;
  birthdayAt?: string;
  createdAt?: string;
  email?: string;
  firstLoginAt?: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
  phone?: string;
  phoneArea?: string;
  realUsername?: string;
  sex?: number;
  status?: number;
  role: RoleType;
}
