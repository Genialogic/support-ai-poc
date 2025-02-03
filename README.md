<div align="center">
  
# ![Deepchat-cover](https://github.com/Dnowdd/DeepChat/blob/main/public/deepchat-cover.png)

[![GitHub Stars](https://img.shields.io/github/stars/Dnowdd/DeepChat?style=social)](https://github.com/Dnowdd/DeepChat/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Dnowdd/DeepChat?style=social)](https://github.com/Dnowdd/DeepChat/network/members)

</div>

**DeepChat** is a local chatbot project integrated with a modern web interface, developed with React.js. The system utilizes the DeepSeek-R1 artificial intelligence model, processed via Ollama.

<br /><br /><br />

## 📸 Screenshots

<img src="https://raw.githubusercontent.com/Dnowdd/DeepChat/main/public/print_1.png" />
<img src="https://raw.githubusercontent.com/Dnowdd/DeepChat/main/public/print_2.png" />

<br /><br /><br />

## 🚀 Quick Start

1. Clone the Repository
   > Run the following command in the terminal to clone the project:

```bash
git clone https://github.com/Dnowdd/DeepChat.git

cd DeepChat
```

2. Install Dependencies
   > Make sure you have [Node.js](https://nodejs.org/en/download/current) installed on your machine. Then, install the project dependencies by running:

```bash
npm install
```

3. Configuring .env
   > Before running the project, check if the .env file exists at the root of the project. If it doesn't, you can create and configure it by providing information such as `AI_ENDPOINT` and `AI_MODEL` so that the system can communicate with DeepSeek.

```bash
VITE_AI_ENDPOINT=http://localhost:11434/api/generate # AI API endpoint, the ollama default is http://localhost:11434/api/generate

VITE_AI_MODEL=deepseek-r1:8b # AI model name. The project was built using deepseek-r1:8b, but you can change it to any other model
```

4. Run the Project

```bash
npm run dev
```

5. Run Deepseek
   > To use DeepSeek-R1, first install [Ollama](https://ollama.com/download). After installation, open a new terminal and execute the following command:

```bash
ollama run deepseek-r1:8b
```

The 8b parameter refers to a model with 8 billion parameters. The higher the number of parameters, the greater the computational resource requirements, but also the more advanced the artificial intelligence will be. For more information on available models, refer to the official [DeepSeek documentation](https://ollama.com/library/deepseek-r1) on the Ollama website.

<br /><br /><br />

## ✨ Features

- Switch between website languages: `en-us` and `pt-br`
- Cancel AI text generation at any time
- Fully responsive interface

<br /><br /><br />

## 🔜 Upcoming Features

- Support for multiple chat sessions
- Custom canvas for code snippets
- Markdown support for text formatting
- Enhanced input prompt for improved user experience

<br /><br /><br />

## 🤝 Contributing

We encourage contributions from the open-source community. Feel free to submit issues, suggestions, or pull requests to help improve **DeepChat**.

<br /><br /><br />

## 📄 License

**DeepChat** is distributed under the _MIT License_, allowing for open collaboration and modification.

<br /><br /><br />

## 📧 Contact

For any inquiries, suggestions, or feedback, don’t hesitate to reach out:

- Github: [Dnowdd](https://github.com/Dnowdd)
- LinkedIn: [Dnowdd](https://www.linkedin.com/in/dnowdd/)
- Email: [david.queiroz@dnowdd.com](mailto:david.queiroz@dnowdd.com)

<br /><br /><br />

<div align="center">
Made with ❤️ by David Queiroz.
</div>
