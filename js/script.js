// Load projects.json and render separate "Technical Pursuits" and "Creative Pursuits" sections by creating cards dynamically.

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

async function loadProjects() {
    try {
        const response = await fetch('../data/projects.json');
        if (!response.ok) {
            throw new Error(`Failed to load projects: ${response.statusText}`);
        }
        const data = await response.json();
        renderProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        // Silently fail: leave the grid empty, show nothing to the user
        document.getElementById('technical-grid').innerHTML = '';
        document.getElementById('creative-grid').innerHTML = '';
    }
}

function renderProjects(projects) {
    const technicalProjects = projects.filter(p => p.category === 'technical');
    const creativeProjects = projects.filter(p => p.category === 'creative');

    const technicalGrid = document.getElementById('technical-grid');
    const creativeGrid = document.getElementById('creative-grid');

    technicalGrid.innerHTML = '';
    creativeGrid.innerHTML = '';

    technicalProjects.forEach(project => {
        technicalGrid.appendChild(createProjectCard(project));
    });

    creativeProjects.forEach(project => {
        creativeGrid.appendChild(createProjectCard(project));
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const techTags = project.stack
        .split(',')
        .map(tech => tech.trim())
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

    card.innerHTML = `
        <h3>${project.title}</h3>
        <div class="project-role">${project.role}</div>
        <div class="project-stack">${techTags}</div>
        <p class="project-description">${project.description}</p>
    `;

    return card;
}
