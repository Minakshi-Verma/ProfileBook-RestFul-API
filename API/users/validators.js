const helper = require("./helpers");

const validateRegistration = (req, res, next) => {
  const user = {
    User_First_Name: req.body.User_First_Name,
    User_Last_Name: req.body.User_Last_Name,
    User_Password: req.body.User_Password,
    User_Birthday: req.body.User_Birthday,
    User_Email: req.body.User_Email
  };
  if (
    !user.User_Birthday ||
    !user.User_Email ||
    !user.User_Password ||
    !user.User_First_Name ||
    !user.User_Last_Name
  ) {
    res.status(400).json({
      message: "most include full name, password, birthday, and email"
    });
  }

  next();
};
const validateLogin = (req, res, next) => {
  const { User_Password, User_Email } = req.body;
  if (!User_Password) {
    res.status(400).json({
      message: "most include Password"
    });
  } else if (!User_Email) {
    res.status(400).json({
      message: "most include Email"
    });
  } else {
    next();
  }
};

const validateID = (req, res, next) => {
  const { User_ID } = req.params;
  helper.getUserByfilter({ User_ID }).then(([user]) => {
    if (!user) {
      res.status(400).json({ message: "user with this ID does not exist" });
    } else next();
  });
};

const validateIsEmailTaken = (req, res, next) => {
  const {User_Email} = req.body
  helper.GetByEmail({User_Email})
  .then(x => {
    if(x){
      // res.send(x)
      res.status(400).json({message: "Email is already in use"})
    }
    else next()
  })
  .catch(err => res.status(400).json({message: err}))

}
const validateDeleteByEmail = (req, res, next) => {
  const {User_Email} = req.body
  helper.GetByEmail({User_Email})
  .then(x => {
    if(!x){
      res.status(400).json({message: "email does not match account email"})
    }
    else next()
  })
  .catch(err => res.status(400).json({message: err}))

}
module.exports = {
  validateRegistration,
  validateLogin,
  validateID,
  validateIsEmailTaken,
  validateDeleteByEmail
};
