import { api } from ".";

export const getAllCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
}