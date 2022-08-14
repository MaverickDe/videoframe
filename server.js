let express= require("express")
let app = express()
 
app.use(express.static("public"))
app.get("/", (req, res) => {
    res.sendFile(__dirname +"/index.html")
})


let port = process.env.PORT || 2000

app.listen(port)