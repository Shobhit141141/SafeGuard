import React from 'react';
import FeatureModel from "./featureModel";
import FeatureSection from "./feature";

export default function ModelPage() {
  return (
    <div className=" relative bg-black p-4 w-full overflow-hidden">
      {/* Blurred blob */}
      <div className="absolute z-20 top-[500px] -right-36 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[125px] bg-yellow-400 blur-[120px] rounded-full pointer-events-none" />


      <div className="absolute z-20 top-[1000px] left-0 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[125px] bg-yellow-400 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute z-20 top-[1500px] -right-36 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[125px] bg-yellow-400 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute z-20 top-[1800px] left-0 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[125px] bg-yellow-400 blur-[120px] rounded-full pointer-events-none" />



      <FeatureModel />

      <FeatureSection />
    </div>
  );
}
