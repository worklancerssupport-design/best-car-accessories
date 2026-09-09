import { MessageCircle } from 'lucide-react';
import business from '../../../data/business.json';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const whatsappNumber = business.whatsapp;
  const whatsappMessage = encodeURIComponent("Hello Best Car Accessories, I would like to enquire about your car accessories and services.");
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}` : '#';

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
