export interface NpcSchema {
  name: string;
  role: string;
  attitude: "friendly" | "neutral" | "hostile";
  description: string;
}

export interface SceneSchema {
  id: string;
  title: string;
  narrative: string;
  atmosphere: string;
  actionPrompt: string;
  primaryAttribute: string;
  npcs?: NpcSchema[];
  consequence?: {
    success: string;
    failure: string;
    critical: string;
  };
}

export interface WorldSchema {
  name: string;
  theme: string;
  tone: "dark" | "hopeful" | "neutral" | "comedic";
  magicLevel: "none" | "low" | "medium" | "high";
  technologyLevel: "primitive" | "medieval" | "modern" | "futuristic";
}

export interface RewardSchema {
  xp: number;
  badgeKey?: string;
  badgeName?: string;
  items?: string[];
}

export interface MissionSchema {
  id: string;
  title: string;
  world: WorldSchema;
  scenes: SceneSchema[];
  rewards: RewardSchema;
  successCondition: string;
  failureCondition: string;
}
