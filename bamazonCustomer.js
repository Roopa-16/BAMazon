var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "roopa16",
  database: "bamazon_DB"
})

function start(){
connection.query('SELECT * FROM productsamazon', function(err, res){
  if(err) throw err;

  console.log("Welcome to Bamazon!!!")
  console.log('----------------------------------------------------------------------------------------------------')

  for(var a = 0; a<res.length; a++){
    console.log("ID: " + res[a].item_id + " | " + "Product: " + res[a].product_name + " | " + "Department: " + res[a].department_name + " | " + "Price: " + res[a].price + " | " + "QTY: " + res[a].stock_quantity);
    console.log('--------------------------------------------------------------------------------------------------')
  }

  console.log(' ');
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the ID of the product you would like to purchase?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "How much would you like to purchase?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var whatToBuy = (ans.id)-1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

      if(res[whatToBuy].stock_quantity >= howMuchToBuy){
        connection.query("UPDATE productsamazon SET ? WHERE ?", [
        {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
        {ItemID: ans.id}
        ], function(err, result){
            if(err) throw err;
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
        });

        connection.query("SELECT * FROM department_name", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].department_name === res[whatToBuy].department_name){
              index = i;
            }
          }
          
          connection.query("UPDATE department_name SET ? WHERE ?", [
          {TotalSales: deptRes[index].TotalSales + grandTotal},
          {DepartmentName: res[whatToBuy].department_name}
          ], function(err, deptRes){
              if(err) throw err;
          });
        });

      } 
      else{
        console.log("Sorry, there's not enough in stock!");
      }
      reprompt();
    })
})
}

function reprompt(){
  inquirer.prompt([{
    type: "list",
    name: "reply",
    message: "Would you like to purchase another item?",
    choices: ['yes', 'no']
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("See you soon!");
    }
  });
}



start();