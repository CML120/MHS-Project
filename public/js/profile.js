const savedArmorSets = document.getElementById('savedArmorSets');
const deleteButtons = document.querySelectorAll('.deleteButton');


deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
        const armorId = button.dataset.armorId;

       
        try {
            const response = await fetch(`/api/armor/delete-armor-sets/${armorId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            if (response.ok) {
                const armorRow = button.parentNode.parentNode;
                armorRow.remove();
                console.log('Armor piece deleted!');
            } else {
                console.log('No such armor to delete!');
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    });
});





