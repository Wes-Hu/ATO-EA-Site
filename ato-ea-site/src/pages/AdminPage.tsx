import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../utils/DataContext'; // Adjust the import path as needed

const AdminPage: React.FC = () => {
  const { images, exec, isLoading, fetchImages: refreshImages, fetchExec } = useDataContext();
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedExec, setEditedExec] = useState(exec);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuthenticated(true);
        refreshImages();
        fetchExec();
      } else {
        setAuthenticated(false);
        navigate('/admin-login');
      }
    };

    checkUser();
  }, [navigate, refreshImages, fetchExec]);

  // Use a separate useEffect to update editedExec only when exec changes and we are not in edit mode
  useEffect(() => {
    if (!editMode) {
      const sortedExec = exec.slice().sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
      setEditedExec(sortedExec);
    }
  }, [exec, editMode]);

  const handleExecChange = (index: number, field: keyof typeof exec[0], value: string) => {
    const updatedExec = [...editedExec];
    updatedExec[index] = { ...updatedExec[index], [field]: value };
    setEditedExec(updatedExec);
  };

  const handleSave = async () => {
    try {
      for (const member of editedExec) {
        const { error } = await supabase
          .from('ExecBoard')
          .update({ 
            name: member.name,
            grade: member.grade,
            major: member.major,
            email: member.email,
            picture: member.picture
          })
          .eq('position', member.position);

        if (error) {
          throw error;
        }
      }
      alert('Executive Board updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating executive board:', error);
      alert('Error updating executive board');
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
      refreshImages(); // Fetch images from context after uploading
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploading(false);
      setImage(null);
    }
  };

  const handleDeleteImage = async (imgSrc: string) => {
    try {
      setUploading(true);

      const fileName = imgSrc.split('/').pop();
      const filePath = `HomePageImages/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('ImageStorage')
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: deleteError } = await supabase.from('HomePage').delete().eq('img_src', imgSrc);

      if (deleteError) throw deleteError;

      alert('Image deleted successfully!');
      refreshImages(); // Fetch images from context after deleting
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    } finally {
      setUploading(false);
    }
  };

  const handleReplaceImage = async (imgSrc: string) => {
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
        .eq('img_src', imgSrc);

      if (updateError) throw updateError;

      alert('Image replaced successfully!');
      refreshImages(); // Fetch images from context after replacing
    } catch (error) {
      console.error('Error replacing image:', error);
      alert('Error replacing image');
    } finally {
      setUploading(false);
      setImage(null);
    }
  };

  const handleExecImageUpload = async (index: number) => {
    if (!image) return;

    try {
      setUploading(true);

      const fileName = `${Date.now()}_${image.name}`;
      const { error: uploadError } = await supabase.storage
        .from('ImageStorage')
        .upload(`ExecBoardImages/${fileName}`, image);

      if (uploadError) throw uploadError;

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from('ImageStorage')
        .getPublicUrl(`ExecBoardImages/${fileName}`);

      if (urlError) throw urlError;

      const publicUrl = publicUrlData.publicUrl;

      const updatedExec = [...editedExec];
      const oldImage = updatedExec[index].picture;

      updatedExec[index].picture = publicUrl;
      setEditedExec(updatedExec);

      if (oldImage) {
        const oldFileName = oldImage.split('/').pop();
        const oldFilePath = `ExecBoardImages/${oldFileName}`;

        const { error: deleteOldError } = await supabase.storage
          .from('ImageStorage')
          .remove([oldFilePath]);

        if (deleteOldError) console.error('Error deleting old image:', deleteOldError);
      }

      alert('Executive Board image updated successfully!');
      setImage(null);
    } catch (error) {
      console.error('Error uploading executive board image:', error);
      alert('Error uploading executive board image');
    } finally {
      setUploading(false);
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
        <div className='w-screen md:w-1/2 flex flex-col justify-center items-center'>
          <input className='mb-5 border border-black rounded-md p-2' type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleImageUpload} disabled={uploading} className='w-auto h-auto p-3 rounded-full bg-azure text-white text-lg mb-10 transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold'>
            {uploading ? 'Uploading...' : 'Upload New Image'}
          </button>
        </div>
        <p>Current Images</p>
        {isLoading ? (
          <p>Loading images...</p>
        ) : (
          <div className="flex justify-center items-center">
            <div className='flex flex-row flex-wrap justify-center gap-3'>
              {images.map((imgSrc) => (
                <div key={imgSrc} className="image-item flex flex-col border-black border-2 p-3 rounded-3xl gap-2">
                  <img className='rounded-3xl' src={imgSrc} alt="Home Page" style={{ width: '200px', height: '200px' }} />
                  <div className='flex flex-row gap-3'>
                    <button onClick={() => handleDeleteImage(imgSrc)} className='w-full h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>Delete</button>
                    <button onClick={() => handleReplaceImage(imgSrc)} className='w-full h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>Replace</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr className="border-t-1 border-gray-300 w-full" />
      <div id="ExecUpdate" className='flex flex-col mb-10 justify-center items-center'>
        <h2 className='mt-10 text-black text-3xl font-bold text-center leading-normal'>Executive Board</h2>
        <p className='w-screen md:w-1/2 mb-10 text-center'>Here you can update changable parts of the website directly such as changing rotating photos on home page, update the executive board list, and make posts to recent news. Make sure to logout when finished.</p>
        <div className="overflow-x-auto px-10 lg:px-0 w-screen lg:w-auto flex flex-col flex-start">
          <table className="table-auto w-full border-collapse border border-gray-300 mb-5">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Position</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Grade</th>
                <th className="border border-gray-300 px-4 py-2">Major</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Picture</th>
                {editMode && <th className="border border-gray-300 px-4 py-2">Change Picture</th>}
              </tr>
            </thead>
            <tbody>
              {editedExec.map((member, index) => (
                <tr key={member.email}>
                  <td className="border border-gray-300 px-4 py-2">{member.position}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editMode ? (
                      <input
                        type="text"
                        value={member.name || ''}
                        onChange={(e) => handleExecChange(index, 'name', e.target.value)}
                        className="w-full px-2 py-1"
                      />
                    ) : (
                      member.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editMode ? (
                      <input
                        type="text"
                        value={member.grade || ''}
                        onChange={(e) => handleExecChange(index, 'grade', e.target.value)}
                        className="w-full px-2 py-1"
                      />
                    ) : (
                      member.grade
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editMode ? (
                      <input
                        type="text"
                        value={member.major || ''}
                        onChange={(e) => handleExecChange(index, 'major', e.target.value)}
                        className="w-full px-2 py-1"
                      />
                    ) : (
                      member.major
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editMode ? (
                      <input
                        type="text"
                        value={member.email  || ''}
                        onChange={(e) => handleExecChange(index, 'email', e.target.value)}
                        className="w-full px-2 py-1"
                      />
                    ) : (
                      member.email
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img src={member.picture} alt="Picture" style={{ width: '50px', height: '50px' }} />
                  </td>
                  {editMode && (
                    <td className="border border-gray-300 px-4 py-2">
                      <div className='flex flex-col gap-2'>
                        <input className='w-full' type="file" accept="image/*" onChange={handleImageChange} />
                        <button onClick={() => handleExecImageUpload(index)} disabled={uploading} className='w-24 h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>
                          {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex flex-row gap-3 justify-end'>
            {editMode ? (
              <button onClick={handleSave} className='w-20 h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>Save</button>
            ) : (
              <button onClick={() => setEditMode(true)} className='w-20 h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
