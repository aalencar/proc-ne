import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import FlashcardList from './components/FlashcardList';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <FlashcardList></FlashcardList>
      </div>
    </ApolloProvider>
  );
}

export default App;
