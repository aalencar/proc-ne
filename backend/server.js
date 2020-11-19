const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');


const PORT = 4000;

const schema = buildSchema(`
  type Query {
    flashcard(id: Int!): Flashcard
    flashcards(tag: String): [Flashcard]
  },
  type Flashcard {
    id: String
    front: String
    back: String
    tags: [String]
  }
  type Mutation {
    addTagToFlashcard(id: Int!, tag: String): Flashcard
  }
`);

const FLASHCARDS = [
  {
    id: 1,
    front: 'dog',
    back: 'pes',
    tags: ['common', 'noun', 'masculine']
  },
  {
    id: 2,
    front: 'place',
    back: 'misto',
    tags: ['noun', 'neutral']
  },
  {
    id: 3,
    front: 'to do',
    back: 'delat',
    tags: ['verb', 'imperfective']
  }
];

function getFlashcards({tag}) {
  return tag ? FLASHCARDS.filter(flashcard => flashcard.tags.includes(tag)) : FLASHCARDS;
}

function getFlashcardById({ id }) {
  return FLASHCARDS.find(flashcard => flashcard.id === id);
}

function addTagToFlashcard({ id, tag }) {
  const foundCard = FLASHCARDS.find(flashcard => flashcard.id === id);
  if (foundCard && !foundCard.tags.includes(tag)) {
    foundCard.tags = [
      ...foundCard.tags,
      tag,
    ];
  }
  return foundCard;
}

const root = {
  flashcard: getFlashcardById,
  flashcards: getFlashcards,
  addTagToFlashcard: addTagToFlashcard,
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`[INFO] Listening at port ${PORT}/graphiql`))