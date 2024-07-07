import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../utils/DataContext';

const AdminPage: React.FC = () => {
  const { images, exec, isLoading, fetchImages: refreshImages, fetchExec } = useDataContext();
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<string | null>(null); // Modify to track which member is uploading
  const [saving, setSaving] = useState(false); // New state for saving
  const [authenticated, setAuthenticated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedExec, setEditedExec] = useState(exec);
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: File | null }>({}); // Track selected images for each exec member
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
    setSaving(true); // Set saving state to true
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
    } finally {
      setSaving(false); // Set saving state to false after operation completes
    }
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImages((prev) => ({ ...prev, [index]: e.target.files[0] }));
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    try {
      setUploading('home'); // Use a unique identifier for home page upload

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
      setUploading(null);
      setImage(null);
    }
  };

  const handleDeleteImage = async (imgSrc: string) => {
    try {
      setUploading('delete'); // Use a unique identifier for delete operation

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
      setUploading(null);
    }
  };

  const handleReplaceImage = async (imgSrc: string) => {
    if (!image) return;

    try {
      setUploading('replace'); // Use a unique identifier for replace operation

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
      setUploading(null);
      setImage(null);
    }
  };

  const handleExecImageUpload = async (index: number) => {
    const image = selectedImages[index];
    if (!image) return;

    try {
      setUploading(`exec_${index}`); // Use a unique identifier for each exec member's upload

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
      setSelectedImages((prev) => ({ ...prev, [index]: null })); // Clear the selected image for the member
    } catch (error) {
      console.error('Error uploading executive board image:', error);
      alert('Error uploading executive board image');
    } finally {
      setUploading(null);
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
          <input className='mb-5 border border-black rounded-md p-2' type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          <button onClick={handleImageUpload} disabled={uploading === 'home'} className='w-auto h-auto p-3 rounded-full bg-azure text-white text-lg mb-10 transition-all duration-300 hover:bg-dark-blue group hover:text-old-gold'>
            {uploading === 'home' ? 'Uploading...' : 'Upload New Image'}
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
        <p className='w-screen md:w-1/2 mb-10 text-center'>Edit the executive board list here by clicking the "Edit" button. You can change all the fields including uploading a new image.</p>
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
                        <input className='w-full' type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
                        <button onClick={() => handleExecImageUpload(index)} disabled={uploading === `exec_${index}`} className='w-24 h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold'>
                          {uploading === `exec_${index}` ? 'Uploading...' : 'Upload'}
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
              <button onClick={handleSave} disabled={saving} className='w-auto h-auto p-3 rounded-full bg-azure text-white hover:bg-dark-blue group hover:text-old-gold flex items-center justify-center'>
              {saving ? (
                <>
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-old-gold mr-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                'Save'
              )}
            </button>
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
