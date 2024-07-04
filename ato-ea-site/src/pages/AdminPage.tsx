import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

type ImageItem = {
    id: string;
    img_src: string;
};

const AdminPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('HomePage')
                .select('*');

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
    
            // Extract the file path from the imgSrc URL
            const fileName = imgSrc.split('/').pop();
            const filePath = `HomePageImages/${fileName}`;
    
            // Remove the image file from storage
            const { error: storageError } = await supabase.storage.from('ImageStorage').remove([filePath]);
    
            if (storageError) throw storageError;
    
            // Remove the image record from the database
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

    return (
        <div className="admin-page mt-40">
            <h1 className='mb-10'>Admin Page</h1>
            <input className='mb-10' type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload New Image'}
            </button>

            {loading ? (
                <p>Loading images...</p>
            ) : (
                <div className="image-list">
                    {images.map((img) => (
                        <div key={img.id} className="image-item flex gap-2">
                            <img src={img.img_src} alt="Home Page" style={{ width: '200px', height: '200px' }} />
                            <button onClick={() => handleDeleteImage(img.id, img.img_src)}>Delete</button>
                            <button onClick={() => handleReplaceImage(img.id)}>Replace</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
