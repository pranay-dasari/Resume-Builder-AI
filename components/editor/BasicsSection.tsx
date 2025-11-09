
import React from 'react';
import { Basics } from '../../types';
import Input from '../ui/Input';

interface BasicsSectionProps {
  basics: Basics;
  onUpdate: (basics: Basics) => void;
}

const BasicsSection: React.FC<BasicsSectionProps> = ({ basics, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...basics, [e.target.name]: e.target.value });
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target && typeof event.target.result === 'string') {
          onUpdate({ ...basics, photo: event.target.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <Input label="Full Name" id="name" name="name" value={basics.name} onChange={handleChange} />
      <Input label="Headline / Job Title" id="headline" name="headline" value={basics.headline} onChange={handleChange} />
      <Input label="Email" id="email" name="email" type="email" value={basics.email} onChange={handleChange} />
      <Input label="Phone" id="phone" name="phone" type="tel" value={basics.phone} onChange={handleChange} />
      <Input label="Website" id="website" name="website" type="url" value={basics.website} onChange={handleChange} />
      <Input label="Location" id="location" name="location" value={basics.location} onChange={handleChange} />
      <Input label="Photo" id="photo" name="photo" type="file" accept="image/*" onChange={handlePhotoUpload} />
       {basics.photo && <img src={basics.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto" />}
    </div>
  );
};

export default BasicsSection;
