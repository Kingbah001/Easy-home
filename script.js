// Easy Hostel - JavaScript

// ========================================
// Global Variables
// ========================================
const hostelData = [
    {
        id: 1,
        name: "Royal Nest Hostel",
        location: "UI Road, Opp. University of Ibadan",
        university: "University of Ibadan",
        price: 350000,
        distance: 0.5,
        type: "self-contain",
        features: ["WiFi", "24/7 Light", "Security", "Parking"],
        roomSize: "12x14 ft",
        description: "Modern self-contain rooms with premium amenities, located just 0.5km from UI main gate. Perfect for students who want comfort and convenience.",
        phone: "+2348012345678",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Student Haven",
        location: "Akoka Road, UNILAG",
        university: "University of Lagos",
        price: 280000,
        distance: 1.2,
        type: "shared",
        features: ["24/7 Light", "Kitchen", "Security"],
        roomSize: "10x12 ft",
        description: "Affordable shared accommodation for UNILAG students. Clean, safe, and close to campus.",
        phone: "+2348012345679",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Scholar's Lodge",
        location: "Bodija, Oyewole Estate",
        university: "University of Ibadan",
        price: 450000,
        distance: 0.8,
        type: "single",
        features: ["AC Ready", "WiFi", "24/7 Light", "Hot Water"],
        roomSize: "14x16 ft",
        description: "Premium single rooms with air conditioning infrastructure. Study-friendly environment with consistent power supply.",
        phone: "+2348012345680",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Campus View Apartments",
        location: "Gwagwalada, Abuja",
        university: "University of Abuja",
        price: 320000,
        distance: 2.0,
        type: "self-contain",
        features: ["Parking", "Security", "WiFi", "Water"],
        roomSize: "12x12 ft",
        description: "Spacious self-contain apartments in peaceful Gwagwalada area. Great for UniAbuja students.",
        phone: "+2348012345681",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Budget Stay Hostel",
        location: "Ojo, Lagos State University",
        university: "Lagos State University",
        price: 200000,
        distance: 3.5,
        type: "shared",
        features: ["Kitchen", "Security", "Laundry"],
        roomSize: "8x10 ft",
        description: "Most affordable option for LASU students. Clean shared rooms with basic amenities.",
        phone: "+2348012345682",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Premier Student Suites",
        location: "Zaria Road, ABU Zaria",
        university: "Ahmadu Bello University",
        price: 550000,
        distance: 0.3,
        type: "apartment",
        features: ["Hot Water", "WiFi", "24/7 Light", "Security", "AC"],
        roomSize: "16x18 ft",
        description: "Luxury 2-bedroom apartments just 300m from ABU main campus. Premium amenities for serious students.",
        phone: "+2348012345683",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop"
    }
];

// ========================================
// DOM Elements
// ========================================
const searchInput = document.getElementById('searchInput');
const priceFilter = document.getElementById('priceFilter');
const roomTypeFilter = document.getElementById('roomTypeFilter');
const distanceFilter = document.getElementById('distanceFilter');
const hostelGrid = document.getElementById('hostelGrid');
const hostelModal = document.getElementById('hostelModal');
const landlordModal = document.getElementById('landlordModal');
const successMessage = document.getElementById('successMessage');

// ========================================
// Search & Filter Functions
// ========================================

// Handle search input
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filterHostels(searchTerm);
}

