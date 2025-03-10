/**
 * @name random_number
 * @description Returns a random number between 0 and 1
 */
export default function randomNumber(): { rand: number } {
  return { rand: Math.random() };
}
