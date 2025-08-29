// Enhanced portfolio script with improved functionality
document.addEventListener('DOMContentLoaded', function(){
  console.log('Enhanced portfolio script loaded');
  
  // Initialize all features
  initTimeline();
  initMobileNavigation();
  initSmoothScrolling();
  initContactForm();
  initAnimations();
  initKeyboardNavigation();
  initVideoManager();
  initSlideshow();
  setCurrentYear();
  
  // Re-initialize clips after a short delay to ensure all elements are ready
  setTimeout(initEditableClips, 200);
  setTimeout(initEditableClips, 1000);
});

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Video manager - stop other videos when one starts playing
function initVideoManager() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.addEventListener('play', function() {
      // Pause all other videos when this one starts playing
      videos.forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });
}

// Mobile navigation
function initMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  
  if (navToggle && header) {
    navToggle.addEventListener('click', function() {
      const isOpen = header.classList.contains('open');
      header.classList.toggle('open');
      this.setAttribute('aria-expanded', !isOpen);
      this.innerHTML = isOpen ? '☰' : '✕';
    });
    
    // Close mobile nav when clicking nav links
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
      });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && header.classList.contains('open')) {
        header.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
      }
    });
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced contact form with validation and feedback
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Validate form
      if (!validateForm(data)) {
        return;
      }
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual implementation)
      setTimeout(() => {
        showFormFeedback('success', 'Thank you for your message! I\'ll get back to you within 2-4 hours.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

function validateForm(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Please enter your full name');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.service) {
    errors.push('Please select a service');
  }
  
  if (!data.budget) {
    errors.push('Please select a budget range');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Please provide more details about your project (minimum 10 characters)');
  }
  
  if (errors.length > 0) {
    showFormFeedback('error', errors.join('<br>'));
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormFeedback(type, message) {
  // Remove existing feedback
  const existingFeedback = document.querySelector('.form-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }
  
  // Create feedback element
  const feedback = document.createElement('div');
  feedback.className = `form-feedback ${type}`;
  feedback.innerHTML = message;
  feedback.style.cssText = `
    margin-top: 20px;
    padding: 16px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.4;
    ${type === 'success' 
      ? 'background: rgba(94,234,212,0.1); border: 1px solid rgba(94,234,212,0.3); color: #5eead4;'
      : 'background: rgba(255,71,87,0.1); border: 1px solid rgba(255,71,87,0.3); color: #ff4757;'
    }
    animation: feedbackSlideIn 0.3s ease-out;
  `;
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes feedbackSlideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  
  // Insert feedback after form
  const form = document.getElementById('contact-form');
  form.parentNode.insertBefore(feedback, form.nextSibling);
  
  // Auto-remove success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.style.animation = 'feedbackSlideIn 0.3s ease-out reverse';
        setTimeout(() => feedback.remove(), 300);
      }
    }, 5000);
  }
}

// Initialize scroll-triggered animations
function initAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.project, .about-card, .skills-card');
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
  
  // Add CSS for animations
  const animationStyles = document.createElement('style');
  animationStyles.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(animationStyles);
}

// Add keyboard navigation for accessibility
function initKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
      const header = document.querySelector('.site-header');
      const navToggle = document.querySelector('.nav-toggle');
      
      if (header && header.classList.contains('open')) {
        header.classList.remove('open');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.innerHTML = '☰';
          navToggle.focus();
        }
      }
    }
  });
}

