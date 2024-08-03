import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

interface EditNewsModalProps {
  news: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditNewsModal: React.FC<EditNewsModalProps> = ({ news, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(news.title);
  const [date, setDate] = useState(news.date);
  const [briefDescription, setBriefDescription] = useState(news.brief_description);
  const [description, setDescription] = useState(news.description);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [imgSrc, setImgSrc] = useState(news.image_src); // Use local state for imgSrc

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setUploading(true);
    try {
      let newImgSrc = imgSrc;

      if (image) {
        const fileName = `${Date.now()}_${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('ImageStorage')
          .upload(`RecentNewsImages/${fileName}`, image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData} = supabase.storage
          .from('ImageStorage')
          .getPublicUrl(`RecentNewsImages/${fileName}`);

        newImgSrc = publicUrlData.publicUrl;

        // Optionally, remove the old image if it exists
        if (imgSrc) {
          const oldFileName = imgSrc.split('/').pop();
          const { error: deleteError } = await supabase.storage
            .from('ImageStorage')
            .remove([`RecentNewsImages/${oldFileName}`]);

          if (deleteError) console.error('Error deleting old image:', deleteError);
        }
      }

      const { error } = await supabase
        .from('RecentNews')
        .update({ title, date, brief_description: briefDescription, description, image_src: newImgSrc })
        .eq('id', news.id);

      if (error) throw error;

      alert('News post updated successfully!');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating news post:', error);
      alert('Error updating news post');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    setDeletingImage(true);
    try {
      if (imgSrc) {
        const oldFileName = imgSrc.split('/').pop();
        const { error: deleteError } = await supabase.storage
          .from('ImageStorage')
          .remove([`RecentNewsImages/${oldFileName}`]);

        if (deleteError) throw deleteError;

        const { error } = await supabase
          .from('RecentNews')
          .update({ image_src: "" })
          .eq('id', news.id);

        if (error) throw error;

        setImgSrc(""); // Update local state to reflect deletion
        alert('Image deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    } finally {
      setDeletingImage(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-screen md:w-3/5">
        <h2 className="text-2xl mb-5">Edit News Post</h2>
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
          {imgSrc && (
            <>
              <img src={imgSrc} alt="Current" className="mt-2 w-24 h-24 rounded-md" />
              <button
                onClick={handleDeleteImage}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
                disabled={deletingImage}
              >
                {deletingImage ? 'Deleting...' : 'Delete Image'}
              </button>
            </>
          )}
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

export default EditNewsModal;
