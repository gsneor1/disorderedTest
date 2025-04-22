// Main JavaScript file for Disordered project

// Wait for DOM to be fully loaded before executing code
document.addEventListener("DOMContentLoaded", () => {
  // ===== AUDIO CONTROLS =====
  setupAudioControls()

  // ===== MENU TOGGLE =====
  setupMenuToggle()

  // ===== CATEGORY NAVIGATION =====
  setupCategoryNavigation()

  // ===== CATEGORY BUTTONS =====
  setupCategoryButtons()

  // ===== EXPERIENCE SELECTION =====
  setupExperienceSelection()

  // ===== ABOUT PAGE CARD FLIP =====
  setupAboutPageCards()

  // ===== EXPERIENCE PAGE =====
  setupExperiencePage()
})

// ===== AUDIO CONTROLS FUNCTIONS =====
function setupAudioControls() {
  const audioPlayer = document.getElementById("audioPlayer")
  const playButton = document.getElementById("playButton")
  const muteButton = document.getElementById("muteButton")
  const volumeSlider = document.getElementById("volumeSlider")
  const audioControlsToggle = document.getElementById("audioControlsToggle")
  const audioControlsExpanded = document.getElementById("audioControlsExpanded")

  // Skip if elements don't exist on current page
  if (!audioPlayer) return

  let isPlaying = false
  let isMuted = audioPlayer.muted
  let volume = volumeSlider ? volumeSlider.value : 50

  // Audio controls toggle
  if (audioControlsToggle && audioControlsExpanded) {
    audioControlsToggle.addEventListener("click", () => {
      audioControlsToggle.classList.toggle("active")
      audioControlsExpanded.classList.toggle("show")
    })

    // Close audio controls when clicking outside
    document.addEventListener("click", (e) => {
      if (!audioControlsToggle.contains(e.target) && !audioControlsExpanded.contains(e.target)) {
        audioControlsToggle.classList.remove("active")
        audioControlsExpanded.classList.remove("show")
      }
    })
  }

  // Play/Pause functionality
  if (playButton) {
    playButton.addEventListener("click", () => {
      if (isPlaying) {
        audioPlayer.pause()
        playButton.querySelector(".play-icon").textContent = "▶"
      } else {
        audioPlayer.play()
        playButton.querySelector(".play-icon").textContent = "⏸"
      }
      isPlaying = !isPlaying
    })
  }

  // Volume control
  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      volume = e.target.value
      audioPlayer.volume = volume / 100
      updateVolumeIcon(isMuted ? 0 : audioPlayer.volume)
    })
  }

  // Mute toggle
  if (muteButton) {
    muteButton.addEventListener("click", () => {
      isMuted = !isMuted
      audioPlayer.muted = isMuted
      updateVolumeIcon(isMuted ? 0 : audioPlayer.volume)
    })
  }
}

function updateVolumeIcon(volume) {
  const muteButton = document.getElementById("muteButton")
  if (!muteButton) return

  const volumeIcon = muteButton.querySelector("svg") || muteButton.querySelector("img")
  if (!volumeIcon) return

  // Volume icon SVGs
  const volumeMutedIcon = `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="1" y1="1" x2="23" y2="23"></line>
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `

  const volumeOnIcon = `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  `

  if (volumeIcon.tagName.toLowerCase() === "svg") {
    // If it's an SVG element, replace the entire button content
    if (volume === 0) {
      muteButton.innerHTML = volumeMutedIcon
    } else {
      muteButton.innerHTML = volumeOnIcon
    }
  } else if (volumeIcon.tagName.toLowerCase() === "img") {
    // If it's an image element, update the src attribute
    if (volume === 0) {
      volumeIcon.src = "/placeholder.svg?height=24&width=24" // muted icon
    } else if (volume < 0.5) {
      volumeIcon.src = "/placeholder.svg?height=24&width=24" // low volume icon
    } else {
      volumeIcon.src = "/placeholder.svg?height=24&width=24" // high volume icon
    }
  }
}

