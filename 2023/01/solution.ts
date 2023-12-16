/* From https://adventofcode.com/2023/day/1 
 Day 1: Trebuchet?! 
Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.
You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.
Collect stars by solving puzzles.  Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first.  Each puzzle grants one star. Good luck!
You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").
As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.
The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
For example:
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
Consider your entire calibration document. What is the sum of all of the calibration values?

--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

*/
// @ts-ignore
import { intval, log, logList } from "../../tools.ts";
// @ts-ignore
import { puzzle } from "../../puzzle.ts";
// @ts-ignore
import type { Puzzle } from "../../puzzle.ts";

const findAnswers = (entries: string[][], isLog = true) => {
  const answers = {
    a: 0,
    b: 0,
  };
  // Part One

  answers.a = entries
    .map((entry) => {
      const res  = entry[0]
        .split("")
        .filter((char) => char.match(/[0-9]/))
      if (res.length == 2) {
        return +res.join("")
      }
      if (res.length == 1) {
        return +(res[0] + res[0])
      }
      if (res.length > 2) {
        return +(res[0] + res[res.length - 1])
      }
      return 0
    }).reduce((acc, cur) => {
      return acc + cur
    }, 0)
      


  // Part Two
  const stringNumbers = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
];

  
  const temp = entries.map((entry) => {
    const res  = entry[0]
      .replace(/one/g, "o1e")
      .replace(/two/g, "t2o")
      .replace(/three/g, "t3e")
      .replace(/four/g, "4")
      .replace(/five/g, "5e")
      .replace(/six/g, "6")
      .replace(/seven/g, "7n")
      .replace(/eight/g, "e8t")
      .replace(/nine/g, "n9e")
      .split("")
      .filter((char) => char.match(/[1-9]/))
      if (res.length == 1) {
        return +(res[0] + res[0])
      }
      if (res.length >= 2) {
        return +(res[0] + res[res.length - 1])
      }
      return 10000000
  })

  answers.b = temp.reduce((acc, cur) => acc + cur, 0)

  if (isLog) {
    log(temp)
    log(answers);
    log(entries);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 142 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 281 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
