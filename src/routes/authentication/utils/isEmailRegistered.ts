export const isEmailRegistered = async (email: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/exists/user/${email}`);
    return response.json();
};
