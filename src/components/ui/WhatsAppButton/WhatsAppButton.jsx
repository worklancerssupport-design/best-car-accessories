import React from 'react';
import { MessageCircle } from 'lucide-react';
import { business } from '../../../config/business';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const whatsappNumber = business.whatsapp;
  const whatsappMessage = encodeURIComponent("Hello Best Car Accessories, I would like to enquire about your car accessories and services.");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}` : '#';

  if (!whatsappNumber) {
    console.warn('WhatsApp number is not configured in business.js');
  }

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
