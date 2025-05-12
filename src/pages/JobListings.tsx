import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';

const JobListings: React.FC = () => {
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const { jobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredListings = jobs.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || listing.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const locations = ['all', ...Array.from(new Set(jobs.map(listing => listing.location)))];

  return (
    <Card className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staj İlanları</h1>
        <div className="space-x-2">
          {userRole === 'company' && (
            <Button 
              onClick={() => navigate("/company/post-job")}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Yeni İlan Ekle
            </Button>
          )}
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="İlan ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-48">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Şehirler</option>
            {locations.filter(loc => loc !== 'all').map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* İlan Listesi */}
      <div className="space-y-4">
        {filteredListings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Arama kriterlerinize uygun ilan bulunamadı.
          </div>
        ) : (
          filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{listing.title}</h3>
                  <p className="text-gray-600">{listing.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  listing.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {listing.status === 'active' ? 'Aktif' : 'Kapalı'}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{listing.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Gereksinimler:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {listing.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Detaylar:</h4>
                  <div className="space-y-1 text-gray-700">
                    <p><span className="font-medium">Konum:</span> {listing.location}</p>
                    <p><span className="font-medium">Başlangıç:</span> {listing.startDate}</p>
                    <p><span className="font-medium">Bitiş:</span> {listing.endDate}</p>
                    <p><span className="font-medium">Son Başvuru:</span> {listing.applicationDeadline}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => navigate(`/job-listings/${listing.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Detayları Gör
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default JobListings; 