/**
 * @name hello_world
 * @description Returns a hello world message
 */
export interface Props {
  name: string;
  age: number;
}
export default function helloWorld({ name, age }: Props) {
  return `Olá ${name}! Você tem ${age} anos.`;
}
