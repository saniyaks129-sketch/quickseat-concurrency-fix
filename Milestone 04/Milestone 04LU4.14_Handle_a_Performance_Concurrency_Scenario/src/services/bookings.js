import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export const createBooking = async ({ userId, seatId, showId }) => {
  try {
    // Atomic insert — database unique constraint handles uniqueness
    const booking = await prisma.booking.create({
      data: { userId, seatId, showId }
    });
    return { status: 201, data: booking };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      return { 
        status: 409, 
        data: { message: 'Seat already booked for this show' } 
      };
    }
    throw error;
  }
};