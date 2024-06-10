const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Defina seu esquema GraphQL
const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: Author!
    category: Category!
  }

  type Author {
    id: ID!
    name: String!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    books: [Book]
    authors: [Author]
    categories: [Category]
    bookByCategory(category: ID!): [Book]
  }
`);

// Dados de exemplo
const booksData = [
  { id: '1', title: 'GraphQL in Practice', authorId: '1', categoryId: '1' },
  { id: '2', title: 'Mastering GraphQL', authorId: '2', categoryId: '2' },
];

const authorsData = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
];

const categoriesData = [
  { id: '1', name: 'Programming' },
  { id: '2', name: 'Technology' },
];

// Resolvedores para consultas
const root = {
    books: () => booksData.map(book => ({ ...book, author: authorsData.find(author => author.id === book.authorId), category: categoriesData.find(category => category.id === book.categoryId) })),
    authors: () => authorsData,
    categories: () => categoriesData,
    bookByCategory: ({category}) => booksData.map(book => ({ ...book, author: authorsData.find(author => author.id === book.authorId), category: categoriesData.find(category => category.id === book.categoryId) }))
                                            .filter(book => book.categoryId == category )
  };
  
  // Configuração do servidor express com GraphQL
  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Habilita a interface gráfica para testar queries
  }));
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  