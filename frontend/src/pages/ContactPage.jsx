import React, { useState } from 'react';
import { sendContactForm } from '../api';

function ContactPage({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      await sendContactForm(formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen px-4 py-16 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Me</h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 dark:bg-neutral-900 p-8 rounded-xl shadow-md transition-colors duration-500">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            ></textarea>
          </div>

          {status.message && (
            <div className={`p-4 rounded-lg text-sm font-medium ${
              status.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
              status.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' :
              'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {status.type === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