// Initialize timeline functionality
function initTimeline() {
  console.log('Initializing timeline...');
  
  const playBtn = document.getElementById('playBtn');
  const playhead = document.getElementById('playhead');
  const currentTimeDisplay = document.getElementById('currentTime');
  
  console.log('Elements found:', {
    playBtn: !!playBtn,
    playhead: !!playhead,
    currentTimeDisplay: !!currentTimeDisplay
  });
  
  let isPlaying = false;
  let currentTime = 0;
  let animationId = null;
  let isDraggingPlayhead = false;
  const timelineWidth = 600;
  const totalDuration = 180;
  
  // Enhanced pause functionality for better UX
  const pauseEvents = ['visibilitychange', 'blur', 'pagehide'];
  pauseEvents.forEach(event => {
    document.addEventListener(event, function() {
      if (isPlaying && (document.hidden || !document.hasFocus())) {
        console.log(`${event} - pausing timeline`);
        pauseTimeline();
      }
    });
  });
  
  // Play/Pause functionality with improved feedback
  if (playBtn) {
    playBtn.addEventListener('click', function() {
      console.log('Play button clicked, isPlaying:', isPlaying);
      
      if (isPlaying) {
        pauseTimeline();
      } else {
        playTimeline();
      }
    });
  }
  
  function playTimeline() {
    console.log('Starting timeline play...');
    isPlaying = true;
    playBtn.textContent = '⏸';
    playBtn.classList.add('playing');
    playBtn.setAttribute('aria-label', 'Pause timeline');
    
    animatePlayhead();
  }
  
  function pauseTimeline() {
    console.log('Pausing timeline...');
    isPlaying = false;
    playBtn.textContent = '▶';
    playBtn.classList.remove('playing');
    playBtn.setAttribute('aria-label', 'Play timeline');
    
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  }
  
  function animatePlayhead() {
    if (!isPlaying || isDraggingPlayhead) {
      return;
    }
    
    currentTime += 0.1;
    if (currentTime >= totalDuration) {
      currentTime = 0;
    }
    
    updatePlayheadPosition();
    animationId = requestAnimationFrame(animatePlayhead);
  }
  
  function updatePlayheadPosition() {
    const progress = currentTime / totalDuration;
    const newPosition = 80 + (progress * timelineWidth);
    
    if (playhead) {
      playhead.style.left = newPosition + 'px';
    }
    
    if (currentTimeDisplay) {
      currentTimeDisplay.textContent = formatTime(currentTime);
    }
  }
  
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30);
    
    return String(hours).padStart(2, '0') + ':' +
           String(minutes).padStart(2, '0') + ':' +
           String(secs).padStart(2, '0') + ':' +
           String(frames).padStart(2, '0');
  }
  
  // Enhanced keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Only handle shortcuts if not typing in form elements
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }
    // Skip timeline space toggle if slideshow intends to use space for video control
    if (e.code === 'Space') {
      const slideContainer = document.querySelector('.video-slideshow-container');
      if (slideContainer && isElementInViewport(slideContainer)) {
        // Let slideshow handler manage this
        return; // do not preventDefault here; slideshow will
      }
    }
    
    if (e.code === 'Space') {
      e.preventDefault();
      if (isPlaying) {
        pauseTimeline();
      } else {
        playTimeline();
      }
    }
    
    if (e.code === 'ArrowLeft') {
      e.preventDefault();
      currentTime = Math.max(0, currentTime - 1);
      updatePlayheadPosition();
    }
    
    if (e.code === 'ArrowRight') {
      e.preventDefault();
      currentTime = Math.min(totalDuration, currentTime + 1);
      updatePlayheadPosition();
    }
    
    if (e.code === 'Home') {
      e.preventDefault();
      currentTime = 0;
      updatePlayheadPosition();
    }
    
    if (e.code === 'End') {
      e.preventDefault();
      currentTime = totalDuration;
      updatePlayheadPosition();
    }
  });
  
  // Timeline control buttons
  const controls = {
    rewind: () => { currentTime = 0; updatePlayheadPosition(); },
    prev: () => { currentTime = Math.max(0, currentTime - 5); updatePlayheadPosition(); },
    next: () => { currentTime = Math.min(totalDuration, currentTime + 5); updatePlayheadPosition(); },
    fastforward: () => { currentTime = totalDuration; updatePlayheadPosition(); }
  };
  
  Object.keys(controls).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', controls[id]);
      btn.setAttribute('aria-label', `${id.charAt(0).toUpperCase() + id.slice(1)} timeline`);
    }
  });
  
  // Enhanced draggable playhead
  initDraggablePlayhead();
  
  function initDraggablePlayhead() {
    if (!playhead) return;
    
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;
    
    playhead.addEventListener('mousedown', startDrag);
    playhead.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      isDraggingPlayhead = true;
      
      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      startX = clientX;
      startLeft = parseInt(playhead.style.left) || 0;
      
      if (isPlaying) {
        pauseTimeline();
      }
      
      playhead.classList.add('dragging');
      
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', handleDrag, { passive: false });
      document.addEventListener('touchend', endDrag);
    }
    
    function handleDrag(e) {
      if (!isDragging) return;
      
      e.preventDefault();
      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - startX;
      const newLeft = Math.max(80, Math.min(680, startLeft + deltaX));
      
      playhead.style.left = newLeft + 'px';
      
      const progress = (newLeft - 80) / timelineWidth;
      currentTime = progress * totalDuration;
      
      if (currentTimeDisplay) {
        currentTimeDisplay.textContent = formatTime(currentTime);
      }
    }
    
    function endDrag() {
      isDragging = false;
      isDraggingPlayhead = false;
      playhead.classList.remove('dragging');
      
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', endDrag);
    }
  }
  
  initEditableClips();
}

