/* From https://adventofcode.com/2022/day/7 
 Day 7: No Space Left On Device 
You can hear birds chirping and raindrops hitting leaves as the expedition proceeds. Occasionally, you can even hear much louder sounds in the distance; how big do the animals get out here, anyway?
The device the Elves gave you has problems with more than just its communication system. You try to run a system update:
$ system-update --please --pretty-please-with-sugar-on-top
Error: No space left on device

Perhaps you can delete some files to make space for the update?
You browse around the filesystem to assess the situation and save the resulting terminal output (your puzzle input). For example:
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k

The filesystem consists of a tree of files (plain data) and directories (which can contain other directories or files). The outermost directory is called /. You can navigate around the filesystem, moving into or out of directories and listing the contents of the directory you're currently in.
Within the terminal output, lines that begin with $ are commands you executed, very much like some modern computers:

cd means change directory. This changes which directory is the current directory, but the specific result depends on the argument:
  
  cd x moves in one level: it looks in the current directory for the directory named x and makes it the current directory.
  cd .. moves out one level: it finds the directory that contains the current directory, then makes that directory the current directory.
  cd / switches the current directory to the outermost directory, /.
  

ls means list. It prints out all of the files and directories immediately contained by the current directory:
  
  123 abc means that the current directory contains a file named abc with size 123.
  dir xyz means that the current directory contains a directory named xyz.
  


Given the commands and output in the example above, you can determine that the filesystem looks visually like this:
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)

Here, there are four directories: / (the outermost directory), a and d (which are in /), and e (which is in a). These directories also contain files of various sizes.
Since the disk is full, your first step should probably be to find directories that are good candidates for deletion. To do this, you need to determine the total size of each directory. The total size of a directory is the sum of the sizes of the files it contains, directly or indirectly. (Directories themselves do not count as having any intrinsic size.)
The total sizes of the directories above can be found as follows:

The total size of directory e is 584 because it contains a single file i of size 584 and no other directories.
The directory a has total size 94853 because it contains files f (size 29116), g (size 2557), and h.lst (size 62596), plus file i indirectly (a contains e which contains i).
Directory d has total size 24933642.
As the outermost directory, / contains every file. Its total size is 48381165, the sum of the size of every file.

To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes. In the example above, these directories are a and e; the sum of their total sizes is 95437 (94853 + 584). (As in this example, this process can count files more than once!)
Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?

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

  const instructionsA = entries
  const structure = {}

  const findSize   = (name : string) => {
    let size = structure[name].size
    for(const child of structure[name].children){
      size += findSize(child)
    }

  

    return size
}

  let level = ''

  for(const inst of instructionsA){

    if(inst[0] === '$'){
      if(inst[1] === 'cd') {
        if(inst[2] === '..'){
          let _ = level.split(',')
          _.splice(_.length - 1, 1)
          level = _.toString()
        } else {
          if (inst[2] != '/') level += ','
          level += inst[2]
          structure[level] = {
            'size' : 0,
            'children' : []
          }
          
        }
      }
    }
    if(inst[0] === 'dir'){
      structure[level].children.push(level + ',' + inst[1])
    }
    // @ts-ignore
    if(!isNaN(inst[0])){
      structure[level].size += intval(inst[0])
    }
    
  }

  const sizes = []
  for(const layer in structure){
    sizes.push(findSize(layer))
  }

  answers.a = sizes.filter(s => s <= 100000).reduce((acc, idx) => acc + idx, 0)



  // Part Two
  
  answers.b = sizes.filter(s => s > sizes[0] - 40000000).reduce((acc, idx) => idx < acc ? idx : acc, 70000000)



  log(sizes.filter(s => s > sizes[0] - 40000000));

  if (isLog) {
  log(sizes)
    log(sizes.filter(s => s > sizes[0] - 40000000));
    // log(answers.a);
    // log(structure);
    // log(sizes);
  }
  return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.a == 95437 ? true : false;
};
const solvePart1 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.a;
};
const testPart2 = async (input: string): Promise<boolean> => {
  const puzzle_input = await puzzle.parseInput(input);
  const answers = findAnswers(puzzle_input.blocks[0]);

  return answers.b == 24933642 ? true : false;
};
const solvePart2 = async (): Promise<number> => {
  const puzzle_input = await puzzle.parseInput();
  const answers = findAnswers(puzzle_input.blocks[0], false);

  return answers.b;
};
const test_input = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

// const part1_correct = await testPart1(test_input);
// const part1 = await solvePart1();
// log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
