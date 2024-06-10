const soap = require('soap');
const http = require('http');

// Definindo as funções do serviço
const service = {
  ProductInfoService: {
    ProductInfoPort: {
      getProductInfo: function(args) {
        // Aqui você pode implementar a lógica para buscar as informações do produto com base nos argumentos fornecidos
        const productId = args.productId;
        // Exemplo de resposta
        return {
          name: 'Product Name',
          description: 'Product Description',
          price: 99.99,
        };
      }
    }
  }
};

// Criando o servidor SOAP
const xml = require('fs').readFileSync('service.wsdl', 'utf8');
const server = http.createServer(function(request,response) {
  response.end("404: Not Found: " + request.url);
});

server.listen(8000);
soap.listen(server, '/productInfo', service, xml);