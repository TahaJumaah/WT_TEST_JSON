import mustache from "mustache";
import fs from "node:fs/promises";

const language = {
  source_language: "English",
  target_language: "French",
};

async function readFileAndCreatePrompt(fileName) {
  try {
    const file = await fs.readFile(`./${fileName}.json`, {
      encoding: "utf-8",
    });

    if (file) {
      const promptJSON = JSON.parse(file);
      const formattedPrompts = promptJSON.prompts.join("\n");
      const finalOutput = mustache.render(formattedPrompts, language);
      console.log(finalOutput);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

readFileAndCreatePrompt("input_prompt");
