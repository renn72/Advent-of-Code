/* From https://adventofcode.com/2021/day/9 
 Day 9: Smoke Basin 
These caves seem to be lava tubes. Parts are even still volcanically active; small hydrothermal vents release smoke into the caves that slowly settles like rain.
If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer. The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).
Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:
2199943210
3987894921
9856789892
8767896789
9899965678

Each number corresponds to the height of a particular location, where 9 is the highest and 0 is the lowest a location can be.
Your first goal is to find the low points - the locations that are lower than any of its adjacent locations. Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)
In the above example, there are four low points, all highlighted: two are in the first row (a 1 and a 0), one is in the third row (a 5), and one is in the bottom row (also a 5). All other locations on the heightmap have some lower adjacent location, and so are not low points.
The risk level of a low point is 1 plus its height. In the above example, the risk levels of the low points are 2, 1, 6, and 6. The sum of the risk levels of all low points in the heightmap is therefore 15.
Find all of the low points on your heightmap. What is the sum of the risk levels of all low points on your heightmap?

*/
// @ts-ignore
import { intval, log, logList } from "../../tools.ts";
// @ts-ignore
import { puzzle } from "../../puzzle.ts";

const findAnswers = (entries: string[][], isLog = true) => {
  const answers = {
      a: 0,
      b: 0,
    };



  if (isLog) log(entries);
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
