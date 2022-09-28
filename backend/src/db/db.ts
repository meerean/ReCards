import { Client } from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD } from "../config/config";

const credentials = {
  user: "postgres",
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432,
};

const client = new Client(credentials);
(async () => await client.connect())();

export async function insertUser({
  username,
  email,
  password,
  salt,
}: {
  username: string;
  email: string;
  password: string;
  salt: string;
}): Promise<void> {
  const dbQuery =
    "INSERT INTO users(username, email, password, salt) VALUES($1, $2, $3, $4) RETURNING *";
  const values = [username, email, password, salt];

  await client.query(dbQuery, values);
}

export async function selectUser({ username }: { username: string }) {
  const dbQuery = "SELECT * FROM users WHERE username=$1";
  const values = [username];

  const res = await client.query(dbQuery, values);
  return res.rows[0];
}

// (async () => {
//   console.log(await selectUser({ username: "meww" }));
// })();