// ===== MENU TOGGLE FUNCTIONS =====
function setupMenuToggle() {
  const menuToggle = document.getElementById("menuToggle")
  const closeMenu = document.getElementById("closeMenu")
  const menuOverlay = document.getElementById("menuOverlay")
  const menuToggleButton = document.querySelector(".menu-toggle")

  // Skip if elements don't exist on current page
  if (!menuToggle || !closeMenu || !menuOverlay) return

  function toggleMenu() {
    const isDesktop = window.innerWidth >= 1200
    const pageWrapper = document.querySelector(".page-wrapper")

    menuOverlay.classList.toggle("open")

    if (menuToggleButton) {
      menuToggleButton.classList.toggle("hidden")
    }

    if (isDesktop && pageWrapper) {
      pageWrapper.classList.toggle("sidenav-open")
    }
  }

  menuToggle.addEventListener("click", toggleMenu)
  closeMenu.addEventListener("click", toggleMenu)

  // Close menu when clicking outside
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      toggleMenu()
    }
  })

  // Handle resize events
  window.addEventListener("resize", () => {
    const isDesktop = window.innerWidth >= 1200
    const isMenuOpen = menuOverlay.classList.contains("open")
    const pageWrapper = document.querySelector(".page-wrapper")

    if (pageWrapper) {
      if (isDesktop) {
        if (isMenuOpen) {
          pageWrapper.classList.add("sidenav-open")
        } else {
          pageWrapper.classList.remove("sidenav-open")
        }
      } else {
        pageWrapper.classList.remove("sidenav-open")
      }
    }

    // Ensure menu toggle button visibility is correct after resize
    if (menuToggleButton) {
      menuToggleButton.classList.toggle("hidden", isMenuOpen)
    }

    // Update category navigation if it exists
    updateCategoryNavigation()
  })
}

// ===== CATEGORY NAVIGATION FUNCTIONS =====
function setupCategoryNavigation() {
  const categoriesScroll = document.querySelector(".categories-scroll")

  // Skip if element doesn't exist on current page
  if (!categoriesScroll) return

  // Ensure first card is visible on load
  categoriesScroll.scrollLeft = 0

  const prevButton = document.querySelector(".category-nav.prev")
  const nextButton = document.querySelector(".category-nav.next")

  updateCategoryNavigation()

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      if (window.innerWidth < 1200) {
        categoriesScroll.scrollBy({
          left: -categoriesScroll.offsetWidth,
          behavior: "smooth",
        })
      }
    })

    nextButton.addEventListener("click", () => {
      if (window.innerWidth < 1200) {
        categoriesScroll.scrollBy({
          left: categoriesScroll.offsetWidth,
          behavior: "smooth",
        })
      }
    })
  }

  // Touch swipe functionality
  let touchStartX = 0
  let touchEndX = 0

  categoriesScroll.addEventListener("touchstart", (e) => {
    if (window.innerWidth < 1200) {
      touchStartX = e.changedTouches[0].screenX
    }
  })

  categoriesScroll.addEventListener("touchend", (e) => {
    if (window.innerWidth < 1200) {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }
  })

  function handleSwipe() {
    const swipeThreshold = 50
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left
      categoriesScroll.scrollBy({
        left: categoriesScroll.offsetWidth,
        behavior: "smooth",
      })
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right
      categoriesScroll.scrollBy({
        left: -categoriesScroll.offsetWidth,
        behavior: "smooth",
      })
    }
  }
}

function updateCategoryNavigation() {
  const categoriesScroll = document.querySelector(".categories-scroll")
  const prevButton = document.querySelector(".category-nav.prev")
  const nextButton = document.querySelector(".category-nav.next")

  // Skip if elements don't exist on current page
  if (!categoriesScroll) return

  const isDesktop = window.innerWidth >= 1200

  if (isDesktop) {
    if (prevButton) prevButton.style.display = "none"
    if (nextButton) nextButton.style.display = "none"
    categoriesScroll.style.overflow = "visible"
  } else {
    if (prevButton) prevButton.style.display = "block"
    if (nextButton) nextButton.style.display = "block"
    categoriesScroll.style.overflow = "auto"
  }
}

