import UserService from "../services/UserService.mjs";

export default function UserController() {
    const service = new UserService();

    function get(req, res) {
        const id = req.params.id;
        const data = req.query.data;
        const users = service.get(data);
        res.status(200).json(users);
    }
    
    function getById(req, res) {
        const id = req.params.id;
        const result = service.getById(id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(400).json({ message: result.message });
        }
        
    }

    function create(req, res) {
        const data = req.body;
        const result = service.create(data.name, data.email);

        if (result.success) {
            res.status(201).json(result.message);
        } else {
            res.status(400).json(result.message);
        }
    }

    function update(req, res) {
        const id = req.params.id;
        const data = req.body;
        const result = service.update(id, data.name, data.email);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(400).json({ message: result.message });
        }
    }

    function remove(req, res) {
        const id = req.params.id;
        const result = service.remove(id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(400).json({ message: result.message });
        }
    }

    return { get, getById, create, update, remove };
}
