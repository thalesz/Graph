import { Request, Response, NextFunction } from 'express';
import allowedOrigins from '../config/allowedOrigins';

const credentials = (req: Request, res: Response, next: NextFunction): void => {
    const origin: string | undefined = req.headers.origin as string;

    if (typeof origin === 'string' && allowedOrigins.includes(origin)) {
        // Verifica se 'res' e 'res.header' são definidos antes de configurar
        if (res && res.header) {
            res.header('Access-Control-Allow-Credentials', 'true');
            // Aqui você pode adicionar outras configurações CORS, se necessário.
        } else {
            // Se 'res' ou 'res.header' for indefinido, lança um erro
            next(new Error('Resposta ou cabeçalho de resposta não definidos.'));
            return;
        }
    }

    // Continua para o próximo middleware
    next();
};

export { credentials };
