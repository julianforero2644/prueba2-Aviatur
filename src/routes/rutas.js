const {Router} = require('express');
const router = Router();
const fs = require('fs');
var async = require("async");

const _ = require('underscore');
const { userInfo } = require('os');

const json_hoteles = fs.readFileSync('src/sample.json', 'utf-8');
let hoteles = JSON.parse(json_hoteles);


router.get('/', (req, res) => {
    res.render('index.ejs', {hoteles});

    //res.send('recibido');
    //res.json(hoteles);
    //http://localhost:4000
   
});


// Mostrar registro por id
router.get('/hotel/:id', async(req, res)=>{

    const {id} = req.params;
    
    const productoElegido = await hoteles.filter(hotel => hotel.id == req.params.id);  

    //let producto = JSON.stringify(productoElegido);  
    
    console.log(productoElegido);

    //res.render('/detalle', {hotel});

    res.send(productoElegido);

    //http://localhost:4000/hotel/161899
   
 });

 // Buscar por nombre
 router.get('/buscar/:name', async(req, res)=>{

    const {name} = req.params;   
    
    const hotelName = await hoteles.filter(hotel => hotel.name == req.params.name);  

    //let producto = JSON.stringify(productoElegido);  
    
    console.log(hotelName);

    //res.render('/detalle', {hotel});

    res.send(req.params); 


    //res.redirect('/');
    //http://localhost:4000/buscar/El Golf Hotel Boutique

});

router.get('/crear', (req, res) => {
    res.render('crear-hotel.ejs');
   
});

router.post('/grabar', (req, res) => {
    
    const {name, stars, price, image, amenities} = req.body;
    
    if (name && stars && price && image && amenities) {
       
        const id = hoteles.length + 1;
        // creo un objeto y pasarle todo lo del request al objeto -- ...req.body
        const newHotel = {id, ...req.body};
        hoteles.push(newHotel);       
        //res.json(hoteles);
        res.json(hoteles);
        
        const json_hoteles = JSON.stringify(hoteles)
        fs.writeFileSync('src/sample.json', json_hoteles, 'utf-8');

        res.redirect('/');
        
    }else{
        
        res.json({error:"Se genero un error"});
    }
    res.send('recibido');   
});


// Ruta de borrar un registro por id
router.get('/delete/:id', (req, res)=>{
    hoteles = hoteles.filter(hotel => hotel.id != req.params.id);    
    const json_hoteles = JSON.stringify(hoteles)
    fs.writeFileSync('src/sample.json', json_hoteles, 'utf-8');

    res.redirect('/');

});


router.get('/hotel/:id', async(req, res)=>{

    const {id} = req.params;
    
    const productoElegido = await hoteles.filter(hotel => hotel.id == req.params.id);  

    //let producto = JSON.stringify(productoElegido);  
    
    console.log(productoElegido);

    //res.render('/detalle', {hotel});

    res.send(productoElegido);
   
 });
 

// Ruta para actualizar un registro
router.put('/update/:id', (req, res)=>
{
     // Obtener el id
     const { id } = req.params;
     
     const {name, stars, price, image, amenities} = req.body;
     
    if (name && stars && price && image && amenities)
    {        
        _.each(hoteles, (hotel, i)=>
        {
            if (hotel.id == id) 
            {                
                hotel.name = name;
                hotel.stars = stars;
                hotel.price = price;
                hotel.image = image;
                hotel.amenities = amenities;
            }
        });

        res.json(hoteles);
    }else{
        res.status(500).json({error:"Todos los campos son requeridos"});
    }
});


module.exports = router;