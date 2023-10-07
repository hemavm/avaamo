const fs = require('fs');

// Define the input and output file paths
const inputFile = 'input.json';
const outputFile = 'output_data.json';

// Read data from the input JSON file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading input file: ${err}`);
    return;
  }

  try {
    // Parse the JSON data
    const inputData = JSON.parse(data);

    // Task 1: Calculate the average age of all people
    const averageAge = calculateAverageAge(inputData);

    // Task 2: Create a new array with people aged 30 or older
    const olderPeople = filterPeopleOver30(inputData);

    // Task 3: Sort the new array by name
    olderPeople.sort((a, b) => a.name.localeCompare(b.name));

    // Create the result object
    const resultData = {
      averageAge,
      olderPeople,
    };

    // Write the result data to the output JSON file
    fs.writeFile(outputFile, JSON.stringify(resultData, null, 2), (err) => {
      if (err) {
        console.error(`Error writing output file: ${err}`);
        return;
      }
      console.log(`Data manipulation complete. Result saved in ${outputFile}`);
    });
  } catch (error) {
    console.error(`Error parsing input JSON: ${error}`);
  }
});

// Function to calculate the average age
function calculateAverageAge(data) {
  const totalAge = data.reduce((acc, person) => acc + person.age, 0);
  return totalAge / data.length;
}

// Function to filter people aged 30 or older
function filterPeopleOver30(data) {
  return data.filter((person) => person.age >= 30);
}
