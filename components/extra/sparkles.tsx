import { Sparkles } from "lucide-react";
import React from "react";

const SparklesComp = () => {
  return (
    <div>
      <div className="absolute inset-0 pointer-events-none z-0">
        {[
          { top: "20%", left: "10%", size: 8, delay: "0s" },
          { top: "30%", right: "15%", size: 6, delay: "0.5s" },
          { bottom: "25%", left: "20%", size: 7, delay: "1s" },
          { bottom: "20%", right: "10%", size: 6, delay: "1.5s" },
          { top: "15%", right: "25%", size: 5, delay: "2s" },
          { top: "50%", left: "50%", size: 9, delay: "0.3s" },
          { bottom: "40%", left: "60%", size: 6, delay: "2.2s" },
          { top: "35%", left: "70%", size: 7, delay: "0.8s" },
          { bottom: "10%", right: "30%", size: 8, delay: "1.7s" },
        ].map((s, idx) => (
          <Sparkles
            key={idx}
            className={`absolute animate-ping duration-[4s] text-[#8b7469] dark:text-[#ffe0c2] drop-shadow-md`}
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              width: `${s.size * 4}px`,
              height: `${s.size * 4}px`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SparklesComp;
