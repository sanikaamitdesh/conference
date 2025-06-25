const axios = require('axios');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

try {
  // 1. Read Excel file
  const filePath = path.join(__dirname, '..', 'data', 'data.xlsx');
  const workbook = xlsx.readFile(filePath);

  // 2. Convert first sheet to JSON
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const papersData = xlsx.utils.sheet_to_json(sheet);

  // 3. Show a preview
  console.log('📄 Preview of parsed data:', papersData.slice(0, 3));

  // 4. Post to API
  axios.post('http://localhost:5000/api/papers/import', papersData)
    .then(res => {
      console.log('✅ Import success:', res.data);
    })
    .catch(err => {
      console.error('❌ Import failed:', err.response?.data || err.message);
    });

} catch (err) {
  console.error('🚨 Fatal error:', err.message);
}
