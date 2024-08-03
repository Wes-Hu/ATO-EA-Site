import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

interface CreateNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const CreateNewsModal: React.FC<CreateNewsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setUploading(true);
    try {
      let imgSrc = '';

      if (image) {
        const fileName = `${Date.now()}_${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('ImageStorage')
          .upload(`RecentNewsImages/${fileName}`, image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData} = supabase.storage
          .from('ImageStorage')
          .getPublicUrl(`RecentNewsImages/${fileName}`);

        imgSrc = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from('RecentNews')
        .insert([{ title, date, brief_description: briefDescription, description, image_src: imgSrc }]);

      if (error) throw error;

      alert('News post created successfully!');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error creating news post:', error);
      alert('Error creating news post');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-screen md:w-3/5">
        <h2 className="text-2xl mb-5">Create News Post</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Brief Description</label>
          <textarea
            value={briefDescription}
            onChange={(e) => setBriefDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full" />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md" disabled={uploading}>
            {uploading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewsModal;
