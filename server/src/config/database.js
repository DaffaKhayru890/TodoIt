import {PrismaClient} from '../generated/prisma/client.js';

const db = new PrismaClient({
    // log: ['query', 'error', 'warn','error']
});

export default {
    db
}