function initEditableClips() {
  console.log('Initializing editable clips...');
  const clips = document.querySelectorAll('.editable-clip');
  console.log('Found clips:', clips.length);
  
  // First, make sure all clips have the proper styling for dragging
  clips.forEach(clip => {
    clip.style.cursor = 'grab';
    clip.style.userSelect = 'none';
    clip.style.position = 'absolute';
  });
  
  clips.forEach((clip, index) => {
    console.log(`Setting up clip ${index + 1}:`, clip);
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;
    let hasMoved = false;
    
    // Add visual feedback
    clip.style.cursor = 'grab';
    clip.title = 'Click and drag to move this clip';
    
    // Remove any existing event listeners to prevent duplicates
    clip.removeEventListener('mousedown', clip._handleMouseDown);
    
    // Create a named function we can reference for removal
    clip._handleMouseDown = function(e) {
      console.log('Clip mousedown - starting drag for clip:', this);
      
      isDragging = true;
      startX = e.clientX;
      startLeft = parseInt(this.style.left) || 0;
      hasMoved = false;
      
      this.classList.add('dragging');
      this.style.zIndex = '1000';
      this.style.cursor = 'grabbing';
      
      // Prevent text selection and other default behaviors
      e.preventDefault();
      e.stopPropagation();
      
      document.addEventListener('mousemove', handleClipMove);
      document.addEventListener('mouseup', handleClipUp);
      
      console.log('Drag started, initial position:', startLeft);
    };
    
    clip.addEventListener('mousedown', clip._handleMouseDown);
    
    function handleClipMove(e) {
      if (!isDragging) return;
      
      hasMoved = true;
      const deltaX = e.clientX - startX;
      const newLeft = Math.max(0, startLeft + deltaX);
      
      // Snap to grid (every 5px for smoother movement)
      const snappedLeft = Math.round(newLeft / 5) * 5;
      clip.style.left = snappedLeft + 'px';
      
      // Update data attributes
      clip.setAttribute('data-start', snappedLeft);
      
      console.log(`Moving clip to: ${snappedLeft}px`);
      
      // Visual feedback during drag
      clip.style.opacity = '0.8';
      
      // Prevent any default behaviors during drag
      e.preventDefault();
    }
    
    function handleClipUp() {
      if (!isDragging) return;
      
      console.log('Clip mouseup - ending drag');
      isDragging = false;
      
      clip.classList.remove('dragging');
      clip.style.zIndex = '';
      clip.style.cursor = 'grab';
      clip.style.opacity = '1';
      
      document.removeEventListener('mousemove', handleClipMove);
      document.removeEventListener('mouseup', handleClipUp);
      
      if (hasMoved) {
        console.log('Clip moved to new position:', clip.style.left);
        
        // Add a subtle animation to show the clip has been placed
        clip.style.transform = 'scale(1.05)';
        setTimeout(() => {
          clip.style.transform = 'scale(1)';
        }, 150);
      }
    }
    
    // Add hover effects
    clip.addEventListener('mouseenter', function() {
      if (!isDragging) {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      }
    });
    
    clip.addEventListener('mouseleave', function() {
      if (!isDragging) {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '';
      }
    });
    
    // Add double-click to rename functionality
    clip.addEventListener('dblclick', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const nameElement = this.querySelector('.clip-content');
      if (nameElement) {
        const currentName = nameElement.textContent;
        const newName = prompt('Rename clip:', currentName);
        if (newName && newName.trim()) {
          nameElement.textContent = newName.trim();
          console.log(`Clip renamed to: ${newName.trim()}`);
        }
      }
    });
  });
  
  // Add right-click context menu for clips
  document.addEventListener('contextmenu', function(e) {
    const clip = e.target.closest('.editable-clip');
    if (clip) {
      e.preventDefault();
      showClipContextMenu(e, clip);
    }
  });
}

