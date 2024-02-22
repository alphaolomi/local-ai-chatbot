<h1 align="center">Local AI Chatbot</h1>

<p align="center">
  An open-source AI chatbot app template built for Local usage, with a focus on privacy. <br>
  This is intended to the UI for the AI Chatbot, and is designed to be used with a compatible AI model provider.
</p>

## Model Providers

This template ships with OpenAI `gpt-3.5-turbo` as the default. Users can also use their own OpenAI compatible server.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [pnpm](https://pnpm.io/) - Package Manager
- [Docker](https://www.docker.com/products/docker-desktop) - For running Redis KV store
- [LM Studio](https://lmstudio.ai/) - For loading and starting the AI models

## Getting Started

### Clone the repository

Clone the repository and navigate to the project folder.

```bash
git clone https://github.com/alphaolomi/local-ai-chatbot.git
cd local-ai-chatbot
```

### Start the Redis KV store

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

### Configuration

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Local AI Chatbot. 

> Note: You should not commit your `.env` file or it will expose secrets.

### Install dependencies and start the app

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

