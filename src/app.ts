import express, { Application } from "express";
import { startDataBase } from "./database/db";
import {
    getDeveloperById,
    getDeveloperProjects,
    getDevelopers,
} from "./logic/developer/get/index";
import { newDeveloper, newDeveloperInfo } from "./logic/developer/post/index";
import { deleteDeveloper } from "./logic/developer/delete/index";
import {
    verifyEmail,
    verifyId,
    verifyInfos,
    verifyRequiredKeys,
} from "./middleware/middelwares";

const app: Application = express();
app.use(express.json());

app.listen(3000, async () => {
    await startDataBase();
    console.log("Server is running on port 3000");
});

app.get("/developers", getDevelopers);
app.get("/developers/:id", verifyId, getDeveloperById);
app.get("/developers/:id/projects", verifyId, getDeveloperProjects);

app.post("/developers", verifyRequiredKeys, verifyEmail, newDeveloper);
app.post("/developers/:id/infos", verifyId, verifyInfos, newDeveloperInfo);

app.delete("/developers/:id", verifyId, deleteDeveloper);
