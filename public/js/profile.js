// Get DOM element
const savedArmorSets = document.getElementById('savedArmorSets');
// const deleteButton = document.getElementById('deleteButton');
const deleteButtons = document.querySelectorAll('.deleteButton');


deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const armorId = button.dataset.armorId;
  
      //removes the row 
    //   const armorRow = button.parentNode.parentNode;
    //       armorRow.remove();
    //       console.log('Armor piece deleted!');

      try {
        const response = await fetch(`/api/armor/delete-armor-sets/${armorId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        console.log(response);
        if (response.ok) {
          // Successfully deleted armor piece (row)
          const armorRow = button.parentNode.parentNode;
          armorRow.remove();
          console.log('Armor piece deleted!');
        } else {
          // Successfully deleted armor piece
          console.log('Armor piece deleted!');
        }
      } catch (err) {
        // network errors
        console.error('Network error:', err);
      }
    });
  });

// deleteButtons.forEach((button) => {
//     button.addEventListener('click', async () => {
//       const armorId = button.dataset.armorId;
//       console.log(armorId);
  
//       try {
//         const response = await fetch(`/delete-armor-sets/${armorId}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
  
//         console.log(response);
//         if (response.ok) {
//           // Successfully deleted armor piece
//           console.log('Armor piece deleted!');
//         } else {
//           // Error when deleting
//           console.error('Unable to delete armor piece');
//         }
//       } catch (err) {
//         // network errors
//         console.error('Network error:', err);
//       }
//     });
//   });

  

// Fetch saved armor sets
// fetch('/api/armor/save-armor-sets')
//   .then((response) => response.json())
//   .then((data) => {
//     const armorSets = data.armorSets;
//     if (armorSets && armorSets.length > 0) {
//       const armorList = document.createElement('ul');
//       armorSets.forEach((set) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = set;
//         armorList.appendChild(listItem);
//       });
//       savedArmorSets.appendChild(armorList);
//     } else {
//       const noArmorSetsMsg = document.createElement('p');
//       noArmorSetsMsg.textContent = 'No armor sets saved.';
//       savedArmorSets.appendChild(noArmorSetsMsg);
//     }
//   })
//   .catch((error) => {
//     console.error('Error fetching saved armor sets:', error);
//   });
