# Aplicação Ponto

## 1. Arquitetura de pastas

Para desenvolver esse projeto, foi utilizado c# com .Net 6 no back end e ReactJS no front end.

- DTO: pasta para o padrão de projeto DTO. É usado junto api-ponto.
- api-ponto: é o back end e api em c# com somente 2 endpoints; um para somente teste e outro feito para resolver o problema sugerido.
- ponto-digital-front: projeto criado com vite, com pastas para componentes, services para comunicação com api, contexts para criação context api (gerenciador de estados global), hooks para um hook personalizado, utils para função útil em vários partes do código.

## 2. Como rodar o projeto
Para rodar a api, como já mencionado, é desenvolvido em .Net 6. Não foi utilizado nenhuma biblioteca de terceiros, assim, só precisa do SDK.

Para o front end é preciso rodar os seguintes comandos:
Para instalar as dependências do projeto no front end
```
npm install
```
ou
```
npm install
```
Para rodar o servidor de desenvolvimento:
```
npm run dev
```
ou
```
yarn dev
```

