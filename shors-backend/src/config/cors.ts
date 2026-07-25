import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (_origin, callback) => {
    // TEMPORARY: Allow all origins for debugging
    return callback(null, true);
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],

  optionsSuccessStatus: 200,
};