/* From https://adventofcode.com/2022/day/5 
 Day 5: Supply Stacks 
The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.
The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.
The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.
They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2

In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.
Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:
[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 

In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:
        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3

Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:
        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3

Finally, one crate is moved from stack 1 to stack 2:
        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3

The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.
After the rearrangement procedure completes, what crate ends up on top of each stack?

*/
// @ts-ignore
import { intval, log, logList } from "../../tools.ts";
// @ts-ignore
import { puzzle } from "../../puzzle.ts";
// @ts-ignore
import type { Puzzle} from "../../puzzle.ts"

const findAnswers = (entries : Puzzle, isLog = true) => {
  const answers = {
      a: '0',
      b: '0',
    };
  // Part One

  const instructions = entries.blocks[1]
  const stack = entries.entries.filter((e: string) => e.startsWith('[') || e.startsWith(' '))

  const build_array = (num) => {
    const arr : any= []
    for (let i=0; i<num; i++){
      arr.push([])
    }
    return arr
  }

  const _ = stack[stack.length  - 1].trim().split(' ')
  const numOfStacks = intval(_.pop())

  const stackArray = build_array(numOfStacks)
  stack.pop()
  const crates = stack.reverse()

  for(const crate of crates) {
    for(let i=0; i<numOfStacks; i++) {
      const idx = 1 + i*4
      if (crate.charAt(idx) !== ' ')stackArray[i].push(crate.charAt(idx))
    }
  }

  let stackArray_b = stackArray.map(s => [...s])

  for (const instruction of instructions) {
    const amount = intval(instruction[1])
    const from = intval(instruction[3]) - 1
    const to = intval(instruction[5]) - 1
    
    for(let i=0;i < amount; i++) {
      const toMove = stackArray[from].pop()
      stackArray[to].push(toMove)
    }
  }

  let res = ''
  for (const s of stackArray) {
    res += s[s.length - 1]
  }

  answers.a = res
  

  // Part Two
for (const instruction of instructions) {
    const amount = intval(instruction[1])
    const from = intval(instruction[3]) - 1
    const to = intval(instruction[5]) - 1
    
    const toMove : string[]= []
    for(let i=0;i < amount; i++) {
      toMove.unshift(stackArray_b[from].pop())
    }
    if (isLog) log(toMove)
    if (isLog) log(stackArray_b)

    stackArray_b[to] = stackArray_b[to].concat(toMove)

    if (isLog) log(stackArray_b)
  }
  let res_b = ''
  for (const s of stackArray_b) {
    res_b += s[s.length - 1]
  }

  answers.b = res_b

  if (isLog) {
    log(stackArray_b);
    log(res_b);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input);

  return answers.a == 'CMZ' ? true : false;
};
const solvePart1 = async (): Promise<string> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input, false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input);

  return answers.b == 'MCD' ? true : false;
};
const solvePart2 = async (): Promise<string> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input, false);

  return answers.b;
};
const test_input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
