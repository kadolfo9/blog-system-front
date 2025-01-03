import { useState } from 'react'
import './styles/App.css'
import { Button, Container } from '@mui/material'

function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container maxWidth="sm">
        <Button variant="contained" onClick={() => setCount(count + 1)}>
          Contador: {count}
        </Button>
      </Container>
    </>
  )
}

export default HomePage
