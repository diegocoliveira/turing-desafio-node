export default class Users {
    async get(data) {
        try {
            const options = { method: "GET", headers: { "Content-Type": "application/json" } };
            const response = await fetch(`http://localhost:8080/api/users?data=${data}`, options);
            if (!response.ok || response.status !== 200) {
                const message = await response.json();
                throw new Error(message);
            }
            const users = await response.json();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            const options = { method: "GET", headers: { "Content-Type": "application/json" } };
            const response = await fetch(`http://localhost:8080/api/users/${id}`, options);
            if (!response.ok || response.status !== 200) {
                const message = await response.json();
                throw new Error(message);
            }
            const user = await response.json();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async create(data) {
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("http://localhost:8080/api/users", options);
        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message);
        }
        const user = await response.json();
        return user;
    }

    async update(data) {
        const options = { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch(`http://localhost:8080/api/users/${data.id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message);
        }
        const user = await response.json();
        return user;
    }
}
