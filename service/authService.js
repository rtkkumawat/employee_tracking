const empSchema = require("../model/employeeSchema")


module.exports = {
isEmpExists : async function(empEmail){
       const checkEmail = await  empSchema.findone({
        empEmail:req.body.empEmail
       })
       if (checkEmail){
        returns = true
  }

}
}