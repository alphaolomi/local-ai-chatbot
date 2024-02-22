<h1 align="center">Local AI Chatbot</h1>

<p align="center">
  An open-source AI chatbot app template built for Local usage, with a focus on privacy. <br>
  This is intended to the UI for the AI Chatbot, and is designed to be used with a compatible AI model provider.
</p>

## Model Providers

This template ships with OpenAI `gpt-3.5-turbo` as the default. Users can also use their own OpenAI compatible server.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Local AI Chatbot. 

> Note: You should not commit your `.env` file or it will expose secrets.

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).