const router = require('express').Router();
const { Armor, User } = require('../../models');
const withAuth = require('../../utils/auth');
const fetch = require('node-fetch');
const { getHeadArmor, getChestArmor, getGloves, getWaistArmor, getLegArmor } = require('../../utils/fetchMHdata')



//this is the route to this router http://localhost:3001/api/armor

router.get('/:type',  async (req, res) => {
  try {
    const { type } = req.params;

    // Call the appropriate fetchMHdata function based on the armor type
    let armorSets;
    switch (type) {
      case 'head':
        armorSets = await getHeadArmor();
        break;
      case 'chest':
        armorSets = await getChestArmor();
        break;
      case 'gloves':
        armorSets = await getGloves();
        break;
      case 'waist':
        armorSets = await getWaistArmor();
        break;
      case 'legs':
        armorSets = await getLegArmor();
        break;
      default:
        return res.status(400).json({ error: 'Invalid armor type' });
    }

    res.status(200).json({ armorSets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch armor sets' });
  }
});

router.get('/build', withAuth, async (req, res) => {
  try {
    // Fetch armor sets from the database
    const armorSets = await Armor.findAll({
      attributes: ['name'],
      where: { user_id: req.session.user_id },
    });

    res.render('build', { armorSets });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/savearmor', withAuth, async (req, res) => {
  try {
    const { armorSetId } = req.body;
    const userId = req.session.user_id;

    // Create armor set
    const armorData = await Armor.create({
      armorSetId: armorSetId,
      user_id: userId,
    });

    res.status(200).json({ message: 'Armor set saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save armor set' });
  }
});

router.post('/save-armor-sets', withAuth, async (req, res) => {
  // try {
    const { armorSetName } = req.body;
    const userId = req.session.user_id;

    // Create armor set
    const armorData = await Armor.create({
      name: armorSetName,
      user_id: userId,
    });

    res.status(200).json({ message: 'Armor set saved successfully' });
    // }

    // Save armor sets to the user's profile
  

  
  // catch (err) {
    // console.error(err);
    // res.status(500).json({ error: 'Failed to save armor sets' });
  // }
});

module.exports = router;
