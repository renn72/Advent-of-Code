/* From https://adventofcode.com/2023/day/2 
 Day 2: Cube Conundrum 
You're launched high into the atmosphere! The apex of your trajectory just barely reaches the surface of a large island floating in the sky. You gently land in a fluffy pile of leaves. It's quite cold, but you don't see much snow. An Elf runs over to greet you.
The Elf explains that you've arrived at Snow Island and apologizes for the lack of snow. He'll be happy to explain the situation, but it's a bit of a walk, so you have some time. They don't get many visitors up here; would you like to play a game in the meantime?
As you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue. Each time you play this game, he will hide a secret number of cubes of each color in the bag, and your goal is to figure out information about the number of cubes.
To get information, once a bag has been loaded with cubes, the Elf will reach into the bag, grab a handful of random cubes, show them to you, and then put them back in the bag. He'll do this a few times per game.
You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).
For example, the record of a few games might look like this:
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.
The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.
Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

--- Part Two ---
The Elf says they've stopped producing snow because they aren't getting any water! He isn't sure why the water stopped; however, he can show you how to get to the water source to check it out for yourself. It's just up ahead!

As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?

Again consider the example games from earlier:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
Game 4 required at least 14 red, 3 green, and 15 blue cubes.
Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?

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
  

  // red, green, blue
  const loaded = [12, 13, 14]


  const input = entries.map((entry) => {
    const game = +entry[1].split(":")[0];
    const cubes = [...entry.slice(2)]
    const games = [[0, 0, 0]]
    let idx = 0
    cubes.forEach((cube, i, arr) => {
      if (cube.includes('red')) games[idx][0] += intval(arr[i - 1])
      if (cube.includes('green')) games[idx][1] += intval(arr[i - 1])
      if (cube.includes('blue')) games[idx][2] += intval(arr[i - 1])


      if (cube.includes(";")) {
        idx++
        games.push([0, 0, 0])
      }
      
    })
    return { game, games };
  })

  answers.a = input.reduce((acc, cur) => {
    const { game, games } = cur
    const isPossible = games.every((g) => {
      return g.every((cube, i) => {
        return cube <= loaded[i]
      })
    })
    if (isPossible) {
      return acc + game
    }
    return acc
  }, 0)
  



  // Part Two

  const input2 = input.map((entry) => {
    const games = entry.games
    return games.reduce((acc, cur) => {
      return acc.map((cube, i) => {
        return Math.max(cube, cur[i])
      })
    }, [0, 0, 0])
  })

  answers.b = input2.reduce((acc, cur) => { 
    return acc + cur.reduce((acc, cur) => acc * cur, 1)
  }, 0)


  if (isLog) {
    log(input)
    log(input2)
    // log(entries);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 8 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 2286 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
