var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
router.get('/', (req, res) => {
    console.log("conectado a la base");
    knex('kusi')
    .select()
    .where("fecha", '>=', '09-01-2019')
    .then(kusi =>{
        res.render('kusi/index', {objKusi: kusi});
    });


    


});

router.get('/ingreso', (req, res) => {
  res.render('kusi/ingreso' );
});

router.post('/guardar', (req, res) => {

    knex('kusi')
      .returning('id')
      .insert({id : req.body.id, nombre: req.body.nombre , edad: req.body.edad ,estado : req.body.estado, fecha : req.body.fecha})
      .then(ids =>  {
        const id = ids[0];
        res.redirect(`/kusi`);

  });
});



router.delete('/:id',(req,res)=>{
  const id=req.params.id;
  console.log('deleting...');

 if(typeof id != 'undefined'){
    knex('kusi')
      .where('id',id)
      .del()
      .then(kusi => {
        console.log('delete id: '+id);
        res.redirect('/kusi');
    });

  }else{

    console.log('error invalid delete ');
    res.status(500);
    res.render('error', {
      message: 'Invalid ID delete '
    });
  }
});

module.exports = router;
