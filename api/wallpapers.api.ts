import { api } from ".";

export const getAllWallpapers = async (category,page=1,limit=4) => {
    try {
        const apiUrl = category === "All" ? `/search?q=jujutsu%20kaisen&page=${page}` : `/search?q=${category}&page=${page}`;
        const response = await api.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getWallpaperById = async (id) => {
    try {
        const response = await api.get(`/w/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getWallpapersByQuery = async (query) => {
    try {
        const response = await api.get(`/wallpapers?query=${query}`);
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
}