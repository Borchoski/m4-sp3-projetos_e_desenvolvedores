import { QueryResult } from "pg";
import { client } from "./../../../database/db";
import format from "pg-format";
import { Request, Response } from "express";
import { iNewProject } from "../../../interface/types";

export const newProject = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const project: iNewProject = req.body;

    const querySting: string = format(
        `
    INSERT INTO 
        projects (%I)
    VALUES 
        (%L)
    RETURNING *;
    `,
        Object.keys(project),
        Object.values(project)
    );

    const QueryResult = await client.query(querySting);

    return res.status(201).json(QueryResult.rows[0]);
};

export const newProjectTech = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;
    const tech = req.body;
    //console.log(tech.name);

    const queryTech: string = `
    SELECT * FROM technologies;
    `;
    const QueryResult: QueryResult = await client.query(queryTech);
    const technologies = QueryResult.rows;
    const idTech = technologies.find((el) => {
        el.name === tech.name;
    });
    console.log(idTech);

    return res.json();
};
