export const getPlaces = async() => {
    try {
        const response = await fetch("http://localhost:8000/place");
        return response.json();
    } catch (err) {
        return err;
    }  
}

