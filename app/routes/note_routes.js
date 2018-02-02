module.exports = function(app, db) {
    app.post('/', function(req, res) {
        const note = {user: req.body.user, password: req.body.password};
        const mydb = db.db('MyChat');
        mydb.collection('NOTES').insert(note, (err, result) => {
          if (err) {
            res.send({'error': 'ERRORS'});
          } else {
            // console.log(req.body.user);
            console.log(result);
            // res.contentType('json');
            // res.send({ some: JSON.stringify({response:'json'}) });
            var r = (+req.body.user)+(+req.body.password);
            res.send("+" +r );
          }  
      });
      }); 

      app.post('/sum', function(req, res) {
        const note = {user: req.body.user, password: req.body.password, action: req.body.action};
        const mydb = db.db('MyChat');
        mydb.collection('NOTES').insert(note, (err, result) => {
          if (err) {
            res.send({'error': 'ERRORS'});
          } else {
            // console.log(req.body.user);
            // res.contentType('json');
            // res.send({ some: JSON.stringify({response:'json'}) });
            if (req.body.action == "+") {
                var add = (+req.body.user)+(+req.body.password);
                 res.send("" +add );
            } else if (req.body.action == "-") {
                var sub = (+req.body.user)-(+req.body.password);
                 res.send("" +sub ); 
            } else if (req.body.action == "*") {
                var mul = (+req.body.user)*(+req.body.password);
                 res.send("" +mul );
            } else {
                var div = (+req.body.user)/(+req.body.password);
                 res.send("" +div );
            }
            
          }  
      });
      }); 

      app.get('/sum/:n1/:n2/:op', function(req, res) {
        const note = {n1: +req.params.n1, n2: +req.params.n2, op: req.params.op};
        const mydb = db.db('MyChat');
        mydb.collection('NOTES').insert(note, (err, result) => {
          if (err) {
            res.send({'error': 'ERRORS'});
          } else {
            // console.log(req.body.user);
            // res.contentType('json');
            // res.send({ some: JSON.stringify({response:'json'}) });
            var result;
            if (note.op == "+") {
                result = note.n1+note.n2;              
            } else if (note.op == "-") {
                result = note.n1-note.n2;
            } else if (note.op == "*") {
                result = note.n1*note.n2;
            } else {
                result = note.n1/note.n2;
            }
            res.send(""+result);
          }  
      });
      }); 

      app.get('/?=add', function(req, res) {
       /*  const note = {user: req.body.user, password: req.body.password};
        const mydb = db.db('MyChat'); */
        var r = req.params.add;
            res.send("" +r );
      });

      app.get('/sum', function(req, res) {
        const note = {n1: +req.query.n1, n2: +req.query.n2, op: req.query.op};
        const mydb = db.db('MyChat');
        mydb.collection('NOTES').insert(note, (err, result) => {
          if (err) {
            res.send({'error': 'ERRORS'});
          } else {
            // console.log(req.body.user);
            // res.contentType('json');
            // res.send({ some: JSON.stringify({response:'json'}) });
            var result;
            if (note.op == "+") {
                result = note.n1+note.n2;              
            } else if (note.op == "-") {
                result = note.n1-note.n2;
            } else if (note.op == "*") {
                result = note.n1*note.n2;
            } else {
                result = note.n1/note.n2;
            }
            res.send(""+result);
          }  
      });
       });
 
      
}; 