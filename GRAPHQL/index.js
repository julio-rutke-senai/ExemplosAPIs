const { ApolloServer, gql } = require('apollo-server');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./dados');
}

// Defina seu esquema GraphQL
const typeDefs = gql`
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
`;

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

// Resolvers
const resolvers = {
  
  Query: {
    books: () => booksData.map(book => ({ ...book, author: authorsData.find(author => author.id === book.authorId), category: categoriesData.find(category => category.id === book.categoryId) })),
    authors: () => authorsData,
    categories: () => categoriesData,
    bookByCategory: ({category}) => booksData.map(book => ({ ...book, author: authorsData.find(author => author.id === book.authorId), category: categoriesData.find(category => category.id === book.categoryId) }))
                                            .filter(book => book.categoryId == category )
    }
  };
  

  const addAuthor = (id, name) => {
    authorsData = JSON.parse(localStorage.getItem("authors")) || []
    const author = { id, name };
    authorsData.push(author);

    localStorage.setItem("authors", JSON.stringify(authorsData))
    return author;
};

const listAuthors = () => {
  authorsData = JSON.parse(localStorage.getItem("authors")) || []
  return authorsData
};


const updateAuthorsName = (id, name) => {
  authorsData = JSON.parse(localStorage.getItem("authors")) || []
  const author = authorsData.find(a => a.id === id);
  if (author) author.name = name;

  localStorage.setItem("authors", JSON.stringify(authorsData))
  return author;
};

const deleteAuthor = (id) => {
  authorsData = JSON.parse(localStorage.getItem("authors")) || []
  authorsData = authorsData.filter(a => a.id !== id);

  localStorage.setItem("authors", JSON.stringify(authorsData))
};
 
// Servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(({ url }) => {
    console.log(`GraphQL Server rodando em ${url}`);
});
  

module.exports = {
  addAuthor,
  listAuthors,
  updateAuthorsName,
  deleteAuthor
};