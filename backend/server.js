const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const PORT = 4000;

const schema = buildSchema(`
  type Query {
    word(id: Int!): Word
    words(tag: String): [Word]
  },
  type Word {
    id: String
    original: String
    translation: String
    tags: [String]
  }
  type Mutation {
    addTagToWord(id: Int!, tag: String): Word
  }
`);

const WORDS = [
  {
    id: 1,
    original: 'pes',
    translation: 'dog',
    tags: ['common', 'noun', 'masculine']
  },
  {
    id: 2,
    original: 'misto',
    translation: 'place',
    tags: ['noun', 'neutral']
  },
  {
    id: 3,
    original: 'delat',
    translation: 'to do',
    tags: ['verb', 'imperfective']
  }
];

function getWords({tag}) {
  return tag ? WORDS.filter(word => word.tags.includes(tag)) : WORDS;
}

function getSingleWord({ id }) {
  return WORDS.find(word => word.id === id);
}

function addTagToWord({ id, tag }) {
  const foundWord = WORDS.find(word => word.id === id);
  if (foundWord && !foundWord.tags.includes(tag)) {
    foundWord.tags = [
      ...foundWord.tags,
      tag,
    ];
  }
  return foundWord;
}

const root = {
  word: getSingleWord,
  words: getWords,
  addTagToWord: addTagToWord,
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`[INFO] Listening at port ${PORT}/graphiql`))