// Sample data to start with
let helpRequests = [
    {
        id: 1,
        title: "Need help with cooking pasta",
        category: "cooking",
        description: "I'm new to cooking and don't know how to cook pasta properly. Would appreciate someone showing me the basics!",
        location: "My house",
        timestamp: new Date().toLocaleString()
    },
    {
        id: 2,
        title: "Computer repair help needed",
        category: "tech",
        description: "My laptop is running very slowly and I think it needs cleaning. Need someone who knows about computer hardware.",
        location: "Online",
        timestamp: new Date().toLocaleString()
    },
    {
        id: 3,
        title: "Budget planning for household",
        category: "finance",
        description: "Having trouble managing my monthly budget. Need advice on how to save money while covering all expenses.",
        location: "Coffee shop near downtown",
        timestamp: new Date().toLocaleString()
    }
];

// Sample helpers data
let helpers = [
    {
        id: 1,
        name: "Alex Johnson",
        skill: "Cooking",
        category: "cooking",
        availability: "Weekends and evenings",
        contactMethod: "email",
        contactInfo: "alex.cooking@example.com",
        timestamp: new Date().toLocaleString()
    },
    {
        id: 2,
        name: "Sam Wilson",
        skill: "Computer Repair",
        category: "tech",
        availability: "Weekdays after 5pm",
        contactMethod: "phone",
        contactInfo: "+1 (555) 123-4567",
        timestamp: new Date().toLocaleString()
    }
];

// Category display names
const categoryNames = {
    cooking: "Cooking & Nutrition",
    study: "Study & Education",
    tech: "Technology",
    health: "Health & Wellness",
    finance: "Finance & Budgeting",
    home: "Home Maintenance",
    creative: "Creative Skills",
    other: "Other"
};

// Contact method display names
const contactMethodNames = {
    email: "Email",
    phone: "Phone",
    inperson: "In-person",
    video: "Video Call"
};

// Function to display help requests
function displayRequests(categoryFilter = 'all') {
    const container = document.getElementById('requestsContainer');
    
    // Filter requests by category if not 'all'
    let filteredRequests = helpRequests;
    if (categoryFilter !== 'all') {
        filteredRequests = helpRequests.filter(request => request.category === categoryFilter);
    }
    
    if (filteredRequests.length === 0) {
        container.innerHTML = '<div class="card"><p>No help requests found. Be the first to ask!</p></div>';
        return;
    }
    
    container.innerHTML = filteredRequests.map(request => `
        <div class="request-card">
            <h3>
                <i class="fas fa-question-circle"></i> ${request.title}
                <span class="category-tag">${categoryNames[request.category] || request.category}</span>
            </h3>
            <p>${request.description}</p>
            <p><strong>Location:</strong> ${request.location || 'Not specified'}</p>
            <div class="meta">
                <span><i class="far fa-clock"></i> Posted on: ${request.timestamp}</span>
                <button class="contact-btn" onclick="contactHelper(${request.id})">
                    <i class="fas fa-envelope"></i> Contact Helper
                </button>
            </div>
        </div>
    `).join('');
}

// Function to display helpers
function displayHelpers(categoryFilter = 'all') {
    const container = document.getElementById('helpersContainer');
    
    // Filter helpers by category if not 'all'
    let filteredHelpers = helpers;
    if (categoryFilter !== 'all') {
        filteredHelpers = helpers.filter(helper => helper.category === categoryFilter);
    }
    
    if (filteredHelpers.length === 0) {
        container.innerHTML = '<div class="card"><p>No helpers registered yet. Be the first to offer your help!</p></div>';
        return;
    }
    
    container.innerHTML = filteredHelpers.map(helper => `
        <div class="helper-card">
            <h3>
                <i class="fas fa-user"></i> ${helper.name}
                <span class="category-tag">${categoryNames[helper.category] || helper.category}</span>
            </h3>
            <p><strong>Skill:</strong> ${helper.skill}</p>
            <p><strong>Availability:</strong> ${helper.availability}</p>
            <p><strong>Contact:</strong> ${contactMethodNames[helper.contactMethod] || helper.contactMethod}: ${helper.contactInfo}</p>
            <div class="meta">
                <span><i class="far fa-clock"></i> Registered on: ${helper.timestamp}</span>
                <button class="contact-btn" onclick="contactHelperDirect('${helper.contactInfo}')">
                    <i class="fas fa-envelope"></i> Contact Directly
                </button>
            </div>
        </div>
    `).join('');
}

