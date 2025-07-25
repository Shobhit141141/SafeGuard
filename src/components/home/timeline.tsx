'use client';
import { CctvIcon } from 'lucide-react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useIncidents } from '../contexts/IncidentContext';

interface Camera {
  id: number;
  name: string;
  location: string;
}

interface ApiIncident {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: Camera;
}

interface Incident {
  time: number;
  type: string;
  label: string;
  color: string;
  originalData: ApiIncident;
}

const Timeline: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(13.5);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const timelineRef = useRef<SVGSVGElement | null>(null);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);



  const { incidents: apiIncidents, setSelectedIncident, loading } = useIncidents();

  useEffect(() => {
    if (!apiIncidents) return;


    const timelineIncidents = apiIncidents.map((incident: ApiIncident) => {
      const startTime = new Date(incident.tsStart);
      const timeInHours = startTime.getHours() + startTime.getMinutes() / 60;


      let color = '#ef4444';
      if (incident.type === 'Face Recognised') color = '#3b82f6';
      else if (incident.type === 'Gun Threat') color = '#dc2626';
      else if (incident.type === 'Unauthorised Access') color = '#ef4444';

      return {
        time: timeInHours,
        type: incident.type.toLowerCase().replace(' ', '_'),
        label: incident.type,
        color,
        originalData: incident
      };
    });

    setIncidents(timelineIncidents);


    const uniqueCameras = Array.from(new Set(apiIncidents.map((incident: ApiIncident) => incident.camera.id)))
      .map(id => apiIncidents.find((incident: ApiIncident) => incident.camera.id === id)?.camera)
      .filter(Boolean) as Camera[];
    setCameras(uniqueCameras);
  }, [apiIncidents]);

  const timelineWidth = 1600;
  const timelineHeight = 160;
  const hourMarkers = Array.from({ length: 25 }, (_, i) => i);

  const timeToPixel = (time: number): number => (time / 24) * timelineWidth;
  const pixelToTime = useCallback((pixel: number): number => (pixel / timelineWidth) * 24, [timelineWidth]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const filteredIncidents = incidents;

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, timelineWidth));
    const newTime = pixelToTime(x);

    const snapRange = 0.5;
    const nearbyIncident = filteredIncidents.find((incident) => Math.abs(incident.time - newTime) < snapRange);
    setCurrentTime(nearbyIncident ? nearbyIncident.time : newTime);
  }, [isDragging, timelineWidth, pixelToTime, filteredIncidents]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = pixelToTime(x);

    const snapRange = 1;
    const nearbyIncident = filteredIncidents.find((incident) => Math.abs(incident.time - newTime) < snapRange);
    setCurrentTime(nearbyIncident ? nearbyIncident.time : newTime);
  };

  const handleForward = () => setCurrentTime((prev) => Math.min(prev + 10 / 60, 24));
  const handleBackward = () => setCurrentTime((prev) => Math.max(prev - 10 / 60, 0));
  const togglePlay = () => setIsPlaying((prev) => !prev);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev + 0.1 > 24 ? 0 : prev + 0.1));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if(loading || !apiIncidents) {
    return (
      <div className="w-full py-2 h-[30vh] bg-[#191919] rounded-lg z-10">
        
      </div>
    );
  }
  return (
    <div className='w-full py-2 h-[30vh]'>
      {/* main div */}
      <div className=" bg-[#191919] text-white rounded-lg p-4 h-full overflow-hidden flex flex-col justify-between">
        <div className=''>
          <span className="flex gap-2 items-center">
            <button onClick={handleBackward} className="flex items-center gap-1 px-3 py-1 rounded text-sm"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 2.99998L8 1.33331C4.318 1.33331 1.33334 4.31798 1.33334 7.99998C1.33334 11.682 4.318 14.6666 8 14.6666C11.682 14.6666 14.6667 11.682 14.6667 7.99998C14.6667 5.26665 13.0213 2.91665 10.6667 1.88798" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
              <path d="M5 6.99996L6.66667 5.66663V10.3333" stroke="white" strokeLinecap="round" stroke-linejoin="round" />
              <path d="M8.33334 9.16663V6.83329C8.33334 6.52387 8.45625 6.22713 8.67504 6.00833C8.89384 5.78954 9.19058 5.66663 9.5 5.66663C9.80942 5.66663 10.1062 5.78954 10.325 6.00833C10.5438 6.22713 10.6667 6.52387 10.6667 6.83329V9.16663C10.6667 9.47605 10.5438 9.77279 10.325 9.99158C10.1062 10.2104 9.80942 10.3333 9.5 10.3333C9.19058 10.3333 8.89384 10.2104 8.67504 9.99158C8.45625 9.77279 8.33334 9.47605 8.33334 9.16663Z" stroke="white" strokeLinecap="round" />
            </svg>
              10s
            </button>
            <button
              onClick={togglePlay}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <FaPause className="w-2 h-2 text-black" />
              ) : (
                <FaPlay className="w-2 h-2 text-black" />
              )}
            </button>
            <button onClick={handleForward} className="flex items-center gap-1 px-3 py-1 rounded text-sm">10s <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3333 4.99998L10 3.33331C13.682 3.33331 16.6667 6.31798 16.6667 9.99998C16.6667 13.682 13.682 16.6666 10 16.6666C6.318 16.6666 3.33333 13.682 3.33333 9.99998C3.33333 7.26665 4.97866 4.91665 7.33333 3.88798" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7 8.99996L8.66667 7.66663V12.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.3333 11.1666V8.83329C10.3333 8.52387 10.4562 8.22713 10.675 8.00833C10.8938 7.78954 11.1906 7.66663 11.5 7.66663C11.8094 7.66663 12.1062 7.78954 12.325 8.00833C12.5437 8.22713 12.6667 8.52387 12.6667 8.83329V11.1666C12.6667 11.476 12.5437 11.7728 12.325 11.9916C12.1062 12.2104 11.8094 12.3333 11.5 12.3333C11.1906 12.3333 10.8938 12.2104 10.675 11.9916C10.4562 11.7728 10.3333 11.476 10.3333 11.1666Z" stroke="white" stroke-linecap="round" />
            </svg>
            </button>
            <p className="text-sm text-gray-300">
              <span>{formatTime(currentTime)} • {new Date().toLocaleDateString()}</span>
            </p>


            {(() => {
              const currentIncident = filteredIncidents.find((i) => Math.abs(i.time - currentTime) < 0.1);
              if (currentIncident) {
                setSelectedIncident(currentIncident.originalData);
              }
              return currentIncident && (
                <div className="">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentIncident.color }}></div>
                    <span className="font-semibold text-md" style={{ color: currentIncident.color }}>{currentIncident.label}</span>
                    <span className="text-gray-400 text-sm">at {formatTime(currentIncident.time)} - {currentIncident.originalData.camera.name}</span>
                  </div>
                </div>
              );
            })()}
          </span>
          {/* Incident Details */}
        </div>
        <div className='flex items-center justify-between gap-4'>
          {/* Camera List */}
          <div className="flex flex-col h-full justify-between py-2">
            <p className='text-md'>Camera list</p>
            {/* <button
              key="all"
              className={` py-1 rounded w-36  flex items-center gap-2 text-sm`}
              
            >
              <CctvIcon className='w-5 h-5' /> All Cameras
            </button> */}
            {cameras.map((camera) => (
              <button
                key={camera.id}
                className={`rounded w-36  flex items-center gap-2 text-sm`}

              >
                <CctvIcon className='w-5 h-5' /> {camera.name}
              </button>
            ))}
          </div>
          {/* Timeline */}
          <div className='overflow-x-auto h-full'>


            {/* Scrollable timeline */}
            <div className=" rounded w-full h-full" ref={scrollWrapperRef}>
              <svg
                ref={timelineRef}
                width={timelineWidth}
                height={timelineHeight}
                onClick={handleTimelineClick}
              >
                <rect width={timelineWidth} height={timelineHeight} fill="transparent" />
                {hourMarkers.map((hour) => (
                  <g key={hour}>
                    {Array.from({ length: 6 }, (_, i) => {
                      const x = timeToPixel(hour + i / 6);
                      return (
                        <line
                          key={i}
                          x1={x}
                          y1={0}
                          x2={x}
                          y2={i === 5 ? 18 : 10}
                          stroke="#6b7280"
                          strokeWidth={i === 5 ? 2 : 1}
                        />
                      );
                    })}
                    <text
                      x={timeToPixel(hour + 5 / 6)}
                      y={30}
                      fill="#9ca3af"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {hour.toString().padStart(2, '0')}:00
                    </text>
                  </g>
                ))}
                {/* Incident Badges */}
                {filteredIncidents.map((incident, index) => {
                  const x = timeToPixel(incident.time);
                  const badgeWidth = 120;
                  const badgeHeight = 20;

                  const cameraOrder = cameras.map((c) => c.name);
                  const cameraIndex =
                    cameraOrder.indexOf(incident.originalData.camera.name);
                  const badgeSpacing = 40;
                  const y =
                    50 + cameraIndex * badgeSpacing


                  return (
                    <g
                      key={`${incident.originalData.id}-${index}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentTime(incident.time);
                        setSelectedIncident(incident.originalData);
                        scrollWrapperRef.current?.scrollTo({
                          left: x - 100,
                          behavior: 'smooth'
                        });
                      }}
                      className="cursor-pointer bg-red-500"
                    >
                      {/* Badge background */}
                      <rect
                        x={x - badgeWidth / 2}
                        y={y}
                        width={badgeWidth}
                        height={badgeHeight}
                        rx={10}
                        fill={incident.color}
                        opacity={0.9}
                        stroke="#ffffff"
                        strokeWidth={1}
                      />

                      {/* Badge text */}
                      <text
                        x={x}
                        y={y + badgeHeight / 2 + 3}
                        fill="#ffffff"
                        fontSize="9"
                        textAnchor="middle"
                        className="select-none font-medium"
                      >
                        {incident.label}
                      </text>


                    </g>
                  );
                })}
                {/* Scrubber */}
                <g
                  transform={`translate(${timeToPixel(currentTime)}, 0)`}
                  onMouseDown={handleMouseDown}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  <rect x={-8} y={0} width={16} height={timelineHeight} fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" strokeWidth={2} />
                  <polygon points="-6,0 6,0 8,8 -8,8" fill="#fbbf24" />
                  <polygon
                    points={`-6,${timelineHeight} 6,${timelineHeight} 8,${timelineHeight - 8} -8,${timelineHeight - 8}`}
                    fill="#fbbf24"
                  />
                </g>
              </svg>
            </div>
            {/* Legend */}
            {/* <div className="mt-4 flex flex-wrap gap-4 text-xs">
              {[
                ['#ef4444', 'Unauthorised Access'],
                ['#3b82f6', 'Face Recognised'],
                ['#10b981', 'Traffic Congestion'],
                ['#dc2626', 'Gun Threat'],
                ['#8b5cf6', 'Multiple Events']
              ].map(([color, label], idx) => (
                <div className="flex items-center gap-2" key={idx}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                  <span>{label}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Timeline;
