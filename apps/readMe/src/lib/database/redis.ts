import RedisClient, { createClient } from "redis";

const connect: FunctionDecoration<Redis> = (t, k) => {
	if (Redis.handle) {
		return;
	}
	createClient()
		.on("error", (err) => console.log("Redis Client Error", err))
		.connect()
		.then((d) => (Redis.handle = d));
};

export default class Redis {
	static handle: RedisClient.RedisClientType<any, any, any> | null = null;

	@connect
	static set() {
		// Redis.connect();
	}
}
