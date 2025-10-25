const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://personal-backend-service-684800965366.us-west1.run.app'; 

const fetchJSON = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`Request failed: ${response.status} ${msg}`);
  }
  return await response.json();
};

export const fetchProjects = async () => {
  try {
    return await fetchJSON('/projects');
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchAbout = async () => {
  try {
    return await fetchJSON('/about');
  } catch (error) {
    console.error('Error fetching about info:', error);
    return null;
  }
};

export const sendContactForm = async (formData) => {
  try {
    return await fetchJSON('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};

export const getResumeUrl = () => '/resume.pdf';

export const logVisit = async (route) => {
  try {
    await fetch(`${API_BASE_URL}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route }),
    });
  } catch (error) {
    // Silent fail – we don't want logging errors to affect user experience
    console.warn('Visit log failed:', error);
  }
};

