const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs');
app.set('views',"views")

 app.use(express.static(path.join(__dirname, 'public')));


var listOfImages = ["catch1.png","catch2.png","catch3.png","catch4.png","catch5.png"]
var listOfcaptcha = ["8v7w4q","djnknh","j994t9","f3n64p","7xt6dk"]



function getImage(){
let max = 4
    let min = 0

    let position = Math.floor(Math.random()*(max-min+1))
    let src = listOfImages[position]
    
    return {src}
}


function matchCatcode(str){
    if (listOfcaptcha.includes(str)){
        return true
    }
    return false
}



app.get("/",(req,res)=>{
    
    return res.render("index")
})

app.get("/m.icai.nic.in/caresult/final/",(req,res)=>{
    let {src} = getImage()
    return res.render("login_final",{captchaerrmsg:"",imagesrc:src,fielderrmsg:""})
})

app.get("/m.icai.nic.in/caresult/ipc-units",(req,res)=>{
     let {src} = getImage()
  
     return res.render("login_ipc_units",{imagesrc:src})
})

app.get("/m.icai.nic.in/caresult/ipc",(req,res)=>{
     let {src} = getImage()
    return res.render("login_ipc",{imagesrc:src})
})

app.get("/m.icai.nic.in/caresult/foundation",(req,res)=>{
     let {src} = getImage()
    return res.render("login_foundation",{imagesrc:src})
})




app.get("/m.icai.nic.in/caresult/final/merit-login",(req,res)=>{
     let {src} = getImage()
    return res.render("login_merit_final",{imagesrc:src})
})

app.get("/m.icai.nic.in/caresult/ipc/merit-login",(req,res)=>{
     let {src} = getImage()
    return res.render("login_merit_ipc",{imagesrc:src})
})

app.get("/m.icai.nic.in/caresult/foundation/merit-login",(req,res)=>{
     let {src} = getImage()
    return res.render("login_merit_foundation",{imagesrc:src})
})




// POST REQUEST SECTION 


app.post("/m.icai.nic.in/caresult/final/", async (req,res)=>{

    const {rollno,regno,scode} = req.body
    console.log(req.body)
    if(!rollno,!regno){
        let {src} = getImage()
        return res.render("login_final",{captchaerrmsg:"",imagesrc:src,fielderrmsg:"The fields can not be blank"})
    }
    else if(rollno != "359414" && regno.toLowerCase() != "nro0477912")
    {
        return res.render("notFound",{title:"Final"})
    }
    else
    { 
        console.log(scode)
        let result = matchCatcode(scode)
        
        if(result){
            setTimeout(() => {
          
        return res.render("result")
  
}, 8000);
        }
        else{
            const {src} = getImage()
                return res.render("login_final",{imagesrc:src,fielderrmsg:"",captchaerrmsg:"Captcha Code was wrong"})
        }
        
    
        
}
})

app.post("/m.icai.nic.in/caresult/ipc",(req,res)=>{
    return res.render("notFound",{title:"Intermediate Examination Results"})
})

app.post("/m.icai.nic.in/caresult/foundation",(req,res)=>{
    return res.render("notFound",{title:"Foundation Examintation Results"})
})

app.post("/m.icai.nic.in/caresult/ipc-units",(req,res)=>{
    return res.render("notFound",{title:"Intermediate Examination - UNITS Results"})
})


app.post("/m.icai.nic.in/caresult/final/merit-login",(req,res)=>{
    return res.render("notFound",{title:"Final Examination - Merit List"})
})

app.post("/m.icai.nic.in/caresult/ipc/merit-login",(req,res)=>{
    return res.render("notFound",{title:"Intermediate Examination - Merit List"})
})

app.post("/m.icai.nic.in/caresult/foundation/merit-login",(req,res)=>{
    return res.render("notFound",{title:"Foundation Examination - Merit List"})
})






app.listen(3000,()=>{
    console.log('server runnning ')
})