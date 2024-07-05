import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

type ImageItem = {
  id: string;
  img_src: string;
};

const AdminPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuthenticated(true);
        fetchImages();
      } else {
        setAuthenticated(false);
        navigate('/admin-login'); // Redirect to login page if not authenticated
      }
    };

    checkUser();
  }, [navigate]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('HomePage').select('*');
      if (error) throw error;
      setImages(data as ImageItem[]);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    try {
      setUploading(true);

      const fileName = `${Date.now()}_${image.name}`;
      const { error: uploadError } = await supabase.storage
        .from('ImageStorage')
        .upload(`HomePageImages/${fileName}`, image);

      if (uploadError) throw uploadError;

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from('ImageStorage')
        .getPublicUrl(`HomePageImages/${fileName}`);

      if (urlError) throw urlError;

      const publicUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase
        .from('HomePage')
        .insert([{ img_src: publicUrl }]);

      if (insertError) throw insertError;

      alert('Image uploaded successfully!');
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploading(false);
      setImage(null);
    }
  };

  const handleDeleteImage = async (id: string, imgSrc: string) => {
    try {
      setLoading(true);

      const fileName = imgSrc.split('/').pop();
      const filePath = `HomePageImages/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('ImageStorage')
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: deleteError } = await supabase.from('HomePage').delete().eq('id', id);

      if (deleteError) throw deleteError;

      alert('Image deleted successfully!');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    } finally {
      setLoading(false);
    }
  };

  const handleReplaceImage = async (id: string) => {
    if (!image) return;

    try {
      setUploading(true);

      const fileName = `${Date.now()}_${image.name}`;
      const { error: uploadError } = await supabase.storage
        .from('ImageStorage')
        .upload(`HomePageImages/${fileName}`, image);

      if (uploadError) throw uploadError;

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from('ImageStorage')
        .getPublicUrl(`HomePageImages/${fileName}`);

      if (urlError) throw urlError;

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from('HomePage')
        .update({ img_src: publicUrl })
        .eq('id', id);

      if (updateError) throw updateError;

      alert('Image replaced successfully!');
      fetchImages();
    } catch (error) {
      console.error('Error replacing image:', error);
      alert('Error replacing image');
    } finally {
      setUploading(false);
      setImage(null);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      navigate('/');
      setTimeout(() => {
        alert('Successfully logged out');
      }, 100); // Delay the alert to ensure it shows after navigation
    }
  };
  

  if (!authenticated) {
    return <p>Loading...</p>; // Show a loading state while checking authentication
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='mt-10 mb-5 text-black text-4xl md:text-5xl text-center font-bold leading-normal'>Welcome To The Admin Page</h1>
      <p className='w-screen md:w-1/2 mb-10 text-center'>Here you can update changable parts of the website directly such as changing rotating photos on home page, update the executive board list, and make posts to recent news. Make sure to logout when finished.</p>
      <button onClick={handleLogout} className='w-auto h-auto p-3 rounded-full bg-red-500 text-white text-lg mb-10 transition-all duration-300 hover:bg-red-700'>
        Logout
      </button>
      <hr className="border-t-1 border-gray-300 w-full" />
      <div id="HomePageUpdate" className='w-screen px-3 md:w-1/2 flex flex-col mb-10 justify-center items-center'>
        <h2 className='mt-10 text-black text-3xl font-bold text-center leading-normal'>Home Page Carousel</h2>
        <p className='mb-10 text-center'>Upload a new image or replace/delete any of the existing photos here. First click choose file and select an image. Once an image is chosen then click "Upload New Image" to post a new image or click "Replace" on any of the existing image to replace it</p>
        <div className='w-scren md:w-1/2 flex flex-col justify-center items-center'>
          <input className='mb-5 border border-black rounded-md p-2' type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleImageUpload} disabled={uploading} className='w-auto h-auto p-3 rounded-full bg-azure text-white text-lg mb-10 transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold'>
            {uploading ? 'Uploading...' : 'Upload New Image'}
          </button>
        </div>
        <p>Current Images</p>
        {loading ? (
          <p>Loading images...</p>
        ) : (
          <div className="flex justify-center items-center">
            <div className='flex flex-row flex-wrap justify-center gap-3 '>
              {images.map((img) => (
                <div key={img.id} className="image-item flex flex-col border-black border-2 p-3 rounded-3xl gap-2">
                  <img className='rounded-3xl' src={img.img_src} alt="Home Page" style={{ width: '200px', height: '200px' }} />
                  <div className='flex flex-row gap-3'>
                    <button onClick={() => handleDeleteImage(img.id, img.img_src)} className='w-full h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>Delete</button>
                    <button onClick={() => handleReplaceImage(img.id)} className='w-full h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>Replace</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr className="border-t-1 border-gray-300 w-full" />
      <div id="ExecUpdate"></div>
    </div>
  );
};

export default AdminPage;
