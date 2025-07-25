'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

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

interface IncidentContextType {
  incidents: Incident[];
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  refreshIncidents: () => void;
  resolveIncident: (id: number) => Promise<void>;
  loading: boolean;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (context === undefined) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};

interface IncidentProviderProps {
  children: ReactNode;
}

export const IncidentProvider: React.FC<IncidentProviderProps> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshIncidents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/incidents');
      const data = await response.json();
      setIncidents(data);
      if (data.length > 0 && !selectedIncident) {
        setSelectedIncident(data[0]);
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  const resolveIncident = async (id: number) => {
    try {
      const response = await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' });
      if (response.ok) {
        setIncidents(prevIncidents =>
          prevIncidents.map(incident =>
            incident.id === id
              ? { ...incident, resolved: true }
              : incident
          )
        );

        if (selectedIncident?.id === id) {
          setSelectedIncident(prev => prev ? { ...prev, resolved: true } : null);
        }
        toast.success("Incident resolved successfully");



      } else {
        throw new Error('Failed to resolve incident');
      }
    } catch (error) {
      toast.error("Error resolving incident");
      console.error('Error resolving incident:', error);
    }
  }

  useEffect(() => {
    refreshIncidents();
  }, []);

  const value: IncidentContextType = {
    incidents,
    selectedIncident,
    setSelectedIncident,
    refreshIncidents,
    resolveIncident,
    loading,
  };

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
};
