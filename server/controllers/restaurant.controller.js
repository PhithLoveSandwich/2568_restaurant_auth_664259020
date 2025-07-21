import Restaurant from "../models/restaurant_model.js";

const restaurantController = {};

// Create and save a new restaurant
restaurantController.create = (req, res) => {
  const { title, type, img } = req.body;

  // Validate data
  if (!title || !type || !img) {
    res.status(400).send({ message: "Title, Type or ImageUri can not be empty!" });
    return;
  }

  // Check if restaurant already exists
  Restaurant.findOne({ where: { title: title } })
    .then((restaurant) => {
      if (restaurant) {
        res.status(400).send({ message: "Restaurant already exists!" });
        return;
      }

      // Create new restaurant
      const newRestaurant = {
        title: title,
        type: type,
        img: img,
      };

      Restaurant.create(newRestaurant)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || "Something went wrong while creating the restaurant.",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Error occurred while checking for existing restaurant.",
      });
    });
};

restaurantController.getAll = async (req, res) => {
  await Restaurant.findAll().then((data)=>{
    res.send(data)
  }).catch((error)=>{
        res.status(500).send({
          message:
            error.message || "Something error while getting All the restaurant",
    });
  });
};

restaurantController.getById = async (req, res) => {
  const id = req.params.id;

  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Restaurant with id: " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something went wrong while retrieving the restaurant.",
      });
    });
};

restaurantController.update = async (req, res) => {
  const id = req.params.id;
  const {title,type,img} = req.body;
  //validate data
  if(!title && !type && !img){
    res.status(400).send({message: "Title, Type or ImageUri can not be empty!"});
    return;
  }
  await Restaurant.update({title, type, img},
    {where:{id:id}}
  ).then((num)=>{
    if(num[0] === 1){
      res.send({message: "Update restaurant successfully"})
    }else{
      res.status(404).send({message: `Cannot update Restaurant with id: ${id}. Maybe Restaurant was not found or req.body is empty`})
    }
  }).catch((error)=>{
        res.status(500).send({
          message:
            error.message || "Something error while getting All the restaurant",
    });
  });
};

restaurantController.deleteById = async(req, res)=>{
  const id = req.params.id;
  if (!id) {
        res.status(404).send({ message: "id is missing"});
        return;
    }
    await Restaurant.destroy({where:{id}}).then((num) =>
      {
        if(num === 1){
          res.send({message:"Restaurant Delete"});
        }else{
          res.status(400).send({message:"Cann't delete Restaurant becasue not found this id"})
        }
      })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something went wrong while retrieving the restaurant.",
      });
    });
};


export default restaurantController;
