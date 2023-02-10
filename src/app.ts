import { newProject, newProjectTech } from "./logic/projects/post/index";
import {
    verifyIdProject,
    verifyRequiredKeysProjects,
} from "./logic/projects/middelwaresProjects";
import { getProjects, getProjectsById } from "./logic/projects/get/index";
import {
    updateDeveloper,
    updateDeveloperInfo,
} from "./logic/developer/patch/index";
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
    verifyIdInfo,
    verifyInfos,
    verifyRequiredKeys,
    verifyRequiredKeysPatchDeveloper,
    verifyRequiredKeysPatchInfo,
} from "./middleware/middelwares";

const app: Application = express();
app.use(express.json());

app.listen(3000, async () => {
    await startDataBase();
    console.log("Server is running on port 3000");
});

//  DEVELOPER

app.get("/developers", getDevelopers);
app.get("/developers/:id", verifyId, getDeveloperById);
app.get("/developers/:id/projects", verifyId, getDeveloperProjects);

app.post("/developers", verifyRequiredKeys, verifyEmail, newDeveloper);
app.post(
    "/developers/:id/infos",
    verifyId,
    verifyIdInfo,
    verifyInfos,
    newDeveloperInfo
);

app.delete("/developers/:id", verifyId, deleteDeveloper);

app.patch(
    "/developers/:id",
    verifyId,
    verifyRequiredKeysPatchDeveloper,
    updateDeveloper
);
app.patch(
    "/developers/:id/infos",
    verifyId,
    verifyRequiredKeysPatchInfo,
    verifyInfos,
    updateDeveloperInfo
);

//  PROJECTS

app.get("/projects", getProjects);
app.get("/projects/:id", verifyIdProject, getProjectsById);

app.post("/projects", verifyRequiredKeysProjects, newProject);
app.post("/projects/:id/technologies", newProjectTech);
