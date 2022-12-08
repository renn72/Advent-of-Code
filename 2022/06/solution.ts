/* From https://adventofcode.com/2022/day/6 
 Day 6: Tuning Trouble 
The preparations are finally complete; you and the Elves leave camp on foot and begin to make your way toward the star fruit grove.
As you move through the dense undergrowth, one of the Elves gives you a handheld device. He says that it has many fancy features, but the most important one to set up right now is the communication system.
However, because he's heard you have significant experience dealing with signal-based systems, he convinced the other Elves that it would be okay to give you their one malfunctioning device - surely you'll have no problem fixing it.
As if inspired by comedic timing, the device emits a few colorful sparks.
To be able to communicate with the Elves, the device needs to lock on to their signal. The signal is a series of seemingly-random characters that the device receives one at a time.
To fix the communication system, you need to add a subroutine to the device that detects a start-of-packet marker in the datastream. In the protocol being used by the Elves, the start of a packet is indicated by a sequence of four characters that are all different.
The device will send your subroutine a datastream buffer (your puzzle input); your subroutine needs to identify the first position where the four most recently received characters were all different. Specifically, it needs to report the number of characters from the beginning of the buffer to the end of the first such four-character marker.
For example, suppose you receive the following datastream buffer:
mjqjpqmgbljsphdztnvjfqwrcgsmlb
After the first three characters (mjq) have been received, there haven't been enough characters received yet to find the marker. The first time a marker could occur is after the fourth character is received, making the most recent four characters mjqj. Because j is repeated, this isn't a marker.
The first time a marker appears is after the seventh character arrives. Once it does, the last four characters received are jpqm, which are all different. In this case, your subroutine should report the value 7, because the first start-of-packet marker is complete after 7 characters have been processed.
Here are a few more examples:

bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11

How many characters need to be processed before the first start-of-packet marker is detected?

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

  const signal = entries[0][0]

  let res = 0
  let packet : string[]= []
  for(const[idx, c] of signal.split('').entries()){
    packet.push(c)
    if(packet.length != 4) continue

    let isMarker = true

    for(const m of packet){
      if(isLog) log(packet.filter(p => p === m), m)
      if(packet.filter(p => p===m).length > 1) isMarker = false
    }

    if(isMarker) {
      answers.a = idx + 1 
      break
    }

    if(packet.length === 4) packet.shift()
  }

  // Part Two

  res = 0
  packet = []
  for(const[idx, c] of signal.split('').entries()){
    packet.push(c)
    if(packet.length != 14) continue

    let isMarker = true

    for(const m of packet){
      if(isLog) log(packet.filter(p => p === m), m)
      if(packet.filter(p => p===m).length > 1) isMarker = false
    }

    if(isMarker) {
      answers.b = idx + 1 
      break
    }

    if(packet.length === 14) packet.shift()
  }


  if (isLog) {
    log(signal);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 7 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 19 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
