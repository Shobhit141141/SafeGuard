'use client';

import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BiSolidCctv } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useIncidents } from "@/components/contexts/IncidentContext";
import { Checkbox } from "../ui/checkbox";
function IncidentList() {
  const { incidents, selectedIncident, setSelectedIncident, loading, resolveIncident } = useIncidents();
  const [unresolvedIncidents, setUnresolvedIncidents] = useState<typeof incidents>([]);
  const [showUnresolved, setShowUnresolved] = useState(false);

  useEffect(() => {
    const unresolved = incidents.filter(incident => !incident.resolved);
    console.log("Unresolved incidents:", unresolved);
    setUnresolvedIncidents(unresolved);
  }, [incidents]);

  const handleResolve = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await resolveIncident(id);

    } catch (error) {
      console.error('Error resolving incident:', error);
    }
  };

  const handleIncidentSelect = (incident: typeof incidents[0]) => {
    setSelectedIncident(incident);
  };

  if (loading) return <div className="w-[40%] bg-[#191919] rounded-lg p-4 text-white flex items-center justify-center z-10"></div>;

  return (
    <div className="w-[40%] bg-[#191919] rounded-lg overflow-y-auto p-4 text-white shadow-md z-10">
      <div className="flex justify-between items-center mb-4 pb-2">
        <span className="flex items-center gap-2 font-semibold">
          <span className="text-red-500 bg-[#7F1D1D] rounded-full w-[24px] h-[24px] flex justify-center items-center border-2 border-[#450A0A]">
            <FiAlertTriangle className="text-red-500 w-[12px] h-[12px]" />
          </span> {unresolvedIncidents.length} Unresolved Incidents
        </span>
        <span className="flex items-center gap-1 bg-[#000000] border border-[#404040] rounded-full px-2 py-1 text-xs font-semibold">
          <IoCheckmarkDoneSharp className="text-green-400 text-sm" />
          {incidents.length - unresolvedIncidents.length}
          {' '}
          Resolved incidents
        </span>
      </div>

      {/* toggle to only show unresolved incidents */}
      <div className="flex items-center mb-4 gap-2">
        <Checkbox
          id="show-unresolved"
          checked={showUnresolved}
          onCheckedChange={() => setShowUnresolved(!showUnresolved)}
        />
        <label htmlFor="show-unresolved" className="text-sm">
          Show only unresolved incidents
        </label>
      </div>
      <div className="space-y-6">
        {(showUnresolved ? unresolvedIncidents : incidents).map((incident) => (
          <div
            key={incident.id}
            className={`transition cursor-pointer flex justify-between items-center pr-3 rounded-lg p-2 ${selectedIncident?.id === incident.id
                ? 'bg-[#2A2A2A] border border-yellow-500'
                : 'hover:bg-[#212121]'
              }`}
            onClick={() => {handleIncidentSelect(incident)}}
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
            {incident.resolved ? (
              <span className="text-green-400 text-xs my-auto flex items-center gap-1">
                <IoCheckmarkDoneSharp className="inline" /> Resolved
              </span>
            ) : (
              <button
                className="text-yellow-400 text-xs my-auto hover:text-yellow-500 cursor-pointer flex items-center transition-colors group "
                onClick={(e) => handleResolve(incident.id, e)}
              >
                Resolve
                <MdKeyboardArrowRight className="inline translate-y-0.5 transition-all duration-200 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        ))}
        {(showUnresolved ? unresolvedIncidents.length === 0 : incidents.length === 0) && (
          <div className="text-gray-400 flex justify-center items-center h-[50vh]">
            No incidents 🎉
          </div>
        )}
      </div>
    </div>

  );
}

export default IncidentList;