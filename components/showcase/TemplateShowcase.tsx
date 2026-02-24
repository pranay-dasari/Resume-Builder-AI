import React, { useState, useRef } from 'react';

const templates = [
  {
    id: 1,
    name: 'Modern Minimal',
    gradient: 'from-blue-600 to-blue-400',
    border: 'border-blue-500',
    accent: 'bg-blue-500',
    isDark: false,
  },
  {
    id: 2,
    name: 'Executive Pro',
    gradient: 'from-slate-700 to-slate-600',
    border: 'border-slate-600',
    accent: 'bg-slate-600',
    isDark: true,
  },
  {
    id: 3,
    name: 'Creative Bold',
    gradient: 'from-purple-600 to-pink-500',
    border: 'border-purple-500',
    accent: 'bg-purple-500',
    isDark: false,
  },
  {
    id: 4,
    name: 'Tech Savvy',
    gradient: 'from-cyan-600 to-blue-500',
    border: 'border-cyan-500',
    accent: 'bg-cyan-500',
    isDark: false,
  },
  {
    id: 5,
    name: 'Classic Elegant',
    gradient: 'from-amber-700 to-amber-600',
    border: 'border-amber-600',
    accent: 'bg-amber-600',
    isDark: true,
  },
  {
    id: 6,
    name: 'Green Growth',
    gradient: 'from-emerald-600 to-teal-500',
    border: 'border-emerald-500',
    accent: 'bg-emerald-500',
    isDark: false,
  },
  {
    id: 7,
    name: 'Sunset Vibes',
    gradient: 'from-orange-600 to-red-500',
    border: 'border-orange-500',
    accent: 'bg-orange-500',
    isDark: false,
  },
  {
    id: 8,
    name: 'Midnight Pro',
    gradient: 'from-indigo-900 to-indigo-700',
    border: 'border-indigo-700',
    accent: 'bg-indigo-700',
    isDark: true,
  },
];

const TemplateShowcase: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth',
      });
    }
  };

  const handlePauseScroll = () => {
    setIsPaused(true);
  };

  const handleResumeScroll = () => {
    setIsPaused(false);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-indigo-950 via-blue-950 to-indigo-950 overflow-hidden">
      <style>{`
        @keyframes scroll-carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-scroll {
          animation: scroll-carousel 40s linear infinite;
        }

        .carousel-scroll.paused {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .carousel-scroll {
            animation-duration: 50s;
          }
        }

        .template-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .template-card:hover {
          transform: scale(1.05);
        }

        .carousel-container::-webkit-scrollbar {
          height: 4px;
        }

        .carousel-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .carousel-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        .carousel-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Premium Resume Templates
          </h2>
          <p className="text-indigo-200 text-lg">
            Choose from our curated collection of ATS-optimized designs
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Gradient Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-indigo-950 to-transparent z-10 pointer-events-none hidden md:block" />

          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-indigo-950 to-transparent z-10 pointer-events-none hidden md:block" />

          {/* Left Arrow */}
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="carousel-container flex gap-6 overflow-x-auto scroll-smooth px-4 md:px-16 pb-4"
            onMouseEnter={handlePauseScroll}
            onMouseLeave={handleResumeScroll}
          >
            {/* Render templates twice for infinite loop effect */}
            {[...templates, ...templates].map((template, index) => (
              <div
                key={`${template.id}-${index}`}
                className="template-card flex-shrink-0 w-72 md:w-80"
              >
                {/* Template Card */}
                <div
                  className={`relative h-96 rounded-xl overflow-hidden border-2 ${template.border} shadow-lg hover:shadow-2xl transition-shadow duration-300 group/card cursor-pointer`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`}
                  />

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between text-white">
                    {/* Header Section */}
                    <div>
                      <div className="h-2 w-16 rounded-full bg-white/30 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-white/70">
                        Professional & ATS-optimized
                      </p>
                    </div>

                    {/* Mock Resume Content */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="h-1.5 w-24 rounded bg-white/40" />
                        <div className="h-1 w-32 rounded bg-white/30" />
                        <div className="h-1 w-28 rounded bg-white/30" />
                      </div>
                      <div className="space-y-2 pt-2">
                        <div className="h-1.5 w-20 rounded bg-white/40" />
                        <div className="h-1 w-full rounded bg-white/30" />
                        <div className="h-1 w-full rounded bg-white/30" />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                      {/* ATS Badge */}
                      <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full text-white font-semibold text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ATS Friendly
                      </div>

                      {/* CTA Button */}
                      <button className="px-6 py-2 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>

                {/* Template Name Below Card */}
                <p className="text-center text-white/60 text-sm mt-3 font-medium">
                  {template.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center mt-12">
          <p className="text-indigo-200 text-sm">
            All templates are fully customizable and optimized for ATS systems
          </p>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