// Filter hostels based on all criteria
function filterHostels(searchTerm = '') {
    const priceRange = priceFilter.value;
    const roomType = roomTypeFilter.value;
    const distance = distanceFilter.value;
    
    // Get all hostel cards
    const cards = document.querySelectorAll('.hostel-card');
    
    cards.forEach(card => {
        const cardPrice = parseInt(card.dataset.price);
        const cardDistance = parseFloat(card.dataset.distance);
        const cardType = card.dataset.type;
        
        const cardText = card.textContent.toLowerCase();
        
        // Check search term
        const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
        
        // Check price range
        let matchesPrice = true;
        if (priceRange) {
            if (priceRange === '800+') {
                matchesPrice = cardPrice >= 800000;
            } else {
                const [min, max] = priceRange.split('-').map(Number);
                matchesPrice = cardPrice >= min && cardPrice <= max;
            }
        }
        
        // Check room type
        let matchesType = true;
        if (roomType) {
            matchesType = cardType === roomType;
        }
        
        // Check distance
        let matchesDistance = true;
        if (distance) {
            if (distance === '5+') {
                matchesDistance = cardDistance >= 5;
            } else {
                const [min, max] = distance.split('-').map(Number);
                matchesDistance = cardDistance >= min && cardDistance <= max;
            }
        }
        
        // Show/hide card
        if (matchesSearch && matchesPrice && matchesType && matchesDistance) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    updateResultsCount();
}

// Show all hostels
function showAllHostels() {
    // Reset all filters
    searchInput.value = '';
    priceFilter.value = '';
    roomTypeFilter.value = '';
    distanceFilter.value = '';
    
    // Show all cards
    const cards = document.querySelectorAll('.hostel-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
    
    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const visibleCards = Array.from(document.querySelectorAll('.hostel-card'))
        .filter(card => card.style.display !== 'none');
    
    // Could add a counter element here if needed
    console.log(`Showing ${visibleCards.length} hostels`);
}

// ========================================
// Hostel Modal Functions
// ========================================

// Open hostel details modal
function openHostelModal(hostelName) {
    // Find hostel data
    const hostel = hostelData.find(h => h.name === hostelName) || getHostelFromCard(hostelName);
    
    if (!hostel) {
        console.error('Hostel not found:', hostelName);
        return;
    }
    
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <img src="${hostel.image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop'}" 
             alt="${hostel.name}" class="modal-hostel-image">
        
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
            <h3>${hostel.name}</h3>
            <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
        </div>
        
        <p class="modal-location">
            <i class="fas fa-map-marker-alt"></i> ${hostel.location}
        </p>
        
        <div class="modal-details">
            <div class="modal-detail-item">
                <i class="fas fa-bed"></i>
                <span>${formatRoomType(hostel.type)}</span>
            </div>
            <div class="modal-detail-item">
                <i class="fas fa-ruler-combined"></i>
                <span>${hostel.roomSize || 'Standard'}</span>
            </div>
            <div class="modal-detail-item">
                <i class="fas fa-location-arrow"></i>
                <span>${hostel.distance} km to campus</span>
            </div>
            <div class="modal-detail-item">
                <i class="fas fa-money-bill-wave"></i>
                <span>₦${hostel.price.toLocaleString()}/year</span>
            </div>
        </div>
        
        <div class="modal-description">
            <h4>Amenities</h4>
            <div class="hostel-features" style="margin-top: 10px;">
                ${(hostel.features || ['WiFi', '24/7 Light', 'Security']).map(f => `
                    <span><i class="fas fa-check"></i> ${f}</span>
                `).join('')}
            </div>
        </div>
        
        <div class="modal-description">
            <h4>Description</h4>
            <p>${hostel.description || 'Quality student accommodation with all essential amenities. Safe environment perfect for studying.'}</p>
        </div>
        
        <div class="modal-contact">
            <button class="btn-primary" onclick="alert('Booking feature coming soon!')">
                <i class="fas fa-calendar-check"></i> Book Now
            </button>
            <div class="contact-btns">
                <a href="tel:${hostel.phone}" class="btn-call"><i class="fas fa-phone"></i></a>
                <a href="https://wa.me/${hostel.phone.replace(/\D/g, '')}" class="btn-whatsapp" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        </div>
    `;
    
    hostelModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Get hostel data from card (fallback)
function getHostelFromCard(name) {
    const card = Array.from(document.querySelectorAll('.hostel-card'))
        .find(c => c.querySelector('h3').textContent === name);
    
    if (card) {
        return {
            name: name,
            location: card.querySelector('.location').textContent,
            price: parseInt(card.dataset.price),
            distance: parseFloat(card.dataset.distance),
            type: card.dataset.type,
            description: 'Quality student accommodation with all essential amenities.',
            phone: '+2348012345678',
            image: card.querySelector('.hostel-image img').src
        };
    }
    return null;
}

// Format room type for display
function formatRoomType(type) {
    const types = {
        'single': 'Single Room',
        'shared': 'Shared Room',
        'self-contain': 'Self-Contain',
        'apartment': 'Apartment'
    };
    return types[type] || type;
}

// Close hostel modal
function closeHostelModal() {
    hostelModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========================================
// Landlord Modal Functions
// ========================================

// Open landlord form modal
function openLandlordModal() {
    landlordModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close landlord modal
function closeLandlordModal() {
    landlordModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Submit landlord form
function submitLandlordForm(event) {
    event.preventDefault();
    
    // Get form data
    const form = document.getElementById('landlordForm');
    const formData = new FormData(form);
    
    // Collect amenities
    const amenities = [];
    formData.getAll('amenities').forEach(amenity => {
        amenities.push(amenity);
    });
    
    // Create listing object
    const listing = {
        propertyName: formData.get('propertyName'),
        propertyType: formData.get('propertyType'),
        university: formData.get('university'),
        distance: formData.get('distance'),
        price: formData.get('price'),
        rooms: formData.get('rooms'),
        ownerName: formData.get('ownerName'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        amenities: amenities,
        description: formData.get('description')
    };
    
    // Log the listing (in production, this would be sent to a server)
    console.log('New Listing Submitted:', listing);
    
    // Show success message
    showSuccess('Property listed successfully! We will contact you soon.');
    
    // Close modal and reset form
    closeLandlordModal();
    form.reset();
}

// ========================================
// Success Message
// ========================================

// Show success message
function showSuccess(message) {
    const successText = document.getElementById('successText');
    successText.textContent = message;
    successMessage.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// ========================================
// Navigation & Mobile Menu
// ========================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        
        // Create mobile menu if not exists
        if (!document.querySelector('.mobile-menu')) {
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <ul>
                    <li><a href="#home" onclick="closeMobileMenu()">Home</a></li>
                    <li><a href="#hostels" onclick="closeMobileMenu()">Hostels</a></li>
                    <li><a href="#how-it-works" onclick="closeMobileMenu()">How It Works</a></li>
                    <li><a href="#why-us" onclick="closeMobileMenu()">Why Us</a></li>
                    <li><a href="#contact" onclick="closeMobileMenu()">Contact</a></li>
                    <li><a href="landlord-dashboard.html" class="dashboard-link">Dashboard</a></li>
                </ul>
            `;
            navbar.querySelector('.container').appendChild(mobileMenu);
            
            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    width: 100%;
                    background: white;
                    padding: 0;
                    box-shadow: var(--shadow-md);
                    display: none;
                    z-index: 999;
                }
                .mobile-menu.active {
                    display: block;
                }
                .mobile-menu ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                }
                .mobile-menu ul li {
                    padding: 15px 20px;
                    border-bottom: 1px solid var(--gray-200);
                    width: 100%;
                }
                .mobile-menu ul li:last-child {
                    border-bottom: none;
                }
                .mobile-menu ul li a {
                    color: var(--gray-700);
                    font-weight: 500;
                    display: block;
                    width: 100%;
                }
                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.querySelector('.mobile-menu').classList.toggle('active');
    });
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ========================================
// Smooth Scroll for Navigation
// ========================================

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Search on Enter Key
// ========================================

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// ========================================
// Initialize
// ========================================

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Easy Hostel - Loaded successfully');
    
    // Preload images for faster experience
    preloadImages();
    
    // Add animation to cards on scroll
    initScrollAnimations();
});

