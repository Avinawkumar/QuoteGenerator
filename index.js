
const express = require('express');
const axios = require('axios');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());

const apiKey = process.env.OPENAI_API_KEY;

app.get("/",(req,res)=>{
  res.send("QuoteGenerator")
})

app.get('/quote/:word', async (req, res) => {
  try {
    const { word } = req.params;

    const prompt = `Generate a inspirational or motivational quotes about "${word}"`;
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt,
        max_tokens: 50, 
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const quote = response.data.choices[0].text.trim();
    console.log(quote)
    res.json({ quote });
  } catch (error) {
    console.error('Error generating quote:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



// const express = require('express');
// const axios = require('axios');
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const cors = require("cors");
// require('dotenv').config();

// const app = express();
// app.use(cors());

// // const apiKey = process.env.OPENAI_API_KEY;
// // console.log(apiKey)
// app.get("/",(req,res)=>{
//   res.send("QuoteGenerator")
// })

// app.get('/quote/:word', async (req, res) => {
//   try {
//     const { word } = req.params;

//     const prompt = `Generate an inspirational or motivational quote about "${word}"`;
//     const apiKey = process.env.OPENAI_API_KEY;; // Replace with your actual OpenAI API key

//     const response = await fetch(
//       'https://api.openai.com/v1/engines/text-davinci-003/completions',
//       {
//         method: 'POST', // Use POST method for sending the request
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           prompt,
//           max_tokens: 50,
//         }),
//       }
//     );

//     if (!response.ok) {
//       // Handle non-successful response
//       throw new Error(`OpenAI API request failed with status ${response.status}`);
//     }

//     const quoteResponse = await response.json();
//     const quote = quoteResponse.choices[0].text.trim();
//     res.json({ quote });
//   } catch (error) {
//     console.error('Error generating quote:', error);
//     res.status(500).json({ error: 'Something went wrong.' });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
