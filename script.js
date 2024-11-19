// Function to fetch and parse CSV file
async function fetchData() {
    const response = await fetch('doctor_database');
    const data = await response.text();
    return parseCSV(data);
}

// Function to parse CSV data into JSON format
function parseCSV(data) {
    const rows = data.trim().split('\n').map(row => row.split(','));
    const headers = rows[0];
    return rows.slice(1).map(row => {
        const item = {};
        row.forEach((cell, i) => {
            item[headers[i]] = isNaN(cell) ? cell : Number(cell);
        });
        return item;
    });
}

// Function to display filtered and sorted results
function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear existing results

    data.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        
        resultItem.innerHTML = `
            <div class="result-info">
                <strong>${item.Specialization}</strong>
                <p>Price: $${item.Price}</p>
                <p>Experience: ${item.Experience} years</p>
            </div>
        `;
        
        resultsContainer.appendChild(resultItem);
    });
}

// Function to apply filters and sorting
function applyFilters() {
    fetchData().then(data => {
        const specialization = document.getElementById('specialization').value;
        const sortOption = document.getElementById('sort').value;

        // Filter by specialization
        let filteredData = data;
        if (specialization) {
            filteredData = data.filter(item => item.Specialization === specialization);
        }

        // Sort data based on selected option
        filteredData.sort((a, b) => {
            if (sortOption === 'price-high') return b.Price - a.Price;
            if (sortOption === 'price-low') return a.Price - b.Price;
            if (sortOption === 'experience-high') return b.Experience - a.Experience;
            if (sortOption === 'experience-low') return a.Experience - b.Experience;
            return 0;
        });

        displayResults(filteredData);
    });
}

// Initial load and display of data
fetchData().then(displayResults);
