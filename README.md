# Journaler - PW1- REACT

Este é o frontend da aplicação de diário desenvolvida como parte do Trabalho 1 da disciplina de Programação para Web (PW1). A aplicação é uma Progressive Web App (PWA) construída com React, utilizando Bootstrap para o design responsivo, e está deployada na plataforma Vercel. Ela consome a API disponível no repositório [trabalho1-pw1-journal](https://github.com/FelipeFontanaSeganfredo/trabalho1-pw1-journal).

## 🌐 Demonstração

A aplicação está disponível em: [https://trabalho1-pw1-frontend-react.vercel.app](https://trabalho1-pw1-frontend-react.vercel.app)

## Tecnologias Utilizadas

* React (Create React App com template PWA)
* Bootstrap
* React-Bootstrap
* Yarn
* Vercel (deploy contínuo)

## 📁 Estrutura do Projeto

O projeto segue a estrutura padrão do Create React App:

* **`public/`**: Arquivos públicos e o `manifest.json` para configuração do PWA.
* **`src/`**: Código-fonte da aplicação.

  * **`components/`**: Componentes reutilizáveis da interface.
  * **`pages/`**: Páginas principais da aplicação.
  * **`services/`**: Serviços para comunicação com a API.
  * **`App.js`**: Componente principal da aplicação.
  * **`index.js`**: Ponto de entrada da aplicação.([Medium][2])

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/FelipeFontanaSeganfredo/trabalho1-pw1-frontend-react.git
   ```



2. **Acesse o diretório do projeto:**

   ```bash
   cd trabalho1-pw1-frontend-react
   ```



3. **Instale as dependências:**

   ```bash
   yarn install
   ```



4. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e defina a URL da API:

   ```env
   REACT_APP_API_URL=http://localhost:3002
   ```



Substitua `http://localhost:3002` pela URL onde sua API está rodando.

5. **Inicie a aplicação:**

   ```bash
   yarn start
   ```



A aplicação estará disponível em `http://localhost:3000`.

## Build para Produção

Para criar uma versão otimizada da aplicação para produção:

```bash
yarn build
```



Os arquivos otimizados serão gerados no diretório `build/`.

## 📲 Progressive Web App (PWA)

Este projeto foi iniciado com o template PWA do Create React App, permitindo que a aplicação funcione offline e possa ser instalada como um aplicativo nativo.

Para ativar o comportamento offline, modifique o arquivo `src/index.js` alterando:

```javascript
serviceWorker.unregister();
```



para:

```javascript
serviceWorker.register();
```

## Estilização com Bootstrap

O projeto utiliza o Bootstrap para estilização e componentes responsivos. O Bootstrap foi adicionado ao projeto com:

```bash
yarn add bootstrap react-bootstrap
```



E importado no arquivo `src/index.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```


## ☁️ Deploy na Vercel

A aplicação está deployada na plataforma Vercel, que oferece integração contínua com o GitHub. A cada push no repositório, a Vercel automaticamente constrói e publica a nova versão da aplicação.

## 🔗 Integração com a API

Este frontend consome a API disponível no repositório [trabalho1-pw1-journal](https://github.com/FelipeFontanaSeganfredo/trabalho1-pw1-journal). Certifique-se de que a API esteja rodando e acessível na URL definida na variável `REACT_APP_API_URL`.
