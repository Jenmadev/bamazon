var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
  });
  connection.connect(function(error){
    if (error) throw error;
        // console.log('Connected!'); 
    });


    connection.query("SELECT * FROM products", function(err,results){
        for (var i = 0; i < results.length; i++){
            console.log('Item ID: '+ results[i].item_id  +  '| Product Name: ' + results[i].product_name + '| Price: $' + results[i].price+ '| Inventory: ' + results[i].stock_quantity);
            // console.log(results);
        };
        inquirer.prompt([{
            name: "question1",
            message: "What is the item id of the item you want to buy?",
          },
          {
            name: "question2",
            message: "How many would you like to buy?"
          } 
          ])
          
          .then(function (answers) {
              connection.query("SELECT * FROM products WHERE item_id =" + answers.question1, function(err,results){
                if (err){
                    throw err;
                }
                else{
                    var totalCost = answers.question2 * results[0].price;
                    console.log(results[0].stock_quantity);
                    console.log(answers.question1);
                    if(answers.question2 <= results[0].stock_quantity){
                        var updateQty = "UPDATE products SET stock_quantity =" + (results[0].stock_quantity- answers.question2) + " WHERE item_id =" + answers.question1;
                        connection.query(updateQty, function (err, results) {
                            if (err) throw err;
                            console.log("The total cost of your purchase is : $"+ totalCost);
                          });
                    }
                        

                }
                })
              });
                 
              });
              