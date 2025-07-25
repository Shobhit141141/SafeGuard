import { Lock, Shield, Signal, Zap, Layers } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section className="min-h-screen bg-black text-white p-8 relative overflow-hidden">

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

        <h2 className="text-4xl md:text-5xl font-light">
          <span className="font-semibold">MandlacX</span> Over<br />
          <span className="font-semibold">Cloud–Only</span> Video Analytics
        </h2>

        <FeatureCard
          icon={<Lock className="text-yellow-400" />}
          title="On–Device Security"
          description="Your data stays local. No cloud storage means no data breaches, just peace of mind."
        />


        {/* Other Cards */}
        <FeatureCard
          icon={<Shield className="text-yellow-400" />}
          title="Bullet–Proof Weapon Detection"
          description="MandlacX is trained to detect firearms, knives, and other sharp threats with precision—no internet required."
        />

        <FeatureCard
          icon={<Signal className="text-yellow-400" />}
          title="Bandwidth You Can Actually Afford"
          description="No continuous streaming. No heavy uploads. Just efficient edge computing that saves your network and your budget."
        />


        <div className="md:col-span-2 lg:col-span-1 flex justify-center items-center z-20">
          <img src="/model.png" alt="MandlacX Device" className='scale-[1.4] object-contain' />
        </div>

        <FeatureCard
          icon={<Layers className="text-yellow-400" />}
          title="Future–Proof AI Stack"
          description="With modular AI models and local firmware updates, MandlacX is built to evolve with your needs—no dependency on cloud upgrades."
        />


        <div>

        </div>

        <FeatureCard
          icon={<Zap className="text-yellow-400" />}
          title="Latency That Saves Seconds—and Lives"
          description="Instant on–device processing means faster alerts and quicker interventions during critical moments."
        />
        {/* Footer Text */}
        <div className="mt-12 text-3xl italic text-white flex justify-start items-center flex-col ">
          <span className="text-gray-400">Built for Speed.</span>
          Designed for <span className="font-semibold">Action.</span>
        </div>
      </div>

    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border border-white/10 rounded-xl p-6 bg-black/60 backdrop-blur-sm z-10 h-[200px]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}
