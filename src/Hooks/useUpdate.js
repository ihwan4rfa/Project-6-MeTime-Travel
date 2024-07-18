import axios from "axios"

const useUpdate = () => {
    const update = async (url, body) => {

        console.log(url);
        console.log(body);

        try {
            const res = await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                body,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return res;
        } catch (error) {
            return error;
        }
    };

    return { update };
}

export default useUpdate;
