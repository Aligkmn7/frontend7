export interface LogEntry {
  id: number;
  date: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Internship {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  logs: LogEntry[];
}

// Bu fonksiyon, staj detaylarını alacaktır.
export const fetchInternshipById = async (id: number): Promise<Internship> => {
  const response = await fetch(`/api/internships/${id}`);
  if (!response.ok) {
    throw new Error('Staj verileri alınırken hata oluştu');
  }
  return response.json();
};
