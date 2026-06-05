import type { MissionSchema } from "./missionSchema";

export interface NarratorInput {
  characterName: string;
  characterClass: string;
  characterElement: string;
  actionText: string;
  attributeUsed: string;
  diceRoll: number;
  bonus: number;
  total: number;
  resultType: "FAILURE" | "PARTIAL" | "SUCCESS" | "CRITICAL";
  sceneNarrative: string;
  partyNames: string[];
}

export interface NarratorOutput {
  resultText: string;
  nextHint?: string;
}

export interface INarrator {
  generateActionResult(input: NarratorInput): Promise<NarratorOutput>;
  generateMissionIntro(mission: MissionSchema): Promise<string>;
  generateMissionOutro(mission: MissionSchema, success: boolean): Promise<string>;
}

// Future: implement with Claude API
// export class AiNarrator implements INarrator { ... }
