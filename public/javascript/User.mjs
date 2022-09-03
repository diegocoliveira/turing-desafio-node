export default class User {
    async get(data) {
        try {
            const options = { method: "GET", headers: { "Content-Type": "application/json" } };
            const response = await fetch(`http://localhost:8080/api/users?data=${data}`, options);
            if (!response.ok || response.status !== 200) {
                throw new Error("Failed to Request Data: " + response.status + " - " + response.statusText);
            }
            const users = await response.json();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }
}
