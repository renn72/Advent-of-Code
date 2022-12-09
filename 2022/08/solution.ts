/* From https://adventofcode.com/2022/day/8 
 Day 8: Treetop Tree House 
The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a tree house.
First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.
The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:
30373
25512
65332
33549
35390

Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.
A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.
All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:

The topr-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
The top-middle 5 is visible from the top and right.
The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
The left-middle 5 is visible, but only from the right.
The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
The right-middle 3 is visible from the right.
In the bottom row, the middle 5 is visible, but the 3 and 4 are not.

With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.
Consider your map; how many trees are visible from outside the grid?

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

  const treeMap = entries
    .map(e => e[0]
      .split('')
      .map(h => intval(h)))

  const checkTree = (x : number, y : number) => {
    const tree = treeMap[x][y]
     
    let isVisible = true
    for(let i = 0; i < x; i++){
      if(treeMap[i][y] >= tree) isVisible = false
    }
    if(isVisible) return true

    isVisible = true
    for(let i = x + 1; i < treeMap.length; i++){
      if(treeMap[i][y] >= tree) isVisible = false
    }
    if(isVisible) return true
    
    isVisible = true
    for(let i = 0; i < y; i++){
      if(treeMap[x][i] >= tree) isVisible = false
    }
    if(isVisible) return true
    
    isVisible = true
    for(let i = y + 1; i < treeMap[x].length; i++){
      if(treeMap[x][i] >= tree) isVisible = false
    }
    if(isVisible) return true

    return false
  }

  let treeCount = 0
  for (let x = 1; x < treeMap.length - 1; x++){
    for (let y = 1; y < treeMap[x].length - 1; y++){
      if(checkTree(x,y)) {
        treeCount++
      }
    }
  }

  answers.a = treeCount + treeMap.length*2 + treeMap[0].length*2 - 4


  // Part Two

  const findScore = (x : number, y : number) => {
    let num = 1

    const tree = treeMap[x][y]
     
    let view = 0
    for(let i = x - 1; i >= 0; i--){
      view++ 
      if(treeMap[i][y] >= tree) break
    }
    num *= view

    view = 0
    for(let i = x + 1; i < treeMap.length; i++){
      view++
      if(treeMap[i][y] >= tree) break
    }
    num *= view
    
    view = 0
    for(let i = y - 1; i >= 0; i--){
      view++
      if(treeMap[x][i] >= tree) break
    }
    num *= view
    
    view = 0
    for(let i = y + 1; i < treeMap[x].length; i++){
      view++
      if(treeMap[x][i] >= tree) break
    }
    num *= view
    

    return num
  }
  
  let highestScore = 0

  for (let x = 1; x < treeMap.length - 1; x++){
    for (let y = 1; y < treeMap[x].length - 1; y++){
      let score = findScore(x, y)
      if(score > highestScore) highestScore = score
    }
  }
   
  answers.b = highestScore


  if (isLog) {
    log(treeMap);
    log(answers);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 21 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 8 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `
30373
25512
65332
33549
35390
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
