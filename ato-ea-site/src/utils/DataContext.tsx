import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

type ImageUrls = string[];
type ExecBoard = {
    id: number;
    email: string | null;
    grade: string | null;
    major: string | null;
    name: string | null;
    position: string;
    picture: string;
};
type RecentNews = {
    id: number;
    title: string | null;
    date: string | null;
    brief_description: string | null;
    description: string | null;
    image_src: string | undefined;
}

interface DataContextProps {
    isLoading: boolean;
    images: ImageUrls;
    exec: ExecBoard[];
    recentNews: RecentNews[];
    leadershipImage: string | null;
    fetchImages: () => Promise<void>;
    fetchExec: () => Promise<void>;
    fetchRecentNews: () => Promise<void>;
    fetchLeadershipImage: () => Promise<void>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<ImageUrls>([]);
    const [exec, setExec] = useState<ExecBoard[]>([]);
    const [recentNews, setRecentNews] = useState<RecentNews[]>([]);
    const [leadershipImage, setLeadershipImage] = useState<string | null>(null);

    const preloadImages = (imageUrls: string[]) => {
        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    };

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from("HomePage")
                .select("img_src");
            if (error) {
                console.error('Error from Supabase:', error);
                throw error;
            }

            const imageUrls = (data as ImageItem[]).map((item: ImageItem) => item.img_src).filter((src): src is string => Boolean(src));
            setImages(imageUrls);
            preloadImages(imageUrls);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching images", error);
            setIsLoading(false);
        }
    };

    const fetchExec = async () => {
        try {
            const { data, error } = await supabase
                .from("ExecBoard")
                .select("*");
            if (error) {
                console.error('Error from Supabase:', error);
                throw error;
            }
            const sortedData = (data as ExecBoard[]).sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
            setExec(sortedData);
        } catch (error) {
            console.error("Error fetching exec board info", error);
        }
    };

    const fetchRecentNews = async () => {
        try {
            const { data, error } = await supabase
                .from("RecentNews")
                .select("*")
                .order("date", { ascending: false });
            if (error) {
                console.error('Error from Supabase:', error);
                throw error;
            }
            setRecentNews(data);
        } catch (error) {
            console.error("Error Fetching recent news", error);
        }
    };

    const fetchLeadershipImage = async () => {
        try {
            // List files in the 'LeadershipImage' folder
            const { data: listData, error: listError } = await supabase
                .storage
                .from('ImageStorage')
                .list('LeadershipImage', { limit: 1 });
    
            if (listError) {
                console.error('Error listing leadership images from Supabase:', listError);
                throw listError;
            }
    
            if (listData && listData.length > 0) {
                const fileName = listData[0].name;
    
                // Fetch the public URL of the listed file
                const { data: publicUrlData, error: urlError } = supabase
                    .storage
                    .from('ImageStorage')
                    .getPublicUrl(`LeadershipImage/${fileName}`);
    
                if (urlError) {
                    console.error('Error fetching public URL for leadership image from Supabase:', urlError);
                    throw urlError;
                }
                setLeadershipImage(publicUrlData.publicUrl);
            } else {
                console.warn('No images found in the LeadershipImage folder.');
                setLeadershipImage(null);
            }
        } catch (error) {
            console.error("Error fetching leadership image", error);
        }
    };

    useEffect(() => {
        fetchImages();
        fetchExec();
        fetchRecentNews();
        fetchLeadershipImage();
    }, []);

    return (
        <DataContext.Provider value={{ images, exec, recentNews, isLoading, leadershipImage, fetchImages, fetchExec, fetchRecentNews, fetchLeadershipImage }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
