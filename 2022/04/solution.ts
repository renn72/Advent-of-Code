/* From https://adventofcode.com/2022/day/4 
 Day 4: Camp Cleanup 
Space needs to be cleared before the last supplies can be unloaded from the ships, and so several Elves have been assigned the job of cleaning up sections of the camp. Every section has a unique ID number, and each Elf is assigned a range of section IDs.
However, as some of the Elves compare their section assignments with each other, they've noticed that many of the assignments overlap. To try to quickly find overlaps and reduce duplicated effort, the Elves pair up and make a big list of the section assignments for each pair (your puzzle input).
For example, consider the following list of section assignment pairs:
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8

For the first few pairs, this list means:

Within the first pair of Elves, the first Elf was assigned sections 2-4 (sections 2, 3, and 4), while the second Elf was assigned sections 6-8 (sections 6, 7, 8).
The Elves in the second pair were each assigned two sections.
The Elves in the third pair were each assigned three sections: one got sections 5, 6, and 7, while the other also got 7, plus 8 and 9.

This example list uses single-digit section IDs to make it easier to draw; your actual list might contain larger numbers. Visually, these pairs of section assignments look like this:
.234.....  2-4
.....678.  6-8

.23......  2-3
...45....  4-5

....567..  5-7
......789  7-9

.2345678.  2-8
..34567..  3-7

.....6...  6-6
...456...  4-6

.23456...  2-6
...45678.  4-8

Some of the pairs have noticed that one of their assignments fully contains the other. For example, 2-8 fully contains 3-7, and 6-6 is fully contained by 4-6. In pairs where one assignment fully contains the other, one Elf in the pair would be exclusively cleaning sections their partner will already be cleaning, so these seem like the most in need of reconsideration. In this example, there are 2 such pairs.
In how many assignment pairs does one range fully contain the other?

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
  // Part One
  
  const contains = entries
    .map(e => [e[0].split('-'), e[1].split('-')])
    .map(e => e.map(e => e.map(e => intval(e))))
    .map(e => {
      const [elf1, elf2] =  e
      if (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) return 1 as number
      if (elf1[0] >= elf2[0] && elf1[1] <= elf2[1]) return 1 as number
      return 0 as number
    })
    .reduce((acc, idx) => acc + idx)

  answers.a = contains
  // Part Two

  const overlaps = entries
    .map(e => [e[0].split('-'), e[1].split('-')])
    .map(e => e.map(e => e.map(e => intval(e))))
    .map(e => {
      const [elf1, elf2] =  e
      if (elf1[0] <= elf2[1] && elf1[1] >= elf2[0]) return 1 as number
      if (elf1[1] >= elf2[0] && elf1[0] <= elf2[1]) return 1 as number
      return 0 as number
    })
    .reduce((acc, idx) => acc + idx)

  answers.b = overlaps

  if (isLog) {
    log(entries);
    log(overlaps);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 2 ? true : false;
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
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
