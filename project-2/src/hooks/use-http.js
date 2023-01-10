import { useState } from "react";

const useHttp = (reqConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendReq = async (taskText) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                reqConfig.url, {
                method: reqConfig.method,
                headers: reqConfig.headers,
                body: JSON.stringify(reqConfig.body)
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return (
        {
            isLoading,
            error,
            sendReq
        }
    )

}
export default useHttp;