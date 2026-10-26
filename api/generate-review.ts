import type { IncomingMessage, ServerResponse } from "http";

interface ReviewRequestBody {
  merchantName?: string;
  category?: string;
  city?: string;
  rating?: number;
  tags?: string[];
  language?: "English" | "Gujarati" | "Hindi";
}

const FALLBACK_DRAFTS: Record<string, string[]> = {
  English: [
    "Had a wonderful experience at {name}! Purchased genuine 916 Hallmark jewelry. The staff was extremely polite, weights were transparently verified on digital scales, and making charges were very fair. Highly recommended!",
    "Best jewelry showroom in the area. Transparent gold purity certification and superb collection of bridal designs. Prompt service and courteous staff!"
  ],
  Gujarati: [
    "{name} ખાતે ખૂબ જ ઉત્તમ અનુભવ રહ્યો! ૯૧૬ હોલમાર્ક દાગીના, પારદર્શક વજન અને વાજબી ઘડામણ ચાર્જિસ. સ્ટાફનું વર્તન અત્યંત વિનમ્ર છે. ખરીદી માટે શ્રેષ્ઠ શોરૂમ!",
    "ખૂબ જ સુંદર અને અવનવી ડિઝાઇનના સોનાના દાગીના મળ્યા. હોલમાર્કિંગ અને વજનમાં ૧૦૦% પ્રમાણિકતા છે. બધાને આ શોરૂમની મુલાકાત લેવા ભલામણ કરું છું."
  ],
  Hindi: [
    "{name} में बहुत ही बेहतरीन अनुभव रहा! 916 हॉलमार्क सोने के आभूषण, बिल्कुल पारदर्शी वजन और बहुत वाजिब मेकिंग चार्जेस। खरीदारी के लिए सबसे भरोसेमंद दुकान!",
    "यहाँ के स्टाफ का व्यवहार बहुत आदरपूर्ण है और डिज़ाइन्स एक से बढ़कर एक हैं। शुद्धता और बिलिंग में पूरी पारदर्शिता है।"
  ]
};

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  try {
    const payload: ReviewRequestBody = body ? JSON.parse(body) : (req.body || {});
    const {
      merchantName = "Virat Gold Palace",
      category = "Jewellery Showroom",
      city = "Nikol, Ahmedabad",
      rating = 5,
      tags = ["Hallmark 916 Gold", "Transparent Weight"],
      language = "Gujarati"
    } = payload;

    const apiKey = process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;

    if (apiKey && process.env.GEMINI_API_KEY) {
      // Call Gemini 1.5 Flash
      const promptText = `You are a real customer writing an authentic, 5-star Google review for "${merchantName}", a ${category} in ${city}.
Language to write in: ${language} (if Gujarati or Hindi, use natural native regional vocabulary).
Rating: ${rating} stars.
Specific positive highlights to weave in naturally: ${tags.join(", ")}.
Constraints: Keep it between 2 to 4 sentences. Polite, positive, and realistic. Do not use quotes or headers.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
          })
        }
      );

      const data = await response.json();
      const generated = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (generated) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify({ review: generated, model: "gemini-1.5-flash" }));
        return;
      }
    }

    // Fallback template matching selected language
    const list = FALLBACK_DRAFTS[language] || FALLBACK_DRAFTS.English;
    const template = list[Math.floor(Math.random() * list.length)].replace(/{name}/g, merchantName);

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify({ review: template, fallback: true }));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Failed to generate review", message: err.message }));
  }
}
