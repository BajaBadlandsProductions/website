'use client';

import { useState } from 'react';
import { ContactFormData } from '@/types';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const serviceOptions = [
    'Film Production',
    'Commercial Production',
    'Music Video Production',
    'Post-Production',
    'Cinematography',
    'Audio Engineering'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        message: '',
        services: []
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Services of Interest (optional)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {serviceOptions.map((service) => (
            <label key={service} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="rounded border-gray-300 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors resize-vertical ${
            errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          placeholder="Tell us about your project..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}