const mongoose = require('mongoose');
const app = require('./index')
mongoose.connect('mongodb+srv://srigbok:test1234@cluster0.oj5qw.mongodb.net/multer ',{
 
}).then((con)=>{
    console.log('database connection successful')
})

app.listen(3000,() => console.log(`Server started successfully!!`))