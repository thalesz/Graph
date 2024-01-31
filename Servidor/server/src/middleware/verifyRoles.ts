import { Request, Response, NextFunction } from 'express';

interface CustomRequest<T = Record<string, any>> extends Request {
    roles?: string[]; // Adicione esta linha para estender Request com a propriedade roles
}

const verifyRoles = (...allowedRoles: any[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (!req?.roles) {
            console.log('No roles provided in the request.');
            return res.sendStatus(401);
        }

        const rolesArray = allowedRoles.map(role => String(role)); // Converter para string
        console.log('Allowed Roles:', rolesArray);
        console.log('User Roles:', req.roles);

        const result = req.roles.some(role => rolesArray.includes(String(role)));
        console.log('Result:', result);

        if (!result) {
            console.log('User does not have the required roles.');
            return res.sendStatus(401);
        }

        console.log('User has the required roles.');
        next();
    };
}

export { verifyRoles };
