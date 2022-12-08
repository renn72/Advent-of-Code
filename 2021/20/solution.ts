/* From https://adventofcode.com/2021/day/2 
 Day 2: Dive! 
Now, you need to figure out how to pilot this thing.
It seems like the submarine can take a series of commands like forward 1, down 2, or up 3:

forward X increases the horizontal position by X units.
down X increases the depth by X units.
up X decreases the depth by X units.

Note that since you're on a submarine, down and up affect your depth, and so they have the opposite result of what you might expect.
The submarine seems to already have a planned course (your puzzle input). You should probably figure out where it's going. For example:
forward 5
down 5
forward 8
up 3
down 8
forward 2

Your horizontal position and depth both start at 0. The steps above would then modify them as follows:

forward 5 adds 5 to your horizontal position, a total of 5.
down 5 adds 5 to your depth, resulting in a value of 5.
forward 8 adds 8 to your horizontal position, a total of 13.
up 3 decreases your depth by 3, resulting in a value of 2.
down 8 adds 8 to your depth, resulting in a value of 10.
forward 2 adds 2 to your horizontal position, a total of 15.

After following these instructions, you would have a horizontal position of 15 and a depth of 10. (Multiplying these together produces 150.)
Calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?

*/
// @ts-ignore
import { intval, log, logList } from "../../tools.ts";
// @ts-ignore
import { puzzle } from "../../puzzle.ts";
// @ts-ignore
import type { Puzzle } from "../../puzzle.ts"

const findAnswers = (entries: string[][], isLog = true) => {
  const answers = {
      a: 0,
      b: 0,
    };
  // Part One



  // Part Two


  if (isLog) {
    log(entries);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 1 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 1 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `

`;

const part1_correct = await testPart1(test_input);
const part1 = await solvePart1();
log("    part 1: ", part1, part1_correct);
// const part2_correct = await testPart2(test_input);
// const part2 = await solvePart2();
// log("    part 2: ", part2, part2_correct);
