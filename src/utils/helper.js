export function calculateCost(input_string_with_numbers){

    const input = input_string_with_numbers;
    const regex = /\d+/; // This regular expression matches one or more digits

    const numberString = input.match(regex)[0];
    const number = parseInt(numberString, 10);

    // console.log(number); // Output: 400
    return number;
}