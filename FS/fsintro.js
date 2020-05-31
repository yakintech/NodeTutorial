var fs = require('fs');

// fs.appendFile('errorlist.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

fs.unlink("errorlist.txt",(err)=>{
    console.log(err);
})