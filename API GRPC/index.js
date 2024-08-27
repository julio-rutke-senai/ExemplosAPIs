const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Carregando o arquivo de definição protobuf
const packageDefinition = protoLoader.loadSync('auth.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Carregando o pacote definido no arquivo de definição
const authenticationPackage = grpc.loadPackageDefinition(packageDefinition).authentication;

// Função de autenticação
function authenticate(call, callback) {
  const request = call.request;
  // Lógica de autenticação - exemplo: verificar usuário/senha
  if (request.username === 'user' && request.password === 'password') {
    callback(null, { authenticated: true });
  } else {
    callback({
      code: grpc.status.UNAUTHENTICATED,
      details: 'Invalid username or password'
    });
  }
}

// Criando o servidor gRPC
const server = new grpc.Server();
server.addService(authenticationPackage.AuthenticationService.service, {
  authenticate: authenticate
});

// Iniciando o servidor
server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('Server running on port:', port);
});
