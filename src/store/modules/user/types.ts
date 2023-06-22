export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  id: number;
  username?: string;
  avatar?: string;
  birthday_at?: string;
  created_at?: string;
  email?: string;
  first_login_at?: string;
  last_login_at?: string;
  last_login_ip?: string;
  phone?: string;
  phone_area?: string;
  real_username?: string;
  sex?: number;
  status?: number;
  role: RoleType;
}
