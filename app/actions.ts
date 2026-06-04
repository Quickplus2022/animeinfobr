"use server";

import { revalidatePath } from "next/cache";

export async function revalidateHome() {
  revalidatePath("/");
  return { success: true, timestamp: new Date().toISOString() };
}

export async function revalidateCalendar() {
  revalidatePath("/calendario");
  return { success: true, timestamp: new Date().toISOString() };
}

export async function revalidateRanking() {
  revalidatePath("/ranking");
  return { success: true, timestamp: new Date().toISOString() };
}

export async function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/anime");
  revalidatePath("/calendario");
  revalidatePath("/ranking");
  revalidatePath("/parecidos");
  return { success: true, timestamp: new Date().toISOString() };
}
