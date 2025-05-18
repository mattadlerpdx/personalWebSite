// Using relative URLs since we have proxy set up
export const fetchProjects = async () => {
    try {
        const response = await fetch('/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const fetchAbout = async () => {
    try {
        const response = await fetch('/about');
        if (!response.ok) throw new Error('Failed to fetch about info');
        return await response.json();
    } catch (error) {
        console.error('Error fetching about info:', error);
        return null;
    }
};

export const sendContactForm = async (formData) => {
    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to send contact form');
        return await response.json();
    } catch (error) {
        console.error('Error sending contact form:', error);
        throw error;
    }
};

export const getResumeUrl = () => {
    return '/resume';
};