// Function to handle help request form submission
document.getElementById('helpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('helpTitle').value;
    const category = document.getElementById('helpCategory').value;
    const description = document.getElementById('helpDescription').value;
    const location = document.getElementById('helpLocation').value;
    
    const newRequest = {
        id: helpRequests.length > 0 ? Math.max(...helpRequests.map(r => r.id)) + 1 : 1,
        title: title,
        category: category,
        description: description,
        location: location,
        timestamp: new Date().toLocaleString()
    };
    
    helpRequests.push(newRequest);
    displayRequests(document.getElementById('categoryFilter').value);
    
    // Reset form
    this.reset();
    
    // Show success message
    showMessage('Your help request has been posted successfully!', 'success');
    
    // Scroll to requests section
    document.getElementById('requests').scrollIntoView({ behavior: 'smooth' });
});

// Function to handle offer help form submission
document.getElementById('offerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('helperName').value;
    const skill = document.getElementById('skill').value;
    const category = document.getElementById('skillCategory').value;
    const availability = document.getElementById('availability').value;
    const contactMethod = document.getElementById('contactMethod').value;
    const contactInfo = document.getElementById('contactInfo').value;
    
    const newHelper = {
        id: helpers.length > 0 ? Math.max(...helpers.map(h => h.id)) + 1 : 1,
        name: name,
        skill: skill,
        category: category,
        availability: availability,
        contactMethod: contactMethod,
        contactInfo: contactInfo,
        timestamp: new Date().toLocaleString()
    };
    
    helpers.push(newHelper);
    displayHelpers(document.getElementById('helperCategoryFilter').value);
    
    // Reset form
    this.reset();
    
    // Show success message
    showMessage(`Thank you ${name} for offering to help with ${skill}! Your information has been recorded.`, 'success');
    
    // Scroll to helpers directory
    document.getElementById('helpers-directory').scrollIntoView({ behavior: 'smooth' });
});

// Function to contact a helper (placeholder)
function contactHelper(requestId) {
    const request = helpRequests.find(r => r.id === requestId);
    if (request) {
        alert(`Connecting you with a helper for: ${request.title}
        \n\nIn a real application, this would open a chat or send a notification to the helper.
        \n\nRequest details:
        \n- Category: ${categoryNames[request.category] || request.category}
        \n- Description: ${request.description}
        \n- Location: ${request.location || 'Not specified'}
        \n- Posted: ${request.timestamp}`);
    }
}

// Function to contact a helper directly
function contactHelperDirect(contactInfo) {
    alert(`To contact this helper directly:
    \n- Contact Info: ${contactInfo}
    \n\nIn a real application, this would open your email client or phone app.`);
}

// Function to show messages to user
function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.innerHTML = `
        <div class="card">
            <p>${message}</p>
        </div>
    `;
    
    // Add styles for message
    const style = document.createElement('style');
    style.textContent = `
        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        }
        
        .message-success .card {
            border-left: 5px solid #4caf50;
            background-color: #e8f5e9;
        }
        
        .message-error .card {
            border-left: 5px solid #f44336;
            background-color: #ffebee;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .message {
                left: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add message to DOM
    document.body.appendChild(messageEl);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
}

// Function to filter requests by category
document.getElementById('categoryFilter').addEventListener('change', function() {
    displayRequests(this.value);
});

// Function to filter helpers by category
document.getElementById('helperCategoryFilter').addEventListener('change', function() {
    displayHelpers(this.value);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active class
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to new requests
function addNewRequestAnimation() {
    const requests = document.querySelectorAll('.request-card');
    requests.forEach((request, index) => {
        request.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayRequests();
    displayHelpers();
    addNewRequestAnimation();
    
    // Set first nav item as active
    document.querySelector('nav a').classList.add('active');
    
    // Add scroll animation to sections
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});