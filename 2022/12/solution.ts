/* From https://adventofcode.com/2022/day/12 
 Day 12: Hill Climbing Algorithm 
You try contacting the Elves using your handheld device, but the river you're following must be too low to get a decent signal.
You ask the device for a heightmap of the surrounding area (your puzzle input). The heightmap shows the local area from above broken into a grid; the elevation of each square of the grid is given by a single lowercase letter, where a is the lowest elevation, b is the next-lowest, and so on up to the highest elevation, z.
Also included on the heightmap are marks for your current position (S) and the location that should get the best signal (E). Your current position (S) has elevation a, and the location that should get the best signal (E) has elevation z.
You'd like to reach E, but to save energy, you should do it in as few steps as possible. During each step, you can move exactly one square up, down, left, or right. To avoid needing to get out your climbing gear, the elevation of the destination square can be at most one higher than the elevation of your current square; that is, if your current elevation is m, you could step to elevation n, but not to elevation o. (This also means that the elevation of the destination square can be much lower than the elevation of your current square.)
For example:
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi

Here, you start in the top-left corner; your goal is near the middle. You could start by moving down or right, but eventually you'll need to head toward the e at the bottom. From there, you can spiral around to the goal:
v..v<<<<
>v.vv<<^
.>vv>E^^
..v>>>^^
..>>>>>^

In the above diagram, the symbols indicate whether the path exits each square moving up (^), down (v), left (<), or right (>). The location that should get the best signal is still E, and . marks unvisited squares.
This path reaches the goal in 31 steps, the fewest possible.
What is the fewest steps required to move from your current position to the location that should get the best signal?

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
  const grid = entries.map(e => e[0].split(''))

  type Point = { x: number; y: number };

  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };

  //iterate through grid
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = grid[y][x];
      if (tile === "S") start = { x, y };
      if (tile === "E") end = { x, y };
    }
  }

  const letterToNumber = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,

    S: 1,
    E: 26,
  };

  const numberGrid = grid.map((row) =>
    row.map((tile) => letterToNumber[tile as keyof typeof letterToNumber])
  );

  const allValidMoves = (point: Point) => {
    const moves: Point[] = [];
    const { x, y } = point;

    const elevation = numberGrid[y][x];

    const allMoves = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];

    return allMoves.filter((move) => {
      const { x: x2, y: y2 } = move;

      if (x2 < 0 || y2 < 0) return false;
      if (x2 >= numberGrid[0].length || y2 >= numberGrid.length) return false;

      const elevation2 = numberGrid[y2][x2];

      return elevation2 <= elevation + 1;
    });
  };

  const allVisitedPoints: Set<string> = new Set([`${start.x},${start.y}`]);

  const pointToString = (point: Point) => `${point.x},${point.y}`;

  let incompletePaths: Point[][] = [[start]];

  while (incompletePaths.length > 0) {
    const newIncompletePaths: Point[][] = [];

    for (const incompletePath of incompletePaths) {
      const lastPoint = incompletePath[incompletePath.length - 1];
      const validMoves = allValidMoves(lastPoint);

      for (const move of validMoves) {
        if (allVisitedPoints.has(pointToString(move))) continue;

        allVisitedPoints.add(pointToString(move));

        const newIncompletePath = [...incompletePath];
        newIncompletePath.push(move);

        if (move.x === end.x && move.y === end.y) {
          answers.a = newIncompletePath.length - 1
        } else {
          newIncompletePaths.push(newIncompletePath);
        }
      }
    }

    incompletePaths = newIncompletePaths;
  }



  // Part Two
  const allValidMovesB = (point: Point) => {
    const { x, y } = point;

    const elevation = numberGrid[y][x];

    const allMoves = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];

    return allMoves.filter((move) => {
      const { x: x2, y: y2 } = move;

      if (x2 < 0 || y2 < 0) return false;
      if (x2 >= numberGrid[0].length || y2 >= numberGrid.length) return false;

      const elevation2 = numberGrid[y2][x2];

      return elevation2 >= elevation - 1;
    });
  };

  const allVisitedPointsB: Set<string> = new Set([`${start.x},${start.y}`]);

  incompletePaths = [[end]];
  
  answers.b = 1000



  while (incompletePaths.length > 0) {
    const newIncompletePaths: Point[][] = [];

    for (const incompletePath of incompletePaths) {
      const lastPoint = incompletePath[incompletePath.length - 1];
      const validMoves = allValidMovesB(lastPoint);

      for (const move of validMoves) {
        if (allVisitedPointsB.has(pointToString(move))) continue;

        allVisitedPointsB.add(pointToString(move));

        const newIncompletePath = [...incompletePath];
        newIncompletePath.push(move);

        const valAtPoint = numberGrid[move.y][move.x];

        if (valAtPoint === 1) {
          console.log("ANSWER FOUND", newIncompletePath.length - 1);
          answers.b = newIncompletePath.length - 1 < answers.b ? newIncompletePath.length - 1 : answers.b
        } else {
          newIncompletePaths.push(newIncompletePath);
        }
      }
    }

    console.log("before", incompletePaths.length);
    console.log("after", newIncompletePaths.length);

    incompletePaths = newIncompletePaths;
  }

  if (isLog) {
    log(grid);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 31 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 29 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
