import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  // Mock veriler
  const internships = [
    {
      id: 1,
      name: "Staj 1",
      startDate: "2025-06-01",
      endDate: "2025-09-01",
    },
    {
      id: 2,
      name: "Staj 2",
      startDate: "2025-07-01",
      endDate: "2025-10-01",
    },
  ];

  return (
    <div>
      <h2>Stajlarım</h2>
      <button>
        <Link to="/apply-new-internship">Yeni Staj Başvurusu</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>Staj Adı</th>
            <th>Başlangıç Tarihi</th>
            <th>Bitiş Tarihi</th>
            <th>Detay</th>
          </tr>
        </thead>
        <tbody>
          {internships.map((internship) => (
            <tr key={internship.id}>
              <td>{internship.name}</td>
              <td>{internship.startDate}</td>
              <td>{internship.endDate}</td>
              <td>
                <Link to={`/student/internships/${internship.id}`}>Detay</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
