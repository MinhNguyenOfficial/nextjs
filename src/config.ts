//video 16
import { z } from 'zod';

export const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error('Invalid value in .env file!');
}

const envConfig = configProject.data;
export default envConfig;
