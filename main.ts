import * as mustache from "mustache";
import * as fs from "node:fs/promises";

type languageDef = {
  source_language: string;
  target_language: string;
};

const language: languageDef = {
  source_language: "English",
  target_language: "French",
};

async function readFileAndCreatePrompt(fileName: string) {
  try {
    const file: string = await fs.readFile(fileName, {
      encoding: "utf-8",
    });

    if (file) {
      const promptJSON = JSON.parse(file);
      const formattedPrompts = promptJSON.prompts.join("\n");
      const finalOutput = mustache.render(formattedPrompts, language);
      return finalOutput;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

const outputConsole = async () => {
  console.log(await readFileAndCreatePrompt(`./${process.argv[2]}`));
};

outputConsole();
