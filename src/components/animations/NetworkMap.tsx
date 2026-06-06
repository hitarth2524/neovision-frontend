'use client';

const locations = [
  { id: 'usa', name: 'United States', x: 200, y: 150 },
  { id: 'brazil', name: 'Brazil', x: 310, y: 340 },
  { id: 'uk', name: 'United Kingdom', x: 470, y: 125 },
  { id: 'germany', name: 'Germany', x: 510, y: 130 },
  { id: 'uae', name: 'UAE', x: 620, y: 220 },
  { id: 'india', name: 'India', x: 700, y: 235 },
  { id: 'singapore', name: 'Singapore', x: 770, y: 285 },
  { id: 'japan', name: 'Japan', x: 860, y: 165 },
  { id: 'aus', name: 'Australia', x: 840, y: 375 },
];

const connections = [
  { from: 'usa', to: 'uk', delay: 0 },
  { from: 'usa', to: 'brazil', delay: 1.5 },
  { from: 'uk', to: 'germany', delay: 0.5 },
  { from: 'germany', to: 'uae', delay: 1 },
  { from: 'uae', to: 'india', delay: 1.5 },
  { from: 'india', to: 'singapore', delay: 2 },
  { from: 'singapore', to: 'aus', delay: 2.5 },
  { from: 'singapore', to: 'japan', delay: 3 },
  { from: 'uk', to: 'usa', delay: 2 }, // Return paths
  { from: 'singapore', to: 'uae', delay: 3.5 },
  { from: 'japan', to: 'usa', delay: 1 },
];

export default function NetworkMap() {
  return (
    <div className="relative w-full aspect-[2/1] min-h-[300px] mt-20 rounded-[2.5rem] overflow-hidden group border border-white/10 bg-[#060b13]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm">
      {/* Map Background Image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-cover sm:bg-contain opacity-[0.12] transition-opacity duration-700 group-hover:opacity-[0.25]"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
          filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg) brightness(0.8)"
        }}
      />
      
      {/* SVG Layer for Connections and Animations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {connections.map((conn, i) => {
          const fromLoc = locations.find(l => l.id === conn.from);
          const toLoc = locations.find(l => l.id === conn.to);
          if (!fromLoc || !toLoc) return null;
          
          const pathId = `path-${i}`;
          
          // Create an arc (quadratic bezier curve)
          const midX = (fromLoc.x + toLoc.x) / 2;
          const midY = (fromLoc.y + toLoc.y) / 2 - 40; // Curve upwards
          const d = `M ${fromLoc.x} ${fromLoc.y} Q ${midX} ${midY} ${toLoc.x} ${toLoc.y}`;

          return (
            <g key={i}>
              {/* Connection Path */}
              <path 
                id={pathId}
                d={d}
                fill="none"
                stroke="url(#lineGrad)" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                className="opacity-30 group-hover:opacity-70 transition-opacity duration-700"
              />
              
              {/* Moving Particle */}
              <circle r="4" fill="#60e0cc" filter="url(#glow)">
                <animateMotion 
                  dur="4s" 
                  repeatCount="indefinite" 
                  begin={`${conn.delay}s`}
                  calcMode="linear"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
        
        {/* Nodes (drawn in SVG so they perfectly scale with the map) */}
        {locations.map((loc, i) => (
          <g key={loc.id} transform={`translate(${loc.x}, ${loc.y})`}>
            {/* Pulsing Aura */}
            <circle r="16" fill="#60e0cc" opacity="0">
              <animate attributeName="r" values="4; 20; 4" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5; 0; 0" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            {/* Solid Center */}
            <circle r="4.5" fill="#60e0cc" stroke="#060b13" strokeWidth="1.5" filter="url(#glow)" />
          </g>
        ))}
      </svg>
      
      {/* HTML Labels for interactivity and sharp text */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
         {/* Wrapper to match viewBox scaling */}
         <div className="relative w-full h-full max-w-full max-h-full aspect-[2/1] mx-auto">
            {locations.map((loc) => (
              <div 
                key={loc.id}
                className="absolute transform -translate-x-1/2 -translate-y-[120%] pointer-events-auto cursor-pointer z-20 group/label"
                style={{ top: `${(loc.y / 500) * 100}%`, left: `${(loc.x / 1000) * 100}%` }}
              >
                <div className="whitespace-nowrap bg-[#0a1118]/80 backdrop-blur-md border border-cyan-500/30 text-cyan-50 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded shadow-[0_4px_15px_rgba(0,0,0,0.5)] group-hover/label:bg-cyan-500 group-hover/label:text-[#0a1118] transition-colors duration-300">
                  {loc.name}
                </div>
                {/* Connecting stem line */}
                <div className="w-px h-3 bg-cyan-500/50 mx-auto mt-0.5 group-hover/label:bg-cyan-500 transition-colors duration-300"></div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
