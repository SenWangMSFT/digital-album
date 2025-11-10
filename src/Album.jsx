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
      title: "土匪穿搭😈",
      description: "第一次在小红书刷到你的照片，感觉你又酷，又有点坏坏的你开始住进了我的脑海里",
      date: "😈"
    },
    {
      title: "Gaspe 游玩",
      description: "看到你去gaspe的照片，阳光下笑的好真，好自然。干净的笑容让我❤️都化了。",
      date: "🚗"
    },
    {
      title: "Gaspe 游玩",
      description: "看到你去gaspe的照片，阳光下笑的好真，好自然。干净的笑容让我❤️都化了。",
      date: "🚗"
    },
    {
      title: "第一次见面",
      description: "第一次见到你， 你比照片还好看！你认真，谦虚，对自己要求高。啊。。他好真诚， 我真的好喜欢这种感觉。",
      date: "🌗"
    },
    {
      title: "第一次去你家",
      description: "这是你急急忙忙给我倒饮料的照片。 这个人要是对我笑一下， 我就彻底没救了！",
      date: "🏠"
    },
    {
      title: "君君给我发的第一张自拍（和第二张自拍）",
      description: "干净的眼神，干净的笑容，让我忍不住看了好几遍。",
      date: "📷"
    },
    {
      title: "君君给我发的第一张自拍（和第二张自拍）",
      description: "干净的眼神，干净的笑容，让我忍不住看了好几遍。",
      date: "📷"
    },
    {
      title: "一些throwback",
      description: "你发来的旧照片，每一张都好帅。有一点小成熟，有一点少年感。怎么以前到现在都这么让人心动 ❤️",
      date: "🗓️"
    },
    {
      title: "一些throwback",
      description: "你发来的旧照片，每一张都好帅。有一点小成熟，有一点少年感。怎么以前到现在都这么让人心动 ❤️",
      date: "🗓️"
    },
    {
      title: "一些throwback",
      description: "你发来的旧照片，每一张都好帅。有一点小成熟，有一点少年感。怎么以前到现在都这么让人心动 ❤️",
      date: "🗓️"
    },
    {
      title: "君君的lab",
      description: "What happened in the lab, stays in the lab 嘿嘿。",
      date: "😈"
    },
    {
      title: "君君做饭",
      description: "你做的饭我真的好爱吃！每次都吃的特别幸福！在我的世界里，你是全世界最会做饭的人！",
      date: "🍳"
    },
    {
      title: "君君做饭",
      description: "你做的饭我真的好爱吃！每次都吃的特别幸福！在我的世界里，你是全世界最会做饭的人！",
      date: "🍳"
    },
    {
      title: "What's next...",
      description: "Let's make memories together ❤️",
      date: "💌"
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
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [giftBoxOpened, setGiftBoxOpened] = useState(false);
  const [easterEgg1Triggered, setEasterEgg1Triggered] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const canvasRef = useRef(null);
  const lastTapRef = useRef(0);
  const shakeTimeoutRef = useRef(null);

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

  // Handle double tap to flip photo
  const handleDoubleTap = () => {
    if (currentPhoto.isCover) return; // Don't flip cover page
    
    // Check for triple tap easter egg on photo 10
    if (currentPage === 11) {
      handleTripleTap();
    }
    
    // Check if it's the last picture (photo 13, index 14)
    if (currentPage === photos.length - 1) {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;
      
      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        // Double tap detected on last picture - show gift box
        setShowGiftBox(true);
      }
      
      lastTapRef.current = now;
      return;
    }
    
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap detected
      setIsFlipped(!isFlipped);
    }
    
    lastTapRef.current = now;
  };

  // Handle gift box double click
  const handleGiftBoxClick = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double click detected - open gift box
      setGiftBoxOpened(true);
    }
    
    lastTapRef.current = now;
  };

  // Reset gift box when leaving last page
  const paginate = (newDirection) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < photos.length) {
      setDirection(newDirection);
      setCurrentPage(newPage);
      setIsFlipped(false); // Reset flip when changing pages
      setShowGiftBox(false); // Reset gift box
      setGiftBoxOpened(false); // Reset opened state
      setEasterEgg1Triggered(false); // Reset easter eggs
      setShakeCount(0);
    }
  };

  // Easter Egg 1: Triple tap on photo 10 (lab photo)
  const handleTripleTap = () => {
    if (currentPage !== 11) return; // Photo 10 is at index 11
    
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 400 && timeSinceLastTap > 0) {
      setShakeCount(prev => {
        const newCount = prev + 1;
        
        // Clear existing timeout
        if (shakeTimeoutRef.current) {
          clearTimeout(shakeTimeoutRef.current);
        }
        
        // Reset count after 1 second
        shakeTimeoutRef.current = setTimeout(() => {
          setShakeCount(0);
        }, 1000);
        
        // Trigger easter egg on triple tap
        if (newCount >= 3) {
          setEasterEgg1Triggered(true);
          setTimeout(() => setEasterEgg1Triggered(false), 5000);
          setShakeCount(0);
        }
        
        return newCount;
      });
    } else {
      setShakeCount(1);
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
                    {currentPage === photos.length - 1 && !showGiftBox && (
                      <motion.div 
                        className="surprise-hint"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.5,
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 2
                        }}
                      >
                        <span className="surprise-emoji">🎁</span>
                        <span className="surprise-text">Double tap for a surprise!</span>
                      </motion.div>
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
              
              {/* Gift Box for Last Picture */}
              {currentPage === photos.length - 1 && showGiftBox && (
                <motion.div
                  className="gift-box-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="gift-box-container"
                    initial={{ scale: 0, rotateY: 0 }}
                    animate={{ scale: 1, rotateY: 360 }}
                    transition={{ 
                      scale: { duration: 0.6, ease: "backOut" },
                      rotateY: { duration: 1, ease: "easeInOut" }
                    }}
                    onClick={handleGiftBoxClick}
                  >
                    {!giftBoxOpened ? (
                      <div className="gift-box-closed">
                        <motion.div 
                          className="gift-box"
                          animate={{ 
                            y: [0, -10, 0],
                            rotateZ: [0, 2, -2, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="gift-lid">
                            <div className="gift-bow">
                              <div className="bow-left"></div>
                              <div className="bow-right"></div>
                              <div className="bow-center"></div>
                            </div>
                          </div>
                          <div className="gift-box-body">
                            <div className="gift-ribbon-vertical"></div>
                          </div>
                          <div className="gift-sparkles">
                            <span className="gift-sparkle"></span>
                            <span className="gift-sparkle"></span>
                            <span className="gift-sparkle"></span>
                            <span className="gift-sparkle"></span>
                          </div>
                        </motion.div>
                        <p className="gift-hint">Double click to open! 🎁</p>
                      </div>
                    ) : (
                      <motion.div 
                        className="gift-content"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "backOut" }}
                      >
                        <motion.div
                          className="confetti-container"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[...Array(30)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="confetti"
                              initial={{ 
                                y: 0, 
                                x: 0, 
                                opacity: 1,
                                rotate: 0
                              }}
                              animate={{ 
                                y: [0, -200, 400],
                                x: (Math.random() - 0.5) * 400,
                                opacity: [1, 1, 0],
                                rotate: Math.random() * 720
                              }}
                              transition={{ 
                                duration: 2 + Math.random(),
                                delay: Math.random() * 0.3,
                                ease: "easeOut"
                              }}
                              style={{
                                left: `${Math.random() * 100}%`,
                                background: ['#ff6b9d', '#c44569', '#f8b500', '#ffa801', '#4fa3d1', '#9b59b6'][Math.floor(Math.random() * 6)]
                              }}
                            />
                          ))}
                        </motion.div>
                        
                        <div className="netflix-card">
                          <div className="netflix-header">
                            <div className="netflix-logo">NETFLIX</div>
                            <h2 className="gift-title">Netflix Gift 🎬</h2>
                          </div>
                          
                          <div className="netflix-content">
                            <p className="gift-message">
                              Let's watch movies together! ❤️
                            </p>
                            
                            <div className="credentials-container">
                              <div className="credential-field">
                                <label>Username</label>
                                <div className="credential-value">
                                  <span>sen.wang.sw@outlook.com</span>
                                  <button 
                                    className="copy-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigator.clipboard.writeText('sen.wang.sw@outlook.com');
                                    }}
                                  >
                                    📋
                                  </button>
                                </div>
                              </div>
                              
                              <div className="credential-field">
                                <label>Password</label>
                                <div className="credential-value">
                                  <span>senlovesjun</span>
                                  <button 
                                    className="copy-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigator.clipboard.writeText('senlovesjun');
                                    }}
                                  >
                                    📋
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="gift-footer">
                              <p className="enjoy-text">Enjoy unlimited movies & shows! 🍿</p>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          className="close-gift-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowGiftBox(false);
                            setGiftBoxOpened(false);
                          }}
                        >
                          ✕
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
              
              {/* Easter Egg 1: Lab Photo (Photo 10, index 11) - Triple Tap */}
              {currentPage === 11 && easterEgg1Triggered && (
                <motion.div
                  className="easter-egg-overlay"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="easter-egg-content lab-easter-egg"
                    initial={{ rotateZ: -10, y: 50 }}
                    animate={{ rotateZ: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="easter-egg-emoji">🧪💕</div>
                    <div className="easter-egg-text">
                      <p className="easter-egg-title">Lab Secrets Unlocked! 😏</p>
                      <p className="easter-egg-message">
                        "Chemistry isn't just in the lab...<br/>
                        The real experiment was seeing if I could make your heart race in the little dark room 😏"
                      </p>
                    </div>
                    <div className="floating-hearts">
                      {[...Array(12)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="floating-heart"
                          initial={{ y: 0, opacity: 1, scale: 0 }}
                          animate={{ 
                            y: -200,
                            opacity: 0,
                            scale: [0, 1, 1, 0],
                            rotate: Math.random() * 360
                          }}
                          transition={{
                            duration: 2 + Math.random(),
                            delay: Math.random() * 0.5,
                            ease: "easeOut"
                          }}
                          style={{
                            left: `${10 + Math.random() * 80}%`,
                          }}
                        >
                          ❤️
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Easter Egg Hints */}
              {currentPage === 11 && !easterEgg1Triggered && !isFlipped && (
                <motion.div
                  className="easter-egg-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                >
                  <span className="hint-icon">👆</span>
                  <span className="hint-text">Try triple tapping...</span>
                </motion.div>
              )}
              
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
