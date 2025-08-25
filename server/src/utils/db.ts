import { Client } from "pg"

const db = new Client({
  user: "cp",
  database: "collabpad",
  host: "localhost",
  port: 5432,
});

type DatabaseReturn = {
  ok: boolean;
  e_type?: 'USER EXISTS' | 'USER NOT FOUND' | 'UNHANDLED';
  data?: any;
}

await db.connect()

export async function addUser(username: string, pHash: string): Promise<DatabaseReturn> {
  try {
    await db.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, pHash])
    return {ok: true}
  }
  catch (e: any) {
    if (e.code === '23505') {
      return {ok: false, e_type: 'USER EXISTS'}
    }
    else {
      return {ok: false, e_type: 'UNHANDLED'}
    }
  }
}
