import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

// Zod schemas for API response validation
const phoneticSchema = z.object({
  audio: z.string().optional(),
  text: z.string().optional(),
});

const definitionSchema = z.object({
  antonyms: z.array(z.string()).optional(),
  definition: z.string(),
  example: z.string().optional(),
  synonyms: z.array(z.string()).optional(),
});

const meaningSchema = z.object({
  definitions: z.array(definitionSchema),
  partOfSpeech: z.string(),
});

const dictEntrySchema = z.object({
  meanings: z.array(meaningSchema).optional(),
  origin: z.string().optional(),
  phonetic: z.string().optional(),
  phonetics: z.array(phoneticSchema).optional(),
  word: z.string(),
});

const apiResponseSchema = z.array(dictEntrySchema);

// Exported types
export type Phonetic = z.infer<typeof phoneticSchema>;
export type Definition = z.infer<typeof definitionSchema>;
export type Meaning = z.infer<typeof meaningSchema>;
export type DictResult = z.infer<typeof dictEntrySchema> | null;

export function useDictionaryQuery(searchTerm: string) {
  return useQuery<unknown, Error, DictResult | null>({
    enabled: searchTerm.length >= 2,
    queryFn: async (): Promise<unknown> => {
      try {
        const { data } = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchTerm)}`,
        );
        return data as unknown;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          // Treat 404 (no matches) as an empty successful result
          return [] as unknown;
        }
        throw err;
      }
    },
    queryKey: ["dictionary", searchTerm],
    retry: false,
    select: (data: unknown): DictResult | null => {
      const parseResult = apiResponseSchema.safeParse(data);
      if (!parseResult.success || parseResult.data.length === 0) {
        return null;
      }

      const first = parseResult.data[0];

      // Optional: dedupe phonetics by text+audio
      const dedupedPhonetics = first.phonetics
        ? (() => {
            const seen = new Set<string>();
            const out: Phonetic[] = [];
            for (const p of first.phonetics) {
              const key = `${p.text ?? ""}|${p.audio ?? ""}`;
              if (!seen.has(key)) {
                seen.add(key);
                out.push(p);
              }
            }
            return out;
          })()
        : undefined;

      return {
        meanings: first.meanings,
        origin: first.origin,
        phonetic: first.phonetic,
        phonetics: dedupedPhonetics,
        word: first.word,
      };
    },
  });
}
