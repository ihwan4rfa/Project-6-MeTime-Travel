import axios from "axios";

export default function useAuth() {

    // Login and Register
    const auth = async (url, body) => {
        try {
            const res = await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                body,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
                    }
                }
            );
            localStorage.setItem("token", res.data.token);
            document.cookie = `token=${res.data.token}; path=/`;
            document.cookie = `${res.data.data.role}=; path=/`;
            return res;
        } catch (error) {
            return error;
        }
    }

    // Login User and Logout User
    const userLog = async (url, callback) => {
        try {
            const res = await axios.get(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            if (url === "logout") {
                localStorage.removeItem("token");
                document.cookie = `token=${res.data.token}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
                document.cookie = `admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
                document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
                callback(res);
            } else {
                callback(res.data.data);
            }
        } catch (error) {
            return error;
        }
    }

    return { auth, userLog };
}
