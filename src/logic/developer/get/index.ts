import { query, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../../../database/db";
import { developerResult } from "../../../interface/types";

export const getDevelopers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const queryString: string = `
    SELECT 
        *
    FROM
        developers;
    `;

    const queryResult: developerResult = await client.query(queryString);

    return res.json(queryResult.rows);
};

export const getDeveloperById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = `
    SELECT 
        *
    FROM
        developers  
    WHERE
        id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult: developerResult = await client.query(queryConfig);

    return res.json(queryResult.rows[0]);
};

export const getDeveloperProjects = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = `
    SELECT 
        * 
    FROM 
        developers d 
    JOIN 
        projects p 
    ON 
        d.id = p.dev_id
    WHERE 
        p.dev_id = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const QueryResult: developerResult = await client.query(QueryConfig);

    return res.json(QueryResult.rows);
};
