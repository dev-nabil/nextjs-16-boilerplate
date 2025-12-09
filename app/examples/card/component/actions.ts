"use server";

let counter = 0; // temporary, replace with DB

export async function incrementCounter() {
  counter++;
  return counter;
}
