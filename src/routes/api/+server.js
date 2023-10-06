import { json , text } from "@sveltejs/kit";
import { mysqlconnFn } from "$lib/db/mysql";

export async function GET() {

  try {
    let mysqlconn = await mysqlconnFn();
    let results = await mysqlconn.query(`SELECT id FROM new_table`);
    return json(results[0]);

  } catch (error) {
    console.error("Error:", error);
    return { error: "DATA REQUEST ERROR!!!" };
  }
}

export async function POST({request}) {
   const data = await request.json();
   console.log(data.name);

  try {
    let mysqlconn = await mysqlconnFn();
    let result = await mysqlconn.query
      (
        `INSERT INTO new_table (name) VALUES (?)`,[data.name]
      );
    return json(result, { status : 201 });

  } catch (error) {
    console.error("Error:", error);
    return { error: "INSERT DATA ERROR!!!" };
  }
}

export async function PUT({request}) {
  const data = await request.json();
  try {
    let mysqlconn = await mysqlconnFn();
    let result = await mysqlconn.query
      (
        `UPDATE new_table SET name = ? WHERE id = ?`,[data.name]
      );
    return json(result, { status : 201 });

  } catch (error) {
    console.error("Error:", error);
    return { error: "DATA UPDATE ERROR!!!" };
  }

};