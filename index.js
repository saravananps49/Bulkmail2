const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")

const app = express()

app.use(cors())
//MIDDLE WARE
app.use(express.json())


mongoose.connect("mongodb+srv://john:123@cluster0.66qlp2n.mongodb.net/passkey?appName=Cluster0")
.then(function()
{
 console.log("Connected to DB..")
}
)
.catch(function()
{
console.log("Failed to connect DB")
}
)


const credential = mongoose.model("credential",{},"bulkmail")






// app.get("/sendemail",function(req,res)
app.post("/sendemail", function (req, res) {

    var msg = req.body.msg
    // console.log(msg)
    var emailList = req.body.emailList

    
    credential.find()
.then(function(data)
{
//  console.log(data[0].toJSON())
 const transporter = nodemailer.createTransport(
    {
        service: "gmail",

        auth: 
        {
            // user: "saravananps49@gmail.com",
            // pass: "jblu gqmo qubl qtfo",
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass,
        },
    }
);


try {
        for (var i = 0; i < emailList.length; i++) 
            {
            transporter.sendMail(
                {
                    from: "saravananps49@gmail.com",
                    // to:"aigeek38@gmail.com",
                    to: emailList[i],
                    subject: "test bulk mail app",
                    // text:"hi, test bulk mail app"
                    text: msg
                }

            )
        }

        res.send(true)
    }
    
    catch(error)
    {
        // console.log("Error")
        res.send(false)
    }

}
)
.catch(function(error)
{
 console.log(error)
}
)
    


}
)


app.listen(5000, function (req, res) {
    console.log("Server Connected..")
}
)