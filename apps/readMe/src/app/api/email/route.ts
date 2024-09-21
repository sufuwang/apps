import Email from "./Email";
import { backupDatabase } from "./Email";

export async function POST(request: Request) {
	const content = await request.json();
	const info = await Email.send(content);
	return Response.json(info);
}

export async function GET(request: Request) {
	const info = await backupDatabase();
	return Response.json(info);
}
