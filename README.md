# Front Ativos

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![Spring Boot](https://img.shields.io/badge/API-Spring%20Boot-6DB33F?logo=springboot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-blue)

Sistema desenvolvido para realizar o gerenciamento de ativos de TI de uma empresa.

A aplicação permite organizar informações de equipamentos como computadores, roteadores, impressoras, licenças de software e ramais, oferecendo uma interface simples para consulta, cadastro e gerenciamento dos ativos.

Esse projeto faz parte dos meus estudos em desenvolvimento Full Stack utilizando React no Front-end e Spring Boot no Back-end.

A ideia principal sempre foi criar uma aplicação que se aproximasse de um cenário real encontrado dentro de empresas de suporte e infraestrutura de TI.

---

# Objetivo

Grande parte das empresas ainda controlam seus ativos utilizando planilhas.

O objetivo desse projeto é centralizar essas informações em uma aplicação web, permitindo consultar rapidamente qualquer equipamento cadastrado.

Além disso, o projeto serve como laboratório para estudar integração entre Front-end e Back-end utilizando tecnologias modernas.

---

# Tecnologias utilizadas

### Front-end

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- React Router
- React Hook Form

---

# Estrutura do projeto

```
src
│
├── assets
│      imagens e ícones
│
├── components
│      componentes reutilizáveis
│
├── hooks
│      hooks personalizados
│
├── layouts
│      estrutura principal das páginas
│
├── lib
│      funções auxiliares
│
├── pages
│      páginas do sistema
│
├── services
│      comunicação com API
│
├── types
│      interfaces TypeScript
│
├── App.tsx
│
└── main.tsx
```

A ideia foi separar cada responsabilidade em sua própria pasta para facilitar a manutenção do projeto conforme ele cresce.

---

# Funcionalidades

Atualmente o sistema possui gerenciamento para diversos tipos de ativos.

## Máquinas

Permite visualizar todos os computadores cadastrados.

Cada equipamento possui informações como:

- Hostname
- Endereço IP
- Sistema Operacional
- Processador
- Memória RAM
- Armazenamento
- Tipo do armazenamento
- Antivírus instalado
- Licença Office
- Status

Também é possível realizar operações de cadastro, edição e remoção.

---

## Roteadores

Tela responsável pelo gerenciamento dos roteadores da empresa.

Possibilita visualizar:

- Nome
- Endereço IP
- Status
- Demais informações cadastradas

---

## Impressoras

Permite controlar todas as impressoras cadastradas.

Facilitando a localização dos equipamentos e sua organização.

---

## Ramais

Área destinada ao gerenciamento dos ramais telefônicos da empresa.

Possibilita consultar rapidamente cada ramal cadastrado.

---

## Licenças

Tela destinada ao controle de licenças de software.

Ajuda a manter organizado quais equipamentos possuem licenças instaladas.

---

## Login

O sistema também possui telas de autenticação para acesso à aplicação.

---

# Interface

Durante o desenvolvimento procurei criar uma interface limpa e fácil de utilizar.

Para isso utilizei o **shadcn/ui**, que fornece componentes modernos e altamente personalizáveis.

Entre eles:

- Dialogs
- Sidebar
- Cards
- Alert Dialog
- Inputs
- Forms
- Botões
- Componentes de navegação

Isso deixou o desenvolvimento muito mais organizado e com uma aparência profissional.

---

# Comunicação com o Back-end
---

O Front-end não possui regra de negócio.

Toda a lógica de persistência fica no Back-end desenvolvido em Spring Boot.

O React é responsável por:

- realizar as requisições para a API;
- exibir os dados recebidos;
- enviar informações de cadastro;
- atualizar registros;
- remover registros;
- apresentar mensagens para o usuário.

Todo o fluxo acontece consumindo endpoints REST.

Fluxo da comunicação:

```
Usuário

↓

React

↓

Services

↓

API Spring Boot

↓

Banco de Dados

↓

API Spring Boot

↓

React

↓

Tela atualizada
```

---

# Organização dos componentes

Procurei dividir a interface em pequenos componentes reutilizáveis.

Exemplo:

```
MachineCard

↓

MachineGrid

↓

MachineFormDialog

↓

DeleteConfirmDialog

↓

StatsBar

↓

SearchBar
```

Essa abordagem deixa o código mais organizado e evita repetição.

Além disso, facilita futuras manutenções.

---

# Principais aprendizados

Durante o desenvolvimento consegui praticar diversos conceitos importantes.

Entre eles:

- Componentização
- React Hooks
- React Router
- TypeScript
- Comunicação com API REST
- Organização de projetos React
- Gerenciamento de formulários
- Estruturação de componentes reutilizáveis
- Integração Front-end e Back-end
- Organização de código para projetos maiores

---

# Como executar o projeto

## Clonar o repositório

```bash
git clone https://github.com/Bruno-FV/front-ativos.git
```

## Instalar as dependências

```bash
npm install
```

## Executar

```bash
npm run dev
```

O Vite iniciará a aplicação normalmente.

---

# Melhorias futuras

O projeto continua em desenvolvimento.

Algumas melhorias planejadas são:

- Dashboard com indicadores
- Filtros avançados
- Exportação de relatórios
- Controle de usuários
- Histórico de alterações
- Paginação
- Melhorias na responsividade
- Dark Mode completo
- Integração com autenticação JWT

---

# Considerações finais

Esse projeto foi desenvolvido com foco em praticar tecnologias modernas do ecossistema React e entender melhor como funciona a comunicação entre Front-end e Back-end.

Ao longo do desenvolvimento procurei organizar o código utilizando componentes reutilizáveis, separação de responsabilidades e uma estrutura que facilite futuras evoluções da aplicação.

Além de servir como projeto de estudo, ele também representa uma solução que poderia ser utilizada em um ambiente corporativo para auxiliar no gerenciamento de ativos de TI.
