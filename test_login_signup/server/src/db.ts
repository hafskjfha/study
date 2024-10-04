import {Pool} from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  });

export const insertuser=async (idid:string,email:string)=>{
    const client = await pool.connect();
    try{
        await client.query(`
            INSERT INTO users(
                Gid, email
            ) VALUES (
                $1, $2
            )
            `,[
                idid,
                email
            ]);
    }catch(err){
        console.log(err)
    }finally{
        client.release();
    }
}

export const finduser = async (idid:string,email:string):Promise<boolean>=>{
    const client=await pool.connect();
    try{
       const result = await client.query(`
            SELECT * FROM users WHERE email = $1
        `, [email]);
        return !!result.rows.length;
    }catch(err){
        console.log(err);
        return false;
    }finally{
        client.release();
    }
}