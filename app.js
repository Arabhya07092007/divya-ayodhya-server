import dotenv from "dotenv";
import express from "express";
import request from "request";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const API_KEY = process.env.GOOGLE_API_KEY;

app.get("/distance", (req, res) => {
  request(
    {
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=26.7956727,82.1939717&destinations=${req.query.destinations}&key=${API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
