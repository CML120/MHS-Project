const router = require('express').Router();
const { Armor, User } = require('../models');
const withAuth = require('../utils/auth');
const db = require('../models')




router.get('/', async (req, res) => {
  const armorData = await Armor.findAll({ raw: true}) 
  const armorTypes = ['head', 'chest', 'gloves', 'waist', 'legs'];
  res.render('homepage', { logged_in: req.session.logged_in, armors: armorData, types: armorTypes });
});

router.get('/homepage', async (req, res) => {
  const armorData = await Armor.findAll({ raw: true}) 
  const armorTypes = ['head', 'chest', 'gloves', 'waist', 'legs'];
  res.render('homepage', {logged_in: req.session.logged_in, armors: armorData, types: armorTypes });

});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const armorData = await db.Armor.findAll({ 
      where : {
        user_id: req.session.user_id
      }
    })
    const armors = armorData.map(armor=>armor.get({plain:true}));
    res.render('profile', { logged_in: req.session.logged_in, armors });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/build', async (req, res) => {
  res.render('build', {logged_in: req.session.logged_in});
});


router.get('/about', async (req, res) => {
  res.render('about',{logged_in: req.session.logged_in});
});







router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



module.exports = router;
