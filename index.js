import express from "express";
import data from blogPost;


const port = 3000;
const app = express();
var data = data();
console.log(data.length);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", data);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});