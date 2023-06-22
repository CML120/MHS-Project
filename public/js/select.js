// Function to filter and display armors by type
function filterAndDisplayArmors(selectedType) {
  const armorRows = document.querySelectorAll('.armor-row');
  armorRows.forEach(row => {
    const armorType = row.dataset.type;

    if (selectedType === 'all' || armorType === selectedType) {
      row.style.display = 'table-row';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterArmorByType(event) {
  const selectedType = event.target.dataset.type;

  const buttons = document.querySelectorAll('.armor-type-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  event.target.classList.add('active');

  filterAndDisplayArmors(selectedType);
}

const armorTypeButtons = document.querySelectorAll('.armor-type-button');
armorTypeButtons.forEach(button => {
  button.addEventListener('click', filterArmorByType);
});
