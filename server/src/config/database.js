import {PrismaClient} from '../generated/prisma/client.js';

const db = new PrismaClient({
    log: ['query', 'error', 'warn']
});

export default {
    db
}