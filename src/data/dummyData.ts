import { InternDetail } from '../types/intern';

export const dummyInternDetail: InternDetail = {
  id: "1",
  name: "John",
  surname: "Doe",
  status: "eksik raporu yok",
  email: "john.doe@example.com",
  university: "ABC Üniversitesi",
  department: "Bilgisayar Mühendisliği",
  startDate: "2024-01-01",
  endDate: "2024-03-01"
};

export const dummyInterns: InternDetail[] = [
  {
    id: "1",
    name: "John",
    surname: "Doe",
    status: "eksik raporu yok",
    university: "ABC Üniversitesi",
    department: "Bilgisayar Mühendisliği"
  },
  {
    id: "2",
    name: "Jane",
    surname: "Smith",
    status: "Onaylandı",
    university: "XYZ Üniversitesi",
    department: "Yazılım Mühendisliği",
    evaluation: {
      approved: true,
      description: "Çok başarılı bir staj dönemi geçirdi."
    }
  },
  {
    id: "3",
    name: "Ahmet",
    surname: "Yılmaz",
    status: "eksik raporu var",
    university: "DEF Üniversitesi",
    department: "Elektrik-Elektronik Mühendisliği"
  }
]; 