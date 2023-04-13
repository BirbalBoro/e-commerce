// const jwt = require("jsonwebtoken");
// const jwt_decode = require("jwt-decode");

// function UserData(token) {
//     jwtToken = token.split(" ")[1];
//     return jwt_decode(jwtToken);
//   }

// function jwtGen(data) {
//     return jwt.sign(data, process.env.SECRET,{expiresIn:'15min'});
// }
// function jwtVerify(token){
//     let status;
//     jwt.verify(token,process.env.SECRET,(err)=>{
//         if(err){
//             status = false;
//             return
//         }
//         status = true;
//         return
//     })
//     return status
// }
// module.exports = { jwtGen, jwtVerify, UserData };

const bcrypt = require("bcrypt");

const compare_password = async (password, password) => {
    return bcrypt.compare(password, password);
}

module.exports = { compare_password };