// Preload hostel images
function preloadImages() {
    hostelData.forEach(hostel => {
        if (hostel.image) {
            const img = new Image();
            img.src = hostel.image;
        }
    });
}

// Scroll animations
function initScrollAnimations() {
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
    
    // Observe all cards
    document.querySelectorAll('.hostel-card, .step, .feature-card, .university-card').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Utility Functions
// ========================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(amount);
}

// Validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

// ========================================
// Modal Close on Escape Key
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeHostelModal();
        closeLandlordModal();
    }
});

// ========================================
// Close Modal on Outside Click
// ========================================

hostelModal.addEventListener('click', (e) => {
    if (e.target === hostelModal) {
        closeHostelModal();
    }
});

landlordModal.addEventListener('click', (e) => {
    if (e.target === landlordModal) {
        closeLandlordModal();
    }
});

// ========================================
// Additional Filter Functions
// ========================================

// Clear all filters
function clearFilters() {
    searchInput.value = '';
    priceFilter.value = '';
    roomTypeFilter.value = '';
    distanceFilter.value = '';
    
    filterHostels();
}

// Sort hostels
function sortHostels(sortBy) {
    const cards = Array.from(document.querySelectorAll('.hostel-card'));
    
    cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);
        const distanceA = parseFloat(a.dataset.distance);
        const distanceB = parseFloat(b.dataset.distance);
        
        switch(sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'distance':
                return distanceA - distanceB;
            default:
                return 0;
        }
    });
    
    cards.forEach(card => {
        hostelGrid.appendChild(card);
    });
}

