import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
console.log(lab1.functionOne([39, 77, -679]));
// returns and then outputs: [45, 111, 632]

console.log(lab1.functionOne([5, 10, 99]));
// returns and then outputs: [5, 0, 89]

console.log(lab1.functionOne([0]));
// returns and then outputs: [0]

console.log(lab1.functionOne([25, 88, 999]));
// returns and then outputs: [10, 96, 869]

console.log(lab1.functionOne([123, 101, -44]));
// returns and then outputs: [6, 0, 22]

//-------------------------------------------------------------------------------------------
//---------------------------------function 2------------------------------------------------
//-------------------------------------------------------------------------------------------

console.log(lab1.functionTwo(["hello", "world", "AEIOU"]));
// returns and then outputs:
// {hello: 1, world: 0, AEIOU: 0}

console.log(lab1.functionTwo(["banana", "Programming", "sky"]));
// returns and then outputs:
// {banana: 2, Programming: 3, sky: 0}

console.log(lab1.functionTwo(["Mississippi"]));
// returns and then outputs:
// {Mississippi: 3}

console.log(lab1.functionTwo([]));
// returns and then outputs: {}

console.log(lab1.functionTwo(["B2B!!!", "Shh...", "rhythm"]));
// returns and then outputs:
// {"B2B!!!": 1, "Shh...": 1, rhythm: 1}




console.log(lab1.functionThree("Hello there how are you"));
// returns and then outputs:
// {mostCommonStart: "h", words: "Hello, how", averageLength: 3}

console.log(lab1.functionThree("Code creates clever solutions"));
// returns and then outputs:
// {mostCommonStart: "c", words: "Code, creates, clever", averageLength: 6}

console.log(lab1.functionThree("one Two three four"));
// returns and then outputs:
// {mostCommonStart: "t", words: "Two, three", averageLength: 3}

console.log(lab1.functionThree("Apple banana Cat dog"));
// returns and then outputs:
// {mostCommonStart: "a", words: "Apple", averageLength: 4}

console.log(lab1.functionThree(""));
// returns and then outputs:
// {mostCommonStart: null, words: null, averageLength: 0}

//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------Function 4-------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------

console.log(
    lab1.functionFour([3, "guitar", 1, "bass", -10, "bass", 3])
);
// returns and then outputs:
// ["bass", "guitar", 1, 3, -10]

console.log(
    lab1.functionFour(["apple", "orange", "kiwi", 10, -2, 2])
);
// returns and then outputs:
// ["kiwi", "apple", "orange", -2, 2, 10]

console.log(
    lab1.functionFour([100, "Zebra", "Ant", 50, -100])
);
// returns and then outputs:
// ["Ant", "Zebra", 50, -100, 100]

console.log(
    lab1.functionFour(["one", "two", "three", "two", 7, 8, 7])
);
// returns and then outputs:
// ["one", "two", "three", 7, 8]

console.log(
    lab1.functionFour([1, -1, 2, -2, 0, "AaA", "bb", "bb!"])
);
// returns and then outputs:
// ["bb", "AaA", "bb!", 0, -1, 1, -2, 2]