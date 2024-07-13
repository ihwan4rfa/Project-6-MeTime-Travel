import axios from "axios";
export default function useGetData() {
    const getData = async (url, callback) => {
        try {
            const res = await axios.get(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                {
                    headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
                }
            );
            callback(res);
        } catch (error) {
            console.log(error);
        }
    };
    return { getData };
}
