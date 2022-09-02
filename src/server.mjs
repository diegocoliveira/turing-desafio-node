import Express from "express";
import UserRouter from "./routers/UserRouter.mjs";


const app = Express();
const router = UserRouter(Express);
const port = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/", Express.static("public"));
app.use("/api/users", router);

//Status 404 - caso nenhum endpoint seja encontrado
app.use(function (req, res, next) {
    const html = `<html> <head> <meta charset="utf-8" /> <title>Meu Redirect</title>
        <meta http-equiv="refresh" content="0; URL='${req.baseUrl}/404/index.html'" /> </head>
        <body>... </body> </html>`;

    res.status(404);
     const contentType = req.get('Content-Type');

     // response with json
    if (req.get('Content-Type') === 'application/json') {
        res.json({ error: "Not found" });
        return;
    }
     // response with html page
     if (req.accepts("html")) {
        res.send(html);
        return;
    }

    // default to plain-text. send()
    res.type("txt").send("Not found");

});

app.listen(port, () => {
    console.log(`Servidor criado: http://localhost:${port}`);
});
