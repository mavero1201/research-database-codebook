# Project Documentation for Research Database Codebook

## Project Description
This project serves as a comprehensive database codebook for organizing research variables effectively. It includes guidelines for variable encoding, instructions for importing data into Excel, and a detailed description of the data structure.

## Variables Overview
| Variable Name | Data Type    | Description          | Encoding Rules    |
|---------------|--------------|----------------------|--------------------|
| sample_id     | Integer      | Unique identifier for each sample | Integer >= 1       |
| age           | Integer      | Age of the participant in years | Integer >= 0       |
| gender        | String       | Gender of the participant | 'M' for Male, 'F' for Female  |
| income        | Float        | Annual income in USD  | Float >= 0       |
| education     | Integer      | Highest level of education completed | 1 = No Degree, 2 = High School, 3 = Bachelors, 4 = Masters, 5 = Doctorate |

## Encoding Rules
- **Integers** should always be whole numbers.
- **Strings** must follow the encoding specified in the variable overview.
- **Floats** should be represented with two decimal points (e.g., 1000.00).

## Excel Import Instructions
1. Open Microsoft Excel.
2. Go to the "Data" tab and select "Get Data" from the toolbar.
3. Choose "From File" and then select "From Text/CSV."
4. Locate the downloaded dataset file in the appropriate format and follow the prompt to import the data.
5. Observe any necessary transformations during import and apply as needed.

## Conclusion
This README file provides a brief overview of the project structure and necessary information to work with the research database.