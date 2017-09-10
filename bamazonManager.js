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
        start();
  
        function start(){
            inquirer.prompt([{
            type:"list",
            name: "menu",
            choices:["View Products for Sale", "View Low Inventory","Add to Inventory", "Add New Product"],
            message: "Pick an option from the menu.",
          }])
          
            .then(function (answers) {
                switch (answers.menu)
                {
                    case "View Products for Sale":
                        products();
                        break;
                    case "View Low Inventory":
                        lowInventory();
                        break;
                    case "Add to Inventory":
                        updateInventory();
                        break;
                    case "Add New Product":
                        newProduct();
                        break;
                    default:
                        break;
                }
            });
        }
//function block
// Display Data
function products(){
    connection.query("SELECT * FROM products", function(err,results){
    for (var i = 0; i < results.length; i++){
        console.log('\nItem ID: '+ results[i].item_id  +  '| Product Name: ' + results[i].product_name + '| Price: $' + results[i].price);
        // console.log(results);
    }
    start();
})
}

//Low Inventory 
function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(err,results){
    for (var i = 0; i < results.length; i++){
        console.log('\nItem ID: '+ results[i].item_id  +  '| Product Name: ' + results[i].product_name + '| Price: $' + results[i].price + '| Inventory: ' + results[i].stock_quantity);
        // console.log(results);
    }
    start();
})
}

//Update Inventory
function updateInventory(){
    connection.query("SELECT * FROM products", function(err,results){
        for (var i = 0; i < results.length; i++){
            console.log('\nItem ID: '+ results[i].item_id  +  '| Product Name: ' + results[i].product_name + '| Price: $' + results[i].price+ '| Inventory: ' + results[i].stock_quantity);
            // console.log(results);
        }
       
    })
    inquirer.prompt([{
        name: "productOption",
        message: "Which product item id would you like to update?"
      },
      {
          name:"quantityUpdate",
          message:"How many would you like to add to inventory?"
      }
    
    ])
      
        .then(function (answers) {
            connection.query("SELECT * FROM products WHERE item_id =" + answers.productOption, function(err,results){
                // console.log(results);
              
                var newQty = (parseInt(results[0].stock_quantity) + parseInt(answers.quantityUpdate));
            connection.query("UPDATE products SET stock_quantity =" + newQty + " WHERE item_id =" + answers.productOption, function(err,results){
                if (err){
                    throw err
                }
                else{
                    connection.query("SELECT * FROM products WHERE item_id =" + answers.productOption, function(err,results){
                        console.log("\nThe stock is now " +results[0].stock_quantity);
                        start();
                    });   
                    
                }
            })
        })
    });

}

//Add New Products
function newProduct(){
    inquirer.prompt([{
        name: "newProductName",
        message: "What is the product name?"
      },
      {
          name:"newQuantity",
          message:"How many would you like to add to inventory?"
      },
      {
        name:"newPrice",
        message:"What is the price?"
    },
    {
        name:"newDept",
        message:"What is the category of the product?"
    }
    ])
      
        .then(function (answers) {
            connection.query(
                "INSERT INTO products SET ?",
            {
                product_name: answers.newProductName,
                department_name:answers.newDept,
                price:answers.newPrice,
                stock_quantity:answers.newQuantity
            });
            products();
            start();
    });

}