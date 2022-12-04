/* From https://adventofcode.com/2021/day/1 
 Day 1: Sonar Sweep 
You're minding your own business on a ship at sea when the overboard alarm goes off! You rush to see if you can help. Apparently, one of the Elves tripped and accidentally sent the sleigh keys flying into the ocean!
Before you know it, you're inside a submarine the Elves keep ready for situations like this. It's covered in Christmas lights (because of course it is), and it even has an experimental antenna that should be able to track the keys if you can boost its signal strength high enough; there's a little meter that indicates the antenna's signal strength by displaying 0-50 stars.
Your instincts tell you that in order to save Christmas, you'll need to get all fifty stars by December 25th.
Collect stars by solving puzzles.  Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first.  Each puzzle grants one star. Good luck!
As the submarine drops below the surface of the ocean, it automatically performs a sonar sweep of the nearby sea floor. On a small screen, the sonar sweep report (your puzzle input) appears: each line is a measurement of the sea floor depth as the sweep looks further and further away from the submarine.
For example, suppose you had the following report:
199
200
208
210
200
207
240
269
260
263

This report indicates that, scanning outward from the submarine, the sonar sweep found depths of 199, 200, 208, 210, and so on.
The first order of business is to figure out how quickly the depth increases, just so you know what you're dealing with - you never know if the keys will get carried into deeper water by an ocean current or a fish or something.
To do this, count the number of times a depth measurement increases from the previous measurement. (There is no measurement before the first measurement.) In the example above, the changes are as follows:
199 (N/A - no previous measurement)
200 (increased)
208 (increased)
210 (increased)
200 (decreased)
207 (increased)
240 (increased)
269 (increased)
260 (decreased)
263 (increased)

In this example, there are 7 measurements that are larger than the previous measurement.
How many measurements are larger than the previous measurement?

*/
// @ts-ignore
import { intval, log, logList } from "../../tools.ts";
// @ts-ignore
import { puzzle } from "../../puzzle.ts";

const findAnswers = (entries: string[][]) => {
  const answers = {
    a: 0,
    b: 0,
  };

  // Part One
  const derivative = entries.map((e, i,  a) => {
    if (i === 0) return 0
    if (intval(e) > intval(a[i-1])) {
      return 1
    } 
  return 0
  })
  answers.a = derivative.reduce((a, i) => intval(a) + intval(i))

  // Part Two
  const sliding = entries.map ((e, i, a) => {
    if (i > a.length - 3) return 0
    return  intval(e) + intval(a[i+1]) + intval(a[i+2])
  }).filter(e => e != 0)

  const derivative_2 = sliding.map((e, i,  a) => {
    if (i === 0) return 0
    if (intval(e) > intval(a[i-1])) {
      return 1
    } 
  return 0
  })
  answers.b = derivative_2.reduce((a, i) => intval(a) + intval(i))

  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a === 7 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answer = findAnswers(puzzle_input.blocks[0])

  return answer.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b === 5 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answer = findAnswers(puzzle_input.blocks[0])

  return answer.b;
};
const test_input = `
199
200
208
210
200
207
240
269
260
263
`;

const part1_correct = await testPart1(test_input);
const part1 = await solvePart1();
log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