function showClipContextMenu(event, clip) {
  // Remove any existing context menu
  const existingMenu = document.querySelector('.clip-context-menu');
  if (existingMenu) {
    existingMenu.remove();
  }
  
  const menu = document.createElement('div');
  menu.className = 'clip-context-menu';
  menu.style.cssText = `
    position: fixed;
    top: ${event.clientY}px;
    left: ${event.clientX}px;
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 8px 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    font-size: 14px;
    color: white;
    min-width: 150px;
  `;
  
  const menuItems = [
    { text: 'Rename Clip', action: () => {
      const nameElement = clip.querySelector('.clip-content');
      if (nameElement) {
        const currentName = nameElement.textContent;
        const newName = prompt('Rename clip:', currentName);
        if (newName && newName.trim()) {
          nameElement.textContent = newName.trim();
        }
      }
    }},
    { text: 'Duplicate Clip', action: () => {
      const newClip = clip.cloneNode(true);
      const currentLeft = parseInt(clip.style.left) || 0;
      newClip.style.left = (currentLeft + 20) + 'px';
      clip.parentNode.appendChild(newClip);
      initEditableClips(); // Reinitialize to include new clip
    }},
    { text: 'Delete Clip', action: () => {
      if (confirm('Delete this clip?')) {
        clip.remove();
      }
    }}
  ];
  
  menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.textContent = item.text;
    menuItem.style.cssText = `
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    `;
    
    menuItem.addEventListener('mouseenter', () => {
      menuItem.style.backgroundColor = '#444';
    });
    
    menuItem.addEventListener('mouseleave', () => {
      menuItem.style.backgroundColor = 'transparent';
    });
    
    menuItem.addEventListener('click', () => {
      item.action();
      menu.remove();
    });
    
    menu.appendChild(menuItem);
  });
  
  document.body.appendChild(menu);
  
  // Remove menu when clicking elsewhere
  setTimeout(() => {
    document.addEventListener('click', function removeMenu() {
      menu.remove();
      document.removeEventListener('click', removeMenu);
    });
  }, 100);
}

