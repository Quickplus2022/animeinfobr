import type { NarratorInput, NarratorOutput, INarrator } from "./aiNarrator.interface";
import type { MissionSchema } from "./missionSchema";

const ATTRIBUTE_VERBS: Record<string, string[]> = {
  courage:   ["enfrenta com determinação", "avança sem hesitar", "age com bravura"],
  strategy:  ["executa com precisão calculada", "aplica a tática certa", "usa inteligência superior"],
  empathy:   ["conecta de forma profunda", "entende o que o outro sente", "age com compaixão"],
  energy:    ["libera toda sua energia", "canaliza sua força interior", "explode de poder"],
  technique: ["demonstra maestria técnica", "executa com perfeição", "usa habilidade refinada"],
  defense:   ["se protege com eficiência", "cria barreira impenetrável", "absorve o impacto"],
  luck:      ["conta com o destino", "se beneficia de coincidência perfeita", "o acaso favorece"],
  charisma:  ["usa sua presença magnética", "convence com palavras certas", "inspira a todos"],
};

const RESULT_TEMPLATES: Record<string, Record<string, string[]>> = {
  CRITICAL: {
    combat:   ["{name} {verb}. O resultado supera toda expectativa — um momento que a party vai lembrar."],
    social:   ["{name} {verb}. As palavras tocam algo profundo. O que parecia impossível se abre."],
    default:  ["{name} {verb}. Sucesso absoluto. A narrativa vira a favor da party neste instante."],
  },
  SUCCESS: {
    combat:   ["{name} {verb}. O objetivo é alcançado, ainda que com esforço real."],
    social:   ["{name} {verb}. A situação melhora. Não foi perfeito, mas funcionou."],
    default:  ["{name} {verb}. A ação resolve o problema proposto."],
  },
  PARTIAL: {
    combat:   ["{name} tenta {verb}, mas o resultado é incompleto. Avançam, porém algo foi perdido no processo."],
    social:   ["{name} quase consegue {verb}. O objetivo é parcialmente atingido — mas há um custo ou complicação."],
    default:  ["{name} consegue {verb} em parte. O progresso existe, mas não sem consequências."],
  },
  FAILURE: {
    combat:   ["{name} tenta {verb}, mas falha completamente. A situação piora."],
    social:   ["{name} não consegue {verb}. O que era difícil ficou mais difícil ainda."],
    default:  ["{name} falha em {verb}. Um novo obstáculo surge."],
  },
};

function getVerb(attribute: string): string {
  const verbs = ATTRIBUTE_VERBS[attribute] ?? ATTRIBUTE_VERBS.courage;
  return verbs[Math.floor(Math.random() * verbs.length)];
}

function getTemplate(resultType: string, attribute: string): string {
  const category = ["courage", "energy", "technique", "defense"].includes(attribute) ? "combat"
    : ["charisma", "empathy"].includes(attribute) ? "social" : "default";
  const templates = RESULT_TEMPLATES[resultType]?.[category] ?? RESULT_TEMPLATES[resultType]?.default ?? ["{name} age."];
  return templates[Math.floor(Math.random() * templates.length)];
}

export class TemplateNarrator implements INarrator {
  async generateActionResult(input: NarratorInput): Promise<NarratorOutput> {
    const verb = getVerb(input.attributeUsed);
    const template = getTemplate(input.resultType, input.attributeUsed);

    const resultText = template
      .replace("{name}", input.characterName)
      .replace("{verb}", verb)
      + (input.diceRoll === 20 ? " 🎲 CRÍTICO NATURAL — O dado não mente!" : "")
      + (input.diceRoll === 1 ? " 🎲 O dado virou contra você desta vez." : "");

    const hints: Record<string, string> = {
      CRITICAL: "A party ganha impulso. O próximo passo está mais próximo.",
      SUCCESS: "Continuem assim. O objetivo está ao alcance.",
      PARTIAL: "Progressos foram feitos, mas o caminho ainda exige cuidado.",
      FAILURE: "Momento de reagrupar. O que não funcionou ensina o que pode funcionar.",
    };

    return { resultText, nextHint: hints[input.resultType] };
  }

  async generateMissionIntro(mission: MissionSchema): Promise<string> {
    return `A missão começa. Vocês se encontram diante de ${mission.scenes[0]?.title ?? "o desconhecido"}. O que a história fará com vocês depende do que vocês fazem com ela.`;
  }

  async generateMissionOutro(mission: MissionSchema, success: boolean): Promise<string> {
    if (success) {
      return `"${mission.title}" foi concluída. A party provou que não é apenas forte — é capaz. Cada ação, cada escolha, cada dado rolado construiu este momento. Bem feito.`;
    }
    return `"${mission.title}" não terminou como esperado. Mas fracassos têm seu próprio valor: revelam onde crescer. A missão fica aberta para uma nova tentativa.`;
  }
}

export const narrator = new TemplateNarrator();
