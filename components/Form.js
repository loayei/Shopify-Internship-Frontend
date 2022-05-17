import React, { useEffect } from 'react'
import {
  Flex,
  Box,
  FormControl,
  Input,
  Heading,
  Select,
  useColorModeValue,
} from '@chakra-ui/react'
import SubmitButton from './button-submit'
import Card from '../components/Card'

function AiForm() {
  const [results, setResults] = React.useState({ text: '' })
  const [isLoading, setIsLoading] = React.useState(false)
  const [cardList, setCardList] = React.useState([])
  const [id, setId] = React.useState(0)
  const [aiValues, setAiValues] = React.useState({
    prompt: '',
    maxTokens: 50,
    temperature: 1.0,
  })

  const updateAiValues = (e) =>
    setAiValues({ ...aiValues, [e.target.name]: e.target.value })

  useEffect(() => {
    const fetchData = async () => {
      if (aiValues.prompt) {
        setIsLoading(true)
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
          },
          body: JSON.stringify({
            prompt: aiValues.prompt,
            maxTokens: parseInt(aiValues.maxTokens),
            temperature: parseFloat(aiValues.temperature),
          }),
        })
        const data = await res.json()
        setResults(data)
        setIsLoading(false)
      }
    }
    localStorage.setItem('aiValues', JSON.stringify(aiValues))
    localStorage.setItem('results', JSON.stringify(results))
    localStorage.setItem('cardList', JSON.stringify(cardList))
    localStorage.setItem('id', JSON.stringify(id))
    localStorage.setItem('prompt', JSON.stringify(aiValues.prompt))
    localStorage.setItem('answer', JSON.stringify(results.text))

    fetchData()
  }, [aiValues.prompt])

  function handleSubmit(e) {
    e.preventDefault()
    setCardList(cardList.concat([[id, aiValues.prompt, results.text]]))
    setId(id + 1)
  }

  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={7}
          maxWidth="900px"
          borderWidth={3}
          borderRadius={20}
          borderColor={useColorModeValue('black', 'yellow')}
          boxShadow="lg"
          width="full"
        >
          <Heading as={'h3'} size={'section-title'}>
            🤖Ask the 🤖AI🤖 a question and experiment different token amounts
            and their answers🤖
          </Heading>
          <Box my={4}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  borderColor={useColorModeValue('black', 'yellow')}
                  contentEditable={true}
                  onChange={updateAiValues}
                  suppressContentEditableWarning={true}
                  type="text"
                  id="prompt"
                  name="prompt"
                  placeholder="A crafty question..."
                  value={aiValues.prompt}
                  required
                />
                <br />
                <br />
                <Heading as={'h3'} size={'section-title'}>
                  Token Amount
                </Heading>
                <Select
                  borderColor={useColorModeValue('black', 'yellow')}
                  name="maxTokens"
                  value={aiValues.maxTokens}
                  onChange={updateAiValues}
                >
                  <option value="32">32</option>
                  <option value="64">64</option>
                  <option value="128">128</option>
                  <option value="256">256</option>
                  <option value="512">512</option>
                </Select>
                <Select
                  borderColor={useColorModeValue('black', 'yellow')}
                  name="temperature"
                  value={aiValues.temperature}
                  onChange={updateAiValues}
                >
                  <option value={0.2}>0.2</option>
                  <option value={0.4}>0.4</option>
                  <option value={0.6}>0.6</option>
                  <option value={0.8}>0.8</option>
                  <option value={1.0}>1.0</option>
                </Select>
              </FormControl>
              <SubmitButton />
            </form>
          </Box>
        </Box>
      </Flex>
      <br />
      <Box
        p={7}
        maxWidth="900px"
        borderWidth={3}
        borderRadius={20}
        borderColor={useColorModeValue('black', 'yellow')}
        boxShadow="lg"
        width="full"
      >
        {cardList.length > 0 ? (
          <div>
            <Heading as={'h3'} size={'section-title'}>
              Responses
            </Heading>
            <Heading as={'h3'} size={'section-title'}>
              {cardList
                .map((card) => (
                  <>
                    <br />
                    <br />
                    <Card key={card[0]} prompt={card[1]} answer={card[2]} />
                  </>
                ))
                .reverse()}
            </Heading>
          </div>
        ) : (
          <div>
            <Heading as={'h3'} size={'section-title'}>
              No prompts generated yet
            </Heading>
          </div>
        )}
      </Box>
    </>
  )
}

export default AiForm
