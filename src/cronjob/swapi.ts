import axios from 'axios';
import { IResponse } from './interface';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

//Stars wars api people endpoint
const SWAPI_API_BASEURL = 'https://swapi.dev/api/people/';

// Number of people per page
const PEOPLE_PER_PAGE = 10;

// Create User Data
const createUser = async (url: string, page: number): Promise<User[]> => {
  const response = (await (await axios.get(url)).data) as IResponse;
  const data = response.results.map((data) => {
    const userId = data.url.match(/[\d]+/g)?.[0];
    return prisma.user.upsert({
      where: { third_party_userId: parseInt(userId) },
      update: { ...data, page, third_party_userId: parseInt(userId) },
      create: { ...data, page, third_party_userId: parseInt(userId) },
    });
  }, []);
  return await Promise.all(data);
};

/**
 * In Test mode, we need to use 20 peoples
 * @param isTestMode
 */
export const swapiCronJob = async (args?: { isTestMode: boolean }) => {
  try {
    const { isTestMode = false } = args ?? {};
    const result = (await (
      await axios.get(SWAPI_API_BASEURL)
    ).data) as IResponse;
    const totalPeoples = result.count;
    const urls = Array.from(
      { length: !isTestMode ? Math.ceil(totalPeoples / PEOPLE_PER_PAGE) : 2 },
      (_v, k) => ({ url: `${SWAPI_API_BASEURL}?page=${k + 1}`, page: k + 1 }),
    );

    for (const { url, page } of urls) {
      await createUser(url, page);
    }

    console.log('Cronjob Task Ended.');
  } catch (error) {
    return false;
  }
};

void swapiCronJob();
