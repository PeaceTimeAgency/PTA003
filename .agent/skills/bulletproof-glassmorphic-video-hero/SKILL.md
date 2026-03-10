---
name: The "Bulletproof" Glassmorphic Video Hero
description: This module creates a full-screen background video with a responsive fallback, a high-contrast glassmorphism text container, and an animated scroll prompt.
---

# The "Bulletproof" Glassmorphic Video Hero

This module creates a full-screen background video with a responsive fallback, a high-contrast glassmorphism text container, and an animated scroll prompt.

## 1. The HTML Structure

```html
<section class="hero-wrapper">
  <video 
    class="hero-video" 
    poster="https://www.blushiftcreative.com/assets/img/posters/herosection-poster.jpg?4" 
    autoplay muted loop playsinline preload="auto"
    aria-hidden="true">
    <source src="https://www.blushiftcreative.com/assets/videos/hero-section-video-2.mp4" type="video/mp4">
  </video>

  <div class="hero-overlay">
    <div class="glass-card">
      <h1 class="hero-title">Elevate Your Vision</h1>
      <p class="hero-subtitle">High-performance design meets seamless execution.</p>
      <a href="#start" class="hero-btn">Get Started</a>
    </div>
  </div>

  <div class="scroll-indicator">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
  </div>
</section>
```

## 2. The CSS (The Logic & Styling)

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --accent-color: #ffffff;
}

.hero-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* Fallback Image/Color */
  background: #1a1a1a url('https://www.blushiftcreative.com/assets/img/posters/herosection-poster.jpg?4') center/cover no-repeat;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
}

/* Darken overlay for readability */
.hero-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

/* Glassmorphism Card */
.glass-card {
  position: relative;
  z-index: 3;
  padding: 3rem;
  max-width: 600px;
  text-align: center;
  border-radius: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-title { font-size: 3.5rem; margin-bottom: 1rem; color: white; }
.hero-subtitle { font-size: 1.2rem; margin-bottom: 2rem; color: rgba(255,255,255,0.9); }

/* Scroll Down Animation */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.mouse {
  width: 25px;
  height: 40px;
  border: 2px solid white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}

.wheel {
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  margin-top: 8px;
  animation: scroll-move 2s infinite;
}

@keyframes scroll-move {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
}

/* Responsive Mobile Tweak */
@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .glass-card { margin: 0 20px; padding: 2rem; }
}
```

## Why this is "Agent Ready":

*   **Layering**: Uses z-index to ensure video stays back, overlay stays middle, and content stays front.
*   **Performance**: The background on `.hero-wrapper` ensures the user sees something immediately while the video buffers.
*   **Visual Cue**: The animated "mouse" at the bottom increases user engagement by signaling there is more content below the fold.
