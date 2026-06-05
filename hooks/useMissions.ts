"use client";

import { useState, useEffect, useCallback } from "react";
import { getMissionState, trackMission, trackDuelVote, type MissionState, type MissionId } from "@/lib/missions";

const defaultState: MissionState = {
  completedToday: [],
  date: "",
  totalXP: 0,
  badges: [],
  totalCompleted: 0,
  duelVotesToday: 0,
};

export function useMissions() {
  const [state, setState] = useState<MissionState>(defaultState);

  useEffect(() => {
    setState(getMissionState());
  }, []);

  const track = useCallback((id: MissionId) => {
    const completed = trackMission(id);
    if (completed) setState(getMissionState());
    return completed;
  }, []);

  const trackDuel = useCallback(() => {
    trackDuelVote();
    setState(getMissionState());
  }, []);

  return { state, track, trackDuel };
}