// Video Slideshow Functionality
function initSlideshow() {
  console.log('Initializing slideshow...');
  
  const slides = document.querySelectorAll('.video-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const currentSlideSpan = document.querySelector('.current-slide');
  const totalSlidesSpan = document.querySelector('.total-slides');
  const slideshowContainer = document.querySelector('.video-slideshow-container');
  
  console.log('Found elements:', {
    slides: slides.length,
    indicators: indicators.length,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn,
    currentSlideSpan: !!currentSlideSpan,
    totalSlidesSpan: !!totalSlidesSpan
  });
  
  if (slides.length === 0) {
    console.log('No slides found!');
    return;
  }
  
  let currentSlide = 0;
  let lastSlide = 0;
  
  // Update slide display
  function updateSlide() {
    // Remove active class from all slides and indicators
    slides.forEach((slide, index) => {
      slide.classList.remove('active','prev');
      if (index < currentSlide) slide.classList.add('prev');
    });
    
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Add active class to current slide and indicator
    const newSlide = slides[currentSlide];
    const oldSlide = slides[lastSlide];

  newSlide.classList.add('active');
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add('active');
    }
    
    // Update counter
    if (currentSlideSpan) {
      currentSlideSpan.textContent = currentSlide + 1;
    }
    if (totalSlidesSpan) {
      totalSlidesSpan.textContent = slides.length;
    }
    
    // Manage video playback: pause & reset others (without forcing reload on current)
  slides.forEach((slide, index) => {
      const video = slide.querySelector('video');
      if (!video) return;
      if (index !== currentSlide) {
        // Stop audio and reset quietly
        video.pause();
        try { video.currentTime = 0; } catch(e) { /* ignore */ }
        // Remove potential lingering audio by resetting src only if media ended up in a bad state
        if (video.readyState === 0 || video.error) {
          const srcEl = video.querySelector('source');
          if (srcEl) {
            const src = srcEl.getAttribute('src');
            video.removeAttribute('src');
            video.load();
            video.setAttribute('src', src); // fallback pattern; usually not needed
          }
        }
      } else {
        // Autoplay only if user has interacted previously (browsers require gesture for sound)
        if (userInteracted) {
          const playPromise = video.play();
          if (playPromise) {
            playPromise.catch(err => {
              // If autoplay with sound blocked, fallback to muted then unmute after play
              if (err && String(err).toLowerCase().includes('not allowed')) {
                video.muted = true;
                video.play().then(() => {
                  setTimeout(() => { video.muted = false; }, 500);
                }).catch(()=>{});
              }
            });
          }
        }
      }
    });

    // Adjust container height to match active video-card height (removes extra gap)
    if (slideshowContainer) {
      const activeCard = slides[currentSlide].querySelector('.video-card');
      if (activeCard) {
        const h = activeCard.getBoundingClientRect().height;
        slideshowContainer.style.height = h + 'px';
      }
    }
  }
  
  // Go to next slide
  function nextSlide() {
    lastSlide = currentSlide;
    currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
  }
  
  // Go to previous slide
  function prevSlide() {
    lastSlide = currentSlide;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
  }
  
  // Go to specific slide
  function goToSlide(index) {
    if (index === currentSlide) return;
    lastSlide = currentSlide;
  currentSlide = index;
  updateSlide();
  }
  
  // Event listeners for navigation
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
  userInteracted = true;
      nextSlide();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
  userInteracted = true;
      prevSlide();
    });
  }
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
  userInteracted = true;
      goToSlide(index);
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const slideContainer = document.querySelector('.video-slideshow-container');
    // Only handle keyboard navigation if the slideshow is in view
    if (slideContainer && isElementInViewport(slideContainer)) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
  userInteracted = true;
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
  userInteracted = true;
        nextSlide();
      } else if (e.code === 'Space') {
        // Toggle play/pause of current active slide video
        const active = document.querySelector('.video-slide.active video');
        if (active) {
          e.preventDefault();
          userInteracted = true;
            if (active.paused) {
              const p = active.play();
              if (p) p.catch(()=>{});
            } else {
              active.pause();
            }
        }
      }
    }
  });
  
  // Touch/swipe support
  let startX = 0;
  let endX = 0;
  
  const slideContainer = document.querySelector('.video-slideshow-container');
  if (slideContainer) {
    slideContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    slideContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const difference = startX - endX;
      
      // Minimum swipe distance
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          userInteracted = true;
          nextSlide(); // Swipe left - next slide
        } else {
          userInteracted = true;
          prevSlide(); // Swipe right - previous slide
        }
      }
    });
  }
  
  // Initialize videos
  let userInteracted = false; // track to allow autoplay with sound after first interaction
  slides.forEach((slide, index) => {
    const video = slide.querySelector('video');
    if (!video) return;
    const sourceEl = video.querySelector('source');
    console.log(`Initializing video ${index + 1}:`, sourceEl ? sourceEl.getAttribute('src') : 'no source');
    // First slide: eager load to display poster/frame; others metadata until shown
    if (index === 0) {
      video.preload = 'auto';
    } else {
      video.preload = 'metadata';
    }
    video.playsInline = true;
    video.setAttribute('playsinline','');
    video.addEventListener('play', () => { userInteracted = true; });
    // Detect aspect ratio when metadata is loaded
    const markAspect = () => {
      if (video.videoWidth && video.videoHeight) {
        const ratio = video.videoWidth / video.videoHeight;
        if (ratio < 1) {
          video.classList.add('portrait');
        } else {
          video.classList.remove('portrait');
        }
      }
    };
    video.addEventListener('loadedmetadata', markAspect);
    if (video.readyState >= 1) { // metadata already available
      markAspect();
    }
    video.addEventListener('loadeddata', () => {
      console.log(`Video ${index + 1} loaded successfully`);
      // Force a repaint in case browser didn't render first frame yet
      if (index === 0 && currentSlide === 0) {
        video.style.visibility = 'visible';
      }
    });
    video.addEventListener('error', (e) => {
      console.error(`Video ${index + 1} failed to load:`, e, video.error);
    });
  });
  
  // Initialize first slide
  updateSlide();
  // Also adjust height after a short delay (fonts/video decode)
  setTimeout(() => {
    if (slideshowContainer) {
      const activeCard = slides[currentSlide].querySelector('.video-card');
      if (activeCard) slideshowContainer.style.height = activeCard.getBoundingClientRect().height + 'px';
    }
  }, 300);
  window.addEventListener('resize', () => {
    if (slideshowContainer) {
      const activeCard = slides[currentSlide].querySelector('.video-card');
      if (activeCard) slideshowContainer.style.height = activeCard.getBoundingClientRect().height + 'px';
    }
  });

  // Fallback: if first video still not showing after 800ms, force load/play-pause to render first frame
  setTimeout(() => {
    const firstVideo = slides[0].querySelector('video');
    if (firstVideo && firstVideo.readyState < 2) {
      try {
        firstVideo.load();
        const p = firstVideo.play();
        if (p) {
          p.then(() => { firstVideo.pause(); }).catch(() => {});
        }
      } catch(e) { console.warn('Fallback first frame render failed', e); }
    }
  }, 800);

  // Pause videos when tab / window not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      slides.forEach(slide => {
        const v = slide.querySelector('video');
        if (v && !v.paused) v.pause();
      });
    }
  });
  
  console.log('Slideshow initialized with', slides.length, 'slides');
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
