import { useState, useEffect } from 'react';

function HeroCarousel() {
  // Current slide index (0, 1, 2, ...)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides: background color + text + image
  const slides = [
    {
      id: 1,
      bgColor: '#ffd814',
      title: 'Amazon Fashion under ₹799',
      subtitle: 'Shop sports shoes',
      description: 'Easy returns • Latest trends',
      ctaText: 'Shop now',
      link: '/category/Fashion',
      image: '/shoes.png',
      imageAlt: 'Sports shoes banner',
    },
    {
      id: 2,
      bgColor: '#c5e1ff',
      title: 'Electronics Mega Deals',
      subtitle: 'Up to 50% off',
      description: '• Headphones • Smartwatches',
      ctaText: 'Explore deals',
      link: '/category/Electronics',
      image: '/headphone.png',
      imageAlt: 'Electronics banner',
    },
    {
      id: 3,
      bgColor: '#ffe0e0',
      title: 'Trending styles for you',
      subtitle: 'Flat 60% off',
      description: '• Clothing',
      ctaText: 'View collection',
      link: '/category/Clothing',
      image: '/clothing2.jpg',
      imageAlt: 'Fashion banner',
    },
  ];

  // Auto-slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Next / previous / go to slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {/* ACTIVE SLIDE */}
      <div
        className="w-full h-full flex items-center md:px-12"
        style={{
          background: `linear-gradient(
            to bottom,
            ${activeSlide.bgColor} 0%,
            ${activeSlide.bgColor}cc 40%,
            ${activeSlide.bgColor}80 70%,
            #E3E6E6 100%
          )`,
          transition: 'background 0.5s ease',
        }}
      >
        {/* LEFT: TEXT */}
        <div className="max-w-md space-y-3 mb-24 ml-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {activeSlide.title}
          </h2>
          <p className="text-xl font-semibold text-gray-900">
            {activeSlide.subtitle}
          </p>
          <p className="text-sm text-gray-800">
            {activeSlide.description}
          </p>

          <button
            onClick={() => (window.location.href = activeSlide.link)}
            className="mt-3 px-6 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium rounded"
          >
            {activeSlide.ctaText}
          </button>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="hidden md:flex items-center mb-24 mr-24 justify-center h-full flex-1">
          <img
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
            className="max-h-[300px] object-contain drop-shadow-xl"
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/400x300?text=Banner+Image';
            }}
          />
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/60 w-2 hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
