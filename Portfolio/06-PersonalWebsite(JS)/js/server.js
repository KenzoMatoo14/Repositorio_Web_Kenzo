console.log("Running the script");

document.querySelector('.schedule-form').addEventListener('submit', function (e) {
  e.preventDefault(); 

  const status = document.querySelector('select[name="status"]').value;
  const date = document.querySelector('input[name="date"]').value;
  const start = document.querySelector('input[name="start"]').value;
  const end = document.querySelector('input[name="end"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const place = document.querySelector('input[name="place"]').value;
  const type = document.querySelector('select[name="type"]').value;
  const notes = document.querySelector('textarea[name="notes"]').value;
  const withPerson = document.querySelector('input[name="with"]').value;

  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${status.charAt(0).toUpperCase() + status.slice(1)}</td>
    <td>${date}</td>
    <td>${start}</td>
    <td>${end}</td>
    <td>${description}</td>
    <td>${place}</td>
    <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
    <td>${notes}</td>
    <td>${withPerson}</td>
  `;

  document.querySelector('.submitted-table tbody').appendChild(newRow);

  document.querySelector('.schedule-form').reset();
});