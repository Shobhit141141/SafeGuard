'use client';

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { RiRecordCircleLine } from "react-icons/ri";
import { useIncidents } from "@/components/contexts/IncidentContext";

interface Camera {
  id: number;
  name: string;
  location: string;
}

function IncidentPlayer() {
  const { incidents, selectedIncident, loading } = useIncidents();
  const [allCameras, setAllCameras] = useState<Camera[]>([]);

  useEffect(() => {
    if (incidents.length > 0) {

      const cameras = Array.from(new Set(incidents.map(incident => incident.camera.id)))
        .map(id => incidents.find(incident => incident.camera.id === id)?.camera)
        .filter(Boolean) as Camera[];
      setAllCameras(cameras);
    }
  }, [incidents]);

  if (loading || !selectedIncident) {
    return (
      <div className="w-[60%] bg-[#191919] rounded-lg flex items-center justify-center shadow-md z-10">

      </div>
    );
  }

  return (
    <div className="w-[60%] bg-[] rounded-lg overflow-hidden shadow-md z-10 relative">
      <img src={selectedIncident.thumbnailUrl} alt="" className="h-full w-full object-cover" />

      <div>
        <span className="text-white bg-[#191919] rounded-lg px-2 py-1 absolute top-2 left-2 text-xs flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          {new Date(selectedIncident.tsStart).toLocaleDateString()} - {new Date(selectedIncident.tsStart).toLocaleTimeString()}
        </span>

        <div className="absolute top-2 right-2">
          <span className={`text-white rounded-lg px-2 py-1 text-xs font-semibold ${selectedIncident.type === 'Gun Threat' ? 'bg-red-600' :
            selectedIncident.type === 'Face Recognised' ? 'bg-blue-600' :
              'bg-orange-600'
            }`}>
            {selectedIncident.type}
          </span>
        </div>

        <span className="text-white bg-[#191919] rounded-lg px-2 py-[2px] absolute bottom-2 left-2 text-sm flex items-center gap-2">
          <RiRecordCircleLine className="text-red-500 animate-pulse" />
          {selectedIncident.camera.name}
        </span>

        <div className="absolute bottom-2 right-2 flex items-center gap-3">
          {allCameras.slice(0, 2).map((camera, index) => (
            <div key={camera.id} className="flex flex-col items-center bg-[#191919] rounded">
              <div className="flex justify-between items-center w-full px-2 py-1">
                <span className="text-white text-xs">{camera.name}</span>
                <span className="text-white text-xs">⋮</span>
              </div>
              <img src="/cam_player.png" alt={`Camera ${camera.name}`} className="w-32 h-18 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IncidentPlayer;