
import { GoogleGenAI, Type } from "@google/genai";
import { AIGeneratedDesign } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const getAIClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is not configured.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const circuitDesignSchema = {
    type: Type.OBJECT,
    properties: {
        circuit: {
            type: Type.OBJECT,
            properties: {
                components: {
                    type: Type.ARRAY,
                    description: "List of electronic components required.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING, description: "e.g., Arduino Uno, 5mm Red LED, 220 Ohm Resistor" },
                            quantity: { type: Type.INTEGER, description: "The number of this component needed." }
                        },
                        required: ["name", "quantity"]
                    }
                },
                connections: {
                    type: Type.ARRAY,
                    description: "Step-by-step wiring instructions.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            from: { type: Type.STRING, description: "The starting component and pin, e.g., 'Arduino Uno Pin 13'" },
                            to: { type: Type.STRING, description: "The ending component and pin, e.g., 'LED Anode'" },
                            detail: { type: Type.STRING, description: "Additional details, e.g., 'via 220 Ohm Resistor'" }
                        },
                        required: ["from", "to", "detail"]
                    }
                },
                explanation: {
                    type: Type.STRING,
                    description: "A brief, beginner-friendly explanation of how the circuit works."
                }
            },
            required: ["components", "connections", "explanation"]
        },
        code: {
            type: Type.OBJECT,
            properties: {
                language: { type: Type.STRING, description: "The programming language, e.g., 'Arduino (C++)' or 'Python'" },
                code: { type: Type.STRING, description: "The complete, well-commented code to run the project." }
            },
            required: ["language", "code"]
        }
    }
};


export const generateCircuitAndCode = async (description: string): Promise<AIGeneratedDesign> => {
    const ai = getAIClient();
    const model = 'gemini-2.5-pro';

    const prompt = `
        You are a robotics and electronics expert who creates project plans for students. 
        Based on the following user request, generate a complete project plan including a list of components, wiring connections, a simple explanation, and the necessary code.
        Ensure the response is structured according to the provided JSON schema.
        The project should be suitable for a beginner to intermediate hobbyist.

        User Request: "${description}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: circuitDesignSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text;
        const parsedData = JSON.parse(jsonText);
        return parsedData as AIGeneratedDesign;

    } catch (error) {
        console.error("Error generating circuit with Gemini:", error);
        throw new Error("Failed to generate AI design. The model may be unavailable or the request was invalid.");
    }
};

export const checkCodeForErrors = async (code: string, language: string): Promise<string> => {
    const ai = getAIClient();
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are an expert programmer and a helpful teaching assistant for robotics students.
        Analyze the following ${language} code for errors, potential bugs, and areas for improvement.
        Provide a friendly, step-by-step explanation of any issues found and suggest the corrected code.
        If there are no errors, compliment the user and suggest one possible improvement or best practice.
        Format your response in clear Markdown.

        Code to analyze:
        \`\`\`${language}
        ${code}
        \`\`\`
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error checking code with Gemini:", error);
        throw new Error("Failed to get AI feedback. The model may be unavailable or the request was invalid.");
    }
};
