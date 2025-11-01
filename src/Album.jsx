import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Album.css';

const Album = () => {
  // Get base path for GitHub Pages deployment
  const basePath = import.meta.env.BASE_URL;
  
  // Photo captions/text for the back of each photo
  const photoTexts = [
    {
      title: "Album Cover",
      description: "A collection of beautiful memories",
      date: "2025"
    },
    {
      title: "Memory #1",
      description: "A beautiful moment captured in time, filled with joy and laughter.",
      date: "Spring 2025"
    },
    {
      title: "Memory #2",
      description: "Adventures and explorations that made this day unforgettable.",
      date: "Summer 2025"
    },
    {
      title: "Memory #3",
      description: "Cherished moments with loved ones, creating lasting memories.",
      date: "Summer 2025"
    },
    {
      title: "Memory #4",
      description: "The beauty of nature captured in a perfect frame.",
      date: "Fall 2025"
    },
    {
      title: "Memory #5",
      description: "Spontaneous adventures that become the best stories.",
      date: "Fall 2025"
    },
    {
      title: "Memory #6",
      description: "Simple moments that mean the world to us.",
      date: "Fall 2025"
    },
    {
      title: "Memory #7",
      description: "Celebrating life's precious moments together.",
      date: "Winter 2025"
    },
    {
      title: "Memory #8",
      description: "Capturing the essence of happiness in a single frame.",
      date: "Winter 2025"
    },
    {
      title: "Memory #9",
      description: "A day filled with laughter, love, and endless smiles.",
      date: "Winter 2025"
    },
    {
      title: "Memory #10",
      description: "These are the moments we live for and never forget.",
      date: "Spring 2025"
    },
    {
      title: "Memory #11",
      description: "Creating memories that will last a lifetime.",
      date: "Spring 2025"
    },
    {
      title: "Memory #12",
      description: "Every picture tells a story worth remembering.",
      date: "Spring 2025"
    },
    {
      title: "Memory #13",
      description: "The journey continues with more beautiful moments ahead.",
      date: "Summer 2025"
    },
    {
      title: "Memory #14",
      description: "Grateful for every moment captured and shared.",
      date: "Summer 2025"
    }
  ];
  
  // Photo data with front cover and photos 0-13
  const photos = [
    { id: 'front', src: `${basePath}photos/front.jpg`, isCover: true },
    ...Array.from({ length: 14 }, (_, i) => ({ 
      id: i, 
      src: `${basePath}photos/${i}.jpg`,
      isCover: false 
    }))
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [backgroundColors, setBackgroundColors] = useState(
    Array(photos.length).fill('linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d4f1f4 100%)')
  );
  const canvasRef = useRef(null);
  const lastTapRef = useRef(0);

  // Extract dominant colors from image
  const extractColors = (imageSrc, index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageSrc;
      
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          resolve('linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d4f1f4 100%)');
          return;
        }
        
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        
        const imageData = ctx.getImageData(0, 0, 100, 100).data;
        const colorMap = {};
        
        // Sample colors
        for (let i = 0; i < imageData.length; i += 4 * 10) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          
          // Skip very dark or very light colors
          const brightness = (r + g + b) / 3;
          if (brightness < 30 || brightness > 240) continue;
          
          const key = `${Math.floor(r / 30)},${Math.floor(g / 30)},${Math.floor(b / 30)}`;
          colorMap[key] = (colorMap[key] || 0) + 1;
        }
        
        // Get top colors
        const sortedColors = Object.entries(colorMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);
        
        if (sortedColors.length === 0) {
          resolve('linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d4f1f4 100%)');
          return;
        }
        
        // Convert to RGB and lighten for background
        const colors = sortedColors.map(([key]) => {
          const [r, g, b] = key.split(',').map(n => parseInt(n) * 30 + 15);
          // Lighten and desaturate for pleasant background
          const lighten = (val) => Math.min(255, Math.floor(val + (255 - val) * 0.5));
          const lr = lighten(r);
          const lg = lighten(g);
          const lb = lighten(b);
          return `rgb(${lr}, ${lg}, ${lb})`;
        });
        
        // Create gradient
        const gradient = colors.length >= 2
          ? `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[colors.length - 1]} 100%)`
          : `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 100%)`;
        
        resolve(gradient);
      };
      
      img.onerror = () => {
        resolve('linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d4f1f4 100%)');
      };
    });
  };

  // Extract colors for all images on mount
  useEffect(() => {
    const loadColors = async () => {
      const newColors = await Promise.all(
        photos.map((photo, index) => extractColors(photo.src, index))
      );
      setBackgroundColors(newColors);
    };
    
    loadColors();
  }, []);

  const paginate = (newDirection) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < photos.length) {
      setDirection(newDirection);
      setCurrentPage(newPage);
      setIsFlipped(false); // Reset flip when changing pages
    }
  };

  // Handle double tap to flip photo
  const handleDoubleTap = () => {
    if (currentPhoto.isCover) return; // Don't flip cover page
    
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap detected
      setIsFlipped(!isFlipped);
    }
    
    lastTapRef.current = now;
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
    }),
  };

  const currentPhoto = photos[currentPage];

  return (
    <motion.div 
      className="album-container"
      animate={{
        background: backgroundColors[currentPage]
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
    >
      <div className="album-wrapper">
        {/* Album Book */}
        <div className="album-book">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                rotateY: { duration: 0.5 },
                scale: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                setIsDragging(false);
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className={`album-page ${currentPhoto.isCover ? 'cover-page' : ''}`}
              onClick={handleDoubleTap}
            >
              <motion.div 
                className="photo-flip-container"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of photo */}
                <div className="photo-front">
                  <div className="photo-container">
                    <img 
                      src={currentPhoto.src} 
                      alt={`Photo ${currentPhoto.id}`}
                      className="photo-image"
                      draggable="false"
                    />
                    {currentPhoto.isCover && (
                      <div className="cover-overlay">
                        <h1 className="album-title">Jun's Photo Album</h1>
                        <p className="album-subtitle">A Collection of Memories</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Back of photo with text */}
                {!currentPhoto.isCover && (
                  <div className="photo-back">
                    <div className="photo-text-content">
                      <h2 className="photo-text-title">{photoTexts[currentPage].title}</h2>
                      <p className="photo-text-description">{photoTexts[currentPage].description}</p>
                      <p className="photo-text-date">{photoTexts[currentPage].date}</p>
                    </div>
                    <div className="flip-hint">Double tap to flip back</div>
                  </div>
                )}
              </motion.div>
              
              {/* Page shadow for depth */}
              <div className="page-shadow"></div>
            </motion.div>
          </AnimatePresence>

          {/* Page Edges (for book effect) */}
          <div className="page-edges left"></div>
          <div className="page-edges right"></div>

          {/* Decorative sparkles around the album */}
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
          <div className="sparkle sparkle-5"></div>
          <div className="sparkle sparkle-6"></div>
        </div>

        {/* Navigation Controls */}
        <div className="navigation">
          <button
            className="nav-button prev"
            onClick={() => paginate(-1)}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="page-indicator">
            <span className="current-page">{currentPage + 1}</span>
            <span className="page-separator">/</span>
            <span className="total-pages">{photos.length}</span>
          </div>

          <button
            className="nav-button next"
            onClick={() => paginate(1)}
            disabled={currentPage === photos.length - 1}
            aria-label="Next page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage + 1) / photos.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Swipe Hint (shows on first page) */}
        {currentPage === 0 && (
          <motion.div
            className="swipe-hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Swipe to explore</span>
          </motion.div>
        )}
      </div>

      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </motion.div>
  );
};

export default Album;
