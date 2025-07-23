'use client';

import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BiSolidCctv } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Camera {
  id: number;
  name: string;
  location: string;
}

interface Incident {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: Camera;
}

function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/incidents?resolved=false")
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      });
  }, []);

  const handleResolve = async (id: number) => {
    await fetch(`/api/incidents/${id}/resolve`, { method: "PATCH" });
    setIncidents((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div>Loading incidents...</div>;

  return (
    <div className="w-[40%] bg-[#191919] rounded-lg overflow-y-auto p-4 text-white shadow-md z-10">
      <div className="flex justify-between items-center mb-4 pb-2">
        <span className="flex items-center gap-2 font-semibold">
          <span className="text-red-500 bg-[#7F1D1D] rounded-full w-[24px] h-[24px] flex justify-center items-center border-2 border-[#450A0A]">
            <FiAlertTriangle className="text-red-500 w-[12px] h-[12px]" />
          </span> {incidents.length} Unresolved Incidents
        </span>
        <span className="flex items-center gap-1 bg-[#000000] border border-[#404040] rounded-full px-2 py-1 text-xs font-semibold">
          <IoCheckmarkDoneSharp className="text-green-400 text-sm" />
          Resolved incidents
        </span>
      </div>
      <div className="space-y-6">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="transition cursor-pointer flex justify-between items-center pr-3"
          >
            <div className="flex gap-2">
              <img src={incident.thumbnailUrl} alt="" className="w-31 h-18 object-cover rounded-lg" />
              <div className="flex flex-col justify-between h-18">
                <p className="text-xs font-medium flex items-center gap-1">
                  <FiAlertTriangle className="inline text-orange-400" />
                  {incident.type}
                </p>
                <div>
                  <p className="text-[10px] flex items-center gap-1"><BiSolidCctv /> {incident.camera.name}</p>
                  <p className="text-[10px] flex items-center gap-1"><FaRegClock />
                    {new Date(incident.tsStart).toLocaleTimeString()} - {new Date(incident.tsEnd).toLocaleTimeString()} on {new Date(incident.tsStart).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="text-yellow-400 text-xs my-auto"
              onClick={() => handleResolve(incident.id)}
            >
              Resolve <MdKeyboardArrowRight className="inline" />
            </button>
          </div>
        ))}
        {incidents.length === 0 && <div className="text-gray-400">No unresolved incidents 🎉</div>}
      </div>
    </div>
  );
}

export default IncidentList;