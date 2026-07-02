# 💈 Barbearia App

Aplicativo mobile desenvolvido em grupo durante o curso Técnico em Desenvolvimento de Sistemas da ETEC, com o objetivo de facilitar o gerenciamento de uma barbearia por meio de uma interface intuitiva e uma API REST.

## 📱 Sobre o projeto

O sistema é composto por duas aplicações:

* **AppBarbeariaM** → Aplicativo mobile desenvolvido com React Native e Expo.
* **Api_Barbearia** → API REST desenvolvida em ASP.NET Core (C#), responsável pelo gerenciamento dos dados e comunicação com o aplicativo.

## ✨ Funcionalidades

* Cadastro de usuários
* Login e autenticação
* Agendamento de horários
* Gerenciamento de clientes
* Comunicação entre aplicativo e API REST

## 🛠️ Tecnologias utilizadas

### Mobile

* React Native
* Expo
* JavaScript

### Backend

* ASP.NET Core
* C#
* Entity Framework Core
* REST API

## 📂 Estrutura do projeto

```text
AppBarbearia/
│
├── Api_Barbearia/      # API REST em ASP.NET Core
│
└── AppBarbeariaM/      # Aplicativo Mobile (React Native + Expo)
```

## ▶️ Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
```

### 2. Executar a API

```bash
cd Api_Barbearia
dotnet restore
dotnet run
```

### 3. Executar o aplicativo

```bash
cd AppBarbeariaM
npm install
npx expo start
```

Abra o aplicativo pelo **Expo Go** ou em um emulador Android/iOS.

## 🎯 Objetivo

Este projeto foi desenvolvido como atividade acadêmica na ETEC, colocando em prática conceitos de desenvolvimento mobile, desenvolvimento de APIs REST, integração entre frontend e backend e trabalho em equipe.

## 👥 Desenvolvido por

Projeto desenvolvido em grupo pelos alunos da ETEC como parte das atividades do curso Técnico em Desenvolvimento de Sistemas.
