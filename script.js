// Design insights data
const designInsights = [
  "The human brain processes images 60,000 times faster than text",
  "Color increases brand recognition by up to 80%",
  "People remember only 20% of what they read, but 80% of what they see",
  "The most popular color in logo design is blue",
  "Good design can increase website conversion rates by 200%",
  "Users form an opinion about your design in 50 milliseconds",
  "White space can increase comprehension by 20%",
  "Visual content is 40 times more likely to be shared on social media",
  "Minimalist design can improve user focus by 40%",
  "The Golden Ratio (1:1.618) is often used in logo design",
  "Red creates urgency and is often used for clearance sales",
  "47% of users expect a web page to load in 2 seconds or less",
  "Asymmetric layouts create visual interest and movement",
  "Mobile devices account for over 50% of web traffic worldwide",
  "The average attention span for online content is 8 seconds",
  "95% of people say visuals are key when making purchasing decisions",
  "Good typography can improve reading speed by 30%",
  "Consistent branding increases revenue by 23% on average",
  "Gestalt principles explain how humans perceive visual elements",
  "Z-pattern layout follows natural eye movement for Western readers",
];

// Tool colors mapping
const toolColors = {
  photoshop: "#FF1493",
  illustrator: "#00CED1",
  canva: "#6A0DAD",
  corel: "#FF8C00",
  other: "#9D00FF",
  figma: "#20B2AA",
};

// Category colors
const categoryColors = {
  posters: "linear-gradient(135deg, #6A0DAD, #9D00FF)",
  logos: "linear-gradient(135deg, #00CED1, #20B2AA)",
  branding: "linear-gradient(135deg, #FF8C00, #FF1493)",
  social: "linear-gradient(135deg, #FF1493, #6A0DAD)",
  experimental: "linear-gradient(135deg, #9D00FF, #00CED1)",
};

// DOM Elements
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryGrid = document.querySelector(".gallery-grid");
const insightText = document.getElementById("insightText");
const newInsightBtn = document.getElementById("newInsight");
const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxTools = document.getElementById("lightboxTools");

// Current state
let currentFilter = "all";
let usedInsights = [];
let currentInsightIndex = 0;

// Initialize gallery items with colors
function initializeGalleryItems() {
  galleryItems.forEach((item, index) => {
    const category = item.getAttribute("data-category");
    const imageSrc = item.getAttribute("data-image");
    const preview = item.querySelector(".item-preview");
    const tags = item.querySelectorAll(".tag");

    // Set background color based on category
    preview.style.background =
      categoryColors[category] || categoryColors["posters"];

    // Style the tags with colors based on tool
    tags.forEach((tag) => {
      const toolName = tag.textContent.toLowerCase();
      if (toolColors[toolName]) {
        tag.style.backgroundColor = toolColors[toolName];
      }
    });

    // Try to load the image
    if (imageSrc) {
      const img = new Image();
      img.onload = function () {
        preview.style.backgroundImage = `url(${imageSrc})`;
        preview.style.backgroundSize = "cover";
        preview.style.backgroundPosition = "center";
        preview.innerHTML = "";
      };
      img.onerror = function () {
        // If image fails to load, show category name with nice styling
        preview.innerHTML = `<div class="category-placeholder">
                    <span>${category.toUpperCase()}</span>
                    <small>Click to view details</small>
                </div>`;
        preview.style.display = "flex";
        preview.style.alignItems = "center";
        preview.style.justifyContent = "center";
        preview.style.color = "white";
        preview.style.fontWeight = "bold";
        preview.style.textShadow = "0 2px 10px rgba(0,0,0,0.3)";
      };
      img.src = imageSrc;
    }

    // Add click event
    item.addEventListener("click", () => openLightbox(item));
  });
}

// Format category for display
function formatCategory(category) {
  const categories = {
    posters: "Poster Design",
    logos: "Logo Design",
    branding: "Brand Identity",
    social: "Social Media Graphics",
    experimental: "Experimental Design",
  };
  return (
    categories[category] || category.charAt(0).toUpperCase() + category.slice(1)
  );
}

// Format tool name for display
function formatToolName(tool) {
  const toolNames = {
    photoshop: "Adobe Photoshop",
    illustrator: "Adobe Illustrator",
    canva: "Canva Pro",
    corel: "CorelDRAW",
    figma: "Figma",
    other: "Other Tools",
  };
  return toolNames[tool] || tool.charAt(0).toUpperCase() + tool.slice(1);
}

