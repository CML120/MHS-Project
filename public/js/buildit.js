// Get DOM element
const armorTypeSelect = document.getElementById('armorType');
const armorSetSelect = document.getElementById('armorSet');
const saveButton = document.getElementById('saveButton');
const selectedArmorList = document.getElementById('selectedArmorList');

armorTypeSelect.addEventListener('change', () => {
  const selectedType = armorTypeSelect.value;
  if (selectedType) {
    armorSetSelect.disabled = false;
    armorSetSelect.innerHTML = '<option value="">Please select armor set</option>';
    fetchArmorSets(selectedType);
  } else {
    armorSetSelect.disabled = true;
    armorSetSelect.innerHTML = '<option value="">Please select armor type first</option>';
  }
});

saveButton.addEventListener('click', () => {
  console.log(armorSetSelect);
  const selectedSetId = armorSetSelect.value;
  if (selectedSetId) {
    const selectedSet = armorSetSelect.options[armorSetSelect.selectedIndex].text;
    saveArmorSet(selectedSetId, selectedSet);
    clearSelection();
  }
});

function fetchArmorSets(type) {
  // Replace the URL with your actual endpoint
  fetch(`/api/armor/${type}`)
    .then((response) => response.json())
    .then((data) => {
      const armorSets = data.armorSets;
      if (armorSets && armorSets.length > 0) {
        armorSets.forEach((set) => {
          const option = document.createElement('option');
          option.value = set.set_Id; // Use set.name as the value
          option.textContent = set.name;
          armorSetSelect.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching armor sets:', error);
    });
}

function saveArmorSet(armorSetId, armorSetName) {
  fetch('/api/armor/save-armor-sets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ armorSetName }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Armor set saved:', data);
      displaySelectedArmor(armorSetName);
      saveGeneratedList();
    })
    .catch((error) => {
      console.error('Error saving armor set:', error);
    });
}


function displaySelectedArmor(armorSet) {
  const listItem = document.createElement('li');
  listItem.textContent = armorSet;
  selectedArmorList.appendChild(listItem);
}

function clearSelection() {
  armorTypeSelect.value = '';
  armorSetSelect.value = '';
  armorSetSelect.disabled = true;
}

function saveGeneratedList() {
  const generatedList = selectedArmorList.innerHTML;
}