// ========================================
 // Messaging Functionality
// ========================================
let currentConvoId = null;
let conversations = [
    {
        id: 'emily',
        name: 'Emily Davis',
        hostel: 'Royal Nest Hostel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        lastMessage: 'Hi, is Room 105 still available for October?',
        lastTime: '10:32',
        unread: 2,
        online: true,
        messages: [
            { text: 'Hi John! Is Room 105 still available for October?', sender: 'student', time: '10:25' },
            { text: 'Yes, it\'s available. Would you like to schedule a viewing?', sender: 'landlord', time: '10:28' },
            { text: 'Perfect! When is the best time?', sender: 'student', time: '10:32' }
        ]
    },
    {
        id: 'james',
        name: 'James Wilson',
        hostel: "Scholar's Lodge",
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        lastMessage: 'Thanks for the info!',
        lastTime: '09:15',
        unread: 0,
        online: false,
        messages: [
            { text: 'Is the WiFi available 24/7 at Scholar\'s Lodge?', sender: 'student', time: '09:10' },
            { text: 'Yes, we have unlimited fiber optic internet available 24/7.', sender: 'landlord', time: '09:12' },
            { text: 'Thanks for the info! Great to hear.', sender: 'student', time: '09:15' }
        ]
    },
    {
        id: 'sarah',
        name: 'Sarah Johnson',
        hostel: 'Student Haven',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face',
        lastMessage: 'Please confirm Room B4 ASAP',
        lastTime: 'Yesterday',
        unread: 1,
        online: true,
        messages: [
            { text: 'Please confirm my booking for Room B4 ASAP. I need to make arrangements.', sender: 'student', time: '06:45' }
        ]
    }
];

// Dashboard Messaging Integration
let messagingInitialized = false; // Removed guard for reliable init

// Robust messaging init - called on Messages activation
function initDashboardMessaging() {
    console.log('🔥 initDashboardMessaging() called');
    loadConversationsFromStorage();
    
    // Always force re-init on Messages tab (no guard)
    initMessaging();
    
    // Extra safety: force conversations load
    setTimeout(() => {
        loadConversations();
        if (conversations.length > 0) {
            switchConversation(conversations[0].id);
        }
        console.log('✅ Messaging: Chat-list populated + first convo loaded');
    }, 100);
}

// DOM Ready + Navigation Handlers
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM loaded - setting up messaging handlers');
    
    // Initial attempt
    setTimeout(initDashboardMessaging, 500);
    
    // Direct Messages nav handler (most reliable)
    document.addEventListener('click', function(e) {
        const navItem = e.target.closest('.nav-item[data-section="messages"]');
        if (navItem) {
            console.log('🎯 Messages nav clicked → forcing init');
            setTimeout(initDashboardMessaging, 50);
        }
    });
    
    // Section change observer
    const sectionObserver = new MutationObserver(function(mutations) {
        mutations.forEach(() => {
            if (document.querySelector('.dashboard-section.active#messages')) {
                console.log('📂 Messages section activated → init messaging');
                initDashboardMessaging();
            }
        });
    });
    sectionObserver.observe(document.body, { 
        childList: true, 
        subtree: true, 
        attributes: true, 
        attributeFilter: ['class'] 
    });
    
    // Safety net: every 2s check if Messages active but not inited
    setInterval(() => {
        if (document.querySelector('.dashboard-section.active#messages') && 
            !document.querySelector('#chatList .conversation-item')) {
            console.log('🆘 Safety init triggered');
            initDashboardMessaging();
        }
    }, 2000);
});

function initMessaging() {
    // Safe element access
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const convoSearch = document.getElementById('convoSearch');
    
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        messageInput.addEventListener('input', function() {
            if (sendBtn) sendBtn.disabled = this.value.trim() === '';
        });
    }
    
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    
    if (convoSearch) convoSearch.addEventListener('input', filterConversations);
    
    loadConversations();
    
    // Load first conversation by default
    if (conversations.length > 0) {
        switchConversation(conversations[0].id);
    }
}

