import { QueryConfig } from "pg";
import { Request, Response, NextFunction } from "express";
import { client } from "../database/db";
import {
    developerResult,
    iDeveloper,
    iDeveloperInfo,
    preferredSistem,
} from "../interface/types";

export const verifyId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = +req.params.id;

    const queryString = `
    SELECT  
        *
    FROM
        developers
    WHERE
        id = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult = await client.query(QueryConfig);

    if (!queryResult.rowCount) {
        return res.status(404).json({
            message: "Id not found",
        });
    }
    return next();
};

export const verifyRequiredKeys = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const kyes: Array<string> = Object.keys(req.body);
    const requiredKeys: Array<string> = ["name", "email", "developerInfoId"];
    const allRequired: boolean = kyes.every((key: string) => {
        return requiredKeys.includes(key);
    });

    if (kyes.length < 2) {
        return res.status(400).json({
            message: `Required keys are: ${requiredKeys}`,
        });
    }

    if (!allRequired) {
        return res.status(400).json({
            message: `Required keys are: ${requiredKeys}`,
        });
    }

    return next();
};

export const verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const developer: iDeveloper = req.body;

    const queryString = `
    SELECT  
        *
    FROM
        developers
    WHERE
        email = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [developer.name],
    };

    const queryResult: developerResult = await client.query(QueryConfig);

    if (queryResult.rowCount) {
        return res.status(409).json({
            message: "Email already exists",
        });
    }
    return next();
};

export const verifyInfos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const developer: iDeveloperInfo = req.body;
    const preferredOs = developer.preferredOS;
    const OS: Array<preferredSistem> = ["Linux", "MacOs", "Windows"];

    if (
        preferredOs == "Linux" ||
        preferredOs == "MacOs" ||
        preferredOs == "Windows"
    ) {
        return next();
    }

    return res.status(400).json({
        message: `Possibles operational systems are: ${OS}`,
    });
};
