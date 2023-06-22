// Get DOM element
const savedArmorSets = document.getElementById('savedArmorSets');

// Fetch saved armor sets
fetch('/api/profile/armorsets')
  .then((response) => response.json())
  .then((data) => {
    const armorSets = data.armorSets;
    if (armorSets && armorSets.length > 0) {
      const armorList = document.createElement('ul');
      armorSets.forEach((set) => {
        const listItem = document.createElement('li');
        listItem.textContent = set;
        armorList.appendChild(listItem);
      });
      savedArmorSets.appendChild(armorList);
    } else {
      const noArmorSetsMsg = document.createElement('p');
      noArmorSetsMsg.textContent = 'No armor sets saved.';
      savedArmorSets.appendChild(noArmorSetsMsg);
    }
  })
  .catch((error) => {
    console.error('Error fetching saved armor sets:', error);
  });
