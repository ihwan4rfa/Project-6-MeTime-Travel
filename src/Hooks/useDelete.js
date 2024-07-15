import axios from "axios";

export default function useDelete() {
    const deleteData = async (url) => {
        try {
            const res = await axios.delete(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
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

    return { deleteData };
}