function loadConversations() {
    const list = document.querySelector('#chatList') || document.getElementById('conversationsList');
    if (!list) return;
    list.innerHTML = conversations.map(convo => `
        <div class="conversation-item ${convo.unread > 0 ? 'unread' : ''} ${currentConvoId === convo.id ? 'active' : ''}" data-id="${convo.id}">
            <img src="${convo.avatar}" alt="${convo.name}" class="conversation-avatar">
            <div class="conversation-info">
                <h4>${convo.name}</h4>
                <span class="conversation-hostel">${convo.hostel}</span>
                <p class="conversation-preview">${convo.lastMessage}</p>
            </div>
            <div>
                ${convo.unread > 0 ? `<span class="unread-dot"></span>` : ''}
                <span class="conversation-time">${convo.lastTime}</span>
            </div>
        </div>
    `).join('');
    
    // Add click listeners
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            switchConversation(id);
        });
    });
}

function switchConversation(id) {
    currentConvoId = id;
    const convo = conversations.find(c => c.id === id);
    if (!convo) return;
    
    // Update header - dashboard compatible
    const chatName = document.querySelector('#chat-name') || document.querySelector('.chat-name');
    const chatHostel = document.querySelector('.chat-hostel');
    if (chatName) chatName.textContent = convo.name;
    if (chatHostel) chatHostel.textContent = convo.hostel;
    const status = document.querySelector('.chat-status');
    status.className = `chat-status ${convo.online ? 'online' : 'offline'}`;
    status.innerHTML = `<i class="fas fa-circle"></i> ${convo.online ? 'Online' : 'Offline'}`;
    
    // Update avatar
    document.querySelector('.chat-avatar img').src = convo.avatar;
    
    // Load messages - dashboard compatible
    const container = document.querySelector('#messages') || document.getElementById('messagesContainer');
    if (!container) return;
    container.innerHTML = convo.messages.map(msg => `
        <div class="message ${msg.sender}">
            ${msg.sender === 'student' ? `<img src="${convo.avatar}" alt="${convo.name}" class="message-avatar-small">` : ''}
            <div>
                <div class="message-bubble">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            </div>
            ${msg.sender === 'landlord' ? `<img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="You" class="message-avatar-small">` : ''}
        </div>
    `).join('');
    
    // Scroll to bottom
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
    container.scrollLeft = 0;
    
    // Update active conversation
    loadConversations();
    
    // Clear unread if any
    convo.unread = 0;
    updateConvoPreview(id);
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text || !currentConvoId) return;
    
    const convo = conversations.find(c => c.id === currentConvoId);
    const time = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    const message = {
        text: text,
        sender: 'landlord',
        time: time
    };
    
    convo.messages.push(message);
    convo.lastMessage = text;
    convo.lastTime = time;
    
    input.value = '';
    document.getElementById('sendBtn').disabled = true;
    
    // Reload current chat
    switchConversation(currentConvoId);
    
    // Save to localStorage
    saveConversations();
}

function updateConvoPreview(id) {
    const convo = conversations.find(c => c.id === id);
    if (convo) {
        convo.lastMessage = convo.messages[convo.messages.length - 1]?.text || 'No messages yet';
        convo.lastTime = convo.messages[convo.messages.length - 1]?.time || '';
    }
    loadConversations();
}

document.getElementById('messageInput').addEventListener('input', function() {
    document.getElementById('sendBtn').disabled = this.value.trim() === '';
});

function filterConversations() {
    const search = document.getElementById('convoSearch').value.toLowerCase();
    const items = document.querySelectorAll('.conversation-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(search) ? 'flex' : 'none';
    });
}

function saveConversations() {
    localStorage.setItem('easyHostelConversations', JSON.stringify(conversations));
}

function loadConversationsFromStorage() {
    const saved = localStorage.getItem('easyHostelConversations');
    if (saved) {
        conversations = JSON.parse(saved);
    }
}

// Load on page load
loadConversationsFromStorage();

// ========================================
// Export for potential module use
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterHostels,
        handleSearch,
        openHostelModal,
        closeHostelModal,
        openLandlordModal,
        closeLandlordModal,
        submitLandlordForm,
        hostelData
    };
}

