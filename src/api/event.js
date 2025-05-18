export const getEvents = async() => {
    try {
        const response = await fetch("http://localhost:8000/event");
        return response.json();
    } catch (err) {
        return err;
    }  
}