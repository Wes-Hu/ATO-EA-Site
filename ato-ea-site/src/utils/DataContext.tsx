import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

// Define types for each table
type ImageItem = {
    img_src: string | null;
};
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
    id:number;
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
    fetchImages: () => Promise<void>;
    fetchExec: () => Promise<void>;
    fetchRecentNews: () => Promise<void>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<ImageUrls>([]);
    const [exec, setExec] = useState<ExecBoard[]>([]);
    const [recentNews, setRecentNews] = useState<RecentNews[]>([]);

    // Function to preload images
    const preloadImages = (imageUrls: string[]) => {
        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    };

    // Fetch image URLs from Supabase
    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from("HomePage")
                .select("img_src")
            if (error) {
                console.error('Error from Supabase:', error);
                throw error;
            }

            const imageUrls = (data as ImageItem[]).map((item: ImageItem) => item.img_src).filter((src): src is string => Boolean(src));
            setImages(imageUrls);
            preloadImages(imageUrls); // Preload images
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching images", error);
            setIsLoading(false);
        }
    };

    // Fetch exec board info from Supabase
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
            setExec(sortedData); // Ensure data is an array
        } catch (error) {
            console.error("Error fetching exec board info", error);
        }
    };

    // Fetch recent news from Supabase
    const fetchRecentNews = async () => {
        try {
            const { data, error } = await supabase
                .from("RecentNews")
                .select("*")
                .order("date", {ascending: false});
            if (error) {
                console.error('Error from Supabase:', error);
                throw error;
            }
            setRecentNews(data);
        } catch (error) {
            console.error("Error Fetching recent news", error);
        }
    };

    useEffect(() => {
        fetchImages();
        fetchExec();
        fetchRecentNews();
    }, []);

    return (
        <DataContext.Provider value={{ images, exec, recentNews, isLoading, fetchImages, fetchExec, fetchRecentNews }}>
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
