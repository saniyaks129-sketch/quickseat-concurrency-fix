import rateLimit from 'express-rate-limit';

export const bookingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // Max 10 requests per minute per IP
  message: {
    error: 'Too many booking requests from this IP. Please try again after a minute.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});