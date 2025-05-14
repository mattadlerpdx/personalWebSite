const API_BASE = "https://my-backend-url.a.run.app";

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function sendContactForm(data) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send contact form');
    return await res.text();
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
}

export function getResumeUrl() {
  return `${API_BASE}/resume`;
}
