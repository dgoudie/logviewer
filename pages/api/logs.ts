import type { NextApiRequest, NextApiResponse } from 'next';
import { addLog, getLogs } from '../../repository/log.repository';

import { DatabaseLog } from '../../models/log';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getLogger } from 'log4js';

getLogger().level = 'info';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DatabaseLog[] | null>
) {
    if (req.method === 'POST') {
        return addLog(req.body)
            .then(() => res.status(204).send(null))
            .catch((e) => {
                getLogger().error(e);
                res.status(500).send(null);
            });
    } else if (req.method === 'GET') {
        return getLogs()
            .then((logs) => res.status(200).send(logs))
            .catch((e) => {
                getLogger().error(e);
                res.status(500).send(null);
            });
    } else {
        res.status(405).send(null);
    }
}
