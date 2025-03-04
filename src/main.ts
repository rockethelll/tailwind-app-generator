import { openai } from './openai';

const form = document.getElementById('generate-form') as HTMLFormElement;
const iframe = document.getElementById('generated-code') as HTMLIFrameElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const prompt = formData.get('prompt') as string;

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You create websites with tailwind css. You are a professional designer and developer. Your task is to create a website based on the user prompt. You will return only HTML code without any other text. You will return valid HTML. You never add any markdown.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  const code = chatCompletion.choices[0].message.content;

  if (!code) return;

  iframe.srcdoc = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Code</title>
      <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    </head>
    <body>
      ${code}
    </body>
  </html>
  `;
});
