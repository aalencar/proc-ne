import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import style, { css } from 'styled-components';

const COMMON_COLOR = 'green'

const Card = style.div`
  background-color: salmon;
  padding: 10px;
  margin-bottom: 20px;

  ${props => props.tags.includes('common') && css`
    background-color: ${COMMON_COLOR};
  `}
`;

const FlashcardList = () => (
    <Query
      query={gql`
        {
          flashcards {
            id
            front
            back
            tags
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>loading...</p>;
        if (error) return <p>Error...: </p>;

        return data.flashcards.map(({ id, front, tags }) => (
          <Card tags={tags} key={id}>
            {front}
          </Card>
        ));
      }}
    </Query>
)

export default FlashcardList;