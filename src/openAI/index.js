const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: 'org-MwrtXUgtv3wYVujHO38RmCcu',
  project: 'proj_53IM5lVfcFTKkoaBS1h9isrM'
})

const openAIController = {
  convertTextToJSON: async (text) => {
    try {
      console.log('entrando a openAI')
      console.log('///////////////////////////////////////////////////////////')
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant specialized in data analysis and breakdown." },
          {
            role: "user",
            content: `I have the following purchase receipt data. Please analyze it and provide only the date of issue, the product details (including name, quantity, and unit price), the total amount, and a category for the receipt in Spanish. For the category, analyze the product names and descriptions, and try to classify them using common categories like "Alimentos", "Farmacia", "Electrónica", etc. Return the result in plain text that can be easily converted to JSON using JSON.stringify, without any formatting tags or labels.
            ${text}`,
          },
        ],
      });
      console.log(completion.choices[0].message.content);
      fs.writeFile(`./json/reciboFRONT.txt`, completion.choices[0].message.content, (err) => {
        if (err) {
          console.error('Error al guardar el archivo:', err);
          return;
        }
        console.log('El archivo se ha guardado correctamente');
      });
      return completion
    } catch (error) {
      console.error('Error al analizar el texto:', error);
    }
  }
}

module.exports = openAIController;