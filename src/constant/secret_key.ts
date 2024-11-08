import * as dotenv from 'dotenv';

dotenv.config();

export const SecretKey = {
    jwtSecret: process.env.JWT_SECRET,
}