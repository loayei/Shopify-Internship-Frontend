export default function handler(req, res) {
  const body = req.body
  const data = {
    prompt: body.prompt,
    temperature: body.temperature,
    max_tokens: body.maxTokens,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }

  const response = fetch(
    'https://api.openai.com/v1/engines/text-curie-001/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
      },
      body: JSON.stringify(data),
    },
  )

  response
    .then((res) => res.json())
    .then((json) => {
      res.status(200).json({ text: `${json.choices[0].text}` })
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
}
