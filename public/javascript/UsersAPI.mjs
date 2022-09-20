export default class Users {
    async get(data) {
        try {
            const options = { method: "GET", headers: { "Content-Type": "application/json" } };
            const response = await fetch(`/api/users?data=${data}`, options);
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
            const response = await fetch(`/api/users/${id}`, options);
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
        const response = await fetch("/api/users", options);
        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message);
        }
        const user = await response.json();
        return user;
    }

    async update(data) {
        const options = { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch(`/api/users/${data.id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            console.log(message);
            throw new Error(message);
        }
        const user = await response.json();
        return user;
    }

    async deleteById(id) {
        const options = { method: "DELETE", headers: { "Content-Type": "application/json" } };
        const response = await fetch(`/api/users/${id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message);
        }
        const user = await response.json();
        return user;
    }
}
