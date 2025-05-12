import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Tabs, Tab } from "../components/ui/tabs";
import { InternDetail } from "../types/intern";
import { dummyInterns } from "../data/dummyData";

export default function CompanyInterns() {
  const [tabIndex, setTabIndex] = useState(0);
  const [interns, setInterns] = useState<InternDetail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter interns based on tab
    const filteredInterns = dummyInterns.filter((intern) => {
      if (tabIndex === 0) {
        // Active interns (not approved yet)
        return intern.status === "eksik raporu var" || intern.status === "eksik raporu yok";
      } else {
        // Completed interns (approved)
        return intern.status === "Onaylandı";
      }
    });
    setInterns(filteredInterns);
  }, [tabIndex]);

  return (
    <Card className="p-4 m-4">
      <h1 className="text-2xl font-bold mb-4">Stajyerler</h1>
      <Tabs value={tabIndex} onChange={setTabIndex}>
        <Tab label="Devam Eden" isActive={tabIndex === 0} onClick={() => {}} />
        <Tab label="Tamamlanan" isActive={tabIndex === 1} onClick={() => {}} />
      </Tabs>

      {interns.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {tabIndex === 0 ? "Devam eden stajyer bulunmamaktadır." : "Tamamlanan staj bulunmamaktadır."}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border border-gray-200">Ad</th>
                <th className="p-3 text-left border border-gray-200">Soyad</th>
                <th className="p-3 text-left border border-gray-200">Bölüm</th>
                <th className="p-3 text-left border border-gray-200">Üniversite</th>
                <th className="p-3 text-left border border-gray-200">Durum</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr
                  key={intern.id}
                  className="hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                  onClick={() => navigate(`/company/interns/${intern.id}`)}
                >
                  <td className="p-3 border border-gray-200">{intern.name}</td>
                  <td className="p-3 border border-gray-200">{intern.surname}</td>
                  <td className="p-3 border border-gray-200">{intern.department || "-"}</td>
                  <td className="p-3 border border-gray-200">{intern.university || "-"}</td>
                  <td className="p-3 border border-gray-200">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        intern.status === "Onaylandı" 
                          ? "bg-green-100 text-green-800" 
                          : intern.status === "eksik raporu var"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {intern.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}