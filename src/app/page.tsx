import IncidentList from "../components/home/incidentList";
import IncidentPlayer from "@/components/home/incidentPlayer";
import Timeline from "@/components/home/timeline";
import { IncidentProvider } from "@/components/contexts/IncidentContext";

export default function Home() {
  return (
    <IncidentProvider>
      <main className="min-h-screen bg-black p-4">
        <div className="flex gap-4 h-[70vh]">
          <IncidentPlayer />
          <IncidentList />
        </div>
        <div className="mt-4">
          <Timeline />
        </div>
      </main>
    </IncidentProvider>
  );
}
