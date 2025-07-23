import { Calendar } from "lucide-react";
import { RiRecordCircleLine } from "react-icons/ri";

function IncidentPlayer() {
  return (
    <div className="w-[60%] bg-[] rounded-lg overflow-hidden shadow-md z-10 relative">
      <img src="/cam_player.png" alt="" className="h-full w-full object-cover"/>

      <div>
        <span className="text-white bg-[#191919] rounded-lg px-2 py-1 absolute top-2 left-2 text-xs flex items-center gap-2"><Calendar className="w-3 h-3"/> 11/12/2027 - 3:12:37 </span>

        <span className="text-white bg-[#191919] rounded-lg px-2 py-[2px] absolute bottom-2 left-2 text-sm flex items-center gap-2"><RiRecordCircleLine className="text-red-500 animate-pulse"/> Camera 1 </span>

        <div className="absolute bottom-2 right-2 flex items-center gap-3">
          {/* First cam */}
          <div className="flex flex-col items-center bg-[#191919]">
            <div className="flex justify-between items-center w-full px-2 py-1">
              <span className="text-white text-xs">Header 1</span>
              <span className="text-white text-xs">⋮</span>
            </div>

             <img src="/cam_player.png" alt="img2" className="w-32 h-18 rounded" />
          </div>
          {/* Second scam */}
          <div className="flex flex-col items-center bg-[#191919]">
            <div className="flex justify-between items-center w-full px-2 py-1">
              <span className="text-white text-xs">Header 2</span>
              <span className="text-white text-xs">⋮</span>
            </div>

             <img src="/cam_player.png" alt="img2" className="w-32 h-18 rounded" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default IncidentPlayer;