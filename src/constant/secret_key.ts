import * as dotenv from 'dotenv';

dotenv.config();

export const SecretKey = {
    privateKey: process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    publicKey: process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'),
}