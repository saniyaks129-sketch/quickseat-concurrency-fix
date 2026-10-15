import express from 'express';
import { bookingLimiter } from '../middleware/rateLimiter.js';
import { createBooking } from '../services/bookingService.js';

const router = express.Router();

router.post('/book', bookingLimiter, async (req, res, next) => {
  try {
    const { userId, seatId, showId } = req.body;
    const result = await createBooking({ userId, seatId, showId });
    return res.status(result.status).json(result.data);
  } catch (error) {
    next(error);
  }
});

export default router;