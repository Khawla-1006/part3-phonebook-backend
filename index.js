const express = require('express')
const app = express()

app.use(express.json())

let persons = [
        { 
          "id": "1",
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": "2",
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": "3",
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": "4",
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response)=>{
    response.send(`
        <h2>Phonebook has info for ${persons.length} people </h2>
        ${new Date()}
        `)
})

app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).send(`<h2>Person not found!</h2>`)
    }
})

app.delete('/api/persons/:id', (request, response)=>{
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateUniqueId = () =>{
  const maxId = persons.length > 0 
  ? Math.floor(Math.random() * Math.max(...persons.map(n => Number(n.id))) * 100)
  : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response)=>{

    const body = request.body
    const sameName = persons.find(per => per.name === body.name)

    if(!body.name){
      return response.status(400).json({
        error: 'name missing'
      })
    }
    if(!body.number){
      return response.status(400).json({
        error : "number missing"
      })
    }
    if(sameName){
      return response.status(400).json({
        error : "name must be unique"
      })
    }

    const person = {
      id : generateUniqueId(),
      name : body.name,
      number : body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}...`)
console.log(Math.floor(Math.random() * 60))