// Open lightbox
function openLightbox(item) {
  const title =
    item.getAttribute("data-title") || item.querySelector("h3").textContent;
  const description =
    item.getAttribute("data-description") ||
    item.querySelector("p").textContent;
  const category = item.getAttribute("data-category");
  const tools = (item.getAttribute("data-tools") || "").split(",");
  const imageSrc = item.getAttribute("data-image");

  lightboxTitle.textContent = title;
  lightboxDescription.textContent = description;

  // Set image or background
  if (imageSrc) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = title;
    lightboxImage.style.display = "block";
    document.querySelector(".lightbox-image-container").style.background =
      "none";
  } else {
    // Use category gradient as background
    lightboxImage.style.display = "none";
    document.querySelector(".lightbox-image-container").style.background =
      categoryColors[category] || categoryColors["posters"];
  }

  // Generate tool tags with colors
  lightboxTools.innerHTML = "";
  tools.forEach((tool) => {
    const cleanTool = tool.trim();
    if (cleanTool) {
      const toolSpan = document.createElement("span");
      toolSpan.className = "tag";
      toolSpan.textContent = formatToolName(cleanTool);
      toolSpan.style.backgroundColor =
        toolColors[cleanTool] || toolColors["other"];
      toolSpan.style.margin = "0.25rem 0.5rem 0.25rem 0";
      toolSpan.style.padding = "0.5rem 1rem";
      toolSpan.style.borderRadius = "20px";
      toolSpan.style.fontSize = "0.9rem";
      toolSpan.style.color = "white";
      toolSpan.style.fontWeight = "600";
      toolSpan.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
      toolSpan.style.display = "inline-block";
      lightboxTools.appendChild(toolSpan);
    }
  });

  // Add category badge
  const categorySpan = document.createElement("span");
  categorySpan.className = "tag";
  categorySpan.textContent = formatCategory(category);
  categorySpan.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
  categorySpan.style.border = "1px solid rgba(255, 255, 255, 0.2)";
  categorySpan.style.margin = "0.25rem 0.5rem 0.25rem 0";
  categorySpan.style.padding = "0.5rem 1rem";
  categorySpan.style.borderRadius = "20px";
  categorySpan.style.fontSize = "0.9rem";
  categorySpan.style.color = "#E6E0FF";
  categorySpan.style.fontWeight = "600";
  lightboxTools.prepend(categorySpan);

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close lightbox
function closeLightboxHandler() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Filter gallery items
function filterGallery() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      currentFilter = button.getAttribute("data-filter");

      // Show/hide items based on filter
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (currentFilter === "all" || category === currentFilter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0) scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px) scale(0.95)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Design insights functionality
function getRandomInsight() {
  // If we've shown all insights, reset
  if (usedInsights.length === designInsights.length) {
    usedInsights = [];
  }

  // Get a random insight not shown recently
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * designInsights.length);
  } while (
    usedInsights.includes(randomIndex) &&
    usedInsights.length < designInsights.length
  );

  usedInsights.push(randomIndex);
  insightText.textContent = designInsights[randomIndex];

  // Animation
  insightText.style.opacity = "0";
  insightText.style.transform = "translateY(10px)";

  setTimeout(() => {
    insightText.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    insightText.style.opacity = "1";
    insightText.style.transform = "translateY(0)";
  }, 10);

  // Button animation
  newInsightBtn.style.transform = "rotate(360deg)";
  setTimeout(() => {
    newInsightBtn.style.transition = "transform 0.6s ease";
    newInsightBtn.style.transform = "rotate(0deg)";
  }, 600);
}

// Add CSS for category placeholder
function addCategoryPlaceholderStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .category-placeholder {
            text-align: center;
            padding: 2rem;
        }
        
        .category-placeholder span {
            font-size: 1.5rem;
            font-weight: 700;
            display: block;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        
        .category-placeholder small {
            font-size: 0.9rem;
            opacity: 0.8;
            font-weight: 500;
        }
        
        .code-comment {
            color: #20B2AA;
            font-style: italic;
        }
    `;
  document.head.appendChild(style);
}

// Animate elements on scroll
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  document
    .querySelectorAll(".tool-card, .gallery-item, .contact-card, .insight-card")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Add smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");

        // Smooth scroll
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Add CSS for placeholders
  addCategoryPlaceholderStyles();

  // Initialize gallery
  initializeGalleryItems();

  // Get first insight
  getRandomInsight();

  // Setup filter functionality
  filterGallery();

  // Setup event listeners
  newInsightBtn.addEventListener("click", getRandomInsight);
  closeLightbox.addEventListener("click", closeLightboxHandler);

  // Close lightbox when clicking outside or pressing Escape
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightboxHandler();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightboxHandler();
    }
  });

  // Setup scroll animations
  setupScrollAnimations();

  // Setup smooth scrolling
  setupSmoothScrolling();

  // Add initial animation to hero elements
  setTimeout(() => {
    document.querySelectorAll(".color-dot").forEach((dot, index) => {
      dot.style.animationDelay = `${index * 0.1}s`;
    });
  }, 500);
});

// Add CSS for scroll animations
window.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
        .tool-card, .gallery-item, .contact-card, .insight-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .tool-card.animated, 
        .gallery-item.animated, 
        .contact-card.animated, 
        .insight-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .gallery-item {
            transition: opacity 0.5s ease, transform 0.5s ease, display 0.5s ease;
        }
    `;
  document.head.appendChild(style);
});
