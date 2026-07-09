#!/bin/bash

# /api/vision
sed -i -e '/const prompt = `/i\      const language = req.body.language || "en";\n' server.ts
sed -i -e '/- Return your response in structured JSON format/i\        CRITICAL LANGUAGE INSTRUCTION: The values for observation, estimatedSizeOrType, colour, bristolStoolType, potentialRiskFlag, and suggestedCarePlan MUST be written in the language corresponding to language code: ${language} (e.g. if zh, write in Chinese; if tl, write in Tagalog). Only the keys must remain in English.' server.ts

# /api/audio-note
sed -i -e '/const prompt = `/i\      const language = req.body.language || "en";\n' server.ts
sed -i -e '/Return your response in structured JSON format with these exact keys:/i\        CRITICAL LANGUAGE INSTRUCTION: The values for englishNote, suggestedFollowUps, and autofillReport fields MUST be written in the language corresponding to language code: ${language}. Only the keys must remain in English.' server.ts

# /api/sirs
sed -i -e 's/const { description, audioBase64, imageBase64 } = req.body;/const { description, audioBase64, imageBase64, language = "en" } = req.body;/g' server.ts
sed -i -e '/Return your response in structured JSON format with these exact keys:/i\        CRITICAL LANGUAGE INSTRUCTION: The values for incidentTitle, riskFlag, description, and suggestedActions MUST be written in the language corresponding to language code: ${language}. Only the keys must remain in English.' server.ts

# /api/care-note
sed -i -e 's/const { input } = req.body;/const { input, language = "en" } = req.body;/g' server.ts
sed -i -e '/Return a SINGLE string/i\        CRITICAL LANGUAGE INSTRUCTION: The response MUST be written in the language corresponding to language code: ${language}.' server.ts

# /api/summary
sed -i -e 's/const { inputs } = req.body;/const { inputs, language = "en" } = req.body;/g' server.ts
sed -i -e '/Write a clear, professional clinical summary/i\        CRITICAL LANGUAGE INSTRUCTION: The summary MUST be written in the language corresponding to language code: ${language}.' server.ts

# /api/shift-handover
sed -i -e 's/const { residents, sirsEvents, rnReviews } = req.body;/const { residents, sirsEvents, rnReviews, language = "en" } = req.body;/g' server.ts
sed -i -e '/Focus purely on actionable clinical information./i\        CRITICAL LANGUAGE INSTRUCTION: The handover summary MUST be written in the language corresponding to language code: ${language}.' server.ts

# /api/generate-family-update
sed -i -e 's/const { resident, careNotes } = req.body;/const { resident, careNotes, language = "en" } = req.body;/g' server.ts
sed -i -e '/Return a single string with the final message./i\        CRITICAL LANGUAGE INSTRUCTION: The message MUST be written in the language corresponding to language code: ${language}.' server.ts

