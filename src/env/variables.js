import "dotenv/config";

const env = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URL,
  AT_SECRET: process.env.ACCESS_TOKEN_SECRET,
  AT_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  RT_SECRET: process.env.REFRESH_TOKEN_SECRET,
  RT_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};

for (let key in env) {
  if (!env[key]) {
    console.log(
      `process.env.${key} is empty. Kindly set variables properly inside .env file and restart the server.`
    );
    process.exit(0);
  }
}

export { env };
