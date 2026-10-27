export const functionOne = (arr) => {
  // Implement function 1 here
  function split_it(num_1)
  {
    let temp_1 = Math.abs(num_1);
    let temp_2 = String(temp_1).split('');
    return temp_2;
  }

   function hard_work(num_1, sum = 0)
  {
    let hold_1 = split_it(num_1);
    let temp = 1;
    let temp_arr2 = [];
    for(let i = 0; i < hold_1.length; i++)
    {
        temp = temp * Number(hold_1[i]);
    }
    sum = sum + temp;

    if(String(temp).length == 1)
    {
        return sum
    }
    else
    {
        return hard_work(temp, sum);
    }
    return temp;

  }

  let temp_arr = [];

  for(let i = 0; i < arr.length; i++)
  {
    let hold2 = hard_work(arr[i]);
    temp_arr.push(hold2);
  }
  return temp_arr; //return result
};

export const functionTwo = (arr) => {
  // Implement function 2 here
  function part1(str)
  {
    let found = false;
    let count = 0;
    let temp_arr3 = [];

    for(let i = 0; i < str.length; i++)
    {
        let hold = str[i];
        found = false;

        if(!/[a-zA-Z]/.test(hold))
        {
            continue;
        }

        for(let j = 1; j < str.length; j++)
        {
            if(j != i && str[j] == hold)
            {
                if(j != i && str[j].toLowerCase() == hold.toLowerCase())
                {
                    found = true;
                }
            }
        }
        if(found == true && !temp_arr3.includes(hold.toLowerCase()))
        {
            count++
            temp_arr3.push(hold);
        }
    }

    return count;
    }

    let temp_obj_arr = {};
    for(let i = 0; i < arr.length; i++)
    {
        temp_obj_arr[arr[i]] = part1(arr[i]);
    }
    return temp_obj_arr; 

  let temp_arr3 = []; 
  for(let i = 0; i < arr.length; i++)
  {
    temp_arr3.push(part1(arr[i]));
  }
  return temp_arr3; //return result
};

export const functionThree = (str) => {
  // Implement function 3 here

  if (str === "") {
    return {
      mostCommonStart: null,
      words: null,
      averageLength: 0
    };
  }

  let test_arr = [];

  let word = str.split(" ");


  function get_mostCommonStart(word)
  {
    let hold_arr = [];
    for(let i = 0; i < word.length; i++)
    {
        hold_arr.push(word[i][0].toLowerCase());
    }


    let counts = {};
    for(let i = 0; i < hold_arr.length; i++)
    {
        let letter = hold_arr[i];
        if(counts[letter] === undefined)
        {
            counts[letter] = 0;
        }
        counts[letter] = counts[letter] + 1;
    }

    let highest_letter = null;
    let highest_count = 0;

    for(let letter in counts)
    {
        if(counts[letter] > highest_count)
        {
            highest_count = counts[letter];
            highest_letter = letter;
        }
        else if(counts[letter] === highest_count && letter < highest_letter)
        {
            highest_letter = letter;
        }
    }

    return highest_letter;
  }

  function get_words(word, letter)
  {
    let check_match = [];

    for(let i = 0; i < word.length; i++)
    {
        if(word[i][0].toLowerCase() === letter)
        {
            check_match.push(word[i]);
        }
    }

    return check_match.join(", ");

  }

  function get_averageLength(word)
  {
    let count = 0;

    for(let i = 0; i < word.length; i++)
    {
        count = count + word[i].length;
    }

    count = count / word.length;

    return parseInt(count);

  }

  let mostCommonStart = get_mostCommonStart(word);
  let words = get_words(word, mostCommonStart);
  let averageLength = get_averageLength(word);

    return {
        mostCommonStart: mostCommonStart,
        words: words,
        averageLength: averageLength
    };//return result
};

export const functionFour = (arr) => {

  let hold_strings = [];
  let hold_numbers = [];

  let sorted_arr = [];

  for(let i = 0; i < arr.length; i++)
  {
    let check_type = arr[i];

    if(typeof check_type === 'string' && !hold_strings.includes(check_type))
    {
        hold_strings.push(check_type);
    }
    if(typeof check_type === 'number' && !hold_numbers.includes(check_type))
    {
        hold_numbers.push(check_type);
    }
  }

    hold_strings.sort((a,b) => 
        {
            if(a.length != b.length)
                {
                    return a.length - b.length;
                }
            return a < b ? -1:(a>b ? 1:0);
            });
    sorted_arr.push(hold_strings);

    hold_numbers.sort((a,b) => 
    {
        let diff = Math.abs(a) - Math.abs(b);
        if(diff !== 0)
        {
            return diff;
        }
        return a - b;
    });
    sorted_arr.push(hold_numbers);
    
    let last_temp_arr = [];
    for(let i = 0; i < hold_strings.length; i++)
    {
        last_temp_arr.push(hold_strings[i]);
    }

    for(let i = 0; i < hold_numbers.length; i++)
    {
        last_temp_arr.push(hold_numbers[i]);
    }

  return last_temp_arr; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
};
