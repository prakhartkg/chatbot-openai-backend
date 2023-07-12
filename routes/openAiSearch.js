var express = require('express');
var searchRouter = express.Router();
const axios = require('axios')
/* GET users listing. */
searchRouter.post('/search', async (req, res) => {
  const message = req.body.message;
try{
  const response = await axios.post('https://api.openai.com/v1/completions', {
    prompt: message,
    max_tokens: 50,
    temperature: 0.7,
    n: 1,
    model: "text-davinci-003",
    stop: '\n',
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
  });

  const aiResponse = response.data.choices[0].text.trim();

  // Process AI response to check for chart requests
  let chartResponse = null;
  if (aiResponse.includes('generate chart')) {
    const chartType = aiResponse.split('generate chart ')[1]; // Assuming format: "generate chart <chart_type>"
    chartResponse = generateChart(chartType);
  }

  res.json({ message: aiResponse, chartResponse });
}catch(err){

  res.json({
    message:`This Sequence diagram represents a simple login process between a user and a server. The user enters their username and password, which are then validated by the server. If the credentials are valid, the server redirects the user to the dashboard. If the credentials are invalid, the server displays an error message to the user.`,
    chartResponse:`sequenceDiagram
    participant User
    participant Server

    User->>Server: Enter username and password
    Server-->>User: Validate credentials

    alt Valid credentials
        Server-->>User: Redirect to dashboard
    else Invalid credentials
        Server-->>User: Display error message
    end`

  })
}
  // Send user message to OpenAI API
 
});

// Generate Mermaid.js chart based on user request
function generateChart(chartType) {
  // Perform necessary logic to generate Mermaid.js chart code
  // Return the chart code or null if chart generation fails
  // You can refer to the Mermaid.js documentation for chart syntax
}
module.exports = searchRouter;
