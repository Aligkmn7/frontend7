export interface InternDetail {
  id: string;
  name: string;
  surname: string;
  status: 'Onaylandı' | 'Onaylanmadı' | 'eksik raporu var' | 'eksik raporu yok';
  email?: string;
  phone?: string;
  university?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  company?: string;
  mentor?: string;
  internshipType?: string;
  evaluation?: {
    approved: boolean;
    description: string;
  };
} 