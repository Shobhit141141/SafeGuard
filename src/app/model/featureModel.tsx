import Scene from "@/components/home/3dmodel";

export default function FeatureModel() {
  return (
    <section className="relative bg-black text-white py-16 px-6 overflow-hidden">
      {/* Header */}
      <p className="text-sm text-yellow-400 text-center mb-2">
        THE FUTURE OF ON-SITE AI SURVEILLANCE
      </p>
      <h2 className="text-4xl md:text-5xl font-light text-center mb-4">
        <span className="font-semibold">MandlacX Edge</span>{" "}
        <span className="italic">Processor</span>
      </h2>

      {/* Grid */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Top-left box */}
        <div className="md:col-span-1 flex flex-col gap-4 md:gap-40 justify-start items-start">
          <FeatureBox
            title="MandlacX Edge Processor"
            points={[
              "A multi-domain, first-generation AI-powered device designed for real-time threat detection.",
            ]}
          />

          <FeatureBox
            title="Real-Time Threat Detection"
            points={[
              "Intrusions",
              "Firearms & Sharp Objects",
              "Human Falls",
              "Unusual or Aggressive Motion",
            ]}
          />
        </div>

        <Scene />

        {/* Top-right box */}
        <div className="md:col-span-1 flex flex-col gap-4 md:gap-40 justify-start items-start">
          <FeatureBox
            title="Key Specifications"
            points={[
              "USB 3.0 Support",
              "16 GB RAM",
              "A7 Cortex Processor",
              "Three multi-axis surveillance lenses",
            ]}
          />
          <FeatureBox
            title="On-Device Intelligence"
            points={[
              "Engineered to deliver intelligent surveillance without relying on the cloud. It gives you control, speed, and reliability right where you need it.",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureBox({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="border border-white/10 p-5 rounded-xl bg-black/60 backdrop-blur-sm w-[350]">
      <h3 className="text-lg font-semibold mb-2 border-r-4 pl-2 border-yellow-400 ">
        {title}
      </h3>
      <ul className="list-disc ml-5 text-sm text-gray-300 space-y-1">
        {points.map((point, idx) => (
          <li key={idx} className="
          marker:text-yellow-400 text-wrap
          ">{point}</li>
        ))}
      </ul>
    </div>
  );
}
