// Initialization
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

//Post Constructor
function Post (title, subtitle, content) {
    this.title = title;
    this.subtitle = subtitle;
    this.content = content;
    this.date = new Date().toLocaleString();
}

//Function to create new post
function addPost(title, subtitle, content) {
    let post = new Post(title, subtitle, content);
    posts.push(post);
}

//Function to update post
function updatePost (postIndex, title, subtitle, content) {
    let post = new Post(title, subtitle, content);
    posts.push(post);
    posts.splice(postIndex, 1);
    
}

//Function to delete post
function deletePost(postIndex) {
    posts.splice(postIndex, 1);
}

//Midleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Home
app.get("/", (req, res) =>{
    res.render("index.ejs", {posts: posts});
});

// view post
app.get("/view/:id", (req, res) => {
    let postIndex = req.params.id;
    res.render("post.ejs", {post: posts[postIndex], postIndex: postIndex});
})

// delete post
app.get("/delete/:id", (req,res) => {
    let postIndex = req.params.id;
    deletePost(postIndex);
    res.redirect("/");
});

// create post
app.get("/create", (req, res) => {
    res.render("newpost.ejs");
})

//update post
app.get("/update/:id", (req, res) => {
    let postIndex = req.params.id;
    let post = posts[postIndex];
    res.render("newpost.ejs", {post: post, postIndex: postIndex});
})

//save post
app.post("/save/:id", (req, res) => {
    let id = req.params.id
    let title = req.body["title"];
    let subtitle = req.body["subtitle"];
    let content = req.body["content"];
    if (id >= 0) {
        updatePost(id, title, subtitle, content);
        res.redirect("/");
    }
    else {
        addPost(title, subtitle, content);
        res.redirect("/");
    }
});


// Start server
app.listen(port, () => {
    addPost("Traditional Spanish food: 7 easy Spanish food recipes to make at home", "Spaniards love to eat, and anyone who has ever spent some time in Spain, either on holiday or living in the country, will know that socialising around the table with Spanish cuisine is a big part of life.", "<p>Spaniards love to eat, and anyone who has ever spent some time in Spain, either on holiday or living in the country, will know that socialising around the table with Spanish cuisine is a big part of life.</p><p> So, if you want to bring the flavours of Spain to your home and dine like a Spaniard, these traditional Spanish dishes are a great place to start. Let’s have a look at 7 easy Spanish food recipes to make at home so that you don't have to miss out on traditional Spanish food. Dine at home like a pro with this easy Spanish dishes! This beloved traditional Spanish breakfast is not confined to the local bars or cafés of Spain; you can easily savour it in the comfort of your own home. Crafting this delightfully simple yet gratifying morning dish requires only bread, olive oil, tomatoes, and a touch of salt. In just a few minutes, you can whip up the perfect breakfast or snack. Begin by drizzling extra virgin olive oil over toasted bread. Then, generously spread a blend of crushed tomatoes (achieved by blending tomatoes with a dash of olive oil and salt) on top. Optionally, you can enhance the experience by adding some Spanish ham to the bread. To complete the authentic Spanish breakfast experience at home, pair it with a delicious café con leche (milky coffee).</p>");
    addPost("Traditional Spanish food: 8 easy Spanish food recipes to make at home", "Spaniards love to eat, and anyone who has ever spent some time in Spain, either on holiday or living in the country, will know that socialising around the table with Spanish cuisine is a big part of life.", "Spaniards love to eat, and anyone who has ever spent some time in Spain, either on holiday or living in the country, will know that socialising around the table with Spanish cuisine is a big part of life. So, if you want to bring the flavours of Spain to your home and dine like a Spaniard, these traditional Spanish dishes are a great place to start. Let’s have a look at 7 easy Spanish food recipes to make at home so that you don't have to miss out on traditional Spanish food. Dine at home like a pro with this easy Spanish dishes! This beloved traditional Spanish breakfast is not confined to the local bars or cafés of Spain; you can easily savour it in the comfort of your own home. Crafting this delightfully simple yet gratifying morning dish requires only bread, olive oil, tomatoes, and a touch of salt. In just a few minutes, you can whip up the perfect breakfast or snack. Begin by drizzling extra virgin olive oil over toasted bread. Then, generously spread a blend of crushed tomatoes (achieved by blending tomatoes with a dash of olive oil and salt) on top. Optionally, you can enhance the experience by adding some Spanish ham to the bread. To complete the authentic Spanish breakfast experience at home, pair it with a delicious café con leche (milky coffee).");
    console.log(`Server running on port ${port}`);
});