// ===== CATEGORY BUTTONS FUNCTIONS =====
function setupCategoryButtons() {
  // Add event listeners to all category buttons
  const categoryButtons = document.querySelectorAll(".category-btn")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Add category selection logic here
      document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.classList.remove("active")
      })
      button.classList.add("active")

      // Navigate to select experience page
      navigateToSelectExperience(e)
    })
  })

  // Add event listener to the "Recharge" card on the home page
  const rechargeCard = document.querySelector('.category-card[data-category="recharge"]')
  if (rechargeCard) {
    rechargeCard.addEventListener("click", (e) => {
      e.preventDefault()
      fadeOutAudio()
      setTimeout(() => {
        window.location.href = "selectExperience.html"
      }, 1000) // Delay navigation to allow audio to fade out
    })
  }
}

// Function to handle navigation to the select experience page
function navigateToSelectExperience(e) {
  e.preventDefault()
  const category = e.currentTarget.getAttribute("data-category")
  fadeOutAudio()
  setTimeout(() => {
    window.location.href = `selectExperience.html?category=${category}`
  }, 1000) // Delay navigation to allow audio to fade out
}

// Function to fade out audio when navigating away from the home page
function fadeOutAudio() {
  const audio = document.getElementById("audioPlayer")
  if (audio) {
    let volume = audio.volume
    const fadeOutInterval = setInterval(() => {
      if (volume > 0.1) {
        volume -= 0.1
        audio.volume = volume
      } else {
        clearInterval(fadeOutInterval)
        audio.pause()
        audio.currentTime = 0
      }
    }, 100)
  }
}

// ===== EXPERIENCE SELECTION FUNCTIONS =====
function setupExperienceSelection() {
  const durationButtons = document.querySelectorAll(".duration-btn")

  // Skip if elements don't exist on current page
  if (!durationButtons.length) return

  durationButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const duration = e.target.getAttribute("data-duration")
      selectExperience(duration)
    })
  })
}

// Function to handle experience selection
function selectExperience(duration) {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("category")

  if (!category) {
    console.error("No category selected")
    // Optionally, redirect to home page or show an error message
    window.location.href = "index.html"
    return
  }

  let experienceUrl

  switch (category) {
    case "recharge":
      experienceUrl = `experience.html?duration=${duration}&category=${category}`
      break
    case "reassurance":
      experienceUrl = `experience.html?duration=${duration}&category=${category}`
      break
    case "relax":
      experienceUrl = `experience.html?duration=${duration}&category=${category}`
      break
    case "grounding":
      experienceUrl = `experience.html?duration=${duration}&category=${category}`
      break
    default:
      console.error("Invalid category:", category)
      // Optionally, redirect to home page or show an error message
      window.location.href = "index.html"
      return
  }

  window.location.href = experienceUrl
}

// Function to go back to the homepage
function goBack() {
  window.location.href = "index.html"
}

// ===== ABOUT PAGE CARD FLIP FUNCTIONS =====
function setupAboutPageCards() {
  const cardContainers = document.querySelectorAll(".card-container")
  const cardOverlay = document.getElementById("cardOverlay")
  const backButtons = document.querySelectorAll(".back-button")

  // Skip if elements don't exist on current page
  if (!cardContainers.length || !cardOverlay) return

  // Card flip functionality with focus
  let activeCard = null

  cardContainers.forEach((container) => {
    container.addEventListener("click", (e) => {
      // If we're clicking on the back button, don't handle it here
      if (e.target.classList.contains("back-button")) {
        return
      }

      const flipper = container.querySelector(".card-flipper")

      // If this card is already active, do nothing
      if (activeCard === container) {
        return
      }

      // If there's already an active card, reset it first
      if (activeCard) {
        resetView()
        return
      }

      // Set this as the active card
      activeCard = container

      // Hide all other cards
      cardContainers.forEach((otherContainer) => {
        if (otherContainer !== container) {
          otherContainer.classList.add("hidden")
        }
      })

      // Focus this card
      container.classList.add("focused")

      // Flip the card
      flipper.classList.add("flipped")

      // Show overlay
      cardOverlay.classList.add("active")
    })
  })

  // Back button functionality
  backButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent event from bubbling to card
      resetView()
    })
  })

  // Overlay click to go back
  cardOverlay.addEventListener("click", () => {
    resetView()
  })

  // Function to reset the view
  function resetView() {
    if (!activeCard) return

    // Unflip the active card
    const flipper = activeCard.querySelector(".card-flipper")
    flipper.classList.remove("flipped")

    // Remove focus from active card
    activeCard.classList.remove("focused")

    // Show all cards again
    cardContainers.forEach((container) => {
      container.classList.remove("hidden")
    })

    // Hide overlay
    cardOverlay.classList.remove("active")

    // Reset active card
    activeCard = null
  }
}

// ===== EXPERIENCE PAGE FUNCTIONS =====
function setupExperiencePage() {
  const video = document.getElementById("background-video")
  const videoContainer = document.getElementById("video-container")
  const playPauseIndicator = document.getElementById("play-pause-indicator")
  const experienceTitle = document.getElementById("experience-title")
  const experienceDescription = document.getElementById("experience-description")
  const timerDisplay = document.getElementById("timer-display")

  // Skip if elements don't exist on current page
  if (!video || !videoContainer) return

  // Set initial state
  let isPlaying = true
  let duration = 5 // Default duration in minutes
  let timerInterval = null
  let remainingTime = 0

  // Get duration from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const durationParam = urlParams.get("duration")
  const categoryParam = urlParams.get("category")

  if (durationParam) {
    duration = Number.parseInt(durationParam)

    if (experienceTitle) {
      let titleText = `${duration}-Minute`

      if (categoryParam) {
        titleText += ` ${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`
      }

      experienceTitle.textContent = `${titleText} Experience`
    }

    // Set the initial remaining time in seconds
    remainingTime = duration * 60
    updateTimerDisplay()
    startTimer()
  }

  // Play/Pause icons
  const playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
  `

  const pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="10" y1="15" x2="10" y2="9"></line>
        <line x1="14" y1="15" x2="14" y2="9"></line>
    </svg>
  `

  // Function to update timer display
  function updateTimerDisplay() {
    if (!timerDisplay) return

    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Function to start the timer
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval)

    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--
        updateTimerDisplay()
      } else {
        clearInterval(timerInterval)
        // Optional: Do something when timer ends
        if (experienceDescription) {
          experienceDescription.textContent = "Your session has completed. Take a moment to reflect."
        }
      }
    }, 1000)
  }

  // Function to pause the timer
  function pauseTimer() {
    clearInterval(timerInterval)
  }

  // Function to toggle play/pause
  function togglePlayPause() {
    if (video.paused) {
      video.play()
      isPlaying = true
      if (playPauseIndicator) playPauseIndicator.innerHTML = pauseIcon
      startTimer() // Start the timer when video plays
    } else {
      video.pause()
      isPlaying = false
      if (playPauseIndicator) playPauseIndicator.innerHTML = playIcon
      pauseTimer() // Pause the timer when video pauses
    }

    // Show the indicator
    if (playPauseIndicator) {
      playPauseIndicator.classList.add("visible")

      // Hide the indicator after 1 second
      setTimeout(() => {
        playPauseIndicator.classList.remove("visible")
      }, 1000)
    }
  }

  // Add click/tap event listener to the video container
  videoContainer.addEventListener("click", togglePlayPause)

  // Add touch event listeners for mobile devices
  videoContainer.addEventListener("touchstart", (e) => {
    // Prevent default touch behavior
    e.preventDefault()
  })

  videoContainer.addEventListener("touchend", (e) => {
    // Prevent default touch behavior
    e.preventDefault()
    togglePlayPause()
  })

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && videoContainer) {
      e.preventDefault() // Prevent scrolling on spacebar press
      togglePlayPause()
    }
  })
}

// ===== PARTICLE ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particleCanvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const numberOfParticles = 100

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.1
      }
      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].size <= 0.2) {
          particles.splice(i, 1)
          i--
          particles.push(new Particle())
        }
      }
      requestAnimationFrame(animateParticles)
    }

    init()
    animateParticles()

    // Update canvas size on window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }
})