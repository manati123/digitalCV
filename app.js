var app = require('express')();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/DigitalCV");

const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);


var SkillsSchema = new mongoose.Schema({
    skill: String,
    image: String,
    description: String
});

var skills = mongoose.model("Skill", SkillsSchema);

///Functions
/* skills.create({
    skill: "skill",
    image: "image",
    description: "description"
}, function(err, newSkill) {
    if (err) {
        console.log(err);
    } else {
        console.log("new skill: ");
        console.log(newSkill);
    }
}); */


////////////////////////////////


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//          LANDING PAGE        //
app.get("/", function(req, res) {

    res.render("index");
});
//          SKILLS PAGE         //
app.get("/skills", function(req, res) {
    skills.find({}, function(err, allSkills) {
        if (err) {
            console.log(err);
        } else {
            res.render("skills", { skills: allSkills });
        }
    });
});

app.post("/skills", function(req, res) {
    //console.log("sdfsdkfjnsdfknsdfk");
    var skill = req.body.skill;
    var image = req.body.image;
    var description = req.body.description;
    //console.log("sdfsd");
    skills.create({
        skill: skill,
        image: image,
        description: description
    }, function(err, newSkill) {
        if (err) {
            console.log(err);
        } else {
            console.log("new skill: ");
            console.log(newSkill);
            res.redirect("/skills");
        }
    });
});

//          SKILLS NEW          //
app.get("/skills/new", function(req, res) {
    res.render("new");
});

//          CONTACT PAGE        //
/* app.get("/contact", function(req, res) {
    res.render("contact");
}); */

/* app.get("/portfolio", function(req, res) {
    res.render("portfolio");
}); */


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is up");
})