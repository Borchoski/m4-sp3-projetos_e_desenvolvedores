import { QueryResult } from "pg";

interface iDeveloper {
    name: string;
    email: string;
    developerInfoId?: number;
}
interface iDeveloperReturn extends iDeveloper {
    id: number;
}

interface iDeveloperUpdate extends iDeveloperReturn {
    id_info: number;
    developerSince: string;
    preferredOS: string;
}

type preferredSistem = "Linux" | "Windows" | "MacOs";

interface iDeveloperInfo {
    developerSince: string;
    preferredOS: preferredSistem;
}

type developerResult = QueryResult<iDeveloperReturn>;

export {
    iDeveloper,
    iDeveloperReturn,
    developerResult,
    iDeveloperInfo,
    preferredSistem,
};
