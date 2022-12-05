import express from "express";
const router = express.Router();
import {User} from "../userModel.js"
import {authUser} from "../middleware/auth.js"

router.post('/users',async(req,res)=>{
  try {
      const user = await User.create(req.body);
      await user.generateToken();
      res.status(200).send()
  }catch(err) {
       console.error(err);
      res.status(500).send()
  }
})

router.post('/login',async(req,res)=>{
  const{email, password} = req.body;
  try{
      const user = await User.findByCredentials(email, password);
      await user.generateToken();
      res.status(200).send(user)
  }catch(err) {
       console.log(err);
      res.status(500).send()
  }
})

router.post('/auto-login', authUser, async (req, res) => {

  res.send(req.user)

})

router.post('/logout',authUser, async (req, res) => {
  const user =req.user;
  user.token = '';
  await user.save();
  res.status(200).send()
})

router.post('/add-favorites',authUser, async (req, res)=>{

  const {dressId}=req.body;
  const user =req.user;
  user.favorites.push(dressId);
  await user.save();
  res.status(200).send(user)

})

router.post('/remove-favorites',authUser, async (req, res)=>{

  const {dressId}=req.body;
  const user =req.user;
  user.favorites = user.favorites.filter(id=>id !==dressId)
  await user.save();
  res.status(200).send(user)

})


export const usersRouter = router;





// import express from "express";
// import { createUser, getUserByName } from "./helper.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const router = express.Router();

// async function genHashedPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }

// router.post("/signup", async function (req, res) {
//   const { username, password } = req.body;
//   const hashedPassword = await genHashedPassword(password);

//   const isUserExist = await getUserByName(username);

//   if (isUserExist) {
//     res.status(400).send({ message: "User already exists" });
//   } else {
//     await createUser({ username: username, password: hashedPassword }, res);
//   }
// });



// router.post("/login", async function (req, res) {
//   const { username, password } = req.body;

//   const userFromDB = await getUserByName(username);
// if(!userFromDB){
// res.status(401).send({ message: 'Invalid credentials' });
// }else{
//   const storedDBPassword = userFromDB.password;
//   const isPasswordMatch = await bcrypt.compare(password,storedDBPassword);
 
// if(isPasswordMatch){
//   const token= jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
//   res.send({ message: 'Successfully login',token:token });
// }else{
//   res.status(401).send({ message: 'Invalid credentials' })
// }
// }
// });