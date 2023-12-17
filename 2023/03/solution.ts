/* From https://adventofcode.com/2023/day/3 
 Day 3: Gear Ratios 
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.
It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.
"Aaah!"
You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.
The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.
The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
Here is an example engine schematic:
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.
Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

--- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?

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

  const hasSymbol = (s: string) => {
    if (s?.length && s.split("").find((i) => isNaN(parseInt(i)) && i !== "."))
      return true;
    return false;
  };

  const isGearRatio = (s: string) => {
    if (s?.length && !isNaN(parseInt(s))) return true;
    return false;
  };

  const gearsDic = {} as { [key: string]: number[] };

  const findGears = (s, n, i, j) => {
    j = j === -1 ? 0 : j;
    for (let k = 0; k < s.length; k++) {
      const ch = s.charAt(k);
      if (ch === "*") {
        const ind = `${i}-${j + k}`;
        gearsDic[ind] = gearsDic[ind]
          ? [...gearsDic[ind], parseInt(n)]
          : [parseInt(n)];
      }
    }
  };

  const input = entries.map((row) => row[0]);

  let row = input.length;
  let col = input[0].length;

  let parts = [] as number[];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (isNaN(parseInt(input[i][j]))) continue;

      let part = input[i][j];

      while (++j < col) {
        if (isNaN(parseInt(input[i][j]))) break;
        part += input[i][j];
      }

      const top =
        i === 0 ? "" : input[i - 1].substring(j - part.length - 1, j + 1);
      const bottom =
        i === row - 1 ? "" : input[i + 1].substring(j - part.length - 1, j + 1);
      const left = input[i][j - part.length - 1] || "";
      const right = input[i][j] || "";

      if (
        hasSymbol(top) ||
        hasSymbol(bottom) ||
        hasSymbol(left) ||
        hasSymbol(right)
      ) {
        parts.push(parseInt(part));
      }
    }
  }

  answers.a = parts.reduce((a, b) => a + b, 0);

  // Part Two
  //
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (isNaN(parseInt(input[i][j]))) continue;

      let ratio = input[i][j];
      while (++j < col) {
        if (isNaN(parseInt(input[i][j]))) break;
        ratio += input[i][j];
      }
      const top =
        i === 0 ? "" : input[i - 1].substring(j - ratio.length - 1, j + 1);
      const btm =
        i === row - 1 ? "" : input[i + 1].substring(j - ratio.length - 1, j + 1);
      const lft = input[i][j - ratio.length - 1] || "";
      const rgt = input[i][j] || "";

      findGears(top, ratio, i - 1, j - ratio.length - 1);
      findGears(btm, ratio, i + 1, j - ratio.length - 1);
      findGears(lft, ratio, i, j - ratio.length - 1);
      findGears(rgt, ratio, i, j);
    }
  }

  answers.b = Object.values(gearsDic).filter((i) => i.length === 2).map(i => i[0] * i[1]).reduce((a, b) => a + b, 0);

  if (isLog) {
    log(input);
    log(entries);
    log(gearsDic)
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 4361 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 467835 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
