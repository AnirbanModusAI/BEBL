// Projects Page JavaScript

// Project data (100+ projects)
const projectsData = [
    // Heavy Engineering Projects (20 projects)
    ...Array.from({length: 20}, (_, i) => ({
        id: i + 1,
        title: `Heavy Engineering Project ${i + 1}`,
        category: 'heavy-engineering',
        description: `Advanced infrastructure development with cutting-edge engineering solutions. Project ${i + 1} showcases our expertise in heavy engineering.`,
        location: ['Mumbai, Maharashtra', 'Pune, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu'][i % 5],
        year: 2020 + (i % 5),
        status: i % 3 === 0 ? 'ongoing' : 'completed'
    })),
    
    // Special Projects (20 projects)
    ...Array.from({length: 20}, (_, i) => ({
        id: i + 21,
        title: `Special Project ${i + 1}`,
        category: 'special-projects',
        description: `Unique architectural marvel with innovative design concepts. Special Project ${i + 1} represents our creative excellence.`,
        location: ['Delhi, NCR', 'Mumbai, Maharashtra', 'Bangalore, Karnataka', 'Hyderabad, Telangana', 'Pune, Maharashtra'][i % 5],
        year: 2019 + (i % 6),
        status: i % 4 === 0 ? 'ongoing' : 'completed'
    })),
    
    // Utility Projects (20 projects)
    ...Array.from({length: 20}, (_, i) => ({
        id: i + 41,
        title: `Utility Project ${i + 1}`,
        category: 'utility',
        description: `Essential infrastructure development for urban growth. Utility Project ${i + 1} focuses on sustainable solutions.`,
        location: ['Chennai, Tamil Nadu', 'Hyderabad, Telangana', 'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka'][i % 5],
        year: 2018 + (i % 7),
        status: i % 5 === 0 ? 'ongoing' : 'completed'
    })),
    
    // Commercial Projects (20 projects)
    ...Array.from({length: 20}, (_, i) => ({
        id: i + 61,
        title: `Commercial Project ${i + 1}`,
        category: 'commercial',
        description: `Premium commercial complex with world-class amenities. Commercial Project ${i + 1} sets new standards in business infrastructure.`,
        location: ['Mumbai, Maharashtra', 'Gurgaon, Haryana', 'Bangalore, Karnataka', 'Delhi, NCR', 'Pune, Maharashtra'][i % 5],
        year: 2017 + (i % 8),
        status: i % 6 === 0 ? 'ongoing' : 'completed'
    })),
    
    // Residential Projects (20 projects)
    ...Array.from({length: 20}, (_, i) => ({
        id: i + 81,
        title: `Residential Project ${i + 1}`,
        category: 'residential',
        description: `Luxury residential development with premium amenities. Residential Project ${i + 1} offers modern living spaces.`,
        location: ['Bangalore, Karnataka', 'Pune, Maharashtra', 'Mumbai, Maharashtra', 'Delhi, NCR', 'Hyderabad, Telangana'][i % 5],
        year: 2016 + (i % 9),
        status: i % 7 === 0 ? 'ongoing' : 'completed'
    }))
];

// Initialize projects page
document.addEventListener('DOMContentLoaded', function() {
    initializeProjects();
    setupFiltering();
    setupModal();
    setupLoadMore();
    updateProjectStats();
});

// Initialize projects display
function initializeProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const initialProjects = projectsData.slice(0, 10); // Show first 10 projects
    
    // Clear existing projects (keep the first 10 that are already in HTML)
    const existingProjects = projectsGrid.querySelectorAll('.project-card');
    existingProjects.forEach((project, index) => {
        if (index >= 10) {
            project.remove();
        }
    });
    
    // Add remaining projects dynamically
    projectsData.slice(10, 20).forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="project-image">
            <div class="project-placeholder"></div>
            <div class="project-overlay">
                <span class="project-category">${getCategoryDisplayName(project.category)}</span>
                <span class="project-status ${project.status}">${project.status === 'ongoing' ? 'Ongoing' : 'Completed'}</span>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-meta">
                <span class="location">${project.location}</span>
                <span class="year">${project.year}</span>
            </div>
        </div>
    `;
    
    // Add click event for modal
    card.addEventListener('click', () => {
        openProjectModal(project);
    });
    
    return card;
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'heavy-engineering': 'Heavy Engineering',
        'special-projects': 'Special Projects',
        'utility': 'Utility',
        'commercial': 'Commercial',
        'residential': 'Residential'
    };
    return categoryNames[category] || category;
}

// Setup filtering functionality
function setupFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(category);
        });
    });
}

// Filter projects by category
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.classList.add('show');
        } else {
            card.classList.add('hidden');
            card.classList.remove('show');
        }
    });
    
    // Update stats
    updateProjectStats(category);
}

// Update project statistics
function updateProjectStats(category = 'all') {
    const totalProjects = document.getElementById('total-projects');
    const completedProjects = document.getElementById('completed-projects');
    const ongoingProjects = document.getElementById('ongoing-projects');
    
    let filteredProjects = projectsData;
    if (category !== 'all') {
        filteredProjects = projectsData.filter(project => project.category === category);
    }
    
    const completed = filteredProjects.filter(project => project.status === 'completed').length;
    const ongoing = filteredProjects.filter(project => project.status === 'ongoing').length;
    
    // Animate counters
    animateCounter(completedProjects, completed);
    animateCounter(ongoingProjects, ongoing);
    totalProjects.textContent = `${filteredProjects.length}+`;
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Open project modal
function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDescription = document.getElementById('modal-project-description');
    const modalCategory = document.getElementById('modal-project-category');
    const modalLocation = document.getElementById('modal-project-location');
    const modalYear = document.getElementById('modal-project-year');
    const modalStatus = document.getElementById('modal-project-status');
    
    // Update modal content
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalCategory.textContent = getCategoryDisplayName(project.category);
    modalLocation.textContent = project.location;
    modalYear.textContent = project.year;
    modalStatus.textContent = project.status === 'ongoing' ? 'Ongoing' : 'Completed';
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Setup load more functionality
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-projects');
    let currentIndex = 20;
    
    loadMoreBtn.addEventListener('click', () => {
        const projectsGrid = document.getElementById('projects-grid');
        const nextProjects = projectsData.slice(currentIndex, currentIndex + 10);
        
        nextProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
        
        currentIndex += 10;
        
        // Hide load more button if all projects are loaded
        if (currentIndex >= projectsData.length) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Reinitialize AOS for new elements
        AOS.refresh();
    });
}

// Counter animation function
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Gallery thumbnail functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('thumbnail')) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.main-image .project-placeholder');
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update main image (in real implementation, this would load actual images)
        mainImage.style.background = e.target.querySelector('.project-placeholder').style.background;
    }
});

// Search functionality (optional enhancement)
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'project-search';
    searchInput.style.cssText = `
        padding: 12px 20px;
        border: 2px solid var(--accent-color);
        border-radius: var(--border-radius);
        background: var(--primary-color);
        color: var(--text-primary);
        width: 300px;
        margin-bottom: 2rem;
        font-size: 1rem;
    `;
    
    const categoryFilters = document.querySelector('.category-filters');
    categoryFilters.parentNode.insertBefore(searchInput, categoryFilters);
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const location = card.querySelector('.location').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || location.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize search if needed
// setupSearch();

// Export functions for global access
window.projectsModule = {
    filterProjects,
    openProjectModal,
    updateProjectStats
}; 