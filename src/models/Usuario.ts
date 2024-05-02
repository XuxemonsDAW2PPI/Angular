export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  usertype: string;
  tag: string;
  isFriend: boolean;
  status?: 'pending' | 'accepted' | 'denied';
}
