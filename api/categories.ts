

export const getCategories = async ({pageParam = 0, queryKey}: any)/*: Promise<Category>*/ => {
    const [_key, currentInstance] = queryKey;

    if (!currentInstance) {
        throw new Error(`Failed to fetch videos`);
    }

    const res = await fetch(`${currentInstance}/api/v1/videos/categories`);
    if (!res.ok) {
        throw new Error(`Failed to fetch videos`);
    }
    return res.json();
}