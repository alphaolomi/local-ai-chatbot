# LM Studio



1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Model Providers](#model-providers)
4. [Chat](#chat)
5. [API Server](#api-server)


## Introduction

LM Studio (Landuage Model Studio) is a desktop app that allows you to run large language models (LLMs) on your local machine. It is designed to be used with a compatible AI model provider. With LM Studio, you can ...


With LM Studio, you can ...

- 🤖 Run LLMs on your laptop, entirely offline
- 👾 Use models through the in-app Chat UI or an OpenAI compatible local server
- 📂 Download any compatible model files from HuggingFace 🤗 repositories
- 🔭 Discover new & noteworthy LLMs in the app's home page

LM Studio supports any [ggml](https://github.com/ggerganov/ggml) Llama, MPT, and StarCoder model on Hugging Face (Llama 2, Orca, Vicuna, Nous Hermes, WizardCoder, MPT, etc.)



## Getting Started

Minimum requirements: M1/M2/M3 Mac, or a Windows PC with a processor that supports AVX2. Linux is available in beta.

1. Download and install LM Studio from [lmstudio.ai](https://lmstudio.ai/).

## Model Providers

Download any compatible model files from HuggingFace 🤗 repositories. LM Studio supports any [ggml](https://ggml.ai/)

## Chat

LM Studio comes with a built-in chat UI that allows you to interact with the AI models. You can also use your own OpenAI compatible server.

## API Server

LM Studio also comes with an API server that allows you to interact with the AI models programmatically. The API server is built with FastAPI and can be used to interact with the AI models from any programming language.

By default, the API server runs on `http://localhost:1243`. You can change the port by on the UI settings page.

To start the API server, Click on the `Start API Server` button on the UI page.


