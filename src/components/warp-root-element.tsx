import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

export const wrapRootElement:React.FC<any> = ({ element }:any) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);


