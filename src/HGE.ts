import { HttpException, HttpStatus } from '@nestjs/common';

// handle global errors
export default async function HGE(tryfunc: () => Promise<any>): Promise<any> {
  try {
    return await tryfunc();
  } catch (error) {
    if (error instanceof HttpException) {
      throw error; // Re-throw the exception with the custom message
    } else {
      console.log(error);
      // If it's not an HttpException, create a custom exception
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
