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
  const [gptParams, setGptParams] = React.useState({
    prompt: '',
    maxTokens: 50,
  })

  const updateGPTParams = (e) =>
    setGptParams({ ...gptParams, [e.target.name]: e.target.value })

  useEffect(() => {
    const fetchData = async () => {
      if (gptParams.prompt) {
        setIsLoading(true)
        const res = await fetch('/api/gpt3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
          },
          body: JSON.stringify({
            prompt: gptParams.prompt,
            maxTokens: parseInt(gptParams.maxTokens),
          }),
        })
        const data = await res.json()
        setResults(data)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [gptParams.prompt])

  function handleSubmit(e) {
    e.preventDefault()
    setCardList(cardList.concat([[id, gptParams.prompt, results.text]]))
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
                  onChange={updateGPTParams}
                  suppressContentEditableWarning={true}
                  type="text"
                  id="prompt"
                  name="prompt"
                  placeholder="Product Name"
                  value={gptParams.prompt}
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
                  value={gptParams.maxTokens}
                  onChange={updateGPTParams}
                >
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
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
            <br />
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
