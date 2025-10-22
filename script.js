// Global variables for data
let helpRequests = [];
let helpers = [];

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

// Function to fetch data from server
async function fetchData() {
    try {
        // Fetch help requests from server
        const requestsResponse = await fetch('/api/requests');
        if (requestsResponse.ok) {
            helpRequests = await requestsResponse.json();
        } else {
            throw new Error('Failed to fetch requests');
        }
        
        // Fetch helpers from server
        const helpersResponse = await fetch('/api/helpers');
        if (helpersResponse.ok) {
            helpers = await helpersResponse.json();
        } else {
            throw new Error('Failed to fetch helpers');
        }
        
        // Display the data
        displayRequests();
        displayHelpers();
    } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to sample data
        displayRequests();
        displayHelpers();
    }
}

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
                ${request.urgency ? `<span class="urgency-tag urgency-${request.urgency}">${request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}</span>` : ''}
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
            ${helper.bio ? `<p><strong>Bio:</strong> ${helper.bio}</p>` : ''}
            <p><strong>Availability:</strong> ${helper.availability}</p>
            <p><strong>Contact:</strong> ${contactMethodNames[helper.contact_method] || helper.contact_method}: ${helper.contact_info}</p>
            <div class="meta">
                <span><i class="far fa-clock"></i> Registered on: ${helper.timestamp}</span>
                <button class="contact-btn" onclick="contactHelperDirect('${helper.contact_info}')">
                    <i class="fas fa-envelope"></i> Contact Directly
                </button>
            </div>
        </div>
    `).join('');
}

// Function to handle help request form submission
document.getElementById('helpForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('helpTitle').value;
    const category = document.getElementById('helpCategory').value;
    const description = document.getElementById('helpDescription').value;
    const location = document.getElementById('helpLocation').value;
    const urgency = document.getElementById('helpUrgency').value;
    
    try {
        const response = await fetch('/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                category,
                description,
                location,
                urgency,
                timestamp: new Date().toLocaleString()
            })
        });
        
        if (response.ok) {
            const newRequest = await response.json();
            helpRequests.push(newRequest);
            displayRequests(document.getElementById('categoryFilter').value);
            
            // Reset form
            this.reset();
            
            // Show success message
            showMessage('Your help request has been posted successfully!', 'success');
            
            // Scroll to requests section
            document.getElementById('requests').scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error('Failed to submit request');
        }
    } catch (error) {
        console.error('Error submitting request:', error);
        showMessage('Failed to submit your request. Please try again.', 'error');
    }
});

// Function to handle offer help form submission
document.getElementById('offerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Check if terms agreement is checked
    if (!document.getElementById('termsAgreement').checked) {
        showMessage('Please agree to the terms before submitting.', 'error');
        return;
    }
    
    const name = document.getElementById('helperName').value;
    const skill = document.getElementById('skill').value;
    const category = document.getElementById('skillCategory').value;
    const availability = document.getElementById('availability').value;
    const contactMethod = document.getElementById('contactMethod').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const bio = document.getElementById('helperBio').value;
    
    try {
        const response = await fetch('/api/helpers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                skill,
                category,
                availability,
                contactMethod,
                contactInfo,
                bio,
                timestamp: new Date().toLocaleString()
            })
        });
        
        if (response.ok) {
            const newHelper = await response.json();
            helpers.push(newHelper);
            displayHelpers(document.getElementById('helperCategoryFilter').value);
            
            // Reset form
            this.reset();
            
            // Show success message
            showMessage(`Thank you ${name} for offering to help with ${skill}! Your information has been recorded.`, 'success');
            
            // Scroll to helpers directory
            document.getElementById('helpers-directory').scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error('Failed to submit helper information');
        }
    } catch (error) {
        console.error('Error submitting helper information:', error);
        showMessage('Failed to submit your helper information. Please try again.', 'error');
    }
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
    fetchData();
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