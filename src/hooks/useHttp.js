import { useCallback, useState } from "react"

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? requestConfig.body : null
            })

            const data = await response.json()
            if (data.statusCode === 400) {
                throw new Error(data.message);
            }
            applyData(data)

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setLoading(false);
    }, [])

    return {
        loading,
        error,
        sendRequest
    }
}

export